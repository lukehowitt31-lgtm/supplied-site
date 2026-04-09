import type { Metadata } from "next";
import GlaizeStory from "@/components/client-stories/GlaizeStory";
import { getClientStoryBySlug } from "@/lib/content/clientStories";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Glaize × Aston Martin — 3.5 Week Turnaround | Supplied",
  description:
    "A limited-edition Glaize × Aston Martin collaboration delivered in 3.5 weeks — precision colour matching, EU litho production, zero delays.",
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
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Client Stories", href: "/client-stories" }, { name: "Glaize × Aston Martin" }]} />
      <GlaizeStory story={story} />
    </>
  );
}
