import { Metadata } from "next";
import { getPartnershipsPageContent } from "@/lib/content/partnerships";
import { PartnershipsPageClient } from "@/components/sections/PartnershipsPageClient";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";
import { buildPageMetadata, ogImageUrl } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Packaging Partnerships — Refer and Earn | Supplied",
  description:
    "Partner with Supplied to deliver better packaging for fast-growing brands. Earn recurring revenue through referrals and co-branded support.",
  path: "/partnerships",
  image: ogImageUrl({
    title: "Packaging Partnerships",
    subtitle: "Refer and Earn",
  }),
  imageAlt: "Supplied Partnerships",
});

export default async function PartnershipsPage() {
  const content = await getPartnershipsPageContent();

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Partnerships" }]} />
      <PartnershipsPageClient content={content} />
    </>
  );
}
