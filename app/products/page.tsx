import React from "react";
import { Metadata } from "next";
import { ProductsIndex } from "@/components/sections/ProductsIndex";
import { getProductCategories, getProducts } from "@/lib/content/products";
import { getProductsIndexPageContent } from "@/lib/content/productsIndex";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";
import { buildPageMetadata, ogImageUrl } from "@/lib/seo/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Custom Sustainable Packaging Solutions | Supplied",
  description:
    "Browse our full range of sustainable packaging — mailer boxes, rigid boxes, tissue paper, stickers and more. Designed for ecommerce brands.",
  path: "/products",
  image: ogImageUrl({
    title: "Custom Sustainable Packaging",
    subtitle: "Browse Products",
    bg: "/images/products/SURIMailerBoxes.webp",
  }),
  imageAlt: "Supplied Packaging Products",
});

export default async function ProductsPage() {
  const [products, categories, pageContent] = await Promise.all([
    getProducts(),
    getProductCategories(),
    getProductsIndexPageContent(),
  ]);

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: "Home", href: "/" }, { name: "Products" }]} />
      <ProductsIndex
        products={products}
        categories={categories}
        pageContent={pageContent}
      />
    </>
  );
}
