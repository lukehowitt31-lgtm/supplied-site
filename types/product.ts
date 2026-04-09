export type ProductCategory = "boxes" | "mailers" | "accessories" | "retail" | "seasonal";

export interface ProductSEO {
  title: string;
  description: string;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductFeatureCard {
  title: string;
  body: string;
  image?: string;
}

export type ProductFeature = string | ProductFeatureCard;

export interface Product {
  id: string;          // Keeping id for compatibility/uniqueness
  slug: string;
  name: string;        // Replaces title
  h1Title?: string;    // SEO-optimised H1 (falls back to name)
  categoryId: ProductCategory; // Replaces category
  shortDescription: string; // Replaces subtitle
  description: string; // Long description for detail page
  facts: string[];     // New: 3-5 short bullet facts
  features: ProductFeature[]; // Normalized cards, with string compatibility fallback
  // Deprecated fixed specs object, keeping for backward compatibility if needed, but we will use detailedSpecs
  specs: {
    materials: string;
    printOptions: string;
    moq: string;
    leadTime: string;
  };
  detailedSpecs: ProductSpec[]; // New flexible specs array
  image: string;
  catalogueImage?: string;
  showcaseImage?: string;
  lifestyleImage?: string;
  seo: ProductSEO;
  faqs: ProductFAQ[];
  isNew?: boolean;
  heroStats: {
    val: string;
    lbl: string;
  }[];
  showcaseHeading?: string;
  featuresHeading?: string;
  modelUrl?: string;
  priceRange?: { low: string; high: string };
  moqFrom?: number;
}
