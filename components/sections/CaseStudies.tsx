"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

// ══════════════════════════════════════
// CLIENT DATA
// ══════════════════════════════════════
const clients = [
  {
    name: "Healf",
    slug: "healf",
    industry: "Health & Wellness",
    products: ["Shipper Boxes", "Advent Calendar", "Device Packaging"],
    quote: "From ideation to execution, the attention to detail and care shown by Supplied is second to none. They delivered a high-quality product with an incredibly fast turnaround.",
    person: "Oscar, Head of Brand",
    stat1: { value: "434%", label: "Growth year" },
    stat2: { value: "30%+", label: "Cost saving" },
    challenge: "Packaging hadn't kept pace with rapid growth — reactive sourcing, lead time volatility, and brand misalignment were blocking scale.",
    result: "Packaging became structured infrastructure supporting 434% growth without bottlenecks.",
    image: "/images/client-stories/healf-hero.png",
    logo: "/images/logos/healf.svg",
  },
  {
    name: "Spacegoods",
    slug: "spacegoods",
    industry: "Supplements & D2C",
    products: ["Mailer Boxes", "Starter Kits", "Retail Cartons"],
    quote: "What started as a single mailer box project evolved into a full packaging partnership — Supplied now manages every SKU we ship.",
    person: "Spacegoods Team",
    stat1: { value: "+122%", label: "Search growth" },
    stat2: { value: "~30%", label: "Cost optimisation" },
    challenge: "Functional but inefficient mailer boxes that didn't reflect the brand's bold visual identity or support retail ambitions.",
    result: "A structured packaging system powering D2C scale and a successful Tesco retail launch.",
    image: "/images/client-stories/spacegoods-hero.webp",
    logo: "/images/logos/spacegoods.svg",
  },
  {
    name: "Glaize × Aston Martin",
    slug: "glaize-x-aston-martin",
    industry: "Limited Edition Collab",
    products: ["Litho Mailer Boxes"],
    quote: "We work with many suppliers, but very few are as helpful, supportive and flexible as Supplied. They always find a solution for anything you throw at them.",
    person: "Brand Team",
    stat1: { value: "200", label: "Limited edition units" },
    stat2: { value: "3.5 wk", label: "End-to-end" },
    challenge: "A last-minute collaboration with an immovable British Grand Prix deadline, requiring precise physical colour matching to Aston Martin Green.",
    result: "200 premium litho mailers delivered in 3.5 weeks with zero delays and exact colour match.",
    image: "/images/client-stories/glaize-hero.jpg",
    logo: "/images/logos/glaize.svg",
  },
];

// ══════════════════════════════════════
// HELPER COMPONENTS
// ══════════════════════════════════════
function ProductImage({ src, alt, overlayOpacity = 0.25 }: { src: string | null, alt: string, overlayOpacity?: number }) {
  if (src) {
    return (
      <div className="relative overflow-hidden w-full h-full min-h-[480px]">
        <Image src={src} alt={alt} fill className="object-cover" />
        <div 
          className="absolute inset-0" 
          style={{ background: `linear-gradient(135deg, rgba(26,26,26,${overlayOpacity + 0.2}) 0%, rgba(26,26,26,${overlayOpacity * 0.3}) 100%)` }}
        />
      </div>
    );
  }
  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center w-full h-full min-h-[480px] bg-[#2A2A2A]">
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.5)_1px,transparent_0)] bg-[length:24px_24px]" />
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round">
        <rect x="6" y="10" width="36" height="28" rx="3"/><circle cx="18" cy="22" r="4"/><path d="M6 34l10-8 8 6 8-10 10 8"/>
      </svg>
      <span className="mt-2 text-xs text-white/20 relative">Product image</span>
    </div>
  );
}

function ClientLogo({ logo, name, size = "large" }: { logo: string, name: string, size?: "large" | "small" }) {
  const isLarge = size === "large";
  return (
    <img 
      src={logo} 
      alt={name} 
      className={`block object-contain ${isLarge ? 'h-9 max-w-[200px]' : 'h-6 max-w-[140px]'}`}
    />
  );
}

