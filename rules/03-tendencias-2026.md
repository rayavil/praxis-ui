# 03 — Tendencias 2026: Patrones Visuales y de Interacción

> Regla de la **Fase 3** definida en [`SKILL.md`](../SKILL.md). Este documento asume que el esqueleto de la interfaz ya existe y ha superado `rules/02-reglas-ui-vistas.md` (Fase 2). Aquí no se decide *qué* estructura tiene la vista, sino *con qué lenguaje visual y de movimiento* se reviste esa estructura. Cada apartado se redacta como regla de diseño obligatoria, no como descripción estética — si una decisión visual no puede expresarse como regla verificable, no pertenece a este archivo.

---

## 1. SaaS Dark Mode de Alto Rendimiento (Estándar 2026)

### Prohibición de negro puro

Prohibido usar negro puro (`#000000`) como color de fondo principal en Web Apps. El fondo base debe ser un gris oscuro saturado o un azul pizarra profundo (referencia: `#0f172a` o `#121212`).

**Excepción documentada:** pantallas OLED en contexto móvil de alta eficiencia energética, donde el negro puro reduce consumo de forma medible. Esta excepción debe declararse explícitamente como decisión técnica, no aplicarse por defecto ni extenderse a Web Apps de escritorio.

### Regla de profundidad inversa

| Modo | Mecanismo de profundidad |
|---|---|
| **Modo claro** | La profundidad se genera con sombras oscuras proyectadas sobre un fondo claro. |
| **Modo oscuro** | La profundidad se genera por **iluminación de elevación**: cuanto más alta esté una capa visual en la jerarquía (tarjeta, panel, modal por encima del fondo), **más claro** debe ser el gris de su fondo. |

**Regla de aplicación:** define una escala de elevación fija (mínimo 3 niveles: base, superficie, overlay) donde cada nivel superior incrementa el valor de luminosidad del fondo de forma perceptible pero moderada — nunca saltos que generen contraste extremo entre capas adyacentes.

### Contraste de acentos

Prohibido usar colores altamente saturados para textos o bordes decorativos sobre fondos oscuros: generan "vibración visual" (fenómeno óptico donde el ojo no logra fijar el borde entre dos colores de alta saturación y luminosidad similar).

**Exigido:** tonos desaturados o pasteles — referencia de escala Tailwind **200-300** — que además cumplan la relación de contraste mínima de WCAG 2.2 definida en `rules/01-principios-ux.md` (Pilar 3).

### Checklist de auditoría

- [ ] ¿El fondo principal evita `#000000` (salvo excepción OLED móvil documentada)?
- [ ] ¿Existe una escala de elevación donde las capas superiores tienen fondos progresivamente más claros?
- [ ] ¿Ningún texto o borde decorativo usa saturación alta sobre fondo oscuro?
- [ ] ¿Los acentos en escala 200-300 cumplen el contraste WCAG 2.2 exigido en Fase 1?

---

## 2. Tableros de Control SaaS (Dashboard UX 2026)

### Límite de KPIs

Máximo **3 o 4 tarjetas** de métricas clave (KPI cards) en la parte superior del dashboard. Cada tarjeta debe mostrar:
- Una sola métrica principal, en tamaño tipográfico destacado.
- Un micro-indicador de tendencia porcentual (verde = crecimiento, rojo = descenso), nunca ambas tendencias mezcladas en una misma tarjeta.

**Prohibido:** más de 4 KPI cards en la fila superior — si existen más métricas relevantes, deben reorganizarse en una sección secundaria, no competir por atención en la franja de mayor jerarquía visual.

### Regla de gráficos de datos

| Regla | Detalle |
|---|---|
| **Prohibición de pie charts 3D** | Prohibido cualquier gráfico de pastel con efecto 3D bajo cualquier circunstancia. |
| **Límite de categorías en pie/donut** | Prohibido un gráfico de pastel o dona con más de **5 categorías**. Por encima de ese límite, usar barras horizontales ordenadas de mayor a menor valor. |
| **Sustitución obligatoria** | Cuando se supera el límite de categorías, reemplazar por gráfico de dona minimalista (si se mantiene bajo 5) o barras horizontales ordenadas descendentemente. |
| **Legibilidad estructural** | Todo gráfico debe incluir títulos de eje legibles y leyenda clara — un gráfico sin identificar sus ejes o series no es una entrega válida. |
| **Interactividad obligatoria** | Todo gráfico debe soportar estado "Hover" con tooltip limpio que muestre el valor exacto del punto/segmento bajo el cursor. |

### Checklist de auditoría

- [ ] ¿La fila superior del dashboard tiene entre 3 y 4 KPI cards, nunca más?
- [ ] ¿Cada KPI card muestra una sola métrica principal con su tendencia porcentual?
- [ ] ¿Ningún gráfico de pastel usa efecto 3D?
- [ ] ¿Ningún pie/donut supera 5 categorías sin haberse reemplazado por barras horizontales?
- [ ] ¿Todo gráfico tiene ejes legibles, leyenda clara y tooltip interactivo en hover?

