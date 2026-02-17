import { HeroSpread } from "@/components/sections/HeroSpread";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { ProblemSolution } from "@/components/sections/ProblemSolution";
import { Services } from "@/components/sections/Services";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { Products } from "@/components/sections/Products";
import { Sustainability } from "@/components/sections/Sustainability";
import { Process } from "@/components/sections/Process";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <>
      <HeroSpread />
      <LogoStrip />
      <ProblemSolution />
      <Services />
      <CaseStudies />
      <Products />
      <Sustainability />
      <Process />
      <CTA />
    </>
  );
}
