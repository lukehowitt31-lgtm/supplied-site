import type { Metadata } from "next";
import AboutUs from "@/components/sections/AboutUs";
import { getAboutPageContent } from "@/lib/content/about";
import { getTeamMembers } from "@/lib/content/team";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "About Us — Meet the Supplied Packaging Team | Supplied",
  description:
    "Meet Supplied — the end-to-end packaging partner trusted by Wild, TRIP, Healf, SURI and 50+ consumer brands. Based in London and Warsaw.",
  alternates: { canonical: "/about-us" },
  openGraph: {
    title: "About Us — Meet the Supplied Packaging Team | Supplied",
    description:
      "Meet Supplied — the end-to-end packaging partner trusted by Wild, TRIP, Healf, SURI and 50+ consumer brands. Based in London and Warsaw.",
    url: "/about-us",
    images: [{ url: "/og?title=Meet%20the%20Team&subtitle=About%20Supplied&bg=%2FSuppliedSpreadTransparent.webp", width: 1200, height: 630, alt: "About Supplied" }],
  },
};

export default async function Page() {
  const [aboutContent, teamMembers] = await Promise.all([
    getAboutPageContent(),
    getTeamMembers(),
  ]);

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "About Us" }]} />
      <AboutUs aboutContent={aboutContent} teamMembers={teamMembers} />
    </>
  );
}