---

## 3. Brutalismo Táctil y Arquitectura Invisible (Layouts de Vanguardia)

Estas dos macrotendencias son direcciones estéticas alternativas, no combinables dentro de un mismo sistema de diseño — la elección debe ser explícita y consistente en toda la superficie del producto.

### Brutalismo táctil

| Regla | Detalle |
|---|---|
| **Bordes** | Bordes oscuros, muy definidos, sin suavizado ni difuminado. |
| **Sombras** | Sombras paralelas duras (hard shadows), con opacidad marcada y sin blur — el offset debe ser perceptible como bloque sólido, no como difusión atmosférica. |
| **Estados "active"** | Los botones deben tener un estado "active" muy marcado (ej. desplazamiento visual del bloque de sombra al pulsar) que simule una pulsación mecánica real, no una transición sutil de opacidad. |

### Arquitectura invisible

| Regla | Detalle |
|---|---|
| **Bordes de contenedores** | Deben fusionarse con el fondo o reducirse a líneas ultra-sutiles (contraste mínimo perceptible, nunca un borde marcado). |
| **Líneas divisorias** | Mismo criterio que bordes: presencia mínima, funcional pero casi imperceptible. |
| **Principio rector** | La interfaz debe dar la sensación de desaparecer — el contenido generado por el usuario (texto, datos, imágenes) es el protagonista absoluto, nunca el chrome de la interfaz. |

### Checklist de auditoría

- [ ] ¿Se ha elegido explícitamente una única macrotendencia (Brutalismo táctil o Arquitectura invisible) para todo el sistema, sin mezclarlas?
- [ ] Si es Brutalismo táctil: ¿las sombras son duras y sin blur, y los estados "active" simulan pulsación mecánica?
- [ ] Si es Arquitectura invisible: ¿los bordes y divisores son ultra-sutiles o inexistentes, sin competir con el contenido?

---

## 4. Micro-Interacciones y Motion UX (Reglas de Movimiento)

### Regla de duración funcional (timings)

| Tipo de interacción | Duración obligatoria |
|---|---|
| **Interacciones rápidas** (hovers, feedback de clic, switches) | 100ms – 150ms |
| **Transiciones de componentes medianos** (apertura de Drawers, Modales) | 200ms – 250ms |
| **Cambios de estado de página completa o flujos guiados** | 300ms – 350ms (máximo) |

**Prohibido:** cualquier animación de interfaz que exceda 350ms sin justificación narrativa explícita (ej. una animación de onboarding puntual y deliberadamente cinemática). Fuera de esos casos documentados, exceder el máximo se considera latencia percibida, no diseño.

### Curvas de aceleración

Prohibidas las animaciones lineales (`ease-linear`) en cualquier micro-interacción o transición de componente.

**Exigido:** curvas de salida orgánica — `ease-out` o, con mayor precisión, `cubic-bezier(0.16, 1, 0.3, 1)` — que produzcan sensación de respuesta física inmediata seguida de desaceleración suave.

### Feedback activo

Todo botón que dispare una acción asíncrona (envío de formulario, guardado, llamada a API) debe cambiar visualmente a un estado "procesando" con micro-animación en el instante exacto del clic. Este cambio de estado tiene una función doble: comunica que la acción se registró, y previene el doble-envío accidental por clics repetidos del usuario mientras espera respuesta.

### Checklist de auditoría

- [ ] ¿Los hovers, clics y switches respetan 100-150ms?
- [ ] ¿Los Drawers y Modales respetan 200-250ms en su transición de apertura/cierre?
- [ ] ¿Los cambios de página completa o flujos guiados no exceden 300-350ms, salvo excepción narrativa documentada?
- [ ] ¿Ninguna animación usa `ease-linear`?
- [ ] ¿Las transiciones usan `ease-out` o `cubic-bezier(0.16, 1, 0.3, 1)`?
- [ ] ¿Todo botón de envío asíncrono muestra estado "procesando" inmediato al clic, previniendo doble-envío?

---

## 5. Glassmorphism 2.0 (Liquid Glass — Estilo Vidrio)

### Uso

Exclusivo para barras de navegación superiores, paneles flotantes o ventanas contextuales (Drawers). Prohibido su uso en superficies de lectura extensa (tablas de datos, formularios largos, cuerpos de texto) donde la transparencia degrada la legibilidad sostenida.

### Especificación CSS/Tailwind

| Propiedad | Valor exacto |
|---|---|
| Fondo | `bg-white/[0.08]` |
| Desenfoque | `backdrop-blur-[20px]` |
| Borde | `border border-white/[0.15]` |
| Sombra | `shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]` |

