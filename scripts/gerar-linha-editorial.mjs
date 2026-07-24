// Gera a linha editorial mestra: 20 destinos × ~20 arquétipos de post.
// Rode com: node scripts/gerar-linha-editorial.mjs
// Saída: src/data/linha-editorial.json
import { writeFileSync } from 'node:fs';

const slug = (s) =>
	s
		.toLowerCase()
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/(^-|-$)/g, '');

// ---- Os 20 destinos (Europa → internacional → Nordeste) ----
const DESTINOS = [
	// Europa
	{ nome: 'Paris', regiao: 'Europa', pais: 'França', tipo: 'internacional' },
	{ nome: 'Roma', regiao: 'Europa', pais: 'Itália', tipo: 'internacional' },
	{ nome: 'Lisboa', regiao: 'Europa', pais: 'Portugal', tipo: 'internacional' },
	{ nome: 'Barcelona', regiao: 'Europa', pais: 'Espanha', tipo: 'internacional' },
	{ nome: 'Amsterdã', regiao: 'Europa', pais: 'Holanda', tipo: 'internacional' },
	{ nome: 'Madri', regiao: 'Europa', pais: 'Espanha', tipo: 'internacional' },
	{ nome: 'Praga', regiao: 'Europa', pais: 'República Tcheca', tipo: 'internacional' },
	// Outras internacionais
	{ nome: 'Nova York', regiao: 'América do Norte', pais: 'Estados Unidos', tipo: 'internacional' },
	{ nome: 'Orlando', regiao: 'América do Norte', pais: 'Estados Unidos', tipo: 'internacional' },
	{ nome: 'Buenos Aires', regiao: 'América do Sul', pais: 'Argentina', tipo: 'internacional' },
	{ nome: 'Santiago', regiao: 'América do Sul', pais: 'Chile', tipo: 'internacional' },
	// Brasil — Nordeste
	{ nome: 'Fernando de Noronha', regiao: 'Nordeste', pais: 'Brasil', tipo: 'nacional' },
	{ nome: 'Maceió', regiao: 'Nordeste', pais: 'Brasil', tipo: 'nacional' },
	{ nome: 'Porto de Galinhas', regiao: 'Nordeste', pais: 'Brasil', tipo: 'nacional' },
	{ nome: 'Jericoacoara', regiao: 'Nordeste', pais: 'Brasil', tipo: 'nacional' },
	{ nome: 'Praia da Pipa', regiao: 'Nordeste', pais: 'Brasil', tipo: 'nacional' },
	{ nome: 'Salvador', regiao: 'Nordeste', pais: 'Brasil', tipo: 'nacional' },
	{ nome: 'Fortaleza', regiao: 'Nordeste', pais: 'Brasil', tipo: 'nacional' },
	{ nome: 'Lençóis Maranhenses', regiao: 'Nordeste', pais: 'Brasil', tipo: 'nacional' },
	{ nome: 'Chapada Diamantina', regiao: 'Nordeste', pais: 'Brasil', tipo: 'nacional' },
];

