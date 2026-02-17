"use client";

import React from "react";
import { motion, LayoutGroup } from "framer-motion";
import { MosaicTile } from "./MosaicTile";

export interface TileData {
  id: string;
  title: string;
  imageSrc: string;
  statsOverride: {
    value: string;
    label: string;
  }[];
  // Base span classes for the default layout
  defaultClass: string;
}

interface MosaicGridProps {
  tiles: TileData[];
  activeTileId: string;
  onTileActivate: (id: string) => void;
}

export function MosaicGrid({ tiles, activeTileId, onTileActivate }: MosaicGridProps) {
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const handleTileActivate = (id: string) => {
    // Clear any pending activation
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // If the tile is already active, do nothing
    if (id === activeTileId) return;

    // Debounce the activation to prevent flickering during layout shifts
    timeoutRef.current = setTimeout(() => {
      onTileActivate(id);
    }, 100); // 100ms delay for stability
  };

  // Find the index of the active tile
  const activeIndex = tiles.findIndex(t => t.id === activeTileId);

  return (
    <LayoutGroup>
      <motion.div 
        layout
        className="grid grid-cols-2 sm:grid-cols-3 gap-3 h-[400px] sm:h-[500px] w-full grid-flow-dense"
      >
        {tiles.map((tile, index) => {
          const isActive = tile.id === activeTileId;
          
          // Mobile: always 1x1 (col-span-1)
          // Desktop (sm): Active is 2x2, Inactive is 1x1
          
          const spanClass = isActive 
            ? "sm:col-span-2 sm:row-span-2 z-10" 
            : "sm:col-span-1 sm:row-span-1 z-0";

          // Calculate order for desktop layout stability
          // Default order is just the index (0-5)
          // But for specific active tiles (index 2 and 5), we need to swap with previous tile
          // to ensure the 2x2 block fits in the 3-column grid without jumping rows unpredictably.
          let orderStyle = {};
          
          // Only apply order logic if we are on desktop (implied by sm: prefix in classes, but here we use style)
          // Since we can't easily use media queries in inline styles, we'll use Tailwind classes for order if possible,
          // or just accept that this order applies to mobile too (which is fine as long as it's consistent).
          // Actually, on mobile it's 2 columns, so the 3-column logic might look weird if we force order.
          // But we only change order for index 2 and 5.
          // Let's use Tailwind classes for order: `order-1`, `order-2`, etc.
          
          let orderClass = `order-${index + 1}`; // Default order based on index (1-based for Tailwind)
          
          if (activeIndex === 2) {
            // If Top Right (index 2) is active, swap with Top Middle (index 1)
            if (index === 1) orderClass = "order-3"; // Move to pos 3
            if (index === 2) orderClass = "order-2"; // Move to pos 2
          } else if (activeIndex === 5) {
            // If Bottom Right (index 5) is active, swap with Bottom Middle (index 4)
            if (index === 4) orderClass = "order-6"; // Move to pos 6
            if (index === 5) orderClass = "order-5"; // Move to pos 5
          }
          
          // Apply order only on sm screens to avoid messing up mobile 2-col layout
          // We use `sm:${orderClass}` and `order-none` (or default) for mobile.
          // Note: Tailwind `order-none` sets order to 0.
          // So on mobile, all are order 0 (source order). On desktop, they follow our logic.
          const finalOrderClass = `order-none sm:${orderClass}`;

          return (
            <MosaicTile
              key={tile.id}
              id={tile.id}
              title={tile.title}
              imageSrc={tile.imageSrc}
              isActive={isActive}
              onActivate={handleTileActivate}
              className={`${spanClass} ${finalOrderClass} col-span-1 row-span-1`} // Mobile defaults to 1x1
            />
          );
        })}
      </motion.div>
    </LayoutGroup>
  );
}
