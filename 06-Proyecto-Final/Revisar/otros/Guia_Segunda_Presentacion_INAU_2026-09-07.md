# Guía resumida para la segunda presentación

## TheNewfutures — Sistema de Gestión de Talleres en Convenio con INAU

**Fecha de referencia:** 7 de septiembre de 2026

Esta guía resume el proyecto para una exposición. Está pensada para poder estudiarla, usarla como guía oral y seleccionar las diapositivas principales sin tener que repasar todos los documentos completos.

---

# 1. ¿Qué problema estamos resolviendo?

El proyecto nace de una necesidad real detectada mediante una entrevista.

El problema principal es la falta de una plataforma centralizada que mejore:

- organización;
- accesibilidad;
- disponibilidad;
- privacidad de la información;
- seguimiento de talleres y alumnos;
- control de asistencias;
- generación de información para la administración.

La entrevista también mostró que el proceso actual no estaba suficientemente digitalizado ni centralizado y que se buscaba una herramienta accesible desde diferentes dispositivos.

### Idea central para decir oralmente

> "No estamos haciendo una aplicación por hacerla: estamos intentando solucionar un problema de organización y seguimiento de los talleres. La plataforma centraliza la información y permite que cada rol vea y gestione solamente lo que necesita."

---

# 2. ¿De dónde salen los requisitos?

Los requisitos se construyeron a partir de:

1. documentación inicial del proyecto;
2. entrevista con el cliente/usuario experto;
3. análisis del equipo;
4. definición del alcance;
5. historias de usuario y backlog;
6. decisiones tomadas durante las reuniones del equipo.

La entrevista permitió conocer los roles, las funciones esperadas, los datos a registrar, los informes necesarios y los requisitos de disponibilidad, seguridad y dispositivos.

---

# 3. Roles del sistema

| Rol | Función principal |
|---|---|
| Administrador | Control y gestión global del sistema. |
| Tallerista | Gestión de sus talleres, alumnos relacionados, asistencias, material y tareas. |
| Alumno | Consulta de talleres, material y tareas, y entrega de trabajos. |

### Importante para la presentación

Actualmente el frontend de alumno **está diseñado pero todavía no tiene lógica JavaScript implementada**. No debemos presentarlo como terminado.

---

# 4. Visión general de la solución

La arquitectura propuesta es:

```text
                    USUARIO
                       │
                       ▼
              ┌────────────────┐
              │    FRONTEND    │
              │                │
              │ Administrador  │
              │ Tallerista     │
              │ Alumno         │
              └───────┬────────┘
                      │
                  Fetch API
                      │
                      ▼
              ┌────────────────┐
              │   API REST     │
              │      PHP       │
              └───────┬────────┘
                      │
                      ▼
              ┌────────────────┐
              │     MySQL      │
              └────────────────┘
                      │
                      └── Filesystem
                          para adjuntos
```

Actualmente el frontend funciona con datos simulados porque el backend todavía está pendiente.

---

# 5. Tecnologías elegidas

| Tecnología / herramienta | Para qué se utiliza |
|---|---|
| HTML5 | Estructura de páginas. |
| CSS3 | Personalización visual. |
| Bootstrap 5.3 | Responsive y componentes. |
| Bootstrap Icons | Iconos. |
| JavaScript Vanilla | Lógica del frontend. |
| Mock Data | Simulación de base de datos. |
| localStorage | Persistencia temporal durante el prototipo. |
| PHP | Backend previsto. |
| MySQL | Persistencia definitiva. |
| API REST | Comunicación entre capas. |
| Fetch API | Consumo de endpoints. |
| Filesystem | Archivos adjuntos. |
| Git / GitHub | Control de versiones y trazabilidad. |
| Visual Studio Code | Desarrollo. |
| XAMPP / Docker | Entorno local previsto. |

### ¿Por qué JavaScript Vanilla?

Se decidió no usar un framework de JavaScript para mantener una arquitectura que el equipo pueda comprender y mantener, reduciendo dependencias y complejidad durante el proyecto.

### ¿Por qué Bootstrap?

Porque permite construir rápidamente una interfaz responsive y reutilizar componentes sin tener que desarrollar desde cero todo el sistema visual.

---

# 6. ¿Qué se hizo hasta ahora?

## Frontend tallerista

Es la parte más avanzada.

### Módulos principales

