import type { ReactNode } from "react";
import type { ArticleBlock } from "@/data/types";

// Sintassi minima nei testi: [testo](https://…) · [testo](https://… "sponsored") · **grassetto**
const INLINE_RE = /\[([^\]]+)\]\((https?:\/\/[^)\s]+|\/[^)\s]*)(?:\s+"([^"]*)")?\)|\*\*(.+?)\*\*/g;

export function renderInline(text: string): ReactNode {
  INLINE_RE.lastIndex = 0;
  if (!INLINE_RE.test(text)) return text;
  INLINE_RE.lastIndex = 0;
  const parts: ReactNode[] = [];
  let last = 0;
  let key = 0;
  for (const m of text.matchAll(INLINE_RE)) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[4] !== undefined) {
      parts.push(<strong key={key++}>{m[4]}</strong>);
    } else {
      const external = m[2].startsWith("http");
      parts.push(
        <a
          key={key++}
          href={m[2]}
          {...(external
            ? { target: "_blank", rel: m[3] === "sponsored" ? "sponsored nofollow noopener noreferrer" : "noopener" }
            : {})}
          className="font-semibold text-accent underline underline-offset-2 hover:text-primary"
        >
          {m[1]}
        </a>
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

export default function SectionBlocks({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.type) {
          case "p":
            return <p key={i}>{renderInline(b.text)}</p>;
          case "h3":
            return (
              <h3 key={i} className="font-display mb-2 mt-6 text-xl font-bold text-primary">
                {b.text}
              </h3>
            );
          case "list":
            return b.ordered ? (
              <ol key={i} className="list-decimal pl-6">
                {b.items.map((li, j) => (
                  <li key={j}>{renderInline(li)}</li>
                ))}
              </ol>
            ) : (
              <ul key={i}>
                {b.items.map((li, j) => (
                  <li key={j}>{renderInline(li)}</li>
                ))}
              </ul>
            );
          case "table":
            return (
              <div key={i} className="overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      {b.headers.map((h, j) => (
                        <th key={j}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j}>
                        {r.map((cell, k) => (
                          <td key={k}>{renderInline(cell)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </>
  );
}
