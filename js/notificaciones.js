// ========================================
// CAMBIAR ESTADO DE SOLICITUD
// Genera notificación cuando el resultado esté disponible
// ========================================
async function cambiarEstadoSolicitud(idSolicitud, nuevoEstado) {
    if (nuevoEstado === "") return;

    try {
        // 1. Obtener la solicitud antes de actualizar
        const solicitudDoc = await db.collection("solicitudes")
            .doc(idSolicitud)
            .get();

        if (!solicitudDoc.exists) {
            alert("Solicitud no encontrada.");
            return;
        }

        const solicitud = solicitudDoc.data();

        // 2. Actualizar estado de la solicitud
        await db.collection("solicitudes")
            .doc(idSolicitud)
            .update({
                estado: nuevoEstado,
                fecha_actualizacion: new Date()
            });

        // 3. Crear notificación solo cuando el resultado esté disponible
        if (nuevoEstado === "RESULTADO DISPONIBLE") {
            await crearNotificacion(
                solicitud.uid_paciente,
                `Su resultado del análisis ${solicitud.tipo_analisis_nombre} ya se encuentra disponible.`,
                "RESULTADO"
            );
        }

        alert("Estado actualizado correctamente.");
        listarSolicitudes();

    } catch (error) {
        console.error("Error al cambiar estado:", error);
        alert("Error al cambiar estado.");
    }
}