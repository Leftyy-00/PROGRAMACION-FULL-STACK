# Revisión integral de coherencia — Proyecto TheNewfutures / INAU

**Fecha de revisión:** 7 de septiembre de 2026  
**Fuente principal:** `proyecto-convenio-INAU(2).zip` entregado para la revisión.  
**Alcance:** documentación, estructura de repositorio, HTML, CSS, JavaScript y SQL presentes en el ZIP.

> Esta revisión distingue entre lo que está realmente presente en el ZIP, lo que la documentación declara y lo que todavía está planificado. No se considera una implementación como terminada solo porque esté descrita en un documento.

---

## 1. Diagnóstico general

El proyecto tiene una **arquitectura general coherente** y una separación clara entre frontend, backend previsto y documentación. El frontend del tallerista es el bloque más avanzado; el frontend administrador ya posee una cantidad importante de páginas y JavaScript; el frontend alumno tiene las vistas HTML/CSS, pero no tiene JavaScript; el backend todavía no tiene implementación PHP, aunque ya existe un esquema SQL bastante avanzado.

El principal problema actual no es la idea del sistema sino la **sincronización entre documentos y código**. Hay decisiones recientes que todavía no fueron propagadas a toda la documentación y hay varios documentos técnicos vacíos.

### Estado general

| Área | Estado | Observación |
|---|---|---|
| Análisis del problema | Avanzado | Hay entrevista, análisis y fundamentación. |
| Alcance | Definido pero con versiones mezcladas | Hay diferencias entre Charter, requerimientos, PrimeraVista y decisiones posteriores. |
| Frontend tallerista | Avanzado | HTML/CSS/JS y mock data implementados en varias pantallas. |
| Frontend administrador | En desarrollo avanzado | Hay 11 HTML y 13 módulos funcionales de JS, pero faltan ajustes y validación integral. |
| Frontend alumno | Inicial | Hay 7 HTML y CSS, pero no existe carpeta JS en el ZIP actual. |
| Login | Pendiente | `index.html` existe, pero `auth.js` está vacío. |
| Backend PHP | No iniciado | `backend/` no contiene API PHP implementada. |
| Base de datos | Avanzado como diseño | Existe SQL con tablas, claves, restricciones y datos de prueba. |
| API REST | Pendiente | `docs/api.md` está vacío y no hay endpoints PHP. |
| Modelo de datos documental | Pendiente | `docs/modelado.md` está vacío, aunque el SQL ya contiene un modelo importante. |
| Planificación documental | Pendiente | `docs/planificacion.md` está vacío. |
| Testing documental | Pendiente | `docs/testing.md` está vacío. |
| Seguridad | Parcialmente avanzada | Existe análisis de amenazas y buenas prácticas, pero falta vincularlo con pruebas e implementación real. |
| Infraestructura | Avanzada como propuesta | Existe documentación de Docker/XAMPP/Apache/MySQL, pero el stack todavía no está reflejado completamente en el repositorio. |
| Identidad visual | Definida | Existe documentación y CSS por panel. |
| Uso ético de IA | Documentado | Existe declaración y registro de herramientas utilizadas. |

---

# 2. Estructura actual real del repositorio

La estructura encontrada es:

```text
proyecto-convenio-INAU/
│
├── index.html
├── README.md
│
├── backend/
│   ├── .md
│   └── DataBase/.SQL
│
├── docs/
│   ├── Acta de Reuniones.md
│   ├── Charter.md
│   ├── Declaración de Etica en el uso de IA.md
│   ├── Doc.md
│   ├── Documentación de infraestructura.md
│   ├── Estructura del Repositorio.md
│   ├── Identidad Visual.md
│   ├── Justificacion Tecnologica.md
│   ├── PrimeraVista.md
│   ├── api.md
│   ├── modelado.md
│   ├── planificacion.md
│   ├── requerimientos.md
│   └── seguridad.md
│   └── testing.md
│
└── frontend/
    ├── frontend-admin/
    ├── frontend-alumno/
    └── frontend-tallerista/
```

### Conteo real

