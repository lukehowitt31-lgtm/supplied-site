import React from "react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Product } from "@/types";
import { Reveal } from "@/components/ui/Reveal";

interface ProductSpecsProps {
  product: Product;
}

export function ProductSpecs({ product }: ProductSpecsProps) {
  return (
    <>
      {/* Features Section */}
      <section className="py-[100px] bg-white">
        <Container>
          <Reveal className="text-center max-w-[580px] mx-auto mb-14">
            <Tag color="amber">Why {product.name.toLowerCase()}</Tag>
            <h2 className="text-[clamp(28px,3.2vw,40px)] font-bold leading-[1.1] tracking-[-0.02em] mt-3.5 mb-3.5 text-supplied-ink">
              Premium packaging that <em className="font-fraunces font-normal italic">commands</em> attention
            </h2>
            <p className="text-[15px] text-supplied-ink-40 leading-[1.65]">
              {product.shortDescription}. The weight, the feel, the reveal — perfect for brands that want packaging to match product quality.
            </p>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {product.features.map((feature, i) => (
              <Reveal key={i} className="p-8 bg-supplied-bg border border-supplied-ink-05 rounded-3xl transition-all duration-400 ease-supplied relative overflow-hidden group hover:-translate-y-1 hover:shadow-supplied-lg hover:border-transparent">
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-supplied-amber transform scale-x-0 origin-left transition-transform duration-500 ease-supplied group-hover:scale-x-100" />
                <div className="w-11 h-11 rounded-xl bg-supplied-amber-10 flex items-center justify-center text-xl mb-4">
                  ✨
                </div>
                <h3 className="text-[15.5px] font-semibold mb-1.5 text-supplied-ink">{feature}</h3>
                <p className="text-[13px] text-supplied-ink-40 leading-[1.6]">
                  Engineered for performance and aesthetics.
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Technical Specs Section */}
      <section className="py-[100px] bg-supplied-bg">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <Reveal>
              <Tag color="amber">Styles</Tag>
              <div className="mt-3.5">
                <h2 className="text-[clamp(28px,3.2vw,40px)] font-bold leading-[1.1] tracking-[-0.02em] mb-4.5 text-supplied-ink">
                  Built to your <em className="font-fraunces font-normal italic">exact</em> requirements
                </h2>
                <p className="text-[15px] text-supplied-ink-40 leading-[1.7] mb-7">
                  Every {product.name.toLowerCase()} is engineered from scratch for your product, brand identity, and customer experience.
                </p>
                <div className="flex flex-col gap-3">
                  {product.facts.map((fact, i) => (
                    <div key={i} className="flex gap-3 items-start p-4 bg-white border border-supplied-ink-10 rounded-2xl transition-all duration-300 ease-supplied hover:border-supplied-amber/15 hover:shadow-supplied-sm">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-supplied-amber mt-[7px]" />
                      <div>
                        <h4 className="text-sm font-semibold mb-0.5 text-supplied-ink">{fact}</h4>
                        <p className="text-[13px] text-supplied-ink-40 leading-[1.5]">Key benefit for your brand.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal className="bg-supplied-ink rounded-[32px] p-10 text-white relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-[180px] h-[180px] bg-[radial-gradient(circle,rgba(232,121,28,0.1),transparent_70%)] pointer-events-none" />
              <h3 className="text-[19px] font-bold mb-5 relative z-10">Technical Specifications</h3>
              <div className="relative z-10">
                {product.detailedSpecs.map((spec, i) => (
                  <SpecRow key={i} label={spec.label} value={spec.value} />
                ))}
              </div>
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-[13px] border-b border-white/6 last:border-0">
      <span className="text-[13px] text-white/40">{label}</span>
      <span className="text-[13px] font-semibold text-white text-right">{value}</span>
    </div>
  );
}
