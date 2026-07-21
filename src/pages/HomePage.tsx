import { Link } from "react-router-dom";
import { articles, articlesByCategory, articleUrl } from "@/data/articles";
import { categories, SITE } from "@/data/categories";
import ArticleCard, { formatDate } from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";
import { useSeo, breadcrumbJsonLd } from "@/lib/seo";

export default function HomePage() {
  const [hero, ...rest] = articles;
  const secondary = rest.slice(0, 4);
  const mostRead = [...articles]
    .sort((a, b) => +(b.pillar ?? false) - +(a.pillar ?? false))
    .slice(0, 5);
  const latest = rest.slice(4, 10);

  useSeo({
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    canonical: "/",
    jsonLd: [
      breadcrumbJsonLd([{ name: "Home", path: "/" }]),
      {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: SITE.name,
        description: SITE.description,
        url: SITE.url + "/",
        isPartOf: { "@id": SITE.url + "/#website" },
      },
    ],
  });

  return (
    <div className="mx-auto max-w-7xl px-4">
      {/* ===== APERTURA: hero + secondari ===== */}
      <div className="grid gap-8 border-b border-border py-8 lg:grid-cols-[2fr_1fr]">
        {hero && <ArticleCard article={hero} variant="hero" priority />}
        <aside aria-label="In primo piano" className="border-t border-border pt-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="font-sans mb-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-primary">
            In primo piano
          </p>
          {secondary.map((a) => (
            <article key={a.slug} className="border-b border-border py-3 last:border-0">
              <Link to={articleUrl(a)} className="group">
                <h3 className="font-display text-[1.05rem] font-bold leading-snug group-hover:text-accent">
                  {a.title}
                </h3>
              </Link>
              <p className="font-sans mt-1 text-[0.68rem] uppercase tracking-wide text-muted-foreground">
                {a.author} · {formatDate(a.publishedAt)}
              </p>
            </article>
          ))}
        </aside>
      </div>

      {/* ===== Ultimi articoli + sidebar più letti ===== */}
      <div className="grid gap-10 py-10 lg:grid-cols-[2fr_1fr]">
        <section aria-labelledby="ultimi">
          <h2
            id="ultimi"
            className="font-display border-b-2 border-primary pb-2 text-2xl font-black text-primary"
          >
            Ultime notizie
          </h2>
          <div className="mt-2">
            {latest.map((a, i) => (
              <div key={a.slug}>
                <ArticleCard article={a} variant="compact" />
                {i === 2 && (
                  <AdSlot id="infeed-home-1" format="infeed" className="my-5" />
                )}
              </div>
            ))}
          </div>
        </section>

        <aside aria-labelledby="piu-letti" className="lg:sticky lg:top-6 lg:self-start">
          <h2
            id="piu-letti"
            className="font-display border-b-2 border-accent pb-2 text-xl font-black text-primary"
          >
            I più letti
          </h2>
          <ol className="mt-2">
            {mostRead.map((a, i) => (
              <li key={a.slug} className="flex gap-3 border-b border-border py-3 last:border-0">
                <span className="font-display text-3xl font-black leading-none text-accent/60">
                  {i + 1}
                </span>
                <Link
                  to={articleUrl(a)}
                  className="font-display text-[0.95rem] font-bold leading-snug hover:text-accent"
                >
                  {a.title}
                </Link>
              </li>
            ))}
          </ol>
          <AdSlot id="rect-home-sidebar" format="rectangle" className="mx-auto mt-6" />
        </aside>
      </div>

      {/* ===== Blocchi per silo ===== */}
      {categories.map((c, ci) => {
        const items = articlesByCategory(c.slug);
        if (items.length === 0) return null;
        const [first, ...others] = items;
        return (
          <section
            key={c.slug}
            aria-labelledby={`cat-${c.slug}`}
            className="border-t-2 border-primary py-10"
          >
            <div className="mb-6 flex items-baseline justify-between">
              <h2
                id={`cat-${c.slug}`}
                className="font-display text-2xl font-black text-primary"
              >
                {c.name}
              </h2>
              <Link
                to={`/${c.slug}/`}
                className="font-sans text-[0.75rem] font-semibold uppercase tracking-wide text-accent hover:underline"
              >
                Vai alla sezione →
              </Link>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <ArticleCard article={first} />
              {others.slice(0, 3).map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
            {ci === 1 && <AdSlot id="infeed-home-2" format="infeed" className="mt-8" />}
          </section>
        );
      })}
    </div>
  );
}
