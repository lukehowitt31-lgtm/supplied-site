import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Products() {
  return (
    <section className="py-[100px] pb-[120px] bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-supplied-ink-10 to-transparent" />
      
      <Container>
        {/* Section Header */}
        <div className="text-center mb-[72px]">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase text-supplied-amber mb-5">
              <span className="w-1.5 h-1.5 bg-supplied-amber rounded-full" />
              Our products
            </div>
            <h2 className="text-[clamp(34px,4.2vw,52px)] font-bold leading-[1.08] tracking-[-0.03em] mb-[18px] text-supplied-ink">
              Everything your brand needs, <em className="font-fraunces font-normal italic">sourced</em>
            </h2>
            <p className="text-[17px] text-supplied-ink-40 leading-[1.6] max-w-[520px] mx-auto">
              One partnership, one invoice, one point of contact — across your entire packaging catalogue.
            </p>
          </Reveal>
        </div>

        {/* Featured Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          <FeaturedCard
            delay={50}
            title="Ecommerce Mailer Boxes"
            desc="Custom branded mailers in full colour. Tuck-front, crash-lock, or magnetic closures. From 100 units."
            badge="Best Seller"
            badgeColor="#C8773E"
            badgeBg="rgba(200,119,62,0.15)"
            gradient="linear-gradient(135deg, #2A2520, #3D342C)"
            linkColor="#C8773E"
            href="/products/mailer-boxes"
            icon={<Icons.MailerBox />}
          />
          <FeaturedCard
            delay={120}
            title="Rigid Boxes"
            desc="Luxury gift and retail packaging. Lift-off lids, magnetic closures, soft-touch finishes. Fully bespoke."
            badge="Premium"
            badgeColor="#7BAAD4"
            badgeBg="rgba(91,127,165,0.2)"
            gradient="linear-gradient(135deg, #1E2A3A, #2A3B4D)"
            linkColor="#7BAAD4"
            href="/products/rigid-boxes"
            icon={<Icons.RigidBox />}
          />
          <FeaturedCard
            delay={190}
            title="Printed Cans"
            desc="Digitally printed aluminium cans for beers, beverages, and wellness drinks. No plate charges. Low MOQs."
            badge="New"
            badgeColor="#A08BC4"
            badgeBg="rgba(123,107,153,0.2)"
            gradient="linear-gradient(135deg, #2D3B2D, #3D4D3A)"
            linkColor="#7BC47B"
            href="/products/printed-cans"
            icon={<Icons.Can />}
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
          <ProductTile
            delay={50}
            title="Paper Mailers"
            desc="Flexo & digital printed. Sustainable postal packaging for ecommerce."
            icon={<Icons.PaperMailer />}
            color="#5B7FA5"
            lightColor="#E4ECF5"
            href="/products/paper-mailers"
          />
          <ProductTile
            delay={100}
            title="Shipping Boxes"
            desc="0201 flexo & digital printed transit outers. Branded or plain."
            icon={<Icons.ShippingBox />}
            color="#6B8A8A"
            lightColor="#E6EFEF"
            href="/products/shipping-boxes"
          />
          <ProductTile
            delay={150}
            title="Tubes & Bottles"
            desc="Card tubes, composite tubes, glass & plastic bottles."
            icon={<Icons.Tube />}
            color="#7B6B99"
            lightColor="#EDE8F4"
            href="/products/tubes-bottles"
          />
          <ProductTile
            delay={200}
            title="Cartonboard Boxes"
            desc="Product & retail cartons. Folding box board, fully customisable."
            icon={<Icons.Carton />}
            color="#C8773E"
            lightColor="#F5EDE4"
            href="/products/cartonboard-boxes"
          />
          <ProductTile
            delay={250}
            title="Labels & Stickers"
            desc="Self-adhesive product labelling. Die-cut, roll, or sheet format."
            icon={<Icons.Label />}
            color="#5B7FA5"
            lightColor="#E4ECF5"
            href="/products/labels-stickers"
          />
          <ProductTile
            delay={300}
            title="Cards & Leaflets"
            desc="Thank-you cards, inserts, booklets, and printed collateral."
            icon={<Icons.Card />}
            color="#5B7FA5"
            lightColor="#E4ECF5"
            href="/products/cards-leaflets"
          />
          <ProductTile
            delay={350}
            title="Bags & Pouches"
            desc="Cotton totes, sachets, stand-up pouches. Branded or unbranded."
            icon={<Icons.Bag />}
            color="#7B6B99"
            lightColor="#EDE8F4"
            href="/products/bags-pouches"
          />
          <ProductTile
            delay={400}
            title="Inserts & Fitments"
            desc="Custom protective inlays. Corrugated, foam, or pulp mould."
            icon={<Icons.Insert />}
            color="#C8773E"
            lightColor="#F5EDE4"
            href="/products/inserts-fitments"
          />
        </div>

        {/* Accent Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-5">
          <AccentTile
            delay={50}
            title="Printed Tissue Paper & Tapes"
            desc="Branded tissue paper and paper tape to complete the unboxing experience. Custom colours and patterns."
            linkText="Explore tissue & tape"
            icon={<Icons.Tissue />}
            color="#3A6B4A"
            lightColor="#E8F0EA"
            bgGradient="linear-gradient(135deg, #E8F0EA 0%, #F5FAF5 100%)"
            iconBg="rgba(58,107,74,0.12)"
            href="/products/tissue-paper"
          />
          <AccentTile
            delay={100}
            title="Advent Calendars & Seasonal"
            desc="Bespoke advent calendars, gift sets, and limited-edition seasonal packaging. Fully custom structures."
            linkText="Explore seasonal"
            icon={<Icons.Advent />}
            color="#B85454"
            lightColor="#F5E8E8"
            bgGradient="linear-gradient(135deg, #F5E8E8 0%, #FDF5F5 100%)"
            iconBg="rgba(184,84,84,0.12)"
            href="/products/advent-calendars"
          />
        </div>

        {/* CTA Strip */}
        <Reveal delay={150}>
          <div className="bg-supplied-ink rounded-xl p-7 lg:px-10 lg:py-7 flex flex-col lg:flex-row items-center justify-between gap-6 mt-12 text-center lg:text-left">
            <span className="text-[17px] font-medium text-white">
              Don't see what you need? We source <em className="font-fraunces font-normal italic text-supplied-amber">anything</em> packaging — just ask.
            </span>
            <Link 
              href="/products" 
              className="inline-flex items-center gap-2 bg-supplied-amber text-white font-sans text-sm font-semibold px-7 py-3.5 rounded-lg transition-all duration-300 hover:bg-supplied-amber-deep hover:-translate-y-px whitespace-nowrap"
            >
              View Full Catalogue <span>→</span>
            </Link>
          </div>
        </Reveal>

      </Container>
    </section>
  );
}

