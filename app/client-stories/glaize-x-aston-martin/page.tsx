import type { Metadata } from "next";
import GlaizeStory from "@/components/client-stories/GlaizeStory";
import { getClientStoryBySlug } from "@/lib/content/clientStories";

export const metadata: Metadata = {
  title: "Glaize × Aston Martin — Client Story | Supplied",
  description:
    "A limited-edition collaboration delivered in just 3.5 weeks — precision colour matching, EU litho production, zero delays.",
  alternates: { canonical: "/client-stories/glaize-x-aston-martin" },
  openGraph: {
    title: "Glaize × Aston Martin — Client Story | Supplied",
    description:
      "A limited-edition collaboration delivered in just 3.5 weeks — zero delays.",
    url: "/client-stories/glaize-x-aston-martin",
  },
};

export default async function Page() {
  const story = await getClientStoryBySlug("glaize-x-aston-martin");
  return <GlaizeStory story={story} />;
}
