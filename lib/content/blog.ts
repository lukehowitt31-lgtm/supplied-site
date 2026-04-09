import "server-only";

import { sanityFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import { blogPostBySlugQuery, blogPostsQuery } from "@/lib/sanity/queries";
import { BlogPost } from "@/types";

export const legacyPosts: BlogPost[] = [
  {
    slug: "25-real-ways-to-cut-packaging-costs-part-5-final",
    title: "25 Real Ways to Cut Packaging Costs – Part 5 (Final)",
    date: "May 14, 2025",
    category: "Packaging Advice",
    excerpt:
      "How smart packaging supports growth, sustainability, brand trust, and better decision-making across your team.",
    image: "/images/blog/cost-savings-hero.webp",
    featured: true,
  },
  {
    slug: "25-real-ways-to-cut-packaging-costs-part-4",
    title: "25 Real Ways to Cut Packaging Costs – Part 4",
    date: "May 7, 2025",
    category: "Packaging Advice",
    excerpt:
      "From supplier selection to order strategy — where the biggest savings can be unlocked.",
    image: "/images/blog/cost-savings-hero.webp",
  },
  {
    slug: "25-real-ways-to-cut-packaging-costs-part-3",
    title: "25 Real Ways to Cut Packaging Costs – Part 3",
    date: "April 30, 2025",
    category: "Packaging Advice",
    excerpt:
      "Customer experience strategies that reduce returns, improve perception, and save money.",
    image: "/images/blog/cost-savings-hero.webp",
  },
  {
    slug: "25-real-ways-to-cut-packaging-costs-part-2",
    title: "25 Real Ways to Cut Packaging Costs – Part 2",
    date: "April 23, 2025",
    category: "Packaging Advice",
    excerpt:
      "Reduce spend through smarter supply chain thinking — shipping, storage, and fulfilment.",
    image: "/images/blog/cost-savings-hero.webp",
  },
  {
    slug: "25-real-ways-to-cut-packaging-costs-part-1",
    title: "25 Real Ways to Cut Packaging Costs – Part 1",
    date: "April 16, 2025",
    category: "Packaging Advice",
    excerpt:
      "10 practical ways to save money through smarter packaging design without cutting corners.",
    image: "/images/blog/cost-savings-hero.webp",
  },
  {
    slug: "spring-clean-your-packaging",
    title: "Spring Clean Your Packaging Supply Chain",
    date: "April 2, 2025",
    category: "Urgent Information",
    excerpt:
      "With summer launches ahead, address lead times and hidden issues now.",
    image: "/images/blog/spring-clean.webp",
  },
  {
    slug: "black-friday-deadlines",
    title: "It's Beginning to Look a Lot Like Christmas…",
    date: "August 23, 2024",
    category: "Urgent Information",
    excerpt:
      "Black Friday packaging deadlines are looming. Here's what you need to know.",
    image: "/images/blog/black-friday.webp",
  },
];

interface SanitySlugField {
  current?: string | null;
}

interface SanityImageAssetField {
  _ref?: string | null;
}

interface SanityImageField {
  asset?: SanityImageAssetField | null;
}

interface SanityCategoryField {
  title?: string | null;
}

interface SanitySeoField {
  title?: string | null;
  description?: string | null;
}

interface SanityBlogPostDoc {
  slug?: SanitySlugField | null;
  title?: string | null;
  excerpt?: string | null;
  image?: SanityImageField | null;
  bannerImage?: SanityImageField | null;
  category?: SanityCategoryField | null;
  publishedDate?: string | null;
  featured?: boolean | null;
  body?: unknown[] | null;
  seo?: SanitySeoField | null;
}

function readString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : undefined;
}

