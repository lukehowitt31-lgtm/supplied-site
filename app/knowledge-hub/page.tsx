import type { Metadata } from "next";
import KnowledgeHub from "@/components/sections/KnowledgeHub";
import { getKnowledgeHubContent } from "@/lib/content/knowledgeHub";
import { getProducts } from "@/lib/content/products";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Packaging Knowledge Hub — Expert Q&A | Supplied",
  description:
    "Ask anything about packaging. Expert answers on MOQs, print methods, pricing, PPWR compliance and sustainability.",
  alternates: { canonical: "/knowledge-hub" },
  openGraph: {
    title: "Packaging Knowledge Hub — Expert Q&A | Supplied",
    description:
      "Ask anything about packaging. Expert answers on MOQs, print methods, pricing, PPWR compliance and sustainability.",
    url: "/knowledge-hub",
    images: [{ url: "/og?title=Packaging%20Knowledge%20Hub&subtitle=Expert%20Q%26A", width: 1200, height: 630, alt: "Supplied Knowledge Hub" }],
  },
};

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
