import type { Metadata } from "next";
import SpacegoodsStory from "@/components/client-stories/SpacegoodsStory";
import { getClientStoryBySlug } from "@/lib/content/clientStories";

export const metadata: Metadata = {
  title: "Spacegoods — Client Story | Supplied",
  description:
    "From a single mailer box project to managing 10+ SKUs, D2C and Tesco retail packaging — how a project became a partnership.",
};

export default async function Page() {
  const story = await getClientStoryBySlug("spacegoods");
  return <SpacegoodsStory story={story} />;
}