| Componente | HTML | JS | CSS |
|---|---:|---:|---:|
| Administrador | 11 | 15 | 1 |
| Tallerista | 9 | 12 | 1 |
| Alumno | 7 | 0 | 1 |
| Login raíz | 1 | `auth.js` no está en raíz | utiliza CSS externo |

El README actual **no coincide con estos números**. Describe un estado anterior con 10 HTML/3 JS para administrador y 7 HTML/10 JS para tallerista, y no incorpora el frontend alumno como existe actualmente.

---

# 3. Coherencia funcional por rol

## Administrador

El administrador dispone actualmente de pantallas para:

- Dashboard.
- Talleristas.
- Detalle de tallerista.
- Alumnos.
- Detalle de alumno.
- Talleres.
- Detalle de taller.
- Asistencias.
- Reportes.
- Detalle de reporte.
- Perfil.

Además, las pantallas cargan módulos específicos y `mock-data.js`.

El JavaScript actual permite trabajar de forma simulada con listados, búsquedas, detalles, estadísticas y algunos formularios/modales.

**Conclusión:** es un frontend administrativo avanzado, pero todavía debe terminar de validarse módulo por módulo y pasar posteriormente a Fetch/API.

## Tallerista

Dispone de:

- Dashboard.
- Perfil.
- Mis talleres.
- Detalle del taller.
- Asistencia.
- Informes.
- Detalle de informe.
- Material.
- Corrección de tareas.

Existe una arquitectura modular por pantalla y datos simulados más ricos.

**Conclusión:** es actualmente la parte frontend más madura del proyecto.

## Alumno

Hay siete páginas:

- Dashboard.
- Mis talleres.
- Detalle del taller.
- Tareas.
- Detalle de tarea.
- Asistencia.
- Perfil.

Pero **no existe una carpeta `js/` en el ZIP actual**. Varias páginas incluso incluyen referencias a `js/*.js`; en particular `asistencia.html` referencia cuatro archivos JavaScript inexistentes.

**Conclusión:** la interfaz alumno está diseñada, pero su funcionalidad JavaScript todavía no está implementada.

---

# 4. Principales incoherencias detectadas

## 4.1 Mensajería eliminada, pero todavía aparece en documentación

La mensajería fue retirada del desarrollo por decisión de los profesores. En el código actual ya no existe un módulo `mensajes.js` en los paneles.

Sin embargo, todavía aparece en:

- `Charter.md`.
- `Doc.md`.
- `PrimeraVista.md`.
- `Identidad Visual.md` en referencias generales a mensajes.
- `Justificacion Tecnologica.md` (`mensajes_internos`).
- `Documentación de infraestructura.md`.

**Acción recomendada:** realizar una limpieza global de documentación y eliminar la mensajería como funcionalidad del alcance actual. Puede quedar mencionada únicamente en un apartado de "funcionalidad descartada durante el desarrollo", si se desea dejar constancia de la decisión.

---

## 4.2 Tres roles vs. alcance actual

La documentación y el SQL manejan tres roles:

```text
Administrador
Tallerista
Alumno
```

El `Charter`, `requerimientos.md` y `PrimeraVista.md` siguen considerando acceso de alumno dentro del MVP.

El código actual, sin embargo, no implementa ese acceso todavía: existen las páginas, pero no existe `frontend-alumno/js/` y el login tampoco está implementado.

Esto **no es necesariamente una contradicción funcional**: puede presentarse correctamente como "alcance definido, implementación pendiente". El problema aparece cuando algunos documentos describen el rol alumno como funcional y otros lo presentan como fuera del sistema.

**Acción recomendada:** establecer una frase única: "El sistema contempla administrador, tallerista y alumno; el panel alumno está diseñado pero su lógica y autenticación se encuentran pendientes".

---

## 4.3 Estados de taller diferentes

La documentación técnica define como posibles estados:

- Planificado.
- En curso.
- Finalizado.
- Suspendido.

El SQL actual define solamente:

```sql
ENUM('Activo', 'Finalizado')
```

Mientras los mock data usan principalmente `Activo`.

