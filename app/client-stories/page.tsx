import type { Metadata } from "next";
import ClientStoriesHub from "@/components/client-stories/ClientStoriesHub";
import { getClientStoriesHubContent } from "@/lib/content/clientStories";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Client Stories — Packaging Case Studies | Supplied",
  description:
    "Real results from real brands. See how Healf achieved 434% growth, and how Wild, TRIP, SURI and Spacegoods use Supplied to manage their full packaging supply chain.",
  alternates: { canonical: "/client-stories" },
  openGraph: {
    title: "Client Stories — Packaging Case Studies | Supplied",
    description:
      "Real results from real brands. See how Healf achieved 434% growth, and how Wild, TRIP, SURI and Spacegoods use Supplied to manage their full packaging supply chain.",
    url: "/client-stories",
    images: [{ url: "/og?title=Client%20Stories&subtitle=Packaging%20Case%20Studies", width: 1200, height: 630, alt: "Supplied Client Stories" }],
  },
};

export default async function Page() {
  const hubContent = await getClientStoriesHubContent();
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Client Stories" }]} />
      <ClientStoriesHub content={hubContent} />
    </>
  );
}
