import "server-only";

import { sanityFetch } from "@/lib/sanity/fetch";
import { contactPageQuery } from "@/lib/sanity/queries";

export interface ContactLink {
  label: string;
  href: string;
}

export interface ContactPageContent {
  heroTag: string;
  heroHeadline: string;
  heroSubheadline: string;
  formSubjects: string[];
  sidebarHeading: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  officeLocation: string;
  responseTime: string;
  responseTimeDetail: string;
  quickLinks: ContactLink[];
}

export const fallbackContactPageContent: ContactPageContent = {
  heroTag: "Get in touch",
  heroHeadline: "Let's talk|packaging",
  heroSubheadline:
    "Whether you're exploring options or ready to start a project, we'd love to hear from you.",
  formSubjects: [
    "New packaging project",
    "Pricing enquiry",
    "Samples request",
    "Existing order query",
    "Partnership opportunity",
    "General question",
  ],
  sidebarHeading: "Prefer to reach out directly?",
  email: "help@supplied.agency",
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
  const quickLinks = mapLinks(doc.sidebar?.quickLinks);

  return {
    heroTag: readString(doc.hero?.tag) ?? fb.heroTag,
    heroHeadline: readString(doc.hero?.headline) ?? fb.heroHeadline,
    heroSubheadline: readString(doc.hero?.subheadline) ?? fb.heroSubheadline,
    formSubjects: formSubjects.length > 0 ? formSubjects : fb.formSubjects,
    sidebarHeading: readString(doc.sidebar?.heading) ?? fb.sidebarHeading,
    email: readString(doc.sidebar?.email) ?? fb.email,
    phone: readString(doc.sidebar?.phone) ?? fb.phone,
    phoneDisplay: readString(doc.sidebar?.phoneDisplay) ?? fb.phoneDisplay,
    officeLocation: readString(doc.sidebar?.officeLocation) ?? fb.officeLocation,
    responseTime: readString(doc.sidebar?.responseTime) ?? fb.responseTime,
    responseTimeDetail: readString(doc.sidebar?.responseTimeDetail) ?? fb.responseTimeDetail,
    quickLinks: quickLinks.length > 0 ? quickLinks : fb.quickLinks,
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
