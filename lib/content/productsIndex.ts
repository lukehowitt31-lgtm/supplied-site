import "server-only";

import { sanityFetch } from "@/lib/sanity/fetch";
import { productsIndexPageQuery } from "@/lib/sanity/queries";

export interface ProductsIndexCtaLink {
  label: string;
  href: string;
}

export interface ProductsIndexPageContent {
  hero: {
    tag: string;
    headline: string;
    subheadline: string;
  };
  cta: {
    heading: string;
    body: string;
    primaryCta: ProductsIndexCtaLink;
  };
}

export const fallbackProductsIndexPageContent: ProductsIndexPageContent = {
  hero: {
    tag: "Our Products",
    headline: "Every material, every format.|Sourced for you.",
    subheadline:
      "Explore our range of sustainable packaging solutions. From custom mailers to premium rigid boxes, we manage the entire supply chain.",
  },
  cta: {
    heading: "Ready to upgrade your packaging?",
    body: "Let's talk about how Supplied can become your end-to-end partner — saving time, money, and the headache.",
    primaryCta: {
      label: "Start a Project",
      href: "/contact-us",
    },
  },
};

// ── Sanity document shape ────────────────────────────────────

interface SanityLinkItem {
  label?: string | null;
  href?: string | null;
}

interface SanityProductsIndexPageDoc {
  hero?: {
    tag?: string | null;
    headline?: string | null;
    subheadline?: string | null;
  } | null;
  cta?: {
    heading?: string | null;
    body?: string | null;
    primaryCta?: SanityLinkItem | null;
  } | null;
}

// ── Helpers ──────────────────────────────────────────────────

function readString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

// ── Mapper ───────────────────────────────────────────────────

function mapProductsIndexPage(
  doc: SanityProductsIndexPageDoc | null
): ProductsIndexPageContent {
  if (!doc) return fallbackProductsIndexPageContent;

  const fb = fallbackProductsIndexPageContent;

  return {
    hero: {
      tag: readString(doc.hero?.tag) ?? fb.hero.tag,
      headline: readString(doc.hero?.headline) ?? fb.hero.headline,
      subheadline: readString(doc.hero?.subheadline) ?? fb.hero.subheadline,
    },
    cta: {
      heading: readString(doc.cta?.heading) ?? fb.cta.heading,
      body: readString(doc.cta?.body) ?? fb.cta.body,
      primaryCta: {
        label:
          readString(doc.cta?.primaryCta?.label) ?? fb.cta.primaryCta.label,
        href: readString(doc.cta?.primaryCta?.href) ?? fb.cta.primaryCta.href,
      },
    },
  };
}

export async function getProductsIndexPageContent(): Promise<ProductsIndexPageContent> {
  try {
    const doc = await sanityFetch<SanityProductsIndexPageDoc | null>({
      query: productsIndexPageQuery,
      tags: ["productsIndex"],
    });

    return mapProductsIndexPage(doc);
  } catch {
    return fallbackProductsIndexPageContent;
  }
}
