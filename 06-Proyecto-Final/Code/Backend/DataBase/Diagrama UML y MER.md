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
| 7 | **Asistencia** | RF04, RF05, RF11 | Jornada de asistencia identificada por la combinación de taller y fecha. |
| 8 | **RegistroAsistencia** | RF04, RF05 | Situación de un alumno determinado dentro de una jornada de asistencia. |
| 9 | **Contenido** | RF06, RF07 | Generalización del material y las tareas que un tallerista publica en su taller. |
| 10 | **Material** | RF06, RF07, RF16 | Contenido de consulta, sin devolución por parte del alumno. |
| 11 | **Tarea** | RF06, RF07, RF08, RF09, RF10 | Contenido que exige una entrega del alumno y admite calificación. |
| 12 | **Entrega** | RF08, RF09, RF10, RF17 | Vincula a un alumno con una tarea y almacena su corrección y nota. |
| 13 | **Adjunto** | RF06, RF08 | Archivo asociado a un contenido o a una entrega; requiere persistir ruta y metadatos. |
| 14 | **Informe** | RF11, RF12, RF13, RF19, RF22 | Resultado consolidado de una consulta, exportable en distintos formatos. Ver observación 1.5. |

<br>

### 1.4 Decisiones de modelado

**Usuario, Administrador y Tallerista se modelan mediante herencia.** RF01 exige distinguir tres roles con permisos diferenciados, pero los tres comparten los mismos datos de identificación y acceso. `Usuario` concentra esos atributos comunes como clase abstracta, y cada rol especializa el comportamiento. Solo `Tallerista` aporta un atributo propio (`especialidad`, requerido por RF22).

**Alumno no hereda de Usuario, se asocia a él.** El administrador registra al alumno como participante (RF02) antes de que este tenga cuenta de acceso, y RF07 y RF08 requieren que pueda ingresar al sistema. Por lo tanto, un alumno puede existir con o sin cuenta asociada: la relación correcta es una asociación opcional (0..1), no una herencia.

**Asistencia y RegistroAsistencia se separan en dos clases.** RF04 exige registrar la asistencia "de los alumnos" de un taller "indicando fecha", y RF05 permite consultarla y modificarla "por taller y fecha". Estas dos frases operan sobre granularidades distintas: la fecha corresponde a la jornada completa, mientras que el estado (presente, ausente, justificado o tardanza) corresponde a cada alumno en particular. Modelarlas en una sola clase obligaría a repetir la fecha en cada registro individual y a admitir que una misma jornada tuviera fechas distintas según el alumno. La separación en jornada y detalle refleja además la restricción de unicidad implícita en RF05: una sola jornada por taller y fecha.

**Contenido, Material y Tarea se modelan mediante herencia.** RF06 y RF07 los mencionan siempre juntos, y comparten título, descripción y fecha de publicación. Sin embargo, RF08, RF09 y RF10 aplican exclusivamente a las tareas: solo estas tienen consigna, fecha límite y generan entregas. La herencia expresa ambas cosas: la base común y la especialización.

**Entrega no aparece como sustantivo literal en ningún RF.** Se deriva de la relación entre `Alumno` y `Tarea`: RF08, RF09 y RF10 describen tres acciones sobre un mismo objeto (enviar, corregir, calificar), que necesita existir como clase para almacenar la nota, el comentario y la fecha de entrega.

**Horario surge al detallar los atributos de Taller.** Inicialmente "horarios" parecía un atributo simple, pero al ser plural y componerse de día, hora de inicio y hora de fin, no cabe en un único campo. Se incorpora como clase propia.

**Rol se descarta como clase.** Aunque RF01 lo menciona explícitamente, es un conjunto cerrado de tres valores sin atributos ni comportamiento propio. Se modela como enumeración dentro de `Usuario`.

<br>

### 1.5 Observación sobre la clase Informe

Los requerimientos RF11, RF12, RF19 y RF22 establecen la generación de informes, y RF13 exige poder exportarlos en formato PDF o Excel. Esta última operación requiere que el informe exista como objeto con identidad propia: para exportarlo es necesario haberlo generado previamente, con sus datos consolidados, su tipo y su formato de salida.

Por ese motivo `Informe` se incorpora como clase del modelo y forma parte de la primera versión. Su persistencia habilita además el historial de informes emitidos, funcionalidad prevista para etapas posteriores, aunque ningún requerimiento de la primera versión exige conservarlos.

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

> **Observación sobre la duplicación de la cédula:** el atributo `cedula` figura tanto en `Usuario` como en `Alumno`, dado que ambas clases se relacionan por asociación y no por herencia. La ficha del alumno requiere cédula desde su alta (RF02), momento en que puede no existir aún una cuenta de acceso asociada. Al no existir una relación de herencia, el modelo no garantiza por sí mismo la coincidencia entre ambos valores: **la sincronización debe validarse en la capa de aplicación**, verificando al crear la cuenta de un alumno que la cédula ingresada coincida con la registrada en su ficha.

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

### 2.7 Asistencia *(jornada)*

| Atributo | Origen | Justificación |
|---|---|---|
| `fecha` | RF04, RF05 | RF04 exige indicar la fecha de la jornada; RF05 permite consultarla y modificarla por taller y fecha. Es el único dato que corresponde a la jornada completa y no a cada alumno. |

<br>

### 2.8 RegistroAsistencia *(detalle por alumno)*

| Atributo | Origen | Justificación |
|---|---|---|
| `estado` | RF04 | Situación del alumno en la jornada: presente, ausente, justificado o tardanza. Corresponde a cada alumno individualmente, no a la jornada. |
| `observaciones` | RF04 | Aclaración opcional sobre el registro de ese alumno. |
| `usuarioRegistro` | NRF10 | Identifica quién cargó o modificó este registro en particular. Se ubica en el detalle y no en la jornada porque un tallerista puede corregir el estado de un alumno concreto con posterioridad a la carga inicial. |

<br>

### 2.9 Contenido *(clase abstracta)*

