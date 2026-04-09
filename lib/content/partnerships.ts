import "server-only";

import { sanityFetch } from "@/lib/sanity/fetch";
import { partnershipsPageQuery } from "@/lib/sanity/queries";

// ── Public types ─────────────────────────────────────────────

export interface PartnershipLinkItem {
  label: string;
  href: string;
}

export interface PartnershipStatItem {
  value: string;
  label: string;
}

export interface PartnershipStep {
  step: string;
  title: string;
  desc: string;
}

export interface PartnershipBenefitCard {
  title: string;
  text: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
  category: string;
  website: string;
  image: string;
  description: string;
  highlights: string[];
}

export interface PartnershipFaq {
  question: string;
  answer: string;
}

export interface PartnershipsPageContent {
  hero: {
    tag: string;
    headline: string;
    subheadline: string;
    primaryCta: PartnershipLinkItem;
    secondaryCta: PartnershipLinkItem;
    stats: PartnershipStatItem[];
  };
  howItWorks: {
    tag: string;
    heading: string;
    steps: PartnershipStep[];
  };
  benefits: {
    tag: string;
    heading: string;
    cards: PartnershipBenefitCard[];
  };
  partnersSection: {
    tag: string;
    heading: string;
    subheading: string;
    partners: Partner[];
  };
  ctaSection: {
    heading: string;
    body: string;
    checklist: string[];
    formHeading: string;
  };
  faqsSection: {
    tag: string;
    heading: string;
    faqs: PartnershipFaq[];
  };
}

// ── Fallback content (current hardcoded values) ──────────────

export const fallbackPartnershipsPageContent: PartnershipsPageContent = {
  hero: {
    tag: "Partnerships",
    headline: "Grow with us.|Earn with us.",
    subheadline:
      "We partner with eCommerce agencies, consultants, and technology platforms to deliver better packaging outcomes for fast-growing brands. Refer clients, earn revenue, build together.",
    primaryCta: { label: "Become a Partner", href: "#become-partner" },
    secondaryCta: { label: "See Our Partners", href: "#partners" },
    stats: [
      { value: "50+", label: "Brands served" },
      { value: "23%", label: "Avg. client saving" },
      { value: "98%", label: "On-time delivery" },
      { value: "£0", label: "Cost to partner" },
    ],
  },
  howItWorks: {
    tag: "How it works",
    heading: "Three steps to |partnership",
    steps: [
      {
        step: "01",
        title: "Apply",
        desc: "Fill out a quick form telling us about your business and the brands you work with. We review every application within 48 hours.",
      },
      {
        step: "02",
        title: "Onboard",
        desc: "Meet your dedicated partner manager, get access to co-branded assets, pricing sheets, and your referral tracking dashboard.",
      },
      {
        step: "03",
        title: "Earn",
        desc: "Refer brands. We handle the packaging. You earn a recurring commission on every project — for the lifetime of the client.",
      },
    ],
  },
  benefits: {
    tag: "Partner benefits",
    heading: "What you |get",
    cards: [
      {
        title: "Revenue share",
        text: "Earn a recurring commission on every client you refer. No caps, no limits.",
      },
      {
        title: "Co-branded collateral",
        text: "Joint case studies, landing pages, and marketing assets to close deals together.",
      },
      {
        title: "Priority support",
        text: "Dedicated partner manager, fast-track sampling, and exclusive pricing for your clients.",
      },
      {
        title: "Listed on our site",
        text: "Your logo and profile featured on our partnerships page, visible to every brand we work with.",
      },
    ],
  },
  partnersSection: {
    tag: "Our Partners",
    heading: "Trusted by the |best",
    subheading:
      "Agencies, platforms, and consultants who trust Supplied to look after their clients' packaging.",
    partners: [
      {
        id: "ifglobal",
        name: "IFGlobal",
        logo: "/images/logos/ifglobal.webp",
        category: "Ecommerce Fulfilment",
        website: "https://www.ifglobal.com",
        image: "/images/partners/ifglobal.webp",
        description:
          "IFGlobal is a global ecommerce fulfilment partner with 20+ years of experience, providing adaptive fulfilment, growth consultancy, and smart technology across fulfilment centres in the UK, US, and EU. Their proprietary BladePRO software offers real-time order and inventory management, while their boutique, partner-led approach ensures every brand gets personalised support to scale — from pick, pack, and dispatch to returns management and bespoke packaging personalisation. Over 90% of their clients say they would recommend IFGlobal to other ecommerce brands.",
        highlights: [
          "UK, US & EU Fulfilment Centres",
          "Proprietary BladePRO Software",
          "20+ Years Experience",
          "90%+ Client Recommendation",
        ],
      },
      {
        id: "blc",
        name: "Black Label Creations",
        logo: "/images/logos/blc.webp",
        category: "Private Label Supplement Manufacturing",
        website: "https://www.blacklabelcreations.com",
        image: "/images/partners/blc.webp",
        description:
          "Black Label Creations is a full-service private label supplement manufacturing partner, helping ambitious brands create standout supplements from functional powders to RTDs and everything in between. With a purpose-built facility, ISO9001 accreditation, and audited manufacturing partners across the UK, USA, and EU, BLC supports brands from concept to shelf — including formulation, procurement, operations, quality control, and creative services.",
        highlights: [
          "Multi-Format Capabilities",
          "ISO9001 Accredited",
          "UK, USA & EU Manufacturing",
          "Concept to Shelf",
        ],
      },
      {
        id: "ecc",
        name: "eCom Collab Club",
        logo: "/images/logos/ecomcollabclub.svg",
        category: "eCommerce Community",
        website: "https://ecomcollabclub.com",
        image: "/images/partners/ecc.webp",
        description:
          "eCom Collab Club brings together the people behind fast-growing ecommerce brands to share knowledge, collaborate, and build meaningful business relationships. Connecting founders, operators, and service providers across the DTC ecosystem, eCom Collab Club is the go-to community for brands looking to learn, grow, and partner with the right people.",
        highlights: [
          "DTC Founder Network",
          "Knowledge Sharing",
          "Business Collaboration",
          "Ecosystem Connections",
        ],
      },
    ],
  },
  ctaSection: {
    heading: "Ready to |partner up?",
    body: "Whether you're an agency looking to add packaging to your offering, or a platform that wants to integrate — we'd love to hear from you.",
    checklist: [
      "No minimum referral volume",
      "Dedicated partner manager from day one",
      "Full co-branded marketing support",
      "Transparent tracking and reporting",
    ],
    formHeading: "Apply to partner",
  },
  faqsSection: {
    tag: "FAQs",
    heading: "Common questions",
    faqs: [
      {
        question: "Who can become a partner?",
        answer:
          "We work with eCommerce agencies, DTC consultants, fulfilment providers, and technology platforms. If you work with brands that need packaging, we want to talk.",
      },
      {
        question: "How does the referral commission work?",
        answer:
          "You earn a percentage of the revenue from every client you refer, paid monthly. Commission applies for the lifetime of the client relationship — not just the first order.",
      },
      {
        question: "Is there a cost to join?",
        answer:
          "No. The partnership programme is completely free. We provide all co-branded assets, a dedicated partner manager, and full onboarding at no cost.",
      },
      {
        question: "What support do you provide?",
        answer:
          "You'll get a named partner manager, co-branded collateral, joint case studies, priority sampling, and preferential pricing for your clients.",
      },
      {
        question: "How quickly can you onboard a referred client?",
        answer:
          "Typically within 48 hours of introduction. We'll have pricing and samples ready within a week, and first production within 4-6 weeks.",
      },
    ],
  },
};

