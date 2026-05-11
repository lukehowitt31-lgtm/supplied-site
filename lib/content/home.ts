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

export interface HomeThreePillar {
  title: string;
  body: string;
  counterpoint?: string;
}

export interface HomeFounderQuote {
  text: string;
  name: string;
  role: string;
}

export interface HomeImage {
  src: string;
  alt: string;
}

export interface HomeWinCard {
  label: string;
  title: string;
  body: string;
  stat: string;
  statCaption: string;
}

export interface HomeMechanismStep {
  step: string;
  title: string;
  body: string;
}

export interface HomeFactChip {
  value: string;
  label: string;
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
    pullLine: string;
    ctaLabel: string;
    ctaHref: string;
    steps: string[];
    stepDescriptions: string[];
  };
  threePillars: {
    heading: string;
    intro: string;
    closingLine: string;
    pillars: HomeThreePillar[];
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
    eyebrow: string;
    heading: string;
    body: string;
    cta: HomeLinkItem;
    cards: HomeClientStoryTeaserCard[];
  };
  productsTeaser: {
    heading: string;
    body: string;
    trailingLine: string;
    cta: HomeLinkItem;
  };
  howWerePaid: {
    tag: string;
    heading: string;
    intro: string;
    yourWin: HomeWinCard;
    ourWin: HomeWinCard;
    mechanism: HomeMechanismStep[];
    closingLine: string;
  };
  costAuditHook: {
    heading: string;
    paragraph1: string;
    paragraph2: string;
    cta: HomeLinkItem;
    factChips: HomeFactChip[];
    image: HomeImage;
  };
  whoWeWorkWith: {
    heading: string;
    intro: string;
    bullets: string[];
    closingLine: string;
  };
  sustainability: {
    heading: string;
    body: string;
    checklist: string[];
  };
  process: {
    heading: string;
    body: string;
    steps: string[];
    stepDescriptions: string[];
  };
  finalCta: {
    heading: string;
    body: string;
    primaryCta: HomeLinkItem;
    secondaryCta: HomeLinkItem;
    founderQuote: HomeFounderQuote;
  };
}

