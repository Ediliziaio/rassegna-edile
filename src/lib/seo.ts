import { useEffect } from "react";
import { SITE } from "@/data/categories";

export interface SeoInput {
  title: string;
  description: string;
  canonical: string; // path assoluto tipo /efficienza-energetica/slug/
  ogType?: "website" | "article";
  image?: string;
  publishedAt?: string;
  updatedAt?: string;
  jsonLd?: object[];
  noindex?: boolean;
}

interface MetaTag {
  attr: "name" | "property";
  key: string;
  content: string;
}

interface ResolvedSeo {
  title: string;
  canonicalHref: string;
  metas: MetaTag[];
  jsonLd: object[];
}

const DEFAULT_OG_IMAGE = `${SITE.url}/og-cover.png`;

/**
 * Risolve un SeoInput nella lista completa di tag <title>/<meta>/<link>
 * e blocchi JSON-LD. È la singola fonte di verità usata sia dal client
 * (useSeo → upsert nel DOM) sia dal prerender SSG (renderHeadToString).
 */
export function computeSeo({
  title,
  description,
  canonical,
  ogType = "website",
  image,
  publishedAt,
  updatedAt,
  jsonLd = [],
  noindex = false,
}: SeoInput): ResolvedSeo {
  const canonicalHref = SITE.url + canonical;
  const ogImage = image ?? DEFAULT_OG_IMAGE;
  const metas: MetaTag[] = [
    { attr: "name", key: "description", content: description },
    {
      attr: "name",
      key: "robots",
      content: noindex
        ? "noindex, follow"
        : "index, follow, max-image-preview:large, max-snippet:-1",
    },
    { attr: "property", key: "og:type", content: ogType },
    { attr: "property", key: "og:title", content: title },
    { attr: "property", key: "og:description", content: description },
    { attr: "property", key: "og:url", content: canonicalHref },
    { attr: "property", key: "og:site_name", content: SITE.name },
    { attr: "property", key: "og:locale", content: "it_IT" },
    { attr: "property", key: "og:image", content: ogImage },
    { attr: "name", key: "twitter:card", content: "summary_large_image" },
    { attr: "name", key: "twitter:title", content: title },
    { attr: "name", key: "twitter:description", content: description },
    { attr: "name", key: "twitter:image", content: ogImage },
  ];
  if (ogType === "article") {
    if (publishedAt)
      metas.push({
        attr: "property",
        key: "article:published_time",
        content: publishedAt,
      });
    if (updatedAt)
      metas.push({
        attr: "property",
        key: "article:modified_time",
        content: updatedAt,
      });
  }
  return { title, canonicalHref, metas, jsonLd };
}

/* ============================================================
 * Raccolta lato server (prerender SSG)
 * ============================================================ */

let activeSink: SeoInput[] | null = null;

export function beginServerCollect(sink: SeoInput[]) {
  activeSink = sink;
}

export function endServerCollect() {
  activeSink = null;
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const escapeJsonLd = (s: string) => s.replace(/</g, "\\u003c");

/** Serializza <title>, meta, canonical e JSON-LD in stringa per l'HTML statico. */
export function renderHeadToString(input: SeoInput): string {
  const { title, canonicalHref, metas, jsonLd } = computeSeo(input);
  const parts = [
    `<title>${escapeHtml(title)}</title>`,
    `<link rel="canonical" href="${escapeHtml(canonicalHref)}" />`,
    ...metas.map(
      (m) =>
        `<meta ${m.attr}="${m.key}" content="${escapeHtml(m.content)}" />`
    ),
    ...jsonLd.map(
      (block) =>
        `<script type="application/ld+json" class="${JSONLD_CLASS}">${escapeJsonLd(
          JSON.stringify(block)
        )}</script>`
    ),
  ];
  return parts.join("\n    ");
}

/* ============================================================
 * Applicazione lato client
 * ============================================================ */

function upsertMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const JSONLD_CLASS = "seo-jsonld-route";

export function useSeo(input: SeoInput) {
  // Fase di render lato server: registra l'input per il prerender SSG.
  if (activeSink) activeSink.push(input);

  const { title, canonicalHref, metas, jsonLd } = computeSeo(input);

  useEffect(() => {
    document.title = title;
    upsertCanonical(canonicalHref);
    for (const m of metas) upsertMeta(m.attr, m.key, m.content);

    // JSON-LD per-route: rimuovi i blocchi precedenti e inietta i nuovi
    document
      .querySelectorAll(`script.${JSONLD_CLASS}`)
      .forEach((n) => n.remove());
    for (const block of jsonLd) {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.className = JSONLD_CLASS;
      s.textContent = JSON.stringify(block);
      document.head.appendChild(s);
    }

    window.scrollTo(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, canonicalHref, JSON.stringify(metas), JSON.stringify(jsonLd)]);
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: SITE.url + it.path,
    })),
  };
}
