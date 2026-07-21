import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { articles } from "@/data/articles";
import ArticleCard from "@/components/ArticleCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import { useSeo } from "@/lib/seo";

export default function SearchPage() {
  const [params, setParams] = useSearchParams();
  const q = (params.get("q") ?? "").trim();
  const [input, setInput] = useState(q);

  useSeo({
    title: q ? `Ricerca: ${q} | Rassegna Edile` : "Cerca | Rassegna Edile",
    description:
      "Cerca tra gli articoli di Rassegna Edile: guide, costi, norme e incentivi per l'edilizia.",
    canonical: "/cerca/",
    noindex: true, // pagina di servizio: non indicizzare per evitare thin content
  });

  const results = useMemo(() => {
    if (!q) return [];
    const terms = q.toLowerCase().split(/\s+/);
    return articles.filter((a) => {
      const hay = [
        a.title,
        a.metaDescription,
        a.primaryKeyword,
        a.answerBox,
        ...a.tags,
      ]
        .join(" ")
        .toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [q]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Cerca" }]} />
      <h1 className="font-display mt-4 text-3xl font-black text-primary">
        Cerca nel sito
      </h1>

      <form
        className="mt-6 flex max-w-xl gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          setParams(input.trim() ? { q: input.trim() } : {});
        }}
        role="search"
      >
        <input
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Cerca articoli, guide, bonus…"
          aria-label="Cerca articoli"
          className="font-sans w-full rounded-sm border border-border bg-card px-4 py-3 text-sm outline-none focus:border-accent"
        />
        <button
          type="submit"
          className="font-sans rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-accent"
        >
          Cerca
        </button>
      </form>

      {q && (
        <p className="font-sans mt-6 text-sm text-muted-foreground">
          {results.length} risultat{results.length === 1 ? "o" : "i"} per «{q}»
        </p>
      )}

      <div className="mt-4 max-w-3xl">
        {results.map((a) => (
          <ArticleCard key={a.slug} article={a} variant="compact" />
        ))}
        {q && results.length === 0 && (
          <p className="mt-6 text-foreground/75">
            Nessun articolo trovato. Prova con termini più generali, ad esempio
            «fotovoltaico», «ristrutturazione» o «bonus».
          </p>
        )}
      </div>
    </div>
  );
}
