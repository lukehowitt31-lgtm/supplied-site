import type { Metadata } from "next";
import ContactPageClient from "@/components/sections/ContactPageClient";
import { getContactPageContent } from "@/lib/content/contact";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";
import { buildPageMetadata, ogImageUrl } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Get in Touch — Start Your Packaging Project | Supplied",
  description:
    "Start a packaging project with Supplied. Get a quote within 48 hours. Free samples available. FSC certified, 60+ global suppliers.",
  path: "/contact-us",
  image: ogImageUrl({
    title: "Start Your Packaging Project",
    subtitle: "Get in Touch",
  }),
  imageAlt: "Contact Supplied",
});

export default async function Page() {
  const content = await getContactPageContent();
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Contact Us" }]} />
      <ContactPageClient content={content} />
    </>
  );
}
