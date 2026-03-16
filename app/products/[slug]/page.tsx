import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/content/products";
import { ProductDetail } from "@/components/sections/ProductDetail";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all products at build time
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Generate metadata for each product page
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.seo?.title || `${product.name} | Supplied Packaging`,
    description: product.seo?.description || product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const [product, allProducts] = await Promise.all([
    getProductBySlug(slug),
    getProducts(),
  ]);

  if (!product) {
    notFound();
  }

  const relatedProducts = allProducts
    .filter((p) => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      {product.modelUrl && (
        <>
          <link rel="preload" href={product.modelUrl} as="fetch" crossOrigin="anonymous" />
          <link rel="preload" href="/studio_small_01_1k.hdr" as="fetch" crossOrigin="anonymous" />
        </>
      )}
      <ProductDetail
        product={product}
        relatedProducts={relatedProducts}
        tabProducts={allProducts}
      />
    </>
  );
}
