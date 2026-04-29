import type { Metadata } from "next";
import { getCostAuditPageContent } from "@/lib/content/costAudit";
import { CostAuditPageClient } from "@/components/sections/CostAuditPageClient";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCostAuditPageContent();
  return {
    title: content.seo.title,
    description: content.seo.description,
    alternates: { canonical: "/packaging-cost-audit" },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: "/packaging-cost-audit",
      ...(content.seo.ogImage ? { images: [{ url: content.seo.ogImage }] } : {}),
    },
  };
}

export default async function PackagingCostAuditPage() {
  const content = await getCostAuditPageContent();
  return <CostAuditPageClient content={content} />;
}
