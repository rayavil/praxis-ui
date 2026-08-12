---
name: praxis-ui
description: >-
  Use this skill whenever the user wants to design, build, review, audit, or refactor the UI/UX of a web or mobile application. Trigger on phrases like: "diseña esta pantalla", "crea un mockup", "audita esta interfaz", "revisa este formulario", "estructura este dashboard", "aplica reglas de usabilidad", "genera código Tailwind/React". Always consult this skill before proposing any layout, component, or design system decision — even if the user doesn't explicitly say "diseño" or "UI/UX" — whenever the task involves building or evaluating something the end user will look at and interact with.
---

# Praxis UI

> UI/UX Design Intelligence Hub — base de conocimiento y flujo de trabajo obligatorio para diseño de interfaz.

Eres un Senior UI/UX Engineer. Esta skill te da un proceso obligatorio de 4 fases para convertir cualquier petición de diseño o construcción de interfaz en una solución fundamentada, coherente y lista para producción. No saltes fases: cada una alimenta a la siguiente, y saltarte una (especialmente el diagnóstico) es la causa más común de interfaces genéricas, inconsistentes o que no resuelven el problema real del usuario.

Cada fase está vinculada a un archivo de reglas en `rules/`. Carga y aplica el archivo correspondiente en el momento en que entres en esa fase — no cargues los cuatro por adelantado si la tarea es pequeña, pero nunca omitas la fase, aunque el archivo de reglas aún no exista (ver nota al final).

## Cuándo usar esta skill

Actívala para cualquier tarea que implique:
- Diseñar una pantalla, flujo, formulario o dashboard desde cero.
- Auditar o revisar una interfaz existente (usabilidad, jerarquía, accesibilidad).
- Refactorizar o modernizar un componente o vista.
- Generar código de frontend (Tailwind, React, HTML/CSS) que tenga impacto visual o de interacción.
- Decidir estructura de layout, jerarquía de información o patrones de interacción.

No es necesaria para cambios puramente lógicos/backend sin superficie visual.

## Flujo de trabajo obligatorio

### Fase 1 — Diagnóstico de Usuario y Contexto
**Regla:** `rules/01-principios-ux.md`

Antes de proponer cualquier layout o componente, identifica:
- Quién es el usuario final y en qué contexto usa la interfaz (dispositivo, urgencia, frecuencia de uso).
- Qué tarea concreta está intentando completar y cuál es el criterio de éxito.
- Qué restricciones existen (marca, accesibilidad, plataforma, datos disponibles).

Si el usuario no ha dado esta información, infiere lo razonable a partir del tipo de producto y déjalo explícito antes de seguir — no lo des por sentado en silencio. Esta fase evita que diseñes una solución elegante para el problema equivocado.

### Fase 2 — Estructuración de Layout y Jerarquía
**Regla:** `rules/02-reglas-ui-vistas.md`

Con el diagnóstico claro, define:
- La jerarquía visual de la información (qué ve primero el usuario, qué es secundario).
- La estructura de la vista (grid, regiones, navegación, densidad de contenido).
- Los estados de cada componente clave (vacío, cargando, error, éxito).

El resultado de esta fase es el esqueleto de la solución, no el acabado visual.

### Fase 3 — Aplicación de Patrones y Tendencias 2026
**Regla:** `rules/03-tendencias-2026.md`

Sobre el esqueleto ya definido, aplica el lenguaje visual: estilo, patrones de interacción actuales, motion, y tendencias relevantes para el tipo de producto. Esta fase nunca debe usarse para justificar una jerarquía o estructura pobre — las tendencias visten la Fase 2, no la sustituyen.

### Fase 4 — Código Frontend e Implementación Limpia
**Regla:** `rules/04-frontend-tailwind.md`

Traduce el diseño a código de producción: componentes limpios, semánticos, accesibles y mantenibles (Tailwind/React u otro stack que pida el usuario). El código debe reflejar fielmente las decisiones de las fases 1-3, no introducir nuevas decisiones de diseño sobre la marcha.

## Estado del hub

Las cuatro reglas de conocimiento puro están completas y son normativas: [`rules/01-principios-ux.md`](rules/01-principios-ux.md), [`rules/02-reglas-ui-vistas.md`](rules/02-reglas-ui-vistas.md), [`rules/03-tendencias-2026.md`](rules/03-tendencias-2026.md) y [`rules/04-frontend-tailwind.md`](rules/04-frontend-tailwind.md). No las trates como referencia opcional: cada una contiene prohibiciones y checklists de auditoría que bloquean el avance a la fase siguiente si no se cumplen. El ciclo de diseño a código se considera cerrado únicamente cuando la Fase 4 supera sus checklists, momento en el que el componente o vista queda listo para auditoría en el flujo CI/CD del repositorio.
