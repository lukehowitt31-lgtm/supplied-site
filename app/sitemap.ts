import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/content/blog";
import { getProducts } from "@/lib/content/products";
import { getClientStorySlugs } from "@/lib/content/clientStories";

const HARDCODED_STORY_SLUGS = [
  "healf",
  "spacegoods",
  "glaize-x-aston-martin",
  "trip",
  "glow-for-it",
  "uncle-matts-hats",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.suppliedpackaging.com";

  const buildDate = new Date();

  const [posts, products, cmsSlugs] = await Promise.all([
    getAllPosts(),
    getProducts(),
    getClientStorySlugs(),
  ]);

  const allStorySlugs = Array.from(
    new Set([...HARDCODED_STORY_SLUGS, ...cmsSlugs])
  );

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: buildDate, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/products`, lastModified: buildDate, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/client-stories`, lastModified: buildDate, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: buildDate, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/about-us`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/partnerships`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/knowledge-hub`, lastModified: buildDate, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/contact-us`, lastModified: buildDate, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/terms`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/privacy-policy`, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/cookie-policy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    ...(post.dateISO && { lastModified: new Date(post.dateISO) }),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: buildDate,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const storyRoutes: MetadataRoute.Sitemap = allStorySlugs.map((slug) => ({
    url: `${baseUrl}/client-stories/${slug}`,
    lastModified: buildDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...storyRoutes, ...blogRoutes];
}
