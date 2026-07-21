# Rassegna Edile — Documento di progetto
## Architettura, SEO tecnica, piano editoriale e strategia sitelink

Testata giornalistica online verticale sull'edilizia. Concetto guida: sito leggero, editoriale, costruito attorno a indicizzazione, SEO tecnica, velocità, mobile, AEO e GEO. Sintesi dei riferimenti: autorevolezza tipografica di Forbes + densità "a quotidiano" del Corriere + verticalità e snellezza di GuidaFinestra.

---

## 1. Mappa del sito / architettura a silos

URL parlanti, brevi, gerarchia a due livelli: `/categoria/slug-articolo/`.

```
/                                    Home (hub principale, H1 brand)
├── /ristrutturazioni/               Silo Ristrutturazioni (4 articoli)
├── /serramenti-infissi/             Silo Serramenti e Infissi (4 articoli)
├── /efficienza-energetica/          Silo Efficienza Energetica (7 articoli — cluster fotovoltaico)
├── /materiali-costruzione/          Silo Materiali da Costruzione (4 articoli)
├── /impianti/                       Silo Impianti (4 articoli)
├── /incentivi-bonus/                Silo Incentivi e Bonus (4 articoli)
├── /tecnologie-innovazione/         Silo Tecnologie e Innovazione (4 articoli)
├── /normative/                      Silo Normative (4 articoli)
├── /autore/<nome>/                  Pagine autore (E-E-A-T, JSON-LD ProfilePage)
├── /cerca/                          Ricerca interna (noindex)
├── /chi-siamo/ · /redazione/ · /contatti/ · /pubblicita/
├── /privacy/ · /cookie-policy/
└── /mappa-del-sito/                 Sitemap HTML per gli utenti
```

File di indicizzazione: `/sitemap.xml` (51 URL, con sezione `news:` per gli articoli), `/robots.txt`, `/llms.txt`, `/feed.xml` (RSS 2.0 con gli ultimi 20 articoli, dichiarato via `<link rel="alternate">`).

**Internal linking**: ogni articolo dichiara 3–4 correlati (3 dello stesso silo + 1 cross-silo), i pillar rimandano ai cluster e viceversa; breadcrumb visibile + `BreadcrumbList` su ogni pagina; footer con mappa completa delle sezioni. Il crawler raggiunge qualsiasi articolo in ≤ 3 click dalla home.

---

## 2. Piano editoriale — 35 articoli, keyword primarie, struttura pillar/cluster

### Silo Efficienza Energetica (cluster fotovoltaico con strategia sitelink)
| # | Slug | Keyword primaria | Ruolo |
|---|---|---|---|
| 1 | pannelli-solari-fotovoltaico-guida-completa | pannelli solari fotovoltaico | **PILLAR** (10 sezioni ancorate = sitelink potenziali) |
| 2 | pannelli-solari-costi-prezzi | costo pannelli solari | cluster |
| 3 | come-funzionano-pannelli-solari | come funzionano i pannelli solari | cluster |
| 4 | manutenzione-pannelli-solari | manutenzione pannelli solari | cluster |
| 5 | migliori-marche-pannelli-solari | migliori pannelli solari | cluster |
| 6 | pompa-di-calore-guida-completa | pompa di calore | standalone-guide |
| 7 | cappotto-termico-esterno-guida | cappotto termico | standalone-guide |

### Silo Incentivi e Bonus
| # | Slug | Keyword primaria | Ruolo |
|---|---|---|---|
| 8 | bonus-edilizi-2026-guida-completa | bonus edilizi 2026 | **PILLAR** (10 sezioni) |
| 9 | incentivi-fotovoltaico-2026 | incentivi fotovoltaico | cluster (cross-link al pillar fotovoltaico) |
| 10 | conto-termico-3-come-funziona | conto termico 3.0 | cluster |
| 11 | detrazione-ristrutturazioni-50-come-funziona | detrazione ristrutturazioni 50% | cluster |

### Silo Ristrutturazioni
| # | Slug | Keyword primaria | Ruolo |
|---|---|---|---|
| 12 | ristrutturazione-chiavi-in-mano-guida | ristrutturazione chiavi in mano | **PILLAR** |
| 13 | ristrutturare-bagno-costi-tempi | ristrutturare bagno costi | cluster |
| 14 | ristrutturare-cucina-guida | ristrutturare cucina | cluster |
| 15 | ristrutturare-casa-da-dove-iniziare | ristrutturare casa da dove iniziare | cluster |

### Silo Serramenti e Infissi
16. `serramenti-pvc-alluminio-legno-confronto` — serramenti pvc alluminio o legno · 17. `finestre-triplo-vetro-conviene` — triplo vetro conviene · 18. `sostituzione-infissi-costi-guida` — sostituzione infissi costi · 19. `zanzariere-guida-scelta` — zanzariere

### Silo Materiali da Costruzione
20. `cemento-sostenibile-materiali-innovativi` — cemento sostenibile · 21. `blocchi-termoisolanti-laterizi-guida` — blocchi termoisolanti · 22. `migliori-isolanti-termici-confronto` — migliori isolanti termici · 23. `legno-lamellare-costruzioni-guida` — legno lamellare

### Silo Impianti
24. `rifacimento-impianto-idraulico-costi` — rifacimento impianto idraulico costi · 25. `impianto-elettrico-a-norma-cei-64-8` — impianto elettrico a norma · 26. `domotica-casa-intelligente-guida` — domotica casa · 27. `ventilazione-meccanica-controllata-guida` — ventilazione meccanica controllata

### Silo Tecnologie e Innovazione
28. `bim-edilizia-guida` — BIM edilizia · 29. `intelligenza-artificiale-cantieri-edili` — intelligenza artificiale edilizia · 30. `case-prefabbricate-prezzi-guida` — case prefabbricate prezzi · 31. `stampa-3d-edilizia-case` — stampa 3D edilizia

