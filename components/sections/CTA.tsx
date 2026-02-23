import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CTA() {
  return (
    <section className="py-[120px] bg-supplied-ink text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_50%_50%,rgba(232,121,28,0.06),transparent_60%)] pointer-events-none" />
      
      <Container className="relative z-10 max-w-[600px]">
        <Reveal>
          <h2 className="text-[clamp(36px,4.5vw,52px)] font-bold text-white leading-[1.1] mb-[18px] tracking-[-0.03em]">
            Ready to <em className="font-fraunces font-normal italic text-supplied-amber-bright">upgrade</em> your packaging?
          </h2>
          <p className="text-[17px] text-white/40 leading-[1.65] mb-9">
            Let's talk about how Supplied can become your end-to-end partner — saving time, money, and the headache.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Button variant="fill-amber" size="lg" href="/contact-us" icon>
              Start a Project
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
