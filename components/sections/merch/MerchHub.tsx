"use client";

import type { MerchPageContent } from "@/types/merch";
import { MerchHero } from "./MerchHero";
import { MerchProblemSolution } from "./MerchProblemSolution";
import { MerchCategoryGrid } from "./MerchCategoryGrid";
import { MerchCategorySection } from "./MerchCategorySection";
import { MerchComparison } from "./MerchComparison";
import { MerchFAQ } from "./MerchFAQ";
import { MerchCTA } from "./MerchCTA";

interface MerchHubProps {
  content: MerchPageContent;
}

export function MerchHub({ content }: MerchHubProps) {
  return (
    <>
      <MerchHero content={content.hero} />
      <MerchProblemSolution content={content.problemSolution} />
      <MerchCategoryGrid categories={content.categories} />
      {content.categories.map((category, index) => (
        <MerchCategorySection
          key={category.anchorId}
          category={category}
          flipped={index % 2 !== 0}
        />
      ))}
      <MerchComparison rows={content.comparison} />
      <MerchFAQ items={content.faq} />
      <MerchCTA content={content.finalCta} />
    </>
  );
}
