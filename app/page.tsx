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
import { getHomePageContent } from "@/lib/content/home";

export const metadata: Metadata = {
  title: "Supplied — The End-to-End Packaging Partner",
  description:
    "Packaging that grows your brand, not your headaches. We partner with fast-growing ecommerce brands to design, source, and deliver sustainable packaging.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Supplied — The End-to-End Packaging Partner",
    description:
      "We partner with fast-growing ecommerce brands to design, source, and deliver sustainable packaging.",
    url: "/",
  },
};

export default async function Home() {
  const homePageContent = await getHomePageContent();

  return (
    <>
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
            steps: homePageContent.solution.steps,
            stepDescriptions: homePageContent.solution.stepDescriptions,
          },
        }}
      />
      <CaseStudies content={homePageContent.clientStoriesTeaser} />
      <Products content={homePageContent.productsTeaser} />
      <Process content={homePageContent.process} />
      <Services content={homePageContent.servicesTeaser} />
      <Sustainability content={homePageContent.sustainability} />
      <CTA content={homePageContent.finalCta} />
    </>
  );
}
