const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.suppliedpackaging.com";

export interface BreadcrumbJsonLdItem {
  name: string;
  href?: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbJsonLdItem[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
          })),
        }),
      }}
    />
  );
}
