import type { Metadata } from "next";
import GlowForItStory from "@/components/client-stories/GlowForItStory";
import { getClientStoryBySlug } from "@/lib/content/clientStories";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Glow For It — 20-Day Influencer Packaging | Supplied",
  description:
    "Premium influencer packaging for a Kyra-Mae collaboration — from brief to finished order in just 20 days with bespoke design.",
  alternates: { canonical: "/client-stories/glow-for-it" },
  openGraph: {
    title: "Glow For It — 20-Day Influencer Packaging | Supplied",
    description:
      "Premium influencer packaging — from brief to order in just 20 days.",
    url: "/client-stories/glow-for-it",
  },
};

export default async function Page() {
  const story = await getClientStoryBySlug("glow-for-it");
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Client Stories", href: "/client-stories" }, { name: "Glow For It" }]} />
      <GlowForItStory story={story} />
    </>
  );
}