// ─── Sub-components ───

function FeaturedCard({ title, desc, badge, badgeColor, badgeBg, gradient, linkColor, href, icon, delay }: any) {
  return (
    <Reveal delay={delay}>
      <Link href={href} className="group block rounded-2xl overflow-hidden relative cursor-pointer transition-transform duration-400 ease-supplied hover:-translate-y-1">
        <div className="w-full aspect-[4/3] relative overflow-hidden" style={{ background: gradient }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 text-white/40 text-xs tracking-[0.06em]">
            <div className="opacity-50 transition-transform duration-500 group-hover:scale-105">
              {icon}
            </div>
            <span>Product image</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-7 z-10 text-white">
          <span 
            className="inline-block text-[10px] font-semibold tracking-[0.12em] uppercase px-2.5 py-1 rounded mb-2.5 backdrop-blur-md"
            style={{ color: badgeColor, backgroundColor: badgeBg }}
          >
            {badge}
          </span>
          <h3 className="text-[22px] font-bold tracking-[-0.02em] leading-[1.2] mb-1.5">
            {title}
          </h3>
          <p className="text-sm text-white/65 leading-[1.5]">
            {desc}
          </p>
          <div 
            className="inline-flex items-center gap-1.5 mt-3.5 text-[13px] font-semibold transition-all duration-300 group-hover:gap-2.5"
            style={{ color: linkColor }}
          >
            Explore {title.toLowerCase().replace('ecommerce ', '')} <span>→</span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

function ProductTile({ title, desc, icon, color, lightColor, href, delay }: any) {
  return (
    <Reveal delay={delay}>
      <Link 
        href={href}
        className="block bg-supplied-ink-05 rounded-[14px] p-7 relative overflow-hidden transition-all duration-350 ease-supplied border border-transparent hover:bg-white hover:border-supplied-ink-10 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] group"
        style={{ '--tile-color': color, '--tile-light': lightColor } as React.CSSProperties}
      >
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-[var(--tile-color)] transform scale-x-0 origin-left transition-transform duration-400 ease-supplied group-hover:scale-x-100" />
        
        <div className="flex items-center justify-between mb-4">
          <div className="w-11 h-11 rounded-[10px] flex items-center justify-center bg-[var(--tile-light)] text-[var(--tile-color)]">
            {React.cloneElement(icon, { className: "w-6 h-6" })}
          </div>
          <div className="w-7 h-7 rounded-full bg-supplied-ink-05 flex items-center justify-center text-[13px] text-supplied-ink-40 transition-all duration-300 opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0 group-hover:bg-[var(--tile-color)] group-hover:text-white">
            →
          </div>
        </div>
        
        <h4 className="text-base font-semibold tracking-[-0.01em] mb-1 text-supplied-ink">
          {title}
        </h4>
        <p className="text-[13px] text-supplied-ink-40 leading-[1.5]">
          {desc}
        </p>
      </Link>
    </Reveal>
  );
}

function AccentTile({ title, desc, linkText, icon, color, lightColor, bgGradient, iconBg, href, delay }: any) {
  return (
    <Reveal delay={delay}>
      <Link 
        href={href}
        className="flex items-center gap-7 rounded-[14px] p-9 border border-transparent transition-all duration-350 ease-supplied hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-supplied-ink-10 group"
        style={{ background: bgGradient, '--accent-color': color } as React.CSSProperties}
      >
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: iconBg }}>
          {React.cloneElement(icon, { className: "w-8 h-8 text-[var(--accent-color)]" })}
        </div>
        <div>
          <h4 className="text-lg font-semibold tracking-[-0.01em] mb-1 text-supplied-ink">
            {title}
          </h4>
          <p className="text-sm text-supplied-ink-40 leading-[1.5]">
            {desc}
          </p>
          <div className="inline-flex items-center gap-1.5 mt-2 text-[13px] font-semibold text-[var(--accent-color)] transition-all duration-300 group-hover:gap-2.5">
            {linkText} <span>→</span>
          </div>
        </div>
      </Link>
    </Reveal>
  );
}

// ─── Icons ───

const Icons = {
  MailerBox: (props: any) => (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 20l20-8 20 8v20l-20 8-20-8V20z"/>
      <path d="M8 20l20 8 20-8"/>
      <path d="M28 28v20"/>
      <path d="M18 16l20 8"/>
      <path d="M13 35l8 3"/>
      <path d="M28 12v-2M28 6v-1" strokeDasharray="2 3"/>
      <path d="M18 24l-4 6" opacity="0.4"/>
    </svg>
  ),
  RigidBox: (props: any) => (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="10" y="18" width="36" height="28" rx="2"/>
      <path d="M10 18l6-8h24l6 8"/>
      <path d="M16 10h24v0"/>
      <path d="M10 18h36"/>
      <path d="M28 18v-8"/>
      <path d="M18 32h20M18 38h12"/>
      <circle cx="44" cy="12" r="2" fill="currentColor" fillOpacity="0.3" stroke="none"/>
    </svg>
  ),
  Can: (props: any) => (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <ellipse cx="28" cy="12" rx="14" ry="5"/>
      <path d="M14 12v32c0 2.8 6.3 5 14 5s14-2.2 14-5V12"/>
      <ellipse cx="28" cy="44" rx="14" ry="5" opacity="0.3"/>
      <path d="M14 24c0 2.8 6.3 5 14 5s14-2.2 14-5" opacity="0.4"/>
      <path d="M20 20v18M24 19v20M28 19v20M32 19v20M36 20v18" opacity="0.15" strokeWidth="3"/>
      <circle cx="42" cy="8" r="3" fill="none" strokeDasharray="2 2"/>
    </svg>
  ),
  PaperMailer: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 8h16v12H4z"/>
      <path d="M7 4h10l2 4H5l2-4z"/>
      <path d="M4 14h16" opacity="0.4"/>
      <path d="M8 11h3M8 17h8"/>
      <circle cx="18" cy="11" r="1" fill="currentColor"/>
    </svg>
  ),
  ShippingBox: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="6" width="18" height="14" rx="1"/>
      <path d="M3 6l9 7 9-7" opacity="0.3"/>
      <path d="M8 10h8M8 13h5"/>
      <path d="M17 16l2 2 2-2" opacity="0.5"/>
    </svg>
  ),
  Tube: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="8" y="2" width="8" height="20" rx="4"/>
      <path d="M8 7h8M8 17h8"/>
      <ellipse cx="12" cy="12" rx="2" ry="3" opacity="0.3"/>
      <path d="M12 2v-0" strokeWidth="2"/>
      <circle cx="12" cy="3" r="1.5" fill="currentColor" opacity="0.3"/>
    </svg>
  ),
  Carton: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="4" width="16" height="18" rx="1"/>
      <path d="M4 4l3-2h10l3 2"/>
      <path d="M4 9h16" opacity="0.3"/>
      <path d="M9 9v13"/>
      <path d="M12 13h5M12 16h3" opacity="0.5"/>
    </svg>
  ),
  Label: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="4" y="4" width="12" height="16" rx="1"/>
      <path d="M8 8h4M8 11h6M8 14h3"/>
      <path d="M16 8l4-2v16l-4 2V8z" opacity="0.35"/>
      <circle cx="10" cy="17" r="1" fill="currentColor" opacity="0.4"/>
    </svg>
  ),
  Card: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="5" width="14" height="16" rx="1"/>
      <path d="M7 9h6M7 12h8M7 15h4"/>
      <path d="M17 7h4v14H7" opacity="0.25"/>
      <path d="M6 5V3h10v2" opacity="0.4"/>
    </svg>
  ),
  Bag: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 4h12v5c0 3-2 5-6 6-4-1-6-3-6-6V4z"/>
      <path d="M6 4c0-1 2-2 6-2s6 1 6 2" opacity="0.4"/>
      <path d="M9 12v8h6v-8" opacity="0.3"/>
      <path d="M8 20h8"/>
      <path d="M10 15h4" opacity="0.25"/>
    </svg>
  ),
  Insert: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="5" y="8" width="14" height="12" rx="1"/>
      <path d="M5 8l7-5 7 5"/>
      <path d="M5 14h14" opacity="0.2"/>
      <path d="M9 14v6M15 14v6" opacity="0.2"/>
      <path d="M10 11h4" opacity="0.5"/>
    </svg>
  ),
  Tissue: (props: any) => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M6 6c4 2 8 4 8 10s-4 8-8 10"/>
      <path d="M26 6c-4 2-8 4-8 10s4 8 8 10"/>
      <path d="M6 16h20" opacity="0.2"/>
      <path d="M14 10c1 0 2 1 2 2M18 10c-1 0-2 1-2 2" opacity="0.4"/>
      <circle cx="16" cy="22" r="2" opacity="0.25" fill="currentColor"/>
      <path d="M10 8l2 1M22 8l-2 1" opacity="0.3"/>
    </svg>
  ),
  Advent: (props: any) => (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="6" y="8" width="20" height="20" rx="2"/>
      <path d="M6 14h20M6 20h20M6 26h20" opacity="0.2"/>
      <path d="M12 8v20M18 8v20M24 8v20" opacity="0.2"/>
      <polygon points="16,2 18,7 14,7" fill="currentColor" opacity="0.4" stroke="none"/>
      <path d="M16 2l2 5h-4l2-5"/>
      <circle cx="10" cy="11" r="1" fill="currentColor" opacity="0.3" stroke="none"/>
      <circle cx="21" cy="17" r="1" fill="currentColor" opacity="0.3" stroke="none"/>
      <circle cx="15" cy="23" r="1" fill="currentColor" opacity="0.3" stroke="none"/>
    </svg>
  )
};
