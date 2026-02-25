import type { Metadata } from "next";
import UncleMattsStory from "@/components/client-stories/UncleMattsStory";

export const metadata: Metadata = {
  title: "Uncle Matt's Hats — Client Story | Supplied",
  description: "How we turned a heartfelt mission into iconic ice cream tub hat packaging — custom-built from scratch for a cause that matters.",
};

export default function Page() {
  return <UncleMattsStory />;
}
