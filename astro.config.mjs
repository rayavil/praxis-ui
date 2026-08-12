import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://rayavil.github.io',
  // Debe coincidir exactamente con el nombre del repositorio en GitHub,
  // para que las rutas internas a las reglas no se rompan bajo la subruta del Pages.
  base: '/praxis-ui',
  integrations: [tailwind()],
});
