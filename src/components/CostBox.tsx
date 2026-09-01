import { Link } from "react-router-dom";
import { priceRows } from "@/data/prices.generated";

const fmt = (n: number) => n.toLocaleString("it-IT", { maximumFractionDigits: 0 });

/**
 * Riepilogo dei costi documentati nell'articolo.
 *
 * Attinge alle stesse voci dell'Osservatorio prezzi, quindi non introduce
 * cifre nuove: rende solo immediatamente leggibile, in apertura, il dato che
 * l'articolo già contiene nelle sue tabelle. È l'elemento che distingue una
 * guida di Rassegna Edile da una guida generica sullo stesso tema.
 */
export default function CostBox({ slug }: { slug: string }) {
  const rows = priceRows.filter((r) => r.fonteSlug === slug);
  if (rows.length === 0) return null;

  // raggruppa per unità: sommare €/mq e € darebbe un intervallo privo di senso
  const perUnita = new Map<string, typeof rows>();
  for (const r of rows) {
    const k = r.unita;
    if (!perUnita.has(k)) perUnita.set(k, []);
    perUnita.get(k)!.push(r);
  }

  return (
    <aside
      className="mt-5 rounded-sm border border-border bg-card p-5"
      aria-labelledby="quanto-costa"
      data-cost-box
    >
      <p
        id="quanto-costa"
        className="font-sans text-[0.68rem] font-bold uppercase tracking-[0.2em] text-primary"
      >
        Quanto costa
      </p>

      {[...perUnita.entries()].map(([unita, items]) => {
        const min = Math.min(...items.map((i) => i.min));
        const max = Math.max(...items.map((i) => i.max));
        return (
          <div key={unita} className="mt-3">
            <p className="font-display text-lg font-bold text-foreground">
              {min === max ? fmt(min) : `${fmt(min)} – ${fmt(max)}`}{" "}
              <span className="font-sans text-sm font-medium text-muted-foreground">
                {unita}
              </span>
            </p>
            <ul className="mt-2 space-y-1">
              {items.slice(0, 5).map((r, i) => (
                <li
                  key={i}
                  className="font-sans flex justify-between gap-4 border-b border-border/60 pb-1 text-sm last:border-0"
                >
                  <span className="text-foreground/80">{r.voce}</span>
                  <span className="whitespace-nowrap font-semibold text-primary">
                    {r.min === r.max
                      ? fmt(r.min)
                      : `${fmt(r.min)}–${fmt(r.max)}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}

      <p className="font-sans mt-3 text-xs text-muted-foreground">
        Riferimenti di mercato, non preventivi ·{" "}
        <Link to="/prezzi/" className="text-accent hover:underline">
          tutti i prezzi nell'Osservatorio →
        </Link>
      </p>
    </aside>
  );
}
