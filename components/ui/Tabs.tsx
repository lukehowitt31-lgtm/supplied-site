"use client";

import React from "react";

interface TabsProps {
  categories: { id: string; label: string }[];
  activeCategory: string;
  onSelect: (id: string) => void;
}

export function Tabs({ categories, activeCategory, onSelect }: TabsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-12">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`px-5 py-2.5 rounded-full text-[13.5px] font-semibold transition-all duration-300 ease-supplied ${
            activeCategory === cat.id
              ? "bg-supplied-ink text-white shadow-lg transform scale-105"
              : "bg-white text-supplied-ink-60 border border-supplied-ink-05 hover:border-supplied-ink-20 hover:text-supplied-ink hover:bg-supplied-ink-05"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
