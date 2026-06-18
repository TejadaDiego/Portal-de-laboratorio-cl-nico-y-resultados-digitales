# 🧪 Proyecto AA1 - Portal de Laboratorio Clínico y Resultados Digitales

## Descripción del Proyecto

Este proyecto consiste en el desarrollo de un portal web para un laboratorio clínico que desea entregar los resultados de análisis médicos de manera digital, ordenada y segura.

Actualmente, muchos laboratorios entregan resultados de forma física o mediante canales poco organizados, como WhatsApp, correos personales o documentos impresos. Esto puede generar demoras, pérdida de información, falta de control y dificultad para que el paciente consulte su historial de análisis.

La solución propuesta permitirá registrar pacientes, registrar solicitudes de análisis, cargar resultados en PDF o datos simulados, notificar al paciente cuando su resultado esté disponible y permitir la consulta del historial de análisis.

El proyecto será desarrollado usando tecnologías web y Firebase, evitando la necesidad de trabajar con PHP o MySQL. Firebase permitirá manejar autenticación, base de datos, almacenamiento de archivos PDF y control básico de acceso.

---

# Objetivo General

Desarrollar un portal web para un laboratorio clínico que permita gestionar digitalmente el registro de pacientes, solicitudes de análisis, carga de resultados y consulta segura del historial médico, mejorando la organización y entrega de resultados al paciente.

---

# Caso Asignado

## Caso 14: Portal de laboratorio clínico y resultados digitales

### Contexto

Un laboratorio quiere entregar resultados a pacientes de manera digital.

### Problema

Los resultados se entregan físicamente o por canales poco organizados.

### Usuarios del sistema

- Paciente.
- Laboratorista.
- Administrador.

### MVP esperado

- Registro de pacientes.
- Registro de solicitudes de análisis.
- Carga de resultados en PDF o datos simulados.
- Notificación de resultado disponible.
- Historial de análisis.
- Gestión documental.
- Control de acceso.
- Seguridad básica de archivos.

---

# Tecnologías Utilizadas

Para el desarrollo del proyecto se utilizarán las siguientes tecnologías:

- HTML5.
- CSS3.
- JavaScript.
- Bootstrap 5.
- Firebase Authentication.
- Firebase Firestore.
- Firebase Storage.
- Git.
- GitHub.
- Visual Studio Code.
- Figma o Canva para prototipos.
- Draw.io para diagramas.

---

# Servicios de Firebase Utilizados

## Firebase Authentication

Se utilizará para manejar el registro e inicio de sesión de los usuarios.

Permitirá:

- Registrar pacientes.
- Iniciar sesión.
- Cerrar sesión.
- Identificar al usuario autenticado.
- Controlar el acceso según el usuario.

---

## Firebase Firestore

Se utilizará como base de datos NoSQL del sistema.

Permitirá almacenar:

- Usuarios.
- Pacientes.
- Solicitudes de análisis.
- Tipos de análisis.
- Resultados.
- Notificaciones.

---

## Firebase Storage

Se utilizará para almacenar los resultados en formato PDF.

Permitirá:

- Subir archivos PDF.
- Obtener la URL del archivo.
- Asociar el archivo a una solicitud.
- Controlar el acceso básico a los documentos.

---

# Roles del Sistema

El sistema contará con tres roles principales.

---

## Paciente

El paciente es el usuario que podrá consultar sus análisis y resultados.

### Funciones del paciente

- Registrarse en el sistema.
- Iniciar sesión.
- Ver sus solicitudes de análisis.
- Consultar resultados disponibles.
- Descargar resultados en PDF.
- Revisar su historial de análisis.
- Recibir notificaciones dentro del sistema.

---

## Laboratorista

El laboratorista es el usuario encargado de registrar solicitudes y cargar resultados.

### Funciones del laboratorista