### Silo Normative
32. `cila-scia-permesso-costruire-differenze` — CILA SCIA permesso di costruire differenze · 33. `sicurezza-cantiere-dlgs-81-guida` — sicurezza cantiere · 34. `direttiva-case-green-cosa-cambia` — direttiva case green · 35. `salva-casa-sanatoria-edilizia` — salva casa sanatoria

**Metriche contenuti verificate automaticamente**: tutti gli articoli tra 9.900 e 19.200 caratteri di corpo (media ≈ 12.900; pillar ≥ 18.000); answer box 35–70 parole; metaTitle ≤ 60; metaDescription ≤ 155; slug univoci; id sezione univoci; tutti i link interni risolvibili.

---

## 3. Template pagina articolo (SEO/GEO/AEO)

Ordine degli elementi nel template (`src/pages/ArticlePage.tsx`):

1. **Breadcrumb** visibile + JSON-LD `BreadcrumbList`
2. Kicker categoria → **H1 unico** = titolo articolo
3. **Box "Risposta rapida"** (40–60 parole auto-conclusive) subito sotto l'H1 — target featured snippet, AI Overview e risposte dei motori generativi
4. Byline E-E-A-T: autore con ruolo professionale, data pubblicazione **e** data aggiornamento, tempo di lettura
5. Share button solo-link (zero script esterni)
6. Immagine hero con alt descrittivo + caption, aspect-ratio fisso (nessun CLS), prioritaria per la LCP
7. **TOC "In questo articolo"** con ancore → sitelink e jump-link in SERP
8. Sezioni H2 (2–3 formulate come domande reali), paragrafi, liste, **tabelle comparative** (snippet da tabella), H3 gerarchici
9. Slot rettangolo 300×250 tra le sezioni con spazio riservato (CLS = 0)
10. **Box FAQ** (4–6 domande) con JSON-LD `FAQPage`
11. Author box con rimando alla pagina redazione
12. Articoli correlati (pillar↔cluster) in sidebar
13. JSON-LD per pagina: `NewsArticle` + `FAQPage` + `BreadcrumbList`; nel documento `Organization` + `WebSite` con `SearchAction`

## 4. Home page

Hero (apertura) + 4 articoli "In primo piano" → Ultime notizie + sidebar "I più letti" (i pillar emergono) → un blocco per silo con gli ultimi 4 articoli → slot in-feed nativi tra i blocchi. H1 unico sulla testata, H2 sui blocchi.

## 5. Specifiche SEO tecniche

| Ambito | Implementazione |
|---|---|
| Title / meta description | Unici per pagina, ≤60 / ≤155 caratteri, keyword davanti (verificati via script) |
| Canonical | `<link rel="canonical">` su ogni pagina |
| Robots meta | `index, follow, max-image-preview:large, max-snippet:-1`; `noindex` sulla 404 |
| Structured data | `Organization`, `WebSite`+`SearchAction`, `NewsArticle`, `BreadcrumbList`, `FAQPage`, `CollectionPage` (home/sezioni) |
| Open Graph / Twitter | OG completo + `summary_large_image`; `article:published_time` / `article:modified_time` sugli articoli |
| Sitemap XML | 51 URL, priorità 0.9 ai pillar, `lastmod` = data aggiornamento, estensione `news:` per gli articoli |
| robots.txt | Allow globale + 11 crawler AI espliciti (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, CCBot, anthropic-ai, Meta-ExternalAgent) |
| llms.txt | Indice in Markdown di testata, pagine principali e tutti i 35 articoli con descrizione — pensato per i motori generativi |
| Heading | 1 solo H1 per pagina; H2/H3 ordinati e semantici |
| Alt tag | Obbligatorio nel data model (`heroAlt` con keyword) |

**Nota produzione**: in deploy usare prerendering/SSG (es. vite-plugin-prerender) o SSR al posto del router client-side della preview, mantenendo gli stessi URL, in modo che crawler e AI-bot ricevano HTML completo al primo fetch.

## 6. Velocità, mobile, pubblicità

- CSS critico via Tailwind (bundle ~14 kB gzip), JS ~88 kB gzip, font con `display=swap` e preconnect
- Immagini hero **fotografiche WebP next-gen** (1600×900, 64–166 KB per silo, generate e ottimizzate): `width`/`height` espliciti + aspect-ratio → **CLS = 0**; `loading="lazy"` e `decoding="async"` ovunque tranne la LCP, che usa `fetchpriority="high"`; ogni immagine ha alt descrittivo con keyword (`heroAlt` nel data model) e funge da `og:image` dell'articolo
- Layout mobile-first: menu hamburger, touch target ≥ 44 px, nessun overflow, tabelle con scroll orizzontale
- Slot pubblicitari: leaderboard 728×90 in testata (solo desktop), 300×250 sidebar e in-article, in-feed in home, con **dimensioni riservate** prima del caricamento degli script adv — compatibili AdSense/Ad Manager
- Condivisioni solo-link: nessuno script di terze parti bloccante

## 7. GEO / AEO

- **AEO**: answer box 40–60 parole in apertura, H2 a domanda, FAQ con schema, tabelle e liste (formati preferiti dagli snippet)
- **GEO**: crawler AI consentiti, `llms.txt`, frasi auto-conclusive citabili, dati strutturati, autori con ruolo professionale dichiarato (E-E-A-T), schema markup ricco
- **Prudenza fattuale**: incentivi e norme 2026 citati con cornice stabile e formule cautelative, rimandando sempre alle fonti ufficiali (Agenzia delle Entrate, GSE)
