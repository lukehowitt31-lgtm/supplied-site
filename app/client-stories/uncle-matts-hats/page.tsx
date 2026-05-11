import type { Metadata } from "next";
import UncleMattsStory from "@/components/client-stories/UncleMattsStory";
import { getClientStoryBySlug } from "@/lib/content/clientStories";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";
import { buildPageMetadata, ogImageUrl } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Uncle Matt's Hats — Custom Packaging from Scratch | Supplied",
  description:
    "How we turned a heartfelt mission into iconic ice cream tub hat packaging — custom-built from scratch for a cause that matters.",
  path: "/client-stories/uncle-matts-hats",
  type: "article",
  image: ogImageUrl({
    title: "Uncle Matt's Hats",
    subtitle: "Custom Packaging from Scratch",
  }),
  imageAlt: "Uncle Matt's Hats case study — Supplied",
});

export default async function Page() {
  const story = await getClientStoryBySlug("uncle-matts-hats");
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Client Stories", href: "/client-stories" }, { name: "Uncle Matt's Hats" }]} />
      <UncleMattsStory story={story} />
    </>
  );
}
