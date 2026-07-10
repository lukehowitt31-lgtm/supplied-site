import type { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { sanityFetch } from "@/lib/sanity/fetch";

const HARDCODED_STORY_SLUGS = [
  "healf",
  "spacegoods",
  "glaize-x-aston-martin",
  "trip",
  "glow-for-it",
  "uncle-matts-hats",
];

/** Fixed date for routes with no Sanity document — never use new Date() here. */
const STATIC_LAST_MODIFIED = new Date("2026-04-05T00:00:00.000Z");

interface SlugUpdatedAt {
  slug?: string | null;
  _updatedAt?: string | null;
}

interface SitemapDates {
  homePage?: string | null;
  aboutPage?: string | null;
  productsIndexPage?: string | null;
  clientStoriesHub?: string | null;
  partnershipsPage?: string | null;
  knowledgeHubPage?: string | null;
  merchPage?: string | null;
  contactPage?: string | null;
  blogPosts?: SlugUpdatedAt[] | null;
  products?: SlugUpdatedAt[] | null;
  clientStories?: SlugUpdatedAt[] | null;
}

const sitemapDatesQuery = groq`{
  "homePage": *[_type == "homePage"][0]._updatedAt,
  "aboutPage": *[_type == "aboutPage"][0]._updatedAt,
  "productsIndexPage": *[_type == "productsIndexPage"][0]._updatedAt,
  "clientStoriesHub": *[_type == "clientStoriesHub"][0]._updatedAt,
  "partnershipsPage": *[_type == "partnershipsPage"][0]._updatedAt,
  "knowledgeHubPage": *[_type == "knowledgeHubPage"][0]._updatedAt,
  "merchPage": *[_type == "merchPage"][0]._updatedAt,
  "contactPage": *[_type == "contactPage"][0]._updatedAt,
  "blogPosts": *[_type == "blogPost"]{ "slug": slug.current, _updatedAt },
  "products": *[_type == "product"]{ "slug": slug.current, _updatedAt },
  "clientStories": *[_type == "clientStory"]{ "slug": slug.current, _updatedAt }
}`;

function toLastModified(value: string | null | undefined): Date | undefined {
  if (!value) {
    return undefined;
  }

  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? undefined : parsed;
}

function lastModifiedOrStatic(value: string | null | undefined): Date {
  return toLastModified(value) ?? STATIC_LAST_MODIFIED;
}

function maxLastModified(entries: SlugUpdatedAt[] | null | undefined): Date {
  if (!Array.isArray(entries) || entries.length === 0) {
    return STATIC_LAST_MODIFIED;
  }

  let latest = STATIC_LAST_MODIFIED.getTime();

  for (const entry of entries) {
    const parsed = toLastModified(entry._updatedAt);
    if (parsed && parsed.getTime() > latest) {
      latest = parsed.getTime();
    }
  }

  return new Date(latest);
}

function slugUpdatedAtMap(
  entries: SlugUpdatedAt[] | null | undefined
): Map<string, Date> {
  const map = new Map<string, Date>();

  if (!Array.isArray(entries)) {
    return map;
  }

  for (const entry of entries) {
    const slug = entry.slug?.trim();
    const updatedAt = toLastModified(entry._updatedAt);
    if (slug && updatedAt) {
      map.set(slug, updatedAt);
    }
  }

  return map;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.suppliedpackaging.com";

  const dates = await sanityFetch<SitemapDates>({
    query: sitemapDatesQuery,
    tags: ["sanity"],
  });

  const blogPosts = dates.blogPosts ?? [];
  const products = dates.products ?? [];
  const clientStories = dates.clientStories ?? [];

  const blogLastModified = maxLastModified(blogPosts);
  const productUpdatedAtBySlug = slugUpdatedAtMap(products);
  const storyUpdatedAtBySlug = slugUpdatedAtMap(clientStories);

  const cmsStorySlugs = clientStories
    .map((story) => story.slug?.trim())
    .filter((slug): slug is string => Boolean(slug));

  const allStorySlugs = Array.from(
    new Set([...HARDCODED_STORY_SLUGS, ...cmsStorySlugs])
  );

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: lastModifiedOrStatic(dates.homePage),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: lastModifiedOrStatic(dates.productsIndexPage),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/client-stories`,
      lastModified: lastModifiedOrStatic(dates.clientStoriesHub),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: blogLastModified,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: lastModifiedOrStatic(dates.aboutPage),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/partnerships`,
      lastModified: lastModifiedOrStatic(dates.partnershipsPage),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/knowledge-hub`,
      lastModified: lastModifiedOrStatic(dates.knowledgeHubPage),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/merch`,
      lastModified: lastModifiedOrStatic(dates.merchPage),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: lastModifiedOrStatic(dates.contactPage),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    { url: `${baseUrl}/terms`, lastModified: STATIC_LAST_MODIFIED, changeFrequency: "yearly", priority: 0.2 },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts
    .map((post) => {
      const slug = post.slug?.trim();
      if (!slug) {
        return null;
      }

      return {
        url: `${baseUrl}/blog/${slug}`,
        lastModified: lastModifiedOrStatic(post._updatedAt),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      };
    })
    .filter((route): route is NonNullable<typeof route> => route !== null);

  const productRoutes: MetadataRoute.Sitemap = products
    .map((product) => {
      const slug = product.slug?.trim();
      if (!slug) {
        return null;
      }

      return {
        url: `${baseUrl}/products/${slug}`,
        lastModified: productUpdatedAtBySlug.get(slug) ?? STATIC_LAST_MODIFIED,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      };
    })
    .filter((route): route is NonNullable<typeof route> => route !== null);

  const storyRoutes: MetadataRoute.Sitemap = allStorySlugs.map((slug) => ({
    url: `${baseUrl}/client-stories/${slug}`,
    lastModified: storyUpdatedAtBySlug.get(slug) ?? STATIC_LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...storyRoutes, ...blogRoutes];
}
