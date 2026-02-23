import React from "react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Product } from "@/types";
import { Button } from "@/components/ui/Button";

interface ProductDetailHeroProps {
  product: Product;
}

export function ProductDetailHero({ product }: ProductDetailHeroProps) {
  return (
    <section className="bg-supplied-ink text-white pt-[24px] pb-[100px] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_65%_30%,rgba(232,121,28,0.06),transparent_60%)] pointer-events-none" />
      <Container>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
          <div className="max-w-[560px]">
            <div className="mb-5 flex gap-3 animate-slide-up opacity-0 [animation-delay:0.1s]">
              <Tag color="amber" pulse>supplied.agency/{product.slug}</Tag>
            </div>
            <h1 className="text-[clamp(36px,4.2vw,52px)] font-bold leading-[1.06] tracking-[-0.03em] mb-5 animate-slide-up opacity-0 [animation-delay:0.2s]">
              {product.name}
            </h1>
            <p className="text-[16.5px] text-white/45 leading-[1.7] mb-9 animate-slide-up opacity-0 [animation-delay:0.3s]">
              {product.description}
            </p>
            <div className="flex flex-wrap gap-3 animate-slide-up opacity-0 [animation-delay:0.4s]">
              <Button variant="fill-amber" size="lg" href="/contact-us" icon>
                Get a Free Quote
              </Button>
              <Button variant="outline-light" size="lg" href="/contact-us">
                Request Samples
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3.5 animate-fade-scale opacity-0 [animation-delay:0.5s] max-w-[400px] lg:max-w-none mx-auto lg:mx-0">
            {product.heroStats.map((stat, i) => (
              <div key={i} className="bg-white/4 border border-white/7 rounded-2xl p-6 text-center backdrop-blur-md transition-all duration-400 ease-supplied hover:bg-white/7 hover:border-supplied-amber/20">
                <div className="text-[30px] font-extrabold bg-gradient-to-br from-supplied-amber-bright to-supplied-amber bg-clip-text text-transparent leading-none mb-1">
                  {stat.val}
                </div>
                <div className="text-[10px] text-white/35 uppercase tracking-[1.2px] font-medium">
                  {stat.lbl}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
