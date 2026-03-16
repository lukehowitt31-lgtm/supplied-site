import "server-only";

import { sanityFetch } from "@/lib/sanity/fetch";
import { homePageQuery } from "@/lib/sanity/queries";

export interface HomeLinkItem {
  label: string;
  href: string;
}

export interface HomePageContent {
  hero: {
    headline: string;
    subheadline: string;
    primaryCta: HomeLinkItem;
    secondaryCta: HomeLinkItem;
  };
  trustedBrands: {
    heading: string;
  };
  problemBottleneck: {
    heading: string;
    intro: string;
    items: string[];
  };
  solution: {
    heading: string;
    body: string;
    steps: string[];
  };
  servicesTeaser: {
    heading: string;
    body: string;
  };
  clientStoriesTeaser: {
    heading: string;
    body: string;
    cta: HomeLinkItem;
  };
  productsTeaser: {
    heading: string;
    body: string;
    cta: HomeLinkItem;
  };
  sustainability: {
    heading: string;
    body: string;
    checklist: string[];
  };
  process: {
    heading: string;
    steps: string[];
  };
  finalCta: {
    heading: string;
    body: string;
    primaryCta: HomeLinkItem;
  };
}

export const fallbackHomePageContent: HomePageContent = {
  hero: {
    headline: "Packaging that grows your brand, not your headaches",
    subheadline:
      "We partner with fast-growing consumer brands to design, source, and deliver sustainable packaging that drives retention, cuts cost, and scales with you.",
    primaryCta: {
      label: "Start a Project",
      href: "/contact-us",
    },
    secondaryCta: {
      label: "See Client Stories",
      href: "/client-stories",
    },
  },
  trustedBrands: {
    heading: "Trusted by leading brands",
  },
  problemBottleneck: {
    heading: "Packaging becomes a bottleneck when you're scaling fast",
    intro:
      "You're growing at pace. Packaging seems simple — until it starts costing you time, money, and customers.",
    items: [
      "Too many suppliers",
      "Invisible cost creep",
      "Compliance minefield",
      "Generic unboxing",
    ],
  },
  solution: {
    heading: "One partnership. Full control. Zero complexity.",
    body: "We become an extension of your team — a single point of contact managing design, sourcing, production, and delivery across every SKU.",
    steps: [
      "Audit & benchmark",
      "Design & engineer",
      "Source & manufacture",
      "QA & deliver",
      "Optimise & scale",
    ],
  },
  servicesTeaser: {
    heading: "End-to-end packaging, handled",
    body: "From structural design to doorstep delivery — one accountable partnership across your entire packaging portfolio.",
  },
  clientStoriesTeaser: {
    heading: "Real brands, real impact",
    body: "See how scaling brands use Supplied to lower cost, speed up delivery, and elevate unboxing.",
    cta: {
      label: "See All Client Stories",
      href: "/client-stories",
    },
  },
  productsTeaser: {
    heading: "Everything your brand needs, sourced",
    body: "From cartonboard boxes to printed cans — one partnership, one invoice, one point of contact across your entire packaging catalogue.",
    cta: {
      label: "View Full Catalogue",
      href: "/products",
    },
  },
  sustainability: {
    heading: "PPWR-ready packaging, without the compromise",
    body: "EU packaging regulations are changing everything. We ensure compliance while actually improving your brand experience.",
    checklist: [
      "Recyclability & reusability",
      "Recycled content targets",
      "Correct labelling",
      "Substance restrictions",
      "FSC certified options",
    ],
  },
  process: {
    heading: "From concept to your customer's door",
    steps: [
      "Technical Design",
      "Sampling",
      "Transparent Pricing",
      "Production",
      "Delivery",
    ],
  },
  finalCta: {
    heading: "Ready to upgrade your packaging?",
    body: "Let's talk about how Supplied can become your end-to-end partner — saving time, money, and the headache.",
    primaryCta: {
      label: "Start a Project",
      href: "/contact-us",
    },
  },
};

interface SanityLinkItem {
  label?: string | null;
  href?: string | null;
}

interface SanityHomePageDoc {
  hero?: {
    headline?: string | null;
    subheadline?: string | null;
    primaryCta?: SanityLinkItem | null;
    secondaryCta?: SanityLinkItem | null;
  } | null;
  trustedBrands?: {
    heading?: string | null;
    brands?: unknown;
  } | null;
  problemBottleneck?: {
    heading?: string | null;
    intro?: string | null;
    items?: unknown;
  } | null;
  solution?: {
    heading?: string | null;
    body?: string | null;
    steps?: unknown;
  } | null;
  servicesTeaser?: {
    heading?: string | null;
    body?: string | null;
  } | null;
  clientStoriesTeaser?: {
    heading?: string | null;
    body?: string | null;
    cta?: SanityLinkItem | null;
  } | null;
  productsTeaser?: {
    heading?: string | null;
    body?: string | null;
    cta?: SanityLinkItem | null;
  } | null;
  sustainability?: {
    heading?: string | null;
    body?: string | null;
    checklist?: unknown;
  } | null;
  process?: {
    heading?: string | null;
    steps?: unknown;
  } | null;
  finalCta?: {
    heading?: string | null;
    body?: string | null;
    primaryCta?: SanityLinkItem | null;
  } | null;
}

