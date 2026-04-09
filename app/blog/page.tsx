import type { Metadata } from "next";
import { BlogIndex } from "@/components/sections/BlogIndex";
import { getAllPosts, getAllCategories } from "@/lib/content/blog";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Packaging Blog — Insights & Strategy | Supplied",
  description:
    "Practical packaging insights, cost-saving strategies, and industry thinking for fast-growing consumer brands. No fluff — just actionable advice that scales with your business.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Packaging Blog — Insights & Strategy | Supplied",
    description:
      "Practical packaging insights, cost-saving strategies, and industry thinking for fast-growing consumer brands. No fluff — just actionable advice that scales with your business.",
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
