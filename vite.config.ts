/// <reference types="vitest" />

import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		host: true,
		watch: {
			ignored: ['**/coverage/**'],
		},
	},
	test: {
		environment: 'jsdom',
		include: ['tests/{unit,integration}/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
		coverage: {
			provider: 'istanbul',
			reporter: ['text', 'html', 'lcov'],
		},
	},
};

export default config;
