import "server-only";

import { sanityFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import {
  clientStoriesHubQuery,
  clientStoriesQuery,
  clientStoryBySlugQuery,
} from "@/lib/sanity/queries";
import type {
  ClientStoriesHubContent,
  ClientStoryDetail,
  ClientStoryMetric,
  ClientStorySummary,
} from "@/types/clientStory";

export const fallbackHubContent: Omit<ClientStoriesHubContent, "stories"> = {
  heading: "The work speaks for itself.",
  subheading:
    "From scaling supply chains to engineering limited-edition collaborations — here's how we help fast-growing brands turn packaging into a competitive advantage.",
  cta: {
    label: "Start a Project",
    href: "/contact-us",
  },
};

export const legacyClientStories: ClientStorySummary[] = [
  {
    slug: "healf",
    brand: "Healf",
    headline: "The Packaging Infrastructure Behind",
    headlineAccent: "434% Growth.",
    tag: "End-to-End Partner",
    metric: "434%",
    metricLabel: "Growth Year",
    image: "/images/client-stories/healf-hero.png",
    position: "center 35%",
    desc: "Structured a forecast-led packaging system supporting 10–15 SKUs across 6–10 annual shipments — replacing fragmented sourcing with predictable, scalable supply.",
    logo: "/images/logos/healf.svg",
  },
  {
    slug: "spacegoods",
    brand: "Spacegoods",
    headline: "Come for the project.",
    headlineAccent: "Stay for the partnership.",
    tag: "D2C & Retail",
    metric: "+122%",
    metricLabel: "Search Growth",
    image: "/images/client-stories/spacegoods-hero.webp",
    position: "center",
    desc: "What started as a mailer box upgrade became a full packaging partnership — 10+ SKUs, monthly supply cadence, and a Tesco retail launch.",
    logo: "/images/logos/spacegoods.svg",
  },
  {
    slug: "glaize-x-aston-martin",
    brand: "Glaize × Aston Martin",
    headline: "Crossing the finish line in just",
    headlineAccent: "3.5 weeks.",
    tag: "Limited Edition",
    metric: "3.5 wks",
    metricLabel: "End-to-End",
    image: "/images/client-stories/glaize-hero.jpg",
    position: "center 40%",
    desc: "200 premium litho mailers with physical Aston Martin Green colour matching — engineered as a controlled sprint for the British Grand Prix.",
    logo: "/images/logos/glaize.svg",
  },
  {
    slug: "trip",
    brand: "TRIP",
    headline: "Accelerating supply chains for a",
    headlineAccent: "fast-growing brand.",
    tag: "Supply Chain",
    metric: "50%",
    metricLabel: "Faster Lead Times",
    image: "/images/client-stories/trip-hero.png",
    position: "center",
    desc: "Transitioned tube production from China to Europe, cutting lead times from 12+ weeks to 5–6 weeks while improving cost efficiency.",
    logo: "/images/logos/trip.svg",
  },
  {
    slug: "glow-for-it",
    brand: "Glow For It",
    headline: "Delivering premium packaging",
    headlineAccent: "under pressure.",
    tag: "Influencer Collab",
    metric: "20 days",
    metricLabel: "Brief to Order",
    image: "/images/client-stories/glowforit-hero.png",
    position: "center 25%",
    desc: "A bespoke influencer mailer box for a Kyra-Mae collaboration — first design in 24 hours, printed samples hand-delivered, launched on time.",
    logo: "/images/logos/glowforit.svg",
  },
  {
    slug: "uncle-matts-hats",
    brand: "Uncle Matt's Hats",
    headline: "More than just a hat.",
    headlineAccent: "More than just packaging.",
    tag: "For A Just Cause",
    metric: "Iconic",
    metricLabel: "Packaging Moment",
    image: "/images/client-stories/unclemattshats-hero.webp",
    position: "center",
    desc: "A custom ice cream tub that didn't exist until we built it — 3–4 sample rounds to create packaging that customers keep, display, and share.",
    logo: "/images/logos/uncle-matts.png",
  },
];

const legacyStorySummaryBySlug = new Map(
  legacyClientStories.map((story) => [story.slug, story])
);

const legacyStoryDetailsBySlug = new Map(
  legacyClientStories.map((story) => [
    story.slug,
    {
      slug: story.slug,
      title: story.brand,
      clientName: story.brand,
      industry: story.tag,
      heroImage: story.image,
      challenge: story.desc,
      solution: story.desc,
      result: story.desc,
      metrics: [
        {
          value: story.metric,
          label: story.metricLabel,
        },
      ],
      quote: "",
      quoteAuthor: "",
      quoteRole: "",
      ctaLabel: "Start a Project",
      ctaHref: "/contact-us",
    } satisfies ClientStoryDetail,
  ])
);

export function getLegacyClientStoryDetailBySlug(
  slug: string
): ClientStoryDetail | undefined {
  const normalizedSlug = slug.trim();
  if (!normalizedSlug) {
    return undefined;
  }

  return legacyStoryDetailsBySlug.get(normalizedSlug);
}

interface SanityImageAssetField {
  _ref?: string | null;
}

interface SanityImageField {
  asset?: SanityImageAssetField | null;
}

interface SanityMetricField {
  value?: string | null;
  label?: string | null;
}

interface SanityClientStoryDoc {
  title?: string | null;
  slug?: string | null;
  clientName?: string | null;
  industry?: string | null;
  challenge?: string | null;
  solution?: string | null;
  result?: string | null;
  quote?: string | null;
  quoteAuthor?: string | null;
  quoteRole?: string | null;
  ctaLabel?: string | null;
  ctaHref?: string | null;
  heroImage?: SanityImageField | null;
  metrics?: unknown;
}

interface SanityHubDoc {
  heading?: string | null;
  subheading?: string | null;
  cta?: {
    label?: string | null;
    href?: string | null;
  } | null;
  featuredStories?: SanityClientStoryDoc[] | null;
}

function readString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : undefined;
}

