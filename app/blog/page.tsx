import type { Metadata } from "next";
import { BlogIndex } from "@/components/sections/BlogIndex";
import { getAllPosts, getAllCategories } from "@/lib/content/blog";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";
import { buildPageMetadata, ogImageUrl } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Packaging Blog — Insights & Strategy | Supplied",
  description:
    "Packaging insights and cost-saving strategies for fast-growing brands. Actionable advice on materials, sustainability and supply chain.",
  path: "/blog",
  image: ogImageUrl({
    title: "Packaging Blog",
    subtitle: "Insights & Strategy",
  }),
  imageAlt: "Supplied Blog",
});

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ]);

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Blog" }]} />
      <BlogIndex posts={posts} categories={categories} />
    </>
  );
}