// ---- Arquétipos para destino INTERNACIONAL (cidade) ----
const TPL_INT = [
	['Roteiros', (d) => `roteiro-${d}-3-dias`, (n) => `Roteiro de ${n} em 3 dias`, 'roteiro', 'destinos'],
	['Roteiros', (d) => `roteiro-${d}-5-dias`, (n) => `Roteiro de ${n} em 5 dias`, 'roteiro', 'destinos'],
	['Roteiros', (d) => `roteiro-${d}-7-dias`, (n) => `Roteiro de ${n} em 7 dias`, 'roteiro', 'destinos'],
	['Roteiros', (d) => `primeira-vez-em-${d}`, (n) => `Primeira vez em ${n}: guia completo`, 'guia', 'destinos'],
	['Roteiros', (d) => `${d}-com-criancas`, (n) => `${n} com crianças: roteiro e atrações`, 'roteiro', 'destinos'],
	['Roteiros', (d) => `${d}-a-dois`, (n) => `${n} a dois: roteiro romântico`, 'roteiro', 'destinos'],
	['O que fazer', (d) => `o-que-fazer-em-${d}`, (n) => `O que fazer em ${n}: atrações imperdíveis`, 'lista', 'destinos'],
	['O que fazer', (d) => `pontos-turisticos-de-${d}`, (n) => `Principais pontos turísticos de ${n}`, 'lista', 'destinos'],
	['O que fazer', (d) => `atracoes-gratuitas-em-${d}`, (n) => `Atrações gratuitas em ${n}`, 'lista', 'destinos'],
	['O que fazer', (d) => `${d}-a-noite`, (n) => `O que fazer à noite em ${n}`, 'lista', 'destinos'],
	['Passeios', (d) => `melhores-passeios-em-${d}`, (n) => `Os melhores passeios em ${n}`, 'lista', 'destinos'],
	['Passeios', (d) => `bate-voltas-saindo-de-${d}`, (n) => `Bate-voltas saindo de ${n}`, 'lista', 'destinos'],
	['Logística', (d) => `aeroporto-ao-centro-de-${d}`, (n) => `Do aeroporto ao centro de ${n}: como ir`, 'guia', 'destinos'],
	['Logística', (d) => `transporte-publico-em-${d}`, (n) => `Transporte público em ${n}: guia`, 'guia', 'destinos'],
	['Hospedagem', (d) => `onde-se-hospedar-em-${d}`, (n) => `Onde se hospedar em ${n}: melhores bairros`, 'guia', 'destinos'],
	['Gastronomia', (d) => `onde-comer-em-${d}`, (n) => `Onde comer em ${n}`, 'lista', 'destinos'],
	['Antes de viajar', (d) => `melhor-epoca-para-visitar-${d}`, (n) => `Melhor época para visitar ${n}`, 'guia', 'destinos'],
	['Antes de viajar', (d) => `o-que-levar-na-mala-para-${d}`, (n) => `O que levar na mala para ${n}`, 'lista', 'equipamentos'],
	['Antes de viajar', (d) => `internet-em-${d}-esim`, (n) => `Internet em ${n}: eSIM e chip`, 'guia', 'conectividade'],
	['Finanças', (d) => `quanto-custa-viajar-para-${d}`, (n) => `Quanto custa viajar para ${n}`, 'guia', 'financas'],
	['Finanças', (d) => `como-economizar-em-${d}`, (n) => `Como economizar em ${n}`, 'lista', 'financas'],
	['Finanças', (d) => `seguro-viagem-${d}`, (n) => `Seguro viagem para ${n}: vale a pena?`, 'guia', 'financas'],
];

// ---- Arquétipos para destino NACIONAL (Nordeste) ----
const TPL_NAC = [
	['Antes de viajar', (d) => `melhor-epoca-para-ir-a-${d}`, (n) => `Melhor época para ir a ${n}`, 'guia', 'destinos'],
	['Logística', (d) => `como-chegar-em-${d}`, (n) => `Como chegar em ${n}`, 'guia', 'destinos'],
	['Logística', (d) => `aluguel-de-carro-em-${d}`, (n) => `Aluguel de carro e locomoção em ${n}`, 'guia', 'destinos'],
	['Hospedagem', (d) => `onde-se-hospedar-em-${d}`, (n) => `Onde se hospedar em ${n}`, 'guia', 'destinos'],
	['Hospedagem', (d) => `melhores-pousadas-em-${d}`, (n) => `As melhores pousadas em ${n}`, 'lista', 'destinos'],
	['Roteiros', (d) => `roteiro-${d}-4-dias`, (n) => `Roteiro de ${n} em 4 dias`, 'roteiro', 'destinos'],
	['Roteiros', (d) => `roteiro-${d}-7-dias`, (n) => `Roteiro de ${n} em 7 dias`, 'roteiro', 'destinos'],
	['Roteiros', (d) => `primeira-vez-em-${d}`, (n) => `Primeira vez em ${n}: dicas essenciais`, 'guia', 'destinos'],
	['Roteiros', (d) => `${d}-com-criancas`, (n) => `${n} com crianças: o que fazer`, 'roteiro', 'destinos'],
	['Roteiros', (d) => `${d}-lua-de-mel`, (n) => `${n} para lua de mel`, 'roteiro', 'destinos'],
	['O que fazer', (d) => `o-que-fazer-em-${d}`, (n) => `O que fazer em ${n}`, 'lista', 'destinos'],
	['O que fazer', (d) => `melhores-praias-de-${d}`, (n) => `As melhores praias de ${n}`, 'lista', 'destinos'],
	['O que fazer', (d) => `vida-noturna-em-${d}`, (n) => `Vida noturna em ${n}`, 'lista', 'destinos'],
	['Passeios', (d) => `melhores-passeios-em-${d}`, (n) => `Os melhores passeios em ${n}`, 'lista', 'destinos'],
	['Passeios', (d) => `arredores-de-${d}`, (n) => `O que visitar nos arredores de ${n}`, 'lista', 'destinos'],
	['Gastronomia', (d) => `onde-comer-em-${d}`, (n) => `Onde comer em ${n}`, 'lista', 'destinos'],
	['Sazonal', (d) => `${d}-no-verao-e-reveillon`, (n) => `${n} no verão e no réveillon`, 'guia', 'destinos'],
	['Antes de viajar', (d) => `o-que-levar-na-mala-para-${d}`, (n) => `O que levar na mala para ${n}`, 'lista', 'equipamentos'],
	['Finanças', (d) => `quanto-custa-viajar-para-${d}`, (n) => `Quanto custa viajar para ${n}`, 'guia', 'financas'],
	['Finanças', (d) => `como-economizar-em-${d}`, (n) => `Como economizar em ${n}`, 'lista', 'financas'],
	['Finanças', (d) => `seguro-viagem-para-${d}`, (n) => `Seguro viagem para ${n}: vale a pena?`, 'guia', 'financas'],
];

