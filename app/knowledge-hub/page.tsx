import type { Metadata } from "next";
import KnowledgeHub from "@/components/sections/KnowledgeHub";
import { getKnowledgeHubContent } from "@/lib/content/knowledgeHub";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Packaging Knowledge Hub — Expert Q&A | Supplied",
  description:
    "Ask anything about packaging. Instant expert answers on MOQs, print methods, pricing, PPWR compliance and sustainability — powered by Supplied's AI knowledge base.",
  alternates: { canonical: "/knowledge-hub" },
  openGraph: {
    title: "Packaging Knowledge Hub — Expert Q&A | Supplied",
    description:
      "Ask anything about packaging. Instant expert answers on MOQs, print methods, pricing, PPWR compliance and sustainability — powered by Supplied's AI knowledge base.",
    url: "/knowledge-hub",
  },
};

export default async function Page() {
  const content = await getKnowledgeHubContent();
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Knowledge Hub" }]} />
      <KnowledgeHub content={content} />
    </>
  );
}
