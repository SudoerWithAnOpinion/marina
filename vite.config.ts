/// <reference types="vitest" />

import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { optimizeCss } from 'carbon-preprocess-svelte';
import { nodeLoaderPlugin } from '@vavite/node-loader/plugin';

const config: UserConfig = {
  plugins: [
    sveltekit(),
    nodeLoaderPlugin(),
    process.env.NODE_ENV === 'production' && optimizeCss()
  ],
  server: {
    host: true,
    strictPort: true,
    watch: {
      ignored: ['**/coverage/**']
    }
  },
  test: {
    environment: 'jsdom',
    include: ['tests/{unit,integration}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    setupFiles: ['./tests/unit/setup.ts'],
    coverage: {
      enabled: true,
      provider: 'c8',
      reporter: ['text', 'html', 'lcov']
    }
  }
};

export default config;