| Atributo | Origen | Justificación |
|---|---|---|
| `titulo` | RF06, RF07 | Identifica el contenido en el listado que consulta el alumno. |
| `descripcion` | RF06, RF07 | Explica de qué se trata. |
| `fechaPublicacion` | RF07 | Permite ordenar los contenidos por novedad. |

<br>

### 2.10 Material *(hereda de Contenido)*

Sin atributos propios. Se distingue de la tarea por no requerir devolución ni admitir calificación.

<br>

### 2.11 Tarea *(hereda de Contenido)*

| Atributo | Origen | Justificación |
|---|---|---|
| `consigna` | RF06, RF08 | El alumno necesita saber qué debe entregar. |
| `fechaLimite` | RF08 | Delimita el plazo de entrega. Es el atributo que justifica la especialización respecto del material. |

<br>

### 2.12 Entrega

| Atributo | Origen | Justificación |
|---|---|---|
| `fechaEntrega` | RF08 | Momento del envío; permite identificar entregas fuera de plazo. |
| `estado` | RF08, RF09 | Distingue pendiente, entregada y corregida, indicando al tallerista qué le resta corregir. |
| `nota` | RF10, RF17 | RF10 la asigna y RF17 permite eliminarla, por lo que debe admitir valor nulo. |
| `comentarioCorreccion` | RF09 | RF09 exige corregir, no solo calificar: la devolución cualitativa requiere campo propio. |

<br>

### 2.13 Adjunto

| Atributo | Origen | Justificación |
|---|---|---|
| `nombreOriginal` | RF06, RF08 | Nombre con que el usuario subió el archivo; es el que se muestra al descargarlo. |
| `nombreArchivo` | NRF08 | Nombre generado de forma segura para el almacenamiento, evitando colisiones y nombres maliciosos. |
| `ruta` | RF06, RF08 | Ubicación del archivo en el servidor. |
| `tipoMime` | NRF11 | Necesario para validar que el formato esté entre los permitidos. |
| `tamanoBytes` | NRF12 | Necesario para validar el límite de tamaño. |
| `fechaSubida` | NRF10 | Trazabilidad de la carga. |

> **Observación:** la clase no incorpora ningún atributo que indique si el archivo pertenece a un contenido o a una entrega. Esa información queda determinada por las asociaciones definidas en el Paso 4, que establecen que un adjunto pertenece a uno u otro de forma excluyente. El método `obtenerUrlDescarga()` resuelve la ruta base a partir de dicha asociación.

<br>

### 2.14 Informe

| Atributo | Origen | Justificación |
|---|---|---|
| `nombre` | RF11, RF12 | Identifica el informe generado. |
| `tipo` | RF11, RF12, RF19, RF22 | Distingue entre informe de asistencia, de talleres, listado de alumnos e información de talleristas. |
| `fechaGeneracion` | RF13 | Momento de emisión del informe. |
| `formato` | RF13 | RF13 contempla exportación en PDF o Excel. |
| `estado` | RF13 | Situación del informe dentro del proceso de generación. |
| `contenido` | RF13 | Datos consolidados que conforman el informe emitido. |

<br>

### 2.15 Resumen de atributos correspondientes a la fase 2

| Clase | Atributos (v2) | RF de origen | Motivo de exclusión |
|---|---|---|---|
| Alumno | `foto`, `biografia` | RF15 | Excluido por plazo |
| Alumno | `fechaNacimiento`, `correo`, `telefono`, `direccion`, `referenteAdulto`, `centroReferencia`, `fechaIngreso`, `observaciones` | RF21 | Excluido por plazo |

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

### 3.6 Asistencia *(jornada)*

| Método | Verbo de origen | RF | Justificación |
|---|---|---|---|
| `agregarRegistro(alumnoId, estado, observaciones)` | "registrar la asistencia de los alumnos" | RF04 | Incorpora a la jornada el estado de un alumno, creando una instancia de `RegistroAsistencia`. |
| `modificarRegistro(alumnoId, estado)` | "modificar la asistencia registrada" | RF05 | Localiza el registro del alumno dentro de la jornada y actualiza su estado sin duplicarlo. |
| `contarPresentes()` | "asistencia" | RF11 | Recorre los registros de la jornada y devuelve el total de presentes, dato necesario para el informe de asistencia. |
| `estaCompleta()` | *(derivado)* | RF04 | Verifica que todos los alumnos inscritos en el taller tengan un registro con estado asignado antes de permitir el guardado. |

**Justificación de la ubicación de estos métodos:** operan sobre el conjunto de registros de la jornada, no sobre un registro individual. `contarPresentes()` y `estaCompleta()` requieren conocer la totalidad de los registros, por lo que corresponden a la clase que los agrupa.

**Observación sobre `estaCompleta()`:** no proviene de un verbo literal de los requerimientos, sino de la operativa implementada en el frontend del tallerista, que impide guardar la asistencia si faltan estados por asignar. Se documenta como regla de negocio derivada de la práctica, no de un requerimiento escrito.

<br>

### 3.7 RegistroAsistencia *(detalle por alumno)*

| Método | Verbo de origen | RF | Justificación |
|---|---|---|---|
| `cambiarEstado(nuevoEstado, usuarioId)` | "modificar la asistencia registrada" | RF05 | Actualiza el estado del alumno y registra qué usuario realizó la modificación, conforme a NRF10. |

**Justificación:** la clase solo requiere un método propio, dado que su única operación es la actualización de su propio estado. Las acciones que involucran al conjunto de registros corresponden a `Asistencia`.

<br>

### 3.8 Contenido *(clase abstracta)*

| Método | Verbo de origen | RF | Justificación |
|---|---|---|---|
| `obtenerAdjuntos()` | "subir material y tareas" | RF06 | Devuelve los archivos asociados al contenido. |
| `agregarAdjunto(archivo)` | "subir" | RF06 | Vincula un archivo al contenido. |
| `eliminar()` | "eliminar material" | RF16 | Se define en la clase base porque la operación es idéntica para materiales y tareas. |

<br>

### 3.9 Material *(hereda de Contenido)*

