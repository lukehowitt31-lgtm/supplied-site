"use client";

import React, { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { ImageHotspots, Hotspot } from "@/components/ui/ImageHotspots";
import { MosaicGrid, TileData } from "@/components/ui/MosaicGrid";
import { StatCards } from "@/components/ui/StatCards";

// Define hotspots for the product spread image
const SPREAD_HOTSPOTS: Hotspot[] = [
  {
    "id": "hotspot-1771336160878",
    "x": 32,
    "y": 38.4,
    "title": "Custom Mailer Boxes",
    "detail": "Double sided printing with self locking tabs or Peel & seal, for the ultimate opening experience.",
    "href": "/products/mailer-boxes"
  },
  {
    "id": "hotspot-1771336191361",
    "x": 32.3,
    "y": 17.6,
    "title": "Digitally Printed Cans",
    "detail": "Short-run, digitally printed aluminium cans for craft breweries, RTD brands, and beverage startups. No labels, no sleeves - your brand printed directly on the can.",
    "href": "/products/printed-cans"
  },
  {
    "id": "hotspot-1771336312429",
    "x": 15.5,
    "y": 35.4,
    "title": "Premium Advent Calendars",
    "detail": "Bespoke printed advent calendars for beauty, wellness, and food brands. From structural design to fulfilment-ready delivery - fully managed by Supplied.",
    "href": "/products/advent-calendars"
  },
  {
    "id": "hotspot-1771336356981",
    "x": 45.4,
    "y": 38.9,
    "title": "Printed Shipping Boxes",
    "detail": "Custom branded shipping boxes with flexographic or digital printing. The ecommerce workhorse, now with your brand on the outside.",
    "href": "/products/shipping-boxes"
  },
  {
    "id": "hotspot-1771336469638",
    "x": 14.8,
    "y": 67.7,
    "title": "Custom Printed Paper Mailers",
    "detail": "Sustainable, plastic-free paper mailers with full-colour digital or flexographic printing. The modern replacement for poly mailers.",
    "href": "/products/paper-mailers"
  },
  {
    "id": "hotspot-1771336495581",
    "x": 58.4,
    "y": 54.3,
    "title": "Custom Printed Rigid Boxes",
    "detail": "Luxury rigid boxes designed and manufactured for health, beauty, and wellness brands. Magnetic closures, lift-off lids, and drawer styles - FSC certified and fully customisable from 500 units.",
    "href": "/products/rigid-boxes"
  },
  {
    "id": "hotspot-1771336536838",
    "x": 76.1,
    "y": 79.4,
    "title": "Custom Printed Paper Tape",
    "detail": "Plastic-free, fully recyclable branded tape. Your logo on every parcel - building brand recognition from the doorstep. From 72 rolls.",
    "href": "/products/packing-tape"
  },
  {
    "id": "hotspot-1771336584111",
    "x": 4.1,
    "y": 69.3,
    "title": "Custom Printed Tissue Paper",
    "detail": "Elevate your unboxing with custom printed tissue paper. Your logo, colours, and patterns printed on premium FSC-certified tissue - from 1,000 sheets.",
    "href": "/products/tissue-paper"
  }
];

// Default stats when no specific tile is active
const DEFAULT_STATS = [
  { value: "98%", label: "On-Time Delivery" },
  { value: "23%", label: "Avg Cost Saving" },
  { value: "200+", label: "Projects Managed" },
  { value: "30+", label: "Global Suppliers" },
];

// Sample data for the mosaic
const TILES: TileData[] = [
  {
    id: "tile-1",
    title: "Sustainable Materials",
    imageSrc: "https://images.unsplash.com/photo-1605647540924-852290f6b0d5?auto=format&fit=crop&q=80&w=800",
    defaultClass: "sm:col-span-2 sm:row-span-2",
    statsOverride: [
      { value: "100%", label: "Recyclable" },
      { value: "FSC", label: "Certified" },
      { value: "0%", label: "Plastic" },
      { value: "Eco", label: "Friendly" },
    ],
  },
  {
    id: "tile-2",
    title: "Custom Unboxing",
    imageSrc: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80&w=800",
    defaultClass: "sm:col-span-1 sm:row-span-1",
    statsOverride: [
      { value: "4.8/5", label: "Customer Rating" },
      { value: "+40%", label: "Retention" },
      { value: "Unique", label: "Designs" },
      { value: "Viral", label: "Potential" },
    ],
  },
  {
    id: "tile-3",
    title: "Global Logistics",
    imageSrc: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    defaultClass: "sm:col-span-1 sm:row-span-1",
    statsOverride: [
      { value: "30+", label: "Countries" },
      { value: "5-7d", label: "Global Ship" },
      { value: "99%", label: "Accuracy" },
      { value: "24/7", label: "Tracking" },
    ],
  },
  {
    id: "tile-4",
    title: "Cost Efficiency",
    imageSrc: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800",
    defaultClass: "sm:col-span-1 sm:row-span-1",
    statsOverride: [
      { value: "23%", label: "Avg Saving" },
      { value: "No", label: "Hidden Fees" },
      { value: "Bulk", label: "Discounts" },
      { value: "Smart", label: "Sourcing" },
    ],
  },
  {
    id: "tile-5",
    title: "Rapid Prototyping",
    imageSrc: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    defaultClass: "sm:col-span-1 sm:row-span-1",
    statsOverride: [
      { value: "48h", label: "Samples" },
      { value: "3D", label: "Renders" },
      { value: "Fast", label: "Iterations" },
      { value: "Test", label: "First" },
    ],
  },
  {
    id: "tile-6",
    title: "Brand Growth",
    imageSrc: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    defaultClass: "sm:col-span-2 sm:row-span-1",
    statsOverride: [
      { value: "2x", label: "Growth" },
      { value: "Scale", label: "With You" },
      { value: "ROI", label: "Focused" },
      { value: "Partner", label: "Mindset" },
    ],
  },
];

export function HeroSpread() {
  const [activeTileId, setActiveTileId] = useState<string>(TILES[0].id);

  // Find the active tile to get its stats, or fallback to default
  const activeTile = TILES.find((t) => t.id === activeTileId);
  const currentStats = activeTile ? activeTile.statsOverride : DEFAULT_STATS;

  return (
    <section className="relative min-h-screen pt-[140px] pb-[100px] flex flex-col justify-center overflow-hidden bg-supplied-ink text-white">
      {/* Mesh Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_20%,rgba(232,121,28,0.07)_0%,transparent_60%),radial-gradient(ellipse_40%_60%_at_15%_80%,rgba(232,121,28,0.04)_0%,transparent_50%)] pointer-events-none" />
      
      {/* Grain Background */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`
        }}
      />

      <Container className="relative z-10 flex flex-col gap-24">
        {/* Top Section: Text + Mosaic Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
          {/* Left Column: Text & CTA */}
          <div className="max-w-[560px]">
            <div className="mb-7 opacity-0 animate-slide-up [animation-delay:0.15s]">
              <Tag color="amber" pulse>The end-to-end packaging partner</Tag>
            </div>
            <h1 className="text-[clamp(42px,5.2vw,64px)] font-extrabold leading-[1.05] tracking-[-0.03em] mb-6 opacity-0 animate-slide-up [animation-delay:0.3s]">
              Packaging that <em className="font-fraunces font-normal italic text-supplied-amber-bright">grows</em> your brand, not your headaches
            </h1>
            <p className="text-[17px] text-white/50 leading-[1.7] mb-10 opacity-0 animate-slide-up [animation-delay:0.45s]">
              We partner with fast-growing consumer brands to design, source, and deliver sustainable packaging that drives retention, cuts cost, and scales with you.
            </p>
            <div className="flex flex-wrap gap-3 mb-14 opacity-0 animate-slide-up [animation-delay:0.6s]">
              <Button variant="fill-amber" size="lg" href="https://supplied.agency/contact-us/" target="_blank" icon>
                Start a Project
              </Button>
              <Button variant="outline-light" size="lg" href="https://supplied.agency/client-stories/" target="_blank">
                See Client Stories
              </Button>
            </div>
            <div className="flex items-center gap-4 opacity-0 animate-slide-up [animation-delay:0.75s]">
              <div className="flex">
                <span className="w-9 h-9 rounded-full border-[2.5px] border-supplied-ink flex items-center justify-center text-xs font-bold bg-[#3B82F6] relative z-40">W</span>
                <span className="w-9 h-9 rounded-full border-[2.5px] border-supplied-ink flex items-center justify-center text-xs font-bold bg-[#EC4899] -ml-2 relative z-30">T</span>
                <span className="w-9 h-9 rounded-full border-[2.5px] border-supplied-ink flex items-center justify-center text-xs font-bold bg-[#10B981] -ml-2 relative z-20">H</span>
                <span className="w-9 h-9 rounded-full border-[2.5px] border-supplied-ink flex items-center justify-center text-xs font-bold bg-supplied-amber -ml-2 relative z-10">G</span>
              </div>
              <p className="text-[13px] text-white/35 leading-[1.45]">
                <strong className="text-white/70 font-semibold">Wild, TRIP, Healf, Glaize</strong><br />
                & 50+ fast-growing brands trust Supplied
              </p>
            </div>
          </div>

          {/* Right Column: Mosaic & Stats */}
          <div className="flex flex-col gap-6 opacity-0 animate-fade-scale [animation-delay:0.5s]">
            <MosaicGrid 
              tiles={TILES} 
              activeTileId={activeTileId} 
              onTileActivate={setActiveTileId} 
            />
            <StatCards stats={currentStats} />
          </div>
        </div>

        {/* Bottom Section: Interactive Spread */}
        <div className="relative w-full max-w-[1200px] mx-auto opacity-0 animate-fade-scale [animation-delay:0.7s]">
           {/* Glow Effect */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-supplied-amber/20 blur-[100px] rounded-full animate-pulse pointer-events-none" />
           
           <ImageHotspots 
             src="/SuppliedSpreadTransparent.webp"
             alt="Supplied Packaging Product Spread"
             hotspots={SPREAD_HOTSPOTS}
             width={1200}
             height={900}
             priority
             debug={false}
           />
        </div>
      </Container>
    </section>
  );
}
