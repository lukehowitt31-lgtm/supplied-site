"use client";

import React, { useState, useMemo } from "react";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/ui/ProductCard";
import { Tabs } from "@/components/ui/Tabs";
import { ProductHero } from "./products/ProductHero";
import { CTA } from "./CTA";
import { Product } from "@/types";
import { categories } from "@/lib/products";

interface ProductsIndexProps {
  products: Product[];
}

export function ProductsIndex({ products }: ProductsIndexProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((product) => product.categoryId === activeCategory);
  }, [activeCategory, products]);

  return (
    <>
      <ProductHero />
      
      <section className="py-20 bg-supplied-bg min-h-[600px]">
        <Container>
          <Tabs 
            categories={categories} 
            activeCategory={activeCategory} 
            onSelect={setActiveCategory} 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-supplied-ink-40 text-lg">No products found in this category.</p>
            </div>
          )}
        </Container>
      </section>

      <CTA />
    </>
  );
}
