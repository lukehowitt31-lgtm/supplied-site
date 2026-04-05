import type { Metadata } from "next";
import HealfStory from "@/components/client-stories/HealfStory";
import { getClientStoryBySlugFromSanity } from "@/lib/content/clientStories";

export const metadata: Metadata = {
  title: "Healf — Packaging for 434% Growth | Supplied",
  description:
    "How we built the packaging infrastructure behind Healf's 434% growth year — managing 10–15 SKUs across structured EU production with consistent quality and on-time delivery.",
  alternates: { canonical: "/client-stories/healf" },
  openGraph: {
    title: "Healf — Packaging for 434% Growth | Supplied",
    description:
      "How we built the packaging infrastructure behind Healf's 434% growth year.",
    url: "/client-stories/healf",
  },
};

export default async function Page() {
  const story = await getClientStoryBySlugFromSanity("healf");
  return <HealfStory story={story} />;
}
