import type { Metadata } from "next";
import GlaizeStory from "@/components/client-stories/GlaizeStory";
import { getClientStoryBySlug } from "@/lib/content/clientStories";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";
import { buildPageMetadata, ogImageUrl } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Glaize × Aston Martin — 3.5 Week Turnaround | Supplied",
  description:
    "A limited-edition Glaize × Aston Martin collaboration delivered in 3.5 weeks — precision colour matching, EU litho production, zero delays.",
  path: "/client-stories/glaize-x-aston-martin",
  type: "article",
  image: ogImageUrl({
    title: "Glaize × Aston Martin",
    subtitle: "3.5 Week Turnaround",
  }),
  imageAlt: "Glaize × Aston Martin case study — Supplied",
});

export default async function Page() {
  const story = await getClientStoryBySlug("glaize-x-aston-martin");
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Client Stories", href: "/client-stories" }, { name: "Glaize × Aston Martin" }]} />
      <GlaizeStory story={story} />
    </>
  );
}
