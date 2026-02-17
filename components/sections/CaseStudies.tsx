import React from "react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CaseStudies() {
  return (
    <section className="py-[120px] bg-supplied-ink text-white" id="results-section">
      <Container>
        <Reveal className="text-center max-w-[600px] mx-auto mb-16">
          <Tag color="amber">Client stories</Tag>
          <h2 className="text-[clamp(32px,3.8vw,46px)] font-bold leading-[1.1] tracking-[-0.025em] mt-4 mb-4 text-white">
            Real brands, <em className="font-fraunces font-normal italic">real</em> results
          </h2>
          <p className="text-base text-white/40 leading-[1.65]">
            We measure success by the impact on your brand, your customers, and your bottom line.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-12">
          <ResultCard 
            brand="TRIP" 
            quote='"Supplied transformed our CBD gummies tube sourcing — cutting costs while improving the premium feel our customers expect."'
            metrics={[
              { val: "30%", lbl: "Cost Reduction" },
              { val: "6 wk", lbl: "Faster to Market" }
            ]}
          />
          <ResultCard 
            brand="Glow For It" 
            quote='"The influencer mailer boxes Supplied created drove huge social engagement. The unboxing experience became our best marketing tool."'
            metrics={[
              { val: "500K+", lbl: "Social Impressions" },
              { val: "100%", lbl: "Recyclable" }
            ]}
          />
          <ResultCard 
            brand="Healf" 
            quote='"One partner managing our entire packaging portfolio — from shipping boxes to inserts — freed up our ops team to focus on growth."'
            metrics={[
              { val: "4→1", lbl: "Suppliers" },
              { val: "98%", lbl: "On-Time" }
            ]}
          />
        </div>

        <Reveal className="text-center mt-12">
          <Button variant="fill-amber" href="https://supplied.agency/client-stories/" target="_blank" icon>
            All Client Stories
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}

function ResultCard({ brand, quote, metrics }: { brand: string; quote: string; metrics: { val: string; lbl: string }[] }) {
  return (
    <Reveal className="bg-white/3 border border-white/6 rounded-2xl p-8 transition-all duration-400 ease-supplied hover:bg-white/6 hover:border-supplied-amber/15 hover:-translate-y-1">
      <div className="text-[11px] font-semibold text-supplied-amber-bright uppercase tracking-[1.5px] mb-3.5">
        {brand}
      </div>
      <div className="text-[15px] text-white/60 leading-[1.65] italic mb-5">
        {quote}
      </div>
      <div className="flex gap-6">
        {metrics.map((m, i) => (
          <div key={i}>
            <div className="text-[26px] font-extrabold bg-gradient-to-br from-supplied-amber-bright to-supplied-amber bg-clip-text text-transparent leading-none">
              {m.val}
            </div>
            <div className="text-[10px] text-white/30 uppercase tracking-[1px] mt-1">
              {m.lbl}
            </div>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
