import "server-only";

import { sanityFetch } from "@/lib/sanity/fetch";
import { costAuditPageQuery } from "@/lib/sanity/queries";

export type CostAuditIconId =
  | "benchmark"
  | "map"
  | "compliance"
  | "redesign"
  | "spec"
  | "suppliers"
  | "invoice"
  | "submit"
  | "email"
  | "call"
  | "savings"
  | "clock"
  | "lock"
  | "lightbulb";

export interface CostAuditItem {
  title: string;
  body: string;
  icon?: CostAuditIconId;
}

export interface CostAuditStep {
  stepNumber: string;
  title: string;
  body: string;
  icon?: CostAuditIconId;
}

export interface CostAuditImage {
  src: string;
  alt: string;
}

export interface CostAuditQuickFact {
  value: string;
  label: string;
}

export interface CostAuditFaq {
  question: string;
  answer: string;
}

export interface CostAuditLogo {
  name: string;
  src: string;
}

export interface CostAuditLink {
  label: string;
  href: string;
}

export interface CostAuditPageContent {
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    primaryCtaLabel: string;
    secondaryCtaText: string;
    image?: CostAuditImage;
    quickFacts: CostAuditQuickFact[];
  };
  whatYouGet: {
    heading: string;
    intro: string;
    items: CostAuditItem[];
    previewImage?: CostAuditImage;
    previewCaption?: string;
  };
  whatWeNeed: {
    heading: string;
    intro: string;
    items: CostAuditItem[];
    closingLine: string;
  };
  howItWorks: {
    heading: string;
    intro: string;
    steps: CostAuditStep[];
  };
  faq: {
    heading: string;
    items: CostAuditFaq[];
  };
  socialProof: {
    heading: string;
    logos: CostAuditLogo[];
    showPullQuote: boolean;
    pullQuoteText: string;
    pullQuoteName: string;
    pullQuoteRole: string;
    pullQuoteBrand: string;
  };
  requestForm: {
    heading: string;
    sub: string;
    submitLabel: string;
    privacyFootnote: string;
  };
  footerCta: {
    heading: string;
    sub: string;
    cta: CostAuditLink;
  };
  seo: {
    title: string;
    description: string;
    ogImage?: string;
  };
}

