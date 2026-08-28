import type { Metadata } from "next";
import { getPackagingReviewPageContent } from "@/lib/content/packagingReview";
import { PackagingReviewPageClient } from "@/components/sections/PackagingReviewPageClient";
import { buildPageMetadata, ogImageUrl } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPackagingReviewPageContent();
  return buildPageMetadata({
    title: content.seo.title,
    description: content.seo.description,
    path: "/packaging-review",
    image:
      content.seo.ogImage ??
      ogImageUrl({
        title: "Get packaging off your plate",
        subtitle: "See where you could save 20%+",
      }),
    imageAlt: content.seo.title,
  });
}

export default async function PackagingReviewPage() {
  const content = await getPackagingReviewPageContent();
  return <PackagingReviewPageClient content={content} />;
}
