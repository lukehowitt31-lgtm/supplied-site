import React from "react";
import { Metadata } from "next";
import { ProductsIndex } from "@/components/sections/ProductsIndex";
import { getProductCategories, getProducts } from "@/lib/content/products";
import { getProductsIndexPageContent } from "@/lib/content/productsIndex";

export const metadata: Metadata = {
  title: "Custom Sustainable Packaging Solutions | Supplied",
  description:
    "Browse our full range of sustainable packaging — from custom mailer boxes and rigid gift boxes to tissue paper, stickers, and seasonal packaging. Designed for ecommerce brands.",
  alternates: { canonical: "/products" },
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
