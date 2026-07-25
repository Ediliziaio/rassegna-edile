/**
 * Visual editoriale per articolo: copertina WebP dedicata (per slug),
 * con fallback all'immagine di categoria.
 * - width/height espliciti + aspect-ratio → nessun layout shift (CLS = 0)
 * - lazy-load nativo su tutte le immagini tranne la LCP (priority)
 * - alt descrittivo con keyword fornito dal data model (heroAlt)
 */
export default function ArticleVisual({
  category,
  slug,
  title,
  className = "",
  priority = false,
}: {
  category: string;
  slug?: string;
  title: string;
  className?: string;
  priority?: boolean;
}) {
  const src = slug ? `/images/articles/${slug}.webp` : `/images/${category}.webp`;
  return (
    <div
      className={`relative aspect-[16/9] w-full overflow-hidden bg-muted ${className}`}
    >
      <img
        src={src}
        alt={title}
        width={1200}
        height={630}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      />
    </div>
  );
}
