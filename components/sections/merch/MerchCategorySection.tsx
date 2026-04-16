"use client";

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import type { MerchCategory } from "@/types/merch";

interface MerchCategorySectionProps {
  category: MerchCategory;
  flipped?: boolean;
}

export function MerchCategorySection({
  category,
  flipped = false,
}: MerchCategorySectionProps) {
  const headingId = `heading-${category.anchorId}`;

  return (
    <section
      id={category.anchorId}
      aria-labelledby={headingId}
      className="py-[80px] scroll-mt-[100px] relative even:bg-white odd:bg-supplied-bg"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-supplied-ink-10 to-transparent" />

      <Container>
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
            flipped ? "lg:[direction:rtl]" : ""
          }`}
        >
          {/* Image */}
          <Reveal delay={flipped ? 150 : 0}>
            <div className={`relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#F5F3F0] ${flipped ? "[direction:ltr]" : ""}`}>
              <Image
                src={category.image.src}
                alt={category.image.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          {/* Content */}
          <Reveal delay={flipped ? 0 : 150}>
            <div className={flipped ? "[direction:ltr]" : ""}>
              <h2
                id={headingId}
                className="text-[clamp(26px,3vw,36px)] font-extrabold leading-[1.12] tracking-[-0.02em] mb-4 text-supplied-ink"
              >
                {category.name}
              </h2>
              <p className="text-[16px] text-supplied-ink-60 leading-[1.75] mb-6">
                {category.longDescription}
              </p>

              {/* Meta chips */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-supplied-ink bg-supplied-ink-05 px-4 py-2 rounded-full">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    className="w-4 h-4 text-supplied-amber"
                  >
                    <path d="M8 2v12M4 6h8M3 10h10" />
                  </svg>
                  MOQ: {category.moq}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-supplied-ink bg-supplied-ink-05 px-4 py-2 rounded-full">
                  <svg
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    className="w-4 h-4 text-supplied-amber"
                  >
                    <circle cx="8" cy="8" r="6" />
                    <path d="M8 5v3l2 2" />
                  </svg>
                  Lead time: {category.leadTime}
                </span>
              </div>

              {/* Applications */}
              <div className="mb-6">
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-supplied-ink-40 mb-3">
                  Typical Applications
                </h3>
                <ul className="space-y-2">
                  {category.applications.map((app) => (
                    <li
                      key={app}
                      className="flex items-start gap-2.5 text-[14px] text-supplied-ink-60 leading-[1.6]"
                    >
                      <span className="w-1.5 h-1.5 bg-supplied-amber rounded-full mt-[7px] shrink-0" />
                      {app}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Customisation options */}
              <div className="mb-8">
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-supplied-ink-40 mb-3">
                  Customisation Options
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.customisationOptions.map((option) => (
                    <span
                      key={option}
                      className="text-[12px] font-medium text-supplied-ink-60 bg-supplied-ink-05 border border-supplied-ink-10 px-3 py-1.5 rounded-full"
                    >
                      {option}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Button href="/contact-us" variant="fill-amber" size="md" icon>
                  Enquire About {category.name.split(" ").slice(-1)[0]}
                </Button>
                {category.anchorId === "cosmetic-bags" ||
                category.anchorId === "tote-bags" ||
                category.anchorId === "gift-bags" ? (
                  <Link
                    href="/products/mailer-boxes"
                    className="text-[13px] font-medium text-supplied-ink-40 hover:text-supplied-amber transition-colors duration-300"
                  >
                    Pair with branded mailer boxes →
                  </Link>
                ) : category.anchorId === "stickers" ? (
                  <Link
                    href="/products"
                    className="text-[13px] font-medium text-supplied-ink-40 hover:text-supplied-amber transition-colors duration-300"
                  >
                    Browse packaging to match →
                  </Link>
                ) : null}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
