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
          },
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

      <div className="grid gap-10 py-8 lg:grid-cols-[2fr_1fr]">
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

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <AdSlot id={`rect-${cat.slug}-1`} format="rectangle" className="mx-auto" />
          <AdSlot id={`rect-${cat.slug}-2`} format="rectangle" className="mx-auto mt-6" />
        </aside>
      </div>
    </div>
  );
}
