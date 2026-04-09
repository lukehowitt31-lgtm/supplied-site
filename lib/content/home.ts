import "server-only";

import { sanityFetch } from "@/lib/sanity/fetch";
import { homePageQuery } from "@/lib/sanity/queries";

export interface HomeLinkItem {
  label: string;
  href: string;
}

export interface HomeCardItem {
  title: string;
  desc: string;
}

export interface HomeServiceCardItem {
  title: string;
  desc: string;
  chips: string[];
}

export interface HomeHeroStatItem {
  value: string;
  label: string;
}

export interface HomeHeroHotspotItem {
  id: string;
  x: number;
  y: number;
  title: string;
  detail: string;
  href: string;
}

export interface HomeClientStoryTeaserCard {
  name: string;
  slug: string;
  industry: string;
  products: string[];
  quote: string;
  person: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  challenge: string;
  result: string;
  image: string;
  logo: string;
}

export interface HomePageContent {
  hero: {
    headline: string;
    subheadline: string;
    tagline: string;
    primaryCta: HomeLinkItem;
    secondaryCta: HomeLinkItem;
    stats: HomeHeroStatItem[];
    prooflineTitle: string;
    prooflineSubtitle: string;
    hotspots: HomeHeroHotspotItem[];
  };
  trustedBrands: {
    heading: string;
  };
  problemBottleneck: {
    heading: string;
    intro: string;
    items: string[];
    cards: HomeCardItem[];
  };
  solution: {
    heading: string;
    body: string;
    steps: string[];
    stepDescriptions: string[];
  };
  servicesTeaser: {
    heading: string;
    body: string;
    heroTitle: string;
    heroBody: string;
    heroChips: string[];
    cards: HomeServiceCardItem[];
    stats: HomeHeroStatItem[];
  };
  clientStoriesTeaser: {
    heading: string;
    body: string;
    cta: HomeLinkItem;
    cards: HomeClientStoryTeaserCard[];
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
    stepDescriptions: string[];
  };
  finalCta: {
    heading: string;
    body: string;
    primaryCta: HomeLinkItem;
  };
}

