#!/usr/bin/env node
/**
 * Prerender SSG: per ogni rotta pubblica genera un index.html statico con
 * body (#root) e <head> per-pagina già renderizzati, così crawler e bot AI
 * ricevono HTML completo al primo fetch. Eseguire dopo:
 *   vite build            (client → dist/)
 *   vite build --ssr ...  (server → dist-server/)
 */
import {
  readFileSync,
  writeFileSync,
  readdirSync,
  mkdirSync,
  rmSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(root, "dist");
const serverEntry = join(root, "dist-server", "entry-server.js");
const articlesDir = join(root, "src/data/articles");

const categorySlugs = [
  "ristrutturazioni",
  "serramenti-infissi",
  "efficienza-energetica",
  "materiali-costruzione",
  "impianti",
  "incentivi-bonus",
  "tecnologie-innovazione",
  "normative",
];

const staticPages = [
  "chi-siamo",
  "redazione",
  "contatti",
  "pubblicita",
  "privacy",
  "cookie-policy",
  "mappa-del-sito",
  "cerca",
  "prezzi",
];


const articles = readdirSync(articlesDir)
  .filter((f) => f.endsWith(".json"))
  .flatMap((f) => JSON.parse(readFileSync(join(articlesDir, f), "utf8")));


const routes = [
  "/",
  ...categorySlugs.map((s) => `/${s}/`),
  ...articles.map((a) => `/${a.category}/${a.slug}/`),
  ...staticPages.map((p) => `/${p}/`),
];

const template = readFileSync(join(distDir, "index.html"), "utf8");
const { render } = await import(pathToFileURL(serverEntry).href);

function emit(route, html, head) {
  const page = template
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", html);
  const rel = route === "/" ? "index.html" : join(route.replace(/^\/|\/$/g, ""), "index.html");
  const outPath = join(distDir, rel);
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, page);
}

let ok = 0;
const errors = [];
for (const route of routes) {
  try {
    const { html, head } = render(route);
    emit(route, html, head);
    ok++;
  } catch (err) {
    errors.push(`${route}: ${err.message}`);
  }
}

// 404 reale: Vercel serve dist/404.html con status 404 sulle rotte inesistenti
try {
  const { html, head } = render("/__not_found__/");
  const page = template
    .replace("<!--app-head-->", head)
    .replace("<!--app-html-->", html);
  writeFileSync(join(distDir, "404.html"), page);
} catch (err) {
  errors.push(`404: ${err.message}`);
}

// Pulizia bundle SSR intermedio
rmSync(join(root, "dist-server"), { recursive: true, force: true });

console.log(`Prerender OK: ${ok}/${routes.length} rotte + 404.html`);
if (errors.length) {
  console.error(`Prerender errori (${errors.length}):\n  ` + errors.join("\n  "));
  process.exit(1);
}