function imageUrlFromField(image: SanityImageField | null | undefined): string | undefined {
  const assetRef = readString(image?.asset?._ref);
  if (!assetRef) {
    return undefined;
  }

  try {
    return urlFor({
      _type: "image",
      asset: {
        _type: "reference",
        _ref: assetRef,
      },
    })
      .auto("format")
      .url();
  } catch {
    return undefined;
  }
}

function mapMetrics(value: unknown): ClientStoryMetric[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return undefined;
      }

      const metric = item as SanityMetricField;
      const metricValue = readString(metric.value);
      const label = readString(metric.label);

      if (!metricValue || !label) {
        return undefined;
      }

      return {
        value: metricValue,
        label,
      };
    })
    .filter((item): item is ClientStoryMetric => Boolean(item));
}

function mapSanityStory(doc: SanityClientStoryDoc): ClientStoryDetail | null {
  const slug = readString(doc.slug);
  if (!slug) {
    return null;
  }

  const fallbackStory = legacyStoryDetailsBySlug.get(slug);

  const title = readString(doc.title) ?? fallbackStory?.title ?? slug;
  const clientName = readString(doc.clientName) ?? fallbackStory?.clientName ?? title;
  const industry = readString(doc.industry) ?? fallbackStory?.industry ?? "Client Story";
  const challenge = readString(doc.challenge) ?? fallbackStory?.challenge ?? "";
  const solution = readString(doc.solution) ?? fallbackStory?.solution ?? challenge;
  const result = readString(doc.result) ?? fallbackStory?.result ?? solution;
  const quote = readString(doc.quote) ?? fallbackStory?.quote ?? "";
  const quoteAuthor = readString(doc.quoteAuthor) ?? fallbackStory?.quoteAuthor ?? "";
  const quoteRole = readString(doc.quoteRole) ?? fallbackStory?.quoteRole ?? "";
  const ctaLabel = readString(doc.ctaLabel) ?? fallbackStory?.ctaLabel ?? "Start a Project";
  const ctaHref = readString(doc.ctaHref) ?? fallbackStory?.ctaHref ?? "/contact-us";
  const heroImage =
    imageUrlFromField(doc.heroImage) ?? fallbackStory?.heroImage ?? "/images/client-stories/healf-hero.png";

  const metrics = mapMetrics(doc.metrics);

  return {
    slug,
    title,
    clientName,
    industry,
    challenge,
    solution,
    result,
    quote,
    quoteAuthor,
    quoteRole,
    ctaLabel,
    ctaHref,
    heroImage,
    metrics: metrics.length > 0 ? metrics : fallbackStory?.metrics ?? [],
  };
}

