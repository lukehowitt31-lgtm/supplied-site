"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const heroProducts = [
  { id: "mailer-boxes", title: "Mailer Boxes", href: "/products/mailer-boxes", image: "/images/products/SURIMailerBoxes.jpg" },
  { id: "rigid-boxes", title: "Rigid Boxes", href: "/products/rigid-boxes", image: "/images/products/LondonSockRigidBoxHero.jpg" },
  { id: "printed-cans", title: "Printed Cans", href: "/products/printed-cans", image: "/images/products/OrionBeerPrintedCanHero.jpg" },
  { id: "shipping-boxes", title: "Shipping Boxes", href: "/products/shipping-boxes", image: "/images/products/MrsAliceShippingBoxHero.jpg" },
  { id: "printed-tubes", title: "Printed Tubes", href: "/products/printed-tubes", image: "/images/products/TripTubeWithGummiesHero.png" },
  { id: "advent-calendars", title: "Advent Calendars", href: "/products/advent-calendars", image: "/images/products/HealfAdventCalendarHero.jpg" },
  { id: "cartonboard-boxes", title: "Cartonboard Boxes", href: "/products/cartonboard-boxes", image: "/images/products/HealfBoxSideProfile.jpg" },
];

interface ProductsContent {
  heading: string;
  body: string;
  cta: {
    label: string;
    href: string;
  };
}

interface ProductsProps {
  content?: ProductsContent;
}

const fallbackContent: ProductsContent = {
  heading: "Everything your brand needs, sourced",
  body: "From cartonboard boxes to printed cans — one partnership, one invoice, one point of contact across your entire packaging catalogue.",
  cta: {
    label: "View Full Catalogue",
    href: "/products",
  },
};

export function Products({ content }: ProductsProps) {
  const sectionContent = content ?? fallbackContent;
  const [activeIndex, setActiveIndex] = useState(0);
  const active = heroProducts[activeIndex];

  return (
    <section className="py-[100px] pb-[120px] bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-supplied-ink-10 to-transparent" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-16 items-start">
          {/* Left: Copy */}
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase text-supplied-amber mb-5">
                <span className="w-1.5 h-1.5 bg-supplied-amber rounded-full" />
                Our products
              </div>
              <h2 className="text-[clamp(34px,4.2vw,52px)] font-bold leading-[1.08] tracking-[-0.03em] mb-[18px] text-supplied-ink">
                {sectionContent.heading}
              </h2>
              <p className="text-[17px] text-supplied-ink-40 leading-[1.6] max-w-[440px] mb-8">
                {sectionContent.body}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={sectionContent.cta.href}
                  className="inline-flex items-center gap-2 bg-supplied-amber text-white font-sans text-sm font-semibold px-7 py-3.5 rounded-lg transition-all duration-300 hover:bg-supplied-amber-deep hover:-translate-y-px"
                >
                  {sectionContent.cta.label} <span>→</span>
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-supplied-ink-60 px-7 py-3.5 rounded-lg border border-supplied-ink-10 transition-all duration-300 hover:border-supplied-ink-20 hover:text-supplied-ink hover:-translate-y-px"
                >
                  Request Samples
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right: Gallery */}
          <Reveal delay={100}>
            <div className="flex flex-col gap-3">
              {/* Hero image */}
              <Link
                href={active.href}
                className="group relative block w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#F5F3F0]"
              >
                {heroProducts.map((product, i) => (
                  <div
                    key={product.id}
                    className="absolute inset-0 transition-opacity duration-500 ease-out"
                    style={{ opacity: i === activeIndex ? 1 : 0 }}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                    />
                  </div>
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 flex items-end justify-between opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <div>
                    <span className="text-white/70 text-xs font-semibold tracking-[0.1em] uppercase block mb-1">Featured</span>
                    <span className="text-white text-xl sm:text-2xl font-bold tracking-[-0.02em]">{active.title}</span>
                  </div>
                  <span className="text-white/80 text-sm font-semibold flex items-center gap-1.5 transition-all duration-300 group-hover:gap-2.5">
                    Explore <span>→</span>
                  </span>
                </div>
              </Link>

              {/* Thumbnail strip */}
              <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar">
                {heroProducts.map((product, i) => (
                  <button
                    key={product.id}
                    onClick={() => setActiveIndex(i)}
                    className={`group/thumb relative w-[96px] sm:w-[110px] lg:w-[120px] shrink-0 aspect-square rounded-xl overflow-hidden transition-all duration-300 ${
                      i === activeIndex
                        ? "ring-2 ring-supplied-amber ring-offset-2 ring-offset-white"
                        : "opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105"
                    />
                    <div className={`absolute inset-0 flex items-end p-2 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 ${
                      i === activeIndex ? "opacity-100" : "opacity-0 group-hover/thumb:opacity-100"
                    }`}>
                      <span className="text-white text-[10px] sm:text-[11px] font-semibold leading-tight">
                        {product.title}
                      </span>
                    </div>
                  </button>
                ))}
              </div>

              {/* Quick links row */}
              <div className="flex flex-wrap gap-2 mt-1">
                {heroProducts.map((product) => (
                  <Link
                    key={product.id}
                    href={product.href}
                    className="text-[11px] font-medium text-supplied-ink-40 px-3 py-1.5 rounded-full border border-supplied-ink-10 transition-all duration-300 hover:border-supplied-amber/30 hover:text-supplied-amber hover:bg-supplied-amber/5"
                  >
                    {product.title} →
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bottom CTA */}
        <Reveal delay={150}>
          <div className="bg-supplied-ink rounded-xl p-7 lg:px-10 lg:py-7 flex flex-col lg:flex-row items-center justify-between gap-6 mt-16 text-center lg:text-left">
            <span className="text-[17px] font-medium text-white">
              Don't see what you need? We source <em className="font-fraunces font-normal italic text-supplied-amber">anything</em> packaging — just ask.
            </span>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 bg-supplied-amber text-white font-sans text-sm font-semibold px-7 py-3.5 rounded-lg transition-all duration-300 hover:bg-supplied-amber-deep hover:-translate-y-px whitespace-nowrap"
            >
              Get in Touch <span>→</span>
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