Esta combinación es la especificación de referencia del sistema — no se ajustan sus valores por preferencia estética puntual; cualquier variación debe justificarse y documentarse como excepción del componente.

### Guardrail de accesibilidad

Exigido un fallback automático a fondo **100% opaco** cuando:
- El sistema operativo del usuario reporta `prefers-reduced-transparency`, o
- El contraste de lectura del texto superpuesto sobre el fondo con vidrio cae por debajo de **4.5:1** (medido sobre el peor caso de fondo posible detrás del panel, no solo el fondo de diseño por defecto).

### Checklist de auditoría

- [ ] ¿El glassmorphism se limita a navbars, paneles flotantes o Drawers, sin aplicarse a superficies de lectura extensa?
- [ ] ¿Los valores de fondo, blur, borde y sombra coinciden con la especificación exacta de la tabla?
- [ ] ¿Existe fallback a fondo opaco ante `prefers-reduced-transparency`?
- [ ] ¿Se ha verificado el contraste del texto superpuesto contra el peor caso de fondo real, no solo el fondo de diseño?

---

## 6. Bento Grid Avanzado (SaaS Metrics)

### Uso

Layouts asimétricos para organizar datos densos de forma visual y estructurada — dashboards, resúmenes de métricas, paneles de estado con elementos de distinta prioridad e importancia.

### Especificación CSS/Tailwind

| Elemento | Clase base |
|---|---|
| Grilla base | `grid grid-cols-1 md:grid-cols-4 gap-4` |
| Tarjeta destacada (alto impacto) | combina `col-span-2` y/o `row-span-2` |
| Tarjeta estándar | ocupa una celda simple, sin span adicional |

La distribución asimétrica mediante `col-span-2` y `row-span-2` debe usarse de forma equilibrada: el número de tarjetas expandidas debe ser proporcional a su relevancia real en la jerarquía de información definida en `rules/02-reglas-ui-vistas.md`, nunca como recurso puramente decorativo para "rellenar" la grilla.

### Guardrail de accesibilidad

El orden del marcado HTML (DOM) debe ser **lógico y secuencial** para lectores de pantalla. Prohibido desordenar el DOM (ej. mediante `order` de CSS o reorganización con Grid/Flexbox) únicamente para forzar una composición visual — regla de **"reflow nativo seguro"**: si el layout visual necesita un orden distinto al de lectura, la solución es replantear la estructura del grid, no divorciar el orden visual del orden del DOM.

### Checklist de auditoría

- [ ] ¿La grilla base usa `grid grid-cols-1 md:grid-cols-4 gap-4` como fundamento?
- [ ] ¿Las tarjetas con `col-span-2`/`row-span-2` corresponden a métricas de relevancia real, no a relleno decorativo?
- [ ] ¿El orden del DOM coincide con el orden lógico de lectura, sin reordenamiento forzado vía CSS?
- [ ] ¿Se ha probado la navegación por lector de pantalla para confirmar secuencia coherente?

---

## 7. Calm Design & Restraint (Diseño Calmo)

### Regla del "Norte ambiental"

En paneles de administración, exigido un único indicador de rendimiento (KPI) de escala gigante, ubicado arriba a la izquierda, que transmita el estado general del sistema de un solo vistazo. Este indicador reduce drásticamente el ruido visual al actuar como ancla cognitiva: el usuario no necesita escanear el dashboard completo para saber si "todo está bien".

### Regla de ejecución

| Zona | Comportamiento obligatorio |
|---|---|
| **Área de trabajo activa** | 100% limpia para tareas rápidas — sin paneles secundarios, widgets adicionales ni configuraciones visibles por defecto. |
| **Paneles de análisis profundo y configuración compleja** | Ocultos tras una interacción consciente del usuario (expandir, navegar a una sección dedicada, abrir un Drawer) — nunca visibles de entrada compitiendo con la tarea principal. |

Esta sección se apoya directamente en la Heurística #8 (Estética y minimalismo) de `rules/01-principios-ux.md`: Calm Design es la expresión visual de esa heurística llevada a nivel de arquitectura de página completa.

### Checklist de auditoría

- [ ] ¿Existe un único KPI de escala gigante arriba a la izquierda en los paneles de administración?
- [ ] ¿El área de trabajo activa está libre de paneles secundarios no solicitados?
- [ ] ¿Los paneles de análisis profundo o configuración requieren una interacción consciente para revelarse?

---

## 8. Resonant Stark (Warm Minimalism)

### Cromática humana

Prohibidas las interfaces clínicas o frías en modo claro. Exigida la sustitución de grises planos por tonos tierra, arena, verdes oliva o terracotas desaturados como base cromática del fondo en modo claro.

### Efectos de luz

