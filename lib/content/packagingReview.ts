import "server-only";

import { sanityFetch } from "@/lib/sanity/fetch";
import { packagingReviewPageQuery } from "@/lib/sanity/queries";

export interface PackagingReviewImage {
  src: string;
  alt: string;
}

export interface PackagingReviewQuickFact {
  value: string;
  label: string;
}

export interface PackagingReviewStatement {
  title: string;
}

export interface PackagingReviewItem {
  title: string;
  body: string;
}

export interface PackagingReviewStep {
  stepNumber: string;
  title: string;
  body: string;
}

export interface PackagingReviewTestimonial {
  quote: string;
  name: string;
  role: string;
  brand: string;
  result: string;
  href: string;
}

export interface PackagingReviewStory {
  brand: string;
  result: string;
  href: string;
  image?: PackagingReviewImage;
}

export interface PackagingReviewPageContent {
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    primaryCtaLabel: string;
    riskReversal: string;
    image?: PackagingReviewImage;
    quickFacts: PackagingReviewQuickFact[];
  };
  problem: {
    eyebrow: string;
    heading: string;
    intro: string;
    items: PackagingReviewStatement[];
    closingLine: string;
  };
  outcome: {
    eyebrow: string;
    heading: string;
    intro: string;
    image?: PackagingReviewImage;
    items: PackagingReviewItem[];
  };
  howItWorks: {
    eyebrow: string;
    heading: string;
    intro: string;
    timeNote: string;
    steps: PackagingReviewStep[];
    ctaLabel: string;
  };
  difference: {
    eyebrow: string;
    heading: string;
    body: string;
    points: PackagingReviewItem[];
  };
  socialProof: {
    heading: string;
    intro: string;
    showTestimonials: boolean;
    testimonials: PackagingReviewTestimonial[];
    stories: PackagingReviewStory[];
  };
  riskReversal: {
    heading: string;
    points: string[];
    body: string;
  };
  requestForm: {
    eyebrow: string;
    heading: string;
    sub: string;
    submitLabel: string;
    privacyFootnote: string;
    successHeading: string;
    successBody: string;
  };
  seo: {
    title: string;
    description: string;
    ogImage?: string;
  };
}

