import type { Metadata } from "next";
import { getCostAuditPageContent } from "@/lib/content/costAudit";
import { CostAuditPageClient } from "@/components/sections/CostAuditPageClient";
import { buildPageMetadata, ogImageUrl } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getCostAuditPageContent();
  return buildPageMetadata({
    title: content.seo.title,
    description: content.seo.description,
    path: "/packaging-cost-audit",
    image:
      content.seo.ogImage ??
      ogImageUrl({
        title: "Packaging Cost Audit",
        subtitle: "Free Expert Review",
      }),
    imageAlt: content.seo.title,
  });
}

export default async function PackagingCostAuditPage() {
  const content = await getCostAuditPageContent();
  return <CostAuditPageClient content={content} />;
}
