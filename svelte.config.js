import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';
import { optimizeImports } from 'carbon-preprocess-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [vitePreprocess(), optimizeImports()],

  kit: {
    adapter: adapter(),
    serviceWorker: {
      register: false
    },
    csrf: {
      // checkOrigin: process.env.NODE_ENV==='development'?false:true
      checkOrigin: false
    },
    paths: {
      base: process.env.PUBLIC_BASE_PATH || ''
    },
    alias: {
      $models: './src/models',
      $components: './src/components',
      $lib: './src/lib',
      $services: './src/services',
      $tests: './tests'
    },
    env: {
      publicPrefix: 'PUBLIC_'
    }
  }
};

export default config;