export const fallbackPackagingReviewPageContent: PackagingReviewPageContent = {
  hero: {
    eyebrow: "For the person responsible for packaging",
    headline: "Get packaging off your plate — and see where you could [[save 20%+]].",
    subheadline:
      "If packaging is spread across too many suppliers, and taking more of your time than it should, there is a simpler way to run it. Start with one requirement. We'll show you whether there's a better proposition — and whether you could save 20%+.",
    primaryCtaLabel: "Review one requirement",
    riskReversal: "No fee. No contract. No obligation to move anything else.",
    image: {
      src: "/images/products/SpacegoodsSpread.webp",
      alt: "Custom packaging produced for a consumer brand",
    },
    quickFacts: [
      { value: "One", label: "Requirement to start" },
      { value: "20–30 min", label: "Of your time" },
      { value: "No fee", label: "To explore this" },
      { value: "You decide", label: "Whether to proceed" },
    ],
  },
  problem: {
    eyebrow: "The current setup",
    heading: "Does this sound [[familiar]]?",
    intro:
      "You're responsible for packaging. It keeps expanding. And nobody else is really owning it.",
    items: [
      { title: "Too many suppliers to manage." },
      { title: "Briefs and specifications that never quite stay still." },
      { title: "Pricing that's difficult to benchmark." },
      { title: "Samples and projects to coordinate." },
      { title: "No real certainty you're getting the best deal." },
    ],
    closingLine:
      "You're often too big for smaller suppliers to support properly — and not large enough for major ones to give you meaningful attention. Packaging stays on your plate, even when it shouldn't.",
  },
  outcome: {
    eyebrow: "What changes",
    heading: "What if packaging was actually [[off your plate]]?",
    intro:
      "Not a new set of suppliers to manage. One partner who takes it on — and a clearer view of what you should be paying.",
    image: {
      src: "/images/products/WildBlueMailerClose.webp",
      alt: "Finished branded mailer boxes ready to ship",
    },
    items: [
      {
        title: "One accountable partner",
        body: "All or most of your packaging, run by one team — instead of a list of people to chase.",
      },
      {
        title: "Managed from brief through to delivery",
        body: "Specs, samples, production and timelines handled for you, not handed back as another job.",
      },
      {
        title: "Expertise as an extension of your team",
        body: "Someone who already does this every day, sitting on your side of the table.",
      },
      {
        title: "The potential to save 20%+",
        body: "Often more. Not a guarantee — a realistic outcome when packaging has grown across multiple suppliers.",
      },
      {
        title: "Headspace back",
        body: "Packaging stops taking up the attention it currently does. You get time back for the rest of the business.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "How it works",
    heading: "Start with one requirement. [[That's it.]]",
    intro:
      "You don't need to move your whole packaging setup, or commit to anything. We look at one item that's causing you pain.",
    timeNote: "Usually around 20–30 minutes to give us the context we need.",
    steps: [
      {
        stepNumber: "01",
        title: "Pick one packaging requirement",
        body: "The item that's taking the most time, costing more than it should, or simply sitting in the 'deal with this later' pile.",
      },
      {
        stepNumber: "02",
        title: "Send the spec and a bit of context",
        body: "What it is, roughly what you buy, and how it's currently sourced. Partial is fine — we'll tell you if we need more.",
      },
      {
        stepNumber: "03",
        title: "We'll tell you if there's a better proposition",
        body: "If we can create a competitive alternative, you'll see it. If we can't, we won't pretend otherwise — and you simply don't proceed.",
      },
    ],
    ctaLabel: "Review one requirement",
  },
  difference: {
    eyebrow: "Why this is different",
    heading: "Better pricing. Less work. [[Someone actually owning it.]]",
    body: "Most packaging suppliers quote and wait. You still run the briefs, the chasing, and the uncertainty. We combine the cost advantage of buying at scale with a partner who actively manages the work — so you get a better price, and you don't have to run the process yourself.",
    points: [
      {
        title: "Buying power you wouldn't have alone",
        body: "Volume is aggregated across the brands we look after. That typically means a more competitive price than sourcing each item separately.",
      },
      {
        title: "Someone accountable for the work",
        body: "Not another inbox. A team that owns the requirement from brief through to delivery, and keeps improving it.",
      },
      {
        title: "No separate fee",
        body: "There's no consultancy charge and no contract to start. We make a margin on the packaging supplied — only if you decide to proceed.",
      },
    ],
  },
  socialProof: {
    heading: "Brands that already run packaging [[this way]].",
    intro:
      "Consumer brands using Supplied as the team that owns packaging — not another supplier to manage.",
    showTestimonials: true,
    testimonials: [
      {
        quote:
          "From ideation to execution, the attention to detail and care shown by Supplied is second to none. They delivered a high-quality product with an incredibly fast turnaround.",
        name: "Oscar",
        role: "Head of Brand",
        brand: "Healf",
        result: "30%+ cost saving",
        href: "/client-stories/healf",
      },
      {
        quote:
          "What started as a single mailer box project evolved into a full packaging partnership — Supplied now manages every SKU we ship.",
        name: "Spacegoods Team",
        role: "",
        brand: "Spacegoods",
        result: "~30% cost optimisation",
        href: "/client-stories/spacegoods",
      },
      {
        quote:
          "We work with many suppliers, but very few are as helpful, supportive and flexible as Supplied. They always find a solution for anything you throw at them.",
        name: "Brand Team",
        role: "",
        brand: "Glaize",
        result: "3.5 week turnaround",
        href: "/client-stories/glaize-x-aston-martin",
      },
    ],
    stories: [
      {
        brand: "Healf",
        result: "Saved 30%+ while scaling 434%.",
        href: "/client-stories/healf",
        image: {
          src: "/images/client-stories/healf-hero.webp",
          alt: "Healf packaging",
        },
      },
      {
        brand: "Spacegoods",
        result: "One mailer project became every SKU.",
        href: "/client-stories/spacegoods",
        image: {
          src: "/images/client-stories/spacegoods-hero.webp",
          alt: "Spacegoods packaging",
        },
      },
      {
        brand: "TRIP",
        result: "Lead times cut from 12+ weeks to 5–6.",
        href: "/client-stories/trip",
        image: {
          src: "/images/client-stories/trip-hero.webp",
          alt: "TRIP packaging",
        },
      },
    ],
  },
  riskReversal: {
    heading: "Starting is [[low risk]].",
    points: [
      "No fee.",
      "No contract.",
      "No obligation to move more packaging.",
    ],
    body: "Start with one requirement. If we can create a competitive proposition, you decide whether to proceed. If we cannot, you simply don't. Nothing else has to move, and nothing is committed until you say so.",
  },
  requestForm: {
    eyebrow: "Next step",
    heading: "Got one packaging requirement you'd like us to [[look at]]?",
    sub: "Tell us what it is. Low effort, no obligation — and if there's a better opportunity, we'll show you. If there isn't, you'll know.",
    submitLabel: "Review one requirement",
    privacyFootnote:
      "We'll only use this to look at the requirement you've sent. No fee, no contract, and we won't chase you if it's not a fit.",
    successHeading: "Thanks — we've got it.",
    successBody:
      "We'll review what you've sent and come back to you with a clear view on whether we can put a better proposition together. If we need a bit more context, we'll say so.",
  },
  seo: {
    title: "Packaging Review | Supplied",
    description:
      "Get packaging off your plate and see where you could save 20%+. Start with one requirement — no fee, no contract, no obligation.",
    ogImage: undefined,
  },
};

interface SanityImageField {
  src?: string | null;
  alt?: string | null;
}

interface SanityPackagingReviewDoc {
  hero?: {
    eyebrow?: string | null;
    headline?: string | null;
    subheadline?: string | null;
    primaryCtaLabel?: string | null;
    riskReversal?: string | null;
    image?: SanityImageField | null;
    quickFacts?: unknown;
  } | null;
  problem?: {
    eyebrow?: string | null;
    heading?: string | null;
    intro?: string | null;
    items?: unknown;
    closingLine?: string | null;
  } | null;
  outcome?: {
    eyebrow?: string | null;
    heading?: string | null;
    intro?: string | null;
    image?: SanityImageField | null;
    items?: unknown;
  } | null;
  howItWorks?: {
    eyebrow?: string | null;
    heading?: string | null;
    intro?: string | null;
    timeNote?: string | null;
    steps?: unknown;
    ctaLabel?: string | null;
  } | null;
  difference?: {
    eyebrow?: string | null;
    heading?: string | null;
    body?: string | null;
    points?: unknown;
  } | null;
  socialProof?: {
    heading?: string | null;
    intro?: string | null;
    showTestimonials?: boolean | null;
    testimonials?: unknown;
    stories?: unknown;
  } | null;
  riskReversal?: {
    heading?: string | null;
    points?: unknown;
    body?: string | null;
  } | null;
  requestForm?: {
    eyebrow?: string | null;
    heading?: string | null;
    sub?: string | null;
    submitLabel?: string | null;
    privacyFootnote?: string | null;
    successHeading?: string | null;
    successBody?: string | null;
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

function mapImage(
  value: SanityImageField | null | undefined
): PackagingReviewImage | undefined {
  const src = readSafe(value?.src);
  if (!src) return undefined;
  return { src, alt: readString(value?.alt) ?? "" };
}

function mapQuickFacts(
  value: unknown,
  fallback: PackagingReviewQuickFact[]
): PackagingReviewQuickFact[] {
  if (!Array.isArray(value)) return fallback;
  const mapped = value
    .map((item): PackagingReviewQuickFact | undefined => {
      if (!item || typeof item !== "object") return undefined;
      const record = item as { value?: unknown; label?: unknown };
      const v = readString(record.value);
      const l = readString(record.label);
      if (!v || !l) return undefined;
      return { value: v, label: l };
    })
    .filter((item): item is PackagingReviewQuickFact => Boolean(item));
  return mapped.length > 0 ? mapped : fallback;
}

function mapStatements(value: unknown): PackagingReviewStatement[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (typeof item === "string") {
        const title = readString(item);
        return title ? { title } : undefined;
      }
      if (!item || typeof item !== "object") return undefined;
      const title = readString((item as { title?: unknown }).title);
      return title ? { title } : undefined;
    })
    .filter((item): item is PackagingReviewStatement => Boolean(item));
}

function mapItems(value: unknown): PackagingReviewItem[] {
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
    .filter((item): item is PackagingReviewItem => Boolean(item));
}

function mapSteps(value: unknown): PackagingReviewStep[] {
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
      return {
        stepNumber:
          readString(record.stepNumber) ?? String(index + 1).padStart(2, "0"),
        title,
        body,
      };
    })
    .filter((item): item is PackagingReviewStep => Boolean(item));
}

