import type { Metadata } from "next";
import AboutUs from "@/components/sections/AboutUs";
import { getAboutPageContent } from "@/lib/content/about";
import { getTeamMembers } from "@/lib/content/team";

export const metadata: Metadata = {
  title: "About Us — Meet the Supplied Packaging Team | Supplied",
  description:
    "Four founders, one obsession — meet the team behind Supplied. We're a packaging consultancy for fast-growing ecommerce brands that don't stand still. Based in the UK, delivering worldwide.",
  alternates: { canonical: "/about-us" },
};

export default async function Page() {
  const [aboutContent, teamMembers] = await Promise.all([
    getAboutPageContent(),
    getTeamMembers(),
  ]);

  return <AboutUs aboutContent={aboutContent} teamMembers={teamMembers} />;
}
