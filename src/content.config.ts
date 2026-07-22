import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Schema canônico do artigo. É o "contrato" entre a skill de copywriter
// (que gera o Markdown) e o site. Manter em sincronia com o modelo da skill.
const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			// title = título SEO / H1; description = meta description.
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			// Assinatura da matéria.
			author: z.string().default('Gabriel Barbosa'),
			// Pilar (topic cluster) a que o artigo pertence.
			pillar: z.enum(['destinos', 'equipamentos', 'conectividade', 'financas', 'ia']),
			// Nome do cluster específico (ex: "Roteiros Europa").
			cluster: z.string(),
			// Cidade dos passeios (ex: "londres"): injeta a lista curada de
			// passeios + o widget da GetYourGuide (ver src/data/passeios.json).
			tourCity: z.string().optional(),
			// Palavra-chave alvo de busca.
			keyword: z.string().optional(),
			// Rascunho: o pipeline entrega draft=true; o portão de revisão
			// vira false para publicar. Em produção, drafts não são gerados.
			draft: z.boolean().default(false),
		}),
});

export const collections = { blog };
