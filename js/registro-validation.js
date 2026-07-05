/* ========================================
   REGISTRO VALIDATION
   Conectado con Firebase mediante auth.js
======================================== */

document.addEventListener("DOMContentLoaded", function () {
    const registroForm = document.getElementById("registroForm");

    if (!registroForm) return;

    registroForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        if (typeof registrarPaciente !== "function") {
            console.error("registrarPaciente no está disponible. Revisa que auth.js cargue antes que registro-validation.js.");
            alert("Error interno: auth.js no cargó correctamente.");
            return;
        }

        await registrarPaciente();
    });
});