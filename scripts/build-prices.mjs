#!/usr/bin/env node
/**
 * Estrae i dati economici già presenti nelle tabelle degli articoli e li
 * aggrega in src/data/prices.generated.ts.
 *
 * Nessun dato viene inventato: ogni voce conserva l'articolo di origine, così
 * la pagina Osservatorio è una vista sui contenuti della testata, verificabile
 * risalendo alla fonte.
 */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dir = join(root, "src/data/articles");

const articles = readdirSync(dir)
  .filter((f) => f.endsWith(".json"))
  .flatMap((f) => JSON.parse(readFileSync(join(dir, f), "utf8")));

const PRICE_HEADER = /prezz|cost|spesa|€|euro|incentiv|detra/i;
// "4.500 - 6.000 €", "8.000-14.000 euro", "70-95", "80 €"
const RANGE = /(\d[\d.]*(?:,\d+)?)\s*(?:-|–|a)\s*(\d[\d.]*(?:,\d+)?)/;
const SINGLE = /(\d[\d.]*(?:,\d+)?)/;

const num = (s) => parseFloat(s.replace(/\./g, "").replace(",", "."));

/** Unità di misura desunta dall'intestazione o dalla cella. */
function unit(header, cell) {
  const t = `${header} ${cell}`.toLowerCase();
  if (/€\/kwp|euro\/kwp/.test(t)) return "€/kWp";
  if (/\/mq|al metro quadro|euro\/mq|€\/mq/.test(t)) return "€/mq";
  if (/\/ml|\/m\b|al metro lineare|euro\/m\b/.test(t)) return "€/ml";
  if (/\/anno|annu/.test(t)) return "€/anno";
  if (/%/.test(cell)) return "%";
  return "€";
}

const rows = [];
for (const a of articles) {
  for (const s of a.sections) {
    if (!s.table) continue;
    const idx = s.table.headers.findIndex((h) => PRICE_HEADER.test(h));
    if (idx <= 0) continue; // serve anche una prima colonna descrittiva
    const header = s.table.headers[idx];
    for (const r of s.table.rows) {
      const label = (r[0] || "").trim();
      const cell = (r[idx] || "").trim();
      if (!label || !cell || !/\d/.test(cell)) continue;
      if (/^n\.?d\.?$/i.test(cell)) continue;
      const m = cell.match(RANGE);
      let min, max;
      if (m) {
        min = num(m[1]);
        max = num(m[2]);
      } else {
        const one = cell.match(SINGLE);
        if (!one) continue;
        min = max = num(one[1]);
      }
      if (!isFinite(min) || !isFinite(max) || max < min) continue;
      if (max < 1) continue; // scarta valori non economici (es. conducibilità)
      // scarta i valori percentuali: sono variazioni relative, non prezzi
      if (/%/.test(cell)) continue;
      rows.push({
        voce: label,
        contesto: s.h2,
        min,
        max,
        unita: unit(header, cell),
        categoria: a.category,
        fonteSlug: a.slug,
        fonteTitolo: a.title,
        colonna: header,
      });
    }
  }
}

// deduplica voci identiche provenienti dallo stesso articolo
const seen = new Set();
const unique = rows.filter((r) => {
  const k = `${r.fonteSlug}|${r.voce}|${r.min}|${r.max}|${r.unita}`;
  if (seen.has(k)) return false;
  seen.add(k);
  return true;
});

const out = `// GENERATO da scripts/build-prices.mjs — non modificare a mano.
// Ogni voce è estratta dalle tabelle degli articoli e conserva la fonte.
export interface PriceRow {
  voce: string;
  contesto: string;
  min: number;
  max: number;
  unita: string;
  categoria: string;
  fonteSlug: string;
  fonteTitolo: string;
  colonna: string;
}

export const priceRows: PriceRow[] = ${JSON.stringify(unique, null, 2)};
`;

writeFileSync(join(root, "src/data/prices.generated.ts"), out);
console.log(
  `Osservatorio prezzi: ${unique.length} voci da ${new Set(unique.map((r) => r.fonteSlug)).size} articoli`
);
