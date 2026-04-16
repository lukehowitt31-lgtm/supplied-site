"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { AccentHeading } from "@/components/ui/AccentHeading";
import type { FAQItem } from "@/types/merch";

interface MerchFAQProps {
  items: FAQItem[];
}

export function MerchFAQ({ items }: MerchFAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-[100px] bg-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-supplied-ink-10 to-transparent" />

      <Container narrow>
        <div className="text-center mb-14">
          <Reveal>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase text-supplied-amber mb-5">
              <span className="w-1.5 h-1.5 bg-supplied-amber rounded-full" />
              FAQ
            </div>
            <AccentHeading
              as="h2"
              text="Common |Questions"
              className="text-[clamp(34px,4.2vw,52px)] font-extrabold leading-[1.08] tracking-[-0.03em] mb-[18px] text-supplied-ink"
              accentClassName="text-supplied-amber"
            />
          </Reveal>
        </div>

        <div className="space-y-3">
          {items.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <Reveal key={item.question} delay={index * 50}>
                <div className="rounded-xl border border-supplied-ink-10 overflow-hidden transition-colors duration-300 hover:border-supplied-ink-20">
                  <button
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[15px] font-semibold text-supplied-ink leading-[1.4] pr-4">
                      {item.question}
                    </span>
                    <span
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "bg-supplied-amber text-white rotate-45"
                          : "bg-supplied-ink-05 text-supplied-ink-40"
                      }`}
                    >
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        className="w-4 h-4"
                      >
                        <path d="M8 3v10M3 8h10" />
                      </svg>
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-supplied ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 pb-5">
                        <p className="text-[15px] text-supplied-ink-60 leading-[1.7]">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