**Esto debe resolverse antes de implementar el backend**, porque afecta base de datos, filtros, validaciones, interfaz y reportes.

---

## 4.4 Estados de asistencia diferentes

La documentación define cuatro estados:

- Presente.
- Ausente.
- Justificado.
- Tardanza.

El SQL contempla los cuatro.

El frontend tallerista implementado en este ZIP trabaja todavía con:

- Presente.
- Ausente.
- Justificado.

**Pendiente:** agregar `Tardanza` y observaciones de forma consistente en el frontend antes de la integración.

---

## 4.5 Modelo de datos documental vs SQL

La documentación de arquitectura menciona una tabla independiente `talleristas`, mientras que el SQL actual no crea esa tabla. Los talleristas se encuentran representados como usuarios cuyo `rol` es `tallerista` y luego son asociados mediante `taller_tallerista`.

Esto puede ser perfectamente válido, pero debe quedar definido en el modelo oficial.

Actualmente el modelo conceptual y el físico no están 100 % sincronizados.

**Recomendación:** utilizar `usuarios` como entidad de autenticación y una tabla `talleristas` solamente si realmente se necesitan datos exclusivos que no convenga colocar en `usuarios`; de lo contrario, documentar claramente que un tallerista es un usuario con rol `tallerista`.

---

## 4.6 IDs y datos del mock data no coinciden todavía con SQL

En `frontend-admin/js/mock-data.js` el tallerista principal es:

```text
id: 5 → Martín Rodríguez
```

Y los talleres apuntan a:

```text
talleristaId: 5
```

En cambio, en el SQL de prueba los usuarios talleristas son, por ejemplo:

```text
id 2 → María López
id 3 → Martín Rodríguez
```

Por lo tanto, los identificadores de prueba del frontend y de la base de datos **no están alineados**.

Esto no rompe el mock frontend porque son fuentes independientes, pero será un problema al integrar Fetch + PHP + MySQL si se espera reutilizar los mismos IDs.

**Acción recomendada:** definir los datos de prueba de una sola fuente y después hacer que mock data y SQL representen exactamente los mismos registros.

---

## 4.7 Adjuntos: formatos declarados vs datos de prueba

`requerimientos.md` y la justificación tecnológica restringen la versión inicial a PDF e imágenes JPG.

Sin embargo, el SQL de prueba contiene un adjunto:

```text
pagina-sofia.html
MIME: text/html
```

Esto contradice la restricción documental de formatos.

**Acción recomendada:** decidir oficialmente si HTML será permitido. Si no lo será, eliminar el registro de prueba y mantener únicamente los tipos definidos en el requisito.

---

## 4.8 Login todavía pendiente

`index.html` existe y visualmente funciona como pantalla de acceso, pero:

```text
js/auth.js
```

en el frontend administrador está vacío, y en la raíz el login referencia:

```html
<script src="js/auth.js"></script>
```

sin que exista una implementación funcional equivalente en la raíz.

Además, el CSS del login utiliza una ruta absoluta hacia el CSS del tallerista:

```text
/frontend/frontend-tallerista/css/styles.css
```

Esto funciona solamente bajo determinadas raíces del servidor y no representa una estructura ideal para una aplicación portable.

**Acción recomendada:** crear un `css` compartido para el login o una hoja específica de raíz y posteriormente implementar `auth.js` en la raíz.

---

## 4.9 Backend no iniciado, aunque el SQL ya está bastante avanzado

El Acta de reuniones indica comienzo del backend y, en la reunión R-09, asigna tareas relacionadas con base de datos y backend.

En el estado real actual:

- existe SQL;
- no existe API PHP;
- no existen endpoints implementados;
- `backend/.md` está vacío.

**Conclusión correcta para presentación:** "El diseño de base de datos está avanzado y existe un esquema SQL de prueba; la implementación del backend y API REST está pendiente".

---

## 4.10 Documentación técnica vacía

Los siguientes cuatro documentos están vacíos:

```text
api.md
modelado.md
planificacion.md
testing.md
```

Este es uno de los puntos más importantes a resolver porque son entregables explícitos.

---

## 4.11 README desactualizado

