import type { Metadata } from "next";
import AboutUs from "@/components/sections/AboutUs";
import { getAboutPageContent } from "@/lib/content/about";
import { getTeamMembers } from "@/lib/content/team";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";
import { buildPageMetadata, ogImageUrl } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About Us — Meet the Supplied Packaging Team | Supplied",
  description:
    "Meet Supplied — the end-to-end packaging partner trusted by Wild, TRIP, Healf, SURI and 50+ consumer brands. Based in London and Warsaw.",
  path: "/about-us",
  image: ogImageUrl({
    title: "Meet the Team",
    subtitle: "About Supplied",
    bg: "/SuppliedSpreadTransparent.webp",
  }),
  imageAlt: "About Supplied",
});

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