export const fallbackHomePageContent: HomePageContent = {
  hero: {
    headline: "Custom Packaging for Fast-Growing |DTC Brands",
    subheadline:
      "Packaging becomes a bottleneck when you're scaling fast. We partner with fast-growing consumer brands to design, source, and deliver sustainable packaging that drives retention, cuts cost, and scales with you.",
    tagline: "The end-to-end packaging partner",
    primaryCta: {
      label: "Start a Project",
      href: "/contact-us",
    },
    secondaryCta: {
      label: "See Client Stories",
      href: "/client-stories",
    },
    stats: [
      { value: "98%", label: "On-Time Delivery" },
      { value: "23%", label: "Avg Cost Saving" },
      { value: "200+", label: "Projects Managed" },
      { value: "30+", label: "Global Suppliers" },
    ],
    prooflineTitle: "Wild, TRIP, Healf, Glaize",
    prooflineSubtitle: "& 50+ fast-growing brands trust Supplied",
    hotspots: [
      {
        id: "hotspot-1771336160878",
        x: 32,
        y: 38.4,
        title: "Custom Mailer Boxes",
        detail:
          "Double sided printing with self locking tabs or Peel & seal, for the ultimate opening experience.",
        href: "/products/mailer-boxes",
      },
      {
        id: "hotspot-1771336191361",
        x: 32.3,
        y: 17.6,
        title: "Digitally Printed Cans",
        detail:
          "Short-run, digitally printed aluminium cans for craft breweries, RTD brands, and beverage startups. No labels, no sleeves - your brand printed directly on the can.",
        href: "/products/printed-cans",
      },
      {
        id: "hotspot-1771336312429",
        x: 15.5,
        y: 35.4,
        title: "Premium Advent Calendars",
        detail:
          "Bespoke printed advent calendars for beauty, wellness, and food brands. From structural design to fulfilment-ready delivery - fully managed by Supplied.",
        href: "/products/advent-calendars",
      },
      {
        id: "hotspot-1771336356981",
        x: 45.4,
        y: 38.9,
        title: "Printed Shipping Boxes",
        detail:
          "Custom branded shipping boxes with flexographic or digital printing. The ecommerce workhorse, now with your brand on the outside.",
        href: "/products/shipping-boxes",
      },
      {
        id: "hotspot-1771336469638",
        x: 14.8,
        y: 67.7,
        title: "Custom Printed Paper Mailers",
        detail:
          "Sustainable, plastic-free paper mailers with full-colour digital or flexographic printing. The modern replacement for poly mailers.",
        href: "/products/paper-mailers",
      },
      {
        id: "hotspot-1771336495581",
        x: 58.4,
        y: 54.3,
        title: "Custom Printed Rigid Boxes",
        detail:
          "Luxury rigid boxes designed and manufactured for health, beauty, and wellness brands. Magnetic closures, lift-off lids, and drawer styles - FSC certified and fully customisable from 500 units.",
        href: "/products/rigid-boxes",
      },
      {
        id: "hotspot-1771336536838",
        x: 76.1,
        y: 79.4,
        title: "Custom Printed Paper Tape",
        detail:
          "Plastic-free, fully recyclable branded tape. Your logo on every parcel - building brand recognition from the doorstep. From 72 rolls.",
        href: "/products/packing-tape",
      },
      {
        id: "hotspot-1771336584111",
        x: 4.1,
        y: 69.3,
        title: "Custom Printed Tissue Paper",
        detail:
          "Elevate your unboxing with custom printed tissue paper. Your logo, colours, and patterns printed on premium FSC-certified tissue - from 1,000 sheets.",
        href: "/products/tissue-paper",
      },
    ],
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
    cards: [
      {
        title: "Too many suppliers",
        desc: "Box factory, printer, insert maker, freight forwarder — four invoices, four timelines, zero accountability.",
      },
      {
        title: "Invisible cost creep",
        desc: "Hidden tooling fees, inconsistent pricing, surprise freight charges. You're spending more but can't see where.",
      },
      {
        title: "Compliance minefield",
        desc: "PPWR, EPR, FSC, recyclability claims — regulations are tightening and your suppliers can't keep up.",
      },
      {
        title: "Generic unboxing",
        desc: "Your product is premium but the packaging doesn't reflect it. Unboxing should drive retention and shares.",
      },
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
    stepDescriptions: [
      "We map your current packaging, suppliers, and costs — then show you exactly where savings and improvements are.",
      "Structural design, material selection, and artwork that makes your unboxing a brand-building moment.",
      "30+ vetted factories across 12 countries, matched to your product, volume, and budget.",
      "Production oversight, compliance certification, freight, and customs — all managed for you.",
      "Quarterly cost reviews, material innovations, and regulatory updates as you grow.",
    ],
  },
  servicesTeaser: {
    heading: "End-to-end packaging, handled",
    body: "From structural design to doorstep delivery — one accountable partnership across your entire packaging portfolio.",
    heroTitle: "Manufacturing & Global Sourcing",
    heroBody:
      "Access our network of 30+ vetted suppliers across 12 countries. We match every product to the ideal manufacturing partner — balancing quality, cost, lead time, and sustainability credentials so you don't have to.",
    heroChips: [
      "Corrugated",
      "Rigid",
      "Flexible",
      "Speciality",
      "Printed Cans",
      "Low MOQs",
    ],
    cards: [
      {
        title: "Packaging Strategy",
        desc: "Cost-reduction audits, material innovation workshops, and portfolio reviews to keep you ahead.",
        chips: ["Cost audits", "Innovation", "PPWR readiness"],
      },
      {
        title: "Structural & Technical Design",
        desc: "Custom dieline engineering, 3D mockups, and structural solutions that protect your product and elevate unboxing.",
        chips: ["Dieline engineering", "3D renders", "Prototyping"],
      },
      {
        title: "Artwork & Pre-Press",
        desc: "Print-ready artwork preparation, colour management, and pre-press quality checks. We catch issues before they cost you.",
        chips: ["Print-ready files", "Colour matching", "Proofing"],
      },
      {
        title: "QA & Compliance",
        desc: "Factory audits, sample approvals, and PPWR/FSC sustainability compliance built into every project.",
        chips: ["Factory audits", "PPWR", "FSC"],
      },
      {
        title: "Logistics & Freight",
        desc: "End-to-end freight management, customs clearance, and warehousing coordination from factory to fulfilment.",
        chips: ["Freight", "Customs", "Warehousing"],
      },
    ],
    stats: [
      { value: "30+", label: "Global Suppliers" },
      { value: "12", label: "Countries" },
      { value: "98%", label: "On-Time Delivery" },
      { value: "23%", label: "Avg Cost Saving" },
    ],
  },
  clientStoriesTeaser: {
    heading: "Real brands, real impact",
    body: "See how scaling brands use Supplied to lower cost, speed up delivery, and elevate unboxing.",
    cta: {
      label: "See All Client Stories",
      href: "/client-stories",
    },
    cards: [
      {
        name: "Healf",
        slug: "healf",
        industry: "Health & Wellness",
        products: ["Shipper Boxes", "Advent Calendar", "Device Packaging"],
        quote:
          "From ideation to execution, the attention to detail and care shown by Supplied is second to none. They delivered a high-quality product with an incredibly fast turnaround.",
        person: "Oscar, Head of Brand",
        stat1Value: "434%",
        stat1Label: "Growth year",
        stat2Value: "30%+",
        stat2Label: "Cost saving",
        challenge:
          "Packaging hadn't kept pace with rapid growth — reactive sourcing, lead time volatility, and brand misalignment were blocking scale.",
        result:
          "Packaging became structured infrastructure supporting 434% growth without bottlenecks.",
        image: "/images/client-stories/healf-hero.webp",
        logo: "/images/logos/healf.svg",
      },
      {
        name: "Spacegoods",
        slug: "spacegoods",
        industry: "Supplements & D2C",
        products: ["Mailer Boxes", "Starter Kits", "Retail Cartons"],
        quote:
          "What started as a single mailer box project evolved into a full packaging partnership — Supplied now manages every SKU we ship.",
        person: "Spacegoods Team",
        stat1Value: "+122%",
        stat1Label: "Search growth",
        stat2Value: "~30%",
        stat2Label: "Cost optimisation",
        challenge:
          "Functional but inefficient mailer boxes that didn't reflect the brand's bold visual identity or support retail ambitions.",
        result:
          "A structured packaging system powering D2C scale and a successful Tesco retail launch.",
        image: "/images/client-stories/spacegoods-hero.webp",
        logo: "/images/logos/spacegoods.svg",
      },
      {
        name: "Glaize × Aston Martin",
        slug: "glaize-x-aston-martin",
        industry: "Limited Edition Collab",
        products: ["Litho Mailer Boxes"],
        quote:
          "We work with many suppliers, but very few are as helpful, supportive and flexible as Supplied. They always find a solution for anything you throw at them.",
        person: "Brand Team",
        stat1Value: "200",
        stat1Label: "Limited edition units",
        stat2Value: "3.5 wk",
        stat2Label: "End-to-end",
        challenge:
          "A last-minute collaboration with an immovable British Grand Prix deadline, requiring precise physical colour matching to Aston Martin Green.",
        result:
          "200 premium litho mailers delivered in 3.5 weeks with zero delays and exact colour match.",
        image: "/images/client-stories/glaize-hero.webp",
        logo: "/images/logos/glaize.svg",
      },
    ],
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
    stepDescriptions: [
      "Custom dielines for your product",
      "Free unprinted samples to verify",
      "Full cost breakdown, nothing hidden",
      "Expert QA, best lead times",
      "Perfect packaging, to your door",
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
    tagline?: string | null;
    primaryCta?: SanityLinkItem | null;
    secondaryCta?: SanityLinkItem | null;
    stats?: unknown;
    prooflineTitle?: string | null;
    prooflineSubtitle?: string | null;
    hotspots?: unknown;
  } | null;
  trustedBrands?: {
    heading?: string | null;
    brands?: unknown;
  } | null;
  problemBottleneck?: {
    heading?: string | null;
    intro?: string | null;
    items?: unknown;
    cards?: unknown;
  } | null;
  solution?: {
    heading?: string | null;
    body?: string | null;
    steps?: unknown;
    stepDescriptions?: unknown;
  } | null;
  servicesTeaser?: {
    heading?: string | null;
    body?: string | null;
    heroTitle?: string | null;
    heroBody?: string | null;
    heroChips?: unknown;
    cards?: unknown;
    stats?: unknown;
  } | null;
  clientStoriesTeaser?: {
    heading?: string | null;
    body?: string | null;
    cta?: SanityLinkItem | null;
    cards?: unknown;
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
    stepDescriptions?: unknown;
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

  return value.trim().length > 0 ? value : undefined;
}

const stegaCharPattern = /[\u200B-\u200F\u202A-\u202E\u2060-\u206F\uFEFF]/g;

function readSafeString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmedValue = value.replace(stegaCharPattern, "").trim();
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

function mapProblemCards(value: unknown): HomeCardItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return undefined;
      }

      const record = item as { title?: unknown; desc?: unknown };
      const title = readString(record.title);
      const desc = readString(record.desc);

      if (!title || !desc) {
        return undefined;
      }

      return { title, desc };
    })
    .filter((item): item is HomeCardItem => Boolean(item));
}

