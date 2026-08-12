# 04 — Frontend e Implementación: Código React + Tailwind

> Regla de la **Fase 4** definida en [`SKILL.md`](../SKILL.md). Este documento asume que el diseño ya ha superado el diagnóstico (`rules/01-principios-ux.md`), la estructura de layout (`rules/02-reglas-ui-vistas.md`) y la guía de estilo visual (`rules/03-tendencias-2026.md`). Aquí no se toman nuevas decisiones de diseño — se traducen, sin reinterpretación, a código de producción. Es un estándar de desarrollo corporativo estricto: toda "Prohibición" bloquea el merge y toda "Regla" es criterio de aceptación en revisión de código.

---

## 1. Variables Semánticas y Tokens de Diseño en Tailwind

### Prohibición

Prohibido el uso de colores en formato hexadecimal crudo (`#fff`, `#1e293b`, etc.) o de clases de color fijas de Tailwind (ej. `text-blue-600`) directamente en el marcado HTML/JSX cuando representan color de marca o de estado (éxito, advertencia, error, información).

### Regla del token

Todos los colores principales, secundarios, de estado y de fondo deben mapearse a variables semánticas de CSS (tokens de diseño) configuradas en `tailwind.config.js`, y consumirse mediante esa capa semántica en el marcado — nunca mediante el valor crudo de la paleta.

| Categoría de color | Ejemplo de token | Prohibido en su lugar |
|---|---|---|
| Fondo primario | `bg-[var(--color-bg-primary)]` | `bg-slate-900`, `bg-[#0f172a]` directamente en JSX |
| Texto atenuado | `text-[var(--color-text-muted)]` | `text-gray-400` directamente en JSX |
| Estado de éxito | `text-[var(--color-success)]` / `bg-[var(--color-success)]` | `text-green-500` directamente en JSX |
| Estado de error | `text-[var(--color-error)]` / `border-[var(--color-error)]` | `text-red-600` directamente en JSX |
| Estado de advertencia | `text-[var(--color-warning)]` | `text-yellow-500` directamente en JSX |

**Excepción admitida:** valores de utilidad puramente estructural sin carga semántica de marca o estado (ej. un `border-transparent` de reseteo) pueden usar la utilidad nativa de Tailwind directamente, siempre que no representen color de marca, estado ni texto de lectura.

### Saturación en escalas de grises

Prohibido el uso de grises neutros puros (sin matiz) por considerarse estéticamente planos. Toda escala de gris del sistema debe tener una saturación sutil coherente con el tema: azulada (**Slate** o **Zinc**) o cálida (**Stone**), nunca una escala de gris neutro sin matiz.

El color de lectura oscuro base nunca debe ser negro puro (`#000000` / `text-black`): se exige un tono gris profundo con matiz, ej. `text-slate-900` o `text-zinc-900`, consistente con la familia de gris elegida para el resto del sistema.

### Checklist de auditoría

- [ ] ¿Ningún color de marca o de estado aparece como hex crudo o clase fija de Tailwind directamente en JSX?
- [ ] ¿Todos los colores de marca/estado se consumen a través de variables semánticas definidas en `tailwind.config.js`?
- [ ] ¿La escala de grises del proyecto usa una única familia con matiz (Slate, Zinc o Stone), sin mezclarlas?
- [ ] ¿El texto de lectura oscuro usa un gris profundo con matiz, nunca negro puro?

---

## 2. Retícula, Espaciados y Escalas de Sizing

### Regla del sistema de 8px

Todo padding, margin, ancho, alto y espaciado entre elementos debe basarse estrictamente en la escala matemática de Tailwind derivada de 4px/8px.

| Clase Tailwind | Valor en px | Uso típico |
|---|---|---|
| `p-1` / `m-1` / `gap-1` | 4px | Espaciado mínimo entre elementos muy acoplados (ej. icono y su etiqueta) |
| `p-2` / `m-2` / `gap-2` | 8px | Espaciado interno estrecho dentro de un mismo componente |
| `p-4` / `m-4` / `gap-4` | 16px | Espaciado estándar interno de componente |
| `p-6` / `m-6` / `gap-6` | 24px | Espaciado entre bloques relacionados dentro de una sección |
| `p-8` / `m-8` / `gap-8` | 32px | Espaciado entre componentes independientes o secciones |

