// ========================================
// AUTENTICACIÓN Y ROLES
// Proyecto: Portal de Laboratorio Clínico
// ========================================


// ========================================
// OBTENER VALOR DE INPUT
// ========================================
function obtenerValor(id) {
    const elemento = document.getElementById(id);
    return elemento ? elemento.value.trim() : "";
}


// ========================================
// REGISTRAR PACIENTE
// ========================================
async function registrarPaciente() {
    const dni = obtenerValor("dni");
    const nombres = obtenerValor("nombres");
    const apellidos = obtenerValor("apellidos");
    const fechaNacimiento = obtenerValor("fecha_nacimiento");
    const telefono = obtenerValor("telefono");
    const direccion = obtenerValor("direccion");
    const correo = obtenerValor("correo");
    const password = obtenerValor("password");

    if (
        dni === "" ||
        nombres === "" ||
        apellidos === "" ||
        correo === "" ||
        password === ""
    ) {
        alert("Por favor complete los campos obligatorios.");
        return;
    }

    if (password.length < 6) {
        alert("La contraseña debe tener mínimo 6 caracteres.");
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
            fecha_creacion: new Date()
        });

        await db.collection("pacientes").add({
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

        alert("Paciente registrado correctamente.");
        window.location.href = "login.html";

    } catch (error) {
        console.error("Error al registrar paciente:", error);

        if (error.code === "auth/email-already-in-use") {
            alert("Este correo ya está registrado.");
        } else if (error.code === "auth/invalid-email") {
            alert("El correo ingresado no es válido.");
        } else if (error.code === "auth/weak-password") {
            alert("La contraseña es muy débil. Usa mínimo 6 caracteres.");
        } else {
            alert("Error al registrar paciente: " + error.message);
        }
    }
}


// ========================================
// INICIAR SESIÓN
// ========================================
async function iniciarSesion() {
    const correo = obtenerValor("correo");
    const password = obtenerValor("password");

    if (correo === "" || password === "") {
        alert("Ingrese correo y contraseña.");
        return;
    }

    try {
        const credencial = await auth.signInWithEmailAndPassword(correo, password);
        const uid = credencial.user.uid;

        const usuarioDoc = await db.collection("usuarios").doc(uid).get();

        if (!usuarioDoc.exists) {
            alert("El usuario existe en Authentication, pero no tiene datos en Firestore.");
            await auth.signOut();
            return;
        }

        const usuario = usuarioDoc.data();

        if (usuario.estado !== "ACTIVO") {
            alert("El usuario se encuentra inactivo.");
            await auth.signOut();
            return;
        }

        redirigirPorRol(usuario.rol);

    } catch (error) {
        console.error("Error al iniciar sesión:", error);

        if (error.code === "auth/user-not-found") {
            alert("No existe una cuenta con ese correo.");
        } else if (error.code === "auth/wrong-password") {
            alert("Contraseña incorrecta.");
        } else if (error.code === "auth/invalid-email") {
            alert("Correo no válido.");
        } else if (error.code === "auth/invalid-credential") {
            alert("Correo o contraseña incorrectos.");
        } else {
            alert("Error al iniciar sesión: " + error.message);
        }
    }
}


// ========================================
// REDIRIGIR SEGÚN ROL
// ========================================
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

    alert("Rol no reconocido.");
}


// ========================================
// CERRAR SESIÓN
// ========================================
async function cerrarSesion() {
    try {
        await auth.signOut();
        window.location.href = "login.html";
    } catch (error) {
        console.error("Error al cerrar sesión:", error);
        alert("Error al cerrar sesión.");
    }
}


// ========================================
// VALIDAR SESIÓN ACTIVA
// ========================================
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
                alert("Tu usuario está inactivo.");
                await auth.signOut();
                window.location.href = "login.html";
                return;
            }

        } catch (error) {
            console.error("Error al validar sesión:", error);
            await auth.signOut();
            window.location.href = "login.html";
        }
    });
}


// ========================================
// VALIDAR UN SOLO ROL
// Ejemplo:
// validarRol("ADMINISTRADOR")
// ========================================
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
                alert("Tu usuario está inactivo.");
                await auth.signOut();
                window.location.href = "login.html";
                return;
            }

            if (usuario.rol !== rolPermitido) {
                alert("No tienes permiso para acceder a esta página.");
                redirigirPorRol(usuario.rol);
                return;
            }

        } catch (error) {
            console.error("Error al validar rol:", error);
            await auth.signOut();
            window.location.href = "login.html";
        }
    });
}


// ========================================
// VALIDAR VARIOS ROLES
// Ejemplo:
// validarRolesPermitidos(["LABORATORISTA", "ADMINISTRADOR"])
// ========================================
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
                alert("Tu usuario está inactivo.");
                await auth.signOut();
                window.location.href = "login.html";
                return;
            }

            if (!rolesPermitidos.includes(usuario.rol)) {
                alert("No tienes permiso para acceder a esta página.");
                redirigirPorRol(usuario.rol);
                return;
            }

        } catch (error) {
            console.error("Error al validar roles permitidos:", error);
            await auth.signOut();
            window.location.href = "login.html";
        }
    });
}