function mapServiceCards(value: unknown): HomeServiceCardItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return undefined;
      }

      const record = item as {
        title?: unknown;
        desc?: unknown;
        chips?: unknown;
      };

      const title = readString(record.title);
      const desc = readString(record.desc);
      const chips = mapStringArray(record.chips);

      if (!title || !desc) {
        return undefined;
      }

      return {
        title,
        desc,
        chips,
      };
    })
    .filter((item): item is HomeServiceCardItem => Boolean(item));
}

function mapHeroStats(value: unknown): HomeHeroStatItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return undefined;
      }

      const record = item as { value?: unknown; label?: unknown };
      const statValue = readString(record.value);
      const label = readString(record.label);

      if (!statValue || !label) {
        return undefined;
      }

      return { value: statValue, label };
    })
    .filter((item): item is HomeHeroStatItem => Boolean(item));
}

function mapHeroHotspots(value: unknown): HomeHeroHotspotItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item, index) => {
      if (!item || typeof item !== "object") {
        return undefined;
      }

      const record = item as {
        id?: unknown;
        x?: unknown;
        y?: unknown;
        title?: unknown;
        detail?: unknown;
        href?: unknown;
      };

      const title = readString(record.title);
      const detail = readString(record.detail);
      const href = readSafeString(record.href);
      const x = typeof record.x === "number" ? record.x : undefined;
      const y = typeof record.y === "number" ? record.y : undefined;

      if (!title || !detail || !href || typeof x !== "number" || typeof y !== "number") {
        return undefined;
      }

      const id = readSafeString(record.id) ?? `hotspot-${index + 1}`;

      return {
        id,
        x,
        y,
        title,
        detail,
        href,
      };
    })
    .filter((item): item is HomeHeroHotspotItem => Boolean(item));
}

