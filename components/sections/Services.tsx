import React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DottedWorldMap } from "@/components/ui/DottedWorldMap";
import { AccentHeading } from "@/components/ui/AccentHeading";
import { loadMapDotsHtml, HOMEPAGE_PINS } from "@/lib/mapData";

interface ServicesContent {
  heading: string;
  body: string;
  heroTitle: string;
  heroBody: string;
  heroChips: string[];
  cards: Array<{
    title: string;
    desc: string;
    chips: string[];
  }>;
  stats: Array<{
    value: string;
    label: string;
  }>;
}

interface ServicesProps {
  content?: ServicesContent;
}

const fallbackContent: ServicesContent = {
  heading: "End-to-end packaging, handled",
  body: "From structural design to doorstep delivery — one accountable partnership across your entire packaging portfolio.",
  heroTitle: "Manufacturing & Global Sourcing",
  heroBody:
    "Access our network of 30+ vetted suppliers across 12 countries. We match every product to the ideal manufacturing partner — balancing quality, cost, lead time, and sustainability credentials so you don't have to.",
  heroChips: [
    "Corrugated",
    "Rigid",
    "Flexible",
    "Speciality",
    "Printed Cans",
    "Low MOQs",
  ],
  cards: [
    {
      title: "Packaging Strategy",
      desc: "Cost-reduction audits, material innovation workshops, and portfolio reviews to keep you ahead.",
      chips: ["Cost audits", "Innovation", "PPWR readiness"],
    },
    {
      title: "Structural & Technical Design",
      desc: "Custom dieline engineering, 3D mockups, and structural solutions that protect your product and elevate unboxing.",
      chips: ["Dieline engineering", "3D renders", "Prototyping"],
    },
    {
      title: "Artwork & Pre-Press",
      desc: "Print-ready artwork preparation, colour management, and pre-press quality checks. We catch issues before they cost you.",
      chips: ["Print-ready files", "Colour matching", "Proofing"],
    },
    {
      title: "QA & Compliance",
      desc: "Factory audits, sample approvals, and PPWR/FSC sustainability compliance built into every project.",
      chips: ["Factory audits", "PPWR", "FSC"],
    },
      {
        title: "Logistics & Freight",
        desc: "End-to-end freight management, customs clearance, and warehousing coordination from factory to fulfilment.",
        chips: ["Freight", "Customs", "Warehousing"],
      },
    ],
    stats: [
      { value: "30+", label: "Global Suppliers" },
      { value: "12", label: "Countries" },
      { value: "98%", label: "On-Time Delivery" },
      { value: "23%", label: "Avg Cost Saving" },
    ],
  };