export const fallbackHomePageContent: HomePageContent = {
  hero: {
    headline: "All your packaging. [[One partner]].",
    subheadline:
      "One operational team running design, sourcing, QA, compliance, and freight across your full packaging range. Built for consumer brands where packaging has become too complex, too expensive, or too strategic to leave fragmented.",
    tagline: "Your end-to-end packaging partner",
    primaryCta: {
      label: "See if we'd save you money",
      href: "/packaging-cost-audit",
    },
    secondaryCta: {
      label: "Start a project",
      href: "/contact-us",
    },
    stats: [
      { value: "21%", label: "Avg Cost Saving" },
      { value: "98%", label: "On-Time Delivery" },
      { value: "60+", label: "Global Factories" },
      { value: "12", label: "Countries" },
    ],
    prooflineTitle: "Wild, TRIP, Healf, Glaize",
    prooflineSubtitle: "& 50+ consumer brands trust Supplied",
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
    heading:
      "Trusted by Wild, TRIP, Healf, Glaize, and 50+ consumer brands — from £5m DTC to £100m+ category leaders.",
  },
  problemBottleneck: {
    heading: "Fragmented suppliers are costing you more than money.",
    intro:
      "The unit price is only half the bill. The rest shows up in wasted hours, missed deadlines, compliance exposure, and a customer experience that never quite lands.",
    items: [
      "Too many suppliers",
      "Invisible cost creep",
      "A compliance minefield",
      "Generic unboxing",
    ],
    cards: [
      {
        title: "Too many suppliers",
        desc: "Box manufacturer. Label supplier. 3PL. Insert printer. Freight forwarder. Five invoices, five timelines, zero accountability.",
      },
      {
        title: "Invisible cost creep",
        desc: "Tooling fees. Inconsistent pricing. Surprise freight charges. Spend is climbing and no one can tell you why.",
      },
      {
        title: "A compliance minefield",
        desc: "PPWR, EPR, FSC, recyclability claims. Regulations are tightening faster than most suppliers can keep up with.",
      },
      {
        title: "Generic unboxing",
        desc: "Your product is premium. The packaging isn't. Unboxing is a retention lever you're not pulling.",
      },
    ],
  },
  solution: {
    heading: "One partner. 60 factories. [[No single points of failure]].",
    body: "We don't replace your five suppliers with one. We replace five fragmented relationships with one operational partner and sixty vetted factories — across twelve countries, matched to your product, volume, and timeline. Client-side simplicity. Supply-chain depth.",
    pullLine: "The redundancy isn't reduced. It's orchestrated.",
    ctaLabel: "How we work",
    ctaHref: "/about-us",
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
      "60 vetted factories across 12 countries, matched to your product, volume, and budget.",
      "Production oversight, compliance certification, freight, and customs — all managed for you.",
      "Quarterly cost reviews, material innovations, and regulatory updates as you grow.",
    ],
  },
  threePillars: {
    heading: "Packaging done right balances [[three things]].",
    intro:
      "Every packaging decision sits at the intersection of three pressures. Optimise for one and you damage the others. We build for the balance — deliberately, measurably, across every product you ship.",
    closingLine: "Most suppliers optimise for one. We build for all three.",
    pillars: [
      {
        title: "Cost",
        body: "Material choice, production geography, MOQs, tooling amortisation, freight strategy. We model total landed cost, not unit price.",
        counterpoint: "Most optimise for unit price. We optimise for total landed cost.",
      },
      {
        title: "Operational efficiency",
        body: "Lead times, supplier redundancy, 3PL compatibility, pick-and-pack speed, palletisation. Packaging that plays nicely with the rest of your operation.",
        counterpoint: "Most treat ops as someone else's problem. We design for it.",
      },
      {
        title: "Customer experience",
        body: "Unboxing, brand expression, sustainability credentials. The retention lever most operations functions leave on the table.",
        counterpoint: "Most treat CX as a cost centre. We treat it as retention.",
      },
    ],
  },
  servicesTeaser: {
    heading: "End-to-end, [[not just the box]].",
    body: "Manufacturing is the visible part. The work around it is where the savings come from.",
    heroTitle: "Manufacturing & Global Sourcing",
    heroBody:
      "Access our network of 60+ vetted factories across 12 countries. We match every product to the ideal manufacturing partner — balancing quality, cost, lead time, and sustainability credentials so you don't have to.",
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
      { value: "60+", label: "Global Factories" },
      { value: "12", label: "Countries" },
      { value: "98%", label: "On-Time Delivery" },
      { value: "21%", label: "Avg Cost Saving" },
    ],
  },
  clientStoriesTeaser: {
    eyebrow: "Proof, not promises.",
    heading: "Real operations. [[Real numbers]].",
    body: "Case studies from consumer brands currently running packaging through Supplied.",
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
        result: "Saved Healf 30%+ while they scaled 434%.",
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
    heading: "Everything your brand ships, sourced [[under one roof]].",
    body: "Mailer boxes. Rigid boxes. Printed cans. Shipping boxes. Paper mailers. Cartonboard. Tubes. Tape. Tissue. Advent calendars. One partnership. One invoice. One team across your full range.",
    trailingLine: "If it isn't listed, ask. We source anything packaging.",
    cta: {
      label: "View Full Catalogue",
      href: "/products",
    },
  },
  howWerePaid: {
    tag: "Win-win pricing model",
    heading: "We make money [[when you save money]].",
    intro:
      "No retainers. No consulting fees. No hidden markups stacked on top. We earn a margin on the product itself — and that only works if buying it through us costs you noticeably less than buying it alone.",
    yourWin: {
      label: "Your win",
      title: "Factory-direct rates with a full team behind them.",
      body:
        "We aggregate the volume of every brand we look after into one much larger order book — so you walk into our supplier network with the buying power of a far bigger company. On top of the unit price, you get an end-to-end team handling design, sourcing, QA, compliance and freight as part of the same engagement.",
      stat: "15–25%",
      statCaption: "Typical client saving",
    },
    ourWin: {
      label: "Our win",
      title: "Margin on the volume we move together.",
      body:
        "We've built long-term, high-trust relationships with a tight network of strategic suppliers — they reward us for the volume and consistency we bring. We pass most of that leverage on to you as price, and keep a margin large enough to fund the team and service you're getting.",
      stat: "Aligned",
      statCaption: "Incentives, not opposed",
    },
    mechanism: [
      {
        step: "01",
        title: "Strategic supplier network",
        body:
          "Long-term, high-trust relationships with a tight set of factories — not a marketplace of rotating bidders.",
      },
      {
        step: "02",
        title: "Aggregated client demand",
        body:
          "Every brand we serve contributes to the same order book — combined volume that no single SME could command alone.",
      },
      {
        step: "03",
        title: "Pass-through pricing",
        body:
          "Most of the buying power flows back to you as price. We keep a margin that funds the end-to-end service: design, QA, compliance, freight.",
      },
    ],
    closingLine:
      "If another model would serve you better — a fee-based engagement, a fixed retainer, something bespoke — we'll tell you. Most clients don't need it.",
  },
  costAuditHook: {
    heading: "Not ready to switch? [[Let us benchmark what you've got]].",
    paragraph1:
      "Send us your current packaging spec sheets, supplier list, and last quarter's packaging invoices. Within two weeks we'll send back a confidential benchmark showing where your current setup is competitive, where it isn't, and what a redesigned supply chain would look like.",
    paragraph2:
      "No pitch deck, no obligation, no follow-up unless you ask for one. Nine times out of ten, the audit sells the conversation on its own.",
    cta: {
      label: "Request your packaging cost audit",
      href: "/packaging-cost-audit",
    },
    factChips: [
      { value: "2 weeks", label: "Turnaround" },
      { value: "15–25%", label: "Typical saving" },
      { value: "Free", label: "No obligation" },
      { value: "8–12 pages", label: "Written report" },
    ],
    image: {
      src: "/images/home/packaging-audit-illustration.png",
      alt: "Illustrated open packaging box with surrounding cost, supplier, and analytics nodes representing a Supplied packaging audit",
    },
  },
  whoWeWorkWith: {
    heading: "Built for [[operationally serious]] consumer brands.",
    intro:
      "Supplied is designed for brands where packaging has become too significant to run informally. If you recognise yourself in most of the following, we're probably a fit.",
    bullets: [
      "Consumer brand doing £5m+ in revenue",
      "Ecommerce, DTC, retail, or hybrid",
      "Running multiple packaging formats across multiple SKUs",
      "Currently managing three or more packaging suppliers",
      "Treating packaging as part of the product experience, not an afterthought",
    ],
    closingLine:
      "Smaller than that and we're probably overkill. Larger than that and we're in the right room.",
  },
  sustainability: {
    heading: "PPWR-ready packaging. [[Without the compromise]].",
    body: "EU regulations are reshaping the category. We make sure your packaging is compliant, recyclable, and on-brand. Not pick two.",
    checklist: [
      "Recyclability & reusability",
      "Recycled content targets",
      "Correct labelling",
      "Substance restrictions",
      "FSC certified options",
    ],
  },
  process: {
    heading: "From a brief to your [[customer's door]].",
    body: "A transparent, operator-led process that takes packaging off your week. No black boxes. No hidden markups. Real lead times.",
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
    heading: "Tell us what [[you're shipping]].",
    body: "Current spec, current spend, current headaches. We'll tell you — honestly — whether we're the right partner for where you are.",
    primaryCta: {
      label: "See if we'd save you money",
      href: "/packaging-cost-audit",
    },
    secondaryCta: {
      label: "Start a project",
      href: "/contact-us",
    },
    founderQuote: {
      text: "We'd rather tell you we're not the right fit than pretend we are. Most packaging relationships break because somebody oversold on day one. We don't.",
      name: "Luke Howitt",
      role: "Co-Founder",
    },
  },
};

