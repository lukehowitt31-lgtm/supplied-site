import type { Metadata } from "next";
import KnowledgeHub from "@/components/sections/KnowledgeHub";

export const metadata: Metadata = {
  title: "Knowledge Hub | Supplied",
  description: "Instant answers to your packaging questions — from materials and MOQs to EU compliance and sustainability. Powered by expertise across 200+ projects.",
};

export default function Page() {
  return <KnowledgeHub />;
}
