# Praxis UI

> UI/UX Design Intelligence Hub

Repositorio de conocimiento de diseño UI/UX, triplemente útil:

1. **Para humanos**: una base de reglas y criterios de diseño de interfaz consolidados, organizados y versionados — navegable como sitio web.
2. **Para IAs**: una *Skill* consumible directamente por Claude, Antigravity, Cursor u otros asistentes, que orquesta ese conocimiento en un flujo de trabajo de 4 fases.
3. **Para Cursor**: `.cursorrules` aplica el mismo flujo directamente en el editor.

Sitio publicado: `https://rayavil.github.io/praxis-ui/` (una vez desplegado, ver [Despliegue](#despliegue)).

## Estructura del proyecto

```
├── .cursorrules              # Reglas globales para el editor (Cursor y compatibles)
├── SKILL.md                  # Orquestador principal de la Skill (frontmatter + flujo de 4 fases)
├── README.md                 # Este archivo
├── rules/                    # Conocimiento puro en Markdown, una fase = un archivo
│   ├── 01-principios-ux.md          # ISO 9241-210, heurísticas NN/g, WCAG 2.2 AA, User Flows, Dual-Track Agile
│   ├── 02-reglas-ui-vistas.md       # Empty/loading states, formularios, data tables, drawers vs. modals
│   ├── 03-tendencias-2026.md        # Dark mode, dashboards, brutalismo/arquitectura invisible, motion, glassmorphism...
│   └── 04-frontend-tailwind.md      # Tokens, spacing, arquitectura React, anatomía de componente, Atomic Design, performance
├── astro.config.mjs          # Config del sitio estático (Astro + Tailwind)
├── package.json
├── src/                      # Sitio Astro que renderiza SKILL.md y rules/ como portal navegable
│   ├── layouts/Base.astro
│   ├── pages/index.astro
│   ├── pages/skill.astro
│   └── pages/rules/[slug].astro
└── .github/workflows/deploy.yml   # CI/CD: build + deploy automático a GitHub Pages en cada push a main
```

## Cómo funciona la Skill

`SKILL.md` define un flujo obligatorio de 4 fases para cualquier tarea de diseño o construcción de interfaz:

| Fase | Objetivo | Archivo de reglas |
|---|---|---|
| 1. Diagnóstico | Entender al usuario y el contexto antes de diseñar | `rules/01-principios-ux.md` |
| 2. Layout y jerarquía | Estructurar la vista antes de vestirla | `rules/02-reglas-ui-vistas.md` |
| 3. Patrones y tendencias | Aplicar el lenguaje visual actual | `rules/03-tendencias-2026.md` |
| 4. Código frontend | Implementar en Tailwind/React de forma limpia | `rules/04-frontend-tailwind.md` |

Cualquier IA con acceso a este repositorio (como skill instalada, o simplemente con el repo abierto en el editor) debe leer `SKILL.md` primero y seguir sus fases en orden, consultando el archivo de `rules/` correspondiente en cada una. Cada archivo de reglas incluye tablas de especificación y checklists de auditoría verificables — no son sugerencias de estilo.

## Estado

Base de conocimiento completa: `SKILL.md` y las 4 reglas de `rules/` están redactadas, revisadas y enriquecidas con secciones adicionales. El sitio Astro que las publica como portal navegable está montado y compila correctamente.

## Desarrollo local

```bash
npm install
npm run dev
```

## Despliegue

El workflow `.github/workflows/deploy.yml` construye y publica el sitio en GitHub Pages automáticamente en cada push a `main`. Requiere que en el repositorio de GitHub esté activado **Settings → Pages → Source: GitHub Actions**.

## Uso en distintos entornos

- **Claude**: instala este repositorio como Skill para que se active automáticamente ante peticiones de diseño/UI/UX.
- **Cursor**: `.cursorrules` referencia el mismo flujo para mantener coherencia entre editor y asistente.
- **Otras IAs (Antigravity, etc.)**: apunta al contenido de `SKILL.md` y `rules/` como contexto de sistema o conocimiento del proyecto.
