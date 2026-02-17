"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getAllProducts } from "@/lib/products";

export function ProductTabs() {
  const pathname = usePathname();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const products = getAllProducts();

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll = direction === "left" 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
        
      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="w-full border-b border-white/10 bg-supplied-ink py-4 relative group">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10 relative flex items-center">
        {/* Left Arrow Button */}
        <button 
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-2 z-10 w-8 h-8 items-center justify-center rounded-full bg-supplied-ink-80 text-white/60 hover:text-white hover:bg-supplied-ink-60 transition-all duration-300 border border-white/10 shadow-lg"
          aria-label="Scroll left"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        {/* Scroll Container */}
        <div 
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full px-2 md:px-12 scroll-smooth"
        >
          {products.map((product) => {
            const isActive = pathname === `/products/${product.slug}`;
            return (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className={`px-4 py-[7px] rounded-full text-[13px] font-medium transition-all duration-300 ease-supplied whitespace-nowrap border flex-shrink-0 ${
                  isActive
                    ? "bg-supplied-amber text-white border-supplied-amber"
                    : "bg-white/5 text-white/60 border-transparent hover:text-white hover:bg-white/10"
                }`}
              >
                {product.name}
              </Link>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button 
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-2 z-10 w-8 h-8 items-center justify-center rounded-full bg-supplied-ink-80 text-white/60 hover:text-white hover:bg-supplied-ink-60 transition-all duration-300 border border-white/10 shadow-lg"
          aria-label="Scroll right"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
