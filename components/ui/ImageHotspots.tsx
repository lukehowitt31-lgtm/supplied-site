"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Tooltip } from "./Tooltip";

export interface Hotspot {
  id: string;
  x: number; // Percentage (0-100)
  y: number; // Percentage (0-100)
  title: string;
  detail?: string;
  href?: string;
}

interface ImageHotspotsProps {
  src: string;
  alt: string;
  hotspots: Hotspot[];
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  debug?: boolean; // Enable calibration mode
}

export function ImageHotspots({
  src,
  alt,
  hotspots,
  width = 1200,
  height = 800,
  priority = false,
  className = "",
  debug = false,
}: ImageHotspotsProps) {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [debugCoords, setDebugCoords] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle click for calibration mode
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!debug || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const coords = { x: Number(x.toFixed(1)), y: Number(y.toFixed(1)) };
    setDebugCoords(coords);
    console.log(`Hotspot Coordinate: { x: ${coords.x}, y: ${coords.y} }`);
  };

  // Close tooltip on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveHotspot(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full select-none ${className}`}
      onClick={handleImageClick}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className="w-full h-auto object-contain"
        draggable={false}
      />

      {/* Hotspots */}
      {hotspots.map((hotspot) => (
        <div
          key={hotspot.id}
          className={`absolute ${activeHotspot === hotspot.id ? 'z-50' : 'z-10'}`}
          style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
        >
          <button
            className="group relative w-6 h-6 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center focus:outline-none"
            onMouseEnter={() => setActiveHotspot(hotspot.id)}
            onMouseLeave={() => setActiveHotspot(null)}
            onFocus={() => setActiveHotspot(hotspot.id)}
            onBlur={() => setActiveHotspot(null)}
            onClick={(e) => {
              e.stopPropagation(); // Prevent debug click
              if (hotspot.href) window.location.href = hotspot.href;
            }}
            aria-label={`View details for ${hotspot.title}`}
            aria-expanded={activeHotspot === hotspot.id}
          >
            {/* Pulse Effect */}
            <span className="absolute inline-flex h-full w-full rounded-full bg-supplied-amber opacity-40 animate-ping" />
            
            {/* Core Dot */}
            <span className={`relative inline-flex rounded-full h-3 w-3 bg-supplied-amber border-2 border-white shadow-sm transition-transform duration-300 ${activeHotspot === hotspot.id ? 'scale-125 bg-supplied-amber-bright' : 'group-hover:scale-110'}`} />
          </button>

          {/* Tooltip */}
          <Tooltip
            title={hotspot.title}
            detail={hotspot.detail}
            href={hotspot.href}
            isVisible={activeHotspot === hotspot.id}
            position="top"
          />
        </div>
      ))}

      {/* Debug Marker */}
      {debug && debugCoords && (
        <div
          className="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-50"
          style={{ left: `${debugCoords.x}%`, top: `${debugCoords.y}%` }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-[1px] bg-red-500" />
            <div className="h-full w-[1px] bg-red-500 absolute" />
          </div>
          <div className="absolute top-4 left-4 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded whitespace-nowrap font-mono">
            x: {debugCoords.x}%, y: {debugCoords.y}%
          </div>
        </div>
      )}
    </div>
  );
}
