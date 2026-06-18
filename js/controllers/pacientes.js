// ========================================
// MÓDULO DE PACIENTES
// Proyecto: Portal de Laboratorio Clínico
// ========================================


// ========================================
// GUARDAR / ACTUALIZAR PACIENTE
// ========================================
async function guardarPaciente() {
    const pacienteId = obtenerInput("paciente_id");
    const dni = obtenerInput("dni");
    const nombres = obtenerInput("nombres");
    const apellidos = obtenerInput("apellidos");
    const fechaNacimiento = obtenerInput("fecha_nacimiento");
    const telefono = obtenerInput("telefono");
    const correo = obtenerInput("correo");
    const direccion = obtenerInput("direccion");

    if (
        dni === "" ||
        nombres === "" ||
        apellidos === "" ||
        correo === ""
    ) {
        alert("Complete los campos obligatorios: DNI, nombres, apellidos y correo.");
        return;
    }

    if (!/^\d{8}$/.test(dni)) {
        alert("El DNI debe tener 8 dígitos.");
        return;
    }

    if (telefono !== "" && !/^\d{9}$/.test(telefono)) {
        alert("El teléfono debe tener 9 dígitos.");
        return;
    }

    try {
        const datosPaciente = {
            dni: dni,
            nombres: nombres,
            apellidos: apellidos,
            fecha_nacimiento: fechaNacimiento,
            telefono: telefono,
            correo: correo,
            direccion: direccion,
            estado: "ACTIVO",
            fecha_actualizacion: new Date()
        };

        if (pacienteId === "") {
            datosPaciente.fecha_creacion = new Date();

            await db.collection("pacientes").add(datosPaciente);

            alert("Paciente registrado correctamente.");
        } else {
            await db.collection("pacientes").doc(pacienteId).update(datosPaciente);

            alert("Paciente actualizado correctamente.");
        }

        limpiarFormularioPaciente();
        listarPacientes();

    } catch (error) {
        console.error("Error al guardar paciente:", error);
        alert("No se pudo guardar el paciente.");
    }
}


// ========================================
// LISTAR PACIENTES
// ========================================
async function listarPacientes() {
    const tabla = document.getElementById("tabla_pacientes");

    if (!tabla) return;

    tabla.innerHTML = `
        <tr>
            <td colspan="6" class="text-center text-muted">
                Cargando pacientes...
            </td>
        </tr>
    `;

    try {
        const snapshot = await db.collection("pacientes").get();

        if (snapshot.empty) {
            tabla.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center text-muted">
                        No hay pacientes registrados.
                    </td>
                </tr>
            `;
            return;
        }

        let pacientes = [];

        snapshot.forEach((doc) => {
            pacientes.push({
                id: doc.id,
                ...doc.data()
            });
        });

        pacientes.sort((a, b) => {
            const nombreA = `${a.nombres || ""} ${a.apellidos || ""}`.toLowerCase();
            const nombreB = `${b.nombres || ""} ${b.apellidos || ""}`.toLowerCase();
            return nombreA.localeCompare(nombreB);
        });

        tabla.innerHTML = "";

        pacientes.forEach((paciente) => {
            const estado = paciente.estado || "ACTIVO";

            const badgeEstado = estado === "ACTIVO"
                ? "bg-success"
                : "bg-danger";

            const textoBotonEstado = estado === "ACTIVO"
                ? "Desactivar"
                : "Activar";

            const claseBotonEstado = estado === "ACTIVO"
                ? "btn-danger"
                : "btn-success";

            const fila = `
                <tr>
                    <td>${paciente.dni || ""}</td>
                    <td>${paciente.nombres || ""} ${paciente.apellidos || ""}</td>
                    <td>${paciente.correo || ""}</td>
                    <td>${paciente.telefono || ""}</td>
                    <td>
                        <span class="badge ${badgeEstado}">
                            ${estado}
                        </span>
                    </td>
                    <td>
                        <button class="btn btn-sm btn-warning me-1" onclick="editarPaciente('${paciente.id}')">
                            Editar
                        </button>

                        <button class="btn btn-sm ${claseBotonEstado}" onclick="cambiarEstadoPaciente('${paciente.id}', '${estado}')">
                            ${textoBotonEstado}
                        </button>
                    </td>
                </tr>
            `;

            tabla.innerHTML += fila;
        });

    } catch (error) {
        console.error("Error al listar pacientes:", error);

        tabla.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-danger">
                    Error al cargar pacientes.
                </td>
            </tr>
        `;
    }
}


// ========================================
// EDITAR PACIENTE
// ========================================
async function editarPaciente(idPaciente) {
    try {
        const doc = await db.collection("pacientes").doc(idPaciente).get();

        if (!doc.exists) {
            alert("Paciente no encontrado.");
            return;
        }

        const paciente = doc.data();

        colocarInput("paciente_id", idPaciente);
        colocarInput("dni", paciente.dni || "");
        colocarInput("nombres", paciente.nombres || "");
        colocarInput("apellidos", paciente.apellidos || "");
        colocarInput("fecha_nacimiento", paciente.fecha_nacimiento || "");
        colocarInput("telefono", paciente.telefono || "");
        colocarInput("correo", paciente.correo || "");
        colocarInput("direccion", paciente.direccion || "");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {
        console.error("Error al editar paciente:", error);
        alert("No se pudo cargar el paciente.");
    }
}


// ========================================
// ACTIVAR / DESACTIVAR PACIENTE
// ========================================
async function cambiarEstadoPaciente(idPaciente, estadoActual) {
    const nuevoEstado = estadoActual === "ACTIVO" ? "INACTIVO" : "ACTIVO";

    const confirmar = confirm(`¿Deseas cambiar el estado del paciente a ${nuevoEstado}?`);

    if (!confirmar) return;

    try {
        await db.collection("pacientes").doc(idPaciente).update({
            estado: nuevoEstado,
            fecha_actualizacion: new Date()
        });

        alert("Estado actualizado correctamente.");
        listarPacientes();

    } catch (error) {
        console.error("Error al cambiar estado:", error);
        alert("No se pudo cambiar el estado del paciente.");
    }
}


// ========================================
// LIMPIAR FORMULARIO
// ========================================
function limpiarFormularioPaciente() {
    colocarInput("paciente_id", "");
    colocarInput("dni", "");
    colocarInput("nombres", "");
    colocarInput("apellidos", "");
    colocarInput("fecha_nacimiento", "");
    colocarInput("telefono", "");
    colocarInput("correo", "");
    colocarInput("direccion", "");
}


// ========================================
// UTILIDADES
// ========================================
function obtenerInput(id) {
    const elemento = document.getElementById(id);
    return elemento ? elemento.value.trim() : "";
}

function colocarInput(id, valor) {
    const elemento = document.getElementById(id);

    if (elemento) {
        elemento.value = valor;
    }
}