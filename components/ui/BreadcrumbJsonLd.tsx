import { JsonLd } from "@/components/seo/JsonLd";
import { canonicalUrl } from "@/lib/seo/site";

export interface BreadcrumbJsonLdItem {
  name: string;
  href?: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbJsonLdItem[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          ...(item.href ? { item: canonicalUrl(item.href) } : {}),
        })),
      }}
    />
  );
}
