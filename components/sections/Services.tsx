import React from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { DottedWorldMap } from "@/components/ui/DottedWorldMap";
import { loadMapDotsHtml, HOMEPAGE_PINS } from "@/lib/mapData";

export function Services() {
  const { dotsHtml, viewBox } = loadMapDotsHtml();
  const pins = HOMEPAGE_PINS.map(({ cx, cy, label }) => ({ cx, cy, label }));

  return (
    <section className="py-[100px] pb-[120px] bg-white relative">
      {/* Top Border Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-supplied-ink-10 to-transparent" />

      <Container>
        {/* Section Header */}
        <div className="text-center mb-20">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase text-supplied-amber mb-5">
              <span className="w-1.5 h-1.5 bg-supplied-amber rounded-full" />
              What we do
            </div>
            <h2 className="text-[clamp(34px,4.2vw,52px)] font-bold leading-[1.08] tracking-[-0.03em] mb-[18px] text-supplied-ink">
              End-to-end packaging, <em className="font-fraunces font-normal italic">handled</em>
            </h2>
            <p className="text-[17px] text-supplied-ink-40 leading-[1.6] max-w-[560px] mx-auto">
              From structural design to doorstep delivery — one accountable partnership across your entire packaging portfolio.
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
              <h3 className="text-[clamp(26px,3vw,36px)] font-bold leading-[1.15] tracking-[-0.02em] mb-4">
                Manufacturing <span className="font-fraunces italic text-supplied-amber" style={{ fontWeight: 400, fontVariationSettings: '"ital" 1' }}>&</span> Global Sourcing
              </h3>
              <p className="text-[15px] text-white/60 leading-[1.7] mb-6 max-w-[420px]">
                Access our network of 30+ vetted suppliers across 12 countries. We match every product to the ideal manufacturing partner — balancing quality, cost, lead time, and sustainability credentials so you don't have to.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Corrugated', 'Rigid', 'Flexible', 'Speciality', 'Printed Cans', 'Low MOQs'].map((chip) => (
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

        {/* Duo Cards: Design & Artwork */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
          <ServiceCard
            delay={50}
            category="design"
            number="01"
            icon={<Icons.Design />}
            title="Structural & Technical Design"
            desc="Custom dieline engineering, 3D mockups, and structural solutions that protect your product and elevate the unboxing experience. We design for manufacturing efficiency — not just aesthetics."
            chips={['Dieline engineering', '3D renders', 'Prototyping', 'Material selection']}
            color="#C8773E"
            lightColor="#F5EDE4"
          />
          <ServiceCard
            delay={120}
            category="artwork"
            number="02"
            icon={<Icons.Artwork />}
            title="Artwork & Pre-Press"
            desc="Print-ready artwork preparation, colour management, and pre-press quality checks so your packaging looks exactly as intended — from screen to production floor. We catch the issues before they cost you money."
            chips={['Print-ready files', 'Colour matching', 'Pre-flight checks', 'Proofing']}
            color="#5B7FA5"
            lightColor="#E4ECF5"
          />
        </div>

        {/* Trio Cards: QA, Logistics, Strategy */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          <ServiceCardSmall
            delay={50}
            category="qa"
            number="03"
            icon={<Icons.QA />}
            title="QA & Compliance"
            desc="Factory audits, sample approvals, and PPWR/FSC sustainability compliance built into every project. We don't ship until it's right."
            color="#3A6B4A"
            lightColor="#E8F0EA"
          />
          <ServiceCardSmall
            delay={120}
            category="logistics"
            number="04"
            icon={<Icons.Logistics />}
            title="Logistics & Freight"
            desc="End-to-end freight management, customs clearance, and warehousing coordination — from factory floor to your fulfilment centre. No surprises."
            color="#6B8A8A"
            lightColor="#E6EFEF"
          />
          <ServiceCardSmall
            delay={190}
            category="strategy"
            number="05"
            icon={<Icons.Strategy />}
            title="Packaging Strategy"
            desc="Cost-reduction audits, material innovation workshops, and portfolio reviews to keep you ahead of regulations and your competitors."
            color="#7B6B99"
            lightColor="#EDE8F4"
          />
        </div>

        {/* Stat Strip */}
        <Reveal delay={200}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-supplied-ink rounded-2xl overflow-hidden mt-12 border border-supplied-ink">
            <StatItem value="30+" label="Global Suppliers" />
            <StatItem value="12" label="Countries" />
            <StatItem value="98%" label="On-Time Delivery" />
            <StatItem value="23%" label="Avg Cost Saving" />
          </div>
        </Reveal>

      </Container>
    </section>
  );
}

// ─── Sub-components ───

function ServiceCard({ category, number, icon, title, desc, chips, color, lightColor, delay }: any) {
  return (
    <Reveal delay={delay}>
      <div 
        className="group relative p-9 lg:p-11 bg-supplied-ink-05 border border-supplied-ink-10 rounded-[18px] overflow-hidden transition-all duration-400 ease-supplied hover:bg-white hover:border-supplied-ink-20 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)]"
        style={{ '--card-color': color, '--card-light': lightColor } as React.CSSProperties}
      >
        <div className="absolute top-0 left-0 w-1 h-0 bg-[var(--card-color)] rounded-br transition-all duration-500 ease-supplied group-hover:h-full" />
        
        <div className="flex items-start justify-between mb-5">
          <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center bg-[var(--card-light)] text-[var(--card-color)]">
            {React.cloneElement(icon, { className: "w-[26px] h-[26px]" })}
          </div>
          <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-supplied-ink-40 pt-1">
            Service {number}
          </span>
        </div>
        
        <h3 className="text-xl font-bold tracking-[-0.015em] leading-[1.25] mb-2.5 text-supplied-ink">
          {title}
        </h3>
        <p className="text-sm text-supplied-ink-40 leading-[1.7] mb-5">
          {desc}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {chips.map((chip: string) => (
            <span key={chip} className="text-[11px] px-3 py-1.5 rounded-full bg-white border border-supplied-ink-10 text-supplied-ink-60 transition-colors duration-300 group-hover:bg-[var(--card-light)] group-hover:border-[var(--card-color)]/20 group-hover:text-[var(--card-color)]">
              {chip}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

function ServiceCardSmall({ category, number, icon, title, desc, color, lightColor, delay }: any) {
  return (
    <Reveal delay={delay}>
      <div 
        className="group relative p-7 lg:p-9 bg-supplied-ink-05 border border-supplied-ink-10 rounded-2xl overflow-hidden transition-all duration-400 ease-supplied hover:bg-white hover:border-supplied-ink-20 hover:-translate-y-1 hover:shadow-[0_10px_32px_rgba(0,0,0,0.05)] h-full"
        style={{ '--card-color': color, '--card-light': lightColor } as React.CSSProperties}
      >
        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--card-color)] transform scale-x-0 origin-left transition-transform duration-400 ease-supplied group-hover:scale-x-100" />
        
        <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[var(--card-light)] text-[var(--card-color)] mb-4.5">
          {React.cloneElement(icon, { className: "w-6 h-6" })}
        </div>
        
        <span className="block text-[10px] font-semibold tracking-[0.12em] uppercase text-supplied-ink-40 mb-3">
          Service {number}
        </span>
        
        <h3 className="text-[17px] font-bold tracking-[-0.01em] leading-[1.25] mb-2 text-supplied-ink">
          {title}
        </h3>
        <p className="text-[13px] text-supplied-ink-40 leading-[1.65]">
          {desc}
        </p>
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

// ─── Icons ───

const Icons = {
  CoreService: (props: any) => (
    <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="9" cy="9" r="7"/>
      <path d="M9 5v4l3 2"/>
    </svg>
  ),
  FactoryGlobe: (props: any) => (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="40" cy="40" r="28"/>
      <ellipse cx="40" cy="40" rx="12" ry="28"/>
      <path d="M12 40h56" opacity="0.5"/>
      <path d="M16 28h48" opacity="0.3"/>
      <path d="M16 52h48" opacity="0.3"/>
      <path d="M40 12v56" opacity="0.3"/>
      <rect x="30" y="34" width="20" height="14" rx="1" fill="rgba(200,119,62,0.15)" stroke="rgba(200,119,62,0.5)"/>
      <path d="M33 34v-6l4 3v-3l4 3v-3l4 3v-3l5 6" stroke="rgba(200,119,62,0.5)"/>
      <rect x="37" y="40" width="6" height="8" rx="0.5" fill="rgba(200,119,62,0.2)" stroke="rgba(200,119,62,0.4)"/>
      <circle cx="22" cy="26" r="2" fill="rgba(200,119,62,0.6)" stroke="none"/>
      <circle cx="55" cy="30" r="2" fill="rgba(200,119,62,0.6)" stroke="none"/>
      <circle cx="60" cy="50" r="2" fill="rgba(200,119,62,0.6)" stroke="none"/>
      <circle cx="25" cy="52" r="1.5" fill="rgba(200,119,62,0.4)" stroke="none"/>
      <circle cx="50" cy="22" r="1.5" fill="rgba(200,119,62,0.4)" stroke="none"/>
    </svg>
  ),
  Design: (props: any) => (
    <svg viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 4l4 4-12 12H6v-4L18 4z"/>
      <path d="M15 7l4 4" opacity="0.4"/>
      <path d="M6 22h14" opacity="0.3"/>
      <path d="M2 10l3-3" opacity="0.3" strokeDasharray="1 2"/>
      <path d="M2 16l2-2" opacity="0.3" strokeDasharray="1 2"/>
      <rect x="20" y="18" width="4" height="6" rx="0.5" opacity="0.25"/>
    </svg>
  ),
  Artwork: (props: any) => (
    <svg viewBox="0 0 26 26" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="13" cy="13" r="10"/>
      <circle cx="10" cy="9" r="2" fill="currentColor" fillOpacity="0.3" stroke="none"/>
      <circle cx="16" cy="9" r="1.5" fill="currentColor" fillOpacity="0.3" stroke="none"/>
      <circle cx="9" cy="14" r="1.5" fill="currentColor" fillOpacity="0.3" stroke="none"/>
      <circle cx="15" cy="15" r="1.8" fill="currentColor" fillOpacity="0.3" stroke="none"/>
      <path d="M18 18c2-1 3-3 3-5" opacity="0.3"/>
      <path d="M20 16a2 2 0 1 1 0 4" fill="currentColor" fillOpacity="0.15" stroke="none"/>
      <path d="M5 21l2-2" opacity="0.4"/>
      <path d="M3 23l1-1" opacity="0.3"/>
    </svg>
  ),
  QA: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V7l8-4z"/>
      <path d="M9 12l2 2 4-4" strokeWidth="1.8"/>
      <circle cx="12" cy="12.5" r="5" fill="currentColor" fillOpacity="0.1" stroke="none"/>
    </svg>
  ),
  Logistics: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 18l2 2h14l2-2"/>
      <path d="M4 18v-6h5v6"/>
      <path d="M9 12h8l3 6"/>
      <path d="M9 12l1-5h5l1 5"/>
      <path d="M12 7V5" opacity="0.4"/>
      <path d="M2 22c2-1 4-1 6 0s4 1 6 0 4-1 6 0" opacity="0.3"/>
      <rect x="11" y="14" width="4" height="3" rx="0.5" fill="currentColor" fillOpacity="0.2" stroke="none"/>
    </svg>
  ),
  Strategy: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 18h6"/>
      <path d="M10 21h4"/>
      <path d="M12 3C8 3 5 6 5 9.5c0 2.5 1.5 4 3 5.5.5.5 1 1.5 1 3h6c0-1.5.5-2.5 1-3 1.5-1.5 3-3 3-5.5C19 6 16 3 12 3z"/>
      <path d="M10 13l2-3 2 3" opacity="0.4"/>
      <path d="M12 3v-1M5 6L4 5M19 6l1-1M3 10H2M22 10h-1" opacity="0.3" strokeDasharray="1 1.5"/>
      <circle cx="12" cy="9" r="2" fill="currentColor" fillOpacity="0.1" stroke="none"/>
    </svg>
  )
};
