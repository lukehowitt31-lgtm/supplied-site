import type { Metadata } from "next";
import { BlogIndex } from "@/components/sections/BlogIndex";
import { getAllPosts, getAllCategories } from "@/lib/content/blog";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Packaging Blog — Insights & Strategy | Supplied",
  description:
    "Packaging insights and cost-saving strategies for fast-growing brands. Actionable advice on materials, sustainability and supply chain.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Packaging Blog — Insights & Strategy | Supplied",
    description:
      "Packaging insights and cost-saving strategies for fast-growing brands. Actionable advice on materials, sustainability and supply chain.",
    url: "/blog",
    images: [{ url: "/og?title=Packaging%20Blog&subtitle=Insights%20%26%20Strategy", width: 1200, height: 630, alt: "Supplied Blog" }],
  },
};

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
