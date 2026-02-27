"use client";

import React, { useCallback, useRef, useState } from "react";

export interface MapPinData {
  cx: number;
  cy: number;
  label: string;
}

interface DottedWorldMapProps {
  dotsHtml: string;
  pins: MapPinData[];
  viewBox: string;
  dotColor?: string;
  pinColor?: string;
  className?: string;
  onMapClick?: (coords: {
    cx: number;
    cy: number;
    lat: number;
    lng: number;
  }) => void;
}

function svgToLatLng(cx: number, cy: number, vbW: number, vbH: number) {
  const lng = (cx / vbW) * 360 - 180;
  const mercN = ((vbH / 2 - cy) * Math.PI) / (vbH / 2);
  const lat =
    (2 * Math.atan(Math.exp(mercN)) - Math.PI / 2) * (180 / Math.PI);
  return {
    lat: Math.round(lat * 100) / 100,
    lng: Math.round(lng * 100) / 100,
  };
}

export function DottedWorldMap({
  dotsHtml,
  pins,
  viewBox,
  dotColor = "rgba(255,255,255,0.18)",
  pinColor = "#E8791C",
  className = "",
  onMapClick,
}: DottedWorldMapProps) {
  const [, , vbW, vbH] = viewBox.split(" ").map(Number);
  const [hoveredPin, setHoveredPin] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleClick = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!onMapClick) return;
      const svg = e.currentTarget;
      const rect = svg.getBoundingClientRect();
      const cx = ((e.clientX - rect.left) / rect.width) * vbW;
      const cy = ((e.clientY - rect.top) / rect.height) * vbH;
      const { lat, lng } = svgToLatLng(cx, cy, vbW, vbH);
      onMapClick({ cx, cy, lat, lng });
    },
    [onMapClick, vbW, vbH]
  );

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {/* Subtle orange glow behind the map */}
      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(232,121,28,0.09),transparent_70%)] pointer-events-none" />

      <svg
        ref={svgRef}
        viewBox={viewBox}
        className="relative w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        onClick={handleClick}
        style={{ cursor: onMapClick ? "crosshair" : undefined }}
      >
        {/* Map dots — all static, batched for performance */}
        <g fill={dotColor} dangerouslySetInnerHTML={{ __html: dotsHtml }} />

        {/* Radar pins at sourcing locations */}
        {pins.map((pin, i) => (
          <g
            key={`pin-${i}`}
            onMouseEnter={() => {
              setHoveredPin(i);
              if (svgRef.current && wrapperRef.current) {
                const svg = svgRef.current;
                const wrapper = wrapperRef.current;
                const pt = svg.createSVGPoint();
                pt.x = pin.cx;
                pt.y = pin.cy;
                const screenPt = pt.matrixTransform(svg.getScreenCTM()!);
                const wrapperRect = wrapper.getBoundingClientRect();
                setTooltipPos({
                  x: screenPt.x - wrapperRect.left,
                  y: screenPt.y - wrapperRect.top,
                });
              }
            }}
            onMouseLeave={() => {
              setHoveredPin(null);
              setTooltipPos(null);
            }}
            style={{ cursor: "pointer" }}
          >
            {/* Expanding ring 1 */}
            <circle
              cx={pin.cx}
              cy={pin.cy}
              r="0.5"
              fill="none"
              stroke={pinColor}
              strokeWidth="0.18"
              opacity="0"
            >
              <animate
                attributeName="r"
                from="0.5"
                to="3.5"
                dur="2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.7;0"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Expanding ring 2 (offset for continuous pulse) */}
            <circle
              cx={pin.cx}
              cy={pin.cy}
              r="0.5"
              fill="none"
              stroke={pinColor}
              strokeWidth="0.12"
              opacity="0"
            >
              <animate
                attributeName="r"
                from="0.5"
                to="3.5"
                dur="2s"
                begin="1s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.45;0"
                dur="2s"
                begin="1s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Soft glow behind pin */}
            <circle
              cx={pin.cx}
              cy={pin.cy}
              r="1"
              fill={pinColor}
              opacity="0.2"
            />

            {/* Pin dot */}
            <circle cx={pin.cx} cy={pin.cy} r="0.45" fill={pinColor} />

            {/* Invisible hit area for hover */}
            <circle
              cx={pin.cx}
              cy={pin.cy}
              r="3"
              fill="transparent"
            />
          </g>
        ))}
      </svg>

      {/* Tooltip — pixel-positioned via SVG screen CTM */}
      {hoveredPin !== null && pins[hoveredPin] && tooltipPos && (
        <div
          className="absolute pointer-events-none z-10"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
            transform: "translate(-50%, calc(-100% - 10px))",
          }}
        >
          <span className="block bg-[rgba(26,26,26,0.92)] border border-white/10 rounded-md px-2.5 py-1 text-[11px] font-semibold text-white whitespace-nowrap backdrop-blur-sm">
            {pins[hoveredPin].label}
          </span>
        </div>
      )}
    </div>
  );
}
