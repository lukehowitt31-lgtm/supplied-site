"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Product } from "@/types";
import { Button } from "@/components/ui/Button";

const ProductModelViewer = dynamic(
  () => import("@/components/ui/ProductModelViewer").then((mod) => mod.ProductModelViewer),
  { ssr: false }
);

interface ProductDetailHeroProps {
  product: Product;
}

export function ProductDetailHero({ product }: ProductDetailHeroProps) {
  return (
    <section className="bg-supplied-ink text-white pt-[48px] pb-[100px] relative overflow-hidden">
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
          
          <div className="flex flex-col gap-5 animate-fade-scale opacity-0 [animation-delay:0.5s] max-w-[400px] lg:max-w-none mx-auto lg:mx-0">
            {product.modelUrl && (
              <div className="relative flex items-center justify-center">
                {/* Orange glow effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] pointer-events-none opacity-25">
                  <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-supplied-amber blur-[100px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '8s' }} />
                  <div className="absolute bottom-[20%] right-[20%] w-[60%] h-[60%] bg-[#C96510] blur-[120px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }} />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-[#FF8C2A] blur-[80px] rounded-full mix-blend-screen animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
                </div>

                {/* Logo watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] opacity-[0.07] pointer-events-none z-0">
                  <img src="/Supplied Icon Orange.svg" alt="" className="w-full h-full object-contain" />
                </div>

                <div className="relative z-10 w-full aspect-square max-h-[480px]">
                  <ProductModelViewer url={product.modelUrl} />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3.5">
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
        </div>
      </Container>
    </section>
  );
}
