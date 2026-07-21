/**
 * Visual editoriale per articolo: foto WebP next-gen del silo.
 * - width/height espliciti + aspect-ratio → nessun layout shift (CLS = 0)
 * - lazy-load nativo su tutte le immagini tranne la LCP (priority)
 * - alt descrittivo con keyword fornito dal data model (heroAlt)
 */
export default function ArticleVisual({
  category,
  title,
  className = "",
  priority = false,
}: {
  category: string;
  title: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative aspect-[16/9] w-full overflow-hidden bg-muted ${className}`}
    >
      <img
        src={`/images/${category}.webp`}
        alt={title}
        width={1600}
        height={900}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
  );
}