function formatDate(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const parsedDate = new Date(value);
  if (Number.isNaN(parsedDate.getTime())) {
    return undefined;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}

function toISODate(value: string | undefined | null): string | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return undefined;
  return d.toISOString().slice(0, 10);
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

function mapSanityBlogPost(doc: SanityBlogPostDoc): BlogPost | null {
  const slug = readString(doc.slug?.current);
  if (!slug) {
    return null;
  }

  const legacyPost = legacyPosts.find((post) => post.slug === slug);
  const title = readString(doc.title) ?? legacyPost?.title;
  const excerpt = readString(doc.excerpt) ?? legacyPost?.excerpt;
  const category = readString(doc.category?.title) ?? legacyPost?.category;
  const date = formatDate(readString(doc.publishedDate)) ?? legacyPost?.date;

  if (!title || !excerpt || !category || !date) {
    return null;
  }

  const thumbnailUrl = imageUrlFromField(doc.image) ?? legacyPost?.image ?? "/images/blog/cost-savings-hero.webp";
  const bannerUrl = imageUrlFromField(doc.bannerImage);

  const dateISO =
    toISODate(readString(doc.publishedDate)) ??
    toISODate(legacyPost?.date);

  const post: BlogPost = {
    slug,
    title,
    date,
    dateISO,
    category,
    excerpt,
    image: thumbnailUrl,
    bannerImage: bannerUrl ?? undefined,
    featured: typeof doc.featured === "boolean" ? doc.featured : legacyPost?.featured,
  };

  if (Array.isArray(doc.body) && doc.body.length > 0) {
    post.body = doc.body;
  }

  if (doc.seo) {
    const seoTitle = readString(doc.seo.title);
    const seoDesc = readString(doc.seo.description);
    if (seoTitle || seoDesc) {
      post.seo = { title: seoTitle, description: seoDesc };
    }
  }

  return post;
}

async function fetchAllPostsFromSanity(): Promise<BlogPost[]> {
  const docs = await sanityFetch<SanityBlogPostDoc[]>({
    query: blogPostsQuery,
    tags: ["blog"],
  });
  return docs
    .map((doc) => mapSanityBlogPost(doc))
    .filter((post): post is BlogPost => Boolean(post));
}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const sanityPosts = await fetchAllPostsFromSanity();
    if (sanityPosts.length > 0) {
      return sanityPosts;
    }
  } catch (err) {
    console.error("[getAllPosts] Sanity fetch failed, falling back to legacy:", err);
  }

  return legacyPosts;
}

export async function getFeaturedPost(): Promise<BlogPost | undefined> {
  const posts = await getAllPosts();
  return posts.find((p) => p.featured);
}

export async function getPostsByCategory(category: string): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  if (category === "All") {
    return posts;
  }

  return posts.filter((p) => p.category === category);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const normalizedSlug = slug.trim();
  if (!normalizedSlug) {
    return undefined;
  }

  try {
    const doc = await sanityFetch<SanityBlogPostDoc | null>({
      query: blogPostBySlugQuery,
      params: { slug: normalizedSlug },
      tags: ["blog"],
    });
    if (doc) {
      const mappedPost = mapSanityBlogPost(doc);
      if (mappedPost) {
        return mappedPost;
      }
    }
  } catch {
    // Fall back to local blog data if Sanity is unavailable.
  }

  const legacyPost = legacyPosts.find((p) => p.slug === normalizedSlug);
  if (legacyPost) {
    const { getLegacyBlogBody } = await import("./blog-body");
    const body = getLegacyBlogBody(normalizedSlug);
    if (body) {
      return { ...legacyPost, body };
    }
  }
  return legacyPost;
}

export async function getRelatedPosts(
  currentSlug: string,
  category: string,
  limit = 3,
): Promise<BlogPost[]> {
  const posts = await getAllPosts();
  const sameCategory = posts.filter(
    (p) => p.slug !== currentSlug && p.category === category,
  );
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }
  const remaining = posts.filter(
    (p) => p.slug !== currentSlug && p.category !== category,
  );
  return [...sameCategory, ...remaining].slice(0, limit);
}

export async function getAllCategories(): Promise<string[]> {
  const posts = await getAllPosts();
  return ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
}