Sin métodos propios. Hereda el comportamiento de `Contenido` sin especializarlo, dado que no requiere devolución del alumno ni admite calificación.

<br>

### 3.10 Tarea *(hereda de Contenido)*

| Método | Verbo de origen | RF | Justificación |
|---|---|---|---|
| `obtenerEntregas()` | "las tareas enviadas por los alumnos" | RF09 | El tallerista necesita conocer las entregas recibidas para corregirlas. |
| `estaVencida()` | "fecha límite" | RF08 | Compara la fecha actual con la fecha límite, permitiendo identificar entregas fuera de plazo. |
| `obtenerEntregaDe(alumnoId)` | "enviar/subir los archivos" | RF08 | Recupera la entrega de un alumno determinado, o indica que aún no ha entregado. |

<br>

### 3.11 Entrega

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

### 3.12 Adjunto

| Método | Verbo de origen | RF/NRF | Justificación |
|---|---|---|---|
| `validarFormato()` | "restringir los formatos" | NRF11 | Verifica que el tipo MIME se encuentre entre los formatos permitidos. |
| `validarTamano()` | "restringir el tamaño" | NRF12 | Verifica que el archivo no exceda el límite establecido. |
| `generarNombreSeguro()` | *(derivado)* | NRF08 | Produce un nombre de archivo sin datos del original, evitando colisiones y nombres potencialmente maliciosos. |
| `obtenerUrlDescarga()` | "visualizar el material" | RF07 | Construye la ruta de acceso al archivo, resolviendo el directorio base según pertenezca a un contenido o a una entrega. |

**Observación sobre los métodos derivados de requerimientos no funcionales:** son los únicos del modelo que no provienen de un RF. Se incorporan porque NRF11 y NRF12 imponen validaciones concretas sobre esta clase, y su ubicación aquí evita replicar la lógica en cada punto donde se carga un archivo.

<br>

### 3.13 Informe

| Método | Verbo de origen | RF | Justificación |
|---|---|---|---|
| `exportarPDF()` | "exportar... en formato PDF" | RF13 | RF13 nombra explícitamente el formato. |
| `exportarExcel()` | "exportar... o Excel" | RF13 | Ídem. |
| `obtenerContenido()` | "generar informes" | RF11, RF12 | Devuelve los datos consolidados del informe. |

<br>

### 3.14 Resumen de métodos correspondientes a la fase 2

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

### 3.15 Observación sobre la trazabilidad

NRF10 exige registrar las acciones relevantes ejecutadas por los usuarios. Este requerimiento **no genera métodos en las clases del dominio**, sino que corresponde a un mecanismo transversal que se activa al ejecutar operaciones de creación, modificación y eliminación. Incorporarlo como método de cada clase dispersaría la lógica y contravendría el principio de responsabilidad única, por lo que su implementación corresponde a la capa de servicios y no al modelo de clases.

---

<br>

## Paso 4 — Asociaciones y multiplicidades

**Técnica:** se identifican las relaciones entre clases a partir de las frases de los RF y las HU que vinculan dos sustantivos, y se determinan las cardinalidades según las expresiones que indican cantidad ("los alumnos de su taller", "una nota a cada alumno", "el taller que le corresponde").

<br>

### 4.1 Relaciones de generalización (herencia)

| Clase padre | Clases hijas | Justificación |
|---|---|---|
| `Usuario` | `Administrador`, `Tallerista` | RF01 enumera los roles con permisos diferenciados; los tres comparten identificación y acceso, y solo `Tallerista` aporta un atributo propio. |
| `Contenido` | `Material`, `Tarea` | RF06 y RF07 los tratan conjuntamente, pero RF08, RF09 y RF10 aplican exclusivamente a las tareas. |

**Observación:** la cuenta de acceso del alumno no se modela como especialización de `Usuario`. Un alumno no *es* un usuario del sistema: *tiene* una cuenta asociada, y puede existir sin ella (ver 4.2).

<br>

### 4.2 Usuario — Alumno

| Elemento | Valor |
|---|---|
| Tipo | Asociación simple |
| Multiplicidad | `Usuario` **0..1** ←→ **0..1** `Alumno` |
| Frase de origen | RF01: "diferenciando el acceso según el rol (alumno...)" + RF02: "gestionar usuarios (alumnos y talleristas)" |

**Justificación de la cardinalidad:** del lado del alumno es **0..1** porque el administrador lo registra como participante (RF02) antes de crearle una cuenta de acceso; un alumno recién inscripto puede no tener credenciales todavía. Del lado del usuario es **0..1** porque las cuentas con rol administrador o tallerista no tienen ficha de alumno asociada.

Es la única asociación del modelo con ambos extremos opcionales, y refleja la naturaleza dual del alumno: entidad administrada por un lado, usuario autenticable por el otro.

<br>

### 4.3 Taller — Tallerista

| Elemento | Valor |
|---|---|
| Tipo | Asociación con clase asociativa |
| Multiplicidad | `Taller` **1..\*** ←→ **0..\*** `Tallerista` |
| Frase de origen | RF03: "asignar alumnos y **talleristas** a los talleres" |
| Clase asociativa | `AsignacionTallerista` — atributo: `fechaAsignacion` |

**Justificación de la cardinalidad:** un taller cuenta con **1..\*** talleristas, ya que no puede dictarse sin un responsable a cargo, y RF03 emplea el plural, habilitando más de uno. Un tallerista dicta **0..\*** talleres: puede no tener ninguno asignado tras su alta, o tener varios simultáneamente.

**Justificación de la clase asociativa:** la relación requiere almacenar el momento en que se produjo la asignación, dato que no pertenece al taller ni al tallerista por separado sino al vínculo entre ambos.

<br>

### 4.4 Taller — Alumno

| Elemento | Valor |
|---|---|
| Tipo | Asociación con clase asociativa |
| Multiplicidad | `Taller` **0..\*** ←→ **0..\*** `Alumno` |
| Frase de origen | RF03: "asignar **alumnos**... a los talleres" + RF25: "el listado de alumnos inscritos en su taller" |
| Clase asociativa | `Inscripcion` — atributo: `fechaInscripcion` |

