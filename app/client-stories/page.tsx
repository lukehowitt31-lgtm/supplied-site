import type { Metadata } from "next";
import ClientStoriesHub from "@/components/client-stories/ClientStoriesHub";
import { getClientStoriesHubContent } from "@/lib/content/clientStories";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";
import { buildPageMetadata, ogImageUrl } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Client Stories — Packaging Case Studies | Supplied",
  description:
    "Real results from real brands. See how Healf, Wild, TRIP and SURI use Supplied to manage their full packaging supply chain.",
  path: "/client-stories",
  image: ogImageUrl({
    title: "Client Stories",
    subtitle: "Packaging Case Studies",
    bg: "/images/products/SpacegoodsSpread.webp",
  }),
  imageAlt: "Supplied Client Stories",
});

export default async function Page() {
  const hubContent = await getClientStoriesHubContent();
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Client Stories" }]} />
      <ClientStoriesHub content={hubContent} />
    </>
  );
}
