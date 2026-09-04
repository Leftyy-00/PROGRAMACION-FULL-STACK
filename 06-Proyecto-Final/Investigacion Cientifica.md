# Marco del Proyecto

## Sistema de Gestión de Talleres en Convenio con INAU (TheNewfutures)

---

## 1. Presentación del proyecto

El proyecto consiste en el desarrollo de una plataforma web para la gestión de los talleres socioeducativos ejecutados en convenio con el INAU (Instituto del Niño y Adolescente del Uruguay).

El sistema centraliza en un único espacio digital la información y las operaciones que hoy se encuentran dispersas: la administración de talleres y participantes, el registro de asistencias, la publicación de material didáctico, la entrega y corrección de tareas, y la generación de informes. El acceso está diferenciado según tres roles —administrador, tallerista y alumno—, de modo que cada usuario disponga únicamente de las funciones y la información que le corresponden.

---

## 2. Problema que aborda el proyecto

### 2.1 Formulación del problema

**El problema central es la ausencia de una herramienta digital centralizada para la gestión de los talleres en convenio con INAU, lo que dificulta la accesibilidad, la disponibilidad y la organización de la información entre los actores involucrados.**

### 2.2 Descripción del problema

De acuerdo con lo relevado en la entrevista con el cliente, la situación actual presenta las siguientes dificultades:

**Información dispersa y sin centralizar.** No existe un espacio unificado donde converjan los datos de talleres, participantes y actividades. Cada tipo de información se gestiona por separado, lo que obliga a consultar distintas fuentes para obtener un panorama completo.

**Dificultades de accesibilidad y facilidad operativa.** El cliente señaló que el proceso actual presenta fallas al momento de ejecutar las tareas cotidianas: registrar asistencias, distribuir material, recibir entregas y corregirlas. La dificultad no está en la existencia de estos procesos, sino en la complejidad de llevarlos adelante con los medios disponibles.

**Falta de trazabilidad y seguimiento.** No hay un registro ordenado y consultable del histórico de asistencias por alumno, taller y fecha, ni de las entregas realizadas, lo que impide un seguimiento preciso de la participación y el desempeño.

**Dificultad para generar informes.** La ausencia de datos centralizados obliga a elaborar manualmente cualquier reporte que la administración necesite sobre talleres, talleristas, alumnos o asistencias.

**Comunicación limitada entre responsables.** El intercambio de información entre talleristas y administración depende de canales informales, sin registro ni trazabilidad.

**Necesidad de acceso remoto y multiplataforma.** El cliente expresó que el sistema debe poder utilizarse desde cualquier dispositivo y ubicación, condición que la operativa actual no satisface.

### 2.3 Delimitación del problema

El proyecto aborda exclusivamente la **gestión operativa** de los talleres. Quedan fuera del problema planteado los aspectos pedagógicos del diseño de los talleres, la gestión presupuestaria del convenio y cualquier proceso administrativo del organismo que no esté vinculado directamente a la ejecución de los talleres.

> **Observación metodológica:** durante la entrevista, el cliente no especificó la metodología concreta con la que se realizan actualmente estas tareas —si se utilizan planillas, registros en papel u otros medios—. Por lo tanto, el problema se formula a partir de las **dificultades** que el cliente identificó, y no a partir de una descripción detallada del proceso vigente. Esta limitación se retoma en el apartado 4.6.

---

## 3. Pregunta de investigación

### 3.1 Pregunta central

> **¿De qué manera el desarrollo de una plataforma web centralizada, con acceso diferenciado por rol, puede mejorar la organización, la accesibilidad y el control de la información en la gestión de los talleres ejecutados en convenio con INAU?**

### 3.2 Justificación de la pregunta

La formulación recoge los tres conceptos que el propio cliente utilizó para describir lo que espera del sistema —organización, accesibilidad y disponibilidad de la información— y los vincula con las dos características que definen la solución propuesta: la centralización de los datos y la diferenciación de accesos según el rol del usuario.

Se plantea como pregunta de tipo **"de qué manera"** y no como una pregunta cerrada, porque el objetivo no es verificar si una plataforma web resuelve el problema —algo que puede darse por supuesto—, sino determinar **qué características específicas debe reunir** para resolverlo en este contexto particular.

