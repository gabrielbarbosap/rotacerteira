// Extrai pares pergunta/resposta da seção "## Perguntas frequentes" do
// markdown fonte de um post, para alimentar o schema.org FAQPage (JSON-LD).
// Depende da convenção da skill de copywriter: "**Pergunta?**\nResposta.".

function stripMarkdown(text: string): string {
	return text
		.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
		.replace(/\*\*(.+?)\*\*/g, '$1')
		.replace(/\*(.+?)\*/g, '$1')
		.replace(/\s+/g, ' ')
		.trim();
}

export interface FaqItem {
	question: string;
	answer: string;
}

export function extractFaq(body: string): FaqItem[] {
	const afterHeading = body.split(/^## Perguntas frequentes\s*$/m)[1];
	if (!afterHeading) return [];
	const section = afterHeading.split(/^## /m)[0];

	const matches = [...section.matchAll(/\*\*(.+?)\*\*\n([\s\S]+?)(?=\n\*\*|\s*$)/g)];
	return matches
		.map((m) => ({
			question: stripMarkdown(m[1]),
			answer: stripMarkdown(m[2]),
		}))
		.filter((item) => item.question && item.answer);
}
