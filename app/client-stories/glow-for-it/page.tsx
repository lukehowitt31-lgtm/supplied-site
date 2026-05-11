import type { Metadata } from "next";
import GlowForItStory from "@/components/client-stories/GlowForItStory";
import { getClientStoryBySlug } from "@/lib/content/clientStories";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";
import { buildPageMetadata, ogImageUrl } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Glow For It — 20-Day Influencer Packaging | Supplied",
  description:
    "Premium influencer packaging for a Kyra-Mae collaboration — from brief to finished order in just 20 days with bespoke design.",
  path: "/client-stories/glow-for-it",
  type: "article",
  image: ogImageUrl({
    title: "Glow For It",
    subtitle: "20-Day Influencer Packaging",
  }),
  imageAlt: "Glow For It case study — Supplied",
});

export default async function Page() {
  const story = await getClientStoryBySlug("glow-for-it");
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Client Stories", href: "/client-stories" }, { name: "Glow For It" }]} />
      <GlowForItStory story={story} />
    </>
  );
}
