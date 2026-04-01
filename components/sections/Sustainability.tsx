"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { AccentHeading } from "@/components/ui/AccentHeading";

interface SustainabilityContent {
  heading: string;
  body: string;
  checklist: string[];
}

interface SustainabilityProps {
  content?: SustainabilityContent;
}

interface ChecklistItem {
  title: string;
  desc?: string;
}

const fallbackChecklist: ChecklistItem[] = [
  {
    title: "Recyclability & reusability",
    desc: "designed to meet minimum PPWR recyclability thresholds",
  },
  {
    title: "Recycled content targets",
    desc: "materials sourced to meet mandatory recycled content %",
  },
  {
    title: "Correct labelling",
    desc: "disposal labelling compliant with EU standards",
  },
  {
    title: "Substance restrictions",
    desc: "PFAS-free across all materials",
  },
  {
    title: "FSC® certified options",
    desc: "chain-of-custody certification across our supply chain",
  },
];

const fallbackContent: SustainabilityContent = {
  heading: "PPWR-ready packaging, without the compromise",
  body: "EU packaging regulations are changing everything. We ensure compliance while actually improving your brand experience.",
  checklist: fallbackChecklist.map((item) => item.title),
};

export function Sustainability({ content }: SustainabilityProps) {
  const sectionContent = content ?? fallbackContent;
  const checklistItems: ChecklistItem[] =
    sectionContent.checklist.length > 0
      ? sectionContent.checklist.map((item) => ({ title: item, desc: undefined }))
      : fallbackChecklist;

  return (
    <section className="relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/pexels-jaymantri-4827.jpg"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-supplied-bg via-supplied-bg/85 to-supplied-bg/70" />
      </div>

      <Container className="relative z-10 py-24 md:py-[120px]">
        {/* Header */}
        <Reveal>
          <div className="text-center max-w-[680px] mx-auto mb-14">
            <Tag color="green">🌱 Sustainability & Compliance</Tag>
            <AccentHeading
              as="h2"
              text={sectionContent.heading}
              className="text-[clamp(30px,3.8vw,44px)] font-extrabold leading-[1.1] tracking-[-0.025em] mt-4 mb-5 text-supplied-ink"
              accentClassName="text-supplied-amber"
            />
            <p className="text-[16px] text-supplied-ink/60 leading-[1.75]">
              {sectionContent.body}
            </p>
          </div>
        </Reveal>

        {/* 3-column grid: Checklist | FSC | Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-stretch">
          {/* Left: Compliance checklist */}
          <Reveal>
            <div className="bg-white/80 backdrop-blur-sm rounded-[24px] p-8 md:p-10 border border-supplied-ink/[0.04] shadow-sm h-full flex flex-col justify-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-supplied-green mb-5">
                PPWR Compliance
              </p>
              <div className="flex flex-col gap-4">
                {checklistItems.map((item) => (
                  <CheckItem
                    key={item.title}
                    title={item.title}
                    desc={item.desc}
                  />
                ))}
              </div>
            </div>
          </Reveal>

          {/* Center: FSC certification */}
          <Reveal delay={80}>
            <div className="bg-white/90 backdrop-blur-sm rounded-[24px] p-8 md:p-10 border border-supplied-ink/[0.04] shadow-sm h-full flex flex-col items-center justify-center text-center w-full lg:w-[280px]">
              <Image
                src="/images/brand/fsc-logo-new.svg"
                alt="FSC® Certified — Supplied"
                width={160}
                height={160}
                className="w-40 h-40 object-contain mb-5"
              />
              <p className="text-[15px] font-bold text-supplied-ink leading-tight">
                FSC® Chain-of-Custody Certified
              </p>
              <p className="text-[12px] text-supplied-ink/45 leading-snug mt-2 max-w-[240px]">
                Responsibly sourced materials with full chain-of-custody
                certification across our supply chain
              </p>
            </div>
          </Reveal>

          {/* Right: Key stats */}
          <Reveal delay={160}>
            <div className="grid grid-rows-3 gap-4 h-full">
              <StatCard
                value="100%"
                label="Recyclable Range"
                desc="Every product in our catalogue is fully recyclable in kerbside collections"
              />
              <StatCard
                value="PPWR"
                label="2026 Compliant"
                desc="Built to meet current and upcoming EU packaging regulation requirements"
              />
              <StatCard
                value="Zero"
                label="PFAS in Materials"
                desc="No forever chemicals across any of our packaging materials"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function CheckItem({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="flex-shrink-0 w-[22px] h-[22px] rounded-full bg-supplied-green text-white flex items-center justify-center text-[11px] font-bold mt-0.5">
        ✓
      </div>
      <p className="text-[14px] text-supplied-ink/70 leading-[1.55]">
        <strong className="text-supplied-ink font-semibold">{title}</strong>
        {desc ? <span className="text-supplied-ink/50"> — {desc}</span> : null}
      </p>
    </div>
  );
}

function StatCard({
  value,
  label,
  desc,
}: {
  value: string;
  label: string;
  desc: string;
}) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-[20px] p-6 border border-supplied-ink/[0.04] shadow-sm flex items-center gap-5">
      <div className="shrink-0">
        <div className="text-[28px] font-extrabold text-supplied-green leading-none">
          {value}
        </div>
        <div className="text-[10px] text-supplied-ink/35 uppercase tracking-[0.08em] mt-1">
          {label}
        </div>
      </div>
      <div className="w-px h-10 bg-supplied-ink/8 shrink-0" />
      <p className="text-[12px] text-supplied-ink/45 leading-[1.55]">{desc}</p>
    </div>
  );
}