// ---- Afiliados por arquétipo (só redes ativas + marcações de futuras) ----
function afiliados(postSlug, grupo) {
	if (/seguro-viagem|quanto-custa|economizar/.test(postSlug)) return ['Seguros Promo'];
	if (/onde-se-hospedar|pousadas/.test(postSlug)) return ['Booking (futuro)'];
	if (/aluguel-de-carro/.test(postSlug)) return ['Rentcars (futuro)'];
	if (/o-que-levar-na-mala/.test(postSlug)) return ['Mercado Livre', 'Shopee'];
	if (/internet-em-.*-esim/.test(postSlug)) return ['Shopee'];
	if (['O que fazer', 'Passeios', 'Roteiros'].includes(grupo)) return ['GetYourGuide'];
	return [];
}

// ---- Geração ----
const destinos = DESTINOS.map((dest) => {
	const d = slug(dest.nome);
	const tpl = dest.tipo === 'internacional' ? TPL_INT : TPL_NAC;
	const posts = tpl.map(([grupo, slugFn, titFn, tipo, pillar]) => {
		const s = slugFn(d);
		return {
			slug: s,
			titulo: titFn(dest.nome),
			grupo,
			tipo,
			pillar,
			cluster: `${grupo} ${dest.nome}`,
			keyword: titFn(dest.nome).toLowerCase().split(':')[0].trim(),
			tourCity: dest.tipo === 'internacional' ? d : undefined,
			afiliados: afiliados(s, grupo),
			status: 'fila',
		};
	});
	return {
		slug: d,
		nome: dest.nome,
		regiao: dest.regiao,
		pais: dest.pais,
		tipo: dest.tipo,
		template: dest.tipo === 'internacional' ? 'cidade-internacional' : 'destino-nacional',
		posts_previstos: posts.length,
		posts,
	};
});

const total = destinos.reduce((acc, x) => acc + x.posts.length, 0);

const out = {
	_doc:
		'Linha editorial mestra. 20 destinos (Europa → internacional → Nordeste), cada um com um conjunto de arquétipos de post gerados por scripts/gerar-linha-editorial.mjs. Cada post vira uma matéria da skill rota-certeira-copywriter (mesmo fluxo da fila de Londres). Regenerar: node scripts/gerar-linha-editorial.mjs. Londres é o piloto já publicado (ver fila-editorial.json).',
	atualizado: '2026-07-24',
	resumo: {
		destinos: destinos.length,
		posts_por_destino_min: Math.min(...destinos.map((d) => d.posts.length)),
		total_posts: total,
	},
	destinos,
};

writeFileSync(
	new URL('../src/data/linha-editorial.json', import.meta.url),
	JSON.stringify(out, null, '\t') + '\n',
);

console.log(`Destinos: ${destinos.length}`);
console.log(`Total de posts: ${total}`);
console.log(`Mínimo por destino: ${out.resumo.posts_por_destino_min}`);
console.log('Por região:');
const porReg = {};
destinos.forEach((d) => (porReg[d.regiao] = (porReg[d.regiao] || 0) + 1));
console.log(JSON.stringify(porReg));
