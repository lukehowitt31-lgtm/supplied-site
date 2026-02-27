import type { Metadata } from "next";
import { MapTest } from "@/components/sections/MapTest";
import { loadMapDotsHtml, getDefaultPins } from "@/lib/mapData";

export const metadata: Metadata = {
  title: "World Map Test | Supplied",
  description:
    "Test page for the dotted world map with sourcing location pins.",
  robots: "noindex",
};

export default function TestMapPage() {
  const { dotsHtml, viewBox } = loadMapDotsHtml();
  const pins = getDefaultPins();

  return <MapTest dotsHtml={dotsHtml} initialPins={pins} viewBox={viewBox} />;
}
