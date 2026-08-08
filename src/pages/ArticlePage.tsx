import { Link, useParams } from "react-router-dom";
import { articleByPath, articleUrl, readingTime, relatedArticles } from "@/data/articles";
import { categoryBySlug, SITE } from "@/data/categories";
import ArticleCard, { formatDate } from "@/components/ArticleCard";
import ArticleVisual from "@/components/ArticleVisual";
import AdSlot from "@/components/AdSlot";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useSeo, breadcrumbJsonLd } from "@/lib/seo";
import { authorSlug } from "./AuthorPage";
import NotFoundPage from "./NotFoundPage";

export default function ArticlePage() {
  const { category, slug } = useParams<{ category: string; slug: string }>();
  const article = category && slug ? articleByPath(category, slug) : undefined;
  const cat = article ? categoryBySlug(article.category) : undefined;
  const related = article ? relatedArticles(article) : [];
  const url = article ? SITE.url + articleUrl(article) : "";

  useSeo({
    title: article ? article.metaTitle : "Articolo non trovato",
    description: article?.metaDescription ?? "",
    canonical: article ? articleUrl(article) : "/",
    ogType: "article",
    image: article ? `${SITE.url}/images/articles/${article.slug}.webp` : undefined,
    publishedAt: article?.publishedAt,
    updatedAt: article?.updatedAt,
    jsonLd: article
      ? [
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: cat?.name ?? "", path: `/${article.category}/` },
            { name: article.title, path: articleUrl(article) },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.metaDescription,
            image: [`${SITE.url}/images/articles/${article.slug}.webp`],
            datePublished: article.publishedAt,
            dateModified: article.updatedAt,
            inLanguage: "it-IT",
            author: {
              "@type": "Person",
              "@id": `${SITE.url}/autore/${authorSlug(article.author)}/#person`,
              name: article.author,
              jobTitle: article.authorRole,
              url: `${SITE.url}/autore/${authorSlug(article.author)}/`,
            },
            publisher: { "@id": SITE.url + "/#organization" },
            isAccessibleForFree: true,
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            articleSection: cat?.name,
            keywords: [article.primaryKeyword, ...article.tags].join(", "),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: article.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          },
        ]
      : [],
  });

  if (!article || !cat) return <NotFoundPage />;

  const shareText = encodeURIComponent(article.title);
  const shareUrl = encodeURIComponent(url);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs
        items={[
          { name: "Home", path: "/" },
          { name: cat.name, path: `/${cat.slug}/` },
          { name: article.title },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,2fr)_1fr]">
        {/* ===== CORPO ARTICOLO ===== */}
        <article>
          <header>
            <p className="kicker">{cat.name}</p>
            <h1 className="font-display mt-2 text-3xl font-black leading-tight text-foreground md:text-[2.6rem] md:leading-[1.15]">
              {article.title}
            </h1>

            {/* Risposta rapida (AEO): 40-60 parole auto-conclusive */}
            <div className="mt-5 border-l-4 border-accent bg-muted/50 p-5" data-answer-box>
              <p className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.2em] text-accent">
                Risposta rapida
              </p>
              <p className="mt-2 leading-relaxed text-foreground/90">
                {article.answerBox}
              </p>
            </div>

            {/* Byline E-E-A-T */}
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-border py-3">
              <p className="font-sans text-sm">
                di{" "}
                <Link
                  to={`/autore/${authorSlug(article.author)}/`}
                  className="font-semibold text-primary hover:text-accent"
                >
                  {article.author}
                </Link>
                <span className="text-muted-foreground"> · {article.authorRole}</span>
              </p>
              <p className="font-sans text-xs text-muted-foreground">
                Pubblicato il {formatDate(article.publishedAt)}
                {article.updatedAt > article.publishedAt && (
                  <> · Aggiornato il {formatDate(article.updatedAt)}</>
                )}{" "}
                · {readingTime(article)} min di lettura
              </p>
              {/* Condivisione leggera: solo link, nessuno script esterno */}
              <div className="font-sans ml-auto flex items-center gap-3 text-xs font-semibold">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent"
                  aria-label="Condividi su Facebook"
                >
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent"
                  aria-label="Condividi su X"
                >
                  X
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent"
                  aria-label="Condividi su LinkedIn"
                >
                  LinkedIn
                </a>
                <a
                  href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent"
                  aria-label="Condividi su WhatsApp"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <figure className="mt-6">
              <ArticleVisual
                category={article.category}
                slug={article.slug}
                title={article.heroAlt}
                priority
                className="rounded-sm"
              />
              <figcaption className="font-sans mt-2 text-xs text-muted-foreground">
                {article.heroAlt}
              </figcaption>
            </figure>
          </header>

          {/* TOC con ancore: favorisce sitelink e navigazione */}
          <nav
            aria-label="Indice dei contenuti"
            className="mt-8 rounded-sm border border-border bg-card p-5"
          >
            <p className="font-sans text-[0.7rem] font-bold uppercase tracking-[0.2em] text-primary">
              In questo articolo
            </p>
            <ol className="font-sans mt-3 space-y-2 text-sm">
              {article.sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-foreground/80 hover:text-accent hover:underline">
                    <span className="mr-2 font-semibold text-accent">{i + 1}.</span>
                    {s.h2}
                  </a>
                </li>
              ))}
              <li>
                <a href="#faq" className="text-foreground/80 hover:text-accent hover:underline">
                  <span className="mr-2 font-semibold text-accent">
                    {article.sections.length + 1}.
                  </span>
                  Domande frequenti
                </a>
              </li>
            </ol>
          </nav>

          {/* Sezioni */}
          <div className="article-body mt-8">
            {article.sections.map((s, si) => (
              <section key={s.id} id={s.id} className="anchor-target mt-10 first:mt-0">
                <h2 className="font-display mb-4 text-2xl font-bold leading-snug text-primary">
                  {s.h2}
                </h2>
                {s.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
                {s.list && (
                  <ul>
                    {s.list.map((li, i) => (
                      <li key={i}>{li}</li>
                    ))}
                  </ul>
                )}
                {s.table && (
                  <div className="overflow-x-auto">
                    <table>
                      <thead>
                        <tr>
                          {s.table.headers.map((h, i) => (
                            <th key={i}>{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {s.table.rows.map((r, i) => (
                          <tr key={i}>
                            {r.map((cell, j) => (
                              <td key={j}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                {s.subsections?.map((sub, i) => (
                  <div key={i} className="mt-6">
                    <h3 className="font-display mb-3 text-xl font-bold text-foreground">
                      {sub.h3}
                    </h3>
                    {sub.paragraphs.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                ))}
                {/* Slot in-article tra le sezioni: spazio riservato, nessun CLS */}
                {si === 1 && (
                  <AdSlot id="rect-article-inline" format="rectangle" className="mx-auto my-8" />
                )}
              </section>
            ))}
          </div>

          {/* FAQ con markup FAQPage */}
          <section id="faq" className="anchor-target mt-12" aria-labelledby="faq-title">
            <h2
              id="faq-title"
              className="font-display border-b-2 border-accent pb-2 text-2xl font-bold text-primary"
            >
              Domande frequenti
            </h2>
            <div className="mt-4 space-y-4">
              {article.faq.map((f, i) => (
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

          {/* Autore (E-E-A-T) */}
          <section aria-label="Autore" className="mt-10 rounded-sm border border-border bg-card p-5">
            <p className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.2em] text-primary">
              L'autore
            </p>
            <p className="font-display mt-2 text-lg font-bold">
              {article.author}
              <span className="font-sans ml-2 text-sm font-medium text-muted-foreground">
                {article.authorRole}
              </span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              Contenuto redatto secondo le linee guida editoriali di Rassegna
              Edile: fonti verificate, dati aggiornati e revisione tecnica
              della redazione.{" "}
              <Link to="/redazione/" className="text-accent hover:underline">
                Scopri la redazione →
              </Link>
            </p>
          </section>
        </article>

        {/* ===== SIDEBAR ===== */}
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <AdSlot id="rect-article-sidebar" format="rectangle" className="mx-auto" />
          <section aria-labelledby="correlati" className="mt-8">
            <h2
              id="correlati"
              className="font-display border-b-2 border-primary pb-2 text-xl font-bold text-primary"
            >
              Articoli correlati
            </h2>
            <div className="mt-2">
              {related.map((r) => (
                <ArticleCard key={r.slug} article={r} variant="text" />
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
