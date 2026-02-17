import React from "react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";

export function Process() {
  return (
    <section className="py-[120px] bg-supplied-bg">
      <Container>
        <Reveal className="text-center max-w-[600px] mx-auto mb-16">
          <Tag color="amber">How it works</Tag>
          <h2 className="text-[clamp(32px,3.8vw,46px)] font-bold leading-[1.1] tracking-[-0.025em] mt-4 mb-4 text-supplied-ink">
            From concept to your <em className="font-fraunces font-normal italic">customer's</em> door
          </h2>
          <p className="text-base text-supplied-ink-40 leading-[1.65]">
            A proven, transparent process that removes packaging complexity.
          </p>
        </Reveal>

        <Reveal className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          <div className="hidden md:block absolute top-[44px] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-supplied-amber via-supplied-amber-10 to-supplied-amber" />
          
          <ProcessStep num="01" title="Technical Design" desc="Custom dielines for your product" />
          <ProcessStep num="02" title="Sampling" desc="Free unprinted samples to verify" />
          <ProcessStep num="03" title="Transparent Pricing" desc="Full cost breakdown, nothing hidden" />
          <ProcessStep num="04" title="Production" desc="Expert QA, best lead times" />
          <ProcessStep num="05" title="Delivery" desc="Perfect packaging, to your door" />
        </Reveal>
      </Container>
    </section>
  );
}

function ProcessStep({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="text-center relative">
      <div className="text-[10px] font-bold text-supplied-amber uppercase tracking-[2px]">
        Step {num}
      </div>
      <div className="w-4 h-4 rounded-full bg-supplied-amber mx-auto mt-7 mb-[18px] relative z-10 shadow-[0_0_0_5px_var(--color-supplied-amber-10)]" />
      <h4 className="text-sm font-semibold mb-1.5 text-supplied-ink">{title}</h4>
      <p className="text-[12.5px] text-supplied-ink-40 leading-[1.5] px-1">{desc}</p>
    </div>
  );
}