| Módulo | Estado actual |
|---|---|
| Dashboard | Funcional con mock data. |
| Perfil | Funcional con restricciones de datos personales. |
| Mis Talleres | Listado, búsqueda y acceso a detalles. |
| Detalle del taller | Funcional y contextualizado por ID. |
| Asistencia | Registro y recuperación local. |
| Informes | Listado, filtros y estadísticas. |
| Detalle de informe | Consulta, impresión y descarga provisional. |
| Material | Estructura JavaScript implementada. |
| Corrección de tareas | Estructura JavaScript implementada. |

### Un flujo importante para demostrar

```text
Mis Talleres
     ↓
Detalle del taller
     ↓
Asistencia
     ↓
Seleccionar estado de cada alumno
     ↓
Guardar
     ↓
Recuperar registro
```

Otro flujo:

```text
Mis Talleres
     ↓
Detalle del taller
     ↓
Informes
     ↓
Detalle de informe
```

---

# 7. Frontend administrador

Actualmente posee 11 páginas HTML y 15 archivos JavaScript.

### Módulos

| Módulo | Función |
|---|---|
| Dashboard | Resumen general del sistema. |
| Talleristas | Listado, búsqueda y gestión simulada. |
| Detalle tallerista | Información y estadísticas del tallerista. |
| Alumnos | Listado y gestión simulada. |
| Detalle alumno | Información y estadísticas. |
| Talleres | Listado y gestión. |
| Detalle taller | Información y alumnos del taller. |
| Asistencias | Consulta y corrección. |
| Reportes | Consulta y generación simulada. |
| Detalle reporte | Resumen del reporte. |
| Perfil | Datos del administrador. |

El administrador es el rol con mayor alcance porque debe supervisar la información del sistema.

---

# 8. Frontend alumno

Actualmente existen las vistas HTML/CSS para:

- dashboard;
- mis talleres;
- detalle de taller;
- tareas;
- detalle de tarea;
- asistencia;
- perfil.

Pero todavía falta implementar su JavaScript.

Por lo tanto, para la presentación conviene decir:

> "El panel alumno ya tiene definida la estructura visual y funcional de las pantallas, pero el desarrollo dinámico se encuentra pendiente."

---

# 9. Mock Data: ¿por qué lo usamos?

El mock data funciona como una base de datos temporal en JavaScript.

Ejemplo conceptual:

```javascript
window.DATOS_SIMULADOS = {
    talleres: [...],
    alumnos: [...],
    talleristas: [...],
    asistencias: [...],
    reportes: [...]
};
```

Esto permite desarrollar y probar la interfaz sin esperar a que PHP y MySQL estén terminados.

La idea es que el HTML y gran parte de la lógica puedan mantenerse cuando se haga la integración:

```text
HOY
mock-data.js → JavaScript

DESPUÉS
API REST → Fetch → JavaScript
```

---

# 10. Modularización del JavaScript

No se puso todo en un único archivo.

Existe un `main.js` común que:

- detecta la página actual;
- muestra el usuario;
- maneja el cierre de sesión;
- ejecuta la función inicializadora correspondiente.

Después cada pantalla tiene su propio JS:

```text
main.js
   ↓
 dashboard.js
 talleristas.js
 alumnos.js
 talleres.js
 asistencias.js
 reportes.js
 perfil.js
 etc.
```

Esto mejora la organización y permite trabajar módulo por módulo.

---

# 11. Navegación mediante IDs

Las pantallas de detalle usan parámetros de URL.

Ejemplo:

```text
 detalle-tallerista.html?id=5
```

JavaScript obtiene el ID, busca el registro correspondiente y renderiza sus datos.

El mismo concepto se usa en talleres, alumnos, informes y otros detalles.

Esto prepara el frontend para trabajar posteriormente con endpoints como:

```text
GET /talleristas/5
GET /talleres/2
GET /alumnos/8
```

---

# 12. Asistencia

El diseño de base de datos usa dos niveles:

```text
asistencias
    ↓
una jornada por taller y fecha

registros_asistencia
    ↓
un registro por alumno
```

La restricción importante es:

```text
un alumno + un taller + una fecha = un solo registro
```

Estados definidos oficialmente:

- Presente.
- Ausente.
- Justificado.
- Tardanza.

El frontend aún debe terminar de incorporar Tardanza para quedar alineado con SQL y documentación.

---

# 13. Modelo de datos

Las entidades principales previstas son:

```text
usuarios
alumnos
talleres
taller_tallerista
horarios_taller
inscripciones
asistencias
registros_asistencia
contenidos
entregas
adjuntos
reportes
trazabilidad
```

### Relaciones clave

