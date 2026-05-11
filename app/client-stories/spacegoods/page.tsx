import type { Metadata } from "next";
import SpacegoodsStory from "@/components/client-stories/SpacegoodsStory";
import { getClientStoryBySlug } from "@/lib/content/clientStories";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";
import { buildPageMetadata, ogImageUrl } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Spacegoods — From One Box to Full Range | Supplied",
  description:
    "From one mailer box to managing 10+ SKUs across D2C and Tesco retail — how a project became a packaging partnership.",
  path: "/client-stories/spacegoods",
  type: "article",
  image: ogImageUrl({
    title: "Spacegoods",
    subtitle: "From One Box to Full Range",
    bg: "/images/products/SpacegoodsSpread.webp",
  }),
  imageAlt: "Spacegoods case study — Supplied",
});

export default async function Page() {
  const story = await getClientStoryBySlug("spacegoods");
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Client Stories", href: "/client-stories" }, { name: "Spacegoods" }]} />
      <SpacegoodsStory story={story} />
    </>
  );
}
