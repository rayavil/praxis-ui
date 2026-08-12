# 01 — Principios UX: Diagnóstico de Usuario y Contexto

> Regla de la **Fase 1** definida en [`SKILL.md`](../SKILL.md). Ninguna decisión de layout (Fase 2), estilo (Fase 3) o código (Fase 4) es válida si no ha superado los tres pilares de este documento. Este archivo es normativo, no orientativo: toda casilla marcada como "Prohibido" bloquea la entrega; toda casilla de "Checklist de auditoría" debe poder responderse con evidencia, no con intuición.

---

## Pilar 1 — Los 6 Principios del Diseño Centrado en el Usuario (ISO 9241-210)

Aplica estos seis principios como puerta de entrada antes de diseñar cualquier pantalla, flujo o componente. Un proyecto que no pueda superar la "Regla de control de calidad" de un principio no está listo para pasar a la Fase 2, y solo puede avanzar mediante el "Caso de excepción aceptable" correspondiente, documentado explícitamente.

| # | Principio | Estándar formal (ISO 9241-210) | Regla de control de calidad | Caso de excepción aceptable (waiver) |
|---|---|---|---|---|
| 1 | **Comprensión explícita del contexto** | El diseño debe basarse en una comprensión explícita de los usuarios, sus tareas y los entornos (físicos, técnicos, organizacionales) en que operan. | La IA o el auditor debe poder citar: (a) quién es el usuario primario, (b) la tarea concreta que ejecuta, (c) el entorno de uso (dispositivo, conectividad, urgencia). Si alguno de los tres no está definido, la tarea vuelve a Fase 1. | Prototipos exploratorios de muy bajo riesgo (spikes internos, pruebas de concepto no expuestas a usuario final) pueden avanzar con supuestos documentados como "asunciones de diseño", siempre que se listen explícitamente y se marquen como pendientes de validar. |
| 2 | **Participación activa de los usuarios** | Los usuarios reales (o representantes cualificados) deben participar activamente durante el diseño y desarrollo, no solo al final. | Verificar que existe al menos una fuente de input de usuario real (entrevista, ticket de soporte, sesión de research, feedback cuantitativo) que sustente las decisiones de diseño propuestas. | Cuando no existe acceso directo a usuarios (producto interno nuevo, MVP 0→1), se acepta el uso de proto-personas basadas en el dominio del negocio, documentadas como tales y marcadas para validación en la primera ronda de uso real. |
| 3 | **Evaluación continua impulsada por el usuario** | El diseño debe ser refinado mediante retroalimentación centrada en el usuario a lo largo de todo el ciclo, no solo en un QA final. | Comprobar que existe (o se propone) un mecanismo de evaluación posterior al lanzamiento: analítica de uso, test de usabilidad, canal de feedback. Un diseño sin ningún mecanismo de evaluación posterior es una entrega incompleta. | Componentes internos de bajísima exposición (herramientas de un solo operador, scripts de administración) pueden eximirse si se documenta explícitamente que no justifican el coste de instrumentación. |
| 4 | **Iteración cíclica** | El proceso es iterativo: cada ciclo de diseño-evaluación retroalimenta al siguiente hasta cumplir los requisitos. | La primera propuesta de diseño nunca se entrega como "final". Debe presentarse como versión sujeta a al menos un ciclo de revisión antes de pasar a producción, salvo que el usuario explicite lo contrario. | Fixes de accesibilidad o de bug crítico en producción pueden saltarse la iteración formal cuando el riesgo de no corregir de inmediato supera el riesgo de saltarse el ciclo. |
| 5 | **UX Holística** | El diseño debe abordar la experiencia completa del usuario, no solo la usabilidad funcional: incluye aspectos emocionales, de confianza, estéticos y de accesibilidad. | Antes de cerrar una entrega, confirmar que se ha considerado explícitamente: (a) usabilidad, (b) accesibilidad, (c) tono/emoción de la interfaz, (d) confianza (seguridad percibida, transparencia de datos). Omitir cualquiera de las cuatro sin justificación es una violación de este principio. | Herramientas puramente técnicas de uso interno (paneles de logs, dashboards de infraestructura) pueden reducir el peso del componente emocional/estético, pero nunca el de accesibilidad. |
| 6 | **Equipo multidisciplinario** | El diseño debe integrar habilidades y perspectivas multidisciplinarias (UX, UI, negocio, ingeniería, accesibilidad, contenido). | Cuando una sola persona o una sola IA ejecuta el diseño de punta a punta (caso habitual en esta skill), debe compensar la ausencia de equipo simulando explícitamente cada perspectiva: negocio, ingeniería, accesibilidad, contenido — y declarar qué perspectiva pesó más y por qué. | Iteraciones menores sobre un sistema de diseño ya validado por un equipo multidisciplinario no necesitan repetir el ejercicio completo; basta con verificar que la iteración no contradice decisiones ya tomadas por ese equipo. |

