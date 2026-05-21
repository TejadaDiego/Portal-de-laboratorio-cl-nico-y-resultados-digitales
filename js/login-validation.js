/* js/login-validation.js COMPLETO CORREGIDO */

const loginForm = document.getElementById("loginForm");

const successMessage = document.getElementById("successMessage");

const errorScreen = document.getElementById("errorScreen");

const errorText = document.getElementById("errorText");

/* SUBMIT */

loginForm.addEventListener("submit", function(event){

  event.preventDefault();

  /* INPUTS */

  const correo = document.getElementById("correo").value.trim();

  const password = document.getElementById("password").value.trim();

  /* VALIDAR VACIOS */

  if(correo === "" || password === ""){

    showError("EMPTY FIELDS DETECTED");

    return;
  }

  /* VALIDAR CORREO */

  if(!correo.includes("@")){

    showError("INVALID EMAIL FORMAT");

    return;
  }

  /* VALIDAR PASSWORD */

  if(password.length < 6){

    showError("PASSWORD TOO SHORT");

    return;
  }

  /* LOGIN SIMULADO */

  successMessage.classList.remove("hidden");

  successMessage.classList.add("success-animation");

  /* LIMPIAR FORM */

  loginForm.reset();

  /* REDIRECCION */

  setTimeout(() => {

    window.location.href =
    "dashboard_paciente.html";

  }, 2000);

});

/* FUNCION ERROR */

function showError(message){

  errorText.innerText = message;

  errorScreen.classList.remove("hidden");

  errorScreen.classList.add("show");

  /* EFECTO SACUDIDA */

  document.body.classList.add("shake");

  setTimeout(() => {

    errorScreen.classList.remove("show");

    errorScreen.classList.add("hidden");

    document.body.classList.remove("shake");

  }, 2000);

}