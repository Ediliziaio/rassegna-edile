import { Link } from "react-router-dom";
import { categories, SITE } from "@/data/categories";

export default function Footer() {
  return (
    <footer className="mt-16 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_2fr_1fr]">
          {/* Testata */}
          <div>
            <p className="font-display text-2xl font-black">
              Rassegna <span className="text-accent">Edile</span>
            </p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-primary-foreground/75">
              {SITE.description}
            </p>
            <p className="mt-4 text-xs text-primary-foreground/60">
              Testata giornalistica online — Direttore responsabile: Marco
              Bertelli
            </p>
          </div>

          {/* Mappa delle sezioni */}
          <nav aria-label="Mappa del sito" className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-2">
            <p className="col-span-2 mb-1 font-sans text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary-foreground/60">
              Sezioni
            </p>
            {categories.map((c) => (
              <Link
                key={c.slug}
                to={`/${c.slug}/`}
                className="text-sm text-primary-foreground/85 transition-colors hover:text-accent"
              >
                {c.name}
              </Link>
            ))}
          </nav>

          {/* Servizio */}
          <nav aria-label="Pagine di servizio" className="space-y-2">
            <p className="mb-1 font-sans text-[0.65rem] font-bold uppercase tracking-[0.2em] text-primary-foreground/60">
              La testata
            </p>
            {[
              ["Chi siamo", "/chi-siamo/"],
              ["Redazione e autori", "/redazione/"],
              ["Contatti", "/contatti/"],
              ["Pubblicità e Media Kit", "/pubblicita/"],
              ["Mappa del sito", "/mappa-del-sito/"],
              ["Privacy Policy", "/privacy/"],
              ["Cookie Policy", "/cookie-policy/"],
            ].map(([label, href]) => (
              <Link
                key={href}
                to={href}
                className="block text-sm text-primary-foreground/85 transition-colors hover:text-accent"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60">
          <p>
            © {new Date().getFullYear()} Rassegna Edile — Tutti i diritti
            riservati. P.IVA 01234567890. I contenuti sono protetti da copyright
            e citabili con attribuzione e link alla fonte.
          </p>
        </div>
      </div>
    </footer>
  );
}