**Justificación de la cardinalidad:** un taller admite **0..\*** alumnos, dado que al crearse aún no tiene inscriptos. Un alumno participa en **0..\*** talleres: la especificación establece que puede participar en más de uno, y también puede estar registrado sin inscripción activa.

<br>

### 4.5 Taller — Horario

| Elemento | Valor |
|---|---|
| Tipo | Composición |
| Multiplicidad | `Taller` **1** ◆——— **1..\*** `Horario` |
| Frase de origen | RF02: "horarios" (en plural, dentro de la ficha del taller) |

**Justificación del tipo:** se trata de una composición y no de una agregación simple, porque un horario carece de existencia independiente del taller al que pertenece. Si el taller se elimina, sus franjas horarias pierden todo sentido.

**Justificación de la cardinalidad:** **1..\*** porque un taller debe tener definida al menos una franja horaria para poder dictarse.

<br>

### 4.6 Taller — Asistencia

| Elemento | Valor |
|---|---|
| Tipo | Composición |
| Multiplicidad | `Taller` **1** ◆——— **0..\*** `Asistencia` |
| Frase de origen | RF04: "registrar la asistencia de los alumnos de **su taller**, indicando fecha" |
| Restricción | La combinación `taller + fecha` debe ser única |

**Justificación del tipo:** cada jornada de asistencia pertenece a un único taller y no existe fuera de él.

**Justificación de la cardinalidad:** se registran **0..\*** jornadas, ya que al comenzar el taller no existe ninguna y luego se incorpora una por cada fecha de dictado.

**Justificación de la restricción de unicidad:** RF05 permite "consultar y modificar la asistencia registrada por taller y fecha", lo que presupone que esa combinación identifica una única jornada. Admitir duplicados haría ambigua la operación de consulta.

<br>

### 4.7 Asistencia — RegistroAsistencia

| Elemento | Valor |
|---|---|
| Tipo | Composición |
| Multiplicidad | `Asistencia` **1** ◆——— **1..\*** `RegistroAsistencia` |
| Frase de origen | RF04: "registrar la asistencia de **los alumnos**" |

**Justificación del tipo:** el registro individual no tiene sentido fuera de la jornada que lo contiene. Si se elimina la jornada, sus registros carecen de referencia temporal y de taller.

**Justificación de la cardinalidad:** **1..\*** porque una jornada sin ningún registro no representa información alguna. Esta cardinalidad se corresponde con el método `estaCompleta()` definido en el Paso 3, que verifica que todos los alumnos inscritos tengan su registro antes de permitir el guardado.

<br>

### 4.8 RegistroAsistencia — Alumno

| Elemento | Valor |
|---|---|
| Tipo | Asociación simple |
| Multiplicidad | `RegistroAsistencia` **0..\*** ←→ **1** `Alumno` |
| Frase de origen | RF04: "la asistencia de los alumnos" |
| Restricción | Un alumno no puede tener dos registros en la misma jornada |

**Justificación de la cardinalidad:** todo registro corresponde a exactamente **1** alumno, ya que el estado de asistencia es individual. Un alumno acumula **0..\*** registros a lo largo del tiempo, uno por cada jornada en la que se consignó su situación.

**Justificación de la restricción de unicidad:** RF05 permite modificar la asistencia registrada, no agregar un segundo estado para el mismo alumno en la misma fecha. Sin esta restricción, un alumno podría figurar simultáneamente como presente y ausente.

<br>

### 4.9 Taller — Contenido

| Elemento | Valor |
|---|---|
| Tipo | Composición |
| Multiplicidad | `Taller` **1** ◆——— **0..\*** `Contenido` |
| Frase de origen | RF06: "subir material y tareas asociados a **su taller**" + RF07: "el material y las tareas de **su taller**" |

**Justificación del tipo:** ambos requerimientos emplean la expresión "su taller", lo que confirma la pertenencia exclusiva del contenido a un único taller. Eliminado el taller, sus materiales y tareas pierden contexto.

**Justificación de la cardinalidad:** **0..\*** porque un taller recién creado no tiene contenidos publicados.

<br>

### 4.10 Tarea — Entrega

| Elemento | Valor |
|---|---|
| Tipo | Composición |
| Multiplicidad | `Tarea` **1** ◆——— **0..\*** `Entrega` |
| Frase de origen | RF09: "corregir **las tareas enviadas** por los alumnos" |

**Justificación del tipo:** una entrega no existe sin la tarea que la origina.

**Justificación de que la asociación parte de `Tarea` y no de `Contenido`:** únicamente las tareas admiten entregas. Ubicar esta relación en la clase padre permitiría que un material recibiera entregas, situación carente de sentido. Esta es la razón principal por la que se conservó la especialización entre `Material` y `Tarea` en el Paso 1.

**Justificación de la cardinalidad:** **0..\*** porque una tarea recién publicada aún no ha recibido entregas.

<br>

### 4.11 Alumno — Entrega

| Elemento | Valor |
|---|---|
| Tipo | Asociación simple |
| Multiplicidad | `Alumno` **1** ←→ **0..\*** `Entrega` |
| Frase de origen | RF08: "el alumno enviar/subir los archivos correspondientes a una tarea asignada" |
| Restricción | La combinación `tarea + alumno` debe ser única |

**Justificación de la cardinalidad:** toda entrega pertenece a exactamente **1** alumno, ya que no existen entregas anónimas ni grupales. Un alumno realiza **0..\*** entregas, una por cada tarea que complete.

**Justificación de la restricción de unicidad:** RF10 establece "asignar una nota **a cada alumno por tarea**", lo que implica una única entrega por par tarea-alumno. Si se admitieran múltiples entregas, resultaría ambiguo cuál de ellas corresponde calificar.

<br>

### 4.12 Contenido — Adjunto y Entrega — Adjunto

