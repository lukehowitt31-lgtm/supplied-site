import "server-only";

import { sanityFetch } from "@/lib/sanity/fetch";
import { aboutPageQuery } from "@/lib/sanity/queries";

export interface AboutStat {
  value: string;
  label: string;
}

export interface AboutValue {
  num: string;
  title: string;
  body: string;
}

export interface AboutOffice {
  label: string;
  name: string;
  address: string;
  desc: string;
}

export interface AboutCtaLink {
  label: string;
  href: string;
}

export interface AboutFinalCta {
  heading: string;
  body: string;
  primaryCta: AboutCtaLink;
  secondaryCta: AboutCtaLink;
}

export interface AboutPullQuote {
  text: string;
  author: string;
  role: string;
}

export interface AboutPageContent {
  heroHeadline: string;
  heroSubheadline: string;
  shortVersionTag: string;
  shortVersionHeading: string;
  shortVersionBody: string[];
  stats: AboutStat[];
  teamTag: string;
  teamHeading: string;
  howWeWorkTag: string;
  values: AboutValue[];
  whatWeCoverTag: string;
  whatWeCoverHeading: string;
  capabilities: string[];
  pullQuote: AboutPullQuote;
  offices: AboutOffice[];
  finalCta: AboutFinalCta;
}

export const fallbackAboutPageContent: AboutPageContent = {
  heroHeadline: "Four founders.|One obsession.",
  heroSubheadline:
    "We started Supplied because we believed fast-growing brands deserved a packaging partner that thinks like an operator — not a supplier taking orders.",
  shortVersionTag: "The Short Version",
  shortVersionHeading:
    "We're a packaging consultancy for brands that|don't stand still.",
  shortVersionBody: [
    "London and Warsaw. Five people. A manufacturing network that spans six countries. We work with ecommerce, DTC, health, wellness, and beauty brands — the kind that are growing fast enough that packaging becomes a real operational problem, not just a line item.",
    "We don't just source boxes. We build packaging infrastructure — forecasting, supply chain architecture, brand alignment, cost optimisation, and regulatory compliance — so our clients can scale without packaging becoming the bottleneck.",
  ],
  stats: [
    { value: "50+", label: "Brands Partnered" },
    { value: "6", label: "Production Countries" },
    { value: "140+", label: "Verified Suppliers" },
    { value: "98%", label: "On-Time Delivery" },
    { value: "23%", label: "Avg. Client Saving" },
  ],
  teamTag: "The Team",
  teamHeading: "Small team.|Big reach.",
  howWeWorkTag: "How We Work",
  values: [
    {
      num: "01",
      title: "Ownership, Not Order-Taking",
      body: "We don't wait to be briefed. We manage packaging portfolios proactively — forecasting demand, flagging risks, and pushing improvements before they're asked for.",
    },
    {
      num: "02",
      title: "Infrastructure Over Transactions",
      body: "Every project is designed to create long-term value. We build systems — supplier networks, cost models, production calendars — not one-off solutions.",
    },
    {
      num: "03",
      title: "Transparency As Standard",
      body: "Full cost breakdowns. Real lead times. Honest trade-offs. We operate as an extension of your team, not a black box between you and your suppliers.",
    },
  ],
  whatWeCoverTag: "What We Cover",
  whatWeCoverHeading: "End-to-end.|Not just the box.",
  capabilities: [
    "Packaging design & engineering",
    "Global supplier sourcing",
    "Cost modelling & optimisation",
    "EU compliance (PPWR)",
    "Forecast-led production",
    "Sustainability transitions",
    "Brand alignment",
    "Retail-ready structuring",
  ],
  pullQuote: {
    text: "We built Supplied because the packaging industry treats growing brands like an afterthought. We think they deserve the infrastructure, attention, and strategic thinking that the biggest names get — without the overheads.",
    author: "The Founders",
    role: "Supplied Agency",
  },
  offices: [
    {
      label: "Supplied HQ",
      name: "Supplied",
      address:
        "Unit 19, Winnington Business Park, Wolstencroft, Northwich, Cheshire CW8 4DL",
      desc: "HQ. Client relationships, strategy, and new business.",
    },
    {
      label: "Warsaw",
      name: "Warsaw Office",
      address: "Warsaw, Poland",
      desc: "EU operations, supplier management, and production coordination.",
    },
  ],
  finalCta: {
    heading: "Like what you see? Let's talk packaging.",
    body: "Whether you're scaling fast, launching something new, or just tired of chasing suppliers — we'd love to hear from you.",
    primaryCta: {
      label: "Start a Project",
      href: "/contact-us",
    },
    secondaryCta: {
      label: "See Our Work",
      href: "/client-stories",
    },
  },
};

// ── Sanity document shape ────────────────────────────────────

interface SanityAboutStat {
  value?: string | null;
  label?: string | null;
}

interface SanityAboutValue {
  num?: string | null;
  title?: string | null;
  body?: string | null;
}

interface SanityAboutOffice {
  label?: string | null;
  name?: string | null;
  address?: string | null;
  desc?: string | null;
}

interface SanityAboutCtaLink {
  label?: string | null;
  href?: string | null;
}

interface SanityAboutFinalCta {
  heading?: string | null;
  body?: string | null;
  primaryCta?: SanityAboutCtaLink | null;
  secondaryCta?: SanityAboutCtaLink | null;
}