---

## Pilar 2 — Heurísticas de Usabilidad Aplicadas a Workspaces de Alta Densidad (NN/g)

Las 10 heurísticas de Nielsen, adaptadas y endurecidas para aplicaciones web complejas, dashboards SaaS e interfaces móviles densas. Cada heurística define una regla obligatoria, prohibiciones explícitas y un checklist de auditoría.

### Heurística #1 — Visibilidad del estado del sistema

- **Regla obligatoria:** todo proceso asíncrono debe comunicar progreso proporcional a su duración.
- **Prohibido:** usar un spinner genérico e indeterminado para cualquier espera superior a **10 segundos**.
- **Obligatorio en su lugar:** Skeletons que repliquen el layout final del contenido que va a cargar, o barras de progreso segmentadas por fases ("Paso 2 de 4 — Validando datos").
- **Checklist de auditoría:**
  - [ ] ¿Existe algún estado de carga superior a 10s en el flujo?
  - [ ] Si existe, ¿usa skeleton o progreso por fases en vez de spinner genérico?
  - [ ] ¿El skeleton respeta la geometría real del contenido (no es un placeholder genérico desconectado del layout)?

### Heurística #2 — Relación entre el sistema y el mundo real

- **Regla obligatoria:** los iconos y metáforas deben mapear de forma inequívoca al concepto del mundo real que representan, sin depender de convenciones internas del equipo.
- **Prohibido:** metáforas que introducen ambigüedad semántica (ej. icono de taza de café para representar el estado "Disponible" de un agente — la asociación café=disponible no es universal ni intuitiva).
- **Checklist de auditoría:**
  - [ ] ¿Un usuario nuevo, sin contexto del producto, identificaría el icono/metáfora en menos de 2 segundos?
  - [ ] ¿Existe un mapeo 1:1 entre icono y concepto, sin sobrecargar un mismo símbolo con significados distintos en la misma vista?

### Heurística #3 — Control y libertad del usuario

- **Regla obligatoria:** toda acción destructiva o de edición debe ser reversible.
- **Exigido:** botón "Deshacer" (Undo) disponible tras acciones destructivas, botón "Cancelar" en todo flujo modal/wizard, e historial de versiones en contenido editable de valor (documentos, configuraciones, formularios largos).
- **Checklist de auditoría:**
  - [ ] ¿Toda acción destructiva ofrece Undo o confirmación previa equivalente?
  - [ ] ¿Todo modal/wizard multi-paso tiene salida clara (Cancel/Close) sin pérdida silenciosa de datos?
  - [ ] ¿El contenido de alto valor (formularios largos, documentos, configuraciones críticas) tiene historial o autosave recuperable?

### Heurística #4 — Consistencia y estándares

- **Regla obligatoria:** un mismo símbolo, color o patrón de interacción debe significar siempre lo mismo dentro de la aplicación (consistencia interna) y alinearse con las convenciones establecidas de la plataforma (consistencia externa).
- **Prohibido:** reutilizar un símbolo con significados distintos en distintas zonas de la app (ej. el icono "+" usado para "desplegar una fila" en una vista y para "crear un ítem nuevo" en otra).
- **Checklist de auditoría:**
  - [ ] ¿Se ha verificado el significado de cada icono/patrón nuevo contra el inventario de componentes existente?
  - [ ] ¿Ningún símbolo tiene más de un significado activo simultáneamente en la aplicación?
  - [ ] ¿Los patrones de interacción (gestos, atajos, iconografía) respetan las convenciones de la plataforma (web, iOS, Android) salvo justificación explícita?

### Heurística #5 — Prevención de errores

