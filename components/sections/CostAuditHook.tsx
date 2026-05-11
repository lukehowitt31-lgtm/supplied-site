import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { AccentHeading } from "@/components/ui/AccentHeading";

interface CostAuditHookContent {
  heading: string;
  paragraph1: string;
  paragraph2: string;
  cta: {
    label: string;
    href: string;
  };
  factChips: { value: string; label: string }[];
  image: {
    src: string;
    alt: string;
  };
}

interface CostAuditHookProps {
  content: CostAuditHookContent;
}

export function CostAuditHook({ content }: CostAuditHookProps) {
  return (
    <section className="py-[100px] bg-supplied-bg">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] border border-supplied-ink-10 bg-white shadow-sm p-8 md:p-12 lg:p-14">
            <div
              className="pointer-events-none absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full opacity-[0.08]"
              style={{
                background:
                  "radial-gradient(circle, rgba(200,119,62,0.9) 0%, transparent 70%)",
              }}
            />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-12 items-center">
              <div>
                <Tag color="amber" className="mb-5">Free packaging cost audit</Tag>
                <AccentHeading
                  as="h2"
                  text={content.heading}
                  className="text-[clamp(28px,3.4vw,40px)] font-extrabold text-supplied-ink leading-[1.12] tracking-[-0.025em] mb-5"
                  accentClassName="text-supplied-amber"
                />
                <p className="text-[15px] md:text-[16px] text-supplied-ink-60 leading-[1.7] mb-3">
                  {content.paragraph1}
                </p>
                <p className="text-[15px] md:text-[16px] text-supplied-ink-60 leading-[1.7] mb-7">
                  {content.paragraph2}
                </p>

                <ul className="flex flex-wrap gap-x-5 gap-y-3 mb-7">
                  {content.factChips.map((chip) => (
                    <li
                      key={chip.label}
                      className="flex items-baseline gap-2 text-[13px]"
                    >
                      <span
                        className="font-medium text-supplied-amber tracking-[-0.01em] text-[16px] leading-none"
                        style={{ fontFamily: "'Fraunces',serif" }}
                      >
                        {chip.value}
                      </span>
                      <span className="text-supplied-ink-40 uppercase tracking-[0.08em] text-[10.5px] font-semibold">
                        {chip.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button variant="fill-amber" size="lg" href={content.cta.href} icon>
                  {content.cta.label}
                </Button>
              </div>

              <div className="relative">
                <div
                  aria-hidden
                  className="absolute inset-0 -m-6 rounded-[24px] bg-supplied-bg/80"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(200,119,62,0.06) 0%, rgba(250,249,246,0) 70%)",
                  }}
                />
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={content.image.src}
                    alt={content.image.alt}
                    fill
                    sizes="(min-width: 1024px) 520px, 100vw"
                    className="object-contain"
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
