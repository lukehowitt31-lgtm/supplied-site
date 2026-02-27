"use client";

import React, { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { DottedWorldMap, MapPinData } from "@/components/ui/DottedWorldMap";

interface PinConfig {
  id: string;
  lat: number;
  lng: number;
  label: string;
  active: boolean;
  cx: number;
  cy: number;
}

interface MapTestProps {
  dotsHtml: string;
  initialPins: Array<{
    cx: number;
    cy: number;
    lat: number;
    lng: number;
    label: string;
  }>;
  viewBox: string;
}

export function MapTest({ dotsHtml, initialPins, viewBox }: MapTestProps) {
  const [pins, setPins] = useState<PinConfig[]>(() =>
    initialPins.map((p, i) => ({
      id: `pin-${i}`,
      ...p,
      active: true,
    }))
  );

  const [newestPinId, setNewestPinId] = useState<string | null>(null);
  const labelRefs = useRef<Map<string, HTMLInputElement>>(new Map());

  useEffect(() => {
    if (newestPinId) {
      const input = labelRefs.current.get(newestPinId);
      if (input) {
        input.focus();
        input.select();
      }
      setNewestPinId(null);
    }
  }, [newestPinId]);

  const activePins: MapPinData[] = useMemo(
    () =>
      pins
        .filter((p) => p.active)
        .map((p) => ({ cx: p.cx, cy: p.cy, label: p.label })),
    [pins]
  );

  const togglePin = useCallback((id: string) => {
    setPins((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: !p.active } : p))
    );
  }, []);

  const removePin = useCallback((id: string) => {
    setPins((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const updateLabel = useCallback((id: string, label: string) => {
    setPins((prev) =>
      prev.map((p) => (p.id === id ? { ...p, label } : p))
    );
  }, []);

  const handleMapClick = useCallback(
    (coords: { cx: number; cy: number; lat: number; lng: number }) => {
      const id = `pin-${Date.now()}`;
      setPins((prev) => [
        ...prev,
        {
          id,
          cx: coords.cx,
          cy: coords.cy,
          lat: coords.lat,
          lng: coords.lng,
          label: `Pin ${prev.length + 1}`,
          active: true,
        },
      ]);
      setNewestPinId(id);
    },
    []
  );

  const handleQuickAdd = useCallback(
    (loc: { label: string; lat: number; lng: number }) => {
      const vbParts = viewBox.split(" ").map(Number);
      const vbW = vbParts[2] || 210;
      const vbH = vbParts[3] || 100;
      const cx = ((loc.lng + 180) / 360) * vbW;
      const latRad = (loc.lat * Math.PI) / 180;
      const mercN = Math.log(Math.tan(Math.PI / 4 + latRad / 2));
      const cy = vbH / 2 - (vbH * mercN) / (2 * Math.PI);

      const id = `pin-${Date.now()}-${loc.label}`;
      setPins((prev) => [
        ...prev,
        {
          id,
          cx,
          cy,
          lat: loc.lat,
          lng: loc.lng,
          label: loc.label,
          active: true,
        },
      ]);
    },
    [viewBox]
  );

  return (
    <div className="min-h-screen bg-supplied-ink pt-[140px] pb-20">
      <Container>
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] uppercase text-supplied-amber mb-3">
            <span className="w-1.5 h-1.5 bg-supplied-amber rounded-full" />
            Test Page
          </span>
          <h1 className="text-[clamp(34px,4vw,48px)] font-extrabold text-white leading-[1.1] tracking-[-0.02em] mb-3">
            Dotted World Map
          </h1>
          <p className="text-[15px] text-white/40 leading-[1.6] max-w-[600px]">
            Click anywhere on the map to place a pin. Toggle or remove pins in
            the list below.
          </p>
        </div>

        {/* Map */}
        <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-gradient-to-br from-[#1E1B18] to-[#141210] mb-10">
          <div className="p-6 lg:p-10">
            <DottedWorldMap
              dotsHtml={dotsHtml}
              pins={activePins}
              viewBox={viewBox}
              onMapClick={handleMapClick}
            />
          </div>

          <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/[0.06] border border-white/[0.08] rounded-full px-3.5 py-1.5">
            <span className="w-2 h-2 rounded-full bg-supplied-amber animate-[tagPulse_2.5s_ease_infinite]" />
            <span className="text-[11px] font-medium text-white/50 tracking-wide">
              {activePins.length} active pin
              {activePins.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-white/[0.04] border border-white/[0.06] rounded-full px-3 py-1.5">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 1v10M1 6h10"
                stroke="white"
                strokeOpacity="0.3"
                strokeWidth="1"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-[10px] text-white/30 tracking-wide">
              Click to place pin
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
          {/* Pin List */}
          <div>
            <h2 className="text-lg font-bold text-white mb-4">
              Sourcing Locations
              <span className="ml-2 text-sm font-normal text-white/30">
                ({pins.length})
              </span>
            </h2>
            <div className="space-y-2">
              {pins.map((pin) => (
                <div
                  key={pin.id}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 ${
                    pin.active
                      ? "bg-white/[0.04] border-white/[0.08]"
                      : "bg-transparent border-white/[0.04] opacity-50"
                  }`}
                >
                  {/* Toggle */}
                  <button
                    onClick={() => togglePin(pin.id)}
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors shrink-0 ${
                      pin.active
                        ? "bg-supplied-amber border-supplied-amber"
                        : "border-white/20 bg-transparent"
                    }`}
                  >
                    {pin.active && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2.5 6L5 8.5L9.5 3.5"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>

                  {/* Label + coords */}
                  <div className="flex-1 min-w-0">
                    <input
                      ref={(el) => {
                        if (el) labelRefs.current.set(pin.id, el);
                        else labelRefs.current.delete(pin.id);
                      }}
                      type="text"
                      value={pin.label}
                      onChange={(e) => updateLabel(pin.id, e.target.value)}
                      className="block w-full bg-transparent text-sm font-semibold text-white border-none outline-none placeholder:text-white/20 focus:ring-0 p-0"
                      placeholder="Label..."
                    />
                    <div className="text-[11px] text-white/30 font-mono mt-0.5">
                      {pin.lat.toFixed(2)}, {pin.lng.toFixed(2)}
                      <span className="text-white/15 mx-2">|</span>
                      SVG: ({pin.cx.toFixed(1)}, {pin.cy.toFixed(1)})
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removePin(pin.id)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-colors shrink-0"
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                    >
                      <path
                        d="M3.5 3.5L10.5 10.5M10.5 3.5L3.5 10.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>
              ))}

              {pins.length === 0 && (
                <div className="text-center py-12 text-white/20 text-sm">
                  Click on the map to add your first pin
                </div>
              )}
            </div>
          </div>

          {/* Quick Add Panel */}
          <div className="lg:sticky lg:top-[160px] self-start">
            <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white mb-4">Quick Add</h3>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: "Barcelona", lat: 41.39, lng: 2.17 },
                  { label: "Tokyo", lat: 35.68, lng: 139.69 },
                  { label: "São Paulo", lat: -23.55, lng: -46.63 },
                  { label: "Dubai", lat: 25.2, lng: 55.27 },
                  { label: "Sydney", lat: -33.87, lng: 151.21 },
                  { label: "New York", lat: 40.71, lng: -74.01 },
                  { label: "Taipei", lat: 25.03, lng: 121.57 },
                  { label: "Ho Chi Minh", lat: 10.82, lng: 106.63 },
                  { label: "Mexico City", lat: 19.43, lng: -99.13 },
                  { label: "Lagos", lat: 6.52, lng: 3.38 },
                  { label: "Nairobi", lat: -1.29, lng: 36.82 },
                  { label: "Warsaw", lat: 52.23, lng: 21.01 },
                ].map((loc) => {
                  const alreadyExists = pins.some(
                    (p) =>
                      Math.abs(p.lat - loc.lat) < 0.5 &&
                      Math.abs(p.lng - loc.lng) < 0.5
                  );
                  return (
                    <button
                      key={loc.label}
                      disabled={alreadyExists}
                      onClick={() => handleQuickAdd(loc)}
                      className="text-[11px] font-medium text-white/50 bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 rounded-full transition-all hover:bg-supplied-amber/15 hover:border-supplied-amber/30 hover:text-supplied-amber disabled:opacity-25 disabled:cursor-not-allowed"
                    >
                      + {loc.label}
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 pt-4 border-t border-white/[0.06]">
                <p className="text-[11px] text-white/20 leading-[1.6]">
                  Tip: The easiest way to add pins is to click directly on the
                  map. The lat/lng coordinates are computed automatically from
                  the click position. You can edit the label by clicking on the
                  name in the list.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
