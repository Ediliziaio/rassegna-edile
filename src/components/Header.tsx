import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { categories, SITE } from "@/data/categories";

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Rassegna Edile — Home">
      <svg
        viewBox="0 0 44 44"
        className={compact ? "h-8 w-8" : "h-11 w-11"}
        aria-hidden="true"
      >
        <rect x="2" y="2" width="40" height="40" fill="#16305e" />
        <rect x="8" y="8" width="12" height="12" fill="#f8f7f4" />
        <rect x="24" y="8" width="12" height="12" fill="#f8f7f4" />
        <rect x="8" y="24" width="12" height="12" fill="#e8722a" />
        <rect x="24" y="24" width="12" height="12" fill="#f8f7f4" />
      </svg>
      <span className="leading-none">
        <span
          className={`font-display block font-black tracking-tight text-primary ${
            compact ? "text-xl" : "text-2xl md:text-3xl"
          }`}
        >
          Rassegna <span className="text-accent">Edile</span>
        </span>
        {!compact && (
          <span className="font-sans mt-1 hidden text-[0.65rem] font-medium uppercase tracking-[0.22em] text-muted-foreground sm:block">
            {SITE.tagline}
          </span>
        )}
      </span>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const today = new Date().toLocaleDateString("it-IT", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="border-b border-border bg-card">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 font-sans text-[0.7rem]">
          <span className="capitalize">{today}</span>
          <nav aria-label="Utility" className="flex items-center gap-4">
            <Link to="/cerca/" className="hover:underline">
              Cerca
            </Link>
            <Link to="/redazione/" className="hover:underline">
              Redazione
            </Link>
            <Link to="/pubblicita/" className="hover:underline">
              Pubblicità
            </Link>
            <Link to="/contatti/" className="hover:underline">
              Contatti
            </Link>
          </nav>
        </div>
      </div>

      {/* Masthead */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Logo />
        {/* Slot leaderboard 728x90: spazio riservato, nessun CLS */}
        <div
          className="hidden h-[90px] w-[728px] items-center justify-center border border-dashed border-border bg-muted/40 lg:flex"
          data-ad-slot="leaderboard-top"
          aria-label="Spazio pubblicitario"
        >
          <span className="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
            Pubblicità 728×90
          </span>
        </div>
      </div>

      {/* Nav categorie */}
      <nav
        aria-label="Categorie principali"
        className="border-t border-border bg-card"
      >
        <div className="mx-auto flex max-w-7xl items-center px-4">
          <button
            className="font-sans mr-3 flex h-11 items-center gap-1.5 text-sm font-semibold text-primary md:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="main-menu"
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" fill="currentColor" aria-hidden="true">
              {open ? (
                <path d="M5.3 4.3 10 9l4.7-4.7 1 1L11 10l4.7 4.7-1 1L10 11l-4.7 4.7-1-1L9 10 4.3 5.3z" />
              ) : (
                <path d="M2 5h16v2H2zm0 4h16v2H2zm0 4h16v2H2z" />
              )}
            </svg>
            Menu
          </button>
          <ul
            id="main-menu"
            className={`${
              open ? "flex" : "hidden"
            } w-full flex-col gap-0 py-2 md:flex md:flex-row md:items-center md:gap-1 md:py-0`}
          >
            <li>
              <NavLink
                to="/"
                end
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `font-sans block px-3 py-2.5 text-[0.8rem] font-semibold transition-colors md:py-3.5 ${
                    isActive
                      ? "text-accent"
                      : "text-foreground/80 hover:text-accent"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <NavLink
                  to={`/${c.slug}/`}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `font-sans block whitespace-nowrap px-3 py-2.5 text-[0.8rem] font-semibold transition-colors md:py-3.5 ${
                      isActive
                        ? "text-accent"
                        : "text-foreground/80 hover:text-accent"
                    }`
                  }
                >
                  {c.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
