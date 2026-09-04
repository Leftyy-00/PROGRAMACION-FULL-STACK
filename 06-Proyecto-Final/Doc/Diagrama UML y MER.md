# Derivación del modelo de clases UML

Se aplicó el método de derivación en cinco pasos a partir de los requerimientos funcionales y las historias de usuario del proyecto.

---

## Paso 1 — Identificación de sustantivos relevantes

**Técnica:** extracción de sustantivos de los RF y las HU, y filtrado de aquellos que representan entidades con identidad propia y persistencia en el sistema.

<br>

### 1.1 Sustantivos extraídos por requerimiento

| RF | Sustantivos presentes |
|---|---|
| RF01 | sistema, sesión, usuario, contraseña, acceso, rol, alumno, tallerista, administrador |
| RF02 | administrador, usuarios, alumnos, talleristas, talleres |
| RF03 | administrador, alumnos, talleristas, talleres |
| RF04 | tallerista, asistencia, alumnos, taller, fecha |
| RF05 | asistencia, taller, fecha |
| RF06 | tallerista, material, tareas, taller |
| RF07 | alumno, material, tareas, taller |
| RF08 | alumno, archivos, tarea |
| RF09 | tallerista, tareas, alumnos |
| RF10 | tallerista, nota, alumno, tarea |
| RF11 | informes, asistencia, taller |
| RF12 | informes, talleres, talleristas |
| RF13 | informes, formato (PDF, Excel) |
| RF14 | usuario, perfil, rol, contraseña, datos personales |
| RF16 | tallerista, material, taller |
| RF17 | tallerista, nota, alumno |
| RF19 | listado, alumnos |
| RF22 | informe, información, talleristas |
| RF24 | administrador, datos sensibles, plataforma |
| RF25 | tallerista, listado, alumnos, taller |

<br>

### 1.2 Sustantivos descartados

| Motivo | Sustantivos descartados |
|---|---|
| Representan al sistema mismo o a su interfaz, no a datos almacenados | sistema, plataforma, acceso, sesión, perfil |
| Son atributos, no entidades: carecen de identidad propia fuera de la clase a la que pertenecen | contraseña, fecha, nota, datos personales, datos sensibles, información, formato |
| Son salidas derivadas de datos existentes, no entidades del dominio | listado |

<br>

### 1.3 Clases identificadas

| # | Clase | Origen (RF) | Justificación |
|---|---|---|---|
| 1 | **Usuario** | RF01, RF02, RF14 | Tiene identidad propia (cédula), datos persistentes y es el sujeto de la autenticación. |
| 2 | **Administrador** | RF01, RF02, RF24 | Rol con permisos globales sobre el sistema; comparte todos los atributos de Usuario. |
| 3 | **Tallerista** | RF01, RF06, RF09, RF22 | Rol con permisos acotados a sus talleres; aporta un atributo propio (especialidad). |
| 4 | **Alumno** | RF02, RF03, RF04, RF07, RF08, RF19 | Entidad administrada con identidad propia; participa en talleres, asistencias y entregas. |
| 5 | **Taller** | RF02, RF03, RF04, RF06, RF07, RF11 | Objeto central del sistema; agrupa alumnos, talleristas, contenidos y asistencias. |
| 6 | **Horario** | RF02 | Franja de día y hora en que se dicta un taller; un taller puede tener varias. |
| 7 | **Asistencia** | RF04, RF05, RF11 | Registro con identidad definida por la combinación taller, alumno y fecha. |
| 8 | **Contenido** | RF06, RF07 | Generalización del material y las tareas que un tallerista publica en su taller. |
| 9 | **Material** | RF06, RF07, RF16 | Contenido de consulta, sin devolución por parte del alumno. |
| 10 | **Tarea** | RF06, RF07, RF08, RF09, RF10 | Contenido que exige una entrega del alumno y admite calificación. |
| 11 | **Entrega** | RF08, RF09, RF10, RF17 | Vincula a un alumno con una tarea y almacena su corrección y nota. |
| 12 | **Adjunto** | RF06, RF08 | Archivo asociado a un contenido o a una entrega; requiere persistir ruta y metadatos. |
| 13 | **Informe** *(v2)* | RF11, RF12, RF13 | Informe generado y conservado para consulta posterior. Ver observación 1.5. |

<br>

### 1.4 Decisiones de modelado

