"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Product } from "@/types";

interface ProductTabsProps {
  products: Product[];
}

export function ProductTabs({ products }: ProductTabsProps) {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentIndex = products.findIndex(
    (p) => pathname === `/products/${p.slug}`
  );
  const current = currentIndex >= 0 ? products[currentIndex] : null;
  const prev = currentIndex > 0 ? products[currentIndex - 1] : null;
  const next =
    currentIndex < products.length - 1 ? products[currentIndex + 1] : null;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setDropdownOpen(false);
  }, [pathname]);

  if (!current) return null;

  return (
    <div className="w-full border-b border-white/10 bg-supplied-ink">
      <div className="max-w-[1440px] mx-auto px-4 md:px-10">
        <div className="flex items-center justify-between h-12">
          {/* Previous product */}
          <div className="flex-1 flex justify-start">
            {prev ? (
              <Link
                href={`/products/${prev.slug}`}
                className="flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 transition-colors group"
                aria-label={`Previous: ${prev.name}`}
              >
                <svg
                  className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7.5 9L4.5 6L7.5 3" />
                </svg>
                <span className="hidden sm:inline">{prev.name}</span>
              </Link>
            ) : (
              <span />
            )}
          </div>

          {/* Current product dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((p) => !p)}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full text-[13px] font-semibold text-white bg-white/8 border border-white/10 hover:border-white/20 transition-all cursor-pointer"
            >
              {current.name}
              <svg
                className={`w-3 h-3 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 4.5L6 7.5L9 4.5" />
              </svg>
            </button>

            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50 transition-all duration-200 ${
                dropdownOpen
                  ? "opacity-100 translate-y-0 pointer-events-auto"
                  : "opacity-0 -translate-y-1 pointer-events-none"
              }`}
            >
              <div className="bg-[#1a1a22] border border-white/10 rounded-xl shadow-2xl py-2 min-w-[220px]">
                {products.map((p) => {
                  const isActive = pathname === `/products/${p.slug}`;
                  return (
                    <Link
                      key={p.id}
                      href={`/products/${p.slug}`}
                      className={`flex items-center px-4 py-2.5 text-[13px] transition-colors ${
                        isActive
                          ? "text-supplied-amber font-medium bg-supplied-amber/5"
                          : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {p.name}
                      {isActive && (
                        <svg
                          className="w-3.5 h-3.5 ml-auto text-supplied-amber"
                          viewBox="0 0 12 12"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M2 6l3 3 5-5" />
                        </svg>
                      )}
                    </Link>
                  );
                })}
                <div className="h-px bg-white/8 mx-3 my-1" />
                <Link
                  href="/products"
                  className="flex items-center px-4 py-2.5 text-[13px] text-white/40 hover:text-white hover:bg-white/5 transition-colors"
                >
                  View All Products →
                </Link>
              </div>
            </div>
          </div>

          {/* Next product */}
          <div className="flex-1 flex justify-end">
            {next ? (
              <Link
                href={`/products/${next.slug}`}
                className="flex items-center gap-2 text-[13px] text-white/40 hover:text-white/70 transition-colors group"
                aria-label={`Next: ${next.name}`}
              >
                <span className="hidden sm:inline">{next.name}</span>
                <svg
                  className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                  viewBox="0 0 12 12"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4.5 3L7.5 6L4.5 9" />
                </svg>
              </Link>
            ) : (
              <span />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
