"use client";

import React, { useRef, useCallback } from "react";
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
  const enterRef = useRef<{ x: number; y: number } | null>(null);

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent) => {
      enterRef.current = { x: e.clientX, y: e.clientY };
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isActive || !enterRef.current) return;
      const dx = e.clientX - enterRef.current.x;
      const dy = e.clientY - enterRef.current.y;
      if (Math.abs(dx) + Math.abs(dy) > 8) {
        onActivate(id);
        enterRef.current = null;
      }
    },
    [id, isActive, onActivate]
  );

  return (
    <motion.div
      layout
      className={`relative rounded-xl overflow-hidden cursor-pointer group ${className} ${
        isActive
          ? "z-10 ring-1 ring-supplied-amber/30 shadow-[0_0_24px_rgba(232,121,28,0.1)]"
          : "z-0"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onClick={() => onActivate(id)}
      tabIndex={0}
      role="button"
      aria-label={`View ${title}`}
      transition={{
        layout: { duration: 0.55, ease: [0.25, 1, 0.5, 1] },
      }}
    >
      <div className="absolute inset-0">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ backgroundImage: `url(${imageSrc})`, backgroundColor: "#E8E4E0" }}
        />
        <div
          className={`absolute inset-0 transition-opacity duration-500 ${
            isActive ? "bg-black/5" : "bg-black/25 group-hover:bg-black/10"
          }`}
        />
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
        <motion.span
          layout="position"
          className={`block text-white font-semibold drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)] transition-all duration-400 ${
            isActive
              ? "text-base sm:text-lg opacity-100 translate-y-0"
              : "text-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
          }`}
        >
          {title}
        </motion.span>
      </div>
    </motion.div>
  );
}