- Iniciar sesión.
- Registrar pacientes.
- Registrar solicitudes de análisis.
- Seleccionar el tipo de análisis.
- Cargar resultados en PDF.
- Registrar resultados simulados.
- Cambiar el estado de una solicitud.
- Marcar un resultado como disponible.
- Ver solicitudes pendientes y completadas.

---

## Administrador

El administrador es el usuario encargado de gestionar el sistema y controlar accesos.

### Funciones del administrador

- Iniciar sesión.
- Gestionar usuarios.
- Asignar roles.
- Activar o desactivar usuarios.
- Supervisar pacientes.
- Supervisar solicitudes de análisis.
- Supervisar resultados cargados.
- Controlar la seguridad básica del sistema.

---

# Estructura del Proyecto

```text
portal_laboratorio_firebase/
│
├── index.html
├── README.md
│
├── pages/
│   ├── login.html
│   ├── registro.html
│   ├── dashboard_paciente.html
│   ├── dashboard_laboratorista.html
│   ├── dashboard_admin.html
│   ├── pacientes.html
│   ├── solicitudes.html
│   ├── resultados.html
│   ├── historial.html
│   ├── usuarios.html
│   └── notificaciones.html
│
├── css/
│   └── estilos.css
│
├── js/
│   ├── firebase-config.js
│   ├── auth.js
│   ├── pacientes.js
│   ├── solicitudes.js
│   ├── resultados.js
│   ├── historial.js
│   ├── usuarios.js
│   └── notificaciones.js
│
├── img/
│   └── logo.png
│
└── docs/
    ├── diagramas/
    ├── prototipos/
    └── informe/
```

---

# Descripción de Carpetas

## pages/

Contiene las páginas principales del sistema.

Ejemplos:

```text
pages/login.html
pages/registro.html
pages/dashboard_paciente.html
pages/solicitudes.html
pages/resultados.html
```

---

## css/

Contiene los estilos visuales del sistema.

Ejemplo:

```text
css/estilos.css
```

---

## js/

Contiene la lógica del sistema en JavaScript.

Ejemplos:

```text
js/firebase-config.js
js/auth.js
js/pacientes.js
js/solicitudes.js
js/resultados.js
```

---

## img/

Contiene imágenes del sistema, como logo o íconos.

Ejemplo:

```text
img/logo.png
```

---

## docs/

Contiene la documentación del proyecto.

Incluye:

- Diagramas.
- Prototipos.
- Informe.
- Capturas de pantalla.
- Evidencias del desarrollo.

---

# 🧩 Módulos del Sistema

El sistema estará dividido en los siguientes módulos principales.

---

## 1. Módulo de Autenticación

Permite controlar el acceso de los usuarios al sistema usando Firebase Authentication.

### Funciones

- Registro de usuario.
- Inicio de sesión.
- Cierre de sesión.
- Validación de usuario autenticado.
- Redirección según rol.
- Protección de páginas privadas.

### Archivos relacionados

```text
pages/login.html
pages/registro.html
js/auth.js
js/firebase-config.js
```

---

## 2. Módulo de Pacientes

Permite registrar y administrar información de los pacientes.

### Funciones

- Registrar paciente.
- Listar pacientes.
- Buscar paciente.
- Editar datos del paciente.
- Ver historial del paciente.

### Datos del paciente

- DNI.
- Nombres.
- Apellidos.
- Fecha de nacimiento.
- Teléfono.
- Correo.
- Dirección.

### Archivos relacionados

```text
pages/pacientes.html
js/pacientes.js
```

---

## 3. Módulo de Solicitudes de Análisis

Permite registrar los análisis solicitados por cada paciente.

### Funciones

- Crear solicitud de análisis.
- Seleccionar paciente.
- Seleccionar tipo de análisis.
- Registrar fecha de solicitud.
- Agregar observaciones.
- Cambiar estado de la solicitud.

### Estados de solicitud

```text
PENDIENTE
EN PROCESO
RESULTADO DISPONIBLE
ENTREGADO
```

