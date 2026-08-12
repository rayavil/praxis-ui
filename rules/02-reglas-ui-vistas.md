# 02 — Reglas de UI y Vistas: Estructuración de Layout y Jerarquía

> Regla de la **Fase 2** definida en [`SKILL.md`](../SKILL.md). Este documento asume que la Fase 1 (`rules/01-principios-ux.md`) ya ha sido superada: aquí no se discute *para quién* se diseña, sino *cómo se construye* el esqueleto de la interfaz. Es un libro de reglas de ingeniería UI, no una guía de estilo — toda "Prohibición" bloquea la entrega y todo "Obligatorio" es una condición de aceptación, no una sugerencia.

---

## 1. Estados Vacíos (Empty States)

### Prohibición absoluta

Queda prohibido dejar un contenedor sin datos en cualquiera de estas formas:
- Espacio en blanco sin ningún elemento.
- Texto plano aislado del tipo "No hay datos", "Sin resultados" o equivalentes, sin acompañamiento visual ni acción disponible.

Un Empty State es una superficie de diseño con la misma exigencia que una superficie con datos — nunca un caso residual sin tratar.

### Estructura obligatoria (los tres elementos)

| Elemento | Requisito |
|---|---|
| **1. Iconografía/ilustración descriptiva** | Debe representar conceptualmente el tipo de contenido ausente. No saturada: un solo elemento visual centrado, sin composiciones decorativas complejas que compitan con el mensaje. |
| **2. Texto explicativo de dos niveles** | **Título**: breve, claro, nombra el estado (ej. "Aún no tienes reportes"). **Párrafo descriptivo**: con valor educativo real — explica qué tipo de datos vive ahí o cómo se generan, nunca repite el título con otras palabras. |
| **3. Llamado a la acción (CTA)** | Botón principal, visualmente prioritario, que ejecuta directamente la acción de creación correspondiente (ej. "Crear primer reporte"). Nunca un enlace secundario de bajo contraste ni una acción ambigua tipo "Más información". |

### Diferenciación de escenarios

| Escenario | Comportamiento obligatorio |
|---|---|
| **Primera vez / Onboarding** (la entidad nunca ha tenido datos) | Empty State completo con los tres elementos. El CTA apunta a la acción de creación primaria del recurso (ej. "Crear primer reporte", "Conectar tu primera fuente de datos"). El copy puede incluir valor educativo extendido, ya que es probablemente la primera exposición del usuario a ese concepto. |
| **Cero resultados por búsqueda/filtro** | Empty State reducido: título indicando ausencia de coincidencias (ej. "No se encontraron resultados para estos filtros"), sin ilustración educativa extensa. El CTA obligatoriamente es **"Limpiar filtros"** (o equivalente exacto a la acción de reset), nunca el CTA de creación de la entidad — el usuario no necesita crear un registro, necesita recuperar visibilidad sobre los que ya existen. |

### Checklist de auditoría

- [ ] ¿Ningún contenedor de la aplicación puede quedar vacío sin pasar por un Empty State diseñado?
- [ ] ¿Todo Empty State tiene los tres elementos (ilustración, texto de dos niveles, CTA)?
- [ ] ¿Se distingue explícitamente el Empty State de "primera vez" del de "cero resultados por filtro"?
- [ ] ¿El CTA de "cero resultados" es "Limpiar filtros" y no un CTA de creación?

---

## 2. Estados de Carga (Loading States con Skeletons)

### Prohibición

Prohibido usar spinners genéricos (ruedas de carga indeterminadas) en contenedores principales de contenido durante la carga asíncrona de datos. Un spinner genérico no comunica estructura ni progreso — solo bloquea.

### Regla del Skeleton

Toda carga de datos en formato tabla, tarjetas (cards) o listados debe representarse mediante un marcador de posición gris animado (Skeleton) que reproduzca milimétricamente el layout final del contenido — mismo número de columnas, mismas proporciones de tarjeta, misma disposición de bloques de texto.

### Reglas de construcción

| Regla | Detalle |
|---|---|
| **Fidelidad dimensional** | El skeleton debe imitar las dimensiones reales de cajas de texto y contenedores del estado cargado — alturas de línea, anchos de avatar/imagen, número de filas visibles en viewport. |
| **Longitud variable** | Las barras que simulan texto deben variar en longitud (ej. 100%, 75%, 50%) para simular dinamismo real; una fila de barras todas del mismo ancho delata un placeholder genérico y desconectado del contenido. |
| **Animación** | Pulso suave y continuo (`animate-pulse` en Tailwind o equivalente). Nunca parpadeo brusco ni animación que compita visualmente con el resto de la interfaz. |
| **Umbral anti-parpadeo** | El skeleton no debe renderizarse si la respuesta llega antes de un umbral mínimo (referencia: **200ms**). Mostrar y ocultar un skeleton en una ventana menor a ese umbral genera parpadeo perceptible y ruido visual, no información útil. |

### Checklist de auditoría

- [ ] ¿Ningún contenedor principal usa spinner genérico para cargas de tabla, cards o listados?
- [ ] ¿El skeleton replica el layout final (columnas, proporciones, disposición)?
- [ ] ¿Las barras del skeleton tienen longitud variable, no uniforme?
- [ ] ¿La animación de pulso es suave y no compite visualmente con el resto de la UI?
- [ ] ¿Existe un umbral (≈200ms) antes de mostrar el skeleton, para evitar parpadeo en cargas ultra-rápidas?

---

## 3. Validación y Manejo de Errores en Formularios

### Lógica de validación

