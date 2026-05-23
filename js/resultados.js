// ========================================
// MÓDULO DE RESULTADOS DE ANÁLISIS
// Proyecto: Portal de Laboratorio Clínico
// ========================================


// ========================================
// CARGAR SOLICITUDES PARA RESULTADO
// ========================================
async function cargarSolicitudesParaResultado() {
    const selectSolicitud = document.getElementById("solicitud_id");

    if (!selectSolicitud) return;

    selectSolicitud.innerHTML = '<option value="">Seleccione solicitud</option>';

    try {
        const snapshot = await db.collection("solicitudes")
            .where("estado", "in", ["PENDIENTE", "EN PROCESO"])
            .get();

        if (snapshot.empty) {
            const option = document.createElement("option");
            option.value = "";
            option.textContent = "No hay solicitudes pendientes";
            selectSolicitud.appendChild(option);
            return;
        }

        snapshot.forEach((doc) => {
            const solicitud = doc.data();

            const option = document.createElement("option");
            option.value = doc.id;
            option.textContent = `${solicitud.paciente_nombre} - ${solicitud.tipo_analisis_nombre}`;

            option.setAttribute("data-paciente", solicitud.paciente_nombre || "");
            option.setAttribute("data-analisis", solicitud.tipo_analisis_nombre || "");
            option.setAttribute("data-uid-paciente", solicitud.uid_paciente || "");

            selectSolicitud.appendChild(option);
        });

    } catch (error) {
        console.error("Error al cargar solicitudes:", error);
        alert("Error al cargar solicitudes.");
    }
}


// ========================================
// REGISTRAR RESULTADO
// ========================================
async function registrarResultado() {
    const selectSolicitud = document.getElementById("solicitud_id");
    const resultadoInput = document.getElementById("resultado_texto");

    if (!selectSolicitud || !resultadoInput) {
        alert("No se encontraron los campos del formulario.");
        return;
    }

    const solicitudId = selectSolicitud.value;
    const resultadoTexto = resultadoInput.value.trim();

    if (solicitudId === "") {
        alert("Seleccione una solicitud.");
        return;
    }

    if (resultadoTexto === "") {
        alert("Ingrese el resultado del análisis.");
        return;
    }

    const option = selectSolicitud.options[selectSolicitud.selectedIndex];

    const pacienteNombre = option.getAttribute("data-paciente");
    const tipoAnalisisNombre = option.getAttribute("data-analisis");
    const uidPaciente = option.getAttribute("data-uid-paciente");

    try {
        await db.collection("resultados").add({
            solicitud_id: solicitudId,
            uid_paciente: uidPaciente,
            paciente_nombre: pacienteNombre,
            tipo_analisis_nombre: tipoAnalisisNombre,
            resultado_texto: resultadoTexto,
            fecha_resultado: new Date(),
            estado: "RESULTADO DISPONIBLE"
        });

        await db.collection("solicitudes").doc(solicitudId).update({
            estado: "RESULTADO DISPONIBLE",
            resultado_texto: resultadoTexto,
            fecha_resultado: new Date(),
            fecha_actualizacion: new Date()
        });

        await db.collection("notificaciones").add({
            uid_paciente: uidPaciente,
            titulo: "Resultado disponible",
            mensaje: `Tu resultado de ${tipoAnalisisNombre} ya está disponible.`,
            estado: "NO LEÍDO",
            fecha_creacion: new Date()
        });

        alert("Resultado registrado correctamente.");

        selectSolicitud.value = "";
        resultadoInput.value = "";

        cargarSolicitudesParaResultado();
        listarResultados();

    } catch (error) {
        console.error("Error al registrar resultado:", error);
        alert("Error al registrar resultado.");
    }
}


// ========================================
// LISTAR RESULTADOS
// ========================================
async function listarResultados() {
    const tabla = document.getElementById("tabla_resultados");

    if (!tabla) return;

    tabla.innerHTML = "";

    try {
        const snapshot = await db.collection("resultados")
            .orderBy("fecha_resultado", "desc")
            .get();

        if (snapshot.empty) {
            tabla.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center text-muted">
                        No hay resultados registrados.
                    </td>
                </tr>
            `;
            return;
        }

        snapshot.forEach((doc) => {
            const resultado = doc.data();

            let fecha = "Sin fecha";

            if (resultado.fecha_resultado && resultado.fecha_resultado.toDate) {
                fecha = resultado.fecha_resultado.toDate().toLocaleDateString("es-PE");
            }

            const fila = `
                <tr>
                    <td>${resultado.paciente_nombre || ""}</td>
                    <td>${resultado.tipo_analisis_nombre || ""}</td>
                    <td>${resultado.resultado_texto || ""}</td>
                    <td>${fecha}</td>
                    <td>
                        <span class="badge bg-success">
                            ${resultado.estado || "RESULTADO DISPONIBLE"}
                        </span>
                    </td>
                </tr>
            `;

            tabla.innerHTML += fila;
        });

    } catch (error) {
        console.error("Error al listar resultados:", error);

        tabla.innerHTML = `
            <tr>
                <td colspan="5" class="text-center text-danger">
                    Error al cargar resultados.
                </td>
            </tr>
        `;
    }
}


// ========================================
// VOLVER AL DASHBOARD
// ========================================
function volverDashboardLaboratorista() {
    auth.onAuthStateChanged(async function(user) {
        if (!user) {
            window.location.href = "login.html";
            return;
        }

        const usuarioDoc = await db.collection("usuarios").doc(user.uid).get();

        if (!usuarioDoc.exists) {
            window.location.href = "login.html";
            return;
        }

        const usuario = usuarioDoc.data();

        if (usuario.rol === "ADMINISTRADOR") {
            window.location.href = "dashboard_admin.html";
        } else {
            window.location.href = "dashboard_laboratorista.html";
        }
    });
}