interface SanityLinkItem {
  label?: string | null;
  href?: string | null;
}

interface SanityImageField {
  src?: string | null;
  alt?: string | null;
}

interface SanityWinCard {
  label?: string | null;
  title?: string | null;
  body?: string | null;
  stat?: string | null;
  statCaption?: string | null;
}

interface SanityMechanismStep {
  step?: string | null;
  title?: string | null;
  body?: string | null;
}

interface SanityFounderQuote {
  text?: string | null;
  name?: string | null;
  role?: string | null;
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
    pullLine?: string | null;
    ctaLabel?: string | null;
    ctaHref?: string | null;
    steps?: unknown;
    stepDescriptions?: unknown;
  } | null;
  threePillars?: {
    heading?: string | null;
    intro?: string | null;
    closingLine?: string | null;
    pillars?: unknown;
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
    eyebrow?: string | null;
    heading?: string | null;
    body?: string | null;
    cta?: SanityLinkItem | null;
    cards?: unknown;
  } | null;
  productsTeaser?: {
    heading?: string | null;
    body?: string | null;
    trailingLine?: string | null;
    cta?: SanityLinkItem | null;
  } | null;
  howWerePaid?: {
    tag?: string | null;
    heading?: string | null;
    intro?: string | null;
    yourWin?: SanityWinCard | null;
    ourWin?: SanityWinCard | null;
    mechanism?: unknown;
    closingLine?: string | null;
  } | null;
  costAuditHook?: {
    heading?: string | null;
    paragraph1?: string | null;
    paragraph2?: string | null;
    cta?: SanityLinkItem | null;
    factChips?: unknown;
    image?: SanityImageField | null;
  } | null;
  whoWeWorkWith?: {
    heading?: string | null;
    intro?: string | null;
    bullets?: unknown;
    closingLine?: string | null;
  } | null;
  sustainability?: {
    heading?: string | null;
    body?: string | null;
    checklist?: unknown;
  } | null;
  process?: {
    heading?: string | null;
    body?: string | null;
    steps?: unknown;
    stepDescriptions?: unknown;
  } | null;
  finalCta?: {
    heading?: string | null;
    body?: string | null;
    primaryCta?: SanityLinkItem | null;
    secondaryCta?: SanityLinkItem | null;
    founderQuote?: SanityFounderQuote | null;
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

function mapPillars(value: unknown): HomeThreePillar[] {
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
        body?: unknown;
        counterpoint?: unknown;
      };
      const title = readString(record.title);
      const body = readString(record.body);
      if (!title || !body) {
        return undefined;
      }
      const counterpoint = readString(record.counterpoint);
      return counterpoint ? { title, body, counterpoint } : { title, body };
    })
    .filter((item): item is HomeThreePillar => Boolean(item));
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

