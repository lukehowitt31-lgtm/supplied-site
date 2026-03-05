"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasImage = !!product.catalogueImage;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#F5F3F0]"
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        {hasImage ? (
          <img
            src={product.catalogueImage}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-supplied-ink-05 via-[#EAE6E1] to-supplied-ink-10" />
        )}

        <div className="absolute top-4 left-4 flex items-center gap-2">
          {product.facts.slice(0, 2).map((fact) => (
            <span
              key={fact}
              className="text-[10px] font-semibold tracking-[0.06em] uppercase text-white bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10"
            >
              {fact}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-supplied-ink p-5 sm:p-6 flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-lg font-bold text-white leading-[1.15] tracking-[-0.02em] mb-1.5">
            {product.name}
          </h3>
          <p className="text-white/40 text-[13px] font-medium uppercase tracking-wide mb-4">
            {product.shortDescription}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3.5 border-t border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-semibold text-white/40">
              MOQ: {product.specs.moq}
            </span>
            <span className="w-px h-3 bg-white/15" />
            <span className="text-[11px] font-semibold text-white/40">
              {product.specs.leadTime}
            </span>
          </div>

          <span className="text-[12px] font-semibold text-white/60 flex items-center gap-1.5 group-hover:text-supplied-amber transition-colors duration-300">
            View <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
