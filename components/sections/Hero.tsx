import React from "react";
import { Button } from "@/components/ui/Button";
import { Tag } from "@/components/ui/Tag";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="relative min-h-screen pt-[140px] pb-[100px] flex items-center overflow-hidden bg-supplied-ink text-white">
      {/* Mesh Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_20%,rgba(232,121,28,0.07)_0%,transparent_60%),radial-gradient(ellipse_40%_60%_at_15%_80%,rgba(232,121,28,0.04)_0%,transparent_50%)] pointer-events-none" />
      
      {/* Grain Background */}
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`
        }}
      />

      <Container className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-20 items-center">
        <div className="max-w-[560px]">
          <div className="mb-7 opacity-0 animate-slide-up [animation-delay:0.15s]">
            <Tag color="amber" pulse>The end-to-end packaging partner</Tag>
          </div>
          <h1 className="text-[clamp(42px,5.2vw,64px)] font-extrabold leading-[1.05] tracking-[-0.03em] mb-6 opacity-0 animate-slide-up [animation-delay:0.3s]">
            Packaging that <em className="font-fraunces font-normal italic text-supplied-amber-bright">grows</em> your brand, not your headaches
          </h1>
          <p className="text-[17px] text-white/50 leading-[1.7] mb-10 opacity-0 animate-slide-up [animation-delay:0.45s]">
            We partner with fast-growing consumer brands to design, source, and deliver sustainable packaging that drives retention, cuts cost, and scales with you.
          </p>
          <div className="flex flex-wrap gap-3 mb-14 opacity-0 animate-slide-up [animation-delay:0.6s]">
            <Button variant="fill-amber" size="lg" href="/contact-us" icon>
              Start a Project
            </Button>
            <Button variant="outline-light" size="lg" href="https://supplied.agency/client-stories/" target="_blank">
              See Client Stories
            </Button>
          </div>
          <div className="flex items-center gap-4 opacity-0 animate-slide-up [animation-delay:0.75s]">
            <div className="flex">
              <span className="w-9 h-9 rounded-full border-[2.5px] border-supplied-ink flex items-center justify-center text-xs font-bold bg-[#3B82F6] relative z-40">W</span>
              <span className="w-9 h-9 rounded-full border-[2.5px] border-supplied-ink flex items-center justify-center text-xs font-bold bg-[#EC4899] -ml-2 relative z-30">T</span>
              <span className="w-9 h-9 rounded-full border-[2.5px] border-supplied-ink flex items-center justify-center text-xs font-bold bg-[#10B981] -ml-2 relative z-20">H</span>
              <span className="w-9 h-9 rounded-full border-[2.5px] border-supplied-ink flex items-center justify-center text-xs font-bold bg-supplied-amber -ml-2 relative z-10">G</span>
            </div>
            <p className="text-[13px] text-white/35 leading-[1.45]">
              <strong className="text-white/70 font-semibold">Wild, TRIP, Healf, Glaize</strong><br />
              & 50+ fast-growing brands trust Supplied
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 opacity-0 animate-fade-scale [animation-delay:0.5s] max-w-[400px] lg:max-w-none mx-auto lg:mx-0">
          <HeroCard value="98%" label="On-Time Delivery" />
          <HeroCard value="23%" label="Avg Cost Saving" />
          <HeroCard value="200+" label="Projects Managed" />
          <HeroCard value="30+" label="Global Suppliers" />
        </div>
      </Container>
    </section>
  );
}

function HeroCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white/4 border border-white/7 rounded-[24px] p-7 text-center backdrop-blur-md transition-all duration-400 ease-supplied hover:bg-white/7 hover:border-supplied-amber/20 hover:-translate-y-1">
      <div className="text-[38px] font-extrabold bg-gradient-to-br from-supplied-amber-bright to-supplied-amber bg-clip-text text-transparent leading-none mb-1.5">
        {value}
      </div>
      <div className="text-[11px] text-white/35 uppercase tracking-[1.5px] font-medium">
        {label}
      </div>
    </div>
  );
}
