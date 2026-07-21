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
 * Slot pubblicitario con dimensioni riservate: lo spazio è allocato
 * prima del caricamento degli script ads → zero layout shift (CLS ≈ 0).
 * Compatibile con Google AdSense / Ad Manager (sostituire il placeholder
 * con il tag di ad unit mantenendo il wrapper a dimensione fissa).
 */
export default function AdSlot({ id, format, className = "" }: AdSlotProps) {
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
