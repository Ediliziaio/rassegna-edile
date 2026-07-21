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
}

export interface Author {
  name: string;
  role: string;
  bio: string;
}
