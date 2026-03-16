import type { Metadata } from "next";
import { CartonboardFeaturesLab } from "@/components/sections/CartonboardFeaturesLab";

export const metadata: Metadata = {
  title: "Cartonboard Features Lab | Supplied",
  description:
    "Test area exploring richer visual storytelling approaches for the cartonboard product features section.",
  robots: "noindex",
};

export default function TestCartonboardFeaturesPage() {
  return <CartonboardFeaturesLab />;
}
