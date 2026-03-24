import { Metadata } from "next";
import { getPartnershipsPageContent } from "@/lib/content/partnerships";
import { PartnershipsPageClient } from "@/components/sections/PartnershipsPageClient";

export const metadata: Metadata = {
  title: "Partnerships | Supplied",
  description:
    "Partner with Supplied to deliver better packaging for fast-growing brands. Earn recurring revenue, get co-branded support, and grow together.",
};

export default async function PartnershipsPage() {
  const content = await getPartnershipsPageContent();

  return <PartnershipsPageClient content={content} />;
}
