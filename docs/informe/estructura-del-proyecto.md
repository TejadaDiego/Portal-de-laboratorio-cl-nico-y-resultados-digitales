# Estructura organizada del proyecto

El proyecto fue reorganizado para separar responsabilidades por tipo de archivo y función.

```text
PORTAL-LABORATORIO-CLINICO-ORGANIZADO/
├── index.html
├── README.md
├── assets/
│   └── img/
│       ├── logos/
│       ├── icons/
│       └── backgrounds/
├── css/
│   ├── base/
│   ├── layout/
│   ├── components/
│   └── pages/
├── js/
│   ├── config/
│   ├── services/
│   ├── controllers/
│   ├── validations/
│   ├── components/
│   └── utils/
├── pages/
│   ├── auth/
│   ├── paciente/
│   ├── laboratorista/
│   └── administrador/
└── docs/
    ├── diagramas/
    ├── prototipos/
    └── informe/
```

## Flujo recomendado

HTML → Controllers JS → Validations JS → Services JS → Firebase

## Carpetas principales

- `assets/`: imágenes, íconos y recursos visuales.
- `css/`: estilos separados en base, páginas, componentes y layout.
- `js/config/`: configuración de Firebase.
- `js/services/`: conexión con Firebase y lógica principal.
- `js/controllers/`: funciones específicas de cada vista.
- `js/validations/`: validaciones de formularios.
- `pages/`: pantallas del sistema agrupadas por usuario.
- `docs/`: documentación, diagramas, prototipos e informe.
