import { Link, useParams } from "react-router-dom";
import { articles, articleUrl } from "@/data/articles";
import { authors } from "@/data/authors";
import { SITE, categories } from "@/data/categories";
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
              // Emessi solo se realmente valorizzati in src/data/authors.ts
              ...(author.sameAs?.length ? { sameAs: author.sameAs } : {}),
              ...(author.email ? { email: author.email } : {}),
              ...(author.credential
                ? {
                    hasCredential: {
                      "@type": "EducationalOccupationalCredential",
                      credentialCategory: "professional certification",
                      name: author.credential,
                    },
                  }
                : {}),
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
        {author.credential && (
          <p className="font-sans mt-2 text-sm text-muted-foreground">
            {author.credential}
          </p>
        )}
        {author.sameAs && author.sameAs.length > 0 && (
          <p className="font-sans mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
            <span className="text-muted-foreground">Profili verificati:</span>
            {author.sameAs.map((href) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="me noopener noreferrer"
                className="text-accent hover:underline"
              >
                {new URL(href).hostname.replace(/^www\./, "")}
              </a>
            ))}
          </p>
        )}
      </header>

      {/* Competenze derivate dagli articoli realmente firmati: dati, non biografia */}
      {written.length > 0 && (
        <section aria-labelledby="competenze" className="mt-8 max-w-3xl">
          <h2
            id="competenze"
            className="font-display border-b-2 border-primary pb-2 text-xl font-bold text-primary"
          >
            Temi seguiti
          </h2>
          <p className="mt-3 leading-relaxed text-foreground/80">
            {author.name} firma {written.length}{" "}
            {written.length === 1 ? "guida" : "guide"} su Rassegna Edile,
            distribuite su{" "}
            {new Set(written.map((a) => a.category)).size}{" "}
            {new Set(written.map((a) => a.category)).size === 1
              ? "area tematica"
              : "aree tematiche"}
            . I contenuti sono redatti secondo le linee guida editoriali della
            testata: fonti verificate, dati di mercato dichiarati come
            riferimenti e rimando alle fonti ufficiali per normativa e
            incentivi.
          </p>
          <ul className="font-sans mt-4 flex flex-wrap gap-2">
            {[...new Set(written.map((a) => a.primaryKeyword))].map((k) => (
              <li
                key={k}
                className="rounded-sm border border-border bg-muted/40 px-3 py-1 text-xs text-foreground/80"
              >
                {k}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 border-t border-border pt-4 font-sans text-sm">
            {[...new Set(written.map((a) => a.category))].map((c) => {
              const cat = categories.find((x) => x.slug === c);
              return (
                <Link
                  key={c}
                  to={`/${c}/`}
                  className="text-accent hover:underline"
                >
                  {cat?.name ?? c} →
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section aria-labelledby="articoli-autore" className="mt-10 max-w-3xl">
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