- **Regla obligatoria:** el sistema debe evitar que el error ocurra, no solo notificarlo después.
- **Exigido:** previsualización automática en tiempo real al configurar parámetros (ej. previsualizar el resultado de un filtro o una regla antes de aplicarla), y confirmación interactiva explícita para toda acción de alto impacto (eliminar en bloque, sobrescribir datos, acciones irreversibles a nivel de cuenta).
- **Checklist de auditoría:**
  - [ ] ¿Toda configuración de parámetros con efecto visible ofrece previsualización antes de confirmar?
  - [ ] ¿Toda acción de alto impacto exige un paso de confirmación explícito (no un simple clic accidental-prone)?
  - [ ] ¿La confirmación comunica el alcance real del impacto (cuántos ítems, qué se pierde) en vez de un genérico "¿Estás seguro?"?

### Heurística #6 — Reconocer antes que recordar

- **Regla obligatoria:** el usuario nunca debe depender de su memoria para operar identificadores internos del sistema.
- **Prohibido:** exponer códigos o IDs crudos como única referencia visible (ej. "ML-38") sin contexto legible adjunto.
- **Exigido:** representación visual clara del objeto referenciado, tooltips interactivos con el detalle, o resúmenes flotantes accesibles sin navegación adicional.
- **Checklist de auditoría:**
  - [ ] ¿Todo ID/código crudo visible en la interfaz va acompañado de una etiqueta legible o representación visual?
  - [ ] ¿El usuario puede obtener contexto adicional (tooltip, hover, panel lateral) sin memorizar ni navegar fuera del flujo actual?

### Heurística #7 — Flexibilidad y eficiencia de uso

- **Regla obligatoria:** la interfaz debe escalar de principiante a usuario avanzado sin penalizar a ninguno de los dos extremos.
- **Exigido:** paleta de comandos accesible por teclado (`Ctrl/Cmd + K`) y aceleradores/atajos para usuarios avanzados.
- **Prohibido:** que estos mecanismos de aceleración saturen o compliquen la vista por defecto de un usuario principiante.
- **Checklist de auditoría:**
  - [ ] ¿Existe una paleta de comandos o mecanismo equivalente de acceso rápido por teclado en superficies de uso frecuente?
  - [ ] ¿Los atajos y aceleradores son opcionales/descubribles, no obligatorios para completar tareas básicas?
  - [ ] ¿La vista por defecto (sin conocer atajos) sigue siendo utilizable de forma autónoma?

### Heurística #8 — Estética y diseño minimalista

- **Regla obligatoria:** todo elemento visual debe aportar valor informativo. La densidad de una interfaz de alto rendimiento no es excusa para el ruido visual.
- **Prohibido:** "gráficos gratuitos" (decorativos sin función), iconografía repetitiva en filas de tablas/listas que no comunique un dato adicional real, y cualquier elemento cuyo único propósito sea rellenar espacio.
- **Checklist de auditoría:**
  - [ ] ¿Cada icono, ilustración o adorno visual puede justificarse con una función informativa concreta?
  - [ ] ¿Se ha auditado cada fila repetida de una tabla/lista para eliminar iconografía redundante sin valor diferencial?
  - [ ] ¿La eliminación de un elemento visual causaría pérdida real de información, o solo pérdida decorativa?

### Heurística #9 — Ayudar a los usuarios a reconocer, diagnosticar y recuperarse de errores

- **Regla obligatoria:** todo mensaje de error debe estar en lenguaje humano y plano, no en jerga técnica ni códigos crudos de sistema.
- **Exigido:** el mensaje debe indicar (a) qué ocurrió exactamente en términos que el usuario entienda, y (b) una acción directa disponible para resolverlo o mitigarlo.
- **Checklist de auditoría:**
  - [ ] ¿El mensaje de error evita jerga técnica, stack traces o códigos internos como comunicación primaria?
  - [ ] ¿El mensaje explica la causa en lenguaje humano en vez de un genérico "Ha ocurrido un error"?
  - [ ] ¿Se ofrece una acción concreta (reintentar, corregir campo X, contactar soporte con contexto precargado)?

### Heurística #10 — Ayuda y documentación

- **Regla obligatoria:** la ayuda debe integrarse en el contexto de uso, no delegarse a documentación externa masiva.
- **Exigido:** micro-copys explicativos, tooltips contextuales, y tours guiados opcionales (nunca forzados) para funcionalidades no evidentes.
- **Prohibido:** depender de manuales de inducción extensos como único mecanismo de onboarding para tareas cotidianas.
- **Checklist de auditoría:**
  - [ ] ¿La funcionalidad no evidente tiene ayuda contextual disponible en el propio punto de uso?
  - [ ] ¿Los tours guiados o walkthroughs son omitibles y no bloquean el uso inmediato de la interfaz?
  - [ ] ¿Se ha evitado remitir al usuario a documentación externa para completar una tarea básica?

