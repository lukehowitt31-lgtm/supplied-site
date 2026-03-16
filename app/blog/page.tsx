import type { Metadata } from "next";
import { BlogIndex } from "@/components/sections/BlogIndex";
import { getAllPosts, getAllCategories } from "@/lib/content/blog";

export const metadata: Metadata = {
  title: "Blog | Insights & Packaging Strategy | Supplied",
  description:
    "Practical packaging insights, cost-saving strategies, and industry thinking for fast-growing consumer brands. No fluff — just advice that scales.",
};

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ]);

  return <BlogIndex posts={posts} categories={categories} />;
}
