import type { Metadata } from "next";
import ContactPageClient from "@/components/sections/ContactPageClient";
import { getContactPageContent } from "@/lib/content/contact";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Get in Touch — Start Your Packaging Project | Supplied",
  description:
    "Start a packaging project with Supplied. Get a quote within 48 hours. Free samples available. FSC certified, 60+ global suppliers.",
  alternates: { canonical: "/contact-us" },
  openGraph: {
    title: "Get in Touch — Start Your Packaging Project | Supplied",
    description:
      "Start a packaging project with Supplied. Get a quote within 48 hours. Free samples available. FSC certified, 60+ global suppliers.",
    url: "/contact-us",
    images: [{ url: "/og?title=Start%20Your%20Packaging%20Project&subtitle=Get%20in%20Touch", width: 1200, height: 630, alt: "Contact Supplied" }],
  },
};

export default async function Page() {
  const content = await getContactPageContent();
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Contact Us" }]} />
      <ContactPageClient content={content} />
    </>
  );
}
