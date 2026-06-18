/* ========================================
   AUTENTICACIÓN Y ROLES
   PORTAL LABORATORIO CLÍNICO
======================================== */



/* ========================================
   RUTAS DEL PROYECTO ORGANIZADO
======================================== */

function rutaPagina(nombre) {
    const rutas = {
        login: "../auth/login.html",
        registro: "../auth/registro.html",
        dashboard_paciente: "../paciente/dashboard_paciente.html",
        dashboard_laboratorista: "../laboratorista/dashboard_laboratorista.html",
        dashboard_admin: "../administrador/dashboard_admin.html"
    };
    return rutas[nombre] || nombre;
}

/* ========================================
   OBTENER VALOR INPUT
======================================== */

function obtenerValor(id) {
    const elemento = document.getElementById(id);
    return elemento ? elemento.value.trim() : "";
}


/* ========================================
   SONIDOS OPCIONALES
   Evita errores si no existen audios
======================================== */

function playSuccessSound() {
    try {
        const audio = document.getElementById("successSound");
        if (audio) audio.play();
    } catch (error) {
        console.warn("No se pudo reproducir sonido de éxito.");
    }
}

function playErrorSound() {
    try {
        const audio = document.getElementById("errorSound");
        if (audio) audio.play();
    } catch (error) {
        console.warn("No se pudo reproducir sonido de error.");
    }
}


/* ========================================
   MOSTRAR ERROR
======================================== */

function showError(message) {
    const errorScreen = document.getElementById("errorScreen");
    const errorText = document.getElementById("errorText");

    playErrorSound();

    if (errorScreen && errorText) {
        errorText.innerText = message;

        errorScreen.classList.remove("hidden");
        errorScreen.classList.add("show");

        document.body.classList.add("shake");

        setTimeout(() => {
            errorScreen.classList.remove("show");
            errorScreen.classList.add("hidden");
            document.body.classList.remove("shake");
        }, 2500);

    } else {
        alert(message);
    }
}


/* ========================================
   REGISTRAR PACIENTE
======================================== */

async function registrarPaciente() {
    const dni = obtenerValor("dni");
    const nombres = obtenerValor("nombres");
    const apellidos = obtenerValor("apellidos");
    const fechaNacimiento = obtenerValor("fecha_nacimiento");
    const telefono = obtenerValor("telefono");
    const direccion = obtenerValor("direccion");
    const correo = obtenerValor("correo");
    const password = obtenerValor("password");

    const successMessage = document.getElementById("successMessage");

    if (
        dni === "" ||
        nombres === "" ||
        apellidos === "" ||
        correo === "" ||
        password === ""
    ) {
        showError("EMPTY FIELDS DETECTED");
        return;
    }

    if (!/^\d{8}$/.test(dni)) {
        showError("DNI MUST CONTAIN 8 DIGITS");
        return;
    }

    if (password.length < 6) {
        showError("PASSWORD TOO SHORT");
        return;
    }

    if (telefono !== "" && !/^\d{9}$/.test(telefono)) {
        showError("INVALID PHONE NUMBER");
        return;
    }

    try {
        const credencial = await auth.createUserWithEmailAndPassword(
            correo,
            password
        );

        const uid = credencial.user.uid;

        await db.collection("usuarios").doc(uid).set({
            uid: uid,
            nombres: nombres,
            apellidos: apellidos,
            correo: correo,
            rol: "PACIENTE",
            estado: "ACTIVO",
            fecha_creacion: new Date()
        });

        await db.collection("pacientes").doc(uid).set({
            uid: uid,
            dni: dni,
            nombres: nombres,
            apellidos: apellidos,
            fecha_nacimiento: fechaNacimiento,
            telefono: telefono,
            correo: correo,
            direccion: direccion,
            estado: "ACTIVO",
            fecha_creacion: new Date()
        });

        playSuccessSound();

        if (successMessage) {
            successMessage.classList.remove("hidden");
        }

        const registroForm = document.getElementById("registroForm");

        if (registroForm) {
            registroForm.reset();
        }

        setTimeout(() => {
            window.location.href = rutaPagina("login");
        }, 2000);

    } catch (error) {
        console.error("Error al registrar:", error);

        if (error.code === "auth/email-already-in-use") {
            showError("EMAIL ALREADY REGISTERED");
        } else if (error.code === "auth/invalid-email") {
            showError("INVALID EMAIL FORMAT");
        } else if (error.code === "auth/weak-password") {
            showError("WEAK PASSWORD DETECTED");
        } else {
            showError(error.message);
        }
    }
}


/* ========================================
   INICIAR SESIÓN
======================================== */

