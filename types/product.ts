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

export interface Product {
  id: string;          // Keeping id for compatibility/uniqueness
  slug: string;
  name: string;        // Replaces title
  categoryId: ProductCategory; // Replaces category
  shortDescription: string; // Replaces subtitle
  description: string; // Long description for detail page
  facts: string[];     // New: 3-5 short bullet facts
  features: string[];  // Keeping for compatibility (or mapping facts to this?)
  // Deprecated fixed specs object, keeping for backward compatibility if needed, but we will use detailedSpecs
  specs: {
    materials: string;
    printOptions: string;
    moq: string;
    leadTime: string;
  };
  detailedSpecs: ProductSpec[]; // New flexible specs array
  image: string;
  seo: ProductSEO;     // New
  faqs: ProductFAQ[];  // New
  isNew?: boolean;
  heroStats: {
    val: string;
    lbl: string;
  }[];
  modelUrl?: string;
}
