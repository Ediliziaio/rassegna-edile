import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { priceRows } from "@/data/prices.generated";
import { categories, SITE } from "@/data/categories";
import Breadcrumbs from "@/components/Breadcrumbs";
import AdSlot from "@/components/AdSlot";
import { useSeo, breadcrumbJsonLd } from "@/lib/seo";

const fmt = (n: number) =>
  n.toLocaleString("it-IT", { maximumFractionDigits: 0 });

const range = (min: number, max: number, unita: string) =>
  min === max ? `${fmt(min)} ${unita}` : `${fmt(min)} – ${fmt(max)} ${unita}`;

export default function PricesPage() {
  const [query, setQuery] = useState("");
  const [filtroCat, setFiltroCat] = useState("");

  const fonti = new Set(priceRows.map((r) => r.fonteSlug)).size;

  /* Filtro solo client-side: il render iniziale — e quindi l'HTML
     prerenderizzato consegnato ai crawler — contiene sempre tutte le voci. */
  const norm = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const visibili = useMemo(() => {
    const q = norm(query.trim());
    return priceRows.filter((r) => {
      if (filtroCat && r.categoria !== filtroCat) return false;
      if (!q) return true;
      return (
        norm(r.voce).includes(q) ||
        norm(r.contesto).includes(q) ||
        norm(r.colonna).includes(q) ||
        norm(r.fonteTitolo).includes(q)
      );
    });
  }, [query, filtroCat]);

  const byCat = categories
    .map((c) => ({ cat: c, rows: visibili.filter((r) => r.categoria === c.slug) }))
    .filter((g) => g.rows.length > 0);

  const filtroAttivo = query.trim() !== "" || filtroCat !== "";

  useSeo({
    title: "Osservatorio prezzi edilizia 2026: costi a confronto",
    description: `Quanto costano ${priceRows.length} lavorazioni e materiali edili: range di prezzo per ristrutturazioni, impianti, isolamento e serramenti, con la fonte di ogni dato.`,
    canonical: "/prezzi/",
    image: `${SITE.url}/og-cover.png`,
    jsonLd: [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Osservatorio prezzi", path: "/prezzi/" },
      ]),
      {
        "@context": "https://schema.org",
        "@type": "Dataset",
        name: "Osservatorio prezzi dell'edilizia — Rassegna Edile",
        description:
          "Raccolta strutturata di intervalli di prezzo per lavorazioni, materiali e impianti edili in Italia, con indicazione della fonte redazionale di ciascuna voce.",
        url: `${SITE.url}/prezzi/`,
        inLanguage: "it-IT",
        keywords: ["prezzi edilizia", "costi ristrutturazione", "prezzario"],
        creator: { "@id": SITE.url + "/#organization" },
        isAccessibleForFree: true,
        variableMeasured: [...new Set(priceRows.map((r) => r.unita))].map((u) => ({
          "@type": "PropertyValue",
          name: `Prezzo (${u})`,
          unitText: u,
        })),
      },
    ],
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumbs
        items={[{ name: "Home", path: "/" }, { name: "Osservatorio prezzi" }]}
      />

      <header className="mt-4 border-b-2 border-primary pb-6">
        <p className="kicker">Dati</p>
        <h1 className="font-display mt-1 text-3xl font-black text-primary md:text-4xl">
          Osservatorio prezzi dell'edilizia
        </h1>
        <p className="mt-3 max-w-3xl leading-relaxed text-foreground/75">
          {priceRows.length} voci di costo estratte dalle nostre guide e messe a
          confronto in un unico prospetto: lavorazioni, materiali e impianti con
          il relativo intervallo di prezzo e il rimando all'articolo che lo
          documenta.
        </p>
      </header>

      <section aria-labelledby="metodo" className="mt-8 max-w-3xl">
        <h2 id="metodo" className="sr-only">
          Metodo
        </h2>
        <div className="article-body">
          <p>
            I valori riportati sono <strong>riferimenti di mercato</strong>,
            non preventivi. Servono a capire l'ordine di grandezza di una spesa
            e a riconoscere un'offerta fuori scala, non a sostituire un computo
            metrico: il prezzo effettivo dipende da stato dell'immobile,
            accessibilità del cantiere, area geografica e livello di finitura.
          </p>
          <p>
            Ogni riga conserva il collegamento all'articolo da cui proviene, con
            il contesto tecnico che ne spiega le variabili. Le voci raccolte qui
            derivano da {fonti} guide della redazione: è un prospetto ricavato
            dai nostri contenuti, aggiornato quando gli articoli di origine
            vengono rivisti.
          </p>
        </div>
      </section>

      <section className="mt-8 rounded-sm border border-border bg-muted/30 p-4">
        <div className="font-sans flex flex-col gap-3 sm:flex-row">
          <label className="flex-1">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Cerca una voce di costo
            </span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Es. cappotto, fotovoltaico, bagno, infissi…"
              className="w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm"
            />
          </label>
          <label className="sm:w-64">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Categoria
            </span>
            <select
              value={filtroCat}
              onChange={(e) => setFiltroCat(e.target.value)}
              className="w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm"
            >
              <option value="">Tutte le categorie</option>
              {categories
                .filter((c) => priceRows.some((r) => r.categoria === c.slug))
                .map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.name}
                  </option>
                ))}
            </select>
          </label>
        </div>
        <p className="font-sans mt-3 text-sm text-foreground/75" aria-live="polite">
          {filtroAttivo ? (
            <>
              <strong>{visibili.length}</strong>{" "}
              {visibili.length === 1 ? "voce trovata" : "voci trovate"} su {priceRows.length}
              {" · "}
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setFiltroCat("");
                }}
                className="underline hover:text-accent"
              >
                azzera i filtri
              </button>
            </>
          ) : (
            <>
              Tutte le <strong>{priceRows.length}</strong> voci. Digita per restringere
              il prospetto.
            </>
          )}
        </p>
      </section>

      <nav aria-label="Sezioni dell'osservatorio" className="mt-8">
        <ul className="font-sans flex flex-wrap gap-2">
          {byCat.map(({ cat, rows }) => (
            <li key={cat.slug}>
              <a
                href={`#p-${cat.slug}`}
                className="inline-block rounded-sm border border-border bg-muted/40 px-3 py-1.5 text-xs font-semibold text-foreground/80 hover:border-accent hover:text-accent"
              >
                {cat.name} <span className="text-muted-foreground">({rows.length})</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,2fr)_1fr]">
        <div className="min-w-0">
          {filtroAttivo && visibili.length === 0 && (
            <p className="rounded-sm border border-border bg-background p-6 text-foreground/75">
              Nessuna voce corrisponde alla ricerca. Prova con il nome della lavorazione
              o del materiale, per esempio &laquo;cappotto&raquo; o &laquo;pompa di calore&raquo;.
            </p>
          )}
          {byCat.map(({ cat, rows }, ci) => (
            <section
              key={cat.slug}
              id={`p-${cat.slug}`}
              className="anchor-target mt-10 first:mt-0"
            >
              <h2 className="font-display border-b-2 border-primary pb-2 text-2xl font-bold text-primary">
                <Link to={`/${cat.slug}/`} className="hover:text-accent">
                  {cat.name}
                </Link>
              </h2>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="border-b-2 border-border text-left">
                      <th className="py-2 pr-3 font-sans font-semibold">Voce</th>
                      <th className="py-2 pr-3 font-sans font-semibold whitespace-nowrap">
                        Intervallo
                      </th>
                      <th className="py-2 font-sans font-semibold">Fonte</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r, i) => (
                      <tr key={i} className="border-b border-border align-top">
                        <td className="py-2.5 pr-3">
                          <span className="font-medium text-foreground">{r.voce}</span>
                          <span className="block text-xs text-muted-foreground">
                            {r.colonna}
                          </span>
                        </td>
                        <td className="py-2.5 pr-3 whitespace-nowrap font-semibold text-primary">
                          {range(r.min, r.max, r.unita)}
                        </td>
                        <td className="py-2.5">
                          <Link
                            to={`/${r.categoria}/${r.fonteSlug}/`}
                            className="text-xs text-accent hover:underline"
                          >
                            {r.fonteTitolo}
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {ci === 1 && (
                <AdSlot id="ad-prezzi-infeed" format="infeed" className="mt-8" />
              )}
            </section>
          ))}
        </div>

        <aside className="min-w-0 lg:sticky lg:top-6 lg:self-start">
          <AdSlot
            id="ad-prezzi-sidebar"
            format="halfpage"
            mobileFormat="rectangle"
            className="mx-auto"
          />
        </aside>
      </div>
    </div>
  );
}