// ══════════════════════════════════════
// MAIN COMPONENT
// ══════════════════════════════════════
export function CaseStudies() {
  const [active, setActive] = useState(0);
  const c = clients[active];

  return (
    <section className="bg-supplied-ink relative overflow-hidden py-20">
      <Container className="relative z-10">

        {/* Header */}
        <div className="flex flex-wrap items-end justify-between mb-12 gap-5">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-supplied-amber mb-4">
              <span className="w-1.5 h-1.5 bg-supplied-amber rounded-full"/>
              Client Stories
            </div>
            <h2 className="text-[clamp(32px,4vw,48px)] font-bold text-white tracking-[-0.02em] leading-[1.15]">
              Real brands, <em className="font-fraunces text-supplied-amber italic font-normal">real impact</em>
            </h2>
          </Reveal>
          <div className="flex gap-1.5">
            {clients.map((cl, i) => (
              <button 
                key={i} 
                onClick={() => setActive(i)} 
                className={`h-3 rounded-full transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${i === active ? 'w-12 bg-supplied-amber' : 'w-3 bg-white/15 hover:bg-white/30'}`}
                aria-label={`View ${cl.name} story`}
              />
            ))}
          </div>
        </div>

        {/* Content panels */}
        <div key={c.name} className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr_0.9fr] gap-1 rounded-2xl overflow-hidden animate-slide-in">
          {/* Image panel */}
          <div className="relative min-h-[300px] lg:min-h-[480px]">
            <ProductImage src={c.image} alt={`${c.name} packaging`} overlayOpacity={0.15}/>
            <div className="absolute top-0 left-0 right-0 p-7 pb-12 bg-gradient-to-b from-supplied-ink/70 to-transparent">
              <img 
                src={c.logo} 
                alt={c.name} 
                className="block object-contain h-9 max-w-[200px] brightness-0 invert"
              />
            </div>
            <div className="absolute bottom-5 left-7 px-3.5 py-1.5 rounded-full text-[11px] font-medium text-white/70 bg-black/40 backdrop-blur-md">
              {c.industry}
            </div>
          </div>

          {/* Quote panel */}
          <div className="bg-white/[0.03] p-9 lg:p-11 flex flex-col justify-center">
            <div className="font-fraunces text-[56px] text-supplied-amber leading-[0.8] mb-4 opacity-30">"</div>
            <div className="font-fraunces text-[22px] italic text-white leading-[1.55] tracking-[-0.01em] mb-5">
              {c.quote}
            </div>
            <div className="text-[13px] text-supplied-ink-40">— {c.person}, {c.name}</div>
            <div className="mt-9 flex gap-2 flex-wrap">
              {c.products.map(p => (
                <span key={p} className="px-3.5 py-1.5 rounded-full text-[11px] font-medium text-supplied-amber bg-[#E8791C14] border border-[#E8791C1F]">
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* Data panel */}
          <div className="bg-white/[0.02] p-8 lg:p-11 flex flex-col justify-center gap-4">
            <div className="p-6 rounded-xl bg-[#E854540A] border border-[#E8545414]">
              <div className="text-[10px] font-semibold tracking-[0.1em] text-[#E85454] mb-1.5">THE CHALLENGE</div>
              <p className="text-sm text-white/55 leading-[1.5]">{c.challenge}</p>
            </div>
            <div className="p-6 rounded-xl bg-[#4CAF7D0A] border border-[#4CAF7D14]">
              <div className="text-[10px] font-semibold tracking-[0.1em] text-[#4CAF7D] mb-1.5">THE RESULT</div>
              <p className="text-[15px] text-white leading-[1.5] font-medium">{c.result}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-2">
              {[c.stat1, c.stat2].map((s, j) => (
                <div key={j} className="bg-white/[0.03] rounded-[10px] p-4 lg:p-5 border border-white/[0.04]">
                  <div className="font-fraunces text-[34px] font-medium text-supplied-amber leading-none">{s.value}</div>
                  <div className="text-[11px] text-supplied-ink-40 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Brand selector */}
        <div className="flex items-center justify-center gap-2 mt-9 flex-wrap">
          <span className="text-[11px] text-supplied-ink-40 font-medium mr-2">Select a brand:</span>
          {clients.map((cl, i) => (
            <button 
              key={i} 
              onClick={() => setActive(i)} 
              className={`px-6 py-2.5 border rounded-lg flex items-center justify-center transition-all duration-300 ${i === active ? 'bg-supplied-amber border-transparent' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
            >
              <img 
                src={cl.logo} 
                alt={cl.name} 
                className={`h-[18px] object-contain transition-all duration-300 ${i === active ? 'opacity-100 brightness-0 invert' : 'opacity-35 brightness-0 invert'}`}
              />
            </button>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link 
            href="/client-stories" 
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-supplied-amber text-white rounded-lg text-sm font-semibold hover:bg-supplied-amber-deep transition-colors"
          >
            See All Client Stories <span>→</span>
          </Link>
        </div>
      </Container>
    </section>
  );
}
