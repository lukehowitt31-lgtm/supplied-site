import React from "react";
import { Metadata } from "next";
import { ProductsIndex } from "@/components/sections/ProductsIndex";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Our Products | Supplied",
  description: "Browse our complete catalog of sustainable packaging solutions. From custom mailer boxes to premium rigid packaging.",
};

export default function ProductsPage() {
  const products = getAllProducts();
  return <ProductsIndex products={products} />;
}