### Archivos relacionados

```text
pages/solicitudes.html
js/solicitudes.js
```

---

## 4. Módulo de Resultados

Permite cargar y consultar los resultados de análisis.

### Funciones

- Cargar resultado en PDF usando Firebase Storage.
- Registrar resultado simulado.
- Asociar resultado a una solicitud.
- Cambiar estado a resultado disponible.
- Guardar la URL del PDF en Firestore.
- Permitir descarga del resultado.
- Validar que solo el usuario autorizado pueda ver el archivo.

### Archivos relacionados

```text
pages/resultados.html
js/resultados.js
```

---

## 5. Módulo de Historial

Permite que el paciente visualice todos sus análisis anteriores.

### Funciones

- Listar análisis del paciente.
- Ver fecha del análisis.
- Ver tipo de análisis.
- Ver estado.
- Descargar resultado si está disponible.
- Filtrar por fecha o tipo de análisis.

### Archivos relacionados

```text
pages/historial.html
js/historial.js
```

---

## 6. Módulo de Notificaciones

Permite avisar al paciente cuando su resultado esté listo.

### Funciones

- Crear notificación automática.
- Mostrar notificación en el panel del paciente.
- Marcar notificación como leída.
- Mostrar cantidad de notificaciones pendientes.

### Archivos relacionados

```text
pages/notificaciones.html
js/notificaciones.js
```

---

## 7. Módulo de Usuarios y Roles

Permite controlar los permisos de acceso al sistema.

### Funciones

- Listar usuarios.
- Editar usuarios.
- Activar o desactivar usuarios.
- Asignar rol.
- Controlar acceso por rol.

### Archivos relacionados

```text
pages/usuarios.html
js/usuarios.js
```

---

# 🗃️ Estructura de Base de Datos en Firestore

En Firebase no se trabajará con tablas SQL, sino con colecciones y documentos.

## Colecciones principales

```text
usuarios
pacientes
tipos_analisis
solicitudes
resultados
notificaciones
```

---

## Colección: usuarios

```text
usuarios
│
└── uid_usuario
    ├── uid
    ├── nombres
    ├── apellidos
    ├── correo
    ├── rol
    ├── estado
    └── fecha_creacion
```

### Ejemplo de documento

```json
{
  "uid": "abc123",
  "nombres": "Juan",
  "apellidos": "Pérez",
  "correo": "juan@gmail.com",
  "rol": "PACIENTE",
  "estado": "ACTIVO",
  "fecha_creacion": "2026-05-20"
}
```

---

## Colección: pacientes

```text
pacientes
│
└── paciente_id
    ├── uid
    ├── dni
    ├── nombres
    ├── apellidos
    ├── fecha_nacimiento
    ├── telefono
    ├── correo
    └── direccion
```

### Ejemplo de documento

```json
{
  "uid": "abc123",
  "dni": "76543210",
  "nombres": "Juan",
  "apellidos": "Pérez",
  "fecha_nacimiento": "2001-08-15",
  "telefono": "987654321",
  "correo": "juan@gmail.com",
  "direccion": "Lima, Perú"
}
```

---

## Colección: tipos_analisis

```text
tipos_analisis
│
└── tipo_analisis_id
    ├── nombre
    ├── descripcion
    ├── precio
    └── estado
```

### Ejemplo de documento

```json
{
  "nombre": "Hemograma completo",
  "descripcion": "Análisis de sangre general",
  "precio": 35.00,
  "estado": "ACTIVO"
}
```

---

## Colección: solicitudes

```text
solicitudes
│
└── solicitud_id
    ├── paciente_id
    ├── uid_paciente
    ├── paciente_nombre
    ├── tipo_analisis_id
    ├── tipo_analisis_nombre
    ├── fecha_solicitud
    ├── estado
    └── observaciones
```

### Ejemplo de documento

