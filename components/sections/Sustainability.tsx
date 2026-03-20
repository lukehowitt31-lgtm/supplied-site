"use client";

import React from "react";
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
    <section className="py-[120px] bg-white relative overflow-hidden">
      {/* Background Image with Fade */}
      <div className="absolute inset-0 z-0">
        <img
          src="/pexels-jaymantri-4827.jpg"
          alt="Sustainability Background"
          className="w-full h-full object-cover opacity-60"
        />
        {/* Gradient Overlay for Fade Effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/40 to-transparent" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[72px] items-center">
          <Reveal>
            <Tag color="green">🌱 Sustainability & compliance</Tag>
            <AccentHeading
              as="h2"
              text={sectionContent.heading}
              className="text-[clamp(32px,3.8vw,46px)] font-extrabold leading-[1.1] tracking-[-0.025em] mt-4 mb-[18px] text-supplied-ink"
              accentClassName="text-supplied-amber"
            />
            <p className="text-base text-supplied-ink-80 font-medium leading-[1.7] mb-8 bg-white/30 backdrop-blur-[2px] p-2 rounded-lg -ml-2 inline-block">
              {sectionContent.body}
            </p>
            <div className="flex flex-col gap-3.5">
              {checklistItems.map((item) => (
                <CheckItem
                  key={item.title}
                  title={item.title}
                  desc={item.desc}
                />
              ))}
            </div>
          </Reveal>

          <Reveal className="bg-white/80 backdrop-blur-sm rounded-[32px] p-11 shadow-supplied-lg border border-white/20">
            <div className="grid grid-cols-2 gap-4">
              <StatBox val="100%" lbl="Recyclable Range" />
              <StatBox val="FSC®" lbl="Certified" />
              <StatBox val="PPWR" lbl="2026 Compliant" />
              <StatBox val="Zero" lbl="PFAS in Materials" />
            </div>
            <div className="mt-6 flex items-center justify-center gap-4 pt-5 border-t border-supplied-ink/5">
              <img 
                src="/images/brand/fsc-logo-new.svg" 
                alt="FSC Certified" 
                className="h-16"
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
              <div className="text-left">
                <p className="text-[13px] font-bold text-supplied-ink leading-tight">FSC® Certified</p>
                <p className="text-[11px] text-supplied-ink-40 leading-snug mt-0.5">Chain-of-custody certification<br/>across our supply chain</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function CheckItem({ title, desc }: { title: string; desc?: string }) {
  return (
    <div className="flex gap-3 items-start bg-white/40 backdrop-blur-[2px] p-2 rounded-lg -ml-2">
      <div className="flex-shrink-0 w-[22px] h-[22px] rounded-full bg-supplied-green text-white flex items-center justify-center text-[11px] font-bold mt-0.5 shadow-sm">
        ✓
      </div>
      <p className="text-sm text-supplied-ink-80 leading-[1.55] font-medium">
        <strong className="text-supplied-ink font-bold">{title}</strong>
        {desc ? <> — {desc}</> : null}
      </p>
    </div>
  );
}

function StatBox({ val, lbl }: { val: string; lbl: string }) {
  return (
    <div className="bg-white/90 rounded-2xl p-6 text-center shadow-sm">
      <div className="text-[32px] font-extrabold text-supplied-green leading-none mb-1">
        {val}
      </div>
      <div className="text-[11px] text-supplied-ink-40 uppercase tracking-[1px]">
        {lbl}
      </div>
    </div>
  );
}