| Elemento | Valor |
|---|---|
| Tipo | Composición (ambas) |
| Multiplicidad | `Contenido` **1** ◆——— **0..\*** `Adjunto` |
| | `Entrega` **1** ◆——— **0..\*** `Adjunto` |
| Frase de origen | RF06: "subir material" + RF08: "subir **los archivos**" (en plural) |
| Restricción | Un adjunto pertenece a un contenido **o** a una entrega, nunca a ambos ni a ninguno |

**Justificación del tipo:** el archivo pertenece al contenido o a la entrega que lo incorpora; si estos se eliminan, el adjunto queda sin referencia y ocupa espacio en el servidor sin ser accesible.

**Justificación de la cardinalidad:** **0..\*** porque RF08 emplea el plural "archivos", habilitando varios por entrega. Un contenido puede no tener adjuntos si aporta únicamente una descripción textual.

**Justificación de la restricción de exclusividad:** son dos asociaciones independientes hacia la misma clase, pero un archivo concreto proviene de un solo origen. Esta restricción es la que permite al método `obtenerUrlDescarga()` determinar el directorio base correspondiente, según se señaló en el Paso 2.

<br>

### 4.13 Usuario — Informe

| Elemento | Valor |
|---|---|
| Tipo | Asociación simple |
| Multiplicidad | `Usuario` **1** ←→ **0..\*** `Informe` |
| Frase de origen | RF11, RF12, RF13, RF19, RF22: "generar informes" |

**Justificación de la cardinalidad:** todo informe registra quién lo generó, dato necesario para la trazabilidad exigida por NRF10. Un usuario puede generar **0..\*** informes a lo largo del tiempo.

<br>

### 4.14 Taller — Informe

| Elemento | Valor |
|---|---|
| Tipo | Asociación simple |
| Multiplicidad | `Taller` **0..1** ←→ **0..\*** `Informe` |
| Frase de origen | RF11: "informes de asistencia **por taller**" |

**Justificación de la cardinalidad:** es **0..1** del lado del taller porque no todos los informes se refieren a uno en particular. El listado general de alumnos (RF19) y el informe de talleristas (RF22) son de alcance global y no corresponden a ningún taller específico.

<br>

### 4.15 Usuario — RegistroTrazabilidad

| Elemento | Valor |
|---|---|
| Tipo | Asociación simple |
| Multiplicidad | `Usuario` **1** ←→ **0..\*** `RegistroTrazabilidad` |
| Frase de origen | NRF10: "registrar la trazabilidad de las acciones importantes realizadas por **los usuarios**" |

**Observación:** esta clase no se derivó de los requerimientos funcionales sino de NRF10, y en el Paso 3 se estableció que la trazabilidad corresponde a la capa de servicios y no al dominio funcional. Se incorpora al modelo porque la información debe persistirse y vincularse a un usuario, pero no participa de la lógica de negocio.

<br>

### 4.16 Cuadro resumen de relaciones

| Origen | Destino | Tipo | Multiplicidad | Clase asociativa |
|---|---|---|---|---|
| Usuario | Administrador, Tallerista | Generalización | — | — |
| Contenido | Material, Tarea | Generalización | — | — |
| Usuario | Alumno | Asociación | 0..1 ←→ 0..1 | — |
| Taller | Tallerista | Asociación | 1..\* ←→ 0..\* | AsignacionTallerista |
| Taller | Alumno | Asociación | 0..\* ←→ 0..\* | Inscripcion |
| Taller | Horario | Composición | 1 ◆— 1..\* | — |
| Taller | Asistencia | Composición | 1 ◆— 0..\* | — |
| Asistencia | RegistroAsistencia | Composición | 1 ◆— 1..\* | — |
| RegistroAsistencia | Alumno | Asociación | 0..\* ←→ 1 | — |
| Taller | Contenido | Composición | 1 ◆— 0..\* | — |
| Tarea | Entrega | Composición | 1 ◆— 0..\* | — |
| Alumno | Entrega | Asociación | 1 ←→ 0..\* | — |
| Contenido | Adjunto | Composición | 1 ◆— 0..\* | — |
| Entrega | Adjunto | Composición | 1 ◆— 0..\* | — |
| Usuario | Informe | Asociación | 1 ←→ 0..\* | — |
| Taller | Informe | Asociación | 0..1 ←→ 0..\* | — |
| Usuario | RegistroTrazabilidad | Asociación | 1 ←→ 0..\* | — |

**Totales:** 2 generalizaciones, 7 composiciones, 8 asociaciones simples y 2 clases asociativas.

<br>

### 4.17 Restricciones de unicidad identificadas

| Restricción | Origen | Consecuencia en el modelo |
|---|---|---|
| Un alumno se inscribe una sola vez por taller | RF03 | `Inscripcion` única por par taller-alumno |
| Un tallerista se asigna una sola vez por taller | RF03 | `AsignacionTallerista` única por par taller-tallerista |
| Una jornada de asistencia por taller y fecha | RF05 | `Asistencia` única por par taller-fecha |
| Un registro por alumno dentro de cada jornada | RF04, RF05 | `RegistroAsistencia` única por par jornada-alumno |
| Una entrega por alumno y tarea | RF10 | `Entrega` única por par tarea-alumno |
| Un adjunto pertenece a un contenido o a una entrega, no a ambos | RF06, RF08 | Restricción de exclusividad en las asociaciones de `Adjunto` |

<br>

### 4.18 Clases asociativas incorporadas

La aplicación del método identificó dos relaciones muchos a muchos que requieren atributos propios, por lo que se modelan como clases asociativas:

| Clase asociativa | Relación | Atributo | Justificación |
|---|---|---|---|
| `AsignacionTallerista` | Taller ←→ Tallerista | `fechaAsignacion` | Registra desde cuándo el tallerista está a cargo del taller, dato que no pertenece a ninguna de las dos clases por separado. |
| `Inscripcion` | Taller ←→ Alumno | `fechaInscripcion` | Registra el momento de incorporación del alumno al taller. |