Toda validación de negocio debe originarse y ser autoritativa en el backend (ej. Form Requests de Laravel u equivalente). La UI nunca es la fuente de verdad de la validación — es la capa que representa, en tiempo real y de forma visual, el resultado de esa validación (ya sea mediante validación optimista en cliente que replica las mismas reglas, o mediante respuesta del servidor).

### Reglas de maquetación

| Regla | Detalle |
|---|---|
| **Etiquetado estrecho** | Prohibido el espaciado ambiguo entre `label` e `input`. Deben estar visualmente acoplados como una sola unidad perceptiva — el usuario no debe dudar a qué campo pertenece una etiqueta. |
| **Ubicación del error** | El texto de error se renderiza **obligatoriamente inmediatamente debajo** del input afectado, en color rojo semántico (no gris, no negro), acompañado de un borde rojo sutil en la caja del input. Nunca en un resumen aislado al inicio o final del formulario como único mecanismo. |
| **Dirty State (estado sucio)** | En formularios de edición complejos o modales: si el usuario tiene cambios sin guardar e intenta salir, cerrar o cancelar la vista, se dispara obligatoriamente un diálogo interactivo de confirmación ("¿Deseas descartar los cambios?"). La navegación fuera del formulario nunca descarta trabajo en silencio. |

### Checklist de auditoría

- [ ] ¿La validación del cliente refleja exactamente las mismas reglas que valida el backend, sin divergencia?
- [ ] ¿Label e input están visualmente acoplados sin espaciado ambiguo?
- [ ] ¿Todo error se muestra inmediatamente debajo del input, en rojo semántico, con borde rojo en el input?
- [ ] ¿Todo formulario complejo o modal con cambios sin guardar dispara confirmación antes de descartar al salir?

---

## 4. Tablas de Datos Complejas (Data Tables)

| Regla | Detalle |
|---|---|
| **Identificador humano** | La primera columna (extremo izquierdo) debe mostrar un identificador amigable o el nombre del registro. Prohibido exponer un hash o UUID crudo del sistema como identificador principal visible. |
| **Alineación numérica** | Toda columna que represente valores numéricos, métricas o importes monetarios se alinea estrictamente a la **derecha**, incluyendo su encabezado de columna — nunca centrada ni a la izquierda. |
| **Jerarquía de cabeceras** | Los encabezados de columna deben des-enfatizarse respecto a las filas de datos: tamaño de fuente reducido, peso medio (no bold pesado), color gris claro, texto en mayúsculas. La cabecera orienta, no compite visualmente con el dato. |
| **Paginación y filtros** | El pie de tabla debe mostrar, por defecto: total de registros, página actual (de un total de páginas), y un selector de cantidad de ítems por vista. Ninguna tabla con datos paginables se entrega sin estos tres elementos visibles. |

### Checklist de auditoría

- [ ] ¿La primera columna muestra un identificador legible, nunca un UUID/hash crudo?
- [ ] ¿Todas las columnas numéricas/monetarias están alineadas a la derecha, cabecera incluida?
- [ ] ¿Las cabeceras están visualmente des-enfatizadas frente a las filas de datos?
- [ ] ¿El pie de tabla muestra total de registros, página actual y selector de ítems por página?

---

## 5. Cajones Contextuales (Drawers/Side-Sheets) vs. Modals

### Árbol de decisión técnico

| Usa **Side-Sheet / Drawer lateral** cuando... | Usa **Modal (bloqueante)** cuando... |
|---|---|
| El usuario necesita editar, crear o ver el detalle de un elemento **sin perder el contexto** de la pantalla principal (ej. ver el detalle de un registro de tabla mientras la tabla sigue visible al lado). | Se requiere **foco absoluto** del usuario en una única tarea, sin posibilidad de referencia simultánea al fondo. |
| El flujo se beneficia de **multitarea o comparación visual** entre el elemento abierto y el resto de la vista (ej. comparar un registro con la lista mientras se edita). | Se trata de una **confirmación destructiva breve** (ej. "Eliminar cuenta") que exige una decisión aislada, sin distracción del contexto circundante. |
| El contenido a mostrar es sustancial pero secundario al flujo principal, y el usuario probablemente querrá volver a la vista base sin recargarla. | El flujo es **corto, no lineal y de un solo paso**, donde aislar completamente la interacción del fondo reduce el riesgo de error o confusión. |

### Regla de decisión rápida

Si la pregunta es *"¿el usuario necesita seguir viendo o usando lo que hay detrás mientras completa esto?"* — la respuesta "sí" implica Drawer/Side-Sheet; la respuesta "no, necesito su atención exclusiva" implica Modal.

### Checklist de auditoría

- [ ] ¿Se ha evaluado explícitamente si el flujo se beneficia de contexto visible antes de elegir Modal por defecto?
- [ ] ¿Las confirmaciones destructivas breves usan Modal, no Drawer?
- [ ] ¿Los flujos de edición/detalle que se benefician de comparación visual usan Drawer, no Modal?
- [ ] ¿Ningún Drawer se usa para una confirmación destructiva de un solo paso (mal uso invertido del árbol de decisión)?

---

## Uso de este archivo dentro del flujo de la skill

Este documento se consulta en la **Fase 2** del flujo definido en [`SKILL.md`](../SKILL.md), una vez superado el diagnóstico de [`rules/01-principios-ux.md`](01-principios-ux.md) (Fase 1). El esqueleto resultante de aplicar estas cinco secciones es el que se viste con lenguaje visual en la Fase 3 (`rules/03-tendencias-2026.md`) y se traduce a código en la Fase 4 (`rules/04-frontend-tailwind.md`). Ninguna decisión de estilo puede justificar el incumplimiento de una regla de este archivo.