```json
{
  "paciente_id": "pac001",
  "uid_paciente": "abc123",
  "paciente_nombre": "Juan Pérez",
  "tipo_analisis_id": "ana001",
  "tipo_analisis_nombre": "Hemograma completo",
  "fecha_solicitud": "2026-05-20",
  "estado": "PENDIENTE",
  "observaciones": "Paciente en ayunas"
}
```

---

## Colección: resultados

```text
resultados
│
└── resultado_id
    ├── solicitud_id
    ├── paciente_id
    ├── uid_paciente
    ├── archivo_url
    ├── archivo_nombre
    ├── resultado_texto
    ├── fecha_carga
    └── cargado_por
```

### Ejemplo de documento

```json
{
  "solicitud_id": "sol001",
  "paciente_id": "pac001",
  "uid_paciente": "abc123",
  "archivo_url": "https://firebase-storage-url/resultado.pdf",
  "archivo_nombre": "resultado_sol001.pdf",
  "resultado_texto": "Resultado dentro de los valores normales",
  "fecha_carga": "2026-05-20",
  "cargado_por": "uid_laboratorista"
}
```

---

## Colección: notificaciones

```text
notificaciones
│
└── notificacion_id
    ├── uid_usuario
    ├── mensaje
    ├── estado
    ├── fecha_creacion
    └── tipo
```

### Ejemplo de documento

```json
{
  "uid_usuario": "abc123",
  "mensaje": "Su resultado del análisis Hemograma completo ya se encuentra disponible.",
  "estado": "NO LEIDO",
  "fecha_creacion": "2026-05-20",
  "tipo": "RESULTADO"
}
```

---

# 🖥️ Ejemplo Visual del Sistema

## Pantalla de Login

```text
-------------------------------------------------
|              LABORATORIO CLÍNICO              |
|                                               |
|        Correo:      [________________]        |
|        Contraseña:  [________________]        |
|                                               |
|              [ Iniciar sesión ]               |
|                                               |
|        ¿No tienes cuenta? Regístrate           |
-------------------------------------------------
```

---

## Registro de Paciente

```text
REGISTRO DE PACIENTE

DNI:                  [________________]
Nombres:              [________________]
Apellidos:            [________________]
Fecha nacimiento:     [________________]
Teléfono:             [________________]
Correo:               [________________]
Contraseña:           [________________]

[ Registrarme ]
```

---

## Dashboard del Paciente

```text
Bienvenido, Juan Pérez

-------------------------------------------------
| Solicitudes pendientes | Resultados disponibles |
|          2             |           1            |
-------------------------------------------------

Últimos análisis:

-------------------------------------------------
| Fecha       | Análisis            | Estado       |
| 10/05/2026  | Hemograma completo  | Disponible   |
| 12/05/2026  | Glucosa             | Pendiente    |
-------------------------------------------------
```

---

## Dashboard del Laboratorista

```text
Panel del Laboratorista

-------------------------------------------------
| Solicitudes pendientes | Resultados cargados hoy |
|          10            |            4            |
-------------------------------------------------

Solicitudes recientes:

-------------------------------------------------------
| Paciente     | Análisis            | Fecha       | Estado    |
| Juan Pérez   | Hemograma completo  | 10/05/2026  | Pendiente |
-------------------------------------------------------
```

---

## Dashboard del Administrador

```text
Panel Administrativo

-------------------------------------------------
| Total pacientes | Solicitudes | Resultados | Usuarios |
|      120        |     300     |    250     |    8     |
-------------------------------------------------

Últimos movimientos:

-------------------------------------------------------
| Usuario        | Acción                    | Fecha       |
| Laboratorista  | Cargó resultado PDF        | 10/05/2026  |
-------------------------------------------------------
```

---

# 🧭 Menús Según Rol

## Menú del Paciente

