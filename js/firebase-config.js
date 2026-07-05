// ========================================
// CONFIGURACIÓN DE FIREBASE
// ========================================

const firebaseConfig = {
    apiKey: "AIzaSyA7eVTGdrBh0ewTSLDQEJzQjWDtA5gvnsk",
    authDomain: "portal-laboratorio-clinico.firebaseapp.com",
    projectId: "portal-laboratorio-clinico",
    storageBucket: "portal-laboratorio-clinico.firebasestorage.app",
    messagingSenderId: "903950531385",
    appId: "1:903950531385:web:7f566265a1d28c069086e8"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);

// Servicios usados
const auth = firebase.auth();
const db = firebase.firestore();