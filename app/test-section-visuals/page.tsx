import { Metadata } from "next";
import { SectionVisualTests } from "./SectionVisualTests";

export const metadata: Metadata = {
  title: "Section Visual Tests | Supplied",
  robots: "noindex",
};

export default function TestSectionVisualsPage() {
  return <SectionVisualTests />;
}
