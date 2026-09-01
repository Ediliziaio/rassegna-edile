interface AdSlotProps {
  id: string;
  format: AdFormat;
  className?: string;
  /** true solo per lo slot in testata, che è above the fold. */
  eager?: boolean;
  /**
   * Formato alternativo sotto i 1024px. Serve per la half-page 300x600, che su
   * mobile occuperebbe 600px di altezza: lì viene servito un formato compatto.
   */
  mobileFormat?: AdFormat;
}

export type AdFormat =
  | "leaderboard"
  | "rectangle"
  | "infeed"
  | "box"
  | "halfpage";

/** Destinazione delle campagne attualmente in rotazione. */
const AD_HREF = "https://www.ediliziaincloud.com/";

/**
 * Creatività disponibili. Ogni formato dichiara le dimensioni native
 * dell'immagine: lo spazio viene riservato con l'aspect-ratio corretto, quindi
 * nessun layout shift e nessuna deformazione.
 */
const creatives: Record<
  AdFormat,
  { src: string; w: number; h: number; alt: string; wrap: string }
> = {
  leaderboard: {
    src: "/images/ads/leaderboard.webp",
    w: 1940,
    h: 180,
    alt: "EdiliziaInCloud — il gestionale con AI per l'edilizia: prova gratuita di 31 giorni",
    wrap: "w-full max-w-[970px]",
  },
  rectangle: {
    src: "/images/ads/rectangle.webp",
    w: 600,
    h: 500,
    alt: "EdiliziaInCloud — controlla margini, utili e guadagni della tua impresa edile",
    wrap: "w-[300px]",
  },
  infeed: {
    src: "/images/ads/infeed.webp",
    w: 1620,
    h: 672,
    alt: "EdiliziaInCloud — gestione cantieri, finanza e fatturazione in un'unica piattaforma",
    wrap: "w-full max-w-[820px] mx-auto",
  },
  halfpage: {
    src: "/images/ads/halfpage.webp",
    w: 300,
    h: 600,
    alt: "EdiliziaInCloud — il gestionale con AI per imprese edili: prova gratuita di 31 giorni",
    wrap: "w-[300px]",
  },
  box: {
    src: "/images/ads/box.webp",
    w: 800,
    h: 581,
    alt: "EdiliziaInCloud — aumenta margini e utili con l'AI per l'edilizia",
    wrap: "w-full max-w-[500px]",
  },
};

/** Portare a false per sospendere tutte le campagne. */
export const ADS_ENABLED = true;

export default function AdSlot({
  id,
  format,
  className = "",
  eager = false,
  mobileFormat,
}: AdSlotProps) {
  if (!ADS_ENABLED) return null;

  // Con mobileFormat si rendono due unità mutuamente esclusive via CSS:
  // nessuna delle due viene mai mostrata insieme all'altra.
  if (mobileFormat) {
    return (
      <>
        <AdSlot id={id} format={format} eager={eager} className={`hidden lg:block ${className}`} />
        <AdSlot id={`${id}-m`} format={mobileFormat} eager={eager} className={`lg:hidden ${className}`} />
      </>
    );
  }

  const c = creatives[format];

  return (
    <aside
      className={`${c.wrap} ${className}`}
      data-ad-slot={id}
      data-ad-format={format}
      aria-label="Contenuto pubblicitario"
    >
      <p className="font-sans mb-1 text-[0.55rem] uppercase tracking-[0.25em] text-muted-foreground">
        Pubblicità
      </p>
      <a
        href={AD_HREF}
        target="_blank"
        // sponsored: segnala a Google che è un link pubblicitario e non
        // trasferisce PageRank, come richiesto per i contenuti a pagamento.
        rel="sponsored noopener noreferrer"
        className="block overflow-hidden rounded-sm border border-border transition-opacity hover:opacity-90"
      >
        <img
          src={c.src}
          alt={c.alt}
          width={c.w}
          height={c.h}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          className="block h-auto w-full"
          style={{ aspectRatio: `${c.w} / ${c.h}` }}
        />
      </a>
    </aside>
  );
}