Prohibido cualquier valor de espaciado arbitrario fuera de la escala (ej. `h-[23px]`, `p-[13px]`, `gap-[10px]`), salvo que el valor responda a una restricción externa no negociable (ej. altura exacta de un asset SVG de terceros), documentada explícitamente como excepción en el propio componente.

### Relaciones de espacio (Ley de Proximidad)

El espacio **dentro** de un componente (ej. entre el título de una tarjeta y su párrafo descriptivo) debe ser siempre menor que el espacio **entre** componentes independientes.

| Relación | Escala esperada |
|---|---|
| Espaciado intra-componente (título ↔ párrafo, label ↔ input) | `gap-2` a `gap-4` |
| Espaciado inter-componente (tarjeta ↔ tarjeta, sección ↔ sección) | `gap-6` a `gap-8` o superior |

Si el espaciado intra-componente es igual o mayor al inter-componente, la jerarquía visual de agrupación se rompe — esto se considera un defecto de maquetación, no una variación de estilo válida.

### Checklist de auditoría

- [ ] ¿Todo espaciado usa la escala 4px/8px de Tailwind, sin valores arbitrarios `[Npx]` no justificados?
- [ ] ¿Toda excepción de espaciado arbitrario está documentada explícitamente en el componente?
- [ ] ¿El espaciado intra-componente es consistentemente menor que el inter-componente en toda la vista?

---

## 3. Aislamiento de Estado y Arquitectura React

### Responsabilidad única

Los componentes de presentación (UI pura) deben ser **stateless**: no manejan estado propio de negocio ni lógica de datos. Reciben toda su información y comportamiento exclusivamente a través de Props.

| Tipo de componente | Responsabilidad permitida | Responsabilidad prohibida |
|---|---|---|
| **Componente de presentación (UI pura)** | Renderizar props, manejar estado puramente visual efímero (ej. `isHovered` local) | Llamadas a API, lógica de negocio, transformación de datos de dominio |
| **Custom Hook** | Encapsular estado complejo de negocio, llamadas a API, side effects | Renderizar JSX |
| **Componente contenedor/página** | Orquestar custom hooks y pasar resultados como props a componentes de presentación | Contener JSX de UI de bajo nivel mezclado con lógica de fetching |

### Uso de Hooks

- **Prohibido** el uso generalizado de `useCallback` y `useMemo` en proyectos pequeños o medianos si no existe un cuello de botella de rendimiento previamente documentado mediante el React Profiler. Su uso por defecto añade complejidad de lectura y coste de memoria sin beneficio medible.
- **Exigido:** todo estado complejo de negocio o de llamada a APIs externas se maneja en hooks personalizados (ej. `useGetDataTable`), separando la lógica de obtención/transformación de datos del renderizado visual del componente que la consume.

### Checklist de auditoría

- [ ] ¿Los componentes de presentación reciben todo su contenido y comportamiento por props, sin estado de negocio propio?
- [ ] ¿Existe un caso documentado en el Profiler antes de introducir `useCallback`/`useMemo`?
- [ ] ¿Toda lógica de negocio o de API vive en un Custom Hook dedicado, separado del componente visual?

---

## 4. Anatomía Estricta de un Archivo de Componente (.tsx / .jsx)

Todo archivo de componente de React debe seguir este orden secuencial inalterable. Un componente que invierta o mezcle estos bloques no pasa revisión de código, independientemente de si el resultado visual es correcto.