export const fallbackCostAuditPageContent: CostAuditPageContent = {
  hero: {
    eyebrow: "Free packaging cost audit",
    headline: "Find the [[15–25%]] hiding in your packaging spend.",
    subheadline:
      "A confidential two-week benchmark of your current packaging — invoices, suppliers, materials and all — written by the team that runs packaging for consumer brands doing £5m–£100m+. No pitch deck. No obligation. No follow-up unless you ask for one.",
    primaryCtaLabel: "Request your audit",
    secondaryCtaText:
      "Most clients find a saving they didn't know was there. A clean bill of health is also a valid outcome.",
    image: undefined,
    quickFacts: [
      { value: "2 weeks", label: "Turnaround" },
      { value: "Free", label: "No obligation" },
      { value: "8–12 pages", label: "Written report" },
      { value: "NDA", label: "On request" },
    ],
  },
  whatYouGet: {
    heading: "Not a pitch deck. [[A working document]].",
    intro:
      "A written benchmark, prepared by our sourcing team, specific to your current setup. Built to be useful whether or not you ever become a client.",
    previewImage: undefined,
    previewCaption: "An 8–12 page PDF, delivered over email.",
    items: [
      {
        title: "Per-format price benchmark",
        body: "How your current unit costs compare to the live market, format by format, at your real volumes — not list prices.",
        icon: "benchmark",
      },
      {
        title: "Supply-chain map",
        body: "Where your current production sits across UK, EU and Asia — and where geography, lead time or MOQ might be working against you.",
        icon: "map",
      },
      {
        title: "Compliance check",
        body: "Whether your current materials, certifications and specs are aligned with current and incoming PPWR, EPR and FSC requirements.",
        icon: "compliance",
      },
      {
        title: "Redesign outline",
        body: "If we'd build it differently, what that looks like — material, format, geography and projected saving. Written as an option, not a pitch.",
        icon: "redesign",
      },
    ],
  },
  whatWeNeed: {
    heading: "What we need [[from you]].",
    intro:
      "Minimal. Two weeks on our side, about an hour on yours. Three things, all of which you already have.",
    items: [
      {
        title: "Current spec sheets",
        body: "Dielines, materials, print specs for your core packaging formats.",
        icon: "spec",
      },
      {
        title: "Your supplier list",
        body: "Who you're working with, for what, and at what volumes.",
        icon: "suppliers",
      },
      {
        title: "Recent packaging invoices",
        body: "One quarter is enough. We need real numbers, not quotes.",
        icon: "invoice",
      },
    ],
    closingLine:
      "Everything stays confidential. NDAs available on request. We never contact your suppliers, and we never share your data outside our sourcing team.",
  },
  howItWorks: {
    heading: "How the audit [[works]].",
    intro: "Four steps. Roughly two weeks end to end.",
    steps: [
      {
        stepNumber: "01",
        title: "You submit",
        body: "Spec sheets, supplier list, recent invoices. 20–30 minutes to pull together.",
        icon: "submit",
      },
      {
        stepNumber: "02",
        title: "We benchmark",
        body: "Our sourcing team models your current spend against comparable production routes. 7–10 working days.",
        icon: "benchmark",
      },
      {
        stepNumber: "03",
        title: "You receive the report",
        body: "A written benchmark document, delivered over email. Usually 8–12 pages of real numbers and recommendations.",
        icon: "email",
      },
      {
        stepNumber: "04",
        title: "Optional follow-up call",
        body: "30 minutes to walk through the findings together. Only if you want it — if you don't book it, we won't chase.",
        icon: "call",
      },
    ],
  },
  faq: {
    heading: "Questions [[we get asked]].",
    items: [
      {
        question: "Is it really free?",
        answer:
          "Yes. We absorb the cost because nine times out of ten the report starts a conversation on its own. If we're the right partner for you, you'll know. If we're not, you've got a confidential benchmark of your spend to use how you like.",
      },
      {
        question: "Will I be spammed or chased?",
        answer:
          "No. One follow-up email two weeks after we send the report to check it landed. After that, silence unless you reply.",
      },
      {
        question: "Will you contact my existing suppliers?",
        answer:
          "No. The audit is done entirely from the spec sheets and invoices you send us. Your current supplier relationships are not affected, and nothing we do is visible to them.",
      },
      {
        question: "What happens to my data?",
        answer:
          "It stays inside our sourcing team. We don't share data between client accounts, we don't use your numbers as benchmarks in other audits without written permission, and we'll sign an NDA on request before you send anything.",
      },
      {
        question: "What if my current setup is already competitive?",
        answer:
          "Then we'll tell you. A clean bill of health is a valid outcome of this audit — and a useful thing to have in your back pocket next time you re-tender. We've sent audits back saying \"don't change anything\" before.",
      },
      {
        question: "Who actually does the audit?",
        answer:
          "Our sourcing and strategy team — the same people who run packaging for our clients. Not a junior, not an outsourced benchmarking service, not an AI-generated report. Written by humans who do this every day.",
      },
      {
        question: "What size brand is this aimed at?",
        answer:
          "Brands doing roughly £5m+ in revenue with multiple packaging SKUs across multiple formats. Smaller than that and the audit is usually overkill — we'd point you toward simpler benchmarking tools.",
      },
    ],
  },
  socialProof: {
    heading: "Trusted by consumer brands running [[serious volume]].",
    logos: [
      { name: "Wild", src: "/images/logos/wild.webp" },
      { name: "TRIP", src: "/images/logos/trip.svg" },
      { name: "Healf", src: "/images/logos/healf.svg" },
      { name: "Glaize", src: "/images/logos/glaize.svg" },
      { name: "SURI", src: "/images/logos/suri.webp" },
      { name: "Spacegoods", src: "/images/logos/spacegoods.svg" },
      { name: "Polestar", src: "/images/logos/polestar.svg" },
      { name: "Lumity", src: "/images/logos/lumity.svg" },
    ],
    showPullQuote: false,
    pullQuoteText:
      "The audit Supplied sent back was the most useful document we'd had on packaging in two years. It paid for itself before we even became a client.",
    pullQuoteName: "",
    pullQuoteRole: "",
    pullQuoteBrand: "",
  },
  requestForm: {
    heading: "Request your [[audit]].",
    sub: "Fill in the short form below. We'll come back to you within one working day to confirm what we need and set a timeline.",
    submitLabel: "Request audit",
    privacyFootnote:
      "By submitting this form, you consent to Supplied contacting you about your audit. We don't share your data, and we don't send marketing emails unless you opt in separately.",
  },
  footerCta: {
    heading: "Not ready to share invoices [[yet]]?",
    sub: "Fair. Book a no-pressure 20-minute call first and we'll walk you through what a typical audit looks like, and whether it's worth pursuing for your setup.",
    cta: {
      label: "Book a call",
      href: "/contact-us?subject=audit-intro",
    },
  },
  seo: {
    title: "Packaging Cost Audit | Supplied",
    description:
      "A confidential two-week benchmark of your current packaging setup. Most consumer brands find 15–25% of savings they didn't know were there. No pitch, no obligation.",
    ogImage: undefined,
  },
};

