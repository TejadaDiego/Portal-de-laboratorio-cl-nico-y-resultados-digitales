/* js/registro-validation.js COMPLETO ACTUALIZADO */

const form = document.getElementById("registroForm");

const successMessage = document.getElementById("successMessage");

const errorScreen = document.getElementById("errorScreen");

const errorText = document.getElementById("errorText");

/* FORM SUBMIT */

form.addEventListener("submit", function(event){

  event.preventDefault();

  /* INPUTS */

  const dni = document.getElementById("dni").value.trim();

  const nombres = document.getElementById("nombres").value.trim();

  const apellidos = document.getElementById("apellidos").value.trim();

  const correo = document.getElementById("correo").value.trim();

  const password = document.getElementById("password").value.trim();

  const telefono = document.getElementById("telefono").value.trim();

  const fechaNacimiento = document.getElementById("fechaNacimiento").value;

  const direccion = document.getElementById("direccion").value.trim();

  /* VALIDAR CAMPOS VACIOS */

  if(
    dni === "" ||
    nombres === "" ||
    apellidos === "" ||
    correo === "" ||
    password === "" ||
    telefono === "" ||
    fechaNacimiento === "" ||
    direccion === ""
  ){

    showError("EMPTY FIELDS DETECTED");

    return;
  }

  /* VALIDACION DNI */

  if(!/^\d{8}$/.test(dni)){

    showError("DNI MUST CONTAIN 8 DIGITS");

    return;
  }

  /* VALIDACION NOMBRES */

  if(nombres.length < 2){

    showError("INVALID NAME DETECTED");

    return;
  }

  /* VALIDACION APELLIDOS */

  if(apellidos.length < 2){

    showError("INVALID LASTNAME DETECTED");

    return;
  }

  /* VALIDACION CORREO */

  if(!correo.includes("@")){

    showError("INVALID EMAIL FORMAT");

    return;
  }

  /* VALIDACION PASSWORD */

  if(password.length < 6){

    showError("PASSWORD TOO SHORT");

    return;
  }

  /* VALIDACION TELEFONO */

  if(!/^\d{9}$/.test(telefono)){

    showError("INVALID PHONE NUMBER");

    return;
  }

  /* VALIDACION DIRECCION */

  if(direccion.length < 5){

    showError("INVALID ADDRESS");

    return;
  }

  /* EXITO */

  successMessage.classList.remove("hidden");

  successMessage.classList.add("success-animation");

  form.reset();

});

/* FUNCION ERROR */

function showError(message){

  errorText.innerText = message;

  errorScreen.classList.remove("hidden");

  errorScreen.classList.add("show");

  /* EFECTO SACUDIDA */

  document.body.classList.add("shake");

  /* SONIDO ERROR OPCIONAL */

  // const errorSound = new Audio("../audio/error.mp3");
  // errorSound.play();

  setTimeout(() => {

    errorScreen.classList.remove("show");

    errorScreen.classList.add("hidden");

    document.body.classList.remove("shake");

  }, 2000);

}