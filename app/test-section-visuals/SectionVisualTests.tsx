"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { AccentHeading } from "@/components/ui/AccentHeading";

const heading =
  "Fragmented suppliers, Hidden costs, Compliance gaps & Forgettable unboxing? [[One partner fixes all four.]]";
const intro =
  "You're growing at pace. Packaging seems simple until it starts costing you time, money, and customers.";

const solutionHeading = "One partnership. Full control. [[Zero complexity.]]";
const solutionBody =
  "We become an extension of your team — a single point of contact managing design, sourcing, production, and delivery across every SKU.";

const painCards = [
  {
    title: "Too many suppliers",
    desc: "Box manufacturers, label suppliers, 3PL partners, insert manufacturer, freight forwarder. Thats FIVE invoices, FIVE timelines, zero accountability.",
  },
  {
    title: "Invisible cost creep",
    desc: "Hidden tooling fees, inconsistent pricing, surprise freight charges. You're spending more but can't see where.",
  },
  {
    title: "Compliance Minefield",
    desc: "PPWR, EPR, FSC, recyclability claims — regulations are tightening and your suppliers can't keep up.",
  },
  {
    title: "Generic Unboxing",
    desc: "Your product is premium but the packaging doesn't reflect it. Unboxing should drive retention and enhance your customer journey.",
  },
];

const steps = [
  { num: "1", title: "Audit & benchmark", desc: "We map your current packaging, suppliers, and costs — then show you exactly where savings and improvements are." },
  { num: "2", title: "Design & engineer", desc: "Structural design, material selection, and artwork that makes your unboxing a brand-building moment." },
  { num: "3", title: "Source & manufacture", desc: "30+ vetted factories across 12 countries, matched to your product, volume, and budget." },
  { num: "4", title: "QA & deliver", desc: "Production oversight, compliance certification, freight, and customs — all managed for you." },
  { num: "5", title: "Optimise & scale", desc: "Quarterly cost reviews, material innovations, and regulatory updates as you grow." },
];

const productImages = [
  "/images/products/SpacegoodsSpread.jpg",
  "/images/products/SURIMailerBoxes.jpg",
  "/images/products/GlaizeCartonboard.jpg",
  "/images/products/WildBlueMailerClose.jpg",
  "/images/products/WildBeerCan.jpg",
  "/images/products/CuriousBrewCan.jpg",
];

/* ── Shared sub-components ────────────────────────────────────────────────── */

function PainCard({ title, desc, icon }: { title: string; desc: string; icon: React.ReactNode }) {
  return (
    <div className="group bg-white border border-supplied-ink-10 rounded-2xl p-6 transition-all duration-300 ease-supplied hover:border-supplied-ink-20 hover:-translate-y-1 hover:shadow-supplied-md">
      <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] flex items-center justify-center text-[#EF4444] mb-4">
        {icon}
      </div>
      <h4 className="text-[15px] font-semibold mb-2 text-supplied-ink leading-[1.3]">{title}</h4>
      <p className="text-[13px] text-supplied-ink-40 leading-[1.6]">{desc}</p>
    </div>
  );
}

function SolutionStep({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="flex gap-3.5 items-start">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-supplied-amber/12 text-supplied-amber-bright flex items-center justify-center text-[13px] font-bold">
        {num}
      </div>
      <div>
        <h4 className="text-[14px] font-semibold mb-0.5 text-white leading-[1.3]">{title}</h4>
        <p className="text-[13px] text-white/40 leading-[1.55]">{desc}</p>
      </div>
    </div>
  );
}

const icons = [
  <svg key="s" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  <svg key="c" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
  <svg key="sh" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="M9 12l2 2 4-4" /></svg>,
  <svg key="b" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>,
];

function ProblemHeadline() {
  return (
    <div className="text-center max-w-[820px] mx-auto mb-14">
      <Tag color="ink" className="mb-4">Sound familiar?</Tag>
      <h2 className="text-[clamp(32px,3.8vw,46px)] font-extrabold leading-[1.1] tracking-[-0.025em] mb-4 text-supplied-ink">
        Fragmented suppliers, Hidden costs, Compliance gaps &amp; Forgettable unboxing?
        <br />
        <em className="font-fraunces italic font-medium text-supplied-amber">
          One partner fixes all four.
        </em>
      </h2>
      <p className="text-base text-supplied-ink-40 leading-[1.7] max-w-[560px] mx-auto">{intro}</p>
    </div>
  );
}

function PainCardGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
      {painCards.map((card, i) => (
        <PainCard key={card.title} icon={icons[i]} title={card.title} desc={card.desc} />
      ))}
    </div>
  );
}