interface SanityLink {
  label?: string | null;
  href?: string | null;
}

interface SanityImageField {
  src?: string | null;
  alt?: string | null;
}

interface SanityQuickFact {
  value?: string | null;
  label?: string | null;
}

interface SanityCostAuditDoc {
  hero?: {
    eyebrow?: string | null;
    headline?: string | null;
    subheadline?: string | null;
    primaryCtaLabel?: string | null;
    secondaryCtaText?: string | null;
    image?: SanityImageField | null;
    quickFacts?: unknown;
  } | null;
  whatYouGet?: {
    heading?: string | null;
    intro?: string | null;
    items?: unknown;
    previewImage?: SanityImageField | null;
    previewCaption?: string | null;
  } | null;
  whatWeNeed?: {
    heading?: string | null;
    intro?: string | null;
    items?: unknown;
    closingLine?: string | null;
  } | null;
  howItWorks?: {
    heading?: string | null;
    intro?: string | null;
    steps?: unknown;
  } | null;
  faq?: {
    heading?: string | null;
    items?: unknown;
  } | null;
  socialProof?: {
    heading?: string | null;
    logos?: unknown;
    showPullQuote?: boolean | null;
    pullQuoteText?: string | null;
    pullQuoteName?: string | null;
    pullQuoteRole?: string | null;
    pullQuoteBrand?: string | null;
  } | null;
  requestForm?: {
    heading?: string | null;
    sub?: string | null;
    submitLabel?: string | null;
    privacyFootnote?: string | null;
  } | null;
  footerCta?: {
    heading?: string | null;
    sub?: string | null;
    cta?: SanityLink | null;
  } | null;
  seo?: {
    title?: string | null;
    description?: string | null;
    ogImage?: string | null;
  } | null;
}

function readString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  return value.trim().length > 0 ? value : undefined;
}

const stegaCharPattern = /[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g;

function readSafe(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.replace(stegaCharPattern, "").trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

const VALID_ICONS: ReadonlySet<string> = new Set<CostAuditIconId>([
  "benchmark",
  "map",
  "compliance",
  "redesign",
  "spec",
  "suppliers",
  "invoice",
  "submit",
  "email",
  "call",
  "savings",
  "clock",
  "lock",
  "lightbulb",
]);

function readIcon(value: unknown): CostAuditIconId | undefined {
  if (typeof value !== "string") return undefined;
  return VALID_ICONS.has(value) ? (value as CostAuditIconId) : undefined;
}

function mapItems(value: unknown, fallbackItems: CostAuditItem[]): CostAuditItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item, idx): CostAuditItem | undefined => {
      if (!item || typeof item !== "object") return undefined;
      const record = item as {
        title?: unknown;
        body?: unknown;
        icon?: unknown;
      };
      const title = readString(record.title);
      const body = readString(record.body);
      if (!title || !body) return undefined;
      const icon = readIcon(record.icon) ?? fallbackItems[idx]?.icon;
      return { title, body, icon };
    })
    .filter((item): item is CostAuditItem => Boolean(item));
}