function readString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : undefined;
}

function mapStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => readString(item))
    .filter((item): item is string => Boolean(item));
}

function mapLinkItem(
  value: SanityLinkItem | null | undefined,
  fallback: HomeLinkItem
): HomeLinkItem {
  return {
    label: readString(value?.label) ?? fallback.label,
    href: readString(value?.href) ?? fallback.href,
  };
}

function mapHomePage(doc: SanityHomePageDoc | null): HomePageContent {
  if (!doc) {
    return fallbackHomePageContent;
  }

  const problemItems = mapStringArray(doc.problemBottleneck?.items);
  const solutionSteps = mapStringArray(doc.solution?.steps);
  const sustainabilityChecklist = mapStringArray(doc.sustainability?.checklist);
  const processSteps = mapStringArray(doc.process?.steps);

  return {
    hero: {
      headline: readString(doc.hero?.headline) ?? fallbackHomePageContent.hero.headline,
      subheadline:
        readString(doc.hero?.subheadline) ?? fallbackHomePageContent.hero.subheadline,
      primaryCta: mapLinkItem(
        doc.hero?.primaryCta,
        fallbackHomePageContent.hero.primaryCta
      ),
      secondaryCta: mapLinkItem(
        doc.hero?.secondaryCta,
        fallbackHomePageContent.hero.secondaryCta
      ),
    },
    trustedBrands: {
      heading:
        readString(doc.trustedBrands?.heading) ??
        fallbackHomePageContent.trustedBrands.heading,
    },
    problemBottleneck: {
      heading:
        readString(doc.problemBottleneck?.heading) ??
        fallbackHomePageContent.problemBottleneck.heading,
      intro:
        readString(doc.problemBottleneck?.intro) ??
        fallbackHomePageContent.problemBottleneck.intro,
      items:
        problemItems.length > 0
          ? problemItems
          : fallbackHomePageContent.problemBottleneck.items,
    },
    solution: {
      heading:
        readString(doc.solution?.heading) ?? fallbackHomePageContent.solution.heading,
      body: readString(doc.solution?.body) ?? fallbackHomePageContent.solution.body,
      steps:
        solutionSteps.length > 0 ? solutionSteps : fallbackHomePageContent.solution.steps,
    },
    servicesTeaser: {
      heading:
        readString(doc.servicesTeaser?.heading) ??
        fallbackHomePageContent.servicesTeaser.heading,
      body:
        readString(doc.servicesTeaser?.body) ??
        fallbackHomePageContent.servicesTeaser.body,
    },
    clientStoriesTeaser: {
      heading:
        readString(doc.clientStoriesTeaser?.heading) ??
        fallbackHomePageContent.clientStoriesTeaser.heading,
      body:
        readString(doc.clientStoriesTeaser?.body) ??
        fallbackHomePageContent.clientStoriesTeaser.body,
      cta: mapLinkItem(
        doc.clientStoriesTeaser?.cta,
        fallbackHomePageContent.clientStoriesTeaser.cta
      ),
    },
    productsTeaser: {
      heading:
        readString(doc.productsTeaser?.heading) ??
        fallbackHomePageContent.productsTeaser.heading,
      body:
        readString(doc.productsTeaser?.body) ??
        fallbackHomePageContent.productsTeaser.body,
      cta: mapLinkItem(
        doc.productsTeaser?.cta,
        fallbackHomePageContent.productsTeaser.cta
      ),
    },
    sustainability: {
      heading:
        readString(doc.sustainability?.heading) ??
        fallbackHomePageContent.sustainability.heading,
      body:
        readString(doc.sustainability?.body) ??
        fallbackHomePageContent.sustainability.body,
      checklist:
        sustainabilityChecklist.length > 0
          ? sustainabilityChecklist
          : fallbackHomePageContent.sustainability.checklist,
    },
    process: {
      heading:
        readString(doc.process?.heading) ?? fallbackHomePageContent.process.heading,
      steps: processSteps.length > 0 ? processSteps : fallbackHomePageContent.process.steps,
    },
    finalCta: {
      heading:
        readString(doc.finalCta?.heading) ?? fallbackHomePageContent.finalCta.heading,
      body: readString(doc.finalCta?.body) ?? fallbackHomePageContent.finalCta.body,
      primaryCta: mapLinkItem(
        doc.finalCta?.primaryCta,
        fallbackHomePageContent.finalCta.primaryCta
      ),
    },
  };
}

export async function getHomePageContent(): Promise<HomePageContent> {
  try {
    const doc = await sanityFetch<SanityHomePageDoc | null>({
      query: homePageQuery,
      tags: ["home"],
    });
    return mapHomePage(doc);
  } catch {
    return fallbackHomePageContent;
  }
}

