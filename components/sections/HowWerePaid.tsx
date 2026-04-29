import React from "react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { AccentHeading } from "@/components/ui/AccentHeading";

interface HowWerePaidContent {
  heading: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  closingLine: string;
}

interface HowWerePaidProps {
  content: HowWerePaidContent;
}

export function HowWerePaid({ content }: HowWerePaidProps) {
  return (
    <section className="py-[120px] bg-supplied-ink relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,rgba(232,121,28,0.08),transparent_60%)] pointer-events-none" />
      <Container className="relative z-10" narrow>
        <Reveal className="text-center mb-12">
          <Tag color="amber" pulse className="mb-5">Pricing model</Tag>
          <AccentHeading
            as="h2"
            text={content.heading}
            className="text-[clamp(34px,4.4vw,52px)] font-extrabold text-white leading-[1.08] tracking-[-0.03em] mb-2"
            accentClassName="text-supplied-amber"
          />
        </Reveal>

        <Reveal className="flex flex-col gap-6">
          <p className="text-[17px] text-white/75 leading-[1.75]">
            {content.paragraph1}
          </p>
          <p className="text-[17px] text-white/75 leading-[1.75]">
            {content.paragraph2}
          </p>
          <p className="text-[17px] text-white/75 leading-[1.75]">
            {content.paragraph3}
          </p>

          {content.closingLine ? (
            <div className="mt-4 pt-8 border-t border-white/10">
              <p
                className="text-[16px] italic text-white/60 leading-[1.7]"
                style={{ fontFamily: "'Fraunces',serif" }}
              >
                {content.closingLine}
              </p>
            </div>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
