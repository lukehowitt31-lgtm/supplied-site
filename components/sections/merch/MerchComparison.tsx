"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AccentHeading } from "@/components/ui/AccentHeading";
import type { ComparisonRow } from "@/types/merch";

interface MerchComparisonProps {
  rows: ComparisonRow[];
}

export function MerchComparison({ rows }: MerchComparisonProps) {
  return (
    <section className="py-[100px] bg-supplied-ink relative">
      <Container>
        <div className="text-center mb-14">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase text-supplied-amber mb-5">
              <span className="w-1.5 h-1.5 bg-supplied-amber rounded-full" />
              Why Supplied
            </div>
            <AccentHeading
              as="h2"
              text="Supplied vs Going It |Alone"
              className="text-[clamp(34px,4.2vw,52px)] font-extrabold leading-[1.08] tracking-[-0.03em] mb-[18px] text-white"
              accentClassName="text-supplied-amber"
            />
            <p className="text-[17px] text-white/50 leading-[1.6] max-w-[560px] mx-auto">
              What changes when you stop self-sourcing through Alibaba and let us handle the supply chain.
            </p>
          </Reveal>
        </div>

        {/* Desktop table */}
        <Reveal delay={100}>
          <div className="hidden md:block rounded-2xl overflow-hidden border border-white/10">
            <table className="w-full">
              <thead>
                <tr className="bg-white/[0.05]">
                  <th className="text-left text-[13px] font-semibold text-white/40 uppercase tracking-[0.1em] px-8 py-5 w-[25%]">
                    &nbsp;
                  </th>
                  <th className="text-left text-[13px] font-semibold text-supplied-amber uppercase tracking-[0.1em] px-8 py-5 w-[37.5%]">
                    Supplied
                  </th>
                  <th className="text-left text-[13px] font-semibold text-white/40 uppercase tracking-[0.1em] px-8 py-5 w-[37.5%]">
                    Self-sourced (Alibaba)
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={row.topic}
                    className={
                      i < rows.length - 1
                        ? "border-b border-white/[0.06]"
                        : ""
                    }
                  >
                    <td className="px-8 py-6 text-[14px] font-semibold text-white/70">
                      {row.topic}
                    </td>
                    <td className="px-8 py-6 text-[14px] text-white/60 leading-[1.65]">
                      <span className="inline-block w-2 h-2 bg-supplied-green rounded-full mr-2.5 -translate-y-px" />
                      {row.suppliedAnswer}
                    </td>
                    <td className="px-8 py-6 text-[14px] text-white/40 leading-[1.65]">
                      <span className="inline-block w-2 h-2 bg-red-400/60 rounded-full mr-2.5 -translate-y-px" />
                      {row.alibabaAnswer}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>

        {/* Mobile cards */}
        <div className="md:hidden space-y-4">
          {rows.map((row, i) => (
            <Reveal key={row.topic} delay={i * 75}>
              <div className="rounded-xl border border-white/10 overflow-hidden">
                <div className="bg-white/[0.05] px-5 py-3">
                  <span className="text-[14px] font-semibold text-white/70">
                    {row.topic}
                  </span>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <span className="block text-[11px] font-semibold text-supplied-amber uppercase tracking-[0.1em] mb-1.5">
                      Supplied
                    </span>
                    <p className="text-[13px] text-white/60 leading-[1.65]">
                      {row.suppliedAnswer}
                    </p>
                  </div>
                  <div className="border-t border-white/[0.06] pt-4">
                    <span className="block text-[11px] font-semibold text-white/30 uppercase tracking-[0.1em] mb-1.5">
                      Self-sourced
                    </span>
                    <p className="text-[13px] text-white/40 leading-[1.65]">
                      {row.alibabaAnswer}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