```text
LAB CLÍNICO

🏠 Inicio
🧪 Mis análisis
📄 Mis resultados
📚 Historial
👤 Mi perfil
🚪 Cerrar sesión
```

---

## Menú del Laboratorista

```text
LAB CLÍNICO

🏠 Inicio
👤 Pacientes
🧪 Solicitudes de análisis
📄 Cargar resultados
🔔 Notificaciones
🚪 Cerrar sesión
```

---

## Menú del Administrador

```text
LAB CLÍNICO

🏠 Inicio
👥 Usuarios
👤 Pacientes
🧪 Solicitudes
📄 Resultados
📊 Reportes
⚙ Configuración
🚪 Cerrar sesión
```

---

# 🔄 Flujo General del Sistema

```text
Usuario ingresa al portal
        ↓
Login o registro
        ↓
Firebase Authentication valida credenciales
        ↓
Firestore identifica el rol del usuario
        ↓
Redirección al panel correspondiente
        ↓
Paciente consulta resultados
Laboratorista registra/carga resultados
Administrador gestiona usuarios
```

---

# 🔄 Flujo del Paciente

```text
Paciente inicia sesión
        ↓
Ingresa al panel del paciente
        ↓
Visualiza sus solicitudes de análisis
        ↓
Revisa si tiene resultados disponibles
        ↓
Descarga el PDF del resultado
        ↓
Consulta su historial de análisis
```

---

# 🔄 Flujo del Laboratorista

```text
Laboratorista inicia sesión
        ↓
Busca o registra paciente
        ↓
Crea solicitud de análisis
        ↓
Selecciona tipo de análisis
        ↓
Marca la solicitud como EN PROCESO
        ↓
Carga resultado en PDF o texto simulado
        ↓
Firebase Storage guarda el PDF
        ↓
Firestore guarda la URL del resultado
        ↓
Cambia estado a RESULTADO DISPONIBLE
        ↓
Sistema genera notificación al paciente
```

---

# 🔄 Flujo del Administrador

```text
Administrador inicia sesión
        ↓
Gestiona usuarios
        ↓
Asigna roles
        ↓
Supervisa pacientes
        ↓
Supervisa solicitudes
        ↓
Supervisa resultados cargados
        ↓
Controla accesos del sistema
```

---

# 📊 Requerimientos Funcionales

| Código | Requerimiento | Prioridad |
|---|---|---|
| RF01 | El sistema debe permitir el registro de pacientes. | Alta |
| RF02 | El sistema debe permitir el inicio de sesión de usuarios mediante Firebase Authentication. | Alta |
| RF03 | El sistema debe redirigir al usuario según su rol. | Alta |
| RF04 | El laboratorista debe poder registrar solicitudes de análisis. | Alta |
| RF05 | El laboratorista debe poder cargar resultados en PDF usando Firebase Storage. | Alta |
| RF06 | El sistema debe permitir registrar resultados simulados. | Media |
| RF07 | El paciente debe poder consultar sus resultados. | Alta |
| RF08 | El paciente debe poder descargar sus resultados. | Alta |
| RF09 | El paciente debe poder ver su historial de análisis. | Alta |
| RF10 | El sistema debe notificar cuando un resultado esté disponible. | Media |
| RF11 | El administrador debe poder gestionar usuarios. | Media |
| RF12 | El administrador debe poder asignar roles. | Media |
| RF13 | El sistema debe permitir cambiar el estado de una solicitud. | Alta |
| RF14 | El sistema debe proteger el acceso a los archivos de resultados. | Alta |

---

# 📊 Requerimientos No Funcionales

| Código | Requerimiento | Prioridad |
|---|---|---|
| RNF01 | El sistema debe ser fácil de usar. | Alta |
| RNF02 | El sistema debe tener una interfaz web responsive. | Media |
| RNF03 | El sistema debe utilizar autenticación segura con Firebase Authentication. | Alta |
| RNF04 | El sistema debe controlar el acceso según el rol del usuario. | Alta |
| RNF05 | Los archivos PDF no deben ser accesibles por usuarios no autorizados. | Alta |
| RNF06 | El sistema debe tener una estructura ordenada de carpetas. | Media |
| RNF07 | El sistema debe permitir futuras mejoras. | Media |
| RNF08 | El sistema debe cargar la información de manera rápida. | Media |

