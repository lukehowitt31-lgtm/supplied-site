import React from "react";
import { Metadata } from "next";
import { ProductsIndex } from "@/components/sections/ProductsIndex";
import { getProductCategories, getProducts } from "@/lib/content/products";

export const metadata: Metadata = {
  title: "Our Products | Supplied",
  description: "Browse our complete catalog of sustainable packaging solutions. From custom mailer boxes to premium rigid packaging.",
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getProductCategories(),
  ]);

  return <ProductsIndex products={products} categories={categories} />;
}
