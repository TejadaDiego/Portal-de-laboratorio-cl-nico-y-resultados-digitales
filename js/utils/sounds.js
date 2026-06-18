/* ========================================
   SONIDOS RETRO ONLINE
   Archivo: js/sounds.js
======================================== */


/* ========================================
   CREAR AUDIOS
======================================== */

const clickSound = new Audio(
    "https://www.myinstants.com/media/sounds/computer-mouse-click.mp3"
);

const errorSound = new Audio(
    "https://www.myinstants.com/media/sounds/windows-error.mp3"
);

const successSound = new Audio(
    "https://www.myinstants.com/media/sounds/pipboy-ui.mp3"
);


/* ========================================
   CONFIGURACIÓN DE VOLUMEN
======================================== */

clickSound.volume = 0.3;
errorSound.volume = 0.5;
successSound.volume = 0.5;


/* ========================================
   REPRODUCIR AUDIO SEGURO
======================================== */

function reproducirAudio(audio) {
    if (!audio) return;

    try {
        audio.currentTime = 0;

        const promesa = audio.play();

        if (promesa !== undefined) {
            promesa.catch(() => {
                console.warn("El navegador bloqueó el sonido hasta que el usuario interactúe.");
            });
        }

    } catch (error) {
        console.warn("No se pudo reproducir el sonido:", error);
    }
}


/* ========================================
   SONIDO CLICK EN BOTONES
======================================== */

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".btn").forEach(function (button) {
        button.addEventListener("click", function () {
            reproducirAudio(clickSound);
        });
    });
});


/* ========================================
   FUNCIÓN ERROR
   Usada por auth.js
======================================== */

function playErrorSound() {
    reproducirAudio(errorSound);
}


/* ========================================
   FUNCIÓN SUCCESS
   Usada por auth.js
======================================== */

function playSuccessSound() {
    reproducirAudio(successSound);
}