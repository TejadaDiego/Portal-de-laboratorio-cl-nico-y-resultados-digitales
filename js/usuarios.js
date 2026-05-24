// ========================================
// MÓDULO DE USUARIOS
// Proyecto: Portal de Laboratorio Clínico
// ========================================


// ========================================
// LISTAR USUARIOS
// ========================================
async function listarUsuarios() {
    const tabla = document.getElementById("tabla_usuarios");

    if (!tabla) return;

    tabla.innerHTML = `
        <tr>
            <td colspan="7" class="text-center text-muted">
                Cargando usuarios...
            </td>
        </tr>
    `;

    try {
        const snapshot = await db.collection("usuarios").get();

        if (snapshot.empty) {
            tabla.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center text-muted">
                        No hay usuarios registrados.
                    </td>
                </tr>
            `;

            actualizarContadores([]);
            return;
        }

        let usuarios = [];

        snapshot.forEach((doc) => {
            usuarios.push({
                id: doc.id,
                ...doc.data()
            });
        });

        // Ordenar por nombre
        usuarios.sort((a, b) => {
            const nombreA = `${a.nombres || ""} ${a.apellidos || ""}`.toLowerCase();
            const nombreB = `${b.nombres || ""} ${b.apellidos || ""}`.toLowerCase();

            return nombreA.localeCompare(nombreB);
        });

        actualizarContadores(usuarios);

        tabla.innerHTML = "";

        usuarios.forEach((usuario) => {
            const estado = usuario.estado || "ACTIVO";
            const rol = usuario.rol || "PACIENTE";

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
                    <td>${usuario.nombres || ""}</td>
                    <td>${usuario.apellidos || ""}</td>
                    <td>${usuario.correo || ""}</td>

                    <td>
                        <span class="badge bg-primary">
                            ${rol}
                        </span>
                    </td>

                    <td>
                        <span class="badge ${badgeEstado}">
                            ${estado}
                        </span>
                    </td>

                    <td>
                        <select class="form-select form-select-sm" onchange="cambiarRolUsuario('${usuario.id}', this.value)">
                            <option value="">Seleccionar rol</option>
                            <option value="PACIENTE" ${rol === "PACIENTE" ? "selected" : ""}>PACIENTE</option>
                            <option value="LABORATORISTA" ${rol === "LABORATORISTA" ? "selected" : ""}>LABORATORISTA</option>
                            <option value="ADMINISTRADOR" ${rol === "ADMINISTRADOR" ? "selected" : ""}>ADMINISTRADOR</option>
                        </select>
                    </td>

                    <td>
                        <button class="btn btn-sm ${claseBotonEstado}" onclick="cambiarEstadoUsuario('${usuario.id}', '${estado}')">
                            ${textoBotonEstado}
                        </button>
                    </td>
                </tr>
            `;

            tabla.innerHTML += fila;
        });

    } catch (error) {
        console.error("Error al listar usuarios:", error);

        tabla.innerHTML = `
            <tr>
                <td colspan="7" class="text-center text-danger">
                    Error al cargar usuarios.
                </td>
            </tr>
        `;
    }
}


// ========================================
// CAMBIAR ROL DE USUARIO
// ========================================
async function cambiarRolUsuario(uidUsuario, nuevoRol) {
    if (nuevoRol === "") return;

    const confirmar = confirm(`¿Deseas cambiar el rol del usuario a ${nuevoRol}?`);

    if (!confirmar) {
        listarUsuarios();
        return;
    }

    try {
        await db.collection("usuarios").doc(uidUsuario).update({
            rol: nuevoRol,
            fecha_actualizacion: new Date()
        });

        alert("Rol actualizado correctamente.");
        listarUsuarios();

    } catch (error) {
        console.error("Error al cambiar rol:", error);
        alert("No se pudo cambiar el rol del usuario.");
    }
}


// ========================================
// ACTIVAR / DESACTIVAR USUARIO
// ========================================
async function cambiarEstadoUsuario(uidUsuario, estadoActual) {
    const nuevoEstado = estadoActual === "ACTIVO" ? "INACTIVO" : "ACTIVO";

    const confirmar = confirm(`¿Deseas cambiar el estado del usuario a ${nuevoEstado}?`);

    if (!confirmar) return;

    try {
        await db.collection("usuarios").doc(uidUsuario).update({
            estado: nuevoEstado,
            fecha_actualizacion: new Date()
        });

        alert("Estado actualizado correctamente.");
        listarUsuarios();

    } catch (error) {
        console.error("Error al cambiar estado:", error);
        alert("No se pudo cambiar el estado del usuario.");
    }
}


// ========================================
// ACTUALIZAR CONTADORES
// ========================================
function actualizarContadores(usuarios) {
    const totalUsuarios = usuarios.length;
    const totalPacientes = usuarios.filter(u => u.rol === "PACIENTE").length;
    const totalLaboratoristas = usuarios.filter(u => u.rol === "LABORATORISTA").length;
    const totalAdministradores = usuarios.filter(u => u.rol === "ADMINISTRADOR").length;

    colocarTexto("total_usuarios", totalUsuarios);
    colocarTexto("total_pacientes", totalPacientes);
    colocarTexto("total_laboratoristas", totalLaboratoristas);
    colocarTexto("total_administradores", totalAdministradores);
}


// ========================================
// COLOCAR TEXTO EN ELEMENTO
// ========================================
function colocarTexto(id, valor) {
    const elemento = document.getElementById(id);

    if (elemento) {
        elemento.textContent = valor;
    }
}