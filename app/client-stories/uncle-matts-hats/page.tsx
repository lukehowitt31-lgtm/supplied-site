import type { Metadata } from "next";
import UncleMattsStory from "@/components/client-stories/UncleMattsStory";
import { getClientStoryBySlug } from "@/lib/content/clientStories";

export const metadata: Metadata = {
  title: "Uncle Matt's Hats — Client Story | Supplied",
  description:
    "How we turned a heartfelt mission into iconic ice cream tub hat packaging — custom-built from scratch for a cause that matters.",
  alternates: { canonical: "/client-stories/uncle-matts-hats" },
  openGraph: {
    title: "Uncle Matt's Hats — Client Story | Supplied",
    description:
      "How we turned a heartfelt mission into iconic ice cream tub hat packaging.",
    url: "/client-stories/uncle-matts-hats",
  },
};

export default async function Page() {
  const story = await getClientStoryBySlug("uncle-matts-hats");
  return <UncleMattsStory story={story} />;
}
