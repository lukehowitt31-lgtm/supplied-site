"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AccentHeading } from "@/components/ui/AccentHeading";
import type { MerchCategory } from "@/types/merch";

interface MerchCategoryGridProps {
  categories: MerchCategory[];
}

export function MerchCategoryGrid({ categories }: MerchCategoryGridProps) {
  return (
    <section className="py-[100px] bg-supplied-bg relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-supplied-ink-10 to-transparent" />

      <Container>
        <div className="text-center mb-14">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase text-supplied-amber mb-5">
              <span className="w-1.5 h-1.5 bg-supplied-amber rounded-full" />
              What we source
            </div>
            <AccentHeading
              as="h2"
              text="Everything Beyond the |Box"
              className="text-[clamp(34px,4.2vw,52px)] font-extrabold leading-[1.08] tracking-[-0.03em] mb-[18px] text-supplied-ink"
              accentClassName="text-supplied-amber"
            />
            <p className="text-[17px] text-supplied-ink-40 leading-[1.6] max-w-[560px] mx-auto">
              From cosmetic bags to custom apparel, we source branded merchandise through the same vetted supply chain we use for packaging.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category, index) => (
            <Reveal key={category.anchorId} delay={index * 50}>
              <a
                href={`#${category.anchorId}`}
                className="group relative flex flex-col rounded-2xl overflow-hidden bg-white h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-supplied-lg"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F3F0]">
                  <Image
                    src={category.image.src}
                    alt={category.image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-[15px] font-bold text-supplied-ink leading-[1.25] tracking-[-0.01em] mb-2 group-hover:text-supplied-amber transition-colors duration-300">
                    {category.name}
                  </h3>
                  <p className="text-[13px] text-supplied-ink-40 leading-[1.6] flex-1">
                    {category.shortDescription}
                  </p>
                  <span className="mt-3 text-[12px] font-semibold text-supplied-amber opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    Learn more ↓
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