export function Services({ content }: ServicesProps) {
  const sectionContent = content ?? fallbackContent;
  const { dotsHtml, viewBox } = loadMapDotsHtml();
  const pins = HOMEPAGE_PINS.map(({ cx, cy, label }) => ({ cx, cy, label }));
  const serviceCards =
    sectionContent.cards.length > 0 ? sectionContent.cards : fallbackContent.cards;
  const heroChips =
    sectionContent.heroChips.length > 0
      ? sectionContent.heroChips
      : fallbackContent.heroChips;

  const serviceCardVisuals = [
    {
      delay: 50,
      image: "/images/services/packaging-strategy.jpg",
      imagePosition: "object-[center_30%]",
      icon: <Icons.Strategy />,
    },
    {
      delay: 100,
      image: "/images/services/structural-technical-design.png",
      icon: <Icons.Design />,
    },
    {
      delay: 150,
      image: "/images/services/artwork-pre-press.png",
      icon: <Icons.Artwork />,
    },
    {
      delay: 200,
      image: "/images/services/qa-compliance.jpg",
      imagePosition: "object-[center_30%]",
      icon: <Icons.QA />,
    },
    {
      delay: 250,
      image: "/images/services/logistics-freight.jpg",
      imagePosition: "object-[center_30%]",
      icon: <Icons.Logistics />,
    },
  ];

  return (
    <section className="py-[100px] pb-[120px] bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-supplied-ink-10 to-transparent" />

      <Container>
        {/* Section Header */}
        <div className="text-center mb-20">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase text-supplied-amber mb-5">
              <span className="w-1.5 h-1.5 bg-supplied-amber rounded-full" />
              What we do
            </div>
            <AccentHeading
              as="h2"
              text={sectionContent.heading}
              className="text-[clamp(34px,4.2vw,52px)] font-extrabold leading-[1.08] tracking-[-0.03em] mb-[18px] text-supplied-ink"
              accentClassName="text-supplied-amber"
            />
            <p className="text-[17px] text-supplied-ink-40 leading-[1.6] max-w-[560px] mx-auto">
              {sectionContent.body}
            </p>
          </Reveal>
        </div>

        {/* Hero Service: Manufacturing */}
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 bg-supplied-ink rounded-[20px] overflow-hidden mb-5 min-h-[380px]">
            <div className="p-9 lg:p-12 flex flex-col justify-center text-white">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.15em] uppercase text-supplied-amber mb-4">
                <Icons.CoreService className="w-[18px] h-[18px]" />
                Core Service
              </div>
              <AccentHeading
                as="h3"
                text={sectionContent.heroTitle}
                className="text-[clamp(26px,3vw,36px)] font-extrabold text-white leading-[1.15] tracking-[-0.02em] mb-4"
                accentClassName="text-supplied-amber"
              />
              <p className="text-[15px] text-white/60 leading-[1.7] mb-6 max-w-[420px]">
                {sectionContent.heroBody}
              </p>
              <div className="flex flex-wrap gap-2">
                {heroChips.map((chip) => (
                  <span key={chip} className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70 bg-white/[0.07] border border-white/10 px-3.5 py-1.5 rounded-full transition-all duration-300 hover:bg-supplied-amber/15 hover:border-supplied-amber/30 hover:text-supplied-amber cursor-default">
                    {chip}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative overflow-hidden min-h-[300px] lg:min-h-auto bg-gradient-to-br from-[#2A2520] to-[#1A1714] flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <DottedWorldMap
                  dotsHtml={dotsHtml}
                  pins={pins}
                  viewBox={viewBox}
                  className="w-[130%] h-[130%]"
                />
              </div>
            </div>
          </div>
        </Reveal>

        {/* Flow Connector */}
        <Reveal delay={100}>
          <div className="flex items-center justify-center gap-3 py-2.5 mb-5">
            <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent via-supplied-ink-10 to-transparent" />
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-supplied-ink-40 whitespace-nowrap">
              Design → Source → Produce → Deliver
            </span>
            <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent via-supplied-ink-10 to-transparent" />
          </div>
        </Reveal>

        {/* Service Cards — product card style: image top, ink bar below */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-5">
          {serviceCardVisuals.map((visual, index) => {
            const fallbackCard = fallbackContent.cards[index];
            const card = serviceCards[index] ?? fallbackCard;

            return (
              <ServiceCard
                key={`${card.title}-${index}`}
                delay={visual.delay}
                image={visual.image}
                imagePosition={visual.imagePosition}
                icon={visual.icon}
                title={card.title}
                desc={card.desc}
                chips={card.chips.length > 0 ? card.chips : fallbackCard.chips}
              />
            );
          })}
        </div>

        {/* Stat Strip */}
        <Reveal delay={200}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-supplied-ink rounded-2xl overflow-hidden mt-12 border border-supplied-ink">
            {(sectionContent.stats.length > 0 ? sectionContent.stats : fallbackContent.stats).map((stat) => (
              <StatItem key={stat.label} value={stat.value} label={stat.label} />
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function ServiceCard({ delay, image, imagePosition, icon, title, desc, chips }: {
  delay: number;
  image: string;
  imagePosition?: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  chips: string[];
}) {
  return (
    <Reveal delay={delay}>
      <div className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#F5F3F0] h-full">
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={image}
            alt={title}
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] ${imagePosition || ''}`}
          />
        </div>

        <div className="bg-supplied-ink p-5 sm:p-6 flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-supplied-amber/12 flex items-center justify-center text-supplied-amber shrink-0">
                {React.cloneElement(icon as React.ReactElement<any>, { className: "w-[18px] h-[18px]" })}
              </div>
              <h3 className="text-[16px] font-bold text-white leading-[1.2] tracking-[-0.01em]">
                {title}
              </h3>
            </div>
            <p className="text-[13px] text-white/40 leading-[1.6] mb-4">
              {desc}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-3.5 border-t border-white/8">
            {chips.map((chip) => (
              <span
                key={chip}
                className="text-[10px] font-medium text-white/50 bg-white/[0.06] border border-white/8 px-2.5 py-1 rounded-full transition-colors duration-300 group-hover:border-supplied-amber/20 group-hover:text-supplied-amber/70"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-8 lg:px-6 lg:py-8 text-center bg-supplied-ink transition-colors duration-300 hover:bg-[#222]">
      <div className="text-[clamp(28px,3vw,38px)] font-bold text-supplied-amber tracking-[-0.02em] leading-none mb-1.5">
        {value}
      </div>
      <div className="text-xs text-white/45 tracking-[0.05em] leading-[1.4]">
        {label}
      </div>
    </div>
  );
}

const Icons = {
  CoreService: (props: any) => (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="9" cy="9" r="7"/>
      <path d="M9 5v4l3 2"/>
    </svg>
  ),
  Design: (props: any) => (
    <svg viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 4l4 4-12 12H6v-4L18 4z"/>
      <path d="M15 7l4 4" opacity="0.4"/>
      <path d="M6 22h14" opacity="0.3"/>
    </svg>
  ),
  Artwork: (props: any) => (
    <svg viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="13" cy="13" r="10"/>
      <circle cx="10" cy="9" r="2" fill="currentColor" fillOpacity="0.3" stroke="none"/>
      <circle cx="16" cy="9" r="1.5" fill="currentColor" fillOpacity="0.3" stroke="none"/>
      <circle cx="9" cy="14" r="1.5" fill="currentColor" fillOpacity="0.3" stroke="none"/>
      <circle cx="15" cy="15" r="1.8" fill="currentColor" fillOpacity="0.3" stroke="none"/>
    </svg>
  ),
  QA: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4z"/>
      <path d="M9 12l2 2 4-4" strokeWidth="1.8"/>
    </svg>
  ),
  Logistics: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 18l2 2h14l2-2"/>
      <path d="M4 18v-6h5v6"/>
      <path d="M9 12h8l3 6"/>
      <path d="M9 12l1-5h5l1 5"/>
    </svg>
  ),
  Strategy: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 18h6"/>
      <path d="M10 21h4"/>
      <path d="M12 3C8 3 5 6 5 9.5c0 2.5 1.5 4 3 5.5.5.5 1 1.5 1 3h6c0-1.5.5-2.5 1-3 1.5-1.5 3-3 3-5.5C19 6 16 3 12 3z"/>
    </svg>
  )
};