**Usuario, Administrador y Tallerista se modelan mediante herencia.** RF01 exige distinguir tres roles con permisos diferenciados, pero los tres comparten los mismos datos de identificación y acceso. `Usuario` concentra esos atributos comunes como clase abstracta, y cada rol especializa el comportamiento. Solo `Tallerista` aporta un atributo propio (`especialidad`, requerido por RF22).

**Alumno no hereda de Usuario, se asocia a él.** El administrador registra al alumno como participante (RF02) antes de que este tenga cuenta de acceso, y RF07 y RF08 requieren que pueda ingresar al sistema. Por lo tanto, un alumno puede existir con o sin cuenta asociada: la relación correcta es una asociación opcional (0..1), no una herencia.

**Contenido, Material y Tarea se modelan mediante herencia.** RF06 y RF07 los mencionan siempre juntos, y comparten título, descripción y fecha de publicación. Sin embargo, RF08, RF09 y RF10 aplican exclusivamente a las tareas: solo estas tienen consigna, fecha límite y generan entregas. La herencia expresa ambas cosas: la base común y la especialización.

**Entrega no aparece como sustantivo literal en ningún RF.** Se deriva de la relación entre `Alumno` y `Tarea`: RF08, RF09 y RF10 describen tres acciones sobre un mismo objeto (enviar, corregir, calificar), que necesita existir como clase para almacenar la nota, el comentario y la fecha de entrega.

**Horario surge al detallar los atributos de Taller.** Inicialmente "horarios" parecía un atributo simple, pero al ser plural y componerse de día, hora de inicio y hora de fin, no cabe en un único campo. Se incorpora como clase propia.

**Rol se descarta como clase.** Aunque RF01 lo menciona explícitamente, es un conjunto cerrado de tres valores sin atributos ni comportamiento propio. Se modela como enumeración dentro de `Usuario`.

<br>

### 1.5 Observación sobre la clase Informe

Los requerimientos RF11, RF12, RF13, RF19 y RF22 hablan de **generar** y **exportar** informes, nunca de conservarlos o consultarlos posteriormente. Bajo un criterio estricto, un informe sería una salida derivada de datos ya almacenados y no una entidad del dominio.

No obstante, se incorpora al modelo como clase para habilitar el historial de informes emitidos, funcionalidad prevista para una etapa posterior. **Su estructura forma parte del modelo, pero la funcionalidad asociada queda fuera de la primera versión.**

---

<br>

## Paso 2 — Identificación de atributos

**Técnica:** por cada clase identificada, se recorren los RF y HU que la mencionan y se extraen los datos que el sistema debe almacenar sobre ella.

> **Convención:** los atributos derivados de requerimientos excluidos de la primera versión se señalan con **(v2)**. Se incorporan al modelo para que la estructura no requiera rediseño al implementar la fase 2, pero las funcionalidades que los utilizan no forman parte del alcance actual.

<br>

### 2.1 Usuario *(clase abstracta)*

| Atributo | Origen | Justificación |
|---|---|---|
| `cedula` | RF01, RF02 | Identificador de acceso al sistema y dato no modificable por el usuario. |
| `claveHash` | RF01, RF14 | RF01 requiere contraseña y RF14 permite modificarla; se almacena cifrada conforme a NRF08. |
| `nombre`, `apellido` | RF02, RF14 | Datos personales gestionados por el administrador y visibles en el perfil. |
| `correo`, `telefono` | RF14 | Datos de contacto que el propio usuario puede modificar. |
| `rol` | RF01 | Determina la redirección y los permisos tras el inicio de sesión. |
| `estado` | RF02 | Permite la baja lógica, preservando el historial exigido por NRF10. |
| `fechaRegistro`, `ultimoAcceso` | RF24 | Datos de auditoría para la supervisión del uso de la plataforma. |

<br>

### 2.2 Administrador *(hereda de Usuario)*

Sin atributos propios. Se distingue de las demás especializaciones únicamente por su comportamiento y permisos, definidos en el Paso 3.

<br>

### 2.3 Tallerista *(hereda de Usuario)*

| Atributo | Origen | Justificación |
|---|---|---|
| `especialidad` | RF22 | RF22 exige un informe con información detallada de talleristas; la especialidad es el dato que los caracteriza. |

<br>

### 2.4 Alumno

