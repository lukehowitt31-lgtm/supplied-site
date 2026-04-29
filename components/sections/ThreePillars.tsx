import React from "react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { AccentHeading } from "@/components/ui/AccentHeading";

interface ThreePillar {
  title: string;
  body: string;
  counterpoint?: string;
}

interface ThreePillarsContent {
  heading: string;
  intro: string;
  closingLine: string;
  pillars: ThreePillar[];
}

interface ThreePillarsProps {
  content: ThreePillarsContent;
}

export function ThreePillars({ content }: ThreePillarsProps) {
  return (
    <section className="relative overflow-hidden bg-supplied-bg py-20 md:py-[88px] text-supplied-ink">
      {/* Subtle ambient amber wash — keeps visual interest without shouting */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(780px 420px at 12% 0%, rgba(200,119,62,0.08), transparent 60%), radial-gradient(620px 400px at 92% 100%, rgba(200,119,62,0.05), transparent 65%)",
        }}
      />
      {/* Top + bottom hairlines */}
      <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-supplied-ink-10 to-transparent" />
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-supplied-ink-10 to-transparent" />

      <Container>
        {/* Header — left-aligned editorial frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-4 mb-10 lg:mb-12">
          <Reveal className="lg:col-span-7">
            <Tag color="amber" className="mb-4">Three pillars</Tag>
            <AccentHeading
              as="h2"
              text={content.heading}
              className="text-[clamp(30px,3.6vw,44px)] font-extrabold leading-[1.08] tracking-[-0.025em] text-supplied-ink"
              accentClassName="text-supplied-amber"
            />
          </Reveal>
          <Reveal className="lg:col-span-5 lg:pt-2">
            <p className="text-[15px] md:text-[16px] text-supplied-ink-60 leading-[1.7] max-w-[460px]">
              {content.intro}
            </p>
          </Reveal>
        </div>

        {/* Pillars rail */}
        <div className="relative">
          {/* Vertical amber hairline connecting the numerals */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[24px] sm:left-[34px] top-4 bottom-4 w-px bg-gradient-to-b from-supplied-amber/0 via-supplied-amber/40 to-supplied-amber/0 hidden md:block"
          />

          {content.pillars.map((pillar, index) => {
            const isLast = index === content.pillars.length - 1;
            return (
              <Reveal
                key={`${pillar.title}-${index}`}
                className={`relative ${isLast ? "" : "border-b border-supplied-ink-10"}`}
              >
                <article className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-3 py-7 md:py-9">
                  {/* Numeral */}
                  <div className="md:col-span-2 flex md:block items-center">
                    <div
                      className="leading-none text-supplied-amber/80 select-none"
                      style={{
                        fontFamily: "'Fraunces',serif",
                        fontStyle: "italic",
                        fontSize: "clamp(52px, 6.4vw, 92px)",
                        fontWeight: 500,
                        letterSpacing: "-0.03em",
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    {/* Dot on the rail — anchors the hairline */}
                    <div
                      aria-hidden
                      className="hidden md:block absolute left-[18px] sm:left-[28px] w-[12px] h-[12px] rounded-full bg-supplied-amber ring-4 ring-supplied-bg"
                      style={{ top: "50%", transform: "translateY(-50%)" }}
                    />
                  </div>

                  {/* Title + body */}
                  <div className="md:col-span-6">
                    <h3 className="text-[clamp(20px,2vw,24px)] font-extrabold text-supplied-ink leading-[1.2] tracking-[-0.015em] mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-[14px] md:text-[15px] text-supplied-ink-60 leading-[1.7] max-w-[540px]">
                      {pillar.body}
                    </p>
                  </div>

                  {/* Counterpoint rail */}
                  {pillar.counterpoint ? (
                    <div className="md:col-span-4 md:pl-6 md:border-l md:border-supplied-amber/25">
                      <div className="text-[10px] font-semibold tracking-[0.18em] uppercase text-supplied-amber mb-1.5">
                        The trade-off
                      </div>
                      <p
                        className="italic text-supplied-amber leading-[1.45] text-[15px] md:text-[16px] max-w-[320px]"
                        style={{ fontFamily: "'Fraunces',serif" }}
                      >
                        {pillar.counterpoint}
                      </p>
                    </div>
                  ) : null}
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* Closing statement */}
        {content.closingLine ? (
          <Reveal className="mt-10 md:mt-14 text-center">
            <div className="flex flex-col items-center">
              <span
                aria-hidden
                className="block w-1.5 h-1.5 rotate-45 bg-supplied-amber mb-4"
              />
              <p
                className="italic text-supplied-ink leading-[1.35] max-w-[640px] text-[clamp(20px,2.1vw,26px)]"
                style={{ fontFamily: "'Fraunces',serif", fontWeight: 400 }}
              >
                {content.closingLine}
              </p>
            </div>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