El README describe un estado anterior del proyecto. Entre otras cosas:

- no incluye `frontend-alumno`;
- indica menos archivos JS de los existentes;
- indica menos páginas de las actuales;
- no refleja el avance real del administrador;
- no refleja las nuevas páginas del tallerista.

Debe actualizarse antes de la entrega.

---

# 5. Estado de requisitos funcionales

| Código | Requisito | Estado actual |
|---|---|---|
| RF01 | Login y diferenciación por rol | Pendiente: interfaz sí, autenticación no. |
| RF02 | CRUD administrador de usuarios y talleres | Parcial: frontend y mocks; backend pendiente. |
| RF03 | Asignación alumnos/talleristas | Parcial: UI/mock; persistencia pendiente. |
| RF04 | Registrar asistencia | Avanzado en frontend tallerista; simulación local. |
| RF05 | Consultar/modificar asistencia | Parcial/avanzado en frontend; backend pendiente. |
| RF06 | Subir material y tareas | Frontend tallerista preparado; persistencia/archivos pendiente. |
| RF07 | Alumno visualizar material/tareas | HTML preparado; JS pendiente. |
| RF08 | Alumno enviar archivos | HTML preparado; lógica y backend pendientes. |
| RF09 | Tallerista corregir tareas | Existe `correccion-tarea.js`; integración persistente pendiente. |
| RF10 | Asignar notas | Datos/flujo preparado; backend pendiente. |
| RF11 | Informes de asistencia | Frontend/mocks avanzados; generación real pendiente. |
| RF12 | Informes de talleres/talleristas | Frontend/mocks avanzados; backend pendiente. |
| RF13 | Exportación PDF/Excel | No implementada de forma real. |
| RF14 | Perfil según rol | Parcial: tallerista y administrador funcionan con simulación. |
| RF15 | Alumno eliminar datos de perfil | HTML existe; JS pendiente. |

---

# 6. Estado de requisitos no funcionales

| Código | Requisito | Evaluación |
|---|---|---|
| NRF01 | Responsive | Implementado en frontend mediante Bootstrap/CSS. |
| NRF02 | 24/7 | Objetivo de despliegue, aún no demostrable. |
| NRF03 | Rapidez | Diseño liviano; falta prueba objetiva. |
| NRF04 | Navegación clara | Avanzado en frontend. |
| NRF05 | Validación frontend/backend | Frontend parcial/avanzado; backend pendiente. |
| NRF06 | Separación frontend/backend | Arquitectura prevista y carpetas separadas. |
| NRF07 | Control por rol | Previsto, autenticación/backend pendientes. |
| NRF08 | Protección de datos | Documentada, todavía no implementada completamente. |
| NRF09 | Persistencia relacional | SQL diseñado; DB real pendiente. |
| NRF10 | Trazabilidad | Tabla SQL diseñada; registro real pendiente. |
| NRF11 | Restricción de archivos | Documentada, pero debe alinearse con datos de prueba. |
| NRF12 | Tamaño de archivos | Documentado como configuración prevista; pendiente backend. |
| NRF13 | Código organizado | Avanzado, especialmente en tallerista. |
| NRF14 | Documentación | Parcial: varios documentos aún vacíos. |
| NRF15 | Git | Implementado. |
| NRF16 | Pull Requests | Declarado en documentación; debe quedar respaldado por flujo real cuando corresponda. |

---

# 7. Base de datos actual

El SQL contiene una base bastante completa para la etapa actual. Incluye:

- `usuarios`
- `alumnos`
- `talleres`
- `taller_tallerista`
- `horarios_taller`
- `inscripciones`
- `asistencias`
- `registros_asistencia`
- `contenidos`
- `entregas`
- `adjuntos`
- `reportes`
- `trazabilidad`

Además incluye:

- claves primarias;
- claves foráneas;
- restricciones `UNIQUE`;
- índices;
- algunos `CHECK`;
- datos de prueba;
- hashes de contraseña de prueba.

Esto permite afirmar que el equipo **ya pasó de la idea de base de datos a un primer esquema físico SQL**, aunque todavía falta validarlo contra el modelo documental y conectar el backend.

