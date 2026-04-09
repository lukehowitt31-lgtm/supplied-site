import { Metadata } from "next";
import { getPartnershipsPageContent } from "@/lib/content/partnerships";
import { PartnershipsPageClient } from "@/components/sections/PartnershipsPageClient";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Packaging Partnerships — Refer and Earn | Supplied",
  description:
    "Partner with Supplied to deliver better packaging for fast-growing brands. Earn recurring revenue through referrals, get co-branded support, and grow your business together with ours.",
  alternates: { canonical: "/partnerships" },
  openGraph: {
    title: "Packaging Partnerships — Refer and Earn | Supplied",
    description:
      "Partner with Supplied to deliver better packaging for fast-growing brands. Earn recurring revenue through referrals, get co-branded support, and grow your business together with ours.",
    url: "/partnerships",
  },
};

export default async function PartnershipsPage() {
  const content = await getPartnershipsPageContent();

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Partnerships" }]} />
      <PartnershipsPageClient content={content} />
    </>
  );
}
