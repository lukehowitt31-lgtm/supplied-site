import type { Metadata } from "next";
import SpacegoodsStory from "@/components/client-stories/SpacegoodsStory";
import { getClientStoryBySlug } from "@/lib/content/clientStories";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Spacegoods — From One Box to Full Range | Supplied",
  description:
    "From a single mailer box project to managing 10+ SKUs across D2C and Tesco retail packaging — how a project became a long-term packaging partnership with Supplied.",
  alternates: { canonical: "/client-stories/spacegoods" },
  openGraph: {
    title: "Spacegoods — From One Box to Full Range | Supplied",
    description:
      "From a single mailer box project to managing 10+ SKUs — how a project became a partnership.",
    url: "/client-stories/spacegoods",
  },
};

export default async function Page() {
  const story = await getClientStoryBySlug("spacegoods");
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Client Stories", href: "/client-stories" }, { name: "Spacegoods" }]} />
      <SpacegoodsStory story={story} />
    </>
  );
}
