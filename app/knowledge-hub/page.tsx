import type { Metadata } from "next";
import KnowledgeHub from "@/components/sections/KnowledgeHub";
import { getKnowledgeHubContent } from "@/lib/content/knowledgeHub";

export const metadata: Metadata = {
  title: "Packaging Knowledge Hub — Expert Q&A | Supplied",
  description:
    "Instant answers to your packaging questions — from materials and MOQs to EU compliance and sustainability certifications. Powered by expertise across 200+ brand projects.",
  alternates: { canonical: "/knowledge-hub" },
};

export default async function Page() {
  const content = await getKnowledgeHubContent();
  return <KnowledgeHub content={content} />;
}