```text
Usuario
  └── Rol

Tallerista
  └── Talleres

Taller
  ├── Talleristas
  ├── Alumnos
  ├── Horarios
  └── Contenidos

Alumno
  ├── Talleres
  ├── Asistencias
  └── Entregas

Contenido
  └── Entregas

Taller / alumno / fecha
  └── Asistencia
```

---

# 14. Base de datos: avance

El archivo SQL ya contiene:

- creación de la base de datos;
- tablas;
- relaciones;
- claves foráneas;
- índices;
- restricciones;
- datos de prueba.

Esto representa un avance importante porque el modelo ya pasó de un esquema conceptual a una primera versión física.

Todavía debe revisarse y alinearse con los mock data antes de conectar el backend.

---

# 15. Requerimientos funcionales principales

| Código | Resumen |
|---|---|
| RF01 | Login con roles. |
| RF02 | Gestión administrativa de usuarios y talleres. |
| RF03 | Asignaciones. |
| RF04 | Registro de asistencia. |
| RF05 | Consulta/modificación de asistencia. |
| RF06 | Material y tareas. |
| RF07 | Alumno consulta contenidos. |
| RF08 | Alumno entrega tareas. |
| RF09 | Tallerista corrige tareas. |
| RF10 | Tallerista asigna notas. |
| RF11 | Informes de asistencia. |
| RF12 | Informes de talleres/talleristas. |
| RF13 | Exportación PDF/Excel. |
| RF14 | Gestión de perfil según rol. |
| RF15 | Funciones específicas de perfil del alumno. |

### Lectura rápida del avance

Los RF04, RF05, RF09, RF10, RF11 y RF12 tienen un frontend avanzado o prototipo funcional.

RF01 y toda la persistencia real siguen pendientes.

RF07, RF08 y RF15 dependen de completar el panel alumno.

RF13 todavía requiere una implementación real de exportación.

---

# 16. Requisitos no funcionales importantes

Los más relevantes para defender técnicamente son:

### NRF01 — Responsive

El frontend utiliza Bootstrap 5.3 y CSS propio para adaptarse a computadora, tablet y teléfono.

### NRF05 — Validación

Se pretende validar en frontend y también repetir las validaciones en backend.

### NRF06 — Separación de capas

Frontend y backend estarán separados.

### NRF07 — Roles

Cada usuario deberá acceder únicamente a las funciones que corresponden a su rol.

### NRF08 — Protección de datos

La información personal requiere controles de permisos, autenticación segura y protección de las comunicaciones.

### NRF09 — Persistencia

MySQL será la base definitiva.

### NRF10 — Trazabilidad

Las acciones importantes se registrarán en la tabla de trazabilidad.

---

# 17. Seguridad

Amenazas analizadas:

| Amenaza | Riesgo |
|---|---|
| Phishing | Compromiso de credenciales. |
| XSS | Ejecución de código malicioso en la aplicación. |
| Ransomware | Pérdida o indisponibilidad de archivos. |

### Buenas prácticas aplicadas o previstas

- Validar entradas.
- Escapar contenido antes de mostrarlo.
- Utilizar `textContent` cuando corresponda.
- Evitar HTML inseguro con datos del usuario.
- Usar autenticación real en backend.
- Aplicar HTTPS en despliegue.
- Controlar permisos según rol.
- Mantener dependencias actualizadas.
- Probar formularios y permisos.
- Documentar las medidas.

---

# 18. Gestión y metodología

El equipo tiene cinco integrantes:

| Integrante | Rol documentado |
|---|---|
| Emiliano Sánchez | Líder / Scrum Master |
| Gabriel Rendon | Subcoordinador |
| Ignacio Viera | Frontend / Backend |
| Maximiliano Leal | Frontend / Backend |
| Thiago Ferragut | Frontend / Backend |

El Acta de reuniones registra nueve reuniones y las diferentes reasignaciones de tareas, cambios de alcance y avances del equipo.

Un punto importante para presentar es que el alcance fue ajustándose según el tiempo disponible y la evolución del proyecto.

---

# 19. Uso de Git

El repositorio mantiene historial de commits y ramas.

Se documentó Git/GitHub como mecanismo de:

- trazabilidad;
- colaboración;
- control de cambios;
- revisión.

El estado actual también muestra modificaciones que todavía no forman parte de un commit, por lo que antes de una entrega formal conviene revisar `git status`, agrupar cambios y generar commits claros.

---

# 20. Uso ético de IA

Existe una declaración específica de uso ético de IA.

Se documentaron herramientas utilizadas para:

- investigación;
- redacción;
- corrección;
- revisión de coherencia;
- contenido visual;
- apoyo en HTML/CSS.

