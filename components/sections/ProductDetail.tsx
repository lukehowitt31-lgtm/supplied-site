import React from "react";
import { Product } from "@/types";
import { ProductDetailHero } from "./products/ProductDetailHero";
import { ProductSpecs } from "./products/ProductSpecs";
import { ProductFAQ } from "./products/ProductFAQ";
import { CTA } from "./CTA";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ProductTabs } from "@/components/ui/ProductTabs";
import { getProductsByCategory } from "@/lib/products";

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  // Get related products (same category, excluding current product)
  const relatedProducts = getProductsByCategory(product.categoryId)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: product.name },
  ];

  return (
    <div className="pt-[80px] bg-supplied-ink">
      <div className="pt-[40px] pb-4">
        <Breadcrumbs items={breadcrumbItems} className="text-white/60 !py-0" />
      </div>

      <ProductTabs />
      
      <ProductDetailHero product={product} />
      
      <ProductSpecs product={product} />
      
      <ProductFAQ product={product} />
      
      {relatedProducts.length > 0 && (
        <section className="py-[80px] bg-white">
          <Container>
            <div className="text-center mb-10">
              <h3 className="text-[20px] font-bold text-supplied-ink tracking-[-0.02em]">Explore more packaging products</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-[100px] bg-supplied-ink text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_50%_50%,rgba(232,121,28,0.06),transparent_60%)] pointer-events-none" />
        <Container className="relative z-10 max-w-[580px]">
          <h2 className="text-[clamp(30px,3.8vw,46px)] font-bold text-white leading-[1.1] mb-4 tracking-[-0.03em]">
            Ready to create <em className="font-fraunces font-normal italic text-supplied-amber-bright">premium</em> {product.name.toLowerCase()}?
          </h2>
          <p className="text-[16px] text-white/40 leading-[1.65] mb-8">
            Tell us about your project. We'll come back with a transparent quote, timeline, and sample plan within 48 hours.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <a href="https://supplied.agency/contact-us/" target="_blank" className="inline-flex items-center gap-2 px-[30px] py-[14px] rounded-full font-sans text-[14px] font-semibold bg-supplied-amber text-white hover:bg-supplied-amber-deep hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(232,121,28,0.25)] transition-all duration-350 ease-supplied group">
              Get a Free Quote <span className="transition-transform duration-300 ease-supplied group-hover:translate-x-[3px]">→</span>
            </a>
            <a href="https://supplied.agency/contact-us/" target="_blank" className="inline-flex items-center gap-2 px-[30px] py-[14px] rounded-full font-sans text-[14px] font-semibold bg-transparent text-white/75 border-[1.5px] border-white/12 hover:border-supplied-amber hover:text-supplied-amber transition-all duration-350 ease-supplied">
              Request Samples
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
}
