import { defineConfig } from 'histoire';
import { HstSvelte } from '@histoire/plugin-svelte';

export default defineConfig({
  setupFile: '/src/histoire.setup.ts',
  theme: {
    title: 'Marina',
    logo: {
      square: './static/favicon.png',
      light: './static/favicon.png',
      dark: './static/favicon.png'
    },
    logoHref: '/',
    favicon: './static/favicon.png'
  },
  plugins: [HstSvelte()]
});
