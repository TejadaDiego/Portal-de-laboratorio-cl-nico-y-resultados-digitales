/* ========================================
   AUTENTICACIÓN Y ROLES
   PORTAL LABORATORIO CLÍNICO
======================================== */


/* ========================================
   OBTENER VALOR INPUT
======================================== */

function obtenerValor(id) {
    const elemento = document.getElementById(id);
    return elemento ? elemento.value.trim() : "";
}


/* ========================================
   SONIDOS SEGUROS
======================================== */

function reproducirExito() {
    try {
        if (typeof playSuccessSound === "function") {
            playSuccessSound();
        }
    } catch (error) {
        console.warn("No se pudo reproducir sonido de éxito.");
    }
}

function reproducirError() {
    try {
        if (typeof playErrorSound === "function") {
            playErrorSound();
        }
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

    reproducirError();

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
        const credencial = await auth.createUserWithEmailAndPassword(correo, password);
        const uid = credencial.user.uid;

        await db.collection("usuarios").doc(uid).set({
            uid: uid,
            nombres: nombres,
            apellidos: apellidos,
            correo: correo,
            rol: "PACIENTE",
            estado: "ACTIVO",
            proveedor: "EMAIL",
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
            proveedor: "EMAIL",
            fecha_creacion: new Date()
        });

        reproducirExito();

        if (successMessage) {
            successMessage.classList.remove("hidden");
        }

        const registroForm = document.getElementById("registroForm");

        if (registroForm) {
            registroForm.reset();
        }

        setTimeout(() => {
            window.location.href = "login.html";
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
   INICIAR SESIÓN CON CORREO Y CONTRASEÑA
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
        const credencial = await auth.signInWithEmailAndPassword(correo, password);
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

        reproducirExito();

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
   INICIAR SESIÓN CON GOOGLE
======================================== */

async function iniciarConGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const successMessage = document.getElementById("successMessage");

    try {
        const resultado = await auth.signInWithPopup(provider);
        const user = resultado.user;

        const uid = user.uid;
        const correo = user.email || "";
        const nombreCompleto = user.displayName || "Usuario";

        const partesNombre = nombreCompleto.trim().split(" ");

        const nombres = partesNombre.length > 1
            ? partesNombre.slice(0, 2).join(" ")
            : nombreCompleto;

        const apellidos = partesNombre.length > 2
            ? partesNombre.slice(2).join(" ")
            : "";

        const usuarioDoc = await db.collection("usuarios").doc(uid).get();

        if (!usuarioDoc.exists) {
            await db.collection("usuarios").doc(uid).set({
                uid: uid,
                nombres: nombres,
                apellidos: apellidos,
                correo: correo,
                rol: "PACIENTE",
                estado: "ACTIVO",
                proveedor: "GOOGLE",
                fecha_creacion: new Date()
            });

            await db.collection("pacientes").doc(uid).set({
                uid: uid,
                dni: "",
                nombres: nombres,
                apellidos: apellidos,
                fecha_nacimiento: "",
                telefono: "",
                correo: correo,
                direccion: "",
                estado: "ACTIVO",
                proveedor: "GOOGLE",
                fecha_creacion: new Date()
            });
        }

        const usuarioActualizadoDoc = await db.collection("usuarios").doc(uid).get();

        if (!usuarioActualizadoDoc.exists) {
            showError("USER DATA NOT FOUND");
            await auth.signOut();
            return;
        }

        const usuario = usuarioActualizadoDoc.data();

        if (usuario.estado !== "ACTIVO") {
            showError("USER INACTIVE");
            await auth.signOut();
            return;
        }

        reproducirExito();

        if (successMessage) {
            successMessage.classList.remove("hidden");
        }

        setTimeout(() => {
            redirigirPorRol(usuario.rol);
        }, 1500);

    } catch (error) {
        console.error("Error con Google:", error);

        if (error.code === "auth/popup-closed-by-user") {
            showError("GOOGLE LOGIN CANCELLED");
        } else if (error.code === "auth/popup-blocked") {
            showError("POPUP BLOCKED BY BROWSER");
        } else if (error.code === "auth/account-exists-with-different-credential") {
            showError("EMAIL ALREADY USED WITH ANOTHER METHOD");
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
        window.location.href = "dashboard_paciente.html";
        return;
    }

    if (rol === "LABORATORISTA") {
        window.location.href = "dashboard_laboratorista.html";
        return;
    }

    if (rol === "ADMINISTRADOR") {
        window.location.href = "dashboard_admin.html";
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
        window.location.href = "login.html";
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
            window.location.href = "login.html";
            return;
        }

        try {
            const usuarioDoc = await db.collection("usuarios").doc(user.uid).get();

            if (!usuarioDoc.exists) {
                await auth.signOut();
                window.location.href = "login.html";
                return;
            }

            const usuario = usuarioDoc.data();

            if (usuario.estado !== "ACTIVO") {
                showError("USER INACTIVE");
                await auth.signOut();
                window.location.href = "login.html";
                return;
            }

        } catch (error) {
            console.error(error);
            await auth.signOut();
            window.location.href = "login.html";
        }
    });
}


/* ========================================
   VALIDAR UN SOLO ROL
======================================== */

function validarRol(rolPermitido) {
    auth.onAuthStateChanged(async function(user) {
        if (!user) {
            window.location.href = "login.html";
            return;
        }

        try {
            const usuarioDoc = await db.collection("usuarios").doc(user.uid).get();

            if (!usuarioDoc.exists) {
                await auth.signOut();
                window.location.href = "login.html";
                return;
            }

            const usuario = usuarioDoc.data();

            if (usuario.estado !== "ACTIVO") {
                showError("USER INACTIVE");
                await auth.signOut();
                window.location.href = "login.html";
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
            window.location.href = "login.html";
        }
    });
}


/* ========================================
   VALIDAR VARIOS ROLES
======================================== */

function validarRolesPermitidos(rolesPermitidos) {
    auth.onAuthStateChanged(async function(user) {
        if (!user) {
            window.location.href = "login.html";
            return;
        }

        try {
            const usuarioDoc = await db.collection("usuarios").doc(user.uid).get();

            if (!usuarioDoc.exists) {
                await auth.signOut();
                window.location.href = "login.html";
                return;
            }

            const usuario = usuarioDoc.data();

            if (usuario.estado !== "ACTIVO") {
                showError("USER INACTIVE");
                await auth.signOut();
                window.location.href = "login.html";
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
            window.location.href = "login.html";
        }
    });
}


/* ========================================
   EXPONER FUNCIONES GLOBALMENTE
======================================== */

window.iniciarSesion = iniciarSesion;
window.iniciarConGoogle = iniciarConGoogle;
window.registrarPaciente = registrarPaciente;
window.cerrarSesion = cerrarSesion;
window.validarSesion = validarSesion;
window.validarRol = validarRol;
window.validarRolesPermitidos = validarRolesPermitidos;