function mapDetailToSummary(story: ClientStoryDetail): ClientStorySummary {
  const fallbackSummary = legacyStorySummaryBySlug.get(story.slug);

  return {
    slug: story.slug,
    brand: story.clientName || fallbackSummary?.brand || story.title,
    headline: fallbackSummary?.headline || story.title,
    headlineAccent: fallbackSummary?.headlineAccent || "",
    tag: story.industry || fallbackSummary?.tag || "Client Story",
    metric:
      story.metrics[0]?.value || fallbackSummary?.metric || "Case Study",
    metricLabel:
      story.metrics[0]?.label || fallbackSummary?.metricLabel || "Metric",
    image: story.heroImage || fallbackSummary?.image || "/images/client-stories/healf-hero.png",
    position: fallbackSummary?.position || "center",
    desc:
      story.result ||
      story.solution ||
      story.challenge ||
      fallbackSummary?.desc ||
      "",
    logo: fallbackSummary?.logo || "/images/brand/supplied-logo.svg",
  };
}

async function fetchStoriesFromSanity(): Promise<ClientStoryDetail[]> {
  const docs = await sanityFetch<SanityClientStoryDoc[]>({
    query: clientStoriesQuery,
    tags: ["client-stories"],
  });

  return docs
    .map((doc) => mapSanityStory(doc))
    .filter((story): story is ClientStoryDetail => Boolean(story));
}

export async function getClientStories(): Promise<ClientStorySummary[]> {
  try {
    const stories = await fetchStoriesFromSanity();
    if (stories.length > 0) {
      return stories.map((story) => mapDetailToSummary(story));
    }
  } catch {
    // Fall back to local story data if Sanity is empty or unavailable.
  }

  return legacyClientStories;
}

export async function getClientStoryBySlug(
  slug: string
): Promise<ClientStoryDetail | undefined> {
  const normalizedSlug = slug.trim();
  if (!normalizedSlug) {
    return undefined;
  }

  try {
    const doc = await sanityFetch<SanityClientStoryDoc | null>({
      query: clientStoryBySlugQuery,
      params: { slug: normalizedSlug },
      tags: ["client-stories"],
    });

    if (doc) {
      const mappedStory = mapSanityStory(doc);
      if (mappedStory) {
        return mappedStory;
      }
    }
  } catch {
    // Fall back to local story data if Sanity is unavailable.
  }

  return legacyStoryDetailsBySlug.get(normalizedSlug);
}

export async function getClientStoryBySlugFromSanity(
  slug: string
): Promise<ClientStoryDetail | undefined> {
  const normalizedSlug = slug.trim();
  if (!normalizedSlug) {
    return undefined;
  }

  try {
    const doc = await sanityFetch<SanityClientStoryDoc | null>({
      query: clientStoryBySlugQuery,
      params: { slug: normalizedSlug },
      tags: ["client-stories"],
    });

    if (!doc) {
      return undefined;
    }

    const mappedStory = mapSanityStory(doc);
    return mappedStory ?? undefined;
  } catch {
    return undefined;
  }
}

export async function getClientStorySlugs(): Promise<string[]> {
  const stories = await getClientStories();
  return stories.map((story) => story.slug);
}

export async function getClientStoriesHubContent(): Promise<ClientStoriesHubContent> {
  let stories: ClientStorySummary[] = [];

  try {
    const hubDoc = await sanityFetch<SanityHubDoc | null>({
      query: clientStoriesHubQuery,
      tags: ["client-stories"],
    });

    if (Array.isArray(hubDoc?.featuredStories) && hubDoc.featuredStories.length > 0) {
      stories = hubDoc.featuredStories
        .map((story) => mapSanityStory(story))
        .filter((story): story is ClientStoryDetail => Boolean(story))
        .map((story) => mapDetailToSummary(story));
    } else {
      stories = await getClientStories();
    }

    if (stories.length === 0) {
      stories = legacyClientStories;
    }

    return {
      heading: readString(hubDoc?.heading) ?? fallbackHubContent.heading,
      subheading: readString(hubDoc?.subheading) ?? fallbackHubContent.subheading,
      cta: {
        label: readString(hubDoc?.cta?.label) ?? fallbackHubContent.cta.label,
        href: readString(hubDoc?.cta?.href) ?? fallbackHubContent.cta.href,
      },
      stories,
    };
  } catch {
    return {
      ...fallbackHubContent,
      stories: legacyClientStories,
    };
  }
}

