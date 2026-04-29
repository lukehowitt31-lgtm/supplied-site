import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { AccentHeading } from "@/components/ui/AccentHeading";

interface CtaLink {
  label: string;
  href: string;
}

interface FounderQuote {
  text: string;
  name: string;
  role: string;
}

interface CtaContent {
  heading: string;
  body: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
  founderQuote?: FounderQuote;
}

interface CtaProps {
  content?: CtaContent;
}

const fallbackContent: CtaContent = {
  heading: "Tell us what you're shipping.",
  body: "Current spec, current spend, current headaches. We'll tell you — honestly — whether we're the right partner for where you are.",
  primaryCta: {
    label: "See if we'd save you money",
    href: "/packaging-cost-audit",
  },
  secondaryCta: {
    label: "Start a project",
    href: "/contact-us",
  },
  founderQuote: {
    text: "We'd rather tell you we're not the right fit than pretend we are. Most packaging relationships break because somebody oversold on day one. We don't.",
    name: "Luke Howitt",
    role: "Co-Founder",
  },
};

export function CTA({ content }: CtaProps) {
  const sectionContent = content ?? fallbackContent;

  return (
    <section className="py-[120px] bg-supplied-ink text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_50%_50%,rgba(232,121,28,0.06),transparent_60%)] pointer-events-none" />

      <Container className="relative z-10 max-w-[680px]">
        <Reveal>
          <AccentHeading
            as="h2"
            text={sectionContent.heading}
            className="text-[clamp(36px,4.5vw,52px)] font-extrabold text-white leading-[1.1] mb-[18px] tracking-[-0.03em]"
            accentClassName="text-supplied-amber"
          />
          <p className="text-[17px] text-white/60 leading-[1.65] mb-9">
            {sectionContent.body}
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Button
              variant="fill-amber"
              size="lg"
              href={sectionContent.primaryCta.href}
              icon
            >
              {sectionContent.primaryCta.label}
            </Button>
            {sectionContent.secondaryCta ? (
              <Button
                variant="outline-light"
                size="lg"
                href={sectionContent.secondaryCta.href}
              >
                {sectionContent.secondaryCta.label}
              </Button>
            ) : null}
          </div>

          {sectionContent.founderQuote?.text ? (
            <div className="mt-14 pt-10 border-t border-white/10 max-w-[560px] mx-auto">
              <p
                className="text-[19px] italic text-white/80 leading-[1.55] mb-4"
                style={{ fontFamily: "'Fraunces',serif" }}
              >
                &ldquo;{sectionContent.founderQuote.text}&rdquo;
              </p>
              <p className="text-[13px] text-white/50 tracking-[0.04em]">
                &mdash; <span className="font-semibold text-white/80">{sectionContent.founderQuote.name}</span>
                {sectionContent.founderQuote.role ? `, ${sectionContent.founderQuote.role}` : null}
              </p>
            </div>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