---

# 🔐 Seguridad Básica del Sistema

El sistema debe aplicar medidas básicas para proteger la información del paciente y los archivos de resultados.

## Medidas consideradas

- Uso de Firebase Authentication para controlar el acceso.
- Registro de roles en Firestore.
- Validación del usuario autenticado antes de entrar a páginas privadas.
- Control de acceso por rol.
- Validación de archivos PDF antes de subirlos.
- Uso de Firebase Storage para almacenar los resultados.
- Restricción para que un paciente solo vea sus propios resultados.
- Renombrado de archivos subidos para evitar duplicados.
- Validación de extensiones permitidas.
- Reglas básicas de seguridad en Firebase Firestore y Storage.

---

# 🔒 Reglas de Acceso

## Paciente

Puede acceder a:

- Su panel principal.
- Sus análisis.
- Sus resultados.
- Su historial.
- Su perfil.

No puede acceder a:

- Datos de otros pacientes.
- Panel del laboratorista.
- Panel del administrador.
- Gestión de usuarios.

---

## Laboratorista

Puede acceder a:

- Panel del laboratorista.
- Registro de pacientes.
- Solicitudes de análisis.
- Carga de resultados.
- Listado de resultados.
- Notificaciones.

No puede acceder a:

- Configuración general del sistema.
- Eliminación total de usuarios.

---

## Administrador

Puede acceder a:

- Panel administrativo.
- Gestión de usuarios.
- Asignación de roles.
- Pacientes.
- Solicitudes.
- Resultados.
- Reportes.
- Configuración.

---

# 📄 Gestión Documental

El sistema permitirá almacenar resultados en formato PDF utilizando Firebase Storage.

## Reglas para los archivos

- Solo se permitirá subir archivos PDF.
- Cada resultado debe estar asociado a una solicitud de análisis.
- El archivo debe tener un nombre único.
- El paciente solo podrá descargar sus propios resultados.
- El laboratorista y administrador podrán consultar resultados según sus permisos.
- La URL del archivo se guardará en Firestore.

## Ejemplo de nombre de archivo

```text
resultado_solicitud_10_paciente_5.pdf
resultado_20260520_0001.pdf
```

---

# 🔔 Notificaciones

Cuando el laboratorista cargue un resultado, el sistema generará una notificación para el paciente.

## Ejemplo de mensaje

```text
Su resultado del análisis Hemograma completo ya se encuentra disponible.
```

## Estados de notificación

```text
NO LEIDO
LEIDO
```

---

# 🧾 Estados de Solicitud

| Estado | Descripción |
|---|---|
| PENDIENTE | La solicitud fue registrada, pero aún no se procesa. |
| EN PROCESO | El análisis está siendo trabajado por el laboratorio. |
| RESULTADO DISPONIBLE | El resultado ya fue cargado y puede ser visto por el paciente. |
| ENTREGADO | El paciente ya revisó o descargó el resultado. |

---

# 🎨 Diseño Visual Recomendado

El sistema tendrá una interfaz sencilla, limpia y ordenada.

## Colores sugeridos

- Azul oscuro para el menú lateral.
- Blanco para el fondo principal.
- Verde para resultados disponibles.
- Amarillo para edición o advertencias.
- Rojo para eliminación o bloqueo.
- Gris para botones secundarios.

## Componentes visuales

- Login moderno.
- Menú lateral.
- Barra superior.
- Tarjetas de resumen.
- Tablas de datos.
- Formularios.
- Modales.
- Alertas.
- Botones de acción.
- Notificaciones.

