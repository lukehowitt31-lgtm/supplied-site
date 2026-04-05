import type { Metadata } from "next";
import GlowForItStory from "@/components/client-stories/GlowForItStory";
import { getClientStoryBySlug } from "@/lib/content/clientStories";

export const metadata: Metadata = {
  title: "Glow For It — Client Story | Supplied",
  description:
    "Premium influencer packaging for a Kyra-Mae collaboration — from brief to order in just 20 days with hand-delivered samples.",
  alternates: { canonical: "/client-stories/glow-for-it" },
  openGraph: {
    title: "Glow For It — Client Story | Supplied",
    description:
      "Premium influencer packaging — from brief to order in just 20 days.",
    url: "/client-stories/glow-for-it",
  },
};

export default async function Page() {
  const story = await getClientStoryBySlug("glow-for-it");
  return <GlowForItStory story={story} />;
}
