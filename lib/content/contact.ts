import "server-only";

import { sanityFetch } from "@/lib/sanity/fetch";
import { contactPageQuery } from "@/lib/sanity/queries";
import {
  CONTACT_PRODUCT_TYPES,
  CONTACT_QUANTITY_BANDS,
} from "@/lib/enquiries/types";

export interface ContactLink {
  label: string;
  href: string;
}

export interface ContactMoqItem {
  product: string;
  quantity: string;
  note?: string;
}

export interface ContactMoqNotice {
  tag: string;
  heading: string;
  body: string;
  items: ContactMoqItem[];
  footnote: string;
  unsureHeading: string;
  unsureBody: string;
  unsureCtaLabel: string;
  unsureCtaHref: string;
}

export interface ContactPageContent {
  heroTag: string;
  heroHeadline: string;
  heroSubheadline: string;
  formSubjects: string[];
  formProductTypes: string[];
  formQuantityBands: string[];
  sidebarHeading: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  officeLocation: string;
  responseTime: string;
  responseTimeDetail: string;
  quickLinks: ContactLink[];
  moqNotice: ContactMoqNotice;
}

export const fallbackContactPageContent: ContactPageContent = {
  heroTag: "Get in touch",
  heroHeadline: "Let's talk|packaging",
  heroSubheadline:
    "We'd love to hear about your packaging project.",
  formSubjects: [
    "New packaging project",
    "Pricing enquiry",
    "Samples request",
    "Existing order query",
    "Partnership opportunity",
    "General question",
  ],
  formProductTypes: [...CONTACT_PRODUCT_TYPES],
  formQuantityBands: [...CONTACT_QUANTITY_BANDS],
  sidebarHeading: "Prefer to reach out directly?",
  email: "hello@suppliedpackaging.com",
  phone: "+442033553676",
  phoneDisplay: "+44 (0) 20 3355 3676",
  officeLocation: "London / Warsaw",
  responseTime: "Typically reply within 2 hours",
  responseTimeDetail:
    "Mon–Fri, 9am–6pm GMT. Urgent requests are flagged to the team immediately.",
  quickLinks: [
    { label: "Browse our products", href: "/products" },
    { label: "See client stories", href: "/client-stories" },
    { label: "Knowledge Hub", href: "/knowledge-hub" },
    { label: "Become a partner", href: "/partnerships" },
  ],
  moqNotice: {
    tag: "A note on volumes",
    heading: "",
    body: "We'd love to work with you on your packaging — please bear in mind the minimum order quantities below, and whether we'd be a fit for your project.",
    items: [
      {
        product: "Mailer boxes",
        quantity: "1,000–3,000",
        note: "Larger formats from 1,000; smaller sizes from 3,000",
      },
      { product: "Rigid boxes", quantity: "500+" },
      { product: "Shipping boxes", quantity: "1,000+" },
      { product: "Paper mailers", quantity: "1,000+" },
      { product: "Cartonboard boxes", quantity: "1,000+" },
      { product: "Advent calendars", quantity: "250+" },
      { product: "Tissue paper", quantity: "5,000 sheets" },
    ],
    footnote:
      "Other formats such as paper tubes, inserts, labels, pouches, and paper tape typically start from 1,000 units (72 rolls for tape).",
    unsureHeading: "Not sure if we'd be a fit?",
    unsureBody: "If you're unsure whether we'd be a fit,",
    unsureCtaLabel: "ask our Knowledge Hub AI first",
    unsureCtaHref: "/knowledge-hub",
  },
};

// ── Sanity document shape ────────────────────────────────────

interface SanityContactLink {
  label?: string | null;
  href?: string | null;
}

interface SanityContactPageDoc {
  hero?: {
    tag?: string | null;
    headline?: string | null;
    subheadline?: string | null;
  } | null;
  form?: {
    subjects?: unknown;
    productTypes?: unknown;
    quantityBands?: unknown;
  } | null;
  sidebar?: {
    heading?: string | null;
    email?: string | null;
    phone?: string | null;
    phoneDisplay?: string | null;
    officeLocation?: string | null;
    responseTime?: string | null;
    responseTimeDetail?: string | null;
    quickLinks?: unknown;
  } | null;
  moqNotice?: {
    tag?: string | null;
    heading?: string | null;
    body?: string | null;
    items?: unknown;
    footnote?: string | null;
    unsureHeading?: string | null;
    unsureBody?: string | null;
    unsureCtaLabel?: string | null;
    unsureCtaHref?: string | null;
  } | null;
}

