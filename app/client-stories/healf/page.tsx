import type { Metadata } from "next";
import HealfStory from "@/components/client-stories/HealfStory";
import { getClientStoryBySlugFromSanity } from "@/lib/content/clientStories";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";
import { buildPageMetadata, ogImageUrl } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Healf — Packaging for 434% Growth | Supplied",
  description:
    "How we built the packaging infrastructure behind Healf's 434% growth — managing 10–15 SKUs with consistent quality and on-time delivery.",
  path: "/client-stories/healf",
  type: "article",
  image: ogImageUrl({
    title: "Healf",
    subtitle: "Packaging for 434% Growth",
  }),
  imageAlt: "Healf case study — Supplied",
});

export default async function Page() {
  const story = await getClientStoryBySlugFromSanity("healf");
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Client Stories", href: "/client-stories" }, { name: "Healf" }]} />
      <HealfStory story={story} />
    </>
  );
}
