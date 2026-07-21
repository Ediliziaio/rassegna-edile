import { Link } from "react-router-dom";
import { useSeo } from "@/lib/seo";

export default function NotFoundPage() {
  useSeo({
    title: "Pagina non trovata | Rassegna Edile",
    description: "La pagina richiesta non esiste o è stata spostata.",
    canonical: "/404",
    noindex: true,
  });

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <p className="font-display text-7xl font-black text-primary">404</p>
      <h1 className="font-display mt-4 text-2xl font-bold">
        Pagina non trovata
      </h1>
      <p className="mt-3 text-foreground/75">
        La pagina che cerchi non esiste o è stata spostata.
      </p>
      <Link
        to="/"
        className="font-sans mt-6 inline-block rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-accent"
      >
        Torna alla home
      </Link>
    </div>
  );
}
