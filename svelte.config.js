import adapter from '@sveltejs/adapter-auto';
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
		alias: {
			$models: './src/models',
			$components: './src/components',
			$lib: './src/lib',
			$services: './src/services',
			$tests: './src/tests',
		},
		env: {
			publicPrefix: 'PUBLIC_'
		}
	},
};

export default config;