function mapImage(
  value: SanityImageField | null | undefined,
  fallback: HomeImage
): HomeImage {
  return {
    src: readString(value?.src) ?? fallback.src,
    alt: readString(value?.alt) ?? fallback.alt,
  };
}

function mapWinCard(
  value: SanityWinCard | null | undefined,
  fallback: HomeWinCard
): HomeWinCard {
  return {
    label: readString(value?.label) ?? fallback.label,
    title: readString(value?.title) ?? fallback.title,
    body: readString(value?.body) ?? fallback.body,
    stat: readString(value?.stat) ?? fallback.stat,
    statCaption: readString(value?.statCaption) ?? fallback.statCaption,
  };
}

function mapMechanism(
  value: unknown,
  fallback: HomeMechanismStep[]
): HomeMechanismStep[] {
  if (!Array.isArray(value)) return fallback;
  const mapped = value
    .map((raw, idx): HomeMechanismStep | null => {
      if (!raw || typeof raw !== "object") return null;
      const record = raw as SanityMechanismStep;
      const fallbackStep = fallback[idx];
      const step = readString(record.step) ?? fallbackStep?.step;
      const title = readString(record.title) ?? fallbackStep?.title;
      const body = readString(record.body) ?? fallbackStep?.body;
      if (!step || !title || !body) return null;
      return { step, title, body };
    })
    .filter((item): item is HomeMechanismStep => item !== null);
  return mapped.length > 0 ? mapped : fallback;
}

function mapFactChips(value: unknown): HomeFactChip[] {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (!item || typeof item !== "object") return undefined;
      const record = item as { value?: unknown; label?: unknown };
      const chipValue = readString(record.value);
      const label = readString(record.label);
      if (!chipValue || !label) return undefined;
      return { value: chipValue, label };
    })
    .filter((item): item is HomeFactChip => Boolean(item));
}

function mapFounderQuote(
  value: SanityFounderQuote | null | undefined,
  fallback: HomeFounderQuote
): HomeFounderQuote {
  return {
    text: readString(value?.text) ?? fallback.text,
    name: readString(value?.name) ?? fallback.name,
    role: readString(value?.role) ?? fallback.role,
  };
}