| Atributo | Origen | Justificación |
|---|---|---|
| `cedula` | RF02 | Identificador del participante, registrado por el administrador. |
| `nombre`, `apellido` | RF02, RF19 | Datos mínimos requeridos por el listado de alumnos. |
| `estado` | RF02 | Baja lógica del participante. |
| `fechaNacimiento` **(v2)** | RF21 | Dato de la ficha detallada; permite además verificar edades en un contexto de menores. |
| `correo`, `telefono`, `direccion` **(v2)** | RF21 | Datos de contacto de la ficha detallada. |
| `referenteAdulto` **(v2)** | RF21 | Contacto adulto responsable, propio del contexto socioeducativo. |
| `centroReferencia` **(v2)** | RF21 | Centro o programa al que pertenece el alumno. |
| `fechaIngreso` **(v2)** | RF21 | Fecha de incorporación al programa. |
| `observaciones` **(v2)** | RF21 | Campo libre de la ficha. |
| `foto` **(v2)** | RF15 | RF15 permite al alumno eliminar su foto de perfil. |
| `biografia` **(v2)** | RF15 | Ídem anterior. |

> **Pendiente de validación:** la especificación técnica del equipo contempla un campo `situacionDerivacion`. Al tratarse de un dato particularmente sensible sobre menores que no fue relevado en la entrevista, se deja fuera del modelo hasta confirmarlo con el cliente.

<br>

### 2.5 Taller

| Atributo | Origen | Justificación |
|---|---|---|
| `nombre` | RF02, RF12 | Identifica el taller en listados e informes. |
| `tematica` | RF02 | Clasificación temática del taller. |
| `descripcion` | RF02 | Información general gestionada por el administrador. |
| `centro`, `direccion`, `salon` | RF02 | Ubicación física donde se dicta. |
| `fechaInicio`, `fechaFin` | RF02, RF11 | Delimitan el período del taller y acotan los informes de asistencia. |
| `estado` | RF02 | Distingue talleres activos de finalizados y permite la baja lógica. |
| `observaciones` | RF02 | Campo libre. |

<br>

### 2.6 Horario

| Atributo | Origen | Justificación |
|---|---|---|
| `dia` | RF02 | Día de la semana en que se dicta el taller. |
| `horaInicio`, `horaFin` | RF02 | Franja horaria correspondiente a ese día. |

<br>

### 2.7 Asistencia

| Atributo | Origen | Justificación |
|---|---|---|
| `fecha` | RF04, RF05 | RF04 exige indicar la fecha; RF05 permite consultar y modificar por taller y fecha. |
| `estado` | RF04 | Situación del alumno en la jornada: presente, ausente, justificado o tardanza. |
| `observaciones` | RF04 | Aclaración opcional sobre el registro. |
| `usuarioRegistro` | NRF10 | Identifica quién cargó o modificó el registro, conforme a la trazabilidad exigida. |

<br>

### 2.8 Contenido *(clase abstracta)*

| Atributo | Origen | Justificación |
|---|---|---|
| `titulo` | RF06, RF07 | Identifica el contenido en el listado que consulta el alumno. |
| `descripcion` | RF06, RF07 | Explica de qué se trata. |
| `fechaPublicacion` | RF07 | Permite ordenar los contenidos por novedad. |

<br>

### 2.9 Material *(hereda de Contenido)*

Sin atributos propios. Se distingue de la tarea por no requerir devolución ni admitir calificación.

<br>

### 2.10 Tarea *(hereda de Contenido)*

| Atributo | Origen | Justificación |
|---|---|---|
| `consigna` | RF06, RF08 | El alumno necesita saber qué debe entregar. |
| `fechaLimite` | RF08 | Delimita el plazo de entrega. Es el atributo que justifica la especialización respecto del material. |

<br>

### 2.11 Entrega

| Atributo | Origen | Justificación |
|---|---|---|
| `fechaEntrega` | RF08 | Momento del envío; permite identificar entregas fuera de plazo. |
| `estado` | RF08, RF09 | Distingue pendiente, entregada y corregida, indicando al tallerista qué le resta corregir. |
| `nota` | RF10, RF17 | RF10 la asigna y RF17 permite eliminarla, por lo que debe admitir valor nulo. |
| `comentarioCorreccion` | RF09 | RF09 exige corregir, no solo calificar: la devolución cualitativa requiere campo propio. |

<br>

### 2.12 Adjunto

