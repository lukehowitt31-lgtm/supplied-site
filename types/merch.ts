export interface MerchCategory {
  name: string;
  anchorId: string;
  shortDescription: string;
  longDescription: string;
  image: { src: string; alt: string };
  applications: string[];
  customisationOptions: string[];
  moq: string;
  leadTime: string;
}

export interface ComparisonRow {
  topic: string;
  suppliedAnswer: string;
  alibabaAnswer: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface MerchPageContent {
  seo: {
    title: string;
    description: string;
    ogImage?: string;
    canonical: string;
  };
  hero: {
    heading: string;
    subheading: string;
    ctaLabel: string;
    ctaHref: string;
    image: { src: string; alt: string };
  };
  problemSolution: {
    problemHeading: string;
    problemBody: string;
    solutionHeading: string;
    solutionBody: string;
  };
  categories: MerchCategory[];
  comparison: ComparisonRow[];
  faq: FAQItem[];
  finalCta: {
    heading: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };
}
