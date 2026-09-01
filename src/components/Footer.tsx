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
              Magazine online verticale sull'edilizia. Contenuti tecnici a cura
              della redazione.
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
              ["Osservatorio prezzi", "/prezzi/"],
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

        <div className="mt-10 space-y-2 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60">
          <p>
            Rassegna Edile è una testata edita da <strong>Domus Group S.r.l.</strong> — Sede
            legale: Via Aurelio Saffi 29, 20123 Milano · P.IVA 13132010961 ·
            Capitale sociale 20.000,00 € i.v. · PEC domusgroupsrl@legalmail.it
          </p>
          <p>
            © {new Date().getFullYear()} Domus Group S.r.l. — Tutti i diritti
            riservati. I contenuti sono protetti da copyright e citabili con
            attribuzione e link alla fonte.
          </p>
        </div>
      </div>
    </footer>
  );
}
