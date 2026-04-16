"use client";

import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { AccentHeading } from "@/components/ui/AccentHeading";
import { Tag } from "@/components/ui/Tag";

interface MerchHeroProps {
  content: {
    heading: string;
    subheading: string;
    ctaLabel: string;
    ctaHref: string;
    image: { src: string; alt: string };
  };
}

export function MerchHero({ content }: MerchHeroProps) {
  return (
    <section className="relative bg-supplied-ink pt-[140px] pb-[100px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />

      <Container>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <Reveal>
              <Tag color="amber" pulse className="mb-6">
                Custom Merch
              </Tag>
              <AccentHeading
                as="h1"
                text={content.heading}
                className="text-[clamp(36px,4.5vw,56px)] font-extrabold leading-[1.06] tracking-[-0.03em] mb-6 text-white"
                accentClassName="text-supplied-amber"
              />
              <p className="text-[17px] text-white/60 leading-[1.7] max-w-[520px] mb-8">
                {content.subheading}
              </p>
              <div className="flex flex-wrap gap-3">
                <Button
                  href={content.ctaHref}
                  variant="fill-amber"
                  size="lg"
                  icon
                >
                  {content.ctaLabel}
                </Button>
                <Button href="#cosmetic-bags" variant="outline-light" size="lg">
                  Explore Categories
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150}>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-supplied-ink-80">
              <Image
                src={content.image.src}
                alt={content.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