async function iniciarSesion() {
    const correo = obtenerValor("correo");
    const password = obtenerValor("password");

    const successMessage = document.getElementById("successMessage");

    if (correo === "" || password === "") {
        showError("EMPTY FIELDS DETECTED");
        return;
    }

    if (!correo.includes("@")) {
        showError("INVALID EMAIL FORMAT");
        return;
    }

    if (password.length < 6) {
        showError("PASSWORD TOO SHORT");
        return;
    }

    try {
        const credencial = await auth.signInWithEmailAndPassword(
            correo,
            password
        );

        const uid = credencial.user.uid;

        const usuarioDoc = await db.collection("usuarios").doc(uid).get();

        if (!usuarioDoc.exists) {
            showError("USER DATA NOT FOUND");
            await auth.signOut();
            return;
        }

        const usuario = usuarioDoc.data();

        if (usuario.estado !== "ACTIVO") {
            showError("USER INACTIVE");
            await auth.signOut();
            return;
        }

        playSuccessSound();

        if (successMessage) {
            successMessage.classList.remove("hidden");
        }

        setTimeout(() => {
            redirigirPorRol(usuario.rol);
        }, 1500);

    } catch (error) {
        console.error("Error login:", error);

        if (error.code === "auth/user-not-found") {
            showError("USER NOT FOUND");
        } else if (error.code === "auth/wrong-password") {
            showError("WRONG PASSWORD");
        } else if (error.code === "auth/invalid-email") {
            showError("INVALID EMAIL");
        } else if (error.code === "auth/invalid-credential") {
            showError("INVALID CREDENTIALS");
        } else {
            showError(error.message);
        }
    }
}


/* ========================================
   REDIRECCIÓN POR ROL
======================================== */

function redirigirPorRol(rol) {
    if (rol === "PACIENTE") {
        window.location.href = rutaPagina("dashboard_paciente");
        return;
    }

    if (rol === "LABORATORISTA") {
        window.location.href = rutaPagina("dashboard_laboratorista");
        return;
    }

    if (rol === "ADMINISTRADOR") {
        window.location.href = rutaPagina("dashboard_admin");
        return;
    }

    showError("UNKNOWN ROLE");
}


/* ========================================
   CERRAR SESIÓN
======================================== */

async function cerrarSesion() {
    try {
        await auth.signOut();
        window.location.href = rutaPagina("login");
    } catch (error) {
        console.error("Logout error:", error);
        showError("LOGOUT FAILED");
    }
}


/* ========================================
   VALIDAR SESIÓN
======================================== */

function validarSesion() {
    auth.onAuthStateChanged(async function(user) {
        if (!user) {
            window.location.href = rutaPagina("login");
            return;
        }

        try {
            const usuarioDoc = await db.collection("usuarios").doc(user.uid).get();

            if (!usuarioDoc.exists) {
                await auth.signOut();
                window.location.href = rutaPagina("login");
                return;
            }

            const usuario = usuarioDoc.data();

            if (usuario.estado !== "ACTIVO") {
                showError("USER INACTIVE");
                await auth.signOut();
                window.location.href = rutaPagina("login");
                return;
            }

        } catch (error) {
            console.error(error);
            await auth.signOut();
            window.location.href = rutaPagina("login");
        }
    });
}


/* ========================================
   VALIDAR UN SOLO ROL
======================================== */

function validarRol(rolPermitido) {
    auth.onAuthStateChanged(async function(user) {
        if (!user) {
            window.location.href = rutaPagina("login");
            return;
        }

        try {
            const usuarioDoc = await db.collection("usuarios").doc(user.uid).get();

            if (!usuarioDoc.exists) {
                await auth.signOut();
                window.location.href = rutaPagina("login");
                return;
            }

            const usuario = usuarioDoc.data();

            if (usuario.estado !== "ACTIVO") {
                showError("USER INACTIVE");
                await auth.signOut();
                window.location.href = rutaPagina("login");
                return;
            }

            if (usuario.rol !== rolPermitido) {
                showError("ACCESS DENIED");
                redirigirPorRol(usuario.rol);
                return;
            }

        } catch (error) {
            console.error(error);
            await auth.signOut();
            window.location.href = rutaPagina("login");
        }
    });
}


/* ========================================
   VALIDAR VARIOS ROLES
   Ejemplo:
   validarRolesPermitidos(["LABORATORISTA", "ADMINISTRADOR"]);
======================================== */

function validarRolesPermitidos(rolesPermitidos) {
    auth.onAuthStateChanged(async function(user) {
        if (!user) {
            window.location.href = rutaPagina("login");
            return;
        }

        try {
            const usuarioDoc = await db.collection("usuarios").doc(user.uid).get();

            if (!usuarioDoc.exists) {
                await auth.signOut();
                window.location.href = rutaPagina("login");
                return;
            }

            const usuario = usuarioDoc.data();

            if (usuario.estado !== "ACTIVO") {
                showError("USER INACTIVE");
                await auth.signOut();
                window.location.href = rutaPagina("login");
                return;
            }

            if (!rolesPermitidos.includes(usuario.rol)) {
                showError("ACCESS DENIED");
                redirigirPorRol(usuario.rol);
                return;
            }

        } catch (error) {
            console.error(error);
            await auth.signOut();
            window.location.href = rutaPagina("login");
        }
    });
}