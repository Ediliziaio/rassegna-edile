#!/usr/bin/env node
/**
 * Notifica gli URL del sito a IndexNow (Bing, Yandex, Seznam, Naver).
 * Non riguarda Google, che non aderisce al protocollo, ma:
 *  - Bing indicizza in ore anziché settimane
 *  - Bing alimenta ChatGPT Search e Copilot → rilevante per il GEO
 * Uso:  node scripts/indexnow.mjs
 */
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = (process.env.SITE_URL || "https://www.rassegnaedile.it").replace(/\/$/, "");
const host = new URL(SITE).host;

const key = readdirSync(join(root, "public"))
  .find((f) => /^[0-9a-f]{32}\.txt$/.test(f))
  ?.replace(/\.txt$/, "");
if (!key) {
  console.error("Chiave IndexNow assente in public/. Interrotto.");
  process.exit(1);
}

const urlList = readFileSync(join(root, "public/sitemap.xml"), "utf8")
  .match(/<loc>([^<]+)<\/loc>/g)
  .map((m) => m.replace(/<\/?loc>/g, ""));

const body = {
  host,
  key,
  keyLocation: `${SITE}/${key}.txt`,
  urlList,
};

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});

console.log(`IndexNow → HTTP ${res.status} ${res.statusText} · ${urlList.length} URL inviati`);
if (res.status !== 200 && res.status !== 202) console.error(await res.text());
