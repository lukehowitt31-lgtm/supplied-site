import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";

export function ProblemSolution() {
  return (
    <section className="py-[120px] bg-supplied-bg">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Header + Pain Points */}
          <div className="flex flex-col">
            <Reveal>
              <Tag color="ink" className="mb-4">Sound familiar?</Tag>
              <h2 className="text-[clamp(32px,3.8vw,46px)] font-bold leading-[1.1] tracking-[-0.025em] mb-5 text-supplied-ink">
                Packaging becomes a <em className="font-fraunces font-normal italic">bottleneck</em> when you're scaling fast
              </h2>
              <p className="text-base text-supplied-ink-40 leading-[1.7] mb-10">
                You're a multi-talented team growing at pace. Packaging seems simple — until it isn't.
              </p>
            </Reveal>
            
            <Reveal className="flex flex-col gap-4">
              <PainPoint color="red" title="Too many suppliers, no single owner" desc="Box supplier, printer, insert maker, freight forwarder — nobody's joining it up for you." />
              <PainPoint color="red" title="Costs creep up without visibility" desc="Hidden fees, inconsistent pricing, and no clear breakdown of where your money goes." />
              <PainPoint color="orange" title="Sustainability compliance is overwhelming" desc="EU PPWR, FSC, recyclability labels — the regulatory landscape is shifting and your suppliers can't keep up." />
              <PainPoint color="orange" title="Your packaging doesn't match your brand" desc="Your product is premium but the unboxing experience doesn't reflect it. Packaging should drive retention." />
            </Reveal>
          </div>

          {/* Right Column: Image + Solution Card */}
          <div className="flex flex-col relative mt-12 lg:mt-0">
            <div className="relative w-full h-[680px] shrink-0 z-10 -mb-80 pointer-events-none">
               <Image 
                 src="/Lumity floating.webp" 
                 alt="Lumity packaging floating" 
                 fill 
                 className="object-contain object-bottom drop-shadow-2xl"
               />
            </div>

            <Reveal className="bg-supplied-ink rounded-[32px] p-11 text-white relative overflow-hidden pt-64 pb-12">
              <div className="absolute -top-[60px] -right-[60px] w-[200px] h-[200px] bg-[radial-gradient(circle,rgba(232,121,28,0.12),transparent_70%)] pointer-events-none" />
              
              <div className="relative z-10">
                <Tag color="amber" pulse className="mb-5">The Supplied solution</Tag>
                <h3 className="text-2xl font-bold mb-4 leading-[1.2]">One partnership. Full control. Zero complexity.</h3>
                <p className="text-[14.5px] text-white/45 leading-[1.65] mb-8">
                  We become an extension of your team — managing your entire packaging portfolio from design to delivery.
                </p>
                
                <div className="flex flex-col gap-[18px]">
                  <SolutionStep num="1" title="Audit your current setup" desc="Map existing packaging, suppliers, and costs to find savings." />
                  <SolutionStep num="2" title="Design for brand impact" desc="Technical design and structural engineering for your unboxing." />
                  <SolutionStep num="3" title="Source from our global network" desc="30+ vetted suppliers across 12 countries — matched to your brief." />
                  <SolutionStep num="4" title="Manage production & delivery" desc="QA, compliance, freight, customs — we handle operations." />
                  <SolutionStep num="5" title="Optimise continuously" desc="Cost reviews, material innovations, PPWR updates as you scale." />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

function PainPoint({ color, title, desc }: { color: "red" | "orange"; title: string; desc: string }) {
  const dotColor = color === "red" ? "bg-[#EF4444]" : "bg-supplied-amber";
  return (
    <div className="flex gap-4 items-start p-5 bg-white border border-supplied-ink-10 rounded-2xl transition-all duration-300 ease-supplied hover:border-supplied-amber/15 hover:shadow-supplied-sm hover:translate-x-1">
      <span className={`flex-shrink-0 w-2.5 h-2.5 rounded-full mt-1.5 ${dotColor}`} />
      <div>
        <h4 className="text-[14.5px] font-semibold mb-1 text-supplied-ink">{title}</h4>
        <p className="text-[13.5px] text-supplied-ink-40 leading-[1.55]">{desc}</p>
      </div>
    </div>
  );
}

function SolutionStep({ num, title, desc }: { num: string; title: string; desc: string }) {
  return (
    <div className="flex gap-3.5 items-start">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-supplied-amber/12 text-supplied-amber-bright flex items-center justify-center text-[13px] font-bold">
        {num}
      </div>
      <div>
        <h4 className="text-sm font-semibold mb-0.5 text-white">{title}</h4>
        <p className="text-[13px] text-white/40 leading-[1.5]">{desc}</p>
      </div>
    </div>
  );
}
