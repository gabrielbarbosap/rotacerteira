// Dados globais do site. Importe de qualquer lugar com `import`.

export const SITE_TITLE = 'Rota Certeira';
export const SITE_DESCRIPTION =
	'Viaje melhor com escolhas certeiras: roteiros, equipamentos, conectividade, finanças e IA para a sua viagem.';

// Google Analytics 4 — carregado só em produção (ver BaseHead.astro),
// para não poluir os dados com acessos do ambiente de desenvolvimento.
export const GA_MEASUREMENT_ID = 'G-RQX9Q4LX66';

// Pilares (topic clusters) com conteúdo publicado — controla o menu, o
// rodapé e as páginas /{pilar}. "IA para Viajar" fica de fora até ter
// pelo menos 1 matéria publicada (ver pillar 'ia' em content.config.ts).
export const PILLARS = [
	{ slug: 'destinos', label: 'Destinos' },
	{ slug: 'equipamentos', label: 'Equipamentos' },
	{ slug: 'conectividade', label: 'Conectividade' },
	{ slug: 'financas', label: 'Finanças' },
] as const;

export type PillarSlug = (typeof PILLARS)[number]['slug'];

// Destinos com conteúdo publicado — alimenta os filtros em /destinos e as
// páginas /destinos/{slug} (ver [destino].astro e o campo `destino` em
// content.config.ts).
export const DESTINATIONS = [
	{ slug: 'londres', label: 'Londres' },
	{ slug: 'paris', label: 'Paris' },
] as const;

export type DestinationSlug = (typeof DESTINATIONS)[number]['slug'];