### 3.3 Preguntas secundarias

De la pregunta central se desprenden las siguientes preguntas orientadoras, que guiaron el relevamiento:

1. ¿Qué roles intervienen en la gestión de los talleres y qué operaciones debe habilitar el sistema para cada uno?
2. ¿Qué información resulta indispensable registrar, consultar, modificar y eliminar en cada uno de esos roles?
3. ¿Qué funcionalidades constituyen el mínimo indispensable para que el sistema resulte útil en la operativa diaria, y cuáles pueden postergarse a etapas posteriores?
4. ¿Qué condiciones de seguridad y protección de datos debe cumplir el sistema, considerando que gestiona información personal de menores de edad?
5. ¿Qué condiciones técnicas —disponibilidad, tiempo de respuesta y compatibilidad con distintos dispositivos— debe satisfacer para adecuarse al uso previsto?

---

## 4. Diseño metodológico

### 4.1 Tipo de investigación

| Criterio de clasificación | Tipo | Justificación |
|---|---|---|
| **Según su finalidad** | Aplicada | No busca generar conocimiento teórico, sino resolver un problema concreto y práctico mediante el desarrollo de un producto de software. |
| **Según su nivel de profundidad** | Descriptiva | Se propone caracterizar la situación actual, los actores involucrados y sus necesidades, sin establecer relaciones causales ni contrastar hipótesis. |
| **Según su enfoque** | Cualitativo | La información se obtuvo mediante técnicas de indagación abierta, y los datos relevados son de naturaleza descriptiva, no numérica ni estadística. |
| **Según la manipulación de variables** | No experimental | No se manipulan variables ni se establecen grupos de control; se releva la realidad tal como se presenta. |
| **Según el lugar de obtención de los datos** | De campo y documental | Combina datos obtenidos directamente de un informante (campo) con el análisis de documentación del proyecto (documental). |
| **Según su dimensión temporal** | Transversal | La información se recogió en un único momento, sin seguimiento a lo largo del tiempo. |

### 4.2 Técnicas de recolección de datos

Se emplearon dos técnicas complementarias.

#### Técnica 1 — Entrevista estructurada

Es la técnica principal del relevamiento y la fuente de la que provienen la totalidad de los requerimientos del sistema.

| Aspecto | Detalle |
|---|---|
| **Modalidad** | Entrevista estructurada, guiada por un cuestionario elaborado previamente por el equipo. |
| **Instrumento** | Guía de entrevista organizada en diez bloques temáticos: problema y contexto, visión del sistema, roles y permisos, alcance, información y auditoría, reglas de negocio, reportes, seguridad y calidad, marco legal, y criterios de aceptación y plazos. |
| **Informante** | Lemuel Szwec González, tallerista del convenio, en calidad de usuario experto del proceso operativo. |
| **Entrevistadores** | Emiliano Sánchez (líder de equipo) y Maximiliano Leal (desarrollador frontend). |
| **Instancias** | Una única sesión de entrevista, precedida por una reunión de preparación (R-02) y seguida por una reunión de análisis de los datos obtenidos (R-03). |
| **Registro** | Toma de notas durante la entrevista, transcritas y organizadas posteriormente en el documento de anotaciones. |

**Justificación de la elección de la técnica.** Se optó por una entrevista estructurada, y no por una conversación abierta, porque el relevamiento debía cubrir de forma sistemática todas las dimensiones necesarias para especificar un sistema: qué hace cada rol, qué datos se manejan, qué restricciones existen y qué se espera del producto. Una guía previa asegura que ningún bloque quede sin abordar y facilita el análisis posterior, al organizar las respuestas en categorías predefinidas.

**Diseño del instrumento.** La guía se construyó a partir de un análisis preliminar del equipo, en el que se identificaron las áreas que requerían aclaración —roles y usuarios, organización de los talleres, identificación de participantes, registro de asistencia, tipos de contenido, foros, infraestructura, datos sensibles y plazos—, y se formularon preguntas específicas para cada una.