**Observación sobre `RegistroAsistencia`:** aunque vincula `Asistencia` con `Alumno` y posee atributos propios, no se modela como clase asociativa sino como clase plena. La razón es que fue identificada en el Paso 1 como una entidad con significado propio dentro del dominio —el estado de un alumno en una jornada—, y no como un mero vínculo entre dos clases. Su presencia en el modelo es anterior a la definición de las asociaciones.

<br>

### 4.19 Verificación contra el modelo físico

Todas las relaciones del modelo tienen correspondencia directa en la base de datos implementada:

| Relación UML | Implementación en la base de datos |
|---|---|
| Usuario ←→ Alumno | `alumnos.usuario_id`, nulable y con restricción de unicidad |
| Taller ←→ Tallerista | Tabla `taller_tallerista` |
| Taller ←→ Alumno | Tabla `inscripciones` |
| Taller ◆— Horario | `horarios_taller` con borrado en cascada |
| Taller ◆— Asistencia | `asistencias` con cascada y unicidad de taller y fecha |
| Asistencia ◆— RegistroAsistencia | `registros_asistencia` con cascada |
| RegistroAsistencia ←→ Alumno | `registros_asistencia.alumno_id` |
| Taller ◆— Contenido | `contenidos` con borrado en cascada |
| Tarea ◆— Entrega | `entregas.contenido_id` con cascada |
| Alumno ←→ Entrega | `entregas.alumno_id` |
| Contenido ◆— Adjunto | `adjuntos.contenido_id` |
| Entrega ◆— Adjunto | `adjuntos.entrega_id` |
| Usuario ←→ Informe | `reportes.generado_por` |
| Taller ←→ Informe | `reportes.taller_id`, nulable |
| Usuario ←→ RegistroTrazabilidad | `trazabilidad.usuario_id` |

**Salvedad sobre la relación Tarea — Entrega:** dado que `Material` y `Tarea` se implementan en una única tabla con discriminador, la clave foránea `entregas.contenido_id` apunta al conjunto de contenidos sin distinguir su tipo. La base de datos no puede garantizar por sí sola que el contenido referenciado sea una tarea, por lo que esa validación debe implementarse mediante disparador o en la capa de aplicación.

---

<br>

## Paso 5 — Traducción del modelo UML al modelo relacional

**Técnica:** cada clase persistente se traduce a una tabla, los atributos se tipifican, las herencias se resuelven mediante una estrategia de mapeo, y las relaciones muchos a muchos se convierten en tablas intermedias.

<br>

### 5.1 Reglas de mapeo aplicadas

| Elemento UML | Traducción relacional |
|---|---|
| Clase concreta | Una tabla |
| Atributo | Una columna, con tipo de dato asignado |
| Herencia | Tabla única con columna discriminadora *(ver 5.2)* |
| Asociación uno a muchos | Clave foránea en el lado "muchos" |
| Asociación muchos a muchos | Tabla intermedia con dos claves foráneas |
| Clase asociativa | Tabla intermedia con sus atributos propios |
| Composición | Clave foránea con borrado en cascada |
| Restricción de unicidad | Restricción `UNIQUE` sobre las columnas involucradas |

<br>

### 5.2 Estrategia de mapeo de la herencia

Existen tres formas estándar de traducir una jerarquía de herencia a tablas. La elección afecta a `Usuario` (con `Administrador` y `Tallerista`) y a `Contenido` (con `Material` y `Tarea`).

| Estrategia | En qué consiste | Ventaja | Desventaja |
|---|---|---|---|
| **Tabla única** | Una sola tabla con todos los atributos de padre e hijas, más una columna discriminadora | Consultas simples, sin uniones | Columnas nulas en las filas que no las utilizan |
| **Tabla por subclase** | Una tabla para el padre y una por cada hija, unidas por clave foránea | Sin columnas nulas | Toda consulta requiere unir tablas |
| **Tabla por clase concreta** | Una tabla independiente por cada hija, repitiendo los atributos del padre | Sin uniones ni valores nulos | Datos duplicados; dificulta consultar el conjunto |

**Decisión adoptada: tabla única con discriminador para ambas jerarquías.**

**Justificación para `Usuario`:** las subclases aportan un único atributo propio entre las tres (`especialidad`, exclusivo de `Tallerista`). Crear tablas adicionales para acomodar una sola columna resultaría desproporcionado. Además, RF01 exige autenticar contra un punto único de acceso: con tablas separadas, el inicio de sesión debería consultar tres tablas distintas para localizar al usuario.

**Justificación para `Contenido`:** RF07 requiere que el alumno visualice "el material y las tareas de su taller", es decir, ambos tipos en una misma vista. Con tablas separadas, esa consulta exigiría una operación de unión en cada acceso. El único atributo que queda nulo es `fechaLimite`, vacío en los materiales.

**Contrapartida asumida:** la estrategia de tabla única no permite garantizar desde la base de datos que una entrega apunte a un contenido de tipo Tarea, ni que un administrador tenga especialidad nula. Estas validaciones se trasladan a la capa de aplicación (ver 5.9).

<br>

### 5.3 Traducción de clases a tablas

| Clase UML | Tabla resultante | Observación |
|---|---|---|
| `Usuario` *(abstracta)* | `usuarios` | Absorbe a `Administrador` y `Tallerista` mediante el discriminador `rol` |
| `Administrador` | — | Sin tabla propia |
| `Tallerista` | — | Sin tabla propia; aporta la columna `especialidad` |
| `Alumno` | `alumnos` | Tabla propia, al no heredar de `Usuario` |
| `Taller` | `talleres` | — |
| `Horario` | `horarios_taller` | — |
| `Asistencia` | `asistencias` | — |
| `RegistroAsistencia` | `registros_asistencia` | — |
| `Contenido` *(abstracta)* | `contenidos` | Absorbe a `Material` y `Tarea` mediante el discriminador `tipo` |
| `Material` | — | Sin tabla propia |
| `Tarea` | — | Sin tabla propia; aporta las columnas `consigna` y `fecha_limite` |
| `Entrega` | `entregas` | — |
| `Adjunto` | `adjuntos` | — |
| `Informe` | `reportes` | — |
| `RegistroTrazabilidad` | `trazabilidad` | — |

