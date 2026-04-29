import type { Metadata } from "next";
import { HeroSpread } from "@/components/sections/HeroSpread";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { Services } from "@/components/sections/Services";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Products } from "@/components/sections/Products";
import { Sustainability } from "@/components/sections/Sustainability";
import { Process } from "@/components/sections/Process";
import { CTA } from "@/components/sections/CTA";
import { ThreePillars } from "@/components/sections/ThreePillars";
import { HowWerePaid } from "@/components/sections/HowWerePaid";
import { CostAuditHook } from "@/components/sections/CostAuditHook";
import { WhoWeWorkWith } from "@/components/sections/WhoWeWorkWith";
import { getHomePageContent } from "@/lib/content/home";

export const metadata: Metadata = {
  title: "Packaging Partner for Consumer Brands | Supplied",
  description:
    "One operational team running design, sourcing, QA, compliance, and freight across your full packaging range. 60+ factories, 12 countries, clients save an average of 21%. Trusted by Wild, TRIP, and Healf.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Packaging Partner for Consumer Brands | Supplied",
    description:
      "One operational team running design, sourcing, QA, compliance, and freight across your full packaging range. 60+ factories, 12 countries, clients save an average of 21%. Trusted by Wild, TRIP, and Healf.",
    url: "/",
  },
};

export default async function Home() {
  const homePageContent = await getHomePageContent();

  return (
    <>
      <link
        rel="preload"
        href="/SuppliedSpreadTransparent.webp"
        as="image"
        type="image/webp"
      />
      <HeroSpread content={homePageContent.hero} />
      <LogoStrip heading={homePageContent.trustedBrands.heading} />
      <ProblemSolution
        content={{
          problem: {
            heading: homePageContent.problemBottleneck.heading,
            intro: homePageContent.problemBottleneck.intro,
            cards: homePageContent.problemBottleneck.cards,
          },
          solution: {
            heading: homePageContent.solution.heading,
            body: homePageContent.solution.body,
            pullLine: homePageContent.solution.pullLine,
            ctaLabel: homePageContent.solution.ctaLabel,
            ctaHref: homePageContent.solution.ctaHref,
            steps: homePageContent.solution.steps,
            stepDescriptions: homePageContent.solution.stepDescriptions,
          },
        }}
      />
      <ThreePillars content={homePageContent.threePillars} />
      <CaseStudies content={homePageContent.clientStoriesTeaser} />
      <Products content={homePageContent.productsTeaser} />
      <Process content={homePageContent.process} />
      <Services content={homePageContent.servicesTeaser} />
      <HowWerePaid content={homePageContent.howWerePaid} />
      <CostAuditHook content={homePageContent.costAuditHook} />
      <WhoWeWorkWith content={homePageContent.whoWeWorkWith} />
      <Sustainability content={homePageContent.sustainability} />
      <CTA content={homePageContent.finalCta} />
    </>
  );
}