Un rasgo característico del instrumento es que, para relevar los permisos de cada rol, se aplicó un mismo esquema de cuatro preguntas repetido para los tres roles: qué puede **ver**, qué puede **cargar**, qué puede **modificar** y qué puede **eliminar** cada tipo de usuario. Esta simetría permitió obtener una matriz de permisos completa y comparable entre roles, que luego se tradujo directamente en requerimientos funcionales.

#### Técnica 2 — Análisis documental

| Aspecto | Detalle |
|---|---|
| **Fuente** | Documento de especificación del proyecto provisto por la institución educativa. |
| **Datos obtenidos** | Stack tecnológico obligatorio, arquitectura esperada, endpoints REST mínimos, modelo de datos mínimo, requisitos no funcionales y condiciones de organización del trabajo. |
| **Función** | Complementar el relevamiento con las restricciones técnicas y de proceso que no provienen del cliente sino del marco del proyecto. |

**Justificación.** La entrevista relevó **qué** debe hacer el sistema, pero no **cómo** debe construirse: el cliente no especificó restricciones técnicas ni de infraestructura. El análisis documental aportó esas definiciones, que resultan igualmente vinculantes para el desarrollo.

### 4.3 Procedimiento de análisis de los datos

Los datos obtenidos se procesaron en cuatro etapas sucesivas:

1. **Transcripción y organización.** Las notas de la entrevista se ordenaron en categorías temáticas, correspondientes a los bloques de la guía.
2. **Derivación de requerimientos.** Cada afirmación del cliente se tradujo en uno o más requerimientos funcionales o no funcionales, conservando la trazabilidad hacia el fragmento de la entrevista que lo origina.
3. **Delimitación del alcance.** Los requerimientos se clasificaron según lo que el cliente definió como indispensable para una primera versión y lo que señaló como deseable para etapas posteriores.
4. **Agrupación y estimación.** Los requerimientos se agruparon en épicas, se tradujeron a historias de usuario y se estimaron en puntos de esfuerzo para su planificación.

### 4.4 Instrumentos de registro complementarios

Además del instrumento de entrevista, se emplearon los siguientes registros durante el desarrollo del proyecto:

| Instrumento | Función |
|---|---|
| Actas de reunión | Registro de asistencia, temas tratados, acuerdos y tareas asignadas en cada instancia de trabajo del equipo. |
| Repositorio de control de versiones | Registro de la evolución del código y de la documentación técnica, con trazabilidad de los aportes individuales. |
| Documento de trazabilidad de requerimientos | Vinculación entre cada requerimiento, su épica, su historia de usuario y el sprint en que se implementa. |

### 4.5 Población y muestra

El universo de usuarios potenciales del sistema está compuesto por los tres roles identificados: administradores, talleristas y alumnos participantes de los talleres del convenio.

Para el relevamiento se trabajó con **un informante clave**, seleccionado mediante muestreo intencional por su condición de usuario experto: un tallerista con conocimiento directo de la operativa cotidiana de los talleres.

### 4.6 Limitaciones del diseño metodológico

Se dejan explicitadas las siguientes limitaciones, que condicionan el alcance de los resultados obtenidos:

**Un único informante.** El relevamiento se realizó con un solo entrevistado, correspondiente al rol de tallerista. No se entrevistó a representantes del rol administrador ni a alumnos participantes, por lo que las necesidades de esos dos roles fueron inferidas a partir de lo expresado por el tallerista y no relevadas directamente de sus propios usuarios.

**Ausencia de observación del proceso actual.** No se aplicó observación directa ni se relevó documentación operativa de la institución. El cliente no detalló con qué medios se llevan adelante hoy las tareas, por lo que el diagnóstico se apoya en las dificultades percibidas y no en un análisis del proceso vigente.

**Una única instancia de relevamiento.** La entrevista se realizó en una sola sesión, sin instancias posteriores de validación o profundización. Varios aspectos quedaron sin definir —reglas de negocio, restricciones legales, nivel de seguridad requerido, infraestructura disponible— y fueron resueltos mediante decisiones del equipo, señaladas como tales en la documentación.