**Resultado:** las 14 clases del modelo se traducen a **11 tablas de entidad**, dado que cuatro subclases quedan absorbidas en las tablas de sus clases padre.

<br>

### 5.4 Tablas derivadas de relaciones

Las dos relaciones muchos a muchos con clase asociativa generan sendas tablas intermedias:

| Clase asociativa UML | Tabla resultante | Columnas |
|---|---|---|
| `AsignacionTallerista` | `taller_tallerista` | `taller_id`, `tallerista_id`, `fecha_asignacion` |
| `Inscripcion` | `inscripciones` | `taller_id`, `alumno_id`, `fecha_inscripcion` |

**Justificación:** una fila de `talleres` no puede contener una lista de talleristas, ni una de `usuarios` una lista de talleres. La tabla intermedia almacena cada par como una fila independiente, y los atributos propios de la clase asociativa se incorporan como columnas adicionales.

**Justificación de `fecha_inscripcion`:** RF11 exige generar informes de asistencia por rango de fechas. Sin conocer desde cuándo un alumno está inscripto, un informe podría computarlo como ausente en jornadas anteriores a su incorporación al taller.

**Total: 13 tablas** (11 de entidad y 2 intermedias).

<br>

### 5.5 Tipificación de atributos

#### Criterios generales aplicados

| Naturaleza del dato | Tipo asignado | Justificación |
|---|---|---|
| Identificador interno | `INT AUTO_INCREMENT` | Clave primaria numérica, más eficiente que una cadena en las operaciones de unión |
| Texto breve de longitud acotada | `VARCHAR(n)` | Reserva únicamente el espacio necesario |
| Texto libre y extenso | `TEXT` | Sin límite práctico, para descripciones y observaciones |
| Conjunto cerrado de valores | `ENUM` | Traduce las enumeraciones del modelo e impide valores fuera del conjunto |
| Fecha sin hora | `DATE` | Fechas de inicio, límite, registro e inscripción |
| Fecha con hora | `DATETIME` | Momentos precisos, como el último acceso o la subida de un archivo |
| Hora sin fecha | `TIME` | Franjas horarias de los talleres |
| Número pequeño acotado | `TINYINT` | La nota, cuyo rango es de 1 a 10 |
| Estructura variable | `JSON` | Contenido de los informes, cuya forma depende del tipo |

#### Longitudes asignadas

| Atributo | Tipo | Justificación de la longitud |
|---|---|---|
| `cedula` | `VARCHAR(20)` | El formato uruguayo con puntos y guion ocupa trece caracteres; el margen contempla variantes |
| `nombre`, `apellido` | `VARCHAR(100)` | Suficiente para nombres compuestos |
| `correo` | `VARCHAR(150)` | Los estándares admiten hasta 254 caracteres, aunque en la práctica rara vez superan los cien |
| `telefono` | `VARCHAR(30)` | Se almacena como texto y no como número, ya que puede contener espacios, guiones y prefijos internacionales |
| `claveHash` | `VARCHAR(255)` | El algoritmo bcrypt produce sesenta caracteres; el margen permite migrar a otros algoritmos sin alterar la estructura |
| `titulo`, `nombre` de informe | `VARCHAR(200)` | Títulos descriptivos de contenidos e informes |
| `ruta` | `VARCHAR(500)` | Contempla rutas de directorio anidadas |
| `nombreOriginal`, `nombreArchivo` | `VARCHAR(255)` | Límite habitual de los sistemas de archivos |
| `tipoMime` | `VARCHAR(100)` | Los tipos MIME más extensos rondan los ochenta caracteres |

**Observación sobre `telefono`:** aunque contiene dígitos, se tipifica como texto. Un tipo numérico eliminaría los ceros iniciales y no admitiría los separadores del formato local.

**Observación sobre `nota`:** se emplea `TINYINT` con una restricción de verificación que limita el valor entre 1 y 10, y admite valor nulo dado que RF17 permite eliminar la nota asignada.

<br>

### 5.6 Enumeraciones

| Columna | Valores | Origen |
|---|---|---|
| `usuarios.rol` | admin, tallerista, alumno | RF01 enumera los tres roles |
| `usuarios.estado` | Activo, Inactivo | RF02, baja lógica |
| `alumnos.estado` | Activo, Inactivo | RF02, baja lógica |
| `talleres.estado` | Activo, Finalizado | RF02, estado del taller |
| `registros_asistencia.estado` | Presente, Ausente, Justificado, Tardanza | RF04, según la especificación técnica |
| `contenidos.tipo` | Material, Tarea | Discriminador de la jerarquía de herencia |
| `entregas.estado` | Pendiente, Entregada, Corregida | RF08 y RF09 |

**Justificación del uso de `ENUM`:** las enumeraciones del modelo representan conjuntos cerrados de valores. Este tipo los traduce fielmente e impide, desde la propia base de datos, la inserción de valores no previstos, sin requerir una tabla adicional de referencia.

<br>

### 5.7 Traducción de las asociaciones

