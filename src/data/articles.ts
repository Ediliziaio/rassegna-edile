import type { Article } from "./types";

const modules = import.meta.glob<{ default: Article[] }>("./articles/*.json", {
  eager: true,
});

const all: Article[] = Object.values(modules).flatMap((m) => m.default);

// Ordina per data di pubblicazione (più recenti prima)
export const articles: Article[] = all.sort(
  (a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt)
);

export const articleByPath = (category: string, slug: string) =>
  articles.find((a) => a.category === category && a.slug === slug);

export const articlesByCategory = (category: string) =>
  articles.filter((a) => a.category === category);

export const articleUrl = (a: Article) => `/${a.category}/${a.slug}/`;

export const readingTime = (a: Article) => {
  const words =
    (a.sections ?? [])
      .flatMap((s) => [
        ...(s.paragraphs ?? []),
        ...(s.list ?? []),
        ...(s.subsections ?? []).flatMap((x) => x.paragraphs),
      ])
      .join(" ")
      .split(/\s+/).length +
    (a.faq ?? []).map((f) => f.q + " " + f.a).join(" ").split(/\s+/).length;
  return Math.max(3, Math.round(words / 200));
};

export const relatedArticles = (a: Article): Article[] => {
  const bySlug = new Map(articles.map((x) => [x.slug, x]));
  const explicit = (a.related ?? [])
    .map((s) => bySlug.get(s))
    .filter((x): x is Article => !!x);
  const sameSilo = articles.filter(
    (x) => x.category === a.category && x.slug !== a.slug && !explicit.includes(x)
  );
  return [...explicit, ...sameSilo].slice(0, 4);
};
