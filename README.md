# Rota Certeira

Portal sobre **viajar melhor com escolhas certeiras**: destinos, equipamentos, conectividade, finanças e IA para viagem. Feito com [Astro](https://astro.build) e conteúdo em Markdown.

## Stack

- **Astro** (site estático, foco em SEO e velocidade)
- **Conteúdo em Markdown** em `src/content/blog/` (um `.md` por artigo)
- **Deploy:** Cloudflare Pages (build automático a cada push na `main`)
- Fontes auto-hospedadas: Fraunces (títulos) + Inter (corpo)

## Pilares (topic clusters)

`destinos` · `equipamentos` · `conectividade` · `financas` · `ia` — definidos em `src/consts.ts`. Cada pilar tem uma página em `/{pilar}` que lista seus artigos.

## Comandos

| Comando           | Ação                                        |
| :---------------- | :------------------------------------------ |
| `npm install`     | Instala dependências                        |
| `npm run dev`     | Servidor local em `localhost:4321`          |
| `npm run build`   | Build de produção em `./dist/`              |
| `npm run preview` | Pré-visualiza o build local                 |

## Como um artigo funciona

Cada artigo é um Markdown com frontmatter validado por `src/content.config.ts`:

```yaml
title: 'Título SEO / H1'
description: 'Meta description'
pubDate: '2026-07-22'
pillar: 'destinos' # destinos | equipamentos | conectividade | financas | ia
cluster: 'Roteiros Europa'
keyword: 'roteiro londres 5 dias'
draft: false # o pipeline gera true; o portão de revisão vira false para publicar
```

Os textos são produzidos pela skill **rota-certeira-copywriter**, que já entrega esse formato com placeholders `[AFILIADO: ...]`, `[LINK INTERNO: ...]` e `[VERIFICAR: ...]`.

## Afiliados

`src/data/afiliados.json` mapeia cada placeholder de afiliado para o link real (cadastro uma vez, vale em todos os artigos). Redes ativas: GetYourGuide, Seguros Promo, Mercado Livre, Shopee.
