"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { AccentHeading } from "@/components/ui/AccentHeading";

interface MerchCTAProps {
  content: {
    heading: string;
    body: string;
    ctaLabel: string;
    ctaHref: string;
  };
}

export function MerchCTA({ content }: MerchCTAProps) {
  return (
    <section className="py-[100px] bg-supplied-bg relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-supplied-ink-10 to-transparent" />

      <Container narrow>
        <Reveal>
          <div className="bg-supplied-ink rounded-2xl p-10 lg:p-16 text-center">
            <AccentHeading
              as="h2"
              text={content.heading}
              className="text-[clamp(28px,3.5vw,42px)] font-extrabold leading-[1.1] tracking-[-0.02em] mb-5 text-white"
              accentClassName="text-supplied-amber"
            />
            <p className="text-[17px] text-white/55 leading-[1.7] max-w-[520px] mx-auto mb-8">
              {content.body}
            </p>
            <Button
              href={content.ctaHref}
              variant="fill-amber"
              size="lg"
              icon
            >
              {content.ctaLabel}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
