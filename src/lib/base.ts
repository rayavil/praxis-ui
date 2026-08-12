// Astro no garantiza que import.meta.env.BASE_URL traiga slash final
// (en este proyecto, en build de producción resuelve a "/praxis-ui" sin "/").
// Normalizamos aquí una sola vez para que toda concatenación de rutas sea segura.
export const BASE = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;
