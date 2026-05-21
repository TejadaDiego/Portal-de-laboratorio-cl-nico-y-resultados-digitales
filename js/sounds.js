/* ========================================
   SONIDOS RETRO ONLINE
======================================== */

/* CLICK */

const clickSound =
new Audio(
"https://www.myinstants.com/media/sounds/computer-mouse-click.mp3"
);

/* ERROR */

const errorSound =
new Audio(
"https://www.myinstants.com/media/sounds/windows-error.mp3"
);

/* SUCCESS */

const successSound =
new Audio(
"https://www.myinstants.com/media/sounds/pipboy-ui.mp3"
);

/* BOTONES */

document.querySelectorAll(".btn")
.forEach(button => {

  button.addEventListener(
    "click",
    () => {

      clickSound.currentTime = 0;

      clickSound.volume = 0.3;

      clickSound.play();

    }
  );

});

/* FUNCION ERROR */

function playErrorSound(){

  errorSound.currentTime = 0;

  errorSound.volume = 0.5;

  errorSound.play();

}

/* FUNCION SUCCESS */

function playSuccessSound(){

  successSound.currentTime = 0;

  successSound.volume = 0.5;

  successSound.play();

}