| Atributo | Origen | Justificación |
|---|---|---|
| `nombreOriginal` | RF06, RF08 | Nombre con que el usuario subió el archivo; es el que se muestra al descargarlo. |
| `nombreArchivo` | NRF08 | Nombre generado de forma segura para el almacenamiento, evitando colisiones y nombres maliciosos. |
| `ruta` | RF06, RF08 | Ubicación del archivo en el servidor. |
| `tipoMime` | NRF11 | Necesario para validar que el formato esté entre los permitidos. |
| `tamanoBytes` | NRF12 | Necesario para validar el límite de tamaño. |
| `fechaSubida` | NRF10 | Trazabilidad de la carga. |


<br>

### 2.13 Informe *(v2)*

| Atributo | Origen | Justificación |
|---|---|---|
| `nombre` | RF11, RF12 | Identifica el informe generado. |
| `tipo` | RF11, RF12, RF19, RF22 | Distingue entre informe de asistencia, de talleres, listado de alumnos e información de talleristas. |
| `fechaGeneracion` | RF13 | Momento de emisión del informe. |
| `formato` | RF13 | RF13 contempla exportación en PDF o Excel. |
| `estado` | RF13 | Situación del informe dentro del proceso de generación. |
| `contenido` | RF13 | Datos consolidados que conforman el informe emitido. |


<br>

### 2.14 Resumen de atributos correspondientes a la fase 2

| Clase | Atributos (v2) | RF de origen | Motivo de exclusión |
|---|---|---|---|
| Alumno | `foto`, `biografia` | RF15 | Excluido por plazo |
| Alumno | `fechaNacimiento`, `correo`, `telefono`, `direccion`, `referenteAdulto`, `centroReferencia`, `fechaIngreso`, `observaciones` | RF21 | Excluido por plazo |
| Informe | Todos | RF11-RF13 | Estructura creada en v1; historial de informes previsto para etapa posterior |

Los restantes requerimientos excluidos (RF18, RF20, RF23 y RF26) no aportan atributos nuevos: operan sobre datos ya presentes en el modelo. RF23, por ejemplo, únicamente requiere que el alumno pueda consultar el atributo `nota` de `Entrega`, incorporado por RF10.

---

<br>

## Paso 3 — Identificación de métodos

**Técnica:** por cada clase, se extraen los verbos de acción presentes en los RF y las HU que la mencionan. Cada verbo se asigna a la clase que ejecuta la acción (si es un actor) o a la clase sobre la que opera (si es un objeto del dominio).

<br>

### 3.0 Criterio de asignación

Los requerimientos están redactados desde la perspectiva del sistema ("el sistema debe permitir al tallerista..."), por lo que no indican directamente a qué clase corresponde cada operación. Se aplicó el siguiente criterio:

| Tipo de método | Se asigna a | Ejemplo |
|---|---|---|
| Acción que un rol ejecuta sobre otras clases | La clase del rol | `Tallerista.registrarAsistencia()` |
| Operación que una clase realiza sobre sus propios datos | La clase afectada | `Entrega.asignarNota()` |
| Consulta que devuelve datos derivados de la propia clase | La clase consultada | `Taller.obtenerAlumnos()` |
| Validación de reglas internas | La clase que las contiene | `Adjunto.validarFormato()` |

Este criterio evita que las clases de rol concentren la totalidad del comportamiento, lo que convertiría al resto de las clases en meras estructuras de datos sin lógica propia.

> **Convención:** los métodos derivados de requerimientos excluidos de la primera versión se señalan con **(v2)**.

<br>

### 3.1 Usuario *(clase abstracta)*

| Método | Verbo de origen | RF | Justificación |
|---|---|---|---|
| `autenticar(cedula, clave)` | "iniciar sesión" | RF01 | RF01 exige validar credenciales. Se ubica en la clase abstracta porque los tres roles se autentican del mismo modo. |
| `modificarContrasena(nueva)` | "modificar contraseña" | RF14 | RF14 permite a cada usuario cambiar su clave. |
| `modificarDatosPersonales(datos)` | "gestionar su perfil" | RF14 | Actualiza correo y teléfono. No incluye cédula, nombre ni apellido, que son de solo lectura para el usuario. |
| `obtenerRol()` | "diferenciando el acceso según el rol" | RF01 | Necesario para determinar a qué panel se redirige al usuario tras el ingreso. |
| `darDeBaja()` | "eliminar" | RF02 | Implementa la baja lógica modificando el estado, sin borrar el registro. |

