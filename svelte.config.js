import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter(),
		serviceWorker: {
			register: false
		},
		paths: {
			base: process.env.PUBLIC_BASE_PATH || '',
		},
		alias: {
			$models: './src/models',
			$components: './src/components',
			$services: './src/services',
			$tests: './tests',
		},
		env: {
			publicPrefix: 'PUBLIC_'
		}
	},
};

export default config;