| Orden | Bloque | Contenido |
|---|---|---|
| 1 | **Importaciones** | En este orden interno: (a) librerías externas (React, hooks de terceros), (b) componentes comunes/compartidos, (c) hooks personalizados, (d) assets y tipos. |
| 2 | **Interfaz/Tipos de TypeScript** | Declaración de las props del componente y de los tipos de datos que consume o expone. |
| 3 | **Definición de la función del componente** | Exportación principal del componente. |
| 4 | **Declaración de Hooks** | Instanciación de `useState`, `useRef`, custom hooks y cualquier otro hook, en la parte superior del cuerpo de la función. |
| 5 | **Handlers de eventos** | Funciones locales para interacción del usuario (ej. `handleSubmit`, `handleFilterChange`). |
| 6 | **Funciones auxiliares de renderizado** | Solo si se requiere segmentar partes del JSX en funciones internas para legibilidad. |
| 7 | **Retorno de JSX** | Código visual final, estructurado y legible. |

### Checklist de auditoría

- [ ] ¿Las importaciones respetan el subordenamiento: externas → comunes → custom hooks → assets/tipos?
- [ ] ¿Los tipos/interfaces de props están declarados antes de la función del componente?
- [ ] ¿Todos los hooks se declaran juntos al inicio del cuerpo del componente, antes de cualquier handler?
- [ ] ¿Los handlers de eventos están claramente separados de las funciones auxiliares de renderizado?
- [ ] ¿El bloque de retorno de JSX es el último elemento del componente, sin lógica de negocio intercalada?

---

## 5. Taxonomía de Componentes: Metodología de Diseño Atómico (Atomic Design)

Regula cómo se clasifican y estructuran los componentes de React en el repositorio, para evitar componentes monolíticos que mezclen presentación, composición y estado de negocio en un mismo archivo.

| Nivel | Definición | Ejemplos | Reglas |
|---|---|---|---|
| **Átomos** | Componentes visuales indivisibles: no se pueden descomponer más sin perder su función. | Botón básico, label, input de texto puro. | No manejan lógica de negocio ni llamadas a APIs. Son stateless salvo estado puramente visual efímero (ver `rules/04-frontend-tailwind.md` §3). |
| **Moléculas** | Unión de dos o más átomos que adquiere una función específica. | Campo de formulario (Label + Input + Mensaje de error), barra de búsqueda (Input + Botón). | Componen átomos existentes; no redefinen su estilo internamente — lo heredan vía props/tokens. |
| **Organismos** | Estructura compleja compuesta de moléculas y átomos, que forma una sección funcional completa de la pantalla. | Barra de navegación superior, tabla de datos completa con paginación y filtros, tarjeta de métrica con su minigráfico. | Pueden orquestar múltiples moléculas/átomos y consumir un Custom Hook, pero no acoplan lógica de fetching de datos directamente en su cuerpo (esa lógica vive en el hook, ver §3). |
| **Plantillas** | Layout estructural a nivel de página: define cómo se distribuyen los organismos (la grilla de la interfaz). | Estructura de un dashboard con zonas para navbar, sidebar, contenido principal y panel lateral. | Sin datos reales ni estado de negocio acoplado — reciben organismos como children/props, no los instancian con datos hardcodeados. |
| **Páginas** | Vista final: toma la plantilla e inyecta el estado de negocio real. | La ruta `/dashboard`, la ruta `/reportes/:id`. | Único nivel autorizado para interactuar con custom hooks de datos, llamadas a APIs/base de datos, y orquestación de estado real. |

**Regla de dependencia unidireccional:** un componente de un nivel solo puede componer componentes de su mismo nivel o de niveles inferiores (una Página compone Plantillas/Organismos/Moléculas/Átomos; un Átomo nunca importa un Organismo). Violar esta dirección es señal de un componente mal clasificado.

### Checklist de auditoría

- [ ] ¿Todo componente del repositorio puede clasificarse sin ambigüedad en uno de los cinco niveles?
- [ ] ¿Los Átomos son stateless y no contienen lógica de negocio ni llamadas a API?
- [ ] ¿Las Moléculas componen Átomos existentes en vez de redefinir estilos propios?
- [ ] ¿Los Organismos delegan el fetching de datos a Custom Hooks en vez de acoplarlo en su propio cuerpo?
- [ ] ¿Las Plantillas están libres de datos reales o estado de negocio hardcodeado?
- [ ] ¿Solo las Páginas interactúan directamente con custom hooks de datos y llamadas a APIs?
- [ ] ¿Se respeta la dependencia unidireccional (ningún nivel inferior importa uno superior)?