---

# 8. Seguridad

El documento de seguridad identifica tres amenazas principales:

| Amenaza | Probabilidad | Impacto | Riesgo | Clasificación |
|---|---:|---:|---:|---|
| Phishing | 4 | 3 | 12 | Crítico |
| XSS | 3 | 3 | 9 | Tolerable |
| Ransomware | 2 | 4 | 8 | Tolerable |

Las buenas prácticas propuestas incluyen:

- validación de entradas;
- sanitización;
- preferencia por `textContent`;
- reducción del uso inseguro de `innerHTML`;
- autenticación segura;
- HTTPS;
- permisos por rol;
- actualización de dependencias;
- pruebas de seguridad;
- documentación de medidas.

En el JavaScript actual se observa, por ejemplo, uso de `escaparHTML()` y `textContent` en varios módulos, lo que demuestra que parte de estas decisiones ya están siendo aplicadas en el frontend.

La seguridad real del sistema, sin embargo, dependerá principalmente del backend.

---

# 9. Identidad visual

La documentación de identidad visual define una línea común:

- fondo cálido;
- superficies blancas;
- bordes discretos;
- tipografía Arial/Helvetica;
- radio base pequeño;
- roles con identidad cromática propia;
- estados diferenciados por color;
- diseño responsive;
- componentes reutilizables.

Se han realizado cambios posteriores en CSS para reducir la apariencia excesivamente generada por plantilla/IA. Esa decisión debe reflejarse en la documentación de identidad visual para que el documento y el código cuenten la misma historia.

---

# 10. Gestión del proyecto

El proyecto cuenta con un Acta de reuniones de R-01 a R-09. Allí se registra:

- inicio y organización del equipo;
- entrevista;
- distribución de tareas;
- dificultades de participación;
- cambios de alcance;
- avances de documentación;
- comienzo del backend y base de datos;
- asignaciones para la etapa previa a la segunda entrega.

El `Charter` establece:

- INAU como cliente/patrocinador;
- Emiliano Sánchez como líder/Scrum Master;
- cinco integrantes;
- 16 semanas estimadas;
- riesgos principales relacionados con tiempo, integración, cambios de requerimientos, coordinación y migración.

---

# 11. Conclusión de coherencia

### Lo que está bien alineado

1. La arquitectura general frontend → API REST → PHP → MySQL es consistente.
2. Bootstrap + HTML + CSS + JavaScript Vanilla está bien alineado con la justificación tecnológica.
3. El uso de mock data antes del backend está correctamente planteado.
4. La estructura modular del JavaScript del tallerista y administrador es coherente con la arquitectura documentada.
5. El SQL representa gran parte de las entidades funcionales previstas.
6. Las decisiones básicas de seguridad están documentadas y algunas ya aparecen aplicadas en frontend.

### Lo que debe corregirse prioritariamente

1. Eliminar la mensajería de la documentación o marcarla claramente como descartada.
2. Actualizar README y estructura documental al estado real.
3. Alinear estados de talleres.
4. Alinear estados de asistencia.
5. Alinear mock data con SQL.
6. Alinear el modelo documental con el modelo físico.
7. Resolver la restricción de archivos.
8. Implementar el login.
9. Completar `api.md`, `modelado.md`, `planificacion.md` y `testing.md`.
10. Implementar el JavaScript del frontend alumno si se mantiene dentro del MVP.

---

# 12. Orden recomendado de trabajo

```text
1. Congelar alcance actual
        ↓
2. Limpiar documentación de mensajes
        ↓
3. Corregir inconsistencias de estados / roles / archivos
        ↓
4. Actualizar README y PrimeraVista
        ↓
5. Completar modelado.md
        ↓
6. Completar api.md
        ↓
7. Completar planificacion.md
        ↓
8. Completar testing.md
        ↓
9. Terminar frontend administrador y alumno
        ↓
10. Implementar login
        ↓
11. Implementar backend PHP
        ↓
12. Conectar MySQL
        ↓
13. Reemplazar mock data por Fetch API
        ↓
14. Testing integral
```