function mapTestimonials(value: unknown): PackagingReviewTestimonial[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return undefined;
      const record = item as {
        quote?: unknown;
        name?: unknown;
        role?: unknown;
        brand?: unknown;
        result?: unknown;
        href?: unknown;
      };
      const quote = readString(record.quote);
      if (!quote) return undefined;
      return {
        quote,
        name: readString(record.name) ?? "",
        role: readString(record.role) ?? "",
        brand: readString(record.brand) ?? "",
        result: readString(record.result) ?? "",
        href: readSafe(record.href) ?? "",
      };
    })
    .filter((item): item is PackagingReviewTestimonial => Boolean(item));
}

function mapStories(
  value: unknown,
  fallback: PackagingReviewStory[]
): PackagingReviewStory[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item, idx) => {
      if (!item || typeof item !== "object") return undefined;
      const record = item as {
        brand?: unknown;
        result?: unknown;
        href?: unknown;
        image?: SanityImageField | null;
      };
      const brand = readString(record.brand);
      const result = readString(record.result);
      if (!brand || !result) return undefined;
      const story: PackagingReviewStory = {
        brand,
        result,
        href: readSafe(record.href) ?? fallback[idx]?.href ?? "",
      };
      const image = mapImage(record.image) ?? fallback[idx]?.image;
      if (image) story.image = image;
      return story;
    })
    .filter((item): item is PackagingReviewStory => Boolean(item));
}

function mapStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => (typeof item === "string" ? readString(item) : undefined))
    .filter((item): item is string => Boolean(item));
}

function mapPackagingReviewPage(
  doc: SanityPackagingReviewDoc | null
): PackagingReviewPageContent {
  if (!doc) return fallbackPackagingReviewPageContent;
  const fallback = fallbackPackagingReviewPageContent;

  const problemItems = mapStatements(doc.problem?.items);
  const outcomeItems = mapItems(doc.outcome?.items);
  const steps = mapSteps(doc.howItWorks?.steps);
  const points = mapItems(doc.difference?.points);
  const testimonials = mapTestimonials(doc.socialProof?.testimonials);
  const stories = mapStories(doc.socialProof?.stories, fallback.socialProof.stories);
  const riskPoints = mapStringList(doc.riskReversal?.points);

  return {
    hero: {
      eyebrow: readString(doc.hero?.eyebrow) ?? fallback.hero.eyebrow,
      headline: readString(doc.hero?.headline) ?? fallback.hero.headline,
      subheadline:
        readString(doc.hero?.subheadline) ?? fallback.hero.subheadline,
      primaryCtaLabel:
        readString(doc.hero?.primaryCtaLabel) ?? fallback.hero.primaryCtaLabel,
      riskReversal:
        readString(doc.hero?.riskReversal) ?? fallback.hero.riskReversal,
      image: mapImage(doc.hero?.image) ?? fallback.hero.image,
      quickFacts: mapQuickFacts(doc.hero?.quickFacts, fallback.hero.quickFacts),
    },
    problem: {
      eyebrow: readString(doc.problem?.eyebrow) ?? fallback.problem.eyebrow,
      heading: readString(doc.problem?.heading) ?? fallback.problem.heading,
      intro: readString(doc.problem?.intro) ?? fallback.problem.intro,
      items: problemItems.length > 0 ? problemItems : fallback.problem.items,
      closingLine:
        readString(doc.problem?.closingLine) ?? fallback.problem.closingLine,
    },
    outcome: {
      eyebrow: readString(doc.outcome?.eyebrow) ?? fallback.outcome.eyebrow,
      heading: readString(doc.outcome?.heading) ?? fallback.outcome.heading,
      intro: readString(doc.outcome?.intro) ?? fallback.outcome.intro,
      image: mapImage(doc.outcome?.image) ?? fallback.outcome.image,
      items: outcomeItems.length > 0 ? outcomeItems : fallback.outcome.items,
    },
    howItWorks: {
      eyebrow:
        readString(doc.howItWorks?.eyebrow) ?? fallback.howItWorks.eyebrow,
      heading:
        readString(doc.howItWorks?.heading) ?? fallback.howItWorks.heading,
      intro: readString(doc.howItWorks?.intro) ?? fallback.howItWorks.intro,
      timeNote:
        readString(doc.howItWorks?.timeNote) ?? fallback.howItWorks.timeNote,
      steps: steps.length > 0 ? steps : fallback.howItWorks.steps,
      ctaLabel:
        readString(doc.howItWorks?.ctaLabel) ?? fallback.howItWorks.ctaLabel,
    },
    difference: {
      eyebrow:
        readString(doc.difference?.eyebrow) ?? fallback.difference.eyebrow,
      heading:
        readString(doc.difference?.heading) ?? fallback.difference.heading,
      body: readString(doc.difference?.body) ?? fallback.difference.body,
      points: points.length > 0 ? points : fallback.difference.points,
    },
    socialProof: {
      heading:
        readString(doc.socialProof?.heading) ?? fallback.socialProof.heading,
      intro: readString(doc.socialProof?.intro) ?? fallback.socialProof.intro,
      showTestimonials:
        typeof doc.socialProof?.showTestimonials === "boolean"
          ? doc.socialProof.showTestimonials
          : fallback.socialProof.showTestimonials,
      testimonials:
        testimonials.length > 0
          ? testimonials
          : fallback.socialProof.testimonials,
      stories: stories.length > 0 ? stories : fallback.socialProof.stories,
    },
    riskReversal: {
      heading:
        readString(doc.riskReversal?.heading) ?? fallback.riskReversal.heading,
      points:
        riskPoints.length > 0 ? riskPoints : fallback.riskReversal.points,
      body: readString(doc.riskReversal?.body) ?? fallback.riskReversal.body,
    },
    requestForm: {
      eyebrow:
        readString(doc.requestForm?.eyebrow) ?? fallback.requestForm.eyebrow,
      heading:
        readString(doc.requestForm?.heading) ?? fallback.requestForm.heading,
      sub: readString(doc.requestForm?.sub) ?? fallback.requestForm.sub,
      submitLabel:
        readString(doc.requestForm?.submitLabel) ??
        fallback.requestForm.submitLabel,
      privacyFootnote:
        readString(doc.requestForm?.privacyFootnote) ??
        fallback.requestForm.privacyFootnote,
      successHeading:
        readString(doc.requestForm?.successHeading) ??
        fallback.requestForm.successHeading,
      successBody:
        readString(doc.requestForm?.successBody) ??
        fallback.requestForm.successBody,
    },
    seo: {
      title: readString(doc.seo?.title) ?? fallback.seo.title,
      description: readString(doc.seo?.description) ?? fallback.seo.description,
      ogImage: readSafe(doc.seo?.ogImage) ?? fallback.seo.ogImage,
    },
  };
}

export async function getPackagingReviewPageContent(): Promise<PackagingReviewPageContent> {
  try {
    const doc = await sanityFetch<SanityPackagingReviewDoc | null>({
      query: packagingReviewPageQuery,
      tags: ["packaging-review"],
    });
    return mapPackagingReviewPage(doc);
  } catch {
    return fallbackPackagingReviewPageContent;
  }
}