function mapClientStoriesTeaserCards(value: unknown): HomeClientStoryTeaserCard[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item, index) => {
      if (!item || typeof item !== "object") {
        return undefined;
      }

      const fallbackCard = fallbackHomePageContent.clientStoriesTeaser.cards[index];
      const record = item as {
        name?: unknown;
        slug?: unknown;
        industry?: unknown;
        products?: unknown;
        quote?: unknown;
        person?: unknown;
        stat1Value?: unknown;
        stat1Label?: unknown;
        stat2Value?: unknown;
        stat2Label?: unknown;
        challenge?: unknown;
        result?: unknown;
        image?: unknown;
        logo?: unknown;
      };

      const name = readString(record.name) ?? fallbackCard?.name;
      const slug = readSafeString(record.slug) ?? fallbackCard?.slug;
      const industry = readString(record.industry) ?? fallbackCard?.industry;
      const quote = readString(record.quote) ?? fallbackCard?.quote;
      const person = readString(record.person) ?? fallbackCard?.person;
      const stat1Value = readString(record.stat1Value) ?? fallbackCard?.stat1Value;
      const stat1Label = readString(record.stat1Label) ?? fallbackCard?.stat1Label;
      const stat2Value = readString(record.stat2Value) ?? fallbackCard?.stat2Value;
      const stat2Label = readString(record.stat2Label) ?? fallbackCard?.stat2Label;
      const challenge = readString(record.challenge) ?? fallbackCard?.challenge;
      const result = readString(record.result) ?? fallbackCard?.result;
      const image = readSafeString(record.image) ?? fallbackCard?.image;
      const logo = readSafeString(record.logo) ?? fallbackCard?.logo;
      const products = mapStringArray(record.products);
      const resolvedProducts =
        products.length > 0 ? products : fallbackCard?.products ?? [];

      if (
        !name ||
        !slug ||
        !industry ||
        !quote ||
        !person ||
        !stat1Value ||
        !stat1Label ||
        !stat2Value ||
        !stat2Label ||
        !challenge ||
        !result ||
        !image ||
        !logo
      ) {
        return undefined;
      }

      return {
        name,
        slug,
        industry,
        products: resolvedProducts,
        quote,
        person,
        stat1Value,
        stat1Label,
        stat2Value,
        stat2Label,
        challenge,
        result,
        image,
        logo,
      };
    })
    .filter((item): item is HomeClientStoryTeaserCard => Boolean(item));
}