**Datos no cuantificados.** No se relevaron datos numéricos sobre la operativa actual (cantidad de talleres, de participantes, frecuencia de uso, volumen de información), lo que impide dimensionar el sistema con precisión y limita la posibilidad de medir objetivamente la mejora obtenida.

Estas limitaciones se compensaron parcialmente mediante instancias de validación con el cliente al cierre de cada sprint, previstas en la metodología de trabajo adoptada.

**---**

<br><br><br>

# Análisis Sociológico del Proyecto

## Sistema de Gestión de Talleres en Convenio con INAU (TheNewfutures)

---

## Nota preliminar sobre la base empírica

Este análisis se apoya en los datos efectivamente relevados durante el proyecto: la entrevista estructurada con un tallerista del convenio, la documentación técnica del sistema y las decisiones de alcance adoptadas por el equipo.

Corresponde señalar una limitación que condiciona la lectura sociológica: **el relevamiento no capturó cómo se gestionan actualmente los talleres**. El cliente describió las dificultades que percibe —información dispersa, escasa trazabilidad, comunicación limitada— pero no especificó con qué medios se realizan hoy las tareas. Por lo tanto, este análisis no puede afirmar qué prácticas existen antes del sistema, y se limita a interpretar **lo que el sistema introduce** y **lo que el propio cliente formuló como necesidad**. Allí donde se plantea una hipótesis sobre la situación previa, se la señala explícitamente como tal.

---

## 1. Lectura desde Karl Marx: el proceso de trabajo y su control

Las categorías marxistas fueron elaboradas para analizar la producción capitalista, un contexto que no se corresponde con un convenio socioeducativo estatal: no hay mercancía, ni relación salarial orientada a la extracción de plusvalía, ni acumulación de capital. **Su aplicación aquí es analógica**, y se restringe a la dimensión del *proceso de trabajo* y su control, que es la línea del pensamiento marxista con mayor capacidad explicativa fuera del ámbito estrictamente fabril.

### 1.1 Formalización del proceso de trabajo

El sistema transforma actividades que hasta ahora se resolvían según el criterio de cada tallerista —cómo llevar la asistencia, cómo distribuir el material, cómo devolver una corrección— en operaciones estandarizadas con formato fijo. La asistencia pasa a admitir cuatro estados predefinidos; la calificación se restringe a un rango numérico; la entrega de una tarea queda sujeta a formatos y tamaños de archivo permitidos.

Esto no implica juzgar la formalización como negativa: es precisamente lo que el cliente solicitó al pedir mayor organización. Lo relevante desde esta perspectiva es reconocer que **toda estandarización de un proceso de trabajo desplaza el criterio desde quien lo ejecuta hacia quien define el instrumento**. El tallerista continúa dictando el taller, pero el registro de esa actividad se ajusta a categorías que no eligió.

### 1.2 Visibilidad del trabajo y capacidad de supervisión

El requerimiento de trazabilidad (NRF10) establece que el sistema registre las acciones relevantes de sus usuarios: quién creó, modificó o eliminó cada dato, y en qué momento. Simultáneamente, el rol administrador accede a la totalidad de la información de la plataforma.

La consecuencia es que **el trabajo del tallerista se vuelve visible y verificable de un modo en que antes no lo era**. Nuevamente, esto responde a una demanda expresa del cliente —"que el administrador tenga acceso a ver todo lo que sucede"—, pero constituye una modificación real en la relación entre quien ejecuta la tarea y quien la supervisa.

### 1.3 Reducción del trabajo administrativo

El sistema automatiza la generación de informes que hasta ahora debían elaborarse manualmente y centraliza consultas que requerían recorrer distintas fuentes. Desde una lectura del proceso de trabajo, esto **reduce el tiempo destinado a tareas administrativas**, con dos efectos posibles: liberar tiempo para la actividad socioeducativa propiamente dicha, o permitir que se asuma un volumen mayor de talleres con el mismo personal. Cuál de los dos predomine no depende del software, sino de decisiones institucionales posteriores.

### 1.4 Dos utilidades distintas del mismo sistema

Puede distinguirse la utilidad que el sistema tiene para cada actor:

| Actor | Utilidad principal |
|---|---|
| Tallerista | Simplificar el registro cotidiano y el seguimiento de sus alumnos. |
| Alumno | Acceder al material y entregar tareas sin depender de la presencia física. |
| Administración | Supervisar la actividad, generar informes y disponer de evidencia auditable del convenio. |

Estas utilidades no son contradictorias, pero tampoco idénticas. El sistema fue solicitado y validado por la administración, no por los talleristas ni por los alumnos, lo que se refleja en que **el rol administrador es el único con acceso irrestricto** a la información de la plataforma.

---

## 2. Lectura desde Manuel Castells: informacionalismo y sociedad red

Es la perspectiva que mejor se ajusta al proyecto, porque varias de sus categorías se corresponden directamente con requerimientos formulados por el cliente.

### 2.1 Del espacio de los lugares al espacio de los flujos

El cliente expresó que el sistema debe utilizarse "en todos los dispositivos" y permitir el acceso "desde cualquier lugar", con disponibilidad permanente. Estos requerimientos —traducidos en el sistema como diseño responsive y disponibilidad continua— describen exactamente el desplazamiento que Castells denomina el pasaje del **espacio de los lugares** al **espacio de los flujos**: la gestión del taller deja de estar atada al lugar físico donde se dicta y al momento en que ocurre.

Un tallerista puede registrar asistencia desde su teléfono al finalizar la clase; un alumno puede consultar el material fuera del horario del taller; la administración puede generar un informe sin solicitarlo a nadie. La información circula entre nodos sin requerir coincidencia espacial ni temporal entre quienes la producen y quienes la consultan.

### 2.2 La plataforma como nodo articulador

El problema que el cliente formuló —la ausencia de un espacio unificado donde converjan talleres, participantes y actividades— puede leerse como un **déficit de conectividad informacional**: los datos existen, pero no circulan entre quienes los necesitan.

La plataforma no se limita a almacenar información: constituye el nodo por el que pasan todas las interacciones entre los tres roles. El tallerista publica y el alumno recibe; el alumno entrega y el tallerista corrige; ambos generan datos que la administración consulta. **La centralización no es solo técnica sino relacional**: el sistema se convierte en el punto obligado de contacto entre actores que antes se vinculaban por vías diversas.

### 2.3 Jerarquía de acceso a la información

La arquitectura de roles (RF01, NRF07) establece tres niveles de acceso claramente diferenciados: el administrador ve la totalidad del sistema; el tallerista, únicamente lo relativo a sus talleres; el alumno, exclusivamente lo suyo.

En términos de Castells, **la posición en la red determina la capacidad de acción**. La estructura de permisos no es un detalle técnico: codifica en el software la jerarquía institucional existente, otorgando a cada actor un horizonte de información distinto y, con ello, una capacidad de decisión distinta.

### 2.4 Riesgo de exclusión digital

Un sistema que traslada la gestión al espacio de los flujos supone que todos los actores pueden efectivamente conectarse. **Esta condición no fue verificada durante el relevamiento**: el equipo formuló explícitamente la pregunta sobre disponibilidad de dispositivos y estabilidad de la conectividad en los lugares donde se dictan los talleres, y no obtuvo respuesta del cliente.

Se trata de un riesgo relevante en un contexto socioeducativo dirigido a población en situación de vulnerabilidad. Si un alumno carece de dispositivo o conexión, la plataforma no mejora su acceso a la información: lo excluye de ella. Corresponde señalarlo como **una condición no verificada del proyecto**, cuya validación resulta necesaria antes del despliegue.

---

## 3. Lectura desde Octavio Ianni: modernización y racionalización institucional

Ianni analiza cómo los Estados latinoamericanos incorporan lógicas de gestión y estándares de eficiencia provenientes de contextos globales, transformando sus aparatos administrativos.

### 3.1 Adopción de un vocabulario de gestión

Resulta significativo que el propio cliente —un organismo público dedicado a la infancia y la adolescencia— haya formulado su necesidad en términos de **organización, accesibilidad, disponibilidad, control y trazabilidad**. Este vocabulario no es originario del campo socioeducativo: proviene de la gestión organizacional y de los sistemas de información.