La documentación destaca la supervisión humana sobre los resultados generados.

Para la presentación, conviene remarcar que la IA fue utilizada como herramienta de apoyo y que el equipo revisó y decidió qué incorporar al proyecto.

---

# 21. Lo que NO debemos presentar como terminado

Es importante ser precisos:

- Login real: pendiente.
- Backend PHP: pendiente.
- API REST implementada: pendiente.
- MySQL conectado: pendiente.
- Persistencia definitiva: pendiente.
- Panel alumno dinámico: pendiente.
- Exportación PDF/Excel real: pendiente.
- Testing formal: pendiente.
- Cuatro documentos técnicos: pendientes (`api`, `modelado`, `planificacion`, `testing`).
- Tardanza de asistencia: pendiente de alinear en frontend.

---

# 22. Próximos pasos

## Prioridad inmediata

1. Cerrar inconsistencias de documentación.
2. Actualizar README.
3. Terminar panel administrador módulo por módulo.
4. Implementar panel alumno dinámico.
5. Implementar login.
6. Completar modelo y documentación API.

## Después

7. Implementar PHP.
8. Conectar MySQL.
9. Reemplazar mock data por Fetch API.
10. Implementar archivos.
11. Implementar seguridad real.
12. Testing integral.
13. Preparar despliegue.

---

# 23. Guion oral sugerido para la segunda presentación

### 1. Introducción

"Nuestro proyecto es TheNewfutures, una plataforma de gestión de talleres en convenio con INAU. Surge a partir de una entrevista en la que detectamos problemas de organización, accesibilidad y centralización de información."

### 2. Problema y objetivo

"La finalidad es centralizar talleres, alumnos, asistencias, tareas e informes, separando las funciones según el rol."

### 3. Arquitectura

"Trabajamos con una arquitectura separada: frontend, API REST en PHP y MySQL. Mientras el backend todavía se desarrolla, usamos mock data para poder probar la interfaz."

### 4. Avance frontend

"El panel tallerista es el más avanzado. Tiene dashboard, perfil, talleres, asistencia, informes, material y corrección de tareas. El panel administrador ya tiene sus principales pantallas y una primera capa de JavaScript."

### 5. Base de datos

"Ya tenemos un primer esquema SQL con usuarios, alumnos, talleres, inscripciones, asistencias, contenidos, entregas, adjuntos, reportes y trazabilidad."

### 6. Seguridad

"Analizamos phishing, XSS y ransomware, y definimos validación, control de roles, sanitización, HTTPS y trazabilidad como medidas."

### 7. Estado real

"Todavía falta implementar la autenticación real, el backend y la conexión con MySQL. También debemos completar el panel alumno y cuatro documentos técnicos."

### 8. Próxima etapa

"La siguiente etapa consiste en cerrar las inconsistencias, completar la documentación técnica y luego conectar el frontend con la API y la base de datos."

---

# 24. Checklist de demostración

Antes de la presentación, comprobar:

- [ ] Dashboard tallerista carga datos.
- [ ] Mis talleres permite buscar.
- [ ] Detalle de taller abre con ID correcto.
- [ ] Asistencia guarda y recupera.
- [ ] Informes filtra correctamente.
- [ ] Detalle de informe funciona.
- [ ] Perfil restringe nombre/apellido/cédula.
- [ ] Dashboard administrador carga estadísticas.
- [ ] Talleristas lista y busca.
- [ ] Alumnos lista.
- [ ] Talleres lista.
- [ ] Asistencias filtra.
- [ ] Reportes lista.
- [ ] Detalles aceptan IDs válidos e inválidos.
- [ ] No hay errores rojos en la consola.
- [ ] No se presenta Mensajes como módulo actual.
- [ ] README y documentación coinciden con lo mostrado.

---

# 25. Tres ideas para recordar durante la defensa

### Idea 1 — Mock data no significa que el sistema sea ficticio

Es una etapa intermedia que permite probar la lógica antes de conectar la persistencia real.

### Idea 2 — El backend debe repetir las restricciones

El JavaScript no es un mecanismo de seguridad. Las autorizaciones importantes deberán validarse nuevamente en PHP.

### Idea 3 — El proyecto está en transición hacia integración

La evolución actual es:

```text
Requerimientos
      ↓
Diseño
      ↓
Frontend + Mock Data
      ↓
SQL
      ↓
Backend/API
      ↓
Integración
      ↓
Testing
      ↓
Despliegue
```

Ese es el punto en el que se encuentra actualmente el proyecto: **frontend avanzado + base de datos diseñada + backend pendiente de implementación e integración**.
