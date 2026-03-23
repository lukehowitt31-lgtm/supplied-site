import type { Metadata } from "next";
import TripStory from "@/components/client-stories/TripStory";
import { getClientStoryBySlug } from "@/lib/content/clientStories";

export const metadata: Metadata = {
  title: "TRIP — Client Story | Supplied",
  description:
    "How we halved TRIP's packaging lead times by transitioning tube production from China to Europe — improving cost, speed, and flexibility.",
};

export default async function Page() {
  const story = await getClientStoryBySlug("trip");
  return <TripStory story={story} />;
}
