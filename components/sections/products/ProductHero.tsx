import React from "react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";

export function ProductHero() {
  return (
    <section className="bg-supplied-ink text-white pt-[180px] pb-[100px] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_20%,rgba(232,121,28,0.07)_0%,transparent_60%),radial-gradient(ellipse_40%_60%_at_15%_80%,rgba(232,121,28,0.04)_0%,transparent_50%)] pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`
        }}
      />
      <Container className="relative z-10 text-center max-w-[800px]">
        <div className="mb-8 animate-slide-up opacity-0 [animation-delay:0.1s]">
          <Tag color="amber">Our Products</Tag>
        </div>
        <h1 className="text-[clamp(42px,5vw,64px)] font-extrabold leading-[1.05] tracking-[-0.03em] mb-6 animate-slide-up opacity-0 [animation-delay:0.2s]">
          Every material, every format. <br/>
          <em className="font-fraunces font-normal italic text-supplied-amber-bright">Sourced</em> for you.
        </h1>
        <p className="text-[18px] text-white/50 leading-[1.7] max-w-[600px] mx-auto animate-slide-up opacity-0 [animation-delay:0.3s]">
          Explore our range of sustainable packaging solutions. From custom mailers to premium rigid boxes, we manage the entire supply chain.
        </p>
      </Container>
    </section>
  );
}