function mapLinkItem(
  value: SanityLinkItem | null | undefined,
  fallback: HomeLinkItem
): HomeLinkItem {
  return {
    label: readString(value?.label) ?? fallback.label,
    href: readSafeString(value?.href) ?? fallback.href,
  };
}

function mapHomePage(doc: SanityHomePageDoc | null): HomePageContent {
  if (!doc) {
    return fallbackHomePageContent;
  }

  const problemItems = mapStringArray(doc.problemBottleneck?.items);
  const problemCards = mapProblemCards(doc.problemBottleneck?.cards);
  const solutionSteps = mapStringArray(doc.solution?.steps);
  const solutionStepDescriptions = mapStringArray(doc.solution?.stepDescriptions);
  const serviceHeroChips = mapStringArray(doc.servicesTeaser?.heroChips);
  const serviceCards = mapServiceCards(doc.servicesTeaser?.cards);
  const serviceStats = mapHeroStats(doc.servicesTeaser?.stats);
  const heroStats = mapHeroStats(doc.hero?.stats);
  const heroHotspots = mapHeroHotspots(doc.hero?.hotspots);
  const sustainabilityChecklist = mapStringArray(doc.sustainability?.checklist);
  const processSteps = mapStringArray(doc.process?.steps);
  const processStepDescriptions = mapStringArray(doc.process?.stepDescriptions);
  const clientStoriesTeaserCards = mapClientStoriesTeaserCards(
    doc.clientStoriesTeaser?.cards
  );

  return {
    hero: {
      headline: readString(doc.hero?.headline) ?? fallbackHomePageContent.hero.headline,
      subheadline:
        readString(doc.hero?.subheadline) ?? fallbackHomePageContent.hero.subheadline,
      tagline: readString(doc.hero?.tagline) ?? fallbackHomePageContent.hero.tagline,
      primaryCta: mapLinkItem(
        doc.hero?.primaryCta,
        fallbackHomePageContent.hero.primaryCta
      ),
      secondaryCta: mapLinkItem(
        doc.hero?.secondaryCta,
        fallbackHomePageContent.hero.secondaryCta
      ),
      stats: heroStats.length > 0 ? heroStats : fallbackHomePageContent.hero.stats,
      prooflineTitle:
        readString(doc.hero?.prooflineTitle) ?? fallbackHomePageContent.hero.prooflineTitle,
      prooflineSubtitle:
        readString(doc.hero?.prooflineSubtitle) ??
        fallbackHomePageContent.hero.prooflineSubtitle,
      hotspots:
        heroHotspots.length > 0 ? heroHotspots : fallbackHomePageContent.hero.hotspots,
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
      cards:
        problemCards.length > 0
          ? problemCards
          : fallbackHomePageContent.problemBottleneck.cards,
    },
    solution: {
      heading:
        readString(doc.solution?.heading) ?? fallbackHomePageContent.solution.heading,
      body: readString(doc.solution?.body) ?? fallbackHomePageContent.solution.body,
      steps:
        solutionSteps.length > 0 ? solutionSteps : fallbackHomePageContent.solution.steps,
      stepDescriptions:
        solutionStepDescriptions.length > 0
          ? solutionStepDescriptions
          : fallbackHomePageContent.solution.stepDescriptions,
    },
    servicesTeaser: {
      heading:
        readString(doc.servicesTeaser?.heading) ??
        fallbackHomePageContent.servicesTeaser.heading,
      body:
        readString(doc.servicesTeaser?.body) ??
        fallbackHomePageContent.servicesTeaser.body,
      heroTitle:
        readString(doc.servicesTeaser?.heroTitle) ??
        fallbackHomePageContent.servicesTeaser.heroTitle,
      heroBody:
        readString(doc.servicesTeaser?.heroBody) ??
        fallbackHomePageContent.servicesTeaser.heroBody,
      heroChips:
        serviceHeroChips.length > 0
          ? serviceHeroChips
          : fallbackHomePageContent.servicesTeaser.heroChips,
      cards:
        serviceCards.length > 0
          ? serviceCards
          : fallbackHomePageContent.servicesTeaser.cards,
      stats:
        serviceStats.length > 0
          ? serviceStats
          : fallbackHomePageContent.servicesTeaser.stats,
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
      cards:
        clientStoriesTeaserCards.length > 0
          ? clientStoriesTeaserCards
          : fallbackHomePageContent.clientStoriesTeaser.cards,
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
      stepDescriptions:
        processStepDescriptions.length > 0
          ? processStepDescriptions
          : fallbackHomePageContent.process.stepDescriptions,
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

