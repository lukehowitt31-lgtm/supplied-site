import "server-only";

import { sanityFetch } from "@/lib/sanity/fetch";
import { knowledgeHubPageQuery } from "@/lib/sanity/queries";
import {
  fallbackKnowledgeHubContent,
  type KnowledgeHubCategory,
  type KnowledgeHubFaq,
  type KnowledgeHubPageContent,
} from "@/lib/content/knowledgeHub";

interface SanityFaq {
  q?: string | null;
  a?: string | null;
}

interface SanityFaqCategory {
  id?: string | null;
  label?: string | null;
  icon?: string | null;
  color?: string | null;
  bg?: string | null;
  faqs?: unknown;
}

interface SanityKnowledgeHubDoc {
  heroHeadline?: string | null;
  heroSubheadline?: string | null;
  contactCtaHeading?: string | null;
  contactCtaBody?: string | null;
  contactEmail?: string | null;
  faqCategories?: unknown;
}

function readString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function mapFaqs(value: unknown): KnowledgeHubFaq[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return undefined;
      const record = item as SanityFaq;
      const q = readString(record.q);
      const a = readString(record.a);
      if (!q || !a) return undefined;
      return { q, a };
    })
    .filter((item): item is KnowledgeHubFaq => Boolean(item));
}

function mapCategories(value: unknown): KnowledgeHubCategory[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return undefined;
      const record = item as SanityFaqCategory;
      const id = readString(record.id);
      const label = readString(record.label);
      const icon = readString(record.icon);
      const color = readString(record.color);
      const bg = readString(record.bg);
      const faqs = mapFaqs(record.faqs);
      if (!id || !label) return undefined;
      return {
        id,
        label,
        icon: icon ?? "❓",
        color: color ?? "#C8773E",
        bg: bg ?? "#F5EDE4",
        faqs,
      };
    })
    .filter((item): item is KnowledgeHubCategory => Boolean(item));
}

function mapKnowledgeHubPage(
  doc: SanityKnowledgeHubDoc | null
): KnowledgeHubPageContent {
  if (!doc) return fallbackKnowledgeHubContent;

  const categories = mapCategories(doc.faqCategories);

  return {
    heroHeadline:
      readString(doc.heroHeadline) ?? fallbackKnowledgeHubContent.heroHeadline,
    heroSubheadline:
      readString(doc.heroSubheadline) ??
      fallbackKnowledgeHubContent.heroSubheadline,
    contactCtaHeading:
      readString(doc.contactCtaHeading) ?? fallbackKnowledgeHubContent.contactCtaHeading,
    contactCtaBody:
      readString(doc.contactCtaBody) ?? fallbackKnowledgeHubContent.contactCtaBody,
    contactEmail:
      readString(doc.contactEmail) ?? fallbackKnowledgeHubContent.contactEmail,
    faqCategories:
      categories.length > 0
        ? categories
        : fallbackKnowledgeHubContent.faqCategories,
  };
}

export async function getKnowledgeHubContent(): Promise<KnowledgeHubPageContent> {
  try {
    const doc = await sanityFetch<SanityKnowledgeHubDoc | null>({
      query: knowledgeHubPageQuery,
      tags: ["knowledgeHub"],
    });
    return mapKnowledgeHubPage(doc);
  } catch {
    return fallbackKnowledgeHubContent;
  }
}
