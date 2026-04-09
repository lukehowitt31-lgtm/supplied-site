"use client";

import React, { useState, useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { ProductHero } from "./products/ProductHero";
import { CTA } from "./CTA";
import { Product } from "@/types";
import type { ProductsIndexPageContent } from "@/lib/content/productsIndex";

interface ProductCategoryOption {
  id: string;
  label: string;
}

interface ProductsIndexProps {
  products: Product[];
  categories: ProductCategoryOption[];
  pageContent?: ProductsIndexPageContent;
}

export function ProductsIndex({ products, categories, pageContent }: ProductsIndexProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((product) => product.categoryId === activeCategory);
  }, [activeCategory, products]);

  return (
    <>
      <ProductHero
        tag={pageContent?.hero.tag}
        headline={pageContent?.hero.headline}
        subheadline={pageContent?.hero.subheadline}
        intro={pageContent?.hero.intro}
      />

      <section className="py-16 sm:py-20 bg-white min-h-[600px]">
        <Container>
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-[13px] font-semibold transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-supplied-ink text-white shadow-lg"
                    : "bg-white text-supplied-ink-60 border border-supplied-ink-10 hover:border-supplied-ink-20 hover:text-supplied-ink"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-supplied-ink-40 text-lg">
                No products found in this category.
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>

      <CTA content={pageContent?.cta} />
    </>
  );
}
