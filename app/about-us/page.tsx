import type { Metadata } from "next";
import AboutUs from "@/components/sections/AboutUs";

export const metadata: Metadata = {
  title: "About Us | Supplied",
  description:
    "Four founders, one obsession. Meet the team behind Supplied — a packaging consultancy for brands that don't stand still.",
};

export default function Page() {
  return <AboutUs />;
}
