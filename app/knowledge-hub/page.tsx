import type { Metadata } from "next";
import KnowledgeHub from "@/components/sections/KnowledgeHub";
import { getKnowledgeHubContent } from "@/lib/content/knowledgeHub";
import { getProducts } from "@/lib/content/products";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";
import { buildPageMetadata, ogImageUrl } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Packaging Knowledge Hub — Expert Q&A | Supplied",
  description:
    "Ask anything about packaging. Expert answers on MOQs, print methods, pricing, PPWR compliance and sustainability.",
  path: "/knowledge-hub",
  image: ogImageUrl({
    title: "Packaging Knowledge Hub",
    subtitle: "Expert Q&A",
  }),
  imageAlt: "Supplied Knowledge Hub",
});

export default async function Page() {
  const [content, products] = await Promise.all([
    getKnowledgeHubContent(),
    getProducts(),
  ]);
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Knowledge Hub" }]} />
      <KnowledgeHub content={content} products={products.slice(0, 6)} />
    </>
  );
}
