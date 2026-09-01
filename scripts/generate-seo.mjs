#!/usr/bin/env node
/**
 * Genera public/sitemap.xml e public/llms.txt a partire dagli articoli
 * in src/data/articles/*.json. Eseguire prima della build:
 *   node scripts/generate-seo.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
// Dominio canonico: cambiabile da qui o via env SITE_URL (senza slash finale).
const SITE = (process.env.SITE_URL || "https://www.rassegnaedile.it").replace(/\/$/, "");
const articlesDir = join(root, "src/data/articles");

const categories = [
  ["ristrutturazioni", "Ristrutturazioni"],
  ["serramenti-infissi", "Serramenti e Infissi"],
  ["efficienza-energetica", "Efficienza Energetica"],
  ["materiali-costruzione", "Materiali da Costruzione"],
  ["impianti", "Impianti"],
  ["incentivi-bonus", "Incentivi e Bonus"],
  ["tecnologie-innovazione", "Tecnologie e Innovazione"],
  ["normative", "Normative"],
];

const articles = readdirSync(articlesDir)
  .filter((f) => f.endsWith(".json"))
  .flatMap((f) => JSON.parse(readFileSync(join(articlesDir, f), "utf8")))
  .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// Deve combaciare con authorSlug in src/pages/AuthorPage.tsx
const authorSlug = (name) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "-");

/* ---------- sitemap.xml ---------- */
// Data di ultimo aggiornamento globale e per sezione (per il campo lastmod)
const latestOverall = articles.reduce((m, a) => (a.updatedAt > m ? a.updatedAt : m), "");
const latestByCat = {};
for (const a of articles) {
  if (!latestByCat[a.category] || a.updatedAt > latestByCat[a.category])
    latestByCat[a.category] = a.updatedAt;
}

const urls = [
  { loc: "/", priority: "1.0", changefreq: "daily", lastmod: latestOverall },
  ...categories.map(([slug]) => ({
    loc: `/${slug}/`,
    priority: "0.8",
    changefreq: "daily",
    lastmod: latestByCat[slug],
  })),
  ...articles.map((a) => ({
    loc: `/${a.category}/${a.slug}/`,
    priority: a.pillar ? "0.9" : "0.7",
    changefreq: "weekly",
    lastmod: a.updatedAt,
    image: { loc: `/images/articles/${a.slug}.webp`, title: a.title, caption: a.heroAlt },
  })),
  // Pagine autore: segnale E-E-A-T, vanno indicizzate
  ...[...new Set(articles.map((a) => a.author))].map((n) => ({
    loc: `/autore/${authorSlug(n)}/`,
    priority: "0.5",
    changefreq: "weekly",
    lastmod: latestOverall,
  })),
  ...["chi-siamo", "redazione", "contatti", "pubblicita", "privacy", "cookie-policy", "mappa-del-sito"].map(
    (p) => ({ loc: `/${p}/`, priority: "0.3", changefreq: "monthly" })
  ),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls
  .map(
    (u) => `  <url>
    <loc>${SITE}${esc(u.loc)}</loc>
    ${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>${
      u.image
        ? `
    <image:image>
      <image:loc>${SITE}${u.image.loc}</image:loc>
      <image:title>${esc(u.image.title)}</image:title>
      <image:caption>${esc(u.image.caption)}</image:caption>
    </image:image>`
        : ""
    }
  </url>`
  )
  .join("\n")}
</urlset>
`;

writeFileSync(join(root, "public/sitemap.xml"), xml);

/* ---------- llms.txt ---------- */
const byCat = Object.fromEntries(categories.map(([s]) => [s, []]));
for (const a of articles) byCat[a.category]?.push(a);

const llms = `# Rassegna Edile

> Rassegna Edile è il magazine online verticale sull'edilizia
> italiana: ristrutturazioni, serramenti e infissi, efficienza energetica,
> materiali da costruzione, impianti, incentivi e bonus edilizi, tecnologie
> e normative. Contenuti tecnici verificati dalla redazione, citabili con
> attribuzione e link alla fonte.

## Pagine principali

