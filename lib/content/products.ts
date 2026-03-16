import "server-only";

import { categories as legacyCategories, products as legacyProducts } from "@/lib/products";
import { sanityFetch } from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";
import {
  productBySlugQuery,
  productCategoriesQuery,
  productsQuery,
} from "@/lib/sanity/queries";
import type { Product, ProductCategory, ProductFAQ, ProductSpec } from "@/types/product";

type ProductStat = Product["heroStats"][number];

export interface ProductCategoryOption {
  id: "all" | ProductCategory;
  label: string;
}

const validCategoryIds: ProductCategory[] = [
  "boxes",
  "mailers",
  "accessories",
  "retail",
  "seasonal",
];

const validCategoryIdSet = new Set<ProductCategory>(validCategoryIds);

const defaultCategoryLabels: Record<ProductCategory, string> = {
  boxes: "Boxes",
  mailers: "Mailers",
  accessories: "Accessories",
  retail: "Retail",
  seasonal: "Seasonal",
};

interface SanitySlugField {
  current?: string | null;
}

interface SanityImageAssetField {
  _ref?: string | null;
}

interface SanityImageField {
  asset?: SanityImageAssetField | null;
}

interface SanityCategoryField {
  slug?: SanitySlugField | null;
}

interface SanitySeoField {
  title?: string | null;
  description?: string | null;
}

interface SanityLegacySpecsField {
  materials?: string | null;
  printOptions?: string | null;
  moq?: string | null;
  leadTime?: string | null;
}

interface SanitySpecField {
  label?: string | null;
  value?: string | null;
}

interface SanityFaqField {
  question?: string | null;
  answer?: string | null;
}

interface SanityStatField {
  val?: string | null;
  lbl?: string | null;
}

interface SanityProductDoc {
  id?: string | null;
  slug?: SanitySlugField | null;
  name?: string | null;
  categoryId?: string | null;
  category?: SanityCategoryField | null;
  shortDescription?: string | null;
  description?: string | null;
  facts?: unknown;
  features?: unknown;
  specs?: SanityLegacySpecsField | null;
  detailedSpecs?: unknown;
  image?: SanityImageField | null;
  catalogueImage?: SanityImageField | null;
  showcaseImage?: SanityImageField | null;
  lifestyleImage?: SanityImageField | null;
  seo?: SanitySeoField | null;
  faqs?: unknown;
  heroStats?: unknown;
  modelUrl?: string | null;
  isNew?: boolean | null;
}

interface SanityProductCategoryDoc {
  id?: string | null;
  label?: string | null;
}

function readString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmedValue = value.trim();
  return trimmedValue.length > 0 ? trimmedValue : undefined;
}

function toProductCategory(value: string | undefined): ProductCategory | undefined {
  if (!value) {
    return undefined;
  }

  if (!validCategoryIdSet.has(value as ProductCategory)) {
    return undefined;
  }

  return value as ProductCategory;
}

function mapStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => readString(item))
    .filter((item): item is string => Boolean(item));
}

function mapSpecs(value: unknown): ProductSpec[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return undefined;
      }

      const record = item as SanitySpecField;
      const label = readString(record.label);
      const specValue = readString(record.value);

      if (!label || !specValue) {
        return undefined;
      }

      return {
        label,
        value: specValue,
      };
    })
    .filter((item): item is ProductSpec => Boolean(item));
}

function mapFaqs(value: unknown): ProductFAQ[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return undefined;
      }

      const record = item as SanityFaqField;
      const question = readString(record.question);
      const answer = readString(record.answer);

      if (!question || !answer) {
        return undefined;
      }

      return {
        question,
        answer,
      };
    })
    .filter((item): item is ProductFAQ => Boolean(item));
}

function mapStats(value: unknown): ProductStat[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return undefined;
      }

      const record = item as SanityStatField;
      const statValue = readString(record.val);
      const label = readString(record.lbl);

      if (!statValue || !label) {
        return undefined;
      }

      return {
        val: statValue,
        lbl: label,
      };
    })
    .filter((item): item is ProductStat => Boolean(item));
}

function imageUrlFromField(image: SanityImageField | null | undefined): string | undefined {
  const assetRef = readString(image?.asset?._ref);

  if (!assetRef) {
    return undefined;
  }

  try {
    return urlFor({
      _type: "image",
      asset: {
        _type: "reference",
        _ref: assetRef,
      },
    })
      .auto("format")
      .url();
  } catch {
    return undefined;
  }
}

