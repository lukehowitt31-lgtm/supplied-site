import type { Metadata } from "next";
import AboutUs from "@/components/sections/AboutUs";
import { getAboutPageContent } from "@/lib/content/about";
import { getTeamMembers } from "@/lib/content/team";

export const metadata: Metadata = {
  title: "About Us | Supplied",
  description:
    "Four founders, one obsession. Meet the team behind Supplied — a packaging consultancy for brands that don't stand still.",
  alternates: { canonical: "/about-us" },
};

export default async function Page() {
  const [aboutContent, teamMembers] = await Promise.all([
    getAboutPageContent(),
    getTeamMembers(),
  ]);

  return <AboutUs aboutContent={aboutContent} teamMembers={teamMembers} />;
}
