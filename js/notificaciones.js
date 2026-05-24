// ========================================
// MÓDULO DE NOTIFICACIONES
// Proyecto: Portal de Laboratorio Clínico
// ========================================


// ========================================
// CREAR NOTIFICACIÓN
// Esta función se puede usar desde otros módulos.
// Ejemplo:
// crearNotificacion(uidPaciente, "Su resultado ya está disponible.", "RESULTADO");
// ========================================

async function crearNotificacion(uidUsuario, mensaje, tipo = "GENERAL") {
    if (!uidUsuario || !mensaje) {
        console.warn("No se pudo crear notificación: faltan datos.");
        return;
    }

    try {
        await db.collection("notificaciones").add({
            uid_usuario: uidUsuario,
            mensaje: mensaje,
            tipo: tipo,
            estado: "NO LEIDO",
            fecha_creacion: new Date()
        });

        console.log("Notificación creada correctamente.");

    } catch (error) {
        console.error("Error al crear notificación:", error);
    }
}


// ========================================
// LISTAR NOTIFICACIONES
// Si es ADMINISTRADOR: ve todas.
// Si es PACIENTE o LABORATORISTA: ve solo las suyas.
// ========================================

function listarNotificaciones() {
    auth.onAuthStateChanged(async function(user) {
        if (!user) {
            window.location.href = "login.html";
            return;
        }

        const contenedor = document.getElementById("lista_notificaciones");
        const contadorNoLeidas = document.getElementById("contador_no_leidas");

        if (!contenedor) return;

        contenedor.innerHTML = `
            <div class="text-center text-muted">
                Cargando notificaciones...
            </div>
        `;

        try {
            const usuarioDoc = await db.collection("usuarios").doc(user.uid).get();

            if (!usuarioDoc.exists) {
                contenedor.innerHTML = `
                    <div class="alert alert-danger">
                        Usuario no encontrado.
                    </div>
                `;
                return;
            }

            const usuario = usuarioDoc.data();
            let snapshot;

            if (usuario.rol === "ADMINISTRADOR") {
                snapshot = await db.collection("notificaciones").get();
            } else {
                snapshot = await db.collection("notificaciones")
                    .where("uid_usuario", "==", user.uid)
                    .get();
            }

            if (snapshot.empty) {
                contenedor.innerHTML = `
                    <div class="alert alert-info">
                        No tienes notificaciones registradas.
                    </div>
                `;

                if (contadorNoLeidas) {
                    contadorNoLeidas.textContent = "0 no leídas";
                }

                return;
            }

            let notificaciones = [];

            snapshot.forEach((doc) => {
                notificaciones.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            // Ordenar por fecha en JavaScript para evitar problemas de índices en Firestore
            notificaciones.sort((a, b) => {
                const fechaA = a.fecha_creacion?.toDate ? a.fecha_creacion.toDate() : new Date(0);
                const fechaB = b.fecha_creacion?.toDate ? b.fecha_creacion.toDate() : new Date(0);

                return fechaB - fechaA;
            });

            let totalNoLeidas = notificaciones.filter(n => n.estado === "NO LEIDO").length;

            if (contadorNoLeidas) {
                contadorNoLeidas.textContent = `${totalNoLeidas} no leídas`;
            }

            contenedor.innerHTML = "";

            notificaciones.forEach((notificacion) => {
                const fecha = notificacion.fecha_creacion?.toDate
                    ? notificacion.fecha_creacion.toDate().toLocaleString("es-PE")
                    : "Sin fecha";

                const estado = notificacion.estado || "NO LEIDO";
                const tipo = notificacion.tipo || "GENERAL";

                const claseEstado = estado === "NO LEIDO"
                    ? "border-danger"
                    : "border-secondary";

                const badgeEstado = estado === "NO LEIDO"
                    ? "bg-danger"
                    : "bg-secondary";

                const botonLeido = estado === "NO LEIDO"
                    ? `
                        <button class="btn btn-sm btn-success mt-2" onclick="marcarNotificacionLeida('${notificacion.id}')">
                            Marcar como leída
                        </button>
                      `
                    : `
                        <span class="text-muted d-block mt-2">
                            Notificación leída
                        </span>
                      `;

                const card = `
                    <div class="card mb-3 ${claseEstado}">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <h6 class="mb-1">${tipo}</h6>
                                    <p class="mb-1">${notificacion.mensaje}</p>
                                    <small class="text-muted">${fecha}</small>
                                </div>

                                <span class="badge ${badgeEstado}">
                                    ${estado}
                                </span>
                            </div>

                            ${botonLeido}
                        </div>
                    </div>
                `;

                contenedor.innerHTML += card;
            });

        } catch (error) {
            console.error("Error al listar notificaciones:", error);

            contenedor.innerHTML = `
                <div class="alert alert-danger">
                    Error al cargar notificaciones.
                </div>
            `;
        }
    });
}


// ========================================
// MARCAR NOTIFICACIÓN COMO LEÍDA
// ========================================

async function marcarNotificacionLeida(idNotificacion) {
    if (!idNotificacion) return;

    try {
        await db.collection("notificaciones").doc(idNotificacion).update({
            estado: "LEIDO",
            fecha_lectura: new Date()
        });

        alert("Notificación marcada como leída.");
        listarNotificaciones();

    } catch (error) {
        console.error("Error al marcar notificación:", error);
        alert("No se pudo marcar la notificación.");
    }
}


// ========================================
// CREAR NOTIFICACIÓN DE PRUEBA
// Opcional para probar desde consola:
// crearNotificacionPrueba();
// ========================================

function crearNotificacionPrueba() {
    auth.onAuthStateChanged(async function(user) {
        if (!user) {
            alert("Debes iniciar sesión.");
            return;
        }

        await crearNotificacion(
            user.uid,
            "Notificación de prueba del sistema.",
            "PRUEBA"
        );

        listarNotificaciones();
    });
}