function mapSteps(value: unknown, fallbackSteps: CostAuditStep[]): CostAuditStep[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item, index): CostAuditStep | undefined => {
      if (!item || typeof item !== "object") return undefined;
      const record = item as {
        stepNumber?: unknown;
        title?: unknown;
        body?: unknown;
        icon?: unknown;
      };
      const title = readString(record.title);
      const body = readString(record.body);
      if (!title || !body) return undefined;
      const stepNumber =
        readString(record.stepNumber) ?? String(index + 1).padStart(2, "0");
      const icon = readIcon(record.icon) ?? fallbackSteps[index]?.icon;
      return { stepNumber, title, body, icon };
    })
    .filter((item): item is CostAuditStep => Boolean(item));
}

function mapImage(
  value: SanityImageField | null | undefined
): CostAuditImage | undefined {
  const src = readSafe(value?.src);
  if (!src) return undefined;
  const alt = readString(value?.alt) ?? "";
  return { src, alt };
}

function mapQuickFacts(
  value: unknown,
  fallback: CostAuditQuickFact[]
): CostAuditQuickFact[] {
  if (!Array.isArray(value)) return fallback;
  const mapped = value
    .map((item): CostAuditQuickFact | undefined => {
      if (!item || typeof item !== "object") return undefined;
      const record = item as SanityQuickFact;
      const v = readString(record.value);
      const l = readString(record.label);
      if (!v || !l) return undefined;
      return { value: v, label: l };
    })
    .filter((item): item is CostAuditQuickFact => Boolean(item));
  return mapped.length > 0 ? mapped : fallback;
}

function mapFaqs(value: unknown): CostAuditFaq[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return undefined;
      const record = item as { question?: unknown; answer?: unknown };
      const question = readString(record.question);
      const answer = readString(record.answer);
      if (!question || !answer) return undefined;
      return { question, answer };
    })
    .filter((item): item is CostAuditFaq => Boolean(item));
}

function mapLogos(value: unknown): CostAuditLogo[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return undefined;
      const record = item as { name?: unknown; src?: unknown };
      const name = readString(record.name);
      const src = readSafe(record.src);
      if (!name || !src) return undefined;
      return { name, src };
    })
    .filter((item): item is CostAuditLogo => Boolean(item));
}

function mapLink(
  value: SanityLink | null | undefined,
  fallback: CostAuditLink
): CostAuditLink {
  return {
    label: readString(value?.label) ?? fallback.label,
    href: readSafe(value?.href) ?? fallback.href,
  };
}

