"use client";

import React from "react";

interface TooltipProps {
  title: string;
  detail?: string;
  href?: string;
  isVisible: boolean;
  position: "top" | "bottom" | "left" | "right";
  className?: string;
}

export function Tooltip({ title, detail, href, isVisible, position = "top", className = "" }: TooltipProps) {
  // Base classes for positioning
  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-3",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-3",
    left: "right-full top-1/2 -translate-y-1/2 mr-3",
    right: "left-full top-1/2 -translate-y-1/2 ml-3",
  };

  return (
    <div
      className={`absolute z-50 w-max max-w-[240px] pointer-events-none transition-all duration-200 ease-out ${
        positionClasses[position]
      } ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-1 scale-95"} ${className}`}
      role="tooltip"
      aria-hidden={!isVisible}
    >
      <div className="bg-supplied-ink-80/95 backdrop-blur-md text-white text-xs rounded-lg border border-white/10 shadow-xl p-3 relative">
        <h4 className="font-bold text-white mb-0.5">{title}</h4>
        {detail && <p className="text-white/60 leading-relaxed">{detail}</p>}
        {href && (
          <span className="block mt-2 text-supplied-amber font-medium text-[10px] uppercase tracking-wider">
            View Product →
          </span>
        )}
        
        {/* Arrow */}
        <div 
          className={`absolute w-2 h-2 bg-supplied-ink-80/95 border-white/10 rotate-45 ${
            position === "top" ? "bottom-[-5px] left-1/2 -translate-x-1/2 border-b border-r" :
            position === "bottom" ? "top-[-5px] left-1/2 -translate-x-1/2 border-t border-l" :
            position === "left" ? "right-[-5px] top-1/2 -translate-y-1/2 border-t border-r" :
            "left-[-5px] top-1/2 -translate-y-1/2 border-b border-l"
          }`}
        />
      </div>
    </div>
  );
}
