# Rassegna Edile

Testata giornalistica online verticale sull'edilizia italiana: ristrutturazioni, serramenti e infissi, efficienza energetica, materiali, impianti, incentivi, tecnologie e normative.

Sito editoriale ad alta densità di contenuti costruito attorno a **indicizzazione, SEO tecnica, velocità, mobile, AEO e GEO**.

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- React Router (preview locale con HashRouter; in produzione BrowserRouter + prerendering/SSG)

## Contenuti e SEO

- **8 silos tematici** con URL parlanti `/categoria/slug-articolo/`
- **35 articoli** (9.900–19.200 caratteri di corpo), di cui 3 pillar con struttura a sitelink
- Answer box AEO, TOC con ancore, FAQ con markup, tabelle comparative
- JSON-LD: `Organization`, `WebSite`+`SearchAction`, `NewsArticle`, `BreadcrumbList`, `FAQPage`, `ProfilePage`
- `public/sitemap.xml` (con estensione news), `robots.txt` (crawler AI consentiti), `llms.txt`, `feed.xml` (RSS)
- Immagini hero WebP next-gen con lazy-load e dimensioni esplicite (CLS = 0)
- Slot pubblicitari a dimensioni riservate (compatibili AdSense/Ad Manager)

Documento di progetto completo: [PROGETTO.md](PROGETTO.md)

## Sviluppo

```bash
npm install
npm run dev          # dev server
node scripts/generate-seo.mjs   # rigenera sitemap.xml, llms.txt, feed.xml dai contenuti
npm run build        # build di produzione in dist/
```

## Struttura contenuti

Gli articoli sono file JSON in `src/data/articles/` (uno per silo). Ogni articolo dichiara: slug, categoria, title/metaTitle/metaDescription, keyword primaria, answer box, autore, date, sezioni con H2/H3, tabelle, FAQ, correlati e tag.
