import type { Metadata } from "next";
import UncleMattsStory from "@/components/client-stories/UncleMattsStory";
import { getClientStoryBySlug } from "@/lib/content/clientStories";

export const metadata: Metadata = {
  title: "Uncle Matt's Hats — Custom Packaging from Scratch | Supplied",
  description:
    "How we turned a heartfelt mission into iconic ice cream tub hat packaging — designed and custom-built from scratch for a cause that matters. A Supplied client story.",
  alternates: { canonical: "/client-stories/uncle-matts-hats" },
  openGraph: {
    title: "Uncle Matt's Hats — Custom Packaging from Scratch | Supplied",
    description:
      "How we turned a heartfelt mission into iconic ice cream tub hat packaging.",
    url: "/client-stories/uncle-matts-hats",
  },
};

export default async function Page() {
  const story = await getClientStoryBySlug("uncle-matts-hats");
  return <UncleMattsStory story={story} />;
}
