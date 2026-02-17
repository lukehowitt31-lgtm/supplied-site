"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Hotspot } from "@/components/ui/ImageHotspots";

export default function CalibratePage() {
  const [hotspots, setHotspots] = useState<Hotspot[]>([
    {
      id: "example-1",
      x: 50,
      y: 50,
      title: "Example Hotspot",
      detail: "Click anywhere on the image to move me or add new points.",
      href: "#",
    },
  ]);
  const [selectedId, setSelectedId] = useState<string>("example-1");
  const imageRef = useRef<HTMLDivElement>(null);

  const selectedHotspot = hotspots.find((h) => h.id === selectedId);

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = Number(((e.clientX - rect.left) / rect.width * 100).toFixed(1));
    const y = Number(((e.clientY - rect.top) / rect.height * 100).toFixed(1));

    if (selectedId) {
      // Move selected hotspot
      setHotspots((prev) =>
        prev.map((h) => (h.id === selectedId ? { ...h, x, y } : h))
      );
    } else {
      // Create new hotspot
      const newId = `hotspot-${Date.now()}`;
      setHotspots((prev) => [
        ...prev,
        {
          id: newId,
          x,
          y,
          title: "New Hotspot",
          detail: "Description here",
          href: "",
        },
      ]);
      setSelectedId(newId);
    }
  };

  const updateHotspot = (id: string, field: keyof Hotspot, value: string) => {
    setHotspots((prev) =>
      prev.map((h) => (h.id === id ? { ...h, [field]: value } : h))
    );
  };

  const deleteHotspot = (id: string) => {
    setHotspots((prev) => prev.filter((h) => h.id !== id));
    if (selectedId === id) setSelectedId("");
  };

  const copyConfig = () => {
    const config = JSON.stringify(hotspots, null, 2);
    navigator.clipboard.writeText(config);
    alert("Configuration copied to clipboard! Paste it into components/sections/HeroSpread.tsx");
  };

  return (
    <div className="min-h-screen bg-supplied-ink text-white pt-24 pb-12">
      <Container>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Editor Column */}
          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h1 className="text-2xl font-bold mb-4">Hotspot Calibrator</h1>
              <p className="text-white/60 text-sm mb-6">
                1. Select a hotspot from the list below.<br />
                2. Click on the image to position it.<br />
                3. Edit details in the form.<br />
                4. Copy config when done.
              </p>

              <div className="space-y-4 mb-6">
                <Button onClick={() => {
                  const newId = `hotspot-${Date.now()}`;
                  setHotspots([...hotspots, { id: newId, x: 50, y: 50, title: "New Item", detail: "", href: "" }]);
                  setSelectedId(newId);
                }} variant="outline-light" size="sm" className="w-full justify-center">
                  + Add New Hotspot
                </Button>
                
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                  {hotspots.map((h) => (
                    <div
                      key={h.id}
                      onClick={() => setSelectedId(h.id)}
                      className={`p-3 rounded cursor-pointer border transition-colors ${
                        selectedId === h.id
                          ? "bg-supplied-amber/20 border-supplied-amber"
                          : "bg-white/5 border-transparent hover:bg-white/10"
                      }`}
                    >
                      <div className="font-bold text-sm">{h.title}</div>
                      <div className="text-xs text-white/50">x: {h.x}%, y: {h.y}%</div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedHotspot && (
                <div className="space-y-4 border-t border-white/10 pt-4">
                  <div>
                    <label className="block text-xs text-white/40 mb-1">Title</label>
                    <input
                      type="text"
                      value={selectedHotspot.title}
                      onChange={(e) => updateHotspot(selectedHotspot.id, "title", e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-sm focus:border-supplied-amber outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 mb-1">Detail</label>
                    <textarea
                      value={selectedHotspot.detail || ""}
                      onChange={(e) => updateHotspot(selectedHotspot.id, "detail", e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-sm focus:border-supplied-amber outline-none h-20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-white/40 mb-1">Link (href)</label>
                    <input
                      type="text"
                      value={selectedHotspot.href || ""}
                      onChange={(e) => updateHotspot(selectedHotspot.id, "href", e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded px-3 py-2 text-sm focus:border-supplied-amber outline-none"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button 
                      onClick={() => deleteHotspot(selectedHotspot.id)}
                      variant="outline-light" 
                      size="sm" 
                      className="flex-1 justify-center border-red-500/50 text-red-400 hover:bg-red-500/10"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-white/10 mt-6">
                <Button onClick={copyConfig} variant="fill-amber" size="lg" className="w-full justify-center">
                  Copy Configuration JSON
                </Button>
              </div>
            </div>
          </div>

          {/* Image Area */}
          <div className="w-full lg:w-2/3">
            <div className="sticky top-24">
              <div 
                ref={imageRef}
                onClick={handleImageClick}
                className="relative w-full rounded-xl overflow-hidden border border-white/10 cursor-crosshair bg-black/20"
              >
                <Image
                  src="/SuppliedSpreadTransparent.webp"
                  alt="Calibration Image"
                  width={1200}
                  height={900}
                  className="w-full h-auto"
                  draggable={false}
                />
                
                {hotspots.map((h) => (
                  <div
                    key={h.id}
                    className="absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none"
                    style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  >
                    <div className={`w-3 h-3 rounded-full border-2 shadow-sm ${
                      selectedId === h.id 
                        ? "bg-supplied-amber border-white scale-125" 
                        : "bg-white border-supplied-amber opacity-60"
                    }`} />
                    {selectedId === h.id && (
                      <div className="absolute top-full mt-2 bg-black/80 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10">
                        {h.title}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-center text-white/40 text-sm mt-4">
                Click on the image to position the selected hotspot.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
