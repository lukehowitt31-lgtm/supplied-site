import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/content/products";
import { ProductDetail } from "@/components/sections/ProductDetail";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.suppliedpackaging.com";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product Not Found" };
  }

  const title = product.seo?.title || `${product.name} | Supplied Packaging`;
  const description = product.seo?.description || product.description;

  return {
    title,
    description,
    alternates: { canonical: `/products/${slug}` },
    openGraph: {
      title,
      description,
      url: `/products/${slug}`,
      images: [{ url: product.image, alt: product.name }],
    },
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

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.seo?.description || product.description,
    image: product.image,
    url: `${siteUrl}/products/${product.slug}`,
    brand: { "@type": "Organization", name: "Supplied" },
    category: product.categoryId,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
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
