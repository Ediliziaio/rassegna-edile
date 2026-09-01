export interface ArticleSection {
  id: string;
  h2: string;
  paragraphs?: string[];
  list?: string[];
  table?: { headers: string[]; rows: string[][] };
  subsections?: { h3: string; paragraphs: string[] }[];
}

export interface ArticleFaq {
  q: string;
  a: string;
}

export interface Article {
  slug: string;
  category: string; // category slug
  title: string;
  metaTitle: string; // <= 60 chars
  metaDescription: string; // <= 155 chars
  primaryKeyword: string;
  answerBox: string; // 40-60 parole, risposta auto-conclusiva (AEO)
  author: string;
  authorRole: string;
  publishedAt: string; // ISO date
  updatedAt: string; // ISO date
  heroAlt: string; // alt descrittivo con keyword
  pillar?: boolean;
  sections: ArticleSection[];
  faq: ArticleFaq[];
  related: string[]; // slugs
  tags: string[];
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  /** Panoramica editoriale della sezione: contenuto originale della pagina hub. */
  intro?: string[];
  /** Sotto-temi coperti dalla sezione, con spiegazione sintetica. */
  covers?: { title: string; text: string }[];
  /** Domande frequenti di sezione (alimentano FAQPage sulla pagina hub). */
  faq?: { q: string; a: string }[];
}

export interface Author {
  name: string;
  role: string;
  bio: string;
  /**
   * Profili pubblici verificabili della persona (LinkedIn, albo professionale,
   * sito personale, profilo X…). Alimentano `sameAs` nello schema Person: è il
   * segnale con cui Google collega la firma a un'identità reale — determinante
   * sui contenuti YMYL (fisco, incentivi, normative).
   * Inserire SOLO URL reali e appartenenti alla persona.
   */
  sameAs?: string[];
  /** Es. "Ordine degli Ingegneri di Milano, n. 12345" — solo se verificabile. */
  credential?: string;
  /** Email pubblica della persona, se esiste (es. nome@rassegnaedile.it). */
  email?: string;
}
