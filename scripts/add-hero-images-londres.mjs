// Adiciona heroImage no frontmatter das matérias de Londres, distribuindo
// as imagens de forma variada (combinando por tema quando possível).
// Rode com: node scripts/add-hero-images-londres.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = join(process.cwd(), 'src/content/blog');
const IMG = '../../assets/hero/londres';

const map = {
	// Harry Potter
	'estudio-harry-potter-como-visitar.md': 'hogwarts-castelo.jpg',
	'londres-para-fas-de-harry-potter.md': 'hogwarts-castelo.jpg',
	// London Eye / vistas
	'london-eye-vale-a-pena.md': 'london-eye-noite.jpg',
	'melhores-vistas-de-londres.md': 'skyline-londres-por-do-sol.jpg',
	'londres-com-criancas.md': 'london-eye-noite.jpg',
	// Ônibus / transporte
	'onibus-turistico-em-londres.md': 'onibus-vermelho-ilustracao.jpg',
	'oyster-contactless-ou-travelcard.md': 'onibus-vermelho-ilustracao.jpg',
	'transporte-publico-em-londres.md': 'big-ben-noite-transito.jpg',
	'internet-em-londres-esim.md': 'onibus-vermelho-ilustracao.jpg',
	// Torre de Londres / Tower Bridge / mercados / passeios
	'torre-de-londres-guia-de-visita.md': 'tower-bridge-por-do-sol.jpg',
	'melhores-passeios-em-londres.md': 'tower-bridge-por-do-sol.jpg',
	'mercados-de-londres.md': 'tower-bridge-por-do-sol.jpg',
	'atracoes-gratuitas-em-londres.md': 'tower-bridge-por-do-sol.jpg',
	'london-pass-vale-a-pena.md': 'tower-bridge-por-do-sol.jpg',
	'londres-romantico.md': 'tower-bridge-por-do-sol.jpg',
	// Noite / inverno / réveillon
	'o-que-fazer-a-noite-em-londres.md': 'big-ben-noite-transito.jpg',
	'londres-no-inverno.md': 'big-ben-noite-transito.jpg',
	'reveillon-em-londres.md': 'big-ben-noite-transito.jpg',
	'londres-no-natal.md': 'big-ben-outono.jpg',
	// Roteiros principais
	'roteiro-londres-3-dias.md': 'cabine-telefonica-big-ben.jpeg',
	'roteiro-londres-5-dias.md': 'big-ben-hora-azul.jpg',
	'roteiro-londres-7-dias.md': 'big-ben-outono.jpg',
	'primeira-vez-em-londres.md': 'cabine-telefonica-big-ben.jpeg',
	'londres-em-1-dia.md': 'big-ben-hora-azul.jpg',
	'londres-fim-de-semana.md': 'big-ben-outono.jpg',
	'londres-economico.md': 'cabine-telefonica-big-ben.jpeg',
	'londres-ou-paris.md': 'big-ben-hora-azul.jpg',
	'o-que-fazer-em-londres.md': 'skyline-londres-por-do-sol.jpg',
	// Hospedagem
	'onde-se-hospedar-em-londres.md': 'big-ben-outono.jpg',
	'hospedagem-barata-em-londres.md': 'cabine-telefonica-big-ben.jpeg',
	// Gastronomia
	'onde-comer-em-londres.md': 'cabine-telefonica-big-ben.jpeg',
	'pubs-historicos-de-londres.md': 'onibus-vermelho-ilustracao.jpg',
	// Bate-voltas
	'bate-voltas-saindo-de-londres.md': 'big-ben-parlamento.avif',
	'stonehenge-saindo-de-londres.md': 'tamisa-por-do-sol.avif',
	'windsor-saindo-de-londres.md': 'big-ben-parlamento.avif',
	'bath-saindo-de-londres.md': 'tamisa-por-do-sol.avif',
	'oxford-ou-cambridge-bate-volta.md': 'big-ben-parlamento.avif',
	// Compras / futebol / museus / parques
	'compras-em-londres.md': 'skyline-londres-por-do-sol.jpg',
	'futebol-em-londres-estadios.md': 'skyline-londres-por-do-sol.jpg',
	'melhores-museus-de-londres.md': 'big-ben-hora-azul.jpg',
	'parques-de-londres.md': 'big-ben-outono.jpg',
	'palacio-de-buckingham-visita.md': 'cabine-telefonica-big-ben.jpeg',
	// Custos / economia / documentos
	'como-economizar-em-londres.md': 'cabine-telefonica-big-ben.jpeg',
	'quanto-custa-viajar-para-londres.md': 'skyline-londres-por-do-sol.jpg',
	'visto-reino-unido-para-brasileiros.md': 'big-ben-hora-azul.jpg',
	'seguro-viagem-reino-unido.md': 'big-ben-parlamento.avif',
	'melhor-epoca-para-visitar-londres.md': 'big-ben-outono.jpg',
	'o-que-levar-na-mala-para-londres.md': 'cabine-telefonica-big-ben.jpeg',
	// Aeroportos
	'heathrow-ao-centro-de-londres.md': 'skyline-londres-por-do-sol.jpg',
	'gatwick-ao-centro-de-londres.md': 'tamisa-por-do-sol.avif',
};

let updated = 0;
let skipped = [];

for (const [file, img] of Object.entries(map)) {
	const path = join(DIR, file);
	let content;
	try {
		content = readFileSync(path, 'utf8');
	} catch {
		skipped.push(file + ' (não encontrado)');
		continue;
	}
	if (/^heroImage:/m.test(content)) {
		skipped.push(file + ' (já tinha heroImage)');
		continue;
	}
	const line = `heroImage: '${IMG}/${img}'\n`;
	// Insere logo após a linha "author:" (presente em todos os posts).
	if (/^author:.*$/m.test(content)) {
		content = content.replace(/^(author:.*)$/m, `$1\n${line.trimEnd()}`);
	} else {
		// fallback: insere antes do fechamento do frontmatter
		content = content.replace(/^---\n/, (m) => m); // no-op, garante existência
		content = content.replace(/\n---\n/, `\n${line}---\n`);
	}
	writeFileSync(path, content);
	updated++;
}

console.log(`Atualizados: ${updated}`);
if (skipped.length) {
	console.log('Pulados:');
	skipped.forEach((s) => console.log(' -', s));
}
