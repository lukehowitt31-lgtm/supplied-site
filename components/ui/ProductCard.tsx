"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.slug}`} className="group block h-full">
      <div className="bg-white border border-supplied-ink-05 rounded-[20px] p-6 h-full flex flex-col transition-all duration-300 ease-supplied hover:-translate-y-1 hover:shadow-supplied-md hover:border-supplied-amber/20">
        <div className="aspect-[4/3] w-full bg-supplied-ink-05 rounded-xl mb-6 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-supplied-ink-05 to-supplied-ink-10 flex items-center justify-center">
             <span className="text-4xl opacity-20">📦</span>
          </div>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-10"
            onLoad={(e) => e.currentTarget.classList.remove('opacity-0')}
          />
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-supplied-ink shadow-sm opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
            View Details
          </div>
        </div>
        
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-bold text-supplied-ink mb-1 group-hover:text-supplied-amber transition-colors">{product.name}</h3>
              <p className="text-[13px] text-supplied-ink-40 font-medium uppercase tracking-wide">{product.shortDescription}</p>
            </div>
          </div>
          
          <p className="text-[14px] text-supplied-ink-60 leading-relaxed mt-3 line-clamp-2">
            {product.description}
          </p>
          
          <div className="mt-auto pt-5 flex items-center gap-2">
            <span className="text-[11px] font-semibold text-supplied-ink-40 bg-supplied-ink-05 px-2 py-1 rounded-md">
              MOQ: {product.specs.moq}
            </span>
            <span className="text-[11px] font-semibold text-supplied-ink-40 bg-supplied-ink-05 px-2 py-1 rounded-md">
              {product.specs.leadTime}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
