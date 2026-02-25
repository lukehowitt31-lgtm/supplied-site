import type { Metadata } from "next";
import ClientStoriesHub from "@/components/client-stories/ClientStoriesHub";

export const metadata: Metadata = {
  title: "Client Stories | Supplied",
  description: "From scaling supply chains to engineering limited-edition collaborations — see how we help fast-growing brands turn packaging into a competitive advantage.",
};

export default function Page() {
  return <ClientStoriesHub />;
}