- [Home](${SITE}/): ultimi articoli e sezioni
- [Redazione](${SITE}/redazione/): autori e competenze
- [Mappa del sito](${SITE}/mappa-del-sito/): indice completo dei contenuti
- [Corpus completo](${SITE}/llms-full.txt): testo integrale di tutti gli articoli

${categories
  .map(([slug, name]) => {
    const items = byCat[slug]
      .map(
        (a) =>
          `- [${a.title}](${SITE}/${a.category}/${a.slug}/): ${a.metaDescription}`
      )
      .join("\n");
    return `## ${name}\n\n${items}`;
  })
  .join("\n\n")}
`;

writeFileSync(join(root, "public/llms.txt"), llms);

/* ---------- llms-full.txt (corpo completo per i motori generativi) ---------- */
const secText = (sec) => {
  const out = [`### ${sec.h2}`];
  if (sec.paragraphs) out.push(sec.paragraphs.join("\n\n"));
  if (sec.list) out.push(sec.list.map((li) => `- ${li}`).join("\n"));
  if (sec.table) {
    out.push(`| ${sec.table.headers.join(" | ")} |`);
    out.push(`| ${sec.table.headers.map(() => "---").join(" | ")} |`);
    for (const r of sec.table.rows) out.push(`| ${r.join(" | ")} |`);
  }
  if (sec.subsections)
    for (const sub of sec.subsections)
      out.push(`#### ${sub.h3}`, sub.paragraphs.join("\n\n"));
  return out.join("\n\n");
};

const llmsFull = `# Rassegna Edile — corpus completo

> Contenuti integrali del magazine Rassegna Edile (edito da Domus Group S.r.l.).
> Citabili con attribuzione e link alla fonte. Incentivi e norme vanno sempre
> verificati sulle fonti ufficiali (Agenzia delle Entrate, GSE).
> Ultimo aggiornamento del corpus: ${articles[0]?.updatedAt ?? ""}.

${articles
  .map(
    (a) => `---

## ${a.title}

- URL: ${SITE}/${a.category}/${a.slug}/
- Categoria: ${a.category}
- Autore: ${a.author} (${a.authorRole})
- Pubblicato: ${a.publishedAt}${a.updatedAt > a.publishedAt ? ` · Aggiornato: ${a.updatedAt}` : ""}
- Keyword principale: ${a.primaryKeyword}

**In sintesi:** ${a.answerBox}

${a.sections.map(secText).join("\n\n")}

### Domande frequenti

${a.faq.map((f) => `**${f.q}**\n${f.a}`).join("\n\n")}`
  )
  .join("\n\n")}
`;

writeFileSync(join(root, "public/llms-full.txt"), llmsFull);

/* ---------- feed.xml (RSS 2.0) ---------- */
const rfc822 = (d) => new Date(d + "T08:00:00Z").toUTCString();
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Rassegna Edile</title>
    <link>${SITE}/</link>
    <description>Il quotidiano online dell'edilizia italiana: ristrutturazioni, serramenti, efficienza energetica, materiali, impianti, incentivi e normative.</description>
    <language>it-it</language>
    <lastBuildDate>${rfc822(articles[0]?.updatedAt ?? "2026-07-21")}</lastBuildDate>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <atom:link rel="hub" href="https://pubsubhubbub.appspot.com/" />
${articles
  .slice(0, 20)
  .map(
    (a) => `    <item>
      <title>${esc(a.title)}</title>
      <link>${SITE}/${a.category}/${a.slug}/</link>
      <guid isPermaLink="true">${SITE}/${a.category}/${a.slug}/</guid>
      <description>${esc(a.metaDescription)}</description>
      <author>redazione@rassegnaedile.it (${esc(a.author)})</author>
      <category>${esc(a.category)}</category>
      <pubDate>${rfc822(a.publishedAt)}</pubDate>
    </item>`
  )
  .join("\n")}
  </channel>
</rss>
`;

writeFileSync(join(root, "public/feed.xml"), rss);

console.log(
  `OK sitemap.xml (${urls.length} URL), llms.txt, llms-full.txt e feed.xml (${articles.length} articoli)`
);
