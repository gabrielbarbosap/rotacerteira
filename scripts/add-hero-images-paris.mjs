// Adiciona heroImage no frontmatter das matérias de Paris, distribuindo
// as imagens de forma variada (combinando por tema quando possível).
// Rode com: node scripts/add-hero-images-paris.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const DIR = join(process.cwd(), 'src/content/blog');
const IMG = '../../assets/hero/paris';

const map = {
	'roteiro-paris-3-dias.md': 'eiffel-noite-lua.jpg',
	'roteiro-paris-5-dias.md': 'versalhes-palacio-aereo.jpg',
	'roteiro-paris-7-dias.md': 'arco-triunfo-noite-epoca.jpg',
	'primeira-vez-em-paris.md': 'paris-terraco-outono.jpg',
	'o-que-fazer-em-paris.md': 'paris-aereo-outono-sena.jpg',
	'torre-eiffel-como-visitar.md': 'eiffel-por-do-sol-trocadero.jpg',
	'museu-do-louvre-como-visitar.md': 'eiffel-noite-preto-branco.jpg',
	'palacio-de-versalhes-bate-volta.md': 'versalhes-salao-espelhos.jpg',
	'cruzeiros-no-sena-paris.md': 'eiffel-sena-dia-barcos.jpg',
	'disneyland-paris-guia.md': 'paris-avif-1.avif',
	'moulin-rouge-e-a-noite-em-paris.md': 'arco-triunfo-noite-transito.jpg',
	'onde-se-hospedar-em-paris.md': 'paris-aereo-outono-sena.jpg',
	'aeroporto-ao-centro-de-paris.md': 'paris-avif-2.avif',
	'quanto-custa-viajar-para-paris.md': 'versalhes-jardins-aereo.webp',
	'futebol-em-paris.md': 'arco-triunfo-noite-epoca.jpg',
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
	if (/^author:.*$/m.test(content)) {
		content = content.replace(/^(author:.*)$/m, `$1\n${line.trimEnd()}`);
	} else {
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