function SolutionLeft() {
  return (
    <div>
      <Tag color="amber" pulse className="mb-5">The Supplied solution</Tag>
      <AccentHeading
        as="h3"
        text={solutionHeading}
        className="text-[clamp(24px,2.8vw,34px)] font-extrabold text-white leading-[1.12] tracking-[-0.02em] mb-4"
        accentClassName="text-supplied-amber"
      />
      <p className="text-[15px] text-white/40 leading-[1.7] mb-8">{solutionBody}</p>
      <div className="flex flex-wrap gap-3">
        <Button variant="fill-amber" size="lg" href="/contact-us" icon>Start a Project</Button>
        <Button variant="outline-light" size="md" href="/about-us">How We Work</Button>
      </div>
    </div>
  );
}

function StepsList() {
  return (
    <div className="flex flex-col gap-5">
      {steps.map((s) => (
        <SolutionStep key={s.num} num={s.num} title={s.title} desc={s.desc} />
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   VARIATION A — Product image mosaic as background within the solution banner
   Subtle, cropped product images behind the dark card content
   ──────────────────────────────────────────────────────────────────────────── */
function VariationA() {
  return (
    <section className="py-[100px] bg-supplied-bg">
      <Container>
        <ProblemHeadline />
        <PainCardGrid />

        <div className="bg-supplied-ink rounded-[24px] p-10 sm:p-12 lg:p-14 relative overflow-hidden">
          {/* Background product mosaic */}
          <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 opacity-[0.07] pointer-events-none">
            {productImages.map((src) => (
              <img key={src} src={src} alt="" className="w-full h-full object-cover" />
            ))}
          </div>
          {/* Gradient overlays to keep text readable */}
          <div className="absolute inset-0 bg-gradient-to-r from-supplied-ink/95 via-supplied-ink/80 to-supplied-ink/95 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_80%_20%,rgba(232,121,28,0.1),transparent_60%)] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-10 lg:gap-12 items-start">
            <SolutionLeft />
            <div className="hidden lg:block w-px bg-white/8 self-stretch" />
            <StepsList />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   VARIATION B — Showcase image column with cycling images
   Product photos fade/scale through on a 5s interval
   ──────────────────────────────────────────────────────────────────────────── */
const showcaseImages = [
  "/images/products/SpacegoodsSpread.jpg",
  "/images/products/SURIMailerBoxes.jpg",
  "/images/products/GlaizeCartonboard.jpg",
  "/images/products/WildBlueMailerClose.jpg",
  "/images/products/WildBeerCan.jpg",
  "/images/products/CuriousBrewCan.jpg",
];

const imageMask = [
  "linear-gradient(to right, transparent 0%, transparent 5%, rgba(0,0,0,0.03) 15%, rgba(0,0,0,0.1) 25%, rgba(0,0,0,0.3) 35%, rgba(0,0,0,0.6) 50%, black 70%)",
  "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, black 20%, black 80%, rgba(0,0,0,0.4) 100%)",
].join(", ");

function CyclingShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % showcaseImages.length);
  }, []);

  useEffect(() => {
    const id = setInterval(advance, 5000);
    return () => clearInterval(id);
  }, [advance]);

  return (
    <div className="absolute inset-0">
      {showcaseImages.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: i === activeIndex ? 1 : 0,
            transform: i === activeIndex ? "scale(1)" : "scale(1.06)",
            transition: "opacity 1.4s ease-in-out, transform 6s ease-out",
            maskImage: imageMask,
            WebkitMaskImage: imageMask,
            maskComposite: "intersect",
            WebkitMaskComposite: "destination-in",
          }}
        />
      ))}
    </div>
  );
}

