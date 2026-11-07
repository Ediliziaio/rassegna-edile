import { Link } from "react-router-dom";
import { articles, articlesByCategory, articleUrl } from "@/data/articles";
import { categories, SITE } from "@/data/categories";
import ArticleCard from "@/components/ArticleCard";
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
      {/* The homepage shipped without an H1: Google had no heading stating what
          this site is about, on its most important page. Visually hidden so the
          existing layout is untouched. */}
      <h1 className="sr-only">
        Rassegna Edile: prezzi, costi e guide tecniche per l'edilizia italiana
      </h1>
      <section id="percorsi-tematici-seo" aria-labelledby="percorsi-tematici-titolo" className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-xl border border-neutral-200 bg-neutral-50 p-5 sm:p-7">
          <h2 id="percorsi-tematici-titolo" className="text-2xl font-bold text-neutral-950">Costi edilizi: da dove iniziare</h2>
          <p className="mt-3 max-w-4xl text-neutral-700 leading-relaxed">Prima di confrontare importi, individua la lavorazione e le voci comprese. Questi percorsi collegano il quadro dei prezzi alle domande da fare su un intervento concreto.</p>
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"><li><a href="/prezzi/" className="font-bold text-neutral-950 underline underline-offset-4">Consulta l’Osservatorio prezzi</a><p className="mt-2 text-sm text-neutral-700 leading-relaxed">Parti dalle lavorazioni e dalle unità di misura disponibili.</p></li><li><a href="/ristrutturazioni/ristrutturazione-chiavi-in-mano-guida/" className="font-bold text-neutral-950 underline underline-offset-4">Leggi una proposta chiavi in mano</a><p className="mt-2 text-sm text-neutral-700 leading-relaxed">Approfondisci cosa comprendono lavori, tempi e costi di una ristrutturazione.</p></li></ul>
        </div>
      </section>


      {/* ===== APERTURA: hero + secondari ===== */}
      <div className="grid gap-8 border-b border-border py-8 lg:grid-cols-[minmax(0,2fr)_1fr]">
        {hero && <ArticleCard article={hero} variant="hero" priority />}
        <aside aria-label="In primo piano" className="border-t border-border pt-4 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <p className="font-sans mb-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-primary">
            In primo piano
          </p>
          {secondary.map((a) => (
            <ArticleCard key={a.slug} article={a} variant="compact" />
          ))}
        </aside>
      </div>

      {/* ===== Ultimi articoli + sidebar più letti ===== */}
      <div className="grid gap-10 py-10 lg:grid-cols-[minmax(0,2fr)_1fr]">
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
