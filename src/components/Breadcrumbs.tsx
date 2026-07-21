import { Link } from "react-router-dom";

export default function Breadcrumbs({
  items,
}: {
  items: { name: string; path?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="font-sans text-[0.75rem] text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-1.5">
            {i > 0 && <span aria-hidden="true" className="text-border">›</span>}
            {it.path ? (
              <Link to={it.path} className="hover:text-accent hover:underline">
                {it.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground/70">
                {it.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
