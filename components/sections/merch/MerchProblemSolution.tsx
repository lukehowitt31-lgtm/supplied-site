"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AccentHeading } from "@/components/ui/AccentHeading";

interface MerchProblemSolutionProps {
  content: {
    problemHeading: string;
    problemBody: string;
    solutionHeading: string;
    solutionBody: string;
  };
}

export function MerchProblemSolution({ content }: MerchProblemSolutionProps) {
  return (
    <section className="py-[100px] bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-supplied-ink-10 to-transparent" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Problem */}
          <Reveal>
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-red-400/60 to-red-400/10" />
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase text-red-500/70 mb-5">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full" />
                The problem
              </div>
              <AccentHeading
                as="h2"
                text={content.problemHeading}
                className="text-[clamp(28px,3.5vw,40px)] font-extrabold leading-[1.12] tracking-[-0.02em] mb-5 text-supplied-ink"
                accentClassName="text-red-500"
              />
              <p className="text-[16px] text-supplied-ink-60 leading-[1.75]">
                {content.problemBody}
              </p>
            </div>
          </Reveal>

          {/* Solution */}
          <Reveal delay={150}>
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-supplied-amber/60 to-supplied-amber/10" />
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase text-supplied-amber mb-5">
                <span className="w-1.5 h-1.5 bg-supplied-amber rounded-full" />
                The solution
              </div>
              <AccentHeading
                as="h2"
                text={content.solutionHeading}
                className="text-[clamp(28px,3.5vw,40px)] font-extrabold leading-[1.12] tracking-[-0.02em] mb-5 text-supplied-ink"
                accentClassName="text-supplied-amber"
              />
              <p className="text-[16px] text-supplied-ink-60 leading-[1.75]">
                {content.solutionBody}
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
