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
}

export interface AboutPageContent {
  heroHeadline: string;
  heroSubheadline: string;
  stats: AboutStat[];
  values: AboutValue[];
  capabilities: string[];
  offices: AboutOffice[];
  finalCta: AboutFinalCta;
}

export const fallbackAboutPageContent: AboutPageContent = {
  heroHeadline: "Four founders. One obsession.",
  heroSubheadline:
    "We started Supplied because we believed fast-growing brands deserved a packaging partner that thinks like an operator — not a supplier taking orders.",
  stats: [
    { value: "50+", label: "Brands Partnered" },
    { value: "6", label: "Production Countries" },
    { value: "140+", label: "Verified Suppliers" },
    { value: "98%", label: "On-Time Delivery" },
    { value: "23%", label: "Avg. Client Saving" },
  ],
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
  },
};

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
}

interface SanityAboutPageDoc {
  heroHeadline?: string | null;
  heroSubheadline?: string | null;
  stats?: unknown;
  values?: unknown;
  capabilities?: unknown;
  offices?: unknown;
  finalCta?: SanityAboutFinalCta | null;
}

function readString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : undefined;
}

function mapStats(value: unknown): AboutStat[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return undefined;
      }

      const record = item as SanityAboutStat;
      const statValue = readString(record.value);
      const label = readString(record.label);

      if (!statValue || !label) {
        return undefined;
      }

      return { value: statValue, label };
    })
    .filter((item): item is AboutStat => Boolean(item));
}

function mapValues(value: unknown): AboutValue[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return undefined;
      }

      const record = item as SanityAboutValue;
      const num = readString(record.num);
      const title = readString(record.title);
      const body = readString(record.body);

      if (!num || !title || !body) {
        return undefined;
      }

      return { num, title, body };
    })
    .filter((item): item is AboutValue => Boolean(item));
}

function mapCapabilities(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => readString(item))
    .filter((item): item is string => Boolean(item));
}

function mapOffices(value: unknown): AboutOffice[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return undefined;
      }

      const record = item as SanityAboutOffice;
      const label = readString(record.label);
      const name = readString(record.name);
      const address = readString(record.address);
      const desc = readString(record.desc);

      if (!label || !name || !address || !desc) {
        return undefined;
      }

      return { label, name, address, desc };
    })
    .filter((item): item is AboutOffice => Boolean(item));
}

function mapAboutPage(doc: SanityAboutPageDoc | null): AboutPageContent {
  if (!doc) {
    return fallbackAboutPageContent;
  }

  const stats = mapStats(doc.stats);
  const values = mapValues(doc.values);
  const capabilities = mapCapabilities(doc.capabilities);
  const offices = mapOffices(doc.offices);

  const ctaHeading =
    readString(doc.finalCta?.heading) ?? fallbackAboutPageContent.finalCta.heading;
  const ctaBody = readString(doc.finalCta?.body) ?? fallbackAboutPageContent.finalCta.body;
  const ctaLabel =
    readString(doc.finalCta?.primaryCta?.label) ??
    fallbackAboutPageContent.finalCta.primaryCta.label;
  const ctaHref =
    readString(doc.finalCta?.primaryCta?.href) ??
    fallbackAboutPageContent.finalCta.primaryCta.href;

  return {
    heroHeadline:
      readString(doc.heroHeadline) ?? fallbackAboutPageContent.heroHeadline,
    heroSubheadline:
      readString(doc.heroSubheadline) ?? fallbackAboutPageContent.heroSubheadline,
    stats: stats.length > 0 ? stats : fallbackAboutPageContent.stats,
    values: values.length > 0 ? values : fallbackAboutPageContent.values,
    capabilities:
      capabilities.length > 0 ? capabilities : fallbackAboutPageContent.capabilities,
    offices: offices.length > 0 ? offices : fallbackAboutPageContent.offices,
    finalCta: {
      heading: ctaHeading,
      body: ctaBody,
      primaryCta: {
        label: ctaLabel,
        href: ctaHref,
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