interface SanityPullQuote {
  text?: string | null;
  author?: string | null;
  role?: string | null;
}

interface SanityAboutPageDoc {
  hero?: {
    headline?: string | null;
    subheadline?: string | null;
  } | null;
  shortVersion?: {
    tag?: string | null;
    heading?: string | null;
    body?: string | null;
  } | null;
  stats?: unknown;
  team?: {
    tag?: string | null;
    heading?: string | null;
  } | null;
  howWeWork?: {
    tag?: string | null;
    values?: unknown;
  } | null;
  whatWeCover?: {
    tag?: string | null;
    heading?: string | null;
    capabilities?: unknown;
  } | null;
  pullQuote?: SanityPullQuote | null;
  offices?: unknown;
  finalCta?: SanityAboutFinalCta | null;
}

// ── Helpers ──────────────────────────────────────────────────

function readString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function splitParagraphs(text: string | null | undefined): string[] {
  const str = readString(text);
  if (!str) return [];
  return str
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

function mapStats(value: unknown): AboutStat[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return undefined;
      const r = item as SanityAboutStat;
      const v = readString(r.value);
      const l = readString(r.label);
      if (!v || !l) return undefined;
      return { value: v, label: l };
    })
    .filter((item): item is AboutStat => Boolean(item));
}

function mapValues(value: unknown): AboutValue[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return undefined;
      const r = item as SanityAboutValue;
      const num = readString(r.num);
      const title = readString(r.title);
      const body = readString(r.body);
      if (!num || !title || !body) return undefined;
      return { num, title, body };
    })
    .filter((item): item is AboutValue => Boolean(item));
}

function mapCapabilities(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => readString(item))
    .filter((item): item is string => Boolean(item));
}

function mapOffices(value: unknown): AboutOffice[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (!item || typeof item !== "object") return undefined;
      const r = item as SanityAboutOffice;
      const label = readString(r.label);
      const name = readString(r.name);
      const address = readString(r.address);
      const desc = readString(r.desc);
      if (!label || !name || !address || !desc) return undefined;
      return { label, name, address, desc };
    })
    .filter((item): item is AboutOffice => Boolean(item));
}

// ── Mapper ───────────────────────────────────────────────────

function mapAboutPage(doc: SanityAboutPageDoc | null): AboutPageContent {
  if (!doc) return fallbackAboutPageContent;

  const fb = fallbackAboutPageContent;

  const stats = mapStats(doc.stats);
  const values = mapValues(doc.howWeWork?.values);
  const capabilities = mapCapabilities(doc.whatWeCover?.capabilities);
  const offices = mapOffices(doc.offices);
  const shortVersionParas = splitParagraphs(doc.shortVersion?.body);

  return {
    heroHeadline: readString(doc.hero?.headline) ?? fb.heroHeadline,
    heroSubheadline: readString(doc.hero?.subheadline) ?? fb.heroSubheadline,
    shortVersionTag: readString(doc.shortVersion?.tag) ?? fb.shortVersionTag,
    shortVersionHeading: readString(doc.shortVersion?.heading) ?? fb.shortVersionHeading,
    shortVersionBody: shortVersionParas.length > 0 ? shortVersionParas : fb.shortVersionBody,
    stats: stats.length > 0 ? stats : fb.stats,
    teamTag: readString(doc.team?.tag) ?? fb.teamTag,
    teamHeading: readString(doc.team?.heading) ?? fb.teamHeading,
    howWeWorkTag: readString(doc.howWeWork?.tag) ?? fb.howWeWorkTag,
    values: values.length > 0 ? values : fb.values,
    whatWeCoverTag: readString(doc.whatWeCover?.tag) ?? fb.whatWeCoverTag,
    whatWeCoverHeading: readString(doc.whatWeCover?.heading) ?? fb.whatWeCoverHeading,
    capabilities: capabilities.length > 0 ? capabilities : fb.capabilities,
    pullQuote: {
      text: readString(doc.pullQuote?.text) ?? fb.pullQuote.text,
      author: readString(doc.pullQuote?.author) ?? fb.pullQuote.author,
      role: readString(doc.pullQuote?.role) ?? fb.pullQuote.role,
    },
    offices: offices.length > 0 ? offices : fb.offices,
    finalCta: {
      heading: readString(doc.finalCta?.heading) ?? fb.finalCta.heading,
      body: readString(doc.finalCta?.body) ?? fb.finalCta.body,
      primaryCta: {
        label: readString(doc.finalCta?.primaryCta?.label) ?? fb.finalCta.primaryCta.label,
        href: readString(doc.finalCta?.primaryCta?.href) ?? fb.finalCta.primaryCta.href,
      },
      secondaryCta: {
        label: readString(doc.finalCta?.secondaryCta?.label) ?? fb.finalCta.secondaryCta.label,
        href: readString(doc.finalCta?.secondaryCta?.href) ?? fb.finalCta.secondaryCta.href,
      },
    },
  };
}

export async function getAboutPageContent(): Promise<AboutPageContent> {
  try {
    const doc = await sanityFetch<SanityAboutPageDoc | null>({
      query: aboutPageQuery,
      tags: ["about"],
    });

    return mapAboutPage(doc);
  } catch {
    return fallbackAboutPageContent;
  }
}