---

## 6. Rendimiento de Interfaz: Estándares de Iconografía y Assets (Performance UX)

Reglas de carga de recursos gráficos para garantizar un First Contentful Paint (FCP) óptimo. Estas reglas son de cumplimiento obligatorio, no de optimización posterior — el coste de rehacer iconografía después del hecho es sistemáticamente mayor que hacerlo bien desde el primer componente.

### Prohibiciones

| Prohibición | Motivo |
|---|---|
| **Font-icons (ej. FontAwesome vía `.ttf`/`.woff2` completo)** | Cargar una librería de iconos como fuente web completa retrasa el renderizado del texto y bloquea la pantalla mientras la fuente descarga — coste fijo alto por un subconjunto mínimo de glifos realmente usados. |
| **Base64 pesado en JSX/CSS** | Codificar imágenes o assets medianos/grandes como cadenas Base64 embebidas infla de forma masiva el tamaño del bundle de JavaScript, ya que el asset viaja como texto dentro del código en vez de como recurso cacheable por separado. |

### Uso obligatorio de SVGs inline optimizados

Todo icono o elemento gráfico vectorial debe renderizarse como SVG embebido directamente en el JSX, o cargarse de forma optimizada mediante paquetes compilados y tree-shakeables (ej. `lucide-react` u equivalente) que solo incluyen en el bundle los iconos efectivamente importados.

### Verificación de limpieza y accesibilidad del SVG

| Requisito | Detalle |
|---|---|
| **Limpieza del markup** | El SVG debe estar libre de atributos basura generados por software de diseño (metadatos de Illustrator/Figma, IDs autogenerados innecesarios, comentarios de herramienta). |
| **Icono decorativo** | Debe incluir `aria-hidden="true"` cuando no aporta información no disponible por otro medio (ej. acompaña a un texto que ya describe la acción). |
| **Icono funcional/interactivo** | Debe incluir un elemento `<title>` descriptivo dentro del propio SVG cuando el icono cumple una función interactiva sin texto adyacente que la explique (ej. un botón de icono solo, sin label visible). |

### Checklist de auditoría

- [ ] ¿Ninguna librería de iconos se carga como fuente web completa (`.ttf`/`.woff2`)?
- [ ] ¿Ningún asset mediano/grande está codificado en Base64 dentro de JSX o CSS?
- [ ] ¿Todos los iconos se renderizan como SVG inline o mediante un paquete tree-shakeable?
- [ ] ¿Los SVGs están limpios de metadatos y atributos basura de herramientas de diseño?
- [ ] ¿Todo icono puramente decorativo tiene `aria-hidden="true"`?
- [ ] ¿Todo icono funcional sin texto adyacente tiene un `<title>` descriptivo para lectores de pantalla?

---

## Uso de este archivo dentro del flujo de la skill

Este documento se consulta en la **Fase 4**, la última del flujo definido en [`SKILL.md`](../SKILL.md), traduciendo a código de producción lo ya validado en `rules/01-principios-ux.md` (diagnóstico), `rules/02-reglas-ui-vistas.md` (estructura) y `rules/03-tendencias-2026.md` (guía de estilo). Ninguna decisión de este archivo introduce diseño nuevo: solo implementa, con tokens semánticos, escala de espaciado consistente, arquitectura React desacoplada, anatomía de archivo predecible, taxonomía de componentes por Atomic Design y estándares de rendimiento de iconografía/assets, lo que las fases anteriores ya definieron.

Una vez superados los seis checklists de este archivo, **el ciclo de diseño a código queda cerrado**. El componente o vista resultante está listo para ser auditado en el flujo CI/CD del repositorio, donde las prohibiciones y reglas de las cuatro fases (`01` a `04`) deben poder verificarse de forma automatizada o mediante revisión de código, no como una recomendación de estilo opcional.