**Justificación de `autenticar()` en la clase abstracta:** aunque cada rol posee permisos distintos, el proceso de verificación de credenciales es idéntico para los tres. Diferenciarlo por rol duplicaría lógica innecesariamente; la distinción se produce después, en la redirección.

<br>

### 3.2 Administrador *(hereda de Usuario)*

| Método | Verbo de origen | RF | Justificación |
|---|---|---|---|
| `crearUsuario(datos)` | "crear" | RF02 | RF02 enumera explícitamente las cuatro operaciones sobre usuarios. |
| `modificarUsuario(id, datos)` | "modificar" | RF02 | Ídem. |
| `eliminarUsuario(id)` | "eliminar" | RF02 | Invoca la baja lógica del usuario correspondiente. |
| `consultarUsuario(id)` | "consultar" | RF02 | Ídem. |
| `crearTaller(datos)` | "crear... talleres" | RF02 | RF02 aplica las mismas operaciones a los talleres. |
| `modificarTaller(id, datos)` | "modificar" | RF02 | Ídem. |
| `eliminarTaller(id)` | "eliminar" | RF02 | Ídem. |
| `asignarAlumnoATaller(alumnoId, tallerId)` | "asignar alumnos" | RF03 | RF03 atribuye la asignación exclusivamente al administrador. |
| `asignarTalleristaATaller(talleristaId, tallerId)` | "asignar... talleristas" | RF03 | Ídem. |
| `consultarDatosSensibles()` | "consultar los datos sensibles" | RF24 | RF24 restringe esta consulta al administrador. |
| `generarInformeAsistencia(tallerId, desde, hasta)` | "generar informes de asistencia" | RF11 | La generación de informes corresponde al administrador según las historias de usuario asociadas. |
| `generarInformeTalleres()` | "generar informes de talleres" | RF12 | Ídem. |
| `generarListadoAlumnos()` | "generar un listado de alumnos" | RF19 | Ídem. |
| `generarInformeTalleristas()` | "generar un informe... de los talleristas" | RF22 | Ídem. |
| `exportarInforme(informe, formato)` | "exportar los informes" | RF13 | RF13 contempla dos formatos, por lo que el formato se recibe como parámetro. |
| `generarInformeCalificaciones()` **(v2)** | "informe del histórico de calificaciones" | RF20 | Excluido de la primera versión. |
| `generarInformeDetalladoAlumnos()` **(v2)** | "informe con información detallada de los alumnos" | RF21 | Excluido de la primera versión. |

**Justificación de la ubicación de los métodos de generación de informes:** el administrador es quien inicia la acción y el informe constituye su resultado, no su ejecutor. Estos métodos producen instancias de `Informe`, relación que se detalla en el Paso 4.

<br>

### 3.3 Tallerista *(hereda de Usuario)*

| Método | Verbo de origen | RF | Justificación |
|---|---|---|---|
| `registrarAsistencia(tallerId, fecha, registros)` | "registrar la asistencia" | RF04 | RF04 atribuye la acción al tallerista y exige indicar la fecha. |
| `consultarAsistencia(tallerId, fecha)` | "consultar... la asistencia" | RF05 | RF05 permite recuperar un registro existente. |
| `modificarAsistencia(asistenciaId, registros)` | "modificar la asistencia" | RF05 | Ídem. |
| `subirMaterial(tallerId, datos, archivos)` | "subir material" | RF06 | RF06 atribuye la carga al tallerista. |
| `crearTarea(tallerId, datos, archivos)` | "subir... tareas" | RF06 | Se distingue de `subirMaterial()` porque la tarea requiere consigna y fecha límite. |
| `eliminarMaterial(materialId)` | "eliminar material" | RF16 | RF16 lo habilita explícitamente. |
| `corregirTarea(entregaId, comentario)` | "corregir las tareas" | RF09 | RF09 distingue la corrección de la calificación. |
| `asignarNota(entregaId, nota)` | "asignar una nota" | RF10 | RF10 constituye un requerimiento independiente de RF09. |
| `eliminarNota(entregaId)` | "eliminar la nota asignada" | RF17 | RF17 lo habilita explícitamente. |
| `consultarAlumnosDeTaller(tallerId)` | "consultar el listado de alumnos" | RF25 | RF25 lo acota a los alumnos de su propio taller. |
| `eliminarAsistencia(asistenciaId)` **(v2)** | "eliminar un registro de asistencia" | RF18 | Excluido de la primera versión. |
| `modificarContenido(contenidoId, datos)` **(v2)** | "modificar el material o las tareas" | RF26 | Excluido de la primera versión. |

