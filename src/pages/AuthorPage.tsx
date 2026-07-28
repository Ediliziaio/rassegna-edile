import { Link, useParams } from "react-router-dom";
import { articles, articleUrl } from "@/data/articles";
import { authors } from "@/data/authors";
import { SITE } from "@/data/categories";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useSeo } from "@/lib/seo";
import NotFoundPage from "./NotFoundPage";

export const authorSlug = (name: string) =>
  name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "-");

export default function AuthorPage() {
  const { name } = useParams<{ name: string }>();
  const author = authors.find((a) => authorSlug(a.name) === name);
  const written = author
    ? articles.filter((a) => a.author === author.name)
    : [];

  useSeo({
    title: author
      ? `${author.name}, ${author.role} | Rassegna Edile`
      : "Autore non trovato",
    description: author
      ? `${author.name} — ${author.role} di Rassegna Edile. ${author.bio}`
      : "",
    canonical: `/autore/${name}/`,
    jsonLd: author
      ? [
          {
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            mainEntity: {
              "@type": "Person",
              "@id": `${SITE.url}/autore/${name}/#person`,
              name: author.name,
              jobTitle: author.role,
              description: author.bio,
              url: `${SITE.url}/autore/${name}/`,
              knowsAbout: [...new Set(written.map((a) => a.primaryKeyword))].slice(0, 8),
              worksFor: { "@id": SITE.url + "/#organization" },
            },
          },
        ]
      : [],
  });

  if (!author) return <NotFoundPage />;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: "Redazione", path: "/redazione/" },
          { name: author.name },
        ]}
      />

      <header className="mt-4 border-b-2 border-primary pb-6">
        <p className="kicker">{author.role}</p>
        <h1 className="font-display mt-1 text-3xl font-black text-primary md:text-4xl">
          {author.name}
        </h1>
        <p className="mt-3 max-w-3xl leading-relaxed text-foreground/75">
          {author.bio}
        </p>
      </header>

      <section aria-labelledby="articoli-autore" className="mt-8 max-w-3xl">
        <h2 id="articoli-autore" className="font-display text-2xl font-bold text-primary">
          Articoli di {author.name.split(" ")[0]}
        </h2>
        <div className="mt-2">
          {written.map((a) => (
            <ArticleCard key={a.slug} article={a} variant="compact" />
          ))}
        </div>
        {written.length === 0 && (
          <p className="mt-4 text-foreground/70">
            Nessun articolo pubblicato al momento.{" "}
            <Link to="/" className="text-accent hover:underline">
              Torna alla home
            </Link>
          </p>
        )}
      </section>

      <p className="font-sans mt-10 text-sm">
        <Link to="/redazione/" className="text-accent hover:underline">
          ← Tutta la redazione
        </Link>
        {written[0] && (
          <Link
            to={articleUrl(written[0])}
            className="ml-4 text-accent hover:underline"
          >
            Ultimo articolo pubblicato →
          </Link>
        )}
      </p>
    </div>
  );
}
