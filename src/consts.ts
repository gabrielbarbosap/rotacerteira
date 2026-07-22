// Dados globais do site. Importe de qualquer lugar com `import`.

export const SITE_TITLE = 'Rota Certeira';
export const SITE_DESCRIPTION =
	'Viaje melhor com escolhas certeiras: roteiros, equipamentos, conectividade, finanças e IA para a sua viagem.';

// Os cinco pilares (topic clusters) do portal.
export const PILLARS = [
	{ slug: 'destinos', label: 'Destinos' },
	{ slug: 'equipamentos', label: 'Equipamentos' },
	{ slug: 'conectividade', label: 'Conectividade' },
	{ slug: 'financas', label: 'Finanças' },
	{ slug: 'ia', label: 'IA para Viajar' },
] as const;

export type PillarSlug = (typeof PILLARS)[number]['slug'];
