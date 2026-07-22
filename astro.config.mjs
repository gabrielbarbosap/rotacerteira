// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://rotacerteira.com.br',
	integrations: [mdx(), sitemap()],
	fonts: [
		{
			// Títulos e logo: serifada editorial (passa confiança).
			provider: fontProviders.google(),
			name: 'Fraunces',
			cssVariable: '--font-heading',
			fallbacks: ['Georgia', 'serif'],
			weights: [400, 600, 700],
			styles: ['normal'],
			subsets: ['latin'],
		},
		{
			// Corpo: sans limpa, ótima leitura no celular.
			provider: fontProviders.google(),
			name: 'Inter',
			cssVariable: '--font-body',
			fallbacks: ['system-ui', 'sans-serif'],
			weights: [400, 500, 600, 700],
			styles: ['normal'],
			subsets: ['latin'],
		},
	],
});
