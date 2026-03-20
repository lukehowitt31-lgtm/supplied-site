import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { AccentHeading } from "@/components/ui/AccentHeading";

interface CtaContent {
  heading: string;
  body: string;
  primaryCta: {
    label: string;
    href: string;
  };
}

interface CtaProps {
  content?: CtaContent;
}

const fallbackContent: CtaContent = {
  heading: "Ready to upgrade your packaging?",
  body: "Let's talk about how Supplied can become your end-to-end partner — saving time, money, and the headache.",
  primaryCta: {
    label: "Start a Project",
    href: "/contact-us",
  },
};

export function CTA({ content }: CtaProps) {
  const sectionContent = content ?? fallbackContent;

  return (
    <section className="py-[120px] bg-supplied-ink text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_50%_50%,rgba(232,121,28,0.06),transparent_60%)] pointer-events-none" />
      
      <Container className="relative z-10 max-w-[600px]">
        <Reveal>
          <AccentHeading
            as="h2"
            text={sectionContent.heading}
            className="text-[clamp(36px,4.5vw,52px)] font-extrabold text-white leading-[1.1] mb-[18px] tracking-[-0.03em]"
            accentClassName="text-supplied-amber"
          />
          <p className="text-[17px] text-white/40 leading-[1.65] mb-9">
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
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
