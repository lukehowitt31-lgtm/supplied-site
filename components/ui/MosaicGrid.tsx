"use client";

import React, { useCallback, useRef } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { MosaicTile } from "./MosaicTile";

export interface TileData {
  id: string;
  title: string;
  imageSrc: string;
  statsOverride: { value: string; label: string }[];
  defaultClass: string;
}

interface MosaicGridProps {
  tiles: TileData[];
  activeTileId: string;
  onTileActivate: (id: string) => void;
}

const COOLDOWN_MS = 500;

export function MosaicGrid({ tiles, activeTileId, onTileActivate }: MosaicGridProps) {
  const lastChangeRef = useRef<number>(0);

  const handleTileActivate = useCallback(
    (id: string) => {
      if (id === activeTileId) return;
      const now = Date.now();
      if (now - lastChangeRef.current < COOLDOWN_MS) return;
      lastChangeRef.current = now;
      onTileActivate(id);
    },
    [activeTileId, onTileActivate]
  );

  const activeIndex = tiles.findIndex((t) => t.id === activeTileId);

  return (
    <LayoutGroup>
      <motion.div
        layout
        className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 h-[400px] sm:h-[500px] w-full grid-flow-dense"
      >
        {tiles.map((tile, index) => {
          const isActive = tile.id === activeTileId;

          const spanClass = isActive
            ? "sm:col-span-2 sm:row-span-2 z-10"
            : "sm:col-span-1 sm:row-span-1 z-0";

          let orderClass = `order-${index + 1}`;

          if (activeIndex === 2) {
            if (index === 1) orderClass = "order-3";
            if (index === 2) orderClass = "order-2";
          } else if (activeIndex === 5) {
            if (index === 4) orderClass = "order-6";
            if (index === 5) orderClass = "order-5";
          }

          const finalOrderClass = `order-none sm:${orderClass}`;

          return (
            <MosaicTile
              key={tile.id}
              id={tile.id}
              title={tile.title}
              imageSrc={tile.imageSrc}
              isActive={isActive}
              onActivate={handleTileActivate}
              className={`${spanClass} ${finalOrderClass} col-span-1 row-span-1`}
            />
          );
        })}
      </motion.div>
    </LayoutGroup>
  );
}
