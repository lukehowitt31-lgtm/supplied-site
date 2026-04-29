import React from "react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { AccentHeading } from "@/components/ui/AccentHeading";

interface WhoWeWorkWithContent {
  heading: string;
  intro: string;
  bullets: string[];
  closingLine: string;
}

interface WhoWeWorkWithProps {
  content: WhoWeWorkWithContent;
}

export function WhoWeWorkWith({ content }: WhoWeWorkWithProps) {
  return (
    <section className="py-[100px] bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-supplied-ink-10 to-transparent" />
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-start">
          <Reveal className="lg:sticky lg:top-32">
            <Tag color="ink" className="mb-4">Who we work with</Tag>
            <AccentHeading
              as="h2"
              text={content.heading}
              className="text-[clamp(32px,3.8vw,46px)] font-extrabold leading-[1.1] tracking-[-0.025em] mb-5 text-supplied-ink"
              accentClassName="text-supplied-amber"
            />
            <p className="text-[17px] text-supplied-ink-60 leading-[1.7] max-w-[460px]">
              {content.intro}
            </p>
          </Reveal>

          <Reveal delay={80}>
            <div className="rounded-2xl border border-supplied-ink-10 bg-supplied-bg p-8 md:p-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-supplied-amber mb-5">
                You're in the right room if you're
              </p>
              <ul className="flex flex-col gap-4">
                {content.bullets.map((bullet, index) => (
                  <li key={index} className="flex gap-3.5 items-start">
                    <div className="flex-shrink-0 w-[26px] h-[26px] rounded-full bg-supplied-amber/12 text-supplied-amber flex items-center justify-center text-[13px] font-bold mt-0.5">
                      ✓
                    </div>
                    <p className="text-[15px] text-supplied-ink leading-[1.55]">
                      {bullet}
                    </p>
                  </li>
                ))}
              </ul>

              {content.closingLine ? (
                <div className="mt-8 pt-6 border-t border-supplied-ink-10">
                  <p
                    className="text-[15px] italic text-supplied-ink-60 leading-[1.7]"
                    style={{ fontFamily: "'Fraunces',serif" }}
                  >
                    {content.closingLine}
                  </p>
                </div>
              ) : null}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
