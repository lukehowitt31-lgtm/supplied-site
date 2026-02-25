import type { Metadata } from "next";
import SpacegoodsStory from "@/components/client-stories/SpacegoodsStory";

export const metadata: Metadata = {
  title: "Spacegoods — Client Story | Supplied",
  description: "From a single mailer box project to managing 10+ SKUs, D2C and Tesco retail packaging — how a project became a partnership.",
};

export default function Page() {
  return <SpacegoodsStory />;
}
