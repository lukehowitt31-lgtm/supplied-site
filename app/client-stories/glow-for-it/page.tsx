import type { Metadata } from "next";
import GlowForItStory from "@/components/client-stories/GlowForItStory";

export const metadata: Metadata = {
  title: "Glow For It — Client Story | Supplied",
  description: "Premium influencer packaging for a Kyra-Mae collaboration — from brief to order in just 20 days with hand-delivered samples.",
};

export default function Page() {
  return <GlowForItStory />;
}