// ── Sanity document shape ────────────────────────────────────

interface SanityLinkItem {
  label?: string | null;
  href?: string | null;
}

interface SanityPartnershipsPageDoc {
  hero?: {
    tag?: string | null;
    headline?: string | null;
    subheadline?: string | null;
    primaryCta?: SanityLinkItem | null;
    secondaryCta?: SanityLinkItem | null;
    stats?: unknown;
  } | null;
  howItWorks?: {
    tag?: string | null;
    heading?: string | null;
    steps?: unknown;
  } | null;
  benefits?: {
    tag?: string | null;
    heading?: string | null;
    cards?: unknown;
  } | null;
  partnersSection?: {
    tag?: string | null;
    heading?: string | null;
    subheading?: string | null;
    partners?: unknown;
  } | null;
  ctaSection?: {
    heading?: string | null;
    body?: string | null;
    checklist?: unknown;
    formHeading?: string | null;
  } | null;
  faqsSection?: {
    tag?: string | null;
    heading?: string | null;
    faqs?: unknown;
  } | null;
}

// ── Mapping helpers ──────────────────────────────────────────

function readString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  return value.trim().length > 0 ? value : undefined;
}

function mapStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => readString(item))
    .filter((item): item is string => Boolean(item));
}

function mapLinkItem(
  value: SanityLinkItem | null | undefined,
  fallback: PartnershipLinkItem
): PartnershipLinkItem {
  return {
    label: readString(value?.label) ?? fallback.label,
    href: readString(value?.href) ?? fallback.href,
  };
}

function mapStats(value: unknown): PartnershipStatItem[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return undefined;
      const record = item as { value?: unknown; label?: unknown };
      const statValue = readString(record.value);
      const label = readString(record.label);
      if (!statValue || !label) return undefined;
      return { value: statValue, label };
    })
    .filter((item): item is PartnershipStatItem => Boolean(item));
}

