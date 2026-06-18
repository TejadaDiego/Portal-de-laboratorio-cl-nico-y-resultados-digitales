// ========================================
// MÓDULO DE SOLICITUDES DE ANÁLISIS
// Proyecto: Portal de Laboratorio Clínico
// ========================================


// ========================================
// CARGAR PACIENTES EN EL COMBO
// ========================================
async function cargarPacientes() {
    const selectPaciente = document.getElementById("paciente_id");

    if (!selectPaciente) return;

    selectPaciente.innerHTML = '<option value="">Seleccione paciente</option>';

    try {
        const snapshot = await db.collection("pacientes")
            .where("estado", "==", "ACTIVO")
            .get();

        if (snapshot.empty) {
            const option = document.createElement("option");
            option.value = "";
            option.textContent = "No hay pacientes registrados";
            selectPaciente.appendChild(option);
            return;
        }

        snapshot.forEach((doc) => {
            const paciente = doc.data();

            const option = document.createElement("option");
            option.value = doc.id;
            option.textContent = `${paciente.nombres} ${paciente.apellidos} - DNI: ${paciente.dni}`;

            option.setAttribute("data-uid", paciente.uid || "");
            option.setAttribute("data-nombre", `${paciente.nombres} ${paciente.apellidos}`);

            selectPaciente.appendChild(option);
        });

    } catch (error) {
        console.error("Error al cargar pacientes:", error);
        alert("Error al cargar pacientes.");
    }
}


// ========================================
// CARGAR TIPOS DE ANÁLISIS EN EL COMBO
// Usa la colección creada en Firebase:
// tipo_de_análisis
// ========================================
async function cargarTiposAnalisis() {
    const selectAnalisis = document.getElementById("tipo_analisis_id");

    if (!selectAnalisis) return;

    selectAnalisis.innerHTML = '<option value="">Seleccione análisis</option>';

    try {
        const snapshot = await db.collection("tipo_de_análisis")
            .where("estado", "==", "ACTIVO")
            .get();

        if (snapshot.empty) {
            const option = document.createElement("option");
            option.value = "";
            option.textContent = "No hay tipos de análisis registrados";
            selectAnalisis.appendChild(option);
            return;
        }

        snapshot.forEach((doc) => {
            const analisis = doc.data();

            const option = document.createElement("option");
            option.value = doc.id;
            option.textContent = analisis.nombre;

            option.setAttribute("data-nombre", analisis.nombre);

            selectAnalisis.appendChild(option);
        });

    } catch (error) {
        console.error("Error al cargar tipos de análisis:", error);
        alert("Error al cargar tipos de análisis.");
    }
}


// ========================================
// REGISTRAR SOLICITUD
// ========================================
async function registrarSolicitud() {
    const selectPaciente = document.getElementById("paciente_id");
    const selectAnalisis = document.getElementById("tipo_analisis_id");
    const observacionesInput = document.getElementById("observaciones");

    if (!selectPaciente || !selectAnalisis || !observacionesInput) {
        alert("No se encontraron los campos del formulario.");
        return;
    }

    const pacienteId = selectPaciente.value;
    const tipoAnalisisId = selectAnalisis.value;
    const observaciones = observacionesInput.value.trim();

    if (pacienteId === "") {
        alert("Seleccione un paciente.");
        return;
    }

    if (tipoAnalisisId === "") {
        alert("Seleccione un tipo de análisis.");
        return;
    }

    const pacienteOption = selectPaciente.options[selectPaciente.selectedIndex];
    const analisisOption = selectAnalisis.options[selectAnalisis.selectedIndex];

    const uidPaciente = pacienteOption.getAttribute("data-uid");
    const pacienteNombre = pacienteOption.getAttribute("data-nombre");
    const tipoAnalisisNombre = analisisOption.getAttribute("data-nombre");

    try {
        await db.collection("solicitudes").add({
            paciente_id: pacienteId,
            uid_paciente: uidPaciente,
            paciente_nombre: pacienteNombre,
            tipo_analisis_id: tipoAnalisisId,
            tipo_analisis_nombre: tipoAnalisisNombre,
            fecha_solicitud: new Date(),
            estado: "PENDIENTE",
            observaciones: observaciones
        });

        alert("Solicitud registrada correctamente.");

        selectPaciente.value = "";
        selectAnalisis.value = "";
        observacionesInput.value = "";

        listarSolicitudes();

    } catch (error) {
        console.error("Error al registrar solicitud:", error);
        alert("Error al registrar solicitud.");
    }
}


// ========================================
// LISTAR SOLICITUDES
// ========================================
async function listarSolicitudes() {
    const tabla = document.getElementById("tabla_solicitudes");

    if (!tabla) return;

    tabla.innerHTML = "";

    try {
        const snapshot = await db.collection("solicitudes")
            .orderBy("fecha_solicitud", "desc")
            .get();

        if (snapshot.empty) {
            tabla.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center text-muted">
                        No hay solicitudes registradas.
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
                    <td>${solicitud.paciente_nombre || ""}</td>
                    <td>${solicitud.tipo_analisis_nombre || ""}</td>
                    <td>${fecha}</td>
                    <td>
                        <span class="badge ${colorEstado(estado)}">
                            ${estado}
                        </span>
                    </td>
                    <td>${solicitud.observaciones || ""}</td>
                    <td>
                        <select class="form-select form-select-sm" onchange="cambiarEstadoSolicitud('${doc.id}', this.value)">
                            <option value="">Cambiar estado</option>
                            <option value="PENDIENTE">PENDIENTE</option>
                            <option value="EN PROCESO">EN PROCESO</option>
                            <option value="RESULTADO DISPONIBLE">RESULTADO DISPONIBLE</option>
                            <option value="ENTREGADO">ENTREGADO</option>
                        </select>
                    </td>
                </tr>
            `;

            tabla.innerHTML += fila;
        });

    } catch (error) {
        console.error("Error al listar solicitudes:", error);
        alert("Error al listar solicitudes.");
    }
}


// ========================================
// CAMBIAR ESTADO DE SOLICITUD
// ========================================
async function cambiarEstadoSolicitud(idSolicitud, nuevoEstado) {
    if (nuevoEstado === "") return;

    try {
        await db.collection("solicitudes").doc(idSolicitud).update({
            estado: nuevoEstado,
            fecha_actualizacion: new Date()
        });

        alert("Estado actualizado correctamente.");
        listarSolicitudes();

    } catch (error) {
        console.error("Error al cambiar estado:", error);
        alert("Error al cambiar estado.");
    }
}


// ========================================
// COLOR DEL BADGE SEGÚN ESTADO
// ========================================
function colorEstado(estado) {
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