function mapCostAuditPage(doc: SanityCostAuditDoc | null): CostAuditPageContent {
  if (!doc) return fallbackCostAuditPageContent;
  const fallback = fallbackCostAuditPageContent;

  const items = mapItems(doc.whatYouGet?.items, fallback.whatYouGet.items);
  const needItems = mapItems(doc.whatWeNeed?.items, fallback.whatWeNeed.items);
  const steps = mapSteps(doc.howItWorks?.steps, fallback.howItWorks.steps);
  const faqs = mapFaqs(doc.faq?.items);
  const logos = mapLogos(doc.socialProof?.logos);

  return {
    hero: {
      eyebrow: readString(doc.hero?.eyebrow) ?? fallback.hero.eyebrow,
      headline: readString(doc.hero?.headline) ?? fallback.hero.headline,
      subheadline:
        readString(doc.hero?.subheadline) ?? fallback.hero.subheadline,
      primaryCtaLabel:
        readString(doc.hero?.primaryCtaLabel) ?? fallback.hero.primaryCtaLabel,
      secondaryCtaText:
        readString(doc.hero?.secondaryCtaText) ??
        fallback.hero.secondaryCtaText,
      image: mapImage(doc.hero?.image) ?? fallback.hero.image,
      quickFacts: mapQuickFacts(doc.hero?.quickFacts, fallback.hero.quickFacts),
    },
    whatYouGet: {
      heading:
        readString(doc.whatYouGet?.heading) ?? fallback.whatYouGet.heading,
      intro: readString(doc.whatYouGet?.intro) ?? fallback.whatYouGet.intro,
      items: items.length > 0 ? items : fallback.whatYouGet.items,
      previewImage:
        mapImage(doc.whatYouGet?.previewImage) ??
        fallback.whatYouGet.previewImage,
      previewCaption:
        readString(doc.whatYouGet?.previewCaption) ??
        fallback.whatYouGet.previewCaption,
    },
    whatWeNeed: {
      heading:
        readString(doc.whatWeNeed?.heading) ?? fallback.whatWeNeed.heading,
      intro: readString(doc.whatWeNeed?.intro) ?? fallback.whatWeNeed.intro,
      items: needItems.length > 0 ? needItems : fallback.whatWeNeed.items,
      closingLine:
        readString(doc.whatWeNeed?.closingLine) ??
        fallback.whatWeNeed.closingLine,
    },
    howItWorks: {
      heading:
        readString(doc.howItWorks?.heading) ?? fallback.howItWorks.heading,
      intro: readString(doc.howItWorks?.intro) ?? fallback.howItWorks.intro,
      steps: steps.length > 0 ? steps : fallback.howItWorks.steps,
    },
    faq: {
      heading: readString(doc.faq?.heading) ?? fallback.faq.heading,
      items: faqs.length > 0 ? faqs : fallback.faq.items,
    },
    socialProof: {
      heading:
        readString(doc.socialProof?.heading) ?? fallback.socialProof.heading,
      logos: logos.length > 0 ? logos : fallback.socialProof.logos,
      showPullQuote: Boolean(doc.socialProof?.showPullQuote),
      pullQuoteText:
        readString(doc.socialProof?.pullQuoteText) ??
        fallback.socialProof.pullQuoteText,
      pullQuoteName:
        readString(doc.socialProof?.pullQuoteName) ??
        fallback.socialProof.pullQuoteName,
      pullQuoteRole:
        readString(doc.socialProof?.pullQuoteRole) ??
        fallback.socialProof.pullQuoteRole,
      pullQuoteBrand:
        readString(doc.socialProof?.pullQuoteBrand) ??
        fallback.socialProof.pullQuoteBrand,
    },
    requestForm: {
      heading:
        readString(doc.requestForm?.heading) ?? fallback.requestForm.heading,
      sub: readString(doc.requestForm?.sub) ?? fallback.requestForm.sub,
      submitLabel:
        readString(doc.requestForm?.submitLabel) ??
        fallback.requestForm.submitLabel,
      privacyFootnote:
        readString(doc.requestForm?.privacyFootnote) ??
        fallback.requestForm.privacyFootnote,
    },
    footerCta: {
      heading:
        readString(doc.footerCta?.heading) ?? fallback.footerCta.heading,
      sub: readString(doc.footerCta?.sub) ?? fallback.footerCta.sub,
      cta: mapLink(doc.footerCta?.cta, fallback.footerCta.cta),
    },
    seo: {
      title: readString(doc.seo?.title) ?? fallback.seo.title,
      description: readString(doc.seo?.description) ?? fallback.seo.description,
      ogImage: readSafe(doc.seo?.ogImage) ?? fallback.seo.ogImage,
    },
  };
}

export async function getCostAuditPageContent(): Promise<CostAuditPageContent> {
  try {
    const doc = await sanityFetch<SanityCostAuditDoc | null>({
      query: costAuditPageQuery,
      tags: ["costAudit"],
    });
    return mapCostAuditPage(doc);
  } catch {
    return fallbackCostAuditPageContent;
  }
}
