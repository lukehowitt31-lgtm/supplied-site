import type { Metadata } from "next";
import ContactPageClient from "@/components/sections/ContactPageClient";
import { getContactPageContent } from "@/lib/content/contact";

export const metadata: Metadata = {
  title: "Get in Touch — Start Your Packaging Project | Supplied",
  description:
    "Ready to talk packaging? Contact Supplied to discuss your project, request samples, or get a quote. We partner with fast-growing ecommerce brands across the UK and Europe.",
  alternates: { canonical: "/contact-us" },
};

export default async function Page() {
  const content = await getContactPageContent();
  return <ContactPageClient content={content} />;
}
