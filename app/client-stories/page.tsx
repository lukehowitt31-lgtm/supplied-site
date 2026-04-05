import type { Metadata } from "next";
import ClientStoriesHub from "@/components/client-stories/ClientStoriesHub";
import { getClientStoriesHubContent } from "@/lib/content/clientStories";

export const metadata: Metadata = {
  title: "Client Stories | Supplied",
  description: "From scaling supply chains to engineering limited-edition collaborations — see how we help fast-growing brands turn packaging into a competitive advantage.",
  alternates: { canonical: "/client-stories" },
};

export default async function Page() {
  const hubContent = await getClientStoriesHubContent();
  return <ClientStoriesHub content={hubContent} />;
}