---

## Pilar 3 — Guardrails Mandatorios de Accesibilidad (WCAG 2.2 AA)

Estas reglas son **inquebrantables** y actúan como puerta de compilación del frontend (Fase 4): ninguna implementación que las incumpla puede considerarse completa, independientemente de su calidad visual o funcional.

| Guardrail | Regla mandatoria | Criterio de verificación |
|---|---|---|
| **Tamaño de áreas de interacción (Touch Targets)** | Todo elemento clicable/interactivo debe tener un área mínima de **48×48 dp/px**, incluyendo su zona de tolerancia táctil, no solo el contenido visual. | Medir el área interactiva real (incluyendo padding funcional), no el tamaño del icono o texto visible. |
| **Contraste de color** | Relación de contraste mínima de **4.5:1** para texto normal y **3:1** para texto grande (≥18pt regular o ≥14pt bold) y componentes gráficos esenciales. | Verificar contraste en el estado por defecto **y** en estados de hover/focus/disabled cuando comunican información. |
| **Independencia sensorial** | Prohibido identificar contenido o instrucciones basándose únicamente en color, forma, tamaño o ubicación visual. | Todo indicador que use color (ej. rojo = error) debe ir acompañado de un segundo canal: icono, texto, patrón o posición estructural. |
| **Flexibilidad de orientación** | La aplicación no debe restringir su uso a una única orientación de pantalla (portrait/landscape), salvo excepción esencial documentada. | Documentar explícitamente cualquier excepción (ej. una app de piano virtual que exige landscape) con justificación funcional, no estética. |
| **Contenidos emergentes (Hover/Focus)** | Todo menú, drawer o tooltip que aparece por hover o focus debe ser: (a) descartable con teclado (`Esc`), (b) alcanzable con el puntero sin que desaparezca al moverse hacia él, (c) persistente hasta que el usuario decida cerrarlo (no debe autocerrarse por temporizador arbitrario). | Probar el contenido emergente con navegación exclusivamente por teclado y verificar que no se cierra al desplazar el cursor desde el elemento disparador hacia el propio contenido emergente. |

### Checklist de auditoría — Pilar 3

- [ ] Todos los elementos interactivos miden ≥48×48 dp/px de área táctil real.
- [ ] Todo texto normal cumple contraste ≥4.5:1; todo texto grande cumple ≥3:1.
- [ ] Ningún estado o instrucción se comunica exclusivamente por color, forma o posición.
- [ ] La aplicación funciona en cualquier orientación, salvo excepciones documentadas y justificadas.
- [ ] Todo contenido emergente por hover/focus es descartable por teclado, navegable con el puntero y no se autocierra por temporizador.

---

## Pilar 4 — Mapeo de Flujos de Usuario (User Flows)

Ninguna pantalla se diseña de forma aislada. Este pilar establece la arquitectura lógica que debe existir **antes** de que cualquier componente o vista individual pase a la Fase 2 (`rules/02-reglas-ui-vistas.md`).

### Regla del flujo completo

Prohibido diseñar pantallas aisladas. Todo componente o vista debe estar respaldado por un User Flow documentado que defina explícitamente los cuatro elementos siguientes:

| # | Elemento | Debe responder a |
|---|---|---|
| 1 | **Punto de entrada** | ¿De dónde viene el usuario? (enlace externo, navegación interna, notificación, deep link, estado por defecto tras login) |
| 2 | **Caminos de bifurcación (decisiones)** | ¿Qué decisiones toma el usuario en esta interfaz y qué ruta abre cada una? Cada decisión visible en la UI debe tener su rama de flujo documentada, no solo la ruta feliz. |
| 3 | **Estados de éxito** | ¿Cuándo se considera completada la tarea de forma exitosa? Debe ser un criterio verificable (ej. "el registro se guarda y el usuario ve confirmación"), no una noción difusa. |
| 4 | **Rutas de salida y escape** | ¿Qué ocurre si el usuario cancela, retrocede, o si el sistema falla (error de red, error de validación, timeout)? Toda ruta de escape debe dejar al usuario en un estado conocido y recuperable. |

Un componente sin estos cuatro elementos documentados no está listo para pasar a Fase 2, independientemente de si su diseño visual ya está resuelto — el flujo lógico precede a la estructura visual.

