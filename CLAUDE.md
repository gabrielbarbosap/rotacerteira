# Rota Certeira — contexto do projeto

Portal de conteúdo (viagem + tech) construído em **Astro** com artigos em Markdown. Objetivo: SEO/velocidade máximos e uma fábrica de conteúdo automatizada. Marca: "viajar melhor com escolhas certeiras".

## Estrutura

- `src/content/blog/*.md` — artigos (schema em `src/content.config.ts`).
- `src/consts.ts` — título do site e os 5 pilares (topic clusters).
- `src/pages/[pillar].astro` — páginas de cluster (`/destinos`, etc.).
- `src/data/afiliados.json` — mapa de placeholders de afiliado → links reais.
- `src/styles/global.css` — tema da marca (navy + âmbar, tokens `--rc-*`, modo claro/escuro).

## Identidade

Direção "Rota Confiável": navy `#0F2A43`, azul-link `#1E5A8A`, âmbar-CTA `#F2A93B`, papel `#F7F5F0`. Títulos em Fraunces, corpo em Inter (auto-hospedadas via `astro.config.mjs`). CTA de afiliado usa a classe `.btn-afiliado`.

## Conteúdo

Artigos vêm da skill **rota-certeira-copywriter** (voz "você", 800-1500 palavras, placeholders `[AFILIADO:]` / `[LINK INTERNO:]` / `[VERIFICAR:]`). Redes de afiliado ativas: GetYourGuide, Seguros Promo, Mercado Livre, Shopee. `draft: true` = não publica em produção (portão de revisão vira `false`).

## Comandos

`npm run dev` (localhost:4321) · `npm run build` · `npm run preview`.
