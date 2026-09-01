interface AdSlotProps {
  id: string;
  format: "leaderboard" | "rectangle" | "infeed" | "anchor";
  className?: string;
}

const dims: Record<string, string> = {
  leaderboard: "h-[90px] w-full max-w-[728px]",
  rectangle: "h-[250px] w-[300px]",
  infeed: "h-[132px] w-full",
  anchor: "h-[60px] w-full",
};

/**
 * Slot pubblicitario.
 *
 * ADS_ENABLED = false → non renderizza nulla: finché non è collegato un
 * circuito reale (AdSense / Ad Manager) mostrare riquadri vuoti con la scritta
 * "Pubblicità" fa apparire il sito incompiuto agli utenti e ai quality rater.
 *
 * Per attivare la monetizzazione: portare ADS_ENABLED a true e sostituire il
 * placeholder con il tag dell'ad unit, mantenendo il wrapper a dimensione fissa
 * (lo spazio resta riservato prima del caricamento → nessun layout shift).
 */
export const ADS_ENABLED = false;

export default function AdSlot({ id, format, className = "" }: AdSlotProps) {
  if (!ADS_ENABLED) return null;

  return (
    <div
      className={`flex items-center justify-center overflow-hidden border border-dashed border-border bg-muted/40 ${dims[format]} ${className}`}
      data-ad-slot={id}
      data-ad-format={format}
      role="complementary"
      aria-label="Spazio pubblicitario"
    >
      <span className="font-sans text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground">
        Pubblicità
      </span>
    </div>
  );
}
