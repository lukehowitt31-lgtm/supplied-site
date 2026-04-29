import "server-only";

import { sanityFetch } from "@/lib/sanity/fetch";
import { costAuditPageQuery } from "@/lib/sanity/queries";

export interface CostAuditItem {
  title: string;
  body: string;
}

export interface CostAuditStep {
  stepNumber: string;
  title: string;
  body: string;
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
  };
  whatYouGet: {
    heading: string;
    intro: string;
    items: CostAuditItem[];
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
    eyebrow: "Packaging Cost Audit",
    headline: "See where your packaging spend [[actually stands]].",
    subheadline:
      "A confidential two-week benchmark of your current packaging setup, delivered by an operational team that runs packaging for consumer brands doing £5m–£100m+. No pitch, no obligation, no follow-up unless you ask for one.",
    primaryCtaLabel: "Request your audit",
    secondaryCtaText:
      "Most clients find savings of 15–25% they didn't know were there.",
  },
  whatYouGet: {
    heading: "What you get [[back]].",
    intro:
      "Not a pitch deck. A working benchmark document, written by our sourcing team, specific to your current setup.",
    items: [
      {
        title: "A per-format price benchmark",
        body: "How your current unit costs compare to the market, format by format, at your current volumes.",
      },
      {
        title: "A supply-chain map",
        body: "Where your current setup sits across UK, EU, and Asia production, and where geography might be working against you.",
      },
      {
        title: "A compliance check",
        body: "Whether your current materials, certifications, and specs meet current and incoming PPWR, EPR, and FSC requirements.",
      },
      {
        title: "A redesign outline",
        body: "If we'd build it differently, what that looks like — material, format, geography, and projected saving. Written as an option, not a pitch.",
      },
    ],
  },
  whatWeNeed: {
    heading: "What we need [[from you]].",
    intro:
      "Minimal. Two weeks of your time on our side, about an hour of yours.",
    items: [
      {
        title: "Your current spec sheets",
        body: "Dielines, materials, print specs for your core packaging formats.",
      },
      {
        title: "Your supplier list",
        body: "Who you're currently working with, for what, and at what volumes.",
      },
      {
        title: "Your most recent packaging invoices",
        body: "One quarter is enough. We're looking for real numbers, not quotes.",
      },
    ],
    closingLine:
      "Everything stays confidential. NDAs available on request. We don't contact your suppliers, and we don't share your data with anyone outside our sourcing team.",
  },
  howItWorks: {
    heading: "How the audit [[works]].",
    intro: "Four steps, roughly two weeks end to end.",
    steps: [
      {
        stepNumber: "01",
        title: "You submit",
        body: "Spec sheets, supplier list, invoices. 20–30 minutes to pull together.",
      },
      {
        stepNumber: "02",
        title: "We benchmark",
        body: "Our sourcing team models your current spend against comparable production routes. 7–10 days.",
      },
      {
        stepNumber: "03",
        title: "You receive the report",
        body: "A written benchmark document, delivered over email. Usually 8–12 pages.",
      },
      {
        stepNumber: "04",
        title: "Optional follow-up call",
        body: "30 minutes, walk through the findings together, answer questions. Only if you want it. If you don't book it, we won't chase.",
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

interface SanityCostAuditDoc {
  hero?: {
    eyebrow?: string | null;
    headline?: string | null;
    subheadline?: string | null;
    primaryCtaLabel?: string | null;
    secondaryCtaText?: string | null;
  } | null;
  whatYouGet?: {
    heading?: string | null;
    intro?: string | null;
    items?: unknown;
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

function mapItems(value: unknown): CostAuditItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return undefined;
      const record = item as { title?: unknown; body?: unknown };
      const title = readString(record.title);
      const body = readString(record.body);
      if (!title || !body) return undefined;
      return { title, body };
    })
    .filter((item): item is CostAuditItem => Boolean(item));
}

function mapSteps(value: unknown): CostAuditStep[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item, index) => {
      if (!item || typeof item !== "object") return undefined;
      const record = item as {
        stepNumber?: unknown;
        title?: unknown;
        body?: unknown;
      };
      const title = readString(record.title);
      const body = readString(record.body);
      if (!title || !body) return undefined;
      const stepNumber =
        readString(record.stepNumber) ?? String(index + 1).padStart(2, "0");
      return { stepNumber, title, body };
    })
    .filter((item): item is CostAuditStep => Boolean(item));
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

  const items = mapItems(doc.whatYouGet?.items);
  const needItems = mapItems(doc.whatWeNeed?.items);
  const steps = mapSteps(doc.howItWorks?.steps);
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
    },
    whatYouGet: {
      heading:
        readString(doc.whatYouGet?.heading) ?? fallback.whatYouGet.heading,
      intro: readString(doc.whatYouGet?.intro) ?? fallback.whatYouGet.intro,
      items: items.length > 0 ? items : fallback.whatYouGet.items,
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
