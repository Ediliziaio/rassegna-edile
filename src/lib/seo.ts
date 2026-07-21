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

export function useSeo({
  title,
  description,
  canonical,
  ogType = "website",
  image,
  publishedAt,
  updatedAt,
  jsonLd = [],
  noindex = false,
}: SeoInput) {
  useEffect(() => {
    const url = SITE.url + canonical;
    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta(
      "name",
      "robots",
      noindex
        ? "noindex, follow"
        : "index, follow, max-image-preview:large, max-snippet:-1"
    );
    upsertCanonical(url);

    upsertMeta("property", "og:type", ogType);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:site_name", SITE.name);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    if (image) {
      upsertMeta("property", "og:image", image);
      upsertMeta("name", "twitter:image", image);
    }
    if (ogType === "article") {
      if (publishedAt)
        upsertMeta("property", "article:published_time", publishedAt);
      if (updatedAt) upsertMeta("property", "article:modified_time", updatedAt);
    }

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
  }, [title, description, canonical, ogType, image, publishedAt, updatedAt, noindex, JSON.stringify(jsonLd)]);
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
