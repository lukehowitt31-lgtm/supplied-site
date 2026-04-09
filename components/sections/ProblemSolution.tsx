"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { AccentHeading } from "@/components/ui/AccentHeading";

interface ProblemCardItem {
  title: string;
  desc: string;
}

interface ProblemSolutionContent {
  problem: {
    heading: string;
    intro: string;
    cards: ProblemCardItem[];
  };
  solution: {
    heading: string;
    body: string;
    steps: string[];
    stepDescriptions: string[];
  };
}

interface ProblemSolutionProps {
  content?: ProblemSolutionContent;
}

const fallbackStepDescriptions = [
  "We map your current packaging, suppliers, and costs — then show you exactly where savings and improvements are.",
  "Structural design, material selection, and artwork that makes your unboxing a brand-building moment.",
  "30+ vetted factories across 12 countries, matched to your product, volume, and budget.",
  "Production oversight, compliance certification, freight, and customs — all managed for you.",
  "Quarterly cost reviews, material innovations, and regulatory updates as you grow.",
];

const fallbackContent: ProblemSolutionContent = {
  problem: {
    heading: "Packaging becomes a bottleneck when you're scaling fast",
    intro:
      "You're growing at pace. Packaging seems simple — until it starts costing you time, money, and customers.",
    cards: [
      {
        title: "Too many suppliers",
        desc: "Box factory, printer, insert maker, freight forwarder — four invoices, four timelines, zero accountability.",
      },
      {
        title: "Invisible cost creep",
        desc: "Hidden tooling fees, inconsistent pricing, surprise freight charges. You're spending more but can't see where.",
      },
      {
        title: "Compliance minefield",
        desc: "PPWR, EPR, FSC, recyclability claims — regulations are tightening and your suppliers can't keep up.",
      },
      {
        title: "Generic unboxing",
        desc: "Your product is premium but the packaging doesn't reflect it. Unboxing should drive retention and shares.",
      },
    ],
  },
  solution: {
    heading: "One partnership. Full control. Zero complexity.",
    body: "We become an extension of your team — a single point of contact managing design, sourcing, production, and delivery across every SKU.",
    steps: [
      "Audit & benchmark",
      "Design & engineer",
      "Source & manufacture",
      "QA & deliver",
      "Optimise & scale",
    ],
    stepDescriptions: fallbackStepDescriptions,
  },
};

const showcaseImages = [
  { src: "/images/products/SpacegoodsSpread.jpg", alt: "Custom mailer boxes for Spacegoods — Supplied Agency" },
  { src: "/images/products/SURIMailerBoxes.jpg", alt: "Custom mailer boxes for SURI — Supplied Agency" },
  { src: "/images/products/GlaizeCartonboard.jpg", alt: "Custom cartonboard boxes for Glaize — Supplied Agency" },
  { src: "/images/products/WildBlueMailerClose.jpg", alt: "Custom mailer boxes for Wild — Supplied Agency" },
  { src: "/images/products/WildBeerCan.jpg", alt: "Digitally printed cans for Wild Beer — Supplied Agency" },
  { src: "/images/products/CuriousBrewCan.jpg", alt: "Digitally printed cans for Curious Brew — Supplied Agency" },
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
      {showcaseImages.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: i === activeIndex ? 1 : 0,
            transform: i === activeIndex ? "scale(1)" : "scale(1.06)",
            transition: "opacity 1.4s ease-in-out, transform 6s ease-out",
            maskImage: imageMask,
            WebkitMaskImage: imageMask,
            maskComposite: "intersect",
            WebkitMaskComposite: "destination-in" as string,
          }}
        />
      ))}
    </div>
  );
}

export function ProblemSolution({ content }: ProblemSolutionProps) {
  const sectionContent = content ?? fallbackContent;
  const painCards =
    sectionContent.problem.cards.length > 0
      ? sectionContent.problem.cards
      : fallbackContent.problem.cards;

  const solutionSteps = sectionContent.solution.steps.map((title, index) => ({
    num: String(index + 1),
    title,
    desc:
      sectionContent.solution.stepDescriptions[index] ??
      fallbackStepDescriptions[index] ??
      "Supplied manages this stage end-to-end as part of your packaging partnership.",
  }));

  return (
    <section className="py-[100px] bg-supplied-bg">
      <Container>
        {/* Headline */}
        <Reveal className="text-center max-w-[820px] mx-auto mb-14">
          <Tag color="ink" className="mb-4">Sound familiar?</Tag>
          <AccentHeading
            as="h2"
            text={sectionContent.problem.heading}
            className="text-[clamp(32px,3.8vw,46px)] font-extrabold leading-[1.1] tracking-[-0.025em] mb-4 text-supplied-ink"
            accentClassName="text-supplied-amber"
          />
          <p className="text-base text-supplied-ink-40 leading-[1.7] max-w-[560px] mx-auto">
            {sectionContent.problem.intro}
          </p>
        </Reveal>

        {/* Pain points — 4 equal cards */}
        <Reveal className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {painCards.map((card, index) => (
            <PainCard
              key={`${card.title}-${index}`}
              icon={
                [
                  <SupplierIcon key="supplier" />,
                  <CostIcon key="cost" />,
                  <ComplianceIcon key="compliance" />,
                  <BrandIcon key="brand" />,
                ][index % 4]
              }
              title={card.title}
              desc={card.desc}
            />
          ))}
        </Reveal>

        {/* Solution banner with cycling product images */}
        <Reveal>
          <div className="bg-supplied-ink rounded-[24px] relative overflow-hidden min-h-[540px]">
            {/* Cycling images on the right */}
            <div className="absolute top-0 bottom-0 right-0 left-[32%] hidden lg:block">
              <CyclingShowcase />
            </div>

            {/* Text content on the left */}
            <div className="relative z-10 p-10 sm:p-12 lg:p-14 lg:w-1/2">
              <Tag color="amber" pulse className="mb-5">The Supplied solution</Tag>
              <AccentHeading
                as="h3"
                text={sectionContent.solution.heading}
                className="text-[clamp(24px,2.8vw,34px)] font-extrabold text-white leading-[1.12] tracking-[-0.02em] mb-4"
                accentClassName="text-supplied-amber"
              />
              <p className="text-[15px] text-white/40 leading-[1.7] mb-8">
                {sectionContent.solution.body}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="fill-amber" size="lg" href="/contact-us" icon>
                  Start a Project
                </Button>
                <Button variant="outline-light" size="md" href="/about-us">
                  How We Work
                </Button>
              </div>

              {/* Steps below CTAs */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                {solutionSteps.map((step) => (
                  <div key={step.num} className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-supplied-amber/12 text-supplied-amber-bright flex items-center justify-center text-[12px] font-bold mt-0.5">
                      {step.num}
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold text-white leading-[1.3]">{step.title}</h3>
                      <p className="text-[13px] text-white/40 leading-[1.6] mt-0.5">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function PainCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="group bg-white border border-supplied-ink-10 rounded-2xl p-6 transition-all duration-300 ease-supplied hover:border-supplied-ink-20 hover:-translate-y-1 hover:shadow-supplied-md">
      <div className="w-10 h-10 rounded-xl bg-[#FEE2E2] flex items-center justify-center text-[#EF4444] mb-4">
        {icon}
      </div>
      <h3 className="text-[15px] font-semibold mb-2 text-supplied-ink leading-[1.3]">{title}</h3>
      <p className="text-[13px] text-supplied-ink-40 leading-[1.6]">{desc}</p>
    </div>
  );
}

function SupplierIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function CostIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function ComplianceIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function BrandIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}
