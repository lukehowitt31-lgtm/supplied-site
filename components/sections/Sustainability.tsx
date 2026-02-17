"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";

export function Sustainability() {
  return (
    <section className="py-[120px] bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[72px] items-center">
          <Reveal>
            <Tag color="green">🌱 Sustainability & compliance</Tag>
            <h2 className="text-[clamp(32px,3.8vw,46px)] font-bold leading-[1.1] tracking-[-0.025em] mt-4 mb-[18px] text-supplied-ink">
              PPWR-ready packaging, <em className="font-fraunces font-normal italic">without</em> the compromise
            </h2>
            <p className="text-base text-supplied-ink-40 leading-[1.7] mb-8">
              EU packaging regulations are changing everything. We ensure compliance while actually improving your brand experience.
            </p>
            <div className="flex flex-col gap-3.5">
              <CheckItem title="Recyclability & reusability" desc="designed to meet minimum PPWR recyclability thresholds" />
              <CheckItem title="Recycled content targets" desc="materials sourced to meet mandatory recycled content %" />
              <CheckItem title="Correct labelling" desc="disposal labelling compliant with EU standards" />
              <CheckItem title="Substance restrictions" desc="PFAS-free across all materials" />
              <CheckItem title="FSC® certified options" desc="chain-of-custody certification across our supply chain" />
            </div>
          </Reveal>

          <Reveal className="bg-supplied-green-10 rounded-[32px] p-11">
            <div className="grid grid-cols-2 gap-4">
              <StatBox val="100%" lbl="Recyclable Range" />
              <StatBox val="FSC®" lbl="Certified" />
              <StatBox val="PPWR" lbl="2026 Compliant" />
              <StatBox val="Zero" lbl="PFAS in Materials" />
            </div>
            <div className="text-center mt-6">
              <img 
                src="https://supplied.agency/wp-content/uploads/2024/08/FSC-Logo.svg" 
                alt="FSC" 
                className="h-11 opacity-50 mx-auto"
                onError={(e) => e.currentTarget.style.display = 'none'}
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function CheckItem({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="flex-shrink-0 w-[22px] h-[22px] rounded-full bg-supplied-green-10 text-supplied-green flex items-center justify-center text-[11px] font-bold mt-0.5">
        ✓
      </div>
      <p className="text-sm text-supplied-ink-60 leading-[1.55]">
        <strong className="text-supplied-ink">{title}</strong> — {desc}
      </p>
    </div>
  );
}

function StatBox({ val, lbl }: { val: string; lbl: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 text-center">
      <div className="text-[32px] font-extrabold text-supplied-green leading-none mb-1">
        {val}
      </div>
      <div className="text-[11px] text-supplied-ink-40 uppercase tracking-[1px]">
        {lbl}
      </div>
    </div>
  );
}