function mapSanityProduct(doc: SanityProductDoc): Product | null {
  const slug = readString(doc.slug?.current) ?? readString(doc.id);
  if (!slug) {
    return null;
  }

  const fallbackProduct =
    legacyProducts.find((product) => product.slug === slug || product.id === slug) ?? null;

  const categoryId =
    toProductCategory(readString(doc.categoryId)) ??
    toProductCategory(readString(doc.category?.slug?.current)) ??
    fallbackProduct?.categoryId ??
    "boxes";

  const facts = mapStringArray(doc.facts);
  const features = mapStringArray(doc.features);
  const detailedSpecs = mapSpecs(doc.detailedSpecs);
  const faqs = mapFaqs(doc.faqs);
  const heroStats = mapStats(doc.heroStats);

  const name = readString(doc.name) ?? fallbackProduct?.name ?? slug.replace(/-/g, " ");
  const description = readString(doc.description) ?? fallbackProduct?.description ?? "";

  const image = imageUrlFromField(doc.image) ?? fallbackProduct?.image ?? "";
  const catalogueImage =
    imageUrlFromField(doc.catalogueImage) ??
    fallbackProduct?.catalogueImage ??
    (image || undefined);

  return {
    id: readString(doc.id) ?? fallbackProduct?.id ?? slug,
    slug,
    name,
    categoryId,
    shortDescription:
      readString(doc.shortDescription) ?? fallbackProduct?.shortDescription ?? "",
    description,
    facts: facts.length > 0 ? facts : fallbackProduct?.facts ?? [],
    features:
      features.length > 0
        ? features
        : facts.length > 0
          ? facts
          : fallbackProduct?.features ?? [],
    specs: {
      materials:
        readString(doc.specs?.materials) ?? fallbackProduct?.specs.materials ?? "",
      printOptions:
        readString(doc.specs?.printOptions) ?? fallbackProduct?.specs.printOptions ?? "",
      moq: readString(doc.specs?.moq) ?? fallbackProduct?.specs.moq ?? "",
      leadTime:
        readString(doc.specs?.leadTime) ?? fallbackProduct?.specs.leadTime ?? "",
    },
    detailedSpecs:
      detailedSpecs.length > 0 ? detailedSpecs : fallbackProduct?.detailedSpecs ?? [],
    image,
    catalogueImage,
    showcaseImage:
      imageUrlFromField(doc.showcaseImage) ?? fallbackProduct?.showcaseImage,
    lifestyleImage:
      imageUrlFromField(doc.lifestyleImage) ?? fallbackProduct?.lifestyleImage,
    seo: {
      title:
        readString(doc.seo?.title) ??
        fallbackProduct?.seo.title ??
        `${name} | Supplied`,
      description:
        readString(doc.seo?.description) ??
        fallbackProduct?.seo.description ??
        description,
    },
    faqs: faqs.length > 0 ? faqs : fallbackProduct?.faqs ?? [],
    heroStats:
      heroStats.length > 0 ? heroStats : fallbackProduct?.heroStats ?? [],
    isNew:
      typeof doc.isNew === "boolean" ? doc.isNew : fallbackProduct?.isNew,
    modelUrl: readString(doc.modelUrl) ?? fallbackProduct?.modelUrl,
  };
}

async function fetchProductsFromSanity(): Promise<Product[]> {
  const docs = await sanityFetch<SanityProductDoc[]>({
    query: productsQuery,
    tags: ["products"],
  });
  return docs
    .map((doc) => mapSanityProduct(doc))
    .filter((product): product is Product => Boolean(product));
}

async function fetchCategoryLabelsFromSanity(): Promise<Map<ProductCategory, string>> {
  const docs = await sanityFetch<SanityProductCategoryDoc[]>({
    query: productCategoriesQuery,
    tags: ["products", "product-categories"],
  });
  const labels = new Map<ProductCategory, string>();

  for (const doc of docs) {
    const categoryId = toProductCategory(readString(doc.id));
    if (!categoryId) {
      continue;
    }

    labels.set(categoryId, readString(doc.label) ?? defaultCategoryLabels[categoryId]);
  }

  return labels;
}

export async function getProducts(): Promise<Product[]> {
  try {
    const sanityProducts = await fetchProductsFromSanity();
    if (sanityProducts.length > 0) {
      return sanityProducts;
    }
  } catch {
    // Fall back to static products while Sanity is empty or unavailable.
  }

  return legacyProducts;
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  const normalizedSlug = slug.trim();
  if (!normalizedSlug) {
    return undefined;
  }

  try {
    const doc = await sanityFetch<SanityProductDoc | null>({
      query: productBySlugQuery,
      params: { slug: normalizedSlug },
      tags: ["products"],
    });
    if (doc) {
      const mappedProduct = mapSanityProduct(doc);
      if (mappedProduct) {
        return mappedProduct;
      }
    }
  } catch {
    // Fall back to static products while Sanity is empty or unavailable.
  }

  return legacyProducts.find((product) => product.slug === normalizedSlug);
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const allProducts = await getProducts();
  if (categoryId === "all") {
    return allProducts;
  }

  const normalizedCategoryId = toProductCategory(categoryId);
  if (!normalizedCategoryId) {
    return [];
  }

  return allProducts.filter((product) => product.categoryId === normalizedCategoryId);
}

export async function getProductCategories(): Promise<ProductCategoryOption[]> {
  const allProducts = await getProducts();
  const activeCategoryIds = Array.from(
    new Set(allProducts.map((product) => product.categoryId))
  );

  const categoryLabels = new Map<ProductCategory, string>();
  for (const category of legacyCategories) {
    const categoryId = toProductCategory(category.id);
    if (!categoryId) {
      continue;
    }
    categoryLabels.set(categoryId, category.label);
  }

  try {
    const sanityCategoryLabels = await fetchCategoryLabelsFromSanity();
    for (const [categoryId, label] of sanityCategoryLabels.entries()) {
      categoryLabels.set(categoryId, label);
    }
  } catch {
    // Keep default category labels when Sanity categories are unavailable.
  }

  return [
    { id: "all", label: "All Products" },
    ...activeCategoryIds.map((categoryId) => ({
      id: categoryId,
      label: categoryLabels.get(categoryId) ?? defaultCategoryLabels[categoryId],
    })),
  ];
}
