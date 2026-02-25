import type { Metadata } from "next";
import HealfStory from "@/components/client-stories/HealfStory";

export const metadata: Metadata = {
  title: "Healf — Client Story | Supplied",
  description: "How we built the packaging infrastructure behind Healf's 434% growth year — managing 10–15 SKUs across structured EU production.",
};

export default function Page() {
  return <HealfStory />;
}