**Justificación de la separación entre `corregirTarea()` y `asignarNota()`:** RF09 y RF10 son requerimientos independientes con estimaciones diferentes. El tallerista puede devolver un comentario sin calificar aún, o modificar la nota sin alterar el comentario. Unificarlos obligaría a proporcionar siempre ambos parámetros.

<br>

### 3.4 Alumno

| Método | Verbo de origen | RF | Justificación |
|---|---|---|---|
| `visualizarMaterial(tallerId)` | "visualizar el material" | RF07 | RF07 lo acota al taller que le corresponde. |
| `visualizarTareas(tallerId)` | "visualizar... las tareas" | RF07 | Ídem. |
| `entregarTarea(tareaId, archivos)` | "enviar/subir los archivos" | RF08 | RF08 atribuye la acción al alumno. |
| `visualizarNotas()` **(v2)** | "visualizar las notas asignadas" | RF23 | Excluido de la primera versión. |
| `eliminarDatoPerfil(campo)` **(v2)** | "eliminar ciertos datos de su perfil" | RF15 | Excluido de la primera versión. |

**Justificación de los métodos propios de Alumno:** si bien su acceso al sistema se realiza mediante una cuenta de usuario asociada, las acciones de RF07 y RF08 corresponden al alumno en su condición de participante del taller, no al usuario genérico. Un administrador con cuenta activa no puede entregar tareas.

<br>

### 3.5 Taller

| Método | Verbo de origen | RF | Justificación |
|---|---|---|---|
| `obtenerAlumnos()` | "quién está en su taller" | RF25 | El taller conoce a sus inscriptos y devuelve la lista sin exponer la estructura interna de la asociación. |
| `obtenerTalleristas()` | "talleres con sus talleristas asignados" | RF12 | Necesario para el informe requerido por RF12. |
| `obtenerContenidos()` | "el material y las tareas de su taller" | RF07 | Devuelve los materiales y tareas asociados. |
| `obtenerHorarios()` | "horarios" | RF02 | Devuelve las franjas horarias correspondientes. |
| `estaActivo()` | "estado" | RF02 | Permite filtrar talleres finalizados en listados e informes. |

**Justificación de su ubicación:** se trata de consultas sobre los propios datos del taller. Asignarlas a las clases de rol obligaría a que estas conocieran cómo se estructuran internamente las inscripciones y asignaciones, comprometiendo el encapsulamiento.

<br>

### 3.6 Asistencia

| Método | Verbo de origen | RF | Justificación |
|---|---|---|---|
| `agregarRegistro(alumnoId, estado, observaciones)` | "registrar la asistencia de los alumnos" | RF04 | Incorpora el estado de un alumno a la jornada. |
| `modificarRegistro(alumnoId, estado)` | "modificar la asistencia registrada" | RF05 | Corrige un registro existente sin duplicarlo. |
| `contarPresentes()` | "asistencia" | RF11 | Dato agregado necesario para el informe de asistencia. |
| `estaCompleta()` | *(derivado)* | RF04 | Verifica que todos los alumnos inscritos tengan estado asignado antes de permitir el guardado. |

**Observación sobre `estaCompleta()`:** no proviene de un verbo literal de los requerimientos, sino de la operativa implementada en el frontend del tallerista, que impide guardar la asistencia si faltan estados por asignar. Se documenta como regla de negocio derivada de la práctica, no de un requerimiento escrito.

<br>

### 3.7 Contenido *(clase abstracta)*

| Método | Verbo de origen | RF | Justificación |
|---|---|---|---|
| `obtenerAdjuntos()` | "subir material y tareas" | RF06 | Devuelve los archivos asociados al contenido. |
| `agregarAdjunto(archivo)` | "subir" | RF06 | Vincula un archivo al contenido. |
| `eliminar()` | "eliminar material" | RF16 | Se define en la clase base porque la operación es idéntica para materiales y tareas. |

<br>

### 3.8 Material *(hereda de Contenido)*

Sin métodos propios. Hereda el comportamiento de `Contenido` sin especializarlo, dado que no requiere devolución del alumno ni admite calificación.

<br>

### 3.9 Tarea *(hereda de Contenido)*