function VariationB() {
  return (
    <section className="py-[100px] bg-supplied-bg">
      <Container>
        <ProblemHeadline />
        <PainCardGrid />

        <div className="bg-supplied-ink rounded-[24px] relative overflow-hidden min-h-[540px]">
          {/* Image fills the right side, extended left for seamless fade */}
          <div className="absolute top-0 bottom-0 right-0 left-[32%] hidden lg:block">
            <CyclingShowcase />
          </div>

          {/* Text content on the left */}
          <div className="relative z-10 p-10 sm:p-12 lg:p-14 lg:w-1/2">
            <SolutionLeft />
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              {steps.map((s) => (
                <div key={s.num} className="flex gap-2.5 items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-supplied-amber/12 text-supplied-amber-bright flex items-center justify-center text-[11px] font-bold mt-0.5">
                    {s.num}
                  </div>
                  <div>
                    <h4 className="text-[13px] font-semibold text-white leading-[1.3]">{s.title}</h4>
                    <p className="text-[11px] text-white/35 leading-[1.5]">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   VARIATION C — Stacked product thumbnails alongside steps
   Each step gets a small product image to its right
   ──────────────────────────────────────────────────────────────────────────── */
function VariationC() {
  const stepImages = [
    "/images/products/WildBlueMailerClose.jpg",
    "/images/products/SURIMailerBoxes.jpg",
    "/images/products/GlaizeCartonboard.jpg",
    "/images/products/SpacegoodsSpread.jpg",
    "/images/products/CuriousBrewCan.jpg",
  ];

  return (
    <section className="py-[100px] bg-supplied-bg">
      <Container>
        <ProblemHeadline />
        <PainCardGrid />

        <div className="bg-supplied-ink rounded-[24px] p-10 sm:p-12 lg:p-14 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_80%_20%,rgba(232,121,28,0.08),transparent_60%)] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-10 lg:gap-12 items-start">
            <SolutionLeft />
            <div className="hidden lg:block w-px bg-white/8 self-stretch" />

            {/* Steps with thumbnail images */}
            <div className="flex flex-col gap-5">
              {steps.map((s, i) => (
                <div key={s.num} className="flex gap-3.5 items-start">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-supplied-amber/12 text-supplied-amber-bright flex items-center justify-center text-[13px] font-bold">
                    {s.num}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[14px] font-semibold mb-0.5 text-white leading-[1.3]">{s.title}</h4>
                    <p className="text-[13px] text-white/40 leading-[1.55]">{s.desc}</p>
                  </div>
                  <img
                    src={stepImages[i]}
                    alt=""
                    className="hidden sm:block flex-shrink-0 w-16 h-16 rounded-lg object-cover opacity-40 border border-white/10"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   VARIATION D — Full-width solution with floating product gallery below steps
   Solution banner gets a product showcase strip at the bottom
   ──────────────────────────────────────────────────────────────────────────── */
function VariationD() {
  return (
    <section className="py-[100px] bg-supplied-bg">
      <Container>
        <ProblemHeadline />
        <PainCardGrid />

        <div className="bg-supplied-ink rounded-[24px] relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_80%_20%,rgba(232,121,28,0.08),transparent_60%)] pointer-events-none" />

          {/* Top: Original layout */}
          <div className="relative z-10 p-10 sm:p-12 lg:p-14">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-10 lg:gap-12 items-start">
              <SolutionLeft />
              <div className="hidden lg:block w-px bg-white/8 self-stretch" />
              <StepsList />
            </div>
          </div>

          {/* Bottom: Product image strip */}
          <div className="relative z-10 border-t border-white/[0.06]">
            <div className="grid grid-cols-3 sm:grid-cols-6 h-[140px]">
              {productImages.map((src) => (
                <div key={src} className="relative overflow-hidden">
                  <img src={src} alt="" className="w-full h-full object-cover opacity-30 hover:opacity-50 transition-opacity duration-500" />
                </div>
              ))}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-supplied-ink/80 pointer-events-none" />
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────────────
   Main test page
   ──────────────────────────────────────────────────────────────────────────── */
export function SectionVisualTests() {
  return (
    <div className="pt-[140px]">
      {/* Intro */}
      <div className="bg-supplied-ink text-white py-16">
        <Container>
          <h1 className="text-[clamp(28px,3vw,40px)] font-extrabold tracking-[-0.02em] mb-3">
            Solution Banner — Visual Explorations
          </h1>
          <p className="text-white/50 text-lg max-w-[660px]">
            Four approaches to adding product imagery specifically to the dark &ldquo;Supplied Solution&rdquo; banner. The problem section stays intentionally plain.
          </p>
        </Container>
      </div>

      {/* Variation A */}
      <VariationLabel
        id="A"
        title="Product mosaic as banner background"
        desc="A 3×2 grid of product photos fills the dark banner background at very low opacity. Gradient overlays keep text sharp. Adds visual richness without changing layout."
      />
      <VariationA />

      {/* Variation B */}
      <VariationLabel
        id="B"
        title="Showcase image takes the right half"
        desc="One hero product photo fills the right side of the banner, fading into the dark background. Steps move into a compact 2-column grid below the CTAs. Bold and visual."
      />
      <VariationB />

      {/* Variation C */}
      <VariationLabel
        id="C"
        title="Step thumbnails alongside each process step"
        desc="Each of the 5 steps gets a small product thumbnail on its right. Subtle (40% opacity, bordered) — adds texture to the steps without overwhelming."
      />
      <VariationC />

      {/* Variation D */}
      <VariationLabel
        id="D"
        title="Product image strip at bottom of banner"
        desc="The original layout stays intact. A strip of 6 product images runs along the bottom of the banner, separated by a faint border. Hover raises opacity."
      />
      <VariationD />

      <div className="h-20 bg-supplied-bg" />
    </div>
  );
}

function VariationLabel({ id, title, desc }: { id: string; title: string; desc: string }) {
  return (
    <div className="border-t-4 border-supplied-amber">
      <Container className="py-8">
        <span className="inline-block bg-supplied-amber text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-2">
          Variation {id}
        </span>
        <h2 className="text-xl font-bold text-supplied-ink">{title}</h2>
        <p className="text-supplied-ink-40 text-sm mt-1">{desc}</p>
      </Container>
    </div>
  );
}
