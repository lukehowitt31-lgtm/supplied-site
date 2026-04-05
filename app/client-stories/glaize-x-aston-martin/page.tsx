import type { Metadata } from "next";
import GlaizeStory from "@/components/client-stories/GlaizeStory";
import { getClientStoryBySlug } from "@/lib/content/clientStories";

export const metadata: Metadata = {
  title: "Glaize × Aston Martin — 3.5 Week Turnaround | Supplied",
  description:
    "A limited-edition collaboration delivered in just 3.5 weeks — precision colour matching, EU litho production, and zero delays. See how Supplied made it happen for Glaize and Aston Martin.",
  alternates: { canonical: "/client-stories/glaize-x-aston-martin" },
  openGraph: {
    title: "Glaize × Aston Martin — 3.5 Week Turnaround | Supplied",
    description:
      "A limited-edition collaboration delivered in just 3.5 weeks — zero delays.",
    url: "/client-stories/glaize-x-aston-martin",
  },
};

export default async function Page() {
  const story = await getClientStoryBySlug("glaize-x-aston-martin");
  return <GlaizeStory story={story} />;
}
