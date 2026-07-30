// Backfill do campo `destino` no frontmatter dos posts do pilar "destinos",
// usado para os filtros de /destinos/[destino]. Idempotente: pula arquivos
// que já têm `destino:`.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const dir = join(import.meta.dirname, '..', 'src', 'content', 'blog');

// Exclusões: posts do pilar "destinos" que não pertencem a um destino único
// (institucional ou conteúdo pan-europeu genérico).
const skip = new Set(['bem-vindo-a-rota-certeira.md', 'quanto-custa-viajar-para-a-europa.md']);

let changed = 0;
for (const file of readdirSync(dir)) {
	if (!file.endsWith('.md') || skip.has(file)) continue;
	const path = join(dir, file);
	const content = readFileSync(path, 'utf-8');
	if (!content.includes("pillar: 'destinos'") || content.includes('destino:')) continue;

	const hasLondres = file.includes('londres');
	const hasParis = file.includes('paris');
	if (!hasLondres && !hasParis) continue;

	const destinos = [hasLondres && 'londres', hasParis && 'paris'].filter(Boolean);
	const destinoLine = `destino: [${destinos.map((d) => `'${d}'`).join(', ')}]`;

	const updated = content.replace(/^(cluster: .*)$/m, `$1\n${destinoLine}`);
	if (updated === content) {
		console.warn(`AVISO: não achei linha "cluster:" em ${file}`);
		continue;
	}
	writeFileSync(path, updated);
	changed++;
	console.log(`${file} -> ${destinoLine}`);
}
console.log(`\nTotal atualizado: ${changed}`);
