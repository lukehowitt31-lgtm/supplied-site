import type { Metadata } from "next";
import { getMerchPageContent } from "@/lib/content/merch";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";
import { MerchHub } from "@/components/sections/merch/MerchHub";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.suppliedpackaging.com";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getMerchPageContent();
  const { seo } = content;

  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical: seo.canonical },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      images: seo.ogImage
        ? [{ url: seo.ogImage, width: 1200, height: 630, alt: seo.title }]
        : [
            {
              url: `/og?title=${encodeURIComponent("Custom Branded Merch")}&subtitle=${encodeURIComponent("Sourced Properly")}`,
              width: 1200,
              height: 630,
              alt: seo.title,
            },
          ],
    },
  };
}

export default async function MerchPage() {
  const content = await getMerchPageContent();

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Supplied",
    url: siteUrl,
    logo: `${siteUrl}/images/brand/supplied-logo.svg`,
  };

  const productJsonLd = content.categories.map((category) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: category.name,
    description: category.longDescription,
    url: `${siteUrl}/merch#${category.anchorId}`,
    brand: { "@type": "Organization", name: "Supplied" },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: "0",
      priceCurrency: "GBP",
      priceValidUntil: new Date(
        Date.now() + 365 * 24 * 60 * 60 * 1000
      ).toISOString().split("T")[0],
      description: `Price on request. MOQ: ${category.moq}. Lead time: ${category.leadTime}.`,
    },
  }));

  const faqJsonLd = {
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
  };

  return (
    <>
      <BreadcrumbJsonLd
        items={[{ name: "Home", href: "/" }, { name: "Merch" }]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      {productJsonLd.map((schema, i) => (
        <script
          key={content.categories[i].anchorId}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <MerchHub content={content} />
    </>
  );
}
