import type { Metadata } from "next";
import { getMerchPageContent } from "@/lib/content/merch";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { MerchHub } from "@/components/sections/merch/MerchHub";
import { buildPageMetadata, ogImageUrl } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getMerchPageContent();
  const { seo } = content;

  return buildPageMetadata({
    title: seo.title,
    description: seo.description,
    path: "/merch",
    image:
      seo.ogImage ??
      ogImageUrl({
        title: "Custom Branded Merch",
        subtitle: "Sourced Properly",
        bg: content.hero.image.src,
      }),
    imageAlt: seo.title,
  });
}

export default async function MerchPage() {
  const content = await getMerchPageContent();

  const faqJsonLd =
    content.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: content.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Home", href: "/" }, { name: "Merch", href: "/merch" }]}
      />
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}
      <MerchHub content={content} />
    </>
  );
}
