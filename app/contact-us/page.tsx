import type { Metadata } from "next";
import ContactPageClient from "@/components/sections/ContactPageClient";
import { getContactPageContent } from "@/lib/content/contact";

export const metadata: Metadata = {
  title: "Contact Us | Supplied",
  description:
    "Get in touch with Supplied. Whether you're exploring options or ready to start a packaging project, we'd love to hear from you.",
  alternates: { canonical: "/contact-us" },
};

export default async function Page() {
  const content = await getContactPageContent();
  return <ContactPageClient content={content} />;
}
