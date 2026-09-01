import { useParams } from "react-router-dom";
import { articlesByCategory } from "@/data/articles";
import { categoryBySlug, SITE } from "@/data/categories";
import ArticleCard from "@/components/ArticleCard";
import AdSlot from "@/components/AdSlot";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useSeo, breadcrumbJsonLd } from "@/lib/seo";
import NotFoundPage from "./NotFoundPage";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const cat = category ? categoryBySlug(category) : undefined;
  const items = category ? articlesByCategory(category) : [];

  useSeo({
    title: cat ? cat.metaTitle : "Sezione non trovata",
    description: cat?.metaDescription ?? "",
    canonical: `/${category}/`,
    image: cat ? `${SITE.url}/images/og/${cat.slug}.jpg` : undefined,
    jsonLd: cat
      ? [
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: cat.name, path: `/${cat.slug}/` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: cat.name,
            description: cat.description,
            url: `${SITE.url}/${cat.slug}/`,
            isPartOf: { "@id": SITE.url + "/#website" },
            mainEntity: {
              "@type": "ItemList",
              numberOfItems: items.length,
              itemListElement: items.map((a, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: `${SITE.url}/${a.category}/${a.slug}/`,
                name: a.title,
              })),
            },
          },
          ...(cat.faq?.length
            ? [
                {
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: cat.faq.map((f) => ({
                    "@type": "Question",
                    name: f.q,
                    acceptedAnswer: { "@type": "Answer", text: f.a },
                  })),
                },
              ]
            : []),
        ]
      : [],
  });

  if (!cat) return <NotFoundPage />;

  const [first, ...rest] = items;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs
        items={[{ name: "Home", path: "/" }, { name: cat.name }]}
      />

      <header className="mt-4 border-b-2 border-primary pb-6">
        <h1 className="font-display text-3xl font-black text-primary md:text-4xl">
          {cat.name}
        </h1>
        <p className="mt-3 max-w-3xl leading-relaxed text-foreground/75">
          {cat.description}
        </p>
      </header>

      {cat.intro && (
        <section aria-labelledby="panoramica" className="mt-8 max-w-3xl">
          <h2 id="panoramica" className="sr-only">Panoramica: {cat.name}</h2>
          <div className="article-body">
            {cat.intro.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
        </section>
      )}

      {cat.covers && (
        <section aria-labelledby="cosa-trovi" className="mt-10">
          <h2
            id="cosa-trovi"
            className="font-display border-b-2 border-primary pb-2 text-2xl font-bold text-primary"
          >
            Cosa trovi in questa sezione
          </h2>
          <div className="mt-5 grid gap-6 md:grid-cols-3">
            {cat.covers.map((c) => (
              <div key={c.title} className="border-l-2 border-accent pl-4">
                <h3 className="font-display text-lg font-bold text-foreground">{c.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-foreground/75">{c.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid gap-10 py-8 lg:grid-cols-[minmax(0,2fr)_1fr]">
        <div>
          {first && (
            <div className="border-b border-border pb-8">
              <ArticleCard article={first} variant="hero" priority />
            </div>
          )}
          <div className="mt-2">
            {rest.map((a, i) => (
              <div key={a.slug}>
                <ArticleCard article={a} variant="compact" />
                {i === 2 && (
                  <AdSlot id={`infeed-${cat.slug}`} format="infeed" className="my-5" />
                )}
              </div>
            ))}
          </div>
        </div>

        <aside className="min-w-0 lg:sticky lg:top-6 lg:self-start">
          <AdSlot
            id={`ad-${cat.slug}-1`}
            format="halfpage"
            mobileFormat="rectangle"
            className="mx-auto"
          />
          <AdSlot id={`ad-${cat.slug}-2`} format="box" className="mx-auto mt-6" />
        </aside>
      </div>

      {cat.faq && (
        <section aria-labelledby="faq-sezione" className="mb-8 max-w-3xl">
          <h2
            id="faq-sezione"
            className="font-display border-b-2 border-accent pb-2 text-2xl font-bold text-primary"
          >
            Domande frequenti su {cat.name.toLowerCase()}
          </h2>
          <div className="mt-4 space-y-4">
            {cat.faq.map((f, i) => (
              <details
                key={i}
                className="group rounded-sm border border-border bg-card p-4 open:bg-muted/40"
              >
                <summary className="font-sans cursor-pointer list-none text-[0.95rem] font-semibold text-foreground marker:hidden">
                  <span className="mr-2 text-accent">?</span>
                  {f.q}
                </summary>
                <p className="mt-3 leading-relaxed text-foreground/85">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
