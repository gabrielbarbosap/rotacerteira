// Dados globais do site. Importe de qualquer lugar com `import`.

export const SITE_TITLE = 'Rota Certeira';
export const SITE_DESCRIPTION =
	'Viaje melhor com escolhas certeiras: roteiros, equipamentos, conectividade, finanças e IA para a sua viagem.';

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
