"use client";

import React from "react";
import { motion } from "framer-motion";

interface MosaicTileProps {
  id: string;
  title: string;
  imageSrc: string;
  isActive: boolean;
  onActivate: (id: string) => void;
  className?: string;
}

export function MosaicTile({
  id,
  title,
  imageSrc,
  isActive,
  onActivate,
  className = "",
}: MosaicTileProps) {
  return (
    <motion.div
      layout
      className={`relative rounded-2xl overflow-hidden cursor-pointer group ${className} ${
        isActive ? "z-10 ring-2 ring-supplied-amber/50 shadow-[0_0_30px_rgba(232,121,28,0.15)]" : "z-0"
      }`}
      onHoverStart={() => onActivate(id)}
      onFocus={() => onActivate(id)}
      onClick={() => onActivate(id)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${title}`}
      transition={{
        layout: { duration: 0.4, type: "spring", stiffness: 100, damping: 15 },
      }}
    >
      <div className="absolute inset-0 bg-supplied-ink-80">
        {/* Placeholder for image - using a colored div for now if no image */}
        <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url(${imageSrc})`, backgroundColor: '#2A2A35' }}
        />
        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-40 group-hover:opacity-20'}`} />
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <motion.span 
          layout="position"
          className={`block text-white font-medium transition-all duration-300 ${
            isActive ? "text-lg translate-y-0 opacity-100" : "text-sm translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0"
          }`}
        >
          {title}
        </motion.span>
      </div>
    </motion.div>
  );
}