Implementados degradados radiales (`radial-gradient`) extremadamente suaves y de muy baja opacidad en las esquinas de los contenedores principales, para simular la incidencia de luz natural. El degradado debe ser imperceptible como forma geométrica explícita — su función es aportar calidez atmosférica, no crear una figura visible.

| Propiedad | Restricción |
|---|---|
| Opacidad del degradado | Muy baja — no debe leerse como una forma con bordes definidos |
| Posición | Esquinas de contenedores principales, nunca centrado ni cubriendo el área de lectura |
| Color | Coherente con la paleta tierra/arena/oliva/terracota del sistema, nunca un tono ajeno a la cromática humana definida arriba |

### Checklist de auditoría

- [ ] ¿El modo claro evita grises planos y usa tonos tierra/arena/oliva/terracota desaturados?
- [ ] ¿Los degradados radiales en esquinas son de opacidad muy baja, sin leerse como forma explícita?
- [ ] ¿El color de los degradados es coherente con la cromática humana elegida para el sistema?

---

## 9. Retro-Modern Web Aesthetics (Nostalgia Controlada)

### Uso

Permitido **únicamente** para dar personalidad a interfaces de software empresarial tradicionalmente monótonas (ej. herramientas de analítica, consolas de desarrollo, paneles técnicos internos). Prohibido su uso en productos de cara al consumidor final donde la percepción de modernidad y confianza es prioritaria.

### Detalles táctiles

| Elemento | Regla |
|---|---|
| Bordes | Grabados que simulen botones mecánicos de sistemas operativos antiguos (ej. relieve sutil, doble borde claro/oscuro). |
| Texturas de fondo | Grano o papel sutil, aplicado exclusivamente en el fondo de celdas de tablas de datos — nunca en superficies de lectura de texto extenso. |
| Rendimiento | No debe comprometer en ningún caso la velocidad de carga de la página: las texturas se implementan como CSS (gradientes/ruido generado), nunca como imágenes pesadas sin optimizar. |

### Checklist de auditoría

- [ ] ¿El estilo Retro-Modern se aplica solo a herramientas empresariales internas, no a producto de consumidor final?
- [ ] ¿Los bordes grabados y texturas se limitan a botones y celdas de tabla, sin invadir texto de lectura extensa?
- [ ] ¿Las texturas están implementadas de forma performante (CSS generado), sin impacto medible en tiempo de carga?

---

## 10. Kinetic Typography & Multimodal UI (Tipografía e Interacción Sensorial)

### Fluidez tipográfica

Exigido el escalado fluido del tamaño de la tipografía principal en función del ancho del viewport, usando unidades `vw` (o `clamp()` con un componente `vw`), en lugar de saltos discretos por breakpoint para los elementos tipográficos de mayor jerarquía (titulares, cifras destacadas de KPI).

### Retroalimentación sonora

Las micro-interacciones de confirmación de éxito (ej. envío de formulario) o advertencia crítica pueden incluir micro-sonidos táctiles de frecuencia ultra-baja (haptic-like clicks). Esta retroalimentación es un complemento sensorial opcional, nunca el único canal de confirmación — debe coexistir siempre con la confirmación visual correspondiente.

**Guardrail obligatorio:** debe existir un switch de silenciado global, accesible en un solo paso desde la barra de configuración, que desactive toda retroalimentación sonora de la interfaz. Ninguna micro-interacción sonora puede reproducirse por defecto sin que el usuario tenga esa vía de control inmediata.

### Checklist de auditoría

- [ ] ¿La tipografía principal (titulares, cifras de KPI) escala de forma fluida con `vw`/`clamp()`, no solo por breakpoints discretos?
- [ ] ¿Todo micro-sonido de confirmación o advertencia coexiste con una confirmación visual equivalente?
- [ ] ¿Existe un switch de silenciado global accesible en un solo paso?
- [ ] ¿Ninguna retroalimentación sonora se activa por defecto sin que el usuario pueda desactivarla de inmediato?

---

## Uso de este archivo dentro del flujo de la skill

Este documento se consulta en la **Fase 3** del flujo definido en [`SKILL.md`](../SKILL.md), sobre el esqueleto ya validado en `rules/02-reglas-ui-vistas.md` (Fase 2). La paleta cromática de Dark Mode, la jerarquía de dashboard, la dirección estética (Brutalismo táctil o Arquitectura invisible), las reglas de motion, y las seis direcciones de vanguardia añadidas en las secciones 5 a 10 (Glassmorphism 2.0, Bento Grid, Calm Design, Resonant Stark, Retro-Modern y Kinetic Typography/Multimodal UI) constituyen, en conjunto, la **guía de estilo obligatoria** del proyecto: ninguna decisión visual o de animación tomada en la Fase 4 (`rules/04-frontend-tailwind.md`) puede contradecir lo establecido en este archivo. La Fase 4 traduce estas reglas a código limpio; no las reinterpreta ni las sustituye.
