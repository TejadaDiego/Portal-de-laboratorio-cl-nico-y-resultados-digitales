// ========================================
// MÓDULO HISTORIAL DE ANÁLISIS
// Proyecto: Portal de Laboratorio Clínico
// ========================================


// ========================================
// CARGAR HISTORIAL DEL PACIENTE
// ========================================
function cargarHistorialPaciente() {
    auth.onAuthStateChanged(async function(user) {
        if (!user) {
            window.location.href = rutaPagina("login");
            return;
        }

        try {
            const uidPaciente = user.uid;

            await cargarDatosPaciente(uidPaciente);
            await listarHistorial(uidPaciente);

        } catch (error) {
            console.error("Error al cargar historial:", error);
            alert("Error al cargar historial del paciente.");
        }
    });
}


// ========================================
// CARGAR DATOS DEL PACIENTE
// ========================================
async function cargarDatosPaciente(uidPaciente) {
    const nombrePaciente = document.getElementById("nombre_paciente");
    const correoPaciente = document.getElementById("correo_paciente");

    try {
        const pacienteDoc = await db.collection("pacientes").doc(uidPaciente).get();

        if (!pacienteDoc.exists) {
            if (nombrePaciente) nombrePaciente.textContent = "No encontrado";
            if (correoPaciente) correoPaciente.textContent = "No encontrado";
            return;
        }

        const paciente = pacienteDoc.data();

        if (nombrePaciente) {
            nombrePaciente.textContent = `${paciente.nombres || ""} ${paciente.apellidos || ""}`;
        }

        if (correoPaciente) {
            correoPaciente.textContent = paciente.correo || "";
        }

    } catch (error) {
        console.error("Error al cargar datos del paciente:", error);
    }
}


// ========================================
// LISTAR HISTORIAL
// ========================================
async function listarHistorial(uidPaciente) {
    const tabla = document.getElementById("tabla_historial");

    if (!tabla) return;

    tabla.innerHTML = `
        <tr>
            <td colspan="5" class="text-center text-muted">
                Cargando historial...
            </td>
        </tr>
    `;

    try {
        const snapshot = await db.collection("solicitudes")
            .where("uid_paciente", "==", uidPaciente)
            .orderBy("fecha_solicitud", "desc")
            .get();

        tabla.innerHTML = "";

        if (snapshot.empty) {
            tabla.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center text-muted">
                        No tienes análisis registrados.
                    </td>
                </tr>
            `;
            return;
        }

        snapshot.forEach((doc) => {
            const solicitud = doc.data();

            let fecha = "Sin fecha";

            if (solicitud.fecha_solicitud && solicitud.fecha_solicitud.toDate) {
                fecha = solicitud.fecha_solicitud.toDate().toLocaleDateString("es-PE");
            }

            const estado = solicitud.estado || "PENDIENTE";

            const fila = `
                <tr>
                    <td>${solicitud.tipo_analisis_nombre || ""}</td>
                    <td>${fecha}</td>
                    <td>
                        <span class="badge ${colorEstadoHistorial(estado)}">
                            ${estado}
                        </span>
                    </td>
                    <td>${solicitud.observaciones || "Sin observaciones"}</td>
                    <td>
                        ${mostrarResultado(solicitud)}
                    </td>
                </tr>
            `;

            tabla.innerHTML += fila;
        });

    } catch (error) {
        console.error("Error al listar historial:", error);

        tabla.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-danger">
                    Error al cargar historial.
                </td>
            </tr>
        `;
    }
}


// ========================================
// MOSTRAR RESULTADO
// ========================================
function mostrarResultado(solicitud) {
    if (solicitud.estado !== "RESULTADO DISPONIBLE" && solicitud.estado !== "ENTREGADO") {
        return `
            <span class="text-muted">
                Aún no disponible
            </span>
        `;
    }

    if (solicitud.resultado_texto) {
        return `
            <button 
                class="btn btn-sm btn-success" 
                onclick="verResultado('${solicitud.resultado_texto.replace(/'/g, "\\'")}')">
                Ver resultado
            </button>
        `;
    }

    return `
        <span class="text-success">
            Resultado disponible
        </span>
    `;
}

function verResultado(resultado) {
    alert(resultado);
}


// ========================================
// COLOR DEL ESTADO
// ========================================
function colorEstadoHistorial(estado) {
    if (estado === "PENDIENTE") {
        return "bg-secondary";
    }

    if (estado === "EN PROCESO") {
        return "bg-warning text-dark";
    }

    if (estado === "RESULTADO DISPONIBLE") {
        return "bg-success";
    }

    if (estado === "ENTREGADO") {
        return "bg-primary";
    }

    return "bg-secondary";
}


// ========================================
// VOLVER AL DASHBOARD PACIENTE
// ========================================
function volverDashboardPaciente() {
    window.location.href = rutaPagina("dashboard_paciente");
}