function mapHomePage(doc: SanityHomePageDoc | null): HomePageContent {
  if (!doc) {
    return fallbackHomePageContent;
  }

  const fallback = fallbackHomePageContent;
  const problemItems = mapStringArray(doc.problemBottleneck?.items);
  const problemCards = mapProblemCards(doc.problemBottleneck?.cards);
  const solutionSteps = mapStringArray(doc.solution?.steps);
  const solutionStepDescriptions = mapStringArray(doc.solution?.stepDescriptions);
  const pillars = mapPillars(doc.threePillars?.pillars);
  const serviceHeroChips = mapStringArray(doc.servicesTeaser?.heroChips);
  const serviceCards = mapServiceCards(doc.servicesTeaser?.cards);
  const serviceStats = mapHeroStats(doc.servicesTeaser?.stats);
  const heroStats = mapHeroStats(doc.hero?.stats);
  const heroHotspots = mapHeroHotspots(doc.hero?.hotspots);
  const sustainabilityChecklist = mapStringArray(doc.sustainability?.checklist);
  const processSteps = mapStringArray(doc.process?.steps);
  const processStepDescriptions = mapStringArray(doc.process?.stepDescriptions);
  const whoWeWorkWithBullets = mapStringArray(doc.whoWeWorkWith?.bullets);
  const clientStoriesTeaserCards = mapClientStoriesTeaserCards(
    doc.clientStoriesTeaser?.cards
  );

  return {
    hero: {
      headline: readString(doc.hero?.headline) ?? fallback.hero.headline,
      subheadline: readString(doc.hero?.subheadline) ?? fallback.hero.subheadline,
      tagline: readString(doc.hero?.tagline) ?? fallback.hero.tagline,
      primaryCta: mapLinkItem(doc.hero?.primaryCta, fallback.hero.primaryCta),
      secondaryCta: mapLinkItem(doc.hero?.secondaryCta, fallback.hero.secondaryCta),
      stats: heroStats.length > 0 ? heroStats : fallback.hero.stats,
      prooflineTitle:
        readString(doc.hero?.prooflineTitle) ?? fallback.hero.prooflineTitle,
      prooflineSubtitle:
        readString(doc.hero?.prooflineSubtitle) ?? fallback.hero.prooflineSubtitle,
      hotspots: heroHotspots.length > 0 ? heroHotspots : fallback.hero.hotspots,
    },
    trustedBrands: {
      heading:
        readString(doc.trustedBrands?.heading) ?? fallback.trustedBrands.heading,
    },
    problemBottleneck: {
      heading:
        readString(doc.problemBottleneck?.heading) ??
        fallback.problemBottleneck.heading,
      intro:
        readString(doc.problemBottleneck?.intro) ??
        fallback.problemBottleneck.intro,
      items:
        problemItems.length > 0 ? problemItems : fallback.problemBottleneck.items,
      cards:
        problemCards.length > 0 ? problemCards : fallback.problemBottleneck.cards,
    },
    solution: {
      heading: readString(doc.solution?.heading) ?? fallback.solution.heading,
      body: readString(doc.solution?.body) ?? fallback.solution.body,
      pullLine: readString(doc.solution?.pullLine) ?? fallback.solution.pullLine,
      ctaLabel: readString(doc.solution?.ctaLabel) ?? fallback.solution.ctaLabel,
      ctaHref: readSafeString(doc.solution?.ctaHref) ?? fallback.solution.ctaHref,
      steps:
        solutionSteps.length > 0 ? solutionSteps : fallback.solution.steps,
      stepDescriptions:
        solutionStepDescriptions.length > 0
          ? solutionStepDescriptions
          : fallback.solution.stepDescriptions,
    },
    threePillars: {
      heading:
        readString(doc.threePillars?.heading) ?? fallback.threePillars.heading,
      intro: readString(doc.threePillars?.intro) ?? fallback.threePillars.intro,
      closingLine:
        readString(doc.threePillars?.closingLine) ??
        fallback.threePillars.closingLine,
      pillars: pillars.length > 0 ? pillars : fallback.threePillars.pillars,
    },
    servicesTeaser: {
      heading:
        readString(doc.servicesTeaser?.heading) ?? fallback.servicesTeaser.heading,
      body: readString(doc.servicesTeaser?.body) ?? fallback.servicesTeaser.body,
      heroTitle:
        readString(doc.servicesTeaser?.heroTitle) ??
        fallback.servicesTeaser.heroTitle,
      heroBody:
        readString(doc.servicesTeaser?.heroBody) ?? fallback.servicesTeaser.heroBody,
      heroChips:
        serviceHeroChips.length > 0
          ? serviceHeroChips
          : fallback.servicesTeaser.heroChips,
      cards:
        serviceCards.length > 0 ? serviceCards : fallback.servicesTeaser.cards,
      stats:
        serviceStats.length > 0 ? serviceStats : fallback.servicesTeaser.stats,
    },
    clientStoriesTeaser: {
      eyebrow:
        readString(doc.clientStoriesTeaser?.eyebrow) ??
        fallback.clientStoriesTeaser.eyebrow,
      heading:
        readString(doc.clientStoriesTeaser?.heading) ??
        fallback.clientStoriesTeaser.heading,
      body:
        readString(doc.clientStoriesTeaser?.body) ??
        fallback.clientStoriesTeaser.body,
      cta: mapLinkItem(
        doc.clientStoriesTeaser?.cta,
        fallback.clientStoriesTeaser.cta
      ),
      cards:
        clientStoriesTeaserCards.length > 0
          ? clientStoriesTeaserCards
          : fallback.clientStoriesTeaser.cards,
    },
    productsTeaser: {
      heading:
        readString(doc.productsTeaser?.heading) ?? fallback.productsTeaser.heading,
      body: readString(doc.productsTeaser?.body) ?? fallback.productsTeaser.body,
      trailingLine:
        readString(doc.productsTeaser?.trailingLine) ??
        fallback.productsTeaser.trailingLine,
      cta: mapLinkItem(doc.productsTeaser?.cta, fallback.productsTeaser.cta),
    },
    howWerePaid: {
      tag: readString(doc.howWerePaid?.tag) ?? fallback.howWerePaid.tag,
      heading:
        readString(doc.howWerePaid?.heading) ?? fallback.howWerePaid.heading,
      intro: readString(doc.howWerePaid?.intro) ?? fallback.howWerePaid.intro,
      yourWin: mapWinCard(doc.howWerePaid?.yourWin, fallback.howWerePaid.yourWin),
      ourWin: mapWinCard(doc.howWerePaid?.ourWin, fallback.howWerePaid.ourWin),
      mechanism: mapMechanism(
        doc.howWerePaid?.mechanism,
        fallback.howWerePaid.mechanism
      ),
      closingLine:
        readString(doc.howWerePaid?.closingLine) ??
        fallback.howWerePaid.closingLine,
    },
    costAuditHook: (() => {
      const chips = mapFactChips(doc.costAuditHook?.factChips);
      return {
        heading:
          readString(doc.costAuditHook?.heading) ?? fallback.costAuditHook.heading,
        paragraph1:
          readString(doc.costAuditHook?.paragraph1) ??
          fallback.costAuditHook.paragraph1,
        paragraph2:
          readString(doc.costAuditHook?.paragraph2) ??
          fallback.costAuditHook.paragraph2,
        cta: mapLinkItem(doc.costAuditHook?.cta, fallback.costAuditHook.cta),
        factChips: chips.length > 0 ? chips : fallback.costAuditHook.factChips,
        image: mapImage(doc.costAuditHook?.image, fallback.costAuditHook.image),
      };
    })(),
    whoWeWorkWith: {
      heading:
        readString(doc.whoWeWorkWith?.heading) ?? fallback.whoWeWorkWith.heading,
      intro: readString(doc.whoWeWorkWith?.intro) ?? fallback.whoWeWorkWith.intro,
      bullets:
        whoWeWorkWithBullets.length > 0
          ? whoWeWorkWithBullets
          : fallback.whoWeWorkWith.bullets,
      closingLine:
        readString(doc.whoWeWorkWith?.closingLine) ??
        fallback.whoWeWorkWith.closingLine,
    },
    sustainability: {
      heading:
        readString(doc.sustainability?.heading) ?? fallback.sustainability.heading,
      body: readString(doc.sustainability?.body) ?? fallback.sustainability.body,
      checklist:
        sustainabilityChecklist.length > 0
          ? sustainabilityChecklist
          : fallback.sustainability.checklist,
    },
    process: {
      heading: readString(doc.process?.heading) ?? fallback.process.heading,
      body: readString(doc.process?.body) ?? fallback.process.body,
      steps: processSteps.length > 0 ? processSteps : fallback.process.steps,
      stepDescriptions:
        processStepDescriptions.length > 0
          ? processStepDescriptions
          : fallback.process.stepDescriptions,
    },
    finalCta: {
      heading: readString(doc.finalCta?.heading) ?? fallback.finalCta.heading,
      body: readString(doc.finalCta?.body) ?? fallback.finalCta.body,
      primaryCta: mapLinkItem(
        doc.finalCta?.primaryCta,
        fallback.finalCta.primaryCta
      ),
      secondaryCta: mapLinkItem(
        doc.finalCta?.secondaryCta,
        fallback.finalCta.secondaryCta
      ),
      founderQuote: mapFounderQuote(
        doc.finalCta?.founderQuote,
        fallback.finalCta.founderQuote
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