---

# 🧱 Pantallas Propuestas

## Pantallas generales

- Login.
- Registro de paciente.
- Recuperación de contraseña, opcional.

## Pantallas del paciente

- Dashboard del paciente.
- Mis análisis.
- Mis resultados.
- Historial de análisis.
- Perfil del paciente.

## Pantallas del laboratorista

- Dashboard del laboratorista.
- Listado de pacientes.
- Registro de paciente.
- Listado de solicitudes.
- Nueva solicitud de análisis.
- Carga de resultado.

## Pantallas del administrador

- Dashboard del administrador.
- Gestión de usuarios.
- Gestión de roles.
- Listado de pacientes.
- Listado de solicitudes.
- Listado de resultados.
- Reportes básicos.


# 🧪 Pruebas Mínimas del Sistema

Antes de entregar el proyecto, se deben probar los siguientes casos.

## Login

- Usuario correcto ingresa al sistema.
- Usuario incorrecto no ingresa.
- Usuario registrado se guarda correctamente.
- Usuario es redirigido según su rol.

## Roles

- Paciente entra solo a su panel.
- Laboratorista entra solo a sus módulos.
- Administrador entra a todos los módulos.

## Pacientes

- Se puede registrar un paciente.
- Se puede listar pacientes.
- Se puede editar un paciente.
- Se puede buscar un paciente.

## Solicitudes

- Se puede registrar una solicitud.
- Se puede cambiar el estado.
- Se puede ver en la lista.
- Se puede asociar a un paciente.

## Resultados

- Se puede subir un PDF.
- El resultado se guarda en Firebase Storage.
- La URL del PDF se guarda en Firestore.
- El resultado se asocia a una solicitud.
- El paciente puede descargar su resultado.
- Otro paciente no debe ver ese resultado.

## Notificaciones

- Se genera una notificación al cargar un resultado.
- El paciente puede ver la notificación.
- La notificación puede cambiar a leída.

---

# 🧭 Orden Recomendado de Desarrollo

```text
1. Crear estructura de carpetas.
2. Crear proyecto en Firebase.
3. Activar Authentication.
4. Activar Firestore.
5. Activar Storage.
6. Configurar firebase-config.js.
7. Crear login.
8. Crear registro.
9. Crear control por roles.
10. Crear dashboards según rol.
11. Crear módulo de pacientes.
12. Crear módulo de solicitudes de análisis.
13. Crear módulo de resultados.
14. Crear carga de PDF con Firebase Storage.
15. Crear historial del paciente.
16. Crear notificaciones.
17. Probar seguridad de acceso.
18. Corregir errores.
19. Preparar presentación final.
```

---

# 📌 Estado del Proyecto

```text
EN PLANIFICACIÓN
```

---

# 📌 Resultados Esperados

El proyecto permitirá implementar un portal web funcional para la gestión digital de resultados clínicos.

Con este sistema, el laboratorio podrá registrar pacientes, gestionar solicitudes, cargar resultados en PDF y notificar al paciente cuando sus resultados estén disponibles.

Además, el paciente podrá consultar su historial de análisis de manera ordenada y segura.

---

# 🚀 Conclusión

El Portal de Laboratorio Clínico y Resultados Digitales busca mejorar la entrega de resultados médicos mediante una plataforma web segura, organizada y accesible.

La solución propuesta permite reducir el uso de documentos físicos y canales informales, brindando al laboratorio una herramienta básica para gestionar pacientes, solicitudes, resultados y notificaciones.

Este MVP servirá como primera versión funcional del sistema y podrá ser ampliado en el futuro con nuevas funcionalidades como envío real de correos, firma digital, reportes avanzados, integración con sistemas clínicos y aplicación móvil.

---

## Organización técnica

La estructura actual separa vistas, estilos, controladores, servicios, validaciones, configuración de Firebase y documentación para facilitar el mantenimiento del proyecto.
