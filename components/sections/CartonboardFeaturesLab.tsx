"use client";

import { useState } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { AccentHeading } from "@/components/ui/AccentHeading";

type FeatureCard = {
  title: string;
  body: string;
  image?: string;
};

const demoFeatures: FeatureCard[] = [
  {
    title: "Peel & Seal Closure",
    body: "Adhesive strip eliminates additional tape — cleaner pack lines, faster fulfilment.",
    image: "/images/product-info/Adhesive-Icon.svg",
  },
  {
    title: "Tear Strip Opening",
    body: "Precision-cut tear strip for a clean, satisfying unboxing with zero tools required.",
    image: "/images/product-info/Tear-Strip_1.svg",
  },
  {
    title: "Crashlock Base",
    body: "Pre-glued base snaps into shape instantly — cuts assembly time by up to 60%.",
    image: "/images/product-info/Crashlock.svg",
  },
  {
    title: "Spot Gloss UV",
    body: "Selective high-shine varnish to emphasise logos and key design elements.",
    image: "/images/product-info/SuppliedSpotGloss.jpg",
  },
  {
    title: "Hot Foil Stamping",
    body: "Metallic gold, silver, or custom colour foil for premium shelf impact.",
    image: "/images/product-info/SuppliedFoiling.jpg",
  },
  {
    title: "Emboss & Deboss",
    body: "Raised or recessed textures — customers feel the quality before they open.",
    image: "/images/product-info/SuppliedEmbossed.jpg",
  },
];

const fallbackFeatures: FeatureCard[] = [
  { title: "Luxury Unboxing", body: "Magnetic closures and premium reveals that turn delivery into an experience." },
  { title: "Sustainable Materials", body: "FSC-certified board, water-based inks, and plastic-free lamination as standard." },
  { title: "Transparent Pricing", body: "Line-by-line cost breakdowns — no hidden fees, no surprises." },
  { title: "Global Manufacturing", body: "UK, European, and Asian production partners for the best balance of cost and quality." },
];

type Layout = "image-left" | "image-right";

function isSvg(src: string) {
  return src.toLowerCase().endsWith(".svg");
}

function HorizontalCard({
  feature,
  layout,
}: {
  feature: FeatureCard;
  layout: Layout;
}) {
  const hasImage = !!feature.image;
  const svg = hasImage && isSvg(feature.image!);
  const imgFirst = layout === "image-left";

  const imageBlock = hasImage ? (
    svg ? (
      <div className="relative w-full h-full min-h-[120px] bg-[#E8792A] overflow-hidden">
        <Image
          src={feature.image!}
          alt={feature.title}
          fill
          className="object-cover scale-[1.35]"
        />
      </div>
    ) : (
      <div className="relative w-full h-full min-h-[120px]">
        <Image
          src={feature.image!}
          alt={feature.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
    )
  ) : (
    <div className="relative w-full h-full min-h-[120px] bg-gradient-to-br from-supplied-amber/[0.08] to-supplied-amber/[0.02] flex items-center justify-center">
      <div className="w-10 h-10 rounded-xl bg-supplied-amber/10 flex items-center justify-center text-lg text-supplied-amber">
        ✦
      </div>
    </div>
  );

  return (
    <div className="bg-supplied-bg border border-supplied-ink/[0.05] rounded-2xl overflow-hidden transition-all duration-300 ease-supplied relative group hover:-translate-y-0.5 hover:shadow-lg hover:border-supplied-amber/10">
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-supplied-amber transform scale-x-0 origin-left transition-transform duration-500 ease-supplied group-hover:scale-x-100 z-10" />

      {/* Mobile: stack vertically. Desktop: side-by-side */}
      <div className={`flex flex-col sm:flex-row ${!imgFirst ? "sm:flex-row-reverse" : ""}`}>
        {/* Image column */}
        <div className="sm:w-[120px] lg:w-[130px] flex-shrink-0 overflow-hidden">
          {imageBlock}
        </div>

        {/* Text column */}
        <div className="flex-1 p-5 flex flex-col justify-center">
          <h3 className="text-[14.5px] font-semibold text-supplied-ink leading-tight mb-1">
            {feature.title}
          </h3>
          <p className="text-[13px] text-supplied-ink/40 leading-[1.6]">
            {feature.body}
          </p>
        </div>
      </div>
    </div>
  );
}

export function CartonboardFeaturesLab() {
  const [layout, setLayout] = useState<Layout>("image-left");

  return (
    <div className="min-h-screen bg-white pt-28 md:pt-32 pb-20">
      <Container>
        {/* Header */}
        <Reveal className="text-center max-w-[620px] mx-auto mb-6">
          <Tag color="amber">Features</Tag>
          <AccentHeading
            as="h2"
            text="Everything you need, [[nothing you don't]]"
            className="text-[clamp(28px,3.2vw,40px)] font-extrabold leading-[1.1] tracking-[-0.02em] mt-3.5 mb-3.5 text-supplied-ink"
            accentClassName="text-supplied-amber"
          />
        </Reveal>

        {/* Layout toggle */}
        <div className="flex justify-center gap-2 mb-10">
          {(["image-left", "image-right"] as const).map((opt) => (
            <button
              key={opt}
              onClick={() => setLayout(opt)}
              className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 ${
                layout === opt
                  ? "bg-supplied-ink text-white"
                  : "bg-supplied-bg text-supplied-ink/50 hover:text-supplied-ink"
              }`}
            >
              {opt === "image-left" ? "Image Left" : "Image Right"}
            </button>
          ))}
        </div>

        {/* Feature grid — 3 col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {demoFeatures.map((feature, i) => (
            <Reveal key={i}>
              <HorizontalCard feature={feature} layout={layout} />
            </Reveal>
          ))}
        </div>

        {/* Separator */}
        <div className="border-t border-supplied-ink/[0.06] my-16" />

        {/* Fallback without images */}
        <Reveal className="text-center max-w-[620px] mx-auto mb-10">
          <Tag color="amber">Fallback</Tag>
          <AccentHeading
            as="h2"
            text="Cards without [[images]]"
            className="text-[clamp(24px,2.8vw,32px)] font-extrabold leading-[1.1] tracking-[-0.02em] mt-3.5 mb-3.5 text-supplied-ink"
            accentClassName="text-supplied-amber"
          />
          <p className="text-[15px] text-supplied-ink/40 leading-[1.7]">
            Products without feature images fall back to a subtle pattern.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {fallbackFeatures.map((feature, i) => (
            <Reveal key={i}>
              <HorizontalCard feature={feature} layout={layout} />
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
