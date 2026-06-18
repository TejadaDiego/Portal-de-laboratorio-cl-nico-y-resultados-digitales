/* ========================================
   LOGIN VALIDATION
   Conectado con Firebase mediante auth.js
======================================== */

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function(event) {
        event.preventDefault();

        await iniciarSesion();
    });
}