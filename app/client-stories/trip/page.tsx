import type { Metadata } from "next";
import TripStory from "@/components/client-stories/TripStory";
import { getClientStoryBySlug } from "@/lib/content/clientStories";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "TRIP — Halving Lead Times with EU Production | Supplied",
  description:
    "How we halved TRIP's packaging lead times by transitioning tube production from China to Europe — improving cost, speed, and flexibility across their full CBD drinks range.",
  alternates: { canonical: "/client-stories/trip" },
  openGraph: {
    title: "TRIP — Halving Lead Times with EU Production | Supplied",
    description:
      "How we halved TRIP's packaging lead times by transitioning production to Europe.",
    url: "/client-stories/trip",
  },
};

export default async function Page() {
  const story = await getClientStoryBySlug("trip");
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Client Stories", href: "/client-stories" }, { name: "TRIP" }]} />
      <TripStory story={story} />
    </>
  );
}
