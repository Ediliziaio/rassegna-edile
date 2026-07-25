import { Link } from "react-router-dom";
import type { Article } from "@/data/types";
import { articleUrl } from "@/data/articles";
import { categoryBySlug } from "@/data/categories";
import ArticleVisual from "./ArticleVisual";

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("it-IT", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ArticleCard({
  article,
  variant = "standard",
  priority = false,
}: {
  article: Article;
  variant?: "hero" | "standard" | "compact" | "text";
  priority?: boolean;
}) {
  const cat = categoryBySlug(article.category);
  const url = articleUrl(article);

  if (variant === "text") {
    return (
      <article className="border-b border-border py-3 last:border-0">
        <Link to={url} className="group">
          <h3 className="font-display text-[1.05rem] font-bold leading-snug text-foreground group-hover:text-accent">
            {article.title}
          </h3>
        </Link>
        <p className="font-sans mt-1 text-[0.7rem] uppercase tracking-wide text-muted-foreground">
          {formatDate(article.publishedAt)}
        </p>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="flex gap-4 border-b border-border py-4 last:border-0">
        <Link to={url} className="w-28 shrink-0 sm:w-36" aria-hidden="true" tabIndex={-1}>
          <ArticleVisual category={article.category} slug={article.slug} title={article.heroAlt} />
        </Link>
        <div className="min-w-0">
          <p className="kicker">{cat?.name}</p>
          <Link to={url} className="group">
            <h3 className="font-display mt-1 text-lg font-bold leading-snug text-foreground group-hover:text-accent">
              {article.title}
            </h3>
          </Link>
          <p className="font-sans mt-1.5 text-[0.7rem] uppercase tracking-wide text-muted-foreground">
            {article.author} · {formatDate(article.publishedAt)}
          </p>
        </div>
      </article>
    );
  }

  if (variant === "hero") {
    return (
      <article className="group relative">
        <Link to={url} aria-hidden="true" tabIndex={-1}>
          <ArticleVisual category={article.category} slug={article.slug}
            title={article.heroAlt}
            priority={priority}
            className="rounded-sm"
          />
        </Link>
        <div className="mt-4">
          <p className="kicker">{cat?.name}</p>
          <Link to={url}>
            <h2 className="font-display mt-2 text-2xl font-black leading-tight text-foreground group-hover:text-accent md:text-4xl">
              {article.title}
            </h2>
          </Link>
          <p className="mt-3 line-clamp-3 max-w-3xl leading-relaxed text-foreground/75">
            {article.answerBox}
          </p>
          <p className="font-sans mt-3 text-[0.72rem] uppercase tracking-wide text-muted-foreground">
            di {article.author}, {article.authorRole} ·{" "}
            {formatDate(article.publishedAt)}
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className="group">
      <Link to={url} aria-hidden="true" tabIndex={-1}>
        <ArticleVisual category={article.category} slug={article.slug} title={article.heroAlt} className="rounded-sm" />
      </Link>
      <div className="mt-3">
        <p className="kicker">{cat?.name}</p>
        <Link to={url}>
          <h3 className="font-display mt-1 text-xl font-bold leading-snug text-foreground group-hover:text-accent">
            {article.title}
          </h3>
        </Link>
        <p className="font-sans mt-1.5 text-[0.7rem] uppercase tracking-wide text-muted-foreground">
          {formatDate(article.publishedAt)}
        </p>
      </div>
    </article>
  );
}
