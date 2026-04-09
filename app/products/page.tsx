import React from "react";
import { Metadata } from "next";
import { ProductsIndex } from "@/components/sections/ProductsIndex";
import { getProductCategories, getProducts } from "@/lib/content/products";
import { getProductsIndexPageContent } from "@/lib/content/productsIndex";
import { BreadcrumbJsonLd } from "@/components/ui/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Custom Sustainable Packaging Solutions | Supplied",
  description:
    "Browse our full range of sustainable packaging — from custom mailer boxes and rigid gift boxes to tissue paper, stickers, and seasonal packaging. Designed for ecommerce brands.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Custom Sustainable Packaging Solutions | Supplied",
    description:
      "Browse our full range of sustainable packaging — from custom mailer boxes and rigid gift boxes to tissue paper, stickers, and seasonal packaging. Designed for ecommerce brands.",
    url: "/products",
    images: [{ url: "/og?title=Custom%20Sustainable%20Packaging&subtitle=Browse%20Products", width: 1200, height: 630, alt: "Supplied Packaging Products" }],
  },
};

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
