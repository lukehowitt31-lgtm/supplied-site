import React from "react";

interface ProductTerm {
  slug: string;
  phrases: string[];
}

const PRODUCT_TERMS: ProductTerm[] = [
  {
    slug: "mailer-boxes",
    phrases: [
      "mailer boxes",
      "mailer box",
      "ecommerce mailer boxes",
      "ecommerce mailer box",
    ],
  },
  {
    slug: "rigid-boxes",
    phrases: [
      "rigid gift boxes",
      "rigid boxes",
      "rigid box",
    ],
  },
  {
    slug: "shipping-boxes",
    phrases: [
      "shipping boxes",
      "shipping box",
    ],
  },
  {
    slug: "paper-mailers",
    phrases: [
      "paper mailers",
      "paper mailer",
    ],
  },
  {
    slug: "tissue-paper",
    phrases: ["tissue paper"],
  },
  {
    slug: "packing-tape",
    phrases: [
      "paper tape",
      "packing tape",
    ],
  },
  {
    slug: "printed-cans",
    phrases: [
      "printed cans",
      "printed aluminium cans",
      "aluminium cans",
    ],
  },
  {
    slug: "advent-calendars",
    phrases: [
      "advent calendars",
      "advent calendar",
    ],
  },
  {
    slug: "cartonboard-boxes",
    phrases: [
      "cartonboard boxes",
      "cartonboard box",
    ],
  },
  {
    slug: "printed-tubes",
    phrases: [
      "paper tubes",
      "paper tube",
      "printed tubes",
    ],
  },
];

interface MatchEntry {
  phrase: string;
  slug: string;
  index: number;
  length: number;
}

/**
 * Scans plain text for product-name mentions and returns React nodes
 * where the first occurrence of each product is wrapped in an <a> tag.
 *
 * @param text      The plain-text string to scan.
 * @param excludeSlug  Optional product slug to skip (use on its own product page).
 */
export function linkifyProducts(
  text: string,
  excludeSlug?: string
): React.ReactNode {
  const terms = excludeSlug
    ? PRODUCT_TERMS.filter((t) => t.slug !== excludeSlug)
    : PRODUCT_TERMS;

  const lower = text.toLowerCase();
  const matches: MatchEntry[] = [];
  const linkedSlugs = new Set<string>();

  for (const term of terms) {
    for (const phrase of term.phrases) {
      if (linkedSlugs.has(term.slug)) break;

      const idx = lower.indexOf(phrase.toLowerCase());
      if (idx === -1) continue;

      const before = idx > 0 ? lower[idx - 1] : " ";
      const after =
        idx + phrase.length < lower.length
          ? lower[idx + phrase.length]
          : " ";

      const wordBoundary = /[\s,.:;!?()—–\-/'"]/;
      if (!wordBoundary.test(before) || !wordBoundary.test(after)) continue;

      matches.push({
        phrase,
        slug: term.slug,
        index: idx,
        length: phrase.length,
      });
      linkedSlugs.add(term.slug);
      break;
    }
  }

  if (matches.length === 0) return text;

  matches.sort((a, b) => a.index - b.index);

  // Remove overlapping matches (keep earlier ones)
  const cleaned: MatchEntry[] = [];
  let lastEnd = 0;
  for (const m of matches) {
    if (m.index >= lastEnd) {
      cleaned.push(m);
      lastEnd = m.index + m.length;
    }
  }

  const parts: React.ReactNode[] = [];
  let cursor = 0;

  for (const match of cleaned) {
    if (match.index > cursor) {
      parts.push(text.slice(cursor, match.index));
    }
    const originalText = text.slice(match.index, match.index + match.length);
    parts.push(
      <a
        key={`${match.slug}-${match.index}`}
        href={`/products/${match.slug}`}
        className="text-supplied-amber hover:underline"
      >
        {originalText}
      </a>
    );
    cursor = match.index + match.length;
  }

  if (cursor < text.length) {
    parts.push(text.slice(cursor));
  }

  return <>{parts}</>;
}
