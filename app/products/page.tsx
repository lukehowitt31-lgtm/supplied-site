import React from "react";
import { Metadata } from "next";
import { ProductsIndex } from "@/components/sections/ProductsIndex";
import { getProductCategories, getProducts } from "@/lib/content/products";
import { getProductsIndexPageContent } from "@/lib/content/productsIndex";

export const metadata: Metadata = {
  title: "Our Products | Supplied",
  description: "Browse our complete catalog of sustainable packaging solutions. From custom mailer boxes to premium rigid packaging.",
};

export default async function ProductsPage() {
  const [products, categories, pageContent] = await Promise.all([
    getProducts(),
    getProductCategories(),
    getProductsIndexPageContent(),
  ]);

  return (
    <ProductsIndex
      products={products}
      categories={categories}
      pageContent={pageContent}
    />
  );
}