| Relación UML | Implementación | Justificación |
|---|---|---|
| `Usuario` 0..1 ←→ 0..1 `Alumno` | `alumnos.usuario_id` nulable y única | Nulable porque el alumno puede carecer de cuenta; única porque una cuenta pertenece a un solo alumno |
| `Taller` ◆— `Horario` | `horarios_taller.taller_id` con cascada | La composición implica que al eliminar el taller se eliminen sus horarios |
| `Taller` ◆— `Asistencia` | `asistencias.taller_id` con cascada y `UNIQUE(taller_id, fecha)` | La restricción garantiza una única jornada por taller y fecha |
| `Asistencia` ◆— `RegistroAsistencia` | `registros_asistencia.asistencia_id` con cascada | Al eliminar la jornada se eliminan sus registros |
| `RegistroAsistencia` ←→ `Alumno` | `registros_asistencia.alumno_id` y `UNIQUE(asistencia_id, alumno_id)` | Impide dos estados para un mismo alumno en una misma jornada |
| `Taller` ◆— `Contenido` | `contenidos.taller_id` con cascada | — |
| `Tarea` ◆— `Entrega` | `entregas.contenido_id` con cascada | Ver salvedad en 5.9 |
| `Alumno` ←→ `Entrega` | `entregas.alumno_id` y `UNIQUE(contenido_id, alumno_id)` | Una única entrega por alumno y tarea, conforme a RF10 |
| `Contenido` ◆— `Adjunto` | `adjuntos.contenido_id` nulable | Nulable por la restricción de exclusividad |
| `Entrega` ◆— `Adjunto` | `adjuntos.entrega_id` nulable | Ídem |
| `Usuario` ←→ `Informe` | `reportes.generado_por` | No nulable: todo informe registra su autor |
| `Taller` ←→ `Informe` | `reportes.taller_id` nulable | Nulable porque los informes globales no refieren a ningún taller |
| `Usuario` ←→ `RegistroTrazabilidad` | `trazabilidad.usuario_id` | — |

**Justificación de la regla general:** en toda relación uno a muchos, la clave foránea se ubica del lado "muchos". Situarla del lado "uno" obligaría a que una fila contuviera múltiples referencias, algo que el modelo relacional no admite.

<br>

### 5.8 Traducción de la restricción de exclusividad de Adjunto

La asociación excluyente —un adjunto pertenece a un contenido **o** a una entrega— se traduce mediante dos claves foráneas nulables acompañadas de una restricción de verificación:

```sql
CONSTRAINT chk_adjuntos_origen CHECK (
    (contenido_id IS NOT NULL AND entrega_id IS NULL) OR
    (contenido_id IS NULL AND entrega_id IS NOT NULL)
)
```

**Justificación:** constituye la traducción directa del enunciado "uno u otro, nunca ambos ni ninguno". Sin esta restricción, la base admitiría adjuntos huérfanos (ambas columnas nulas) o ambiguos (ambas con valor).

**Limitación:** las restricciones de verificación requieren MySQL 8.0 o superior. En versiones anteriores se ignoran sin generar error, por lo que la validación debe replicarse en la capa de aplicación.

<br>

### 5.9 Restricciones que el modelo relacional no puede expresar

Cuatro reglas del modelo carecen de traducción directa y deben implementarse en el backend.

| Regla | Por qué no puede expresarse | Dónde se implementa |
|---|---|---|
| Únicamente las tareas admiten entregas | La clave foránea apunta a `contenidos` sin distinguir el discriminador, y MySQL no admite subconsultas dentro de una restricción de verificación | Validación en PHP o mediante disparador |
| La cédula del alumno debe coincidir con la de su cuenta | Ambas columnas pertenecen a tablas distintas sin relación entre sí | Validación en PHP al crear la cuenta |
| Un administrador no debe tener especialidad | Consecuencia de la estrategia de tabla única | Validación en PHP al crear el usuario |
| Los datos personales duplicados deben mantenerse sincronizados | Las columnas `nombre`, `apellido`, `cedula`, `correo`, `telefono` y `estado` existen simultáneamente en `usuarios` y `alumnos` | Función única en PHP que escriba en ambas tablas dentro de una misma transacción |

**Justificación de por qué se aceptan estas limitaciones:** las cuatro derivan de decisiones de mapeo deliberadas —tabla única para las herencias, y separación entre la ficha del alumno y su cuenta de acceso— adoptadas por sus ventajas en las consultas y en el proceso de autenticación. Trasladar estas validaciones a la aplicación es el costo asumido a cambio.

**Observación sobre la duplicación de datos personales:** se origina en la decisión de modelar al alumno como entidad administrada independiente de su cuenta, dado que el administrador puede registrarlo antes de otorgarle acceso (RF02) y el listado de alumnos debe funcionar en ambos casos (RF19). Para minimizar el riesgo de desincronización, se establece como regla del proyecto que ninguna operación modifique estos campos mediante instrucciones directas, sino exclusivamente a través de la función designada.

<br>

### 5.10 Elementos incorporados durante la traducción

Los siguientes elementos no provienen del modelo conceptual, sino que surgen de las necesidades de la implementación relacional.

| Elemento | Justificación |
|---|---|
| Columnas `id` en todas las tablas | El modelo conceptual identifica los objetos por su existencia; el relacional requiere una clave primaria explícita. Se emplea un identificador numérico autoincremental en lugar de la cédula, para mantener uniformidad y eficiencia en las uniones |
| Índices sobre `estado`, `rol`, `tipo` y `fecha` | Aceleran los filtros más frecuentes de listados e informes, en respuesta a NRF03, que exige rapidez en las operaciones habituales |
| Codificación `utf8mb4` | Permite almacenar tildes, eñes y cualquier carácter Unicode |

<br>

### 5.11 Verificación de completitud

| Clase UML | Traducida | Tabla resultante |
|---|---|---|
| Usuario | Sí | `usuarios` |
| Administrador | Sí, absorbida | `usuarios` (rol = admin) |
| Tallerista | Sí, absorbida | `usuarios` (rol = tallerista) |
| Alumno | Sí | `alumnos` |
| Taller | Sí | `talleres` |
| Horario | Sí | `horarios_taller` |
| Asistencia | Sí | `asistencias` |
| RegistroAsistencia | Sí | `registros_asistencia` |
| Contenido | Sí | `contenidos` |
| Material | Sí, absorbida | `contenidos` (tipo = Material) |
| Tarea | Sí, absorbida | `contenidos` (tipo = Tarea) |
| Entrega | Sí | `entregas` |
| Adjunto | Sí | `adjuntos` |
| Informe | Sí | `reportes` |
| AsignacionTallerista | Sí | `taller_tallerista` |
| Inscripcion | Sí | `inscripciones` |
| RegistroTrazabilidad | Sí | `trazabilidad` |

Todas las clases del modelo cuentan con correspondencia en el modelo físico. No existen tablas sin clase de origen ni clases sin traducción.