import React from "react";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { AccentHeading } from "@/components/ui/AccentHeading";

interface WinCardData {
  label: string;
  title: string;
  body: string;
  stat: string;
  statCaption: string;
}

interface MechanismStepData {
  step: string;
  title: string;
  body: string;
}

interface HowWerePaidContent {
  tag: string;
  heading: string;
  intro: string;
  yourWin: WinCardData;
  ourWin: WinCardData;
  mechanism: MechanismStepData[];
  closingLine: string;
}

interface HowWerePaidProps {
  content: HowWerePaidContent;
}

export function HowWerePaid({ content }: HowWerePaidProps) {
  return (
    <section className="py-[120px] bg-supplied-ink relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_15%,rgba(232,121,28,0.10),transparent_65%)] pointer-events-none" />

      <Container className="relative z-10" narrow>
        <Reveal className="text-center mb-14">
          <Tag color="amber" pulse className="mb-5">
            {content.tag}
          </Tag>
          <AccentHeading
            as="h2"
            text={content.heading}
            className="text-[clamp(34px,4.4vw,52px)] font-extrabold text-white leading-[1.08] tracking-[-0.03em] mb-5"
            accentClassName="text-supplied-amber"
          />
          <p className="text-[17px] md:text-[18px] text-white/70 leading-[1.7]">
            {content.intro}
          </p>
        </Reveal>
      </Container>

      <Container className="relative z-10">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7 mb-14">
            <WinCardBlock data={content.yourWin} accent="client" />
            <WinCardBlock data={content.ourWin} accent="supplied" />
          </div>
        </Reveal>

        {content.mechanism.length > 0 ? (
          <Reveal>
            <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-8 md:p-10 backdrop-blur-[2px]">
              <div className="text-center mb-8">
                <span className="text-[10.5px] font-semibold uppercase tracking-[2px] text-white/45">
                  How the model works
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                {content.mechanism.map((step, idx) => (
                  <div key={`${step.step}-${idx}`} className="relative">
                    <span
                      className="block text-[28px] md:text-[32px] font-medium text-supplied-amber mb-3 leading-none tracking-[-0.02em]"
                      style={{ fontFamily: "'Fraunces',serif" }}
                    >
                      {step.step}
                    </span>
                    <h4 className="text-[16px] md:text-[17px] font-semibold text-white mb-2 tracking-[-0.01em] leading-[1.3]">
                      {step.title}
                    </h4>
                    <p className="text-[14px] text-white/55 leading-[1.65]">
                      {step.body}
                    </p>
                    {idx < content.mechanism.length - 1 ? (
                      <div
                        aria-hidden
                        className="hidden md:block absolute top-2 -right-5 w-[1px] h-[80%] bg-gradient-to-b from-transparent via-white/12 to-transparent"
                      />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ) : null}

        {content.closingLine ? (
          <Reveal className="text-center max-w-[720px] mx-auto mt-12">
            <p
              className="text-[16px] italic text-white/55 leading-[1.7]"
              style={{ fontFamily: "'Fraunces',serif" }}
            >
              {content.closingLine}
            </p>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}

interface WinCardBlockProps {
  data: WinCardData;
  accent: "client" | "supplied";
}

function WinCardBlock({ data, accent }: WinCardBlockProps) {
  const isClient = accent === "client";
  return (
    <div
      className={`group relative rounded-[24px] border bg-white/[0.025] p-8 md:p-10 transition-all duration-300 ease-supplied hover:-translate-y-0.5 ${
        isClient
          ? "border-supplied-amber/30 hover:border-supplied-amber/60"
          : "border-white/10 hover:border-white/25"
      }`}
    >
      {isClient ? (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[24px] opacity-60 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(232,121,28,0.08), transparent 60%)",
          }}
        />
      ) : null}

      <div className="relative">
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-[10.5px] font-semibold uppercase tracking-[1.6px] mb-5 ${
            isClient
              ? "bg-supplied-amber-10 text-supplied-amber"
              : "bg-white/8 text-white/70"
          }`}
        >
          {data.label}
        </span>
        <h3 className="text-[22px] md:text-[26px] font-extrabold text-white leading-[1.2] tracking-[-0.015em] mb-4">
          {data.title}
        </h3>
        <p className="text-[15px] text-white/65 leading-[1.7] mb-7">
          {data.body}
        </p>
        <div className="flex items-baseline gap-3 pt-5 border-t border-white/10">
          <span
            className={`text-[40px] md:text-[44px] font-medium leading-none tracking-[-0.02em] ${
              isClient ? "text-supplied-amber" : "text-white/85"
            }`}
            style={{ fontFamily: "'Fraunces',serif" }}
          >
            {data.stat}
          </span>
          <span className="text-[11.5px] text-white/50 uppercase tracking-[1.4px] font-semibold leading-tight">
            {data.statCaption}
          </span>
        </div>
      </div>
    </div>
  );
}