// ── Helpers ──────────────────────────────────────────────────

function readString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function mapStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => readString(item))
    .filter((item): item is string => Boolean(item));
}

function mapMoqItems(value: unknown): ContactMoqItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return undefined;
      const moq = item as { product?: string | null; quantity?: string | null; note?: string | null };
      const product = readString(moq.product);
      const quantity = readString(moq.quantity);
      const note = readString(moq.note);
      if (!product || !quantity) return undefined;
      const mapped: ContactMoqItem = { product, quantity };
      if (note) mapped.note = note;
      return mapped;
    })
    .filter((item): item is ContactMoqItem => Boolean(item));
}

function mapLinks(value: unknown): ContactLink[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return undefined;
      const link = item as SanityContactLink;
      const label = readString(link.label);
      const href = readString(link.href);
      if (!label || !href) return undefined;
      return { label, href };
    })
    .filter((item): item is ContactLink => Boolean(item));
}

// ── Mapper ───────────────────────────────────────────────────

function mapContactPage(doc: SanityContactPageDoc | null): ContactPageContent {
  if (!doc) return fallbackContactPageContent;

  const fb = fallbackContactPageContent;
  const formSubjects = mapStringArray(doc.form?.subjects);
  const formProductTypes = mapStringArray(doc.form?.productTypes);
  const formQuantityBands = mapStringArray(doc.form?.quantityBands);
  const quickLinks = mapLinks(doc.sidebar?.quickLinks);
  const moqItems = mapMoqItems(doc.moqNotice?.items);
  const fbMoq = fb.moqNotice;

  return {
    heroTag: readString(doc.hero?.tag) ?? fb.heroTag,
    heroHeadline: readString(doc.hero?.headline) ?? fb.heroHeadline,
    heroSubheadline: readString(doc.hero?.subheadline) ?? fb.heroSubheadline,
    formSubjects: formSubjects.length > 0 ? formSubjects : fb.formSubjects,
    formProductTypes:
      formProductTypes.length > 0 ? formProductTypes : fb.formProductTypes,
    formQuantityBands:
      formQuantityBands.length > 0 ? formQuantityBands : fb.formQuantityBands,
    sidebarHeading: readString(doc.sidebar?.heading) ?? fb.sidebarHeading,
    email: readString(doc.sidebar?.email) ?? fb.email,
    phone: readString(doc.sidebar?.phone) ?? fb.phone,
    phoneDisplay: readString(doc.sidebar?.phoneDisplay) ?? fb.phoneDisplay,
    officeLocation: readString(doc.sidebar?.officeLocation) ?? fb.officeLocation,
    responseTime: readString(doc.sidebar?.responseTime) ?? fb.responseTime,
    responseTimeDetail: readString(doc.sidebar?.responseTimeDetail) ?? fb.responseTimeDetail,
    quickLinks: quickLinks.length > 0 ? quickLinks : fb.quickLinks,
    moqNotice: {
      tag: readString(doc.moqNotice?.tag) ?? fbMoq.tag,
      heading: readString(doc.moqNotice?.heading) ?? fbMoq.heading,
      body: readString(doc.moqNotice?.body) ?? fbMoq.body,
      items: moqItems.length > 0 ? moqItems : fbMoq.items,
      footnote: readString(doc.moqNotice?.footnote) ?? fbMoq.footnote,
      unsureHeading: readString(doc.moqNotice?.unsureHeading) ?? fbMoq.unsureHeading,
      unsureBody: readString(doc.moqNotice?.unsureBody) ?? fbMoq.unsureBody,
      unsureCtaLabel: readString(doc.moqNotice?.unsureCtaLabel) ?? fbMoq.unsureCtaLabel,
      unsureCtaHref: readString(doc.moqNotice?.unsureCtaHref) ?? fbMoq.unsureCtaHref,
    },
  };
}

export async function getContactPageContent(): Promise<ContactPageContent> {
  try {
    const doc = await sanityFetch<SanityContactPageDoc | null>({
      query: contactPageQuery,
      tags: ["contact"],
    });

    return mapContactPage(doc);
  } catch {
    return fallbackContactPageContent;
  }
}
