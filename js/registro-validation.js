/* ========================================
   REGISTRO VALIDATION
   Conectado con Firebase mediante auth.js
======================================== */

const registroForm = document.getElementById("registroForm");

if (registroForm) {
    registroForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        await registrarPaciente();
    });
}