function mapSteps(value: unknown): PartnershipStep[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return undefined;
      const record = item as { step?: unknown; title?: unknown; desc?: unknown };
      const step = readString(record.step);
      const title = readString(record.title);
      const desc = readString(record.desc);
      if (!step || !title || !desc) return undefined;
      return { step, title, desc };
    })
    .filter((item): item is PartnershipStep => Boolean(item));
}

function mapBenefitCards(value: unknown): PartnershipBenefitCard[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return undefined;
      const record = item as { title?: unknown; text?: unknown };
      const title = readString(record.title);
      const text = readString(record.text);
      if (!title || !text) return undefined;
      return { title, text };
    })
    .filter((item): item is PartnershipBenefitCard => Boolean(item));
}

function mapPartners(value: unknown): Partner[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return undefined;
      const record = item as {
        id?: unknown;
        name?: unknown;
        logo?: unknown;
        category?: unknown;
        website?: unknown;
        image?: unknown;
        description?: unknown;
        highlights?: unknown;
      };
      const id = readString(record.id);
      const name = readString(record.name);
      const logo = readString(record.logo);
      const category = readString(record.category);
      const website = readString(record.website);
      const image = readString(record.image);
      const description = readString(record.description);
      const highlights = mapStringArray(record.highlights);
      if (!id || !name || !logo || !category || !website || !image || !description)
        return undefined;
      return { id, name, logo, category, website, image, description, highlights };
    })
    .filter((item): item is Partner => Boolean(item));
}

function mapFaqs(value: unknown): PartnershipFaq[] {
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
    .filter((item): item is PartnershipFaq => Boolean(item));
}

// ── Main mapper ──────────────────────────────────────────────

function mapPartnershipsPage(
  doc: SanityPartnershipsPageDoc | null
): PartnershipsPageContent {
  if (!doc) return fallbackPartnershipsPageContent;

  const fb = fallbackPartnershipsPageContent;

  const heroStats = mapStats(doc.hero?.stats);
  const howItWorksSteps = mapSteps(doc.howItWorks?.steps);
  const benefitCards = mapBenefitCards(doc.benefits?.cards);
  const partners = mapPartners(doc.partnersSection?.partners);
  const checklist = mapStringArray(doc.ctaSection?.checklist);
  const faqs = mapFaqs(doc.faqsSection?.faqs);

  return {
    hero: {
      tag: readString(doc.hero?.tag) ?? fb.hero.tag,
      headline: readString(doc.hero?.headline) ?? fb.hero.headline,
      subheadline: readString(doc.hero?.subheadline) ?? fb.hero.subheadline,
      primaryCta: mapLinkItem(doc.hero?.primaryCta, fb.hero.primaryCta),
      secondaryCta: mapLinkItem(doc.hero?.secondaryCta, fb.hero.secondaryCta),
      stats: heroStats.length > 0 ? heroStats : fb.hero.stats,
    },
    howItWorks: {
      tag: readString(doc.howItWorks?.tag) ?? fb.howItWorks.tag,
      heading: readString(doc.howItWorks?.heading) ?? fb.howItWorks.heading,
      steps: howItWorksSteps.length > 0 ? howItWorksSteps : fb.howItWorks.steps,
    },
    benefits: {
      tag: readString(doc.benefits?.tag) ?? fb.benefits.tag,
      heading: readString(doc.benefits?.heading) ?? fb.benefits.heading,
      cards: benefitCards.length > 0 ? benefitCards : fb.benefits.cards,
    },
    partnersSection: {
      tag: readString(doc.partnersSection?.tag) ?? fb.partnersSection.tag,
      heading:
        readString(doc.partnersSection?.heading) ?? fb.partnersSection.heading,
      subheading:
        readString(doc.partnersSection?.subheading) ?? fb.partnersSection.subheading,
      partners: partners.length > 0 ? partners : fb.partnersSection.partners,
    },
    ctaSection: {
      heading: readString(doc.ctaSection?.heading) ?? fb.ctaSection.heading,
      body: readString(doc.ctaSection?.body) ?? fb.ctaSection.body,
      checklist: checklist.length > 0 ? checklist : fb.ctaSection.checklist,
      formHeading: readString(doc.ctaSection?.formHeading) ?? fb.ctaSection.formHeading,
    },
    faqsSection: {
      tag: readString(doc.faqsSection?.tag) ?? fb.faqsSection.tag,
      heading: readString(doc.faqsSection?.heading) ?? fb.faqsSection.heading,
      faqs: faqs.length > 0 ? faqs : fb.faqsSection.faqs,
    },
  };
}

// ── Public fetch function ────────────────────────────────────

export async function getPartnershipsPageContent(): Promise<PartnershipsPageContent> {
  try {
    const doc = await sanityFetch<SanityPartnershipsPageDoc | null>({
      query: partnershipsPageQuery,
      tags: ["partnerships"],
    });
    return mapPartnershipsPage(doc);
  } catch {
    return fallbackPartnershipsPageContent;
  }
}