| Método | Verbo de origen | RF | Justificación |
|---|---|---|---|
| `obtenerEntregas()` | "las tareas enviadas por los alumnos" | RF09 | El tallerista necesita conocer las entregas recibidas para corregirlas. |
| `estaVencida()` | "fecha límite" | RF08 | Compara la fecha actual con la fecha límite, permitiendo identificar entregas fuera de plazo. |
| `obtenerEntregaDe(alumnoId)` | "enviar/subir los archivos" | RF08 | Recupera la entrega de un alumno determinado, o indica que aún no ha entregado. |

<br>

### 3.10 Entrega

| Método | Verbo de origen | RF | Justificación |
|---|---|---|---|
| `registrarEnvio(archivos, fecha)` | "enviar/subir los archivos" | RF08 | Almacena los archivos y marca la entrega como realizada. |
| `asignarNota(nota)` | "asignar una nota" | RF10 | Valida el rango permitido y actualiza el estado a corregida. |
| `eliminarNota()` | "eliminar la nota asignada" | RF17 | Restablece la nota a valor nulo y revierte el estado. |
| `agregarComentario(texto)` | "corregir las tareas" | RF09 | Registra la devolución cualitativa del tallerista. |
| `obtenerAdjuntos()` | "los archivos correspondientes" | RF08 | Devuelve los archivos entregados por el alumno. |
| `fueEntregadaATiempo()` | "fecha límite" | RF08 | Compara la fecha de entrega con la fecha límite de la tarea. |

**Justificación de la aparente duplicación de `asignarNota()`:** el método homónimo de `Tallerista` representa la acción del actor (verificación de permisos e identificación de la entrega), mientras que el de `Entrega` representa la operación sobre los datos (validación del rango y actualización del estado). El primero invoca al segundo.

<br>

### 3.11 Adjunto

| Método | Verbo de origen | RF/NRF | Justificación |
|---|---|---|---|
| `validarFormato()` | "restringir los formatos" | NRF11 | Verifica que el tipo MIME se encuentre entre los formatos permitidos. |
| `validarTamano()` | "restringir el tamaño" | NRF12 | Verifica que el archivo no exceda el límite establecido. |
| `generarNombreSeguro()` | *(derivado)* | NRF08 | Produce un nombre de archivo sin datos del original, evitando colisiones y nombres potencialmente maliciosos. |
| `obtenerUrlDescarga()` | "visualizar el material" | RF07 | Construye la ruta de acceso al archivo para el usuario. |

**Observación sobre los métodos derivados de requerimientos no funcionales:** son los únicos del modelo que no provienen de un RF. Se incorporan porque NRF11 y NRF12 imponen validaciones concretas sobre esta clase, y su ubicación aquí evita replicar la lógica en cada punto donde se carga un archivo.

<br>

### 3.12 Informe *(v2)*

| Método | Verbo de origen | RF | Justificación |
|---|---|---|---|
| `exportarPDF()` | "exportar... en formato PDF" | RF13 | RF13 nombra explícitamente el formato. |
| `exportarExcel()` | "exportar... o Excel" | RF13 | Ídem. |
| `obtenerContenido()` | "generar informes" | RF11, RF12 | Devuelve los datos consolidados del informe. |

**Observación:** si bien la clase se señala como (v2) por su función de historial, los métodos de exportación operan en la primera versión, dado que RF13 forma parte del alcance de v1. Lo que corresponde a la fase 2 es la persistencia y consulta de informes anteriores, no la exportación en sí misma.

<br>

### 3.13 Resumen de métodos correspondientes a la fase 2

| Clase | Método | RF de origen |
|---|---|---|
| Administrador | `generarInformeCalificaciones()` | RF20 |
| Administrador | `generarInformeDetalladoAlumnos()` | RF21 |
| Tallerista | `eliminarAsistencia()` | RF18 |
| Tallerista | `modificarContenido()` | RF26 |
| Alumno | `visualizarNotas()` | RF23 |
| Alumno | `eliminarDatoPerfil()` | RF15 |

Estos métodos figuran en el modelo para reflejar el diseño completo del sistema, pero no se implementan en la primera versión.

<br>

### 3.14 Observación sobre la trazabilidad

NRF10 exige registrar las acciones relevantes ejecutadas por los usuarios. Este requerimiento **no genera métodos en las clases del dominio**, sino que corresponde a un mecanismo transversal que se activa al ejecutar operaciones de creación, modificación y eliminación. Incorporarlo como método de cada clase dispersaría la lógica y contravendría el principio de responsabilidad única, por lo que su implementación corresponde a la capa de servicios y no al modelo de clases.