import type { Metadata } from "next";
import HealfStory from "@/components/client-stories/HealfStory";
import { getClientStoryBySlugFromSanity } from "@/lib/content/clientStories";

export const metadata: Metadata = {
  title: "Healf — Client Story | Supplied",
  description:
    "How we built the packaging infrastructure behind Healf's 434% growth year — managing 10–15 SKUs across structured EU production.",
};

export default async function Page() {
  const story = await getClientStoryBySlugFromSanity("healf");
  return <HealfStory story={story} />;
}