### Auditoría — callejones sin salida

Un "callejón sin salida" es cualquier pantalla o estado donde el usuario queda atrapado sin opción de volver, cancelar o corregir. Es el defecto más grave que puede tener un User Flow: bloquea al usuario en lugar de solo frustrarlo.

- [ ] ¿Todo punto de entrada del flujo está identificado y documentado (no asumido implícitamente)?
- [ ] ¿Cada decisión/bifurcación visible en la UI tiene su rama de flujo documentada, incluyendo las rutas menos frecuentes?
- [ ] ¿El estado de éxito de la tarea es un criterio verificable, no una descripción ambigua?
- [ ] ¿Existe una ruta de cancelar/retroceder visible desde cada pantalla del flujo, sin excepción?
- [ ] ¿Todo posible error del sistema (red, validación, permisos, timeout) tiene una ruta de salida definida que no atrapa al usuario?
- [ ] ¿Se ha revisado el flujo completo buscando específicamente pantallas sin ninguna acción de salida disponible?

---

## Pilar 5 — Integración UX en Sprints (Dual-Track Agile)

Este pilar regula cómo se integra el trabajo de diseño e investigación en los ciclos de desarrollo de software, para evitar que el equipo de entrega construya sobre una base de diseño no validada y pierda la visión holística exigida en el Pilar 1 (Principio 5, UX Holística).

### La regla del "Sprint+1"

| Track | Responsabilidad | Cadencia |
|---|---|---|
| **Track de Descubrimiento** (diseño e investigación) | Investigar, prototipar y validar flujos y wireframes antes de que el desarrollo los implemente. | Opera obligatoriamente **un Sprint adelante** del Track de Entrega. |
| **Track de Entrega** (desarrollo) | Implementar features ya validadas por el Track de Descubrimiento. | Consume el trabajo validado en el sprint anterior, nunca en el mismo ciclo en que se está diseñando. |

Esta separación temporal no es organizativa por conveniencia: es la garantía de que el desarrollo nunca construye sobre una hipótesis de diseño sin validar.

### Entregables requeridos para entrar al backlog de desarrollo

Para que una feature entre al backlog de desarrollo, debe contar con los siguientes tres entregables, sin excepción:

- [ ] **Flujo de usuario validado** (ver Pilar 4: punto de entrada, bifurcaciones, éxito y rutas de escape documentados).
- [ ] **Wireframes interactivos aprobados** por el stakeholder o rol equivalente de producto/diseño.
- [ ] **Especificaciones técnicas de UI listas** (componentes a usar, estados, referencias a `rules/02-reglas-ui-vistas.md` y `rules/03-tendencias-2026.md` según aplique).

**Prohibido:** que el equipo de desarrollo programe funcionalidades basándose únicamente en historias de usuario de texto plano sin estos assets de diseño validados adjuntos. Una historia de usuario sin flujo, wireframe y especificación de UI no es una unidad de trabajo lista ("Ready"), es una idea pendiente de pasar por el Track de Descubrimiento.

### Checklist de auditoría — Pilar 5

- [ ] ¿El Track de Descubrimiento está operando al menos un sprint adelante del Track de Entrega en el momento actual?
- [ ] ¿Toda feature en el backlog de desarrollo tiene su flujo de usuario validado adjunto?
- [ ] ¿Toda feature en el backlog de desarrollo tiene wireframes interactivos aprobados, no bocetos preliminares sin validar?
- [ ] ¿Toda feature en el backlog de desarrollo tiene especificación técnica de UI, no solo una historia de usuario en texto plano?

---

## Uso de este archivo dentro del flujo de la skill

Este documento se consulta en la **Fase 1** del flujo definido en [`SKILL.md`](../SKILL.md). Una tarea de diseño no debe avanzar a `rules/02-reglas-ui-vistas.md` (Fase 2) sin poder responder afirmativamente al Pilar 1 **y** contar con el User Flow del Pilar 4 documentado (punto de entrada, bifurcaciones, éxito y rutas de escape, sin callejones sin salida). No debe llegar a Fase 4 (`rules/04-frontend-tailwind.md`) sin haber pasado el checklist completo del Pilar 3, que actúa como gate no negociable de accesibilidad. El Pilar 5 opera a nivel de proceso, no de componente individual: gobierna cuándo una feature está lista para entrar al backlog de desarrollo, independientemente de en qué fase de `SKILL.md` se encuentre su diseño en un momento dado.