Que estos términos aparezcan de manera espontánea en el relevamiento indica que la lógica de la gestión por datos ya se encuentra incorporada en el modo en que la institución concibe su propio funcionamiento. El proyecto no la introduce: la materializa en una herramienta.

### 3.2 Racionalización de la política social

El sistema convierte prácticas socioeducativas en información estructurada: la participación de un alumno pasa a expresarse como una secuencia de estados de asistencia; su desempeño, como una calificación numérica; la actividad de un taller, como un conjunto de registros consultables.

Esta operación de **traducción a datos** es central en el proceso de racionalización que describe Ianni. Permite comparar, agregar y auditar aquello que antes solo podía apreciarse cualitativamente. Su contrapartida es que **lo que no se registra tiende a volverse invisible**: el vínculo entre tallerista y alumno, el clima del grupo o el proceso de aprendizaje no tienen representación en el sistema, y por lo tanto no aparecen en ningún informe.

### 3.3 Trazabilidad y responsabilidad institucional

El sistema registra las acciones de sus usuarios (NRF10) y conserva la información mediante baja lógica, evitando la eliminación definitiva de datos. Ambas decisiones responden a la necesidad de **rendir cuentas**: un convenio con el Estado exige poder demostrar qué se hizo, cuándo y quién lo hizo.

Corresponde precisar el alcance de esta trazabilidad, dado que suele sobredimensionarse: **el sistema registra acciones de los usuarios de la plataforma, no trayectorias de los participantes**. Las funcionalidades que habrían construido un perfil detallado del alumno —su ficha completa y el histórico de calificaciones— fueron **excluidas de la primera versión** durante el ajuste de alcance.

### 3.4 Una limitación autoimpuesta significativa

Durante el diseño del modelo de datos, el equipo identificó un campo denominado *situación de derivación*, previsto en la especificación técnica pero **no relevado en la entrevista**. Se resolvió excluirlo del modelo hasta obtener validación expresa del cliente, por tratarse de información particularmente sensible referida a menores.

Esta decisión resulta relevante para el análisis porque muestra que **la racionalización no avanza de manera automática**: los equipos técnicos conservan margen para determinar qué se registra y qué no. La capacidad de registro de un sistema no está dada por la tecnología, sino por decisiones que pueden ser discutidas y limitadas.

---

## 4. Síntesis comparativa

| Autor | Dimensión analizada | Aporte al análisis del proyecto |
|---|---|---|
| **Karl Marx** *(aplicación analógica)* | Proceso de trabajo y control | La estandarización del registro desplaza criterio desde el tallerista hacia el instrumento, y vuelve su trabajo visible y verificable para la administración. Reduce el tiempo administrativo, con destino a definir institucionalmente. |
| **Manuel Castells** | Sociedad red e informacionalismo | El proyecto materializa el pasaje al espacio de los flujos: la gestión se desliga del lugar y el momento. La plataforma opera como nodo articulador, y su arquitectura de roles codifica una jerarquía de acceso. Queda pendiente verificar la conectividad de los usuarios. |
| **Octavio Ianni** | Modernización y racionalización | La institución ya había incorporado el vocabulario de la gestión por datos antes del proyecto. El sistema traduce prácticas socioeducativas a información estructurada, con el riesgo de invisibilizar lo no registrable. |

---

## 5. Consideración final

Las tres perspectivas coinciden en un punto: **un sistema de información no es un instrumento neutral**. Al definir qué se registra, quién accede a qué y bajo qué formato, la plataforma organiza relaciones entre actores con posiciones institucionales distintas.

Reconocerlo no invalida el proyecto ni cuestiona la necesidad que lo origina, que fue formulada por el propio cliente y responde a dificultades concretas. Permite, en cambio, identificar tres cuestiones que el desarrollo técnico por sí solo no resuelve:

1. **La conectividad de los usuarios** no fue verificada, y sin ella la plataforma puede excluir en lugar de incluir.
2. **Los alumnos y los talleristas no fueron consultados directamente** durante el relevamiento: sus necesidades se infirieron a partir de un único informante.
3. **Lo que el sistema no registra deja de ser visible** para la gestión, lo que exige mantener otros canales de valoración de la tarea socioeducativa.