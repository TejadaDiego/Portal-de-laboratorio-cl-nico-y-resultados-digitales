/* ========================================
   LOGIN VALIDATION
   Conectado con Firebase mediante auth.js
======================================== */

document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");

    if (!loginForm) return;

    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        if (typeof iniciarSesion !== "function") {
            console.error("iniciarSesion no está disponible. Revisa que auth.js cargue antes que login-validation.js.");
            alert("Error interno: auth.js no cargó correctamente.");
            return;
        }

        await iniciarSesion();
    });
});