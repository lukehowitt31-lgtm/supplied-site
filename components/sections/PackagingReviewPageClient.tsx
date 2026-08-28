"use client";

import React, { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { AccentHeading } from "@/components/ui/AccentHeading";
import { LogoStrip } from "@/components/sections/LogoStrip";
import {
  CONTACT_PRODUCT_TYPES,
  CONTACT_QUANTITY_BANDS,
} from "@/lib/enquiries/types";
import type { PackagingReviewPageContent } from "@/lib/content/packagingReview";

interface PackagingReviewPageClientProps {
  content: PackagingReviewPageContent;
}

const FORM_ID = "review";
const HERO_ID = "packaging-review-hero";

export function PackagingReviewPageClient({
  content,
}: PackagingReviewPageClientProps) {
  return (
    <div className="bg-supplied-bg pb-[88px] md:pb-0">
      <Hero content={content.hero} />
      <Problem content={content.problem} />
      <Outcome content={content.outcome} />
      <HowItWorks content={content.howItWorks} />
      <Difference content={content.difference} />
      <SocialProof content={content.socialProof} />
      <RiskReversal content={content.riskReversal} />
      <RequestForm content={content.requestForm} />
      <StickyCta label={content.hero.primaryCtaLabel} />
    </div>
  );
}

function Hero({ content }: { content: PackagingReviewPageContent["hero"] }) {
  const hasImage = Boolean(content.image?.src);

  return (
    <section
      id={HERO_ID}
      className="relative pt-[140px] pb-[88px] md:pt-[160px] md:pb-[110px] bg-supplied-ink text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_10%,rgba(232,121,28,0.12),transparent_65%)] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
        }}
      />
      <Container className="relative z-10">
        <div
          className={`grid items-center gap-12 lg:gap-16 ${
            hasImage ? "grid-cols-1 lg:grid-cols-[1.15fr_1fr]" : "grid-cols-1"
          }`}
        >
          <Reveal className={hasImage ? "" : "max-w-[820px] mx-auto text-center"}>
            <div className={`mb-6 ${hasImage ? "" : "flex justify-center"}`}>
              <Tag color="amber" pulse>
                {content.eyebrow}
              </Tag>
            </div>
            <AccentHeading
              as="h1"
              text={content.headline}
              className="text-[clamp(36px,5.2vw,64px)] font-extrabold leading-[1.06] tracking-[-0.03em] mb-6"
              accentClassName="text-supplied-amber"
            />
            <p
              className={`text-[16px] md:text-[17px] leading-[1.7] text-white/65 mb-8 ${
                hasImage ? "max-w-[560px]" : "max-w-[680px] mx-auto"
              }`}
            >
              {content.subheadline}
            </p>
            <div className={`${hasImage ? "" : "flex justify-center"}`}>
              <Button
                variant="fill-amber"
                size="lg"
                href={`#${FORM_ID}`}
                icon
                id="cta-packaging-review-hero"
                data-cta="packaging-review-hero"
              >
                {content.primaryCtaLabel}
              </Button>
            </div>
            {content.riskReversal ? (
              <p
                className={`mt-5 text-[13px] text-white/50 leading-[1.6] ${
                  hasImage ? "max-w-[520px]" : "max-w-[560px] mx-auto"
                }`}
              >
                {content.riskReversal}
              </p>
            ) : null}

            {content.quickFacts.length > 0 ? (
              <ul
                className={`mt-9 flex flex-wrap gap-x-7 gap-y-4 ${
                  hasImage ? "" : "justify-center"
                }`}
              >
                {content.quickFacts.map((fact) => (
                  <li
                    key={`${fact.value}-${fact.label}`}
                    className="flex items-baseline gap-2"
                  >
                    <span
                      className="text-[20px] md:text-[22px] font-medium text-supplied-amber leading-none tracking-[-0.01em]"
                      style={{ fontFamily: "'Fraunces',serif" }}
                    >
                      {fact.value}
                    </span>
                    <span className="text-[10.5px] text-white/55 uppercase tracking-[1.4px] font-semibold">
                      {fact.label}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </Reveal>

          {hasImage && content.image ? (
            <Reveal>
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute inset-0 -m-8 rounded-[36px] pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(232,121,28,0.14), transparent 70%)",
                  }}
                />
                <div className="relative aspect-[4/5] w-full max-w-[480px] mx-auto overflow-hidden rounded-[28px] border border-white/10 bg-white/5">
                  <Image
                    src={content.image.src}
                    alt={content.image.alt}
                    fill
                    sizes="(min-width: 1024px) 480px, 90vw"
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </Reveal>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

function Problem({
  content,
}: {
  content: PackagingReviewPageContent["problem"];
}) {
  return (
    <section className="py-[88px] md:py-[110px] bg-supplied-bg" id="problem">
      <Container>
        <Reveal className="max-w-[780px] mx-auto">
          <Tag color="ink" className="mb-5">
            {content.eyebrow}
          </Tag>
          <AccentHeading
            as="h2"
            text={content.heading}
            className="text-[clamp(30px,3.8vw,48px)] font-extrabold leading-[1.1] tracking-[-0.025em] text-supplied-ink mb-5"
            accentClassName="text-supplied-amber"
          />
          <p className="text-[16px] md:text-[17px] text-supplied-ink-60 leading-[1.7] mb-10">
            {content.intro}
          </p>

          <ul className="flex flex-col gap-0 border-t border-supplied-ink-10">
            {content.items.map((item, index) => (
              <li
                key={`${item.title}-${index}`}
                className="flex items-baseline gap-5 md:gap-8 py-5 md:py-6 border-b border-supplied-ink-10"
              >
                <span
                  className="flex-shrink-0 text-[18px] md:text-[20px] font-medium text-supplied-amber leading-none tracking-[-0.02em] w-8"
                  style={{ fontFamily: "'Fraunces',serif" }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-[18px] md:text-[22px] font-semibold text-supplied-ink leading-[1.35] tracking-[-0.02em]">
                  {item.title}
                </p>
              </li>
            ))}
          </ul>

          {content.closingLine ? (
            <p className="mt-10 text-[15px] md:text-[16px] text-supplied-ink-60 leading-[1.7]">
              {content.closingLine}
            </p>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}

function Outcome({
  content,
}: {
  content: PackagingReviewPageContent["outcome"];
}) {
  const hasImage = Boolean(content.image?.src);

  return (
    <section className="py-[88px] md:py-[110px] bg-white" id="outcome">
      <Container>
        <div
          className={`grid items-center gap-12 lg:gap-16 ${
            hasImage ? "grid-cols-1 lg:grid-cols-[1fr_1.05fr]" : "grid-cols-1"
          }`}
        >
          {hasImage && content.image ? (
            <Reveal>
              <div className="relative max-w-[520px] mx-auto lg:mx-0">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-supplied-ink-10 bg-supplied-bg">
                  <Image
                    src={content.image.src}
                    alt={content.image.alt}
                    fill
                    sizes="(min-width: 1024px) 520px, 90vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          ) : null}

          <Reveal>
            <Tag color="amber" className="mb-5">
              {content.eyebrow}
            </Tag>
            <AccentHeading
              as="h2"
              text={content.heading}
              className="text-[clamp(30px,3.8vw,48px)] font-extrabold leading-[1.1] tracking-[-0.025em] text-supplied-ink mb-5"
              accentClassName="text-supplied-amber"
            />
            <p className="text-[16px] md:text-[17px] text-supplied-ink-60 leading-[1.7] mb-9 max-w-[560px]">
              {content.intro}
            </p>
            <ul className="flex flex-col gap-6">
              {content.items.map((item) => (
                <li key={item.title} className="flex gap-4">
                  <span
                    aria-hidden
                    className="mt-2 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-supplied-amber"
                  />
                  <div>
                    <h3 className="text-[16px] md:text-[17px] font-bold text-supplied-ink leading-[1.3] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-[14px] md:text-[15px] text-supplied-ink-60 leading-[1.7]">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function HowItWorks({
  content,
}: {
  content: PackagingReviewPageContent["howItWorks"];
}) {
  return (
    <section className="py-[88px] md:py-[110px] bg-supplied-bg" id="how-it-works">
      <Container>
        <Reveal className="text-center max-w-[720px] mx-auto mb-12 md:mb-14">
          <Tag color="amber" className="mb-5">
            {content.eyebrow}
          </Tag>
          <AccentHeading
            as="h2"
            text={content.heading}
            className="text-[clamp(30px,3.8vw,48px)] font-extrabold leading-[1.1] tracking-[-0.025em] text-supplied-ink mb-5"
            accentClassName="text-supplied-amber"
          />
          <p className="text-[16px] md:text-[17px] text-supplied-ink-60 leading-[1.7]">
            {content.intro}
          </p>
          {content.timeNote ? (
            <p
              className="mt-4 text-[15px] text-supplied-amber"
              style={{ fontFamily: "'Fraunces',serif" }}
            >
              {content.timeNote}
            </p>
          ) : null}
        </Reveal>

        <Reveal>
          <div className="relative">
            <div
              aria-hidden
              className="hidden lg:block absolute left-[8%] right-[8%] top-[42px] h-px bg-supplied-ink-10"
            />
            <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {content.steps.map((step) => (
                <li
                  key={step.stepNumber}
                  className="relative bg-white border border-supplied-ink-10 rounded-[24px] p-7 md:p-8"
                >
                  <span
                    className="block text-[28px] md:text-[32px] font-medium text-supplied-amber mb-4 leading-none tracking-[-0.02em]"
                    style={{ fontFamily: "'Fraunces',serif" }}
                  >
                    {step.stepNumber}
                  </span>
                  <h3 className="text-[17px] font-bold text-supplied-ink mb-2 leading-[1.3]">
                    {step.title}
                  </h3>
                  <p className="text-[14px] md:text-[15px] text-supplied-ink-60 leading-[1.7]">
                    {step.body}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        {content.ctaLabel ? (
          <Reveal className="flex justify-center mt-12">
            <Button
              variant="fill-amber"
              size="lg"
              href={`#${FORM_ID}`}
              icon
              id="cta-packaging-review-process"
              data-cta="packaging-review-process"
            >
              {content.ctaLabel}
            </Button>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}

function Difference({
  content,
}: {
  content: PackagingReviewPageContent["difference"];
}) {
  return (
    <section
      className="py-[88px] md:py-[110px] bg-supplied-ink text-white relative overflow-hidden"
      id="difference"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_50%_15%,rgba(232,121,28,0.10),transparent_65%)] pointer-events-none" />
      <Container className="relative z-10">
        <Reveal className="max-w-[780px] mx-auto text-center mb-12 md:mb-14">
          <Tag color="amber" className="mb-5">
            {content.eyebrow}
          </Tag>
          <AccentHeading
            as="h2"
            text={content.heading}
            className="text-[clamp(30px,3.8vw,48px)] font-extrabold leading-[1.1] tracking-[-0.025em] text-white mb-5"
            accentClassName="text-supplied-amber"
          />
          <p className="text-[16px] md:text-[17px] text-white/65 leading-[1.7]">
            {content.body}
          </p>
        </Reveal>

        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {content.points.map((point) => (
              <div
                key={point.title}
                className="rounded-[24px] border border-white/10 bg-white/[0.03] p-7 md:p-8"
              >
                <h3 className="text-[17px] font-bold text-white mb-3 leading-[1.3]">
                  {point.title}
                </h3>
                <p className="text-[14px] md:text-[15px] text-white/60 leading-[1.7]">
                  {point.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function SocialProof({
  content,
}: {
  content: PackagingReviewPageContent["socialProof"];
}) {
  const visibleTestimonials = content.showTestimonials
    ? content.testimonials.filter((item) => item.quote.trim().length > 0)
    : [];
  const stories = content.stories.filter(
    (story) => story.brand.trim().length > 0 && story.result.trim().length > 0
  );

  return (
    <section className="py-[88px] md:py-[110px] bg-white" id="proof">
      <Container>
        <Reveal className="text-center max-w-[720px] mx-auto mb-8">
          <AccentHeading
            as="h2"
            text={content.heading}
            className="text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.12] tracking-[-0.025em] text-supplied-ink mb-4"
            accentClassName="text-supplied-amber"
          />
          {content.intro ? (
            <p className="text-[16px] text-supplied-ink-60 leading-[1.7]">
              {content.intro}
            </p>
          ) : null}
        </Reveal>
      </Container>

      <LogoStrip heading="" />

      {visibleTestimonials.length > 0 ? (
        <Container className="mt-12">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {visibleTestimonials.map((item) => {
                const attribution = [item.name, item.role]
                  .filter(Boolean)
                  .join(", ");
                const inner = (
                  <>
                    {item.result ? (
                      <p className="text-[11px] font-semibold uppercase tracking-[1.6px] text-supplied-amber mb-4">
                        {item.result}
                      </p>
                    ) : null}
                    <p
                      className="text-[17px] md:text-[18px] text-supplied-ink leading-[1.55] mb-5"
                      style={{ fontFamily: "'Fraunces',serif" }}
                    >
                      &ldquo;{item.quote}&rdquo;
                    </p>
                    <p className="text-[13px] text-supplied-ink-60">
                      {attribution ? (
                        <span className="font-semibold text-supplied-ink">
                          {attribution}
                        </span>
                      ) : null}
                      {item.brand ? ` · ${item.brand}` : ""}
                    </p>
                  </>
                );

                const cardClass =
                  "h-full bg-supplied-bg border border-supplied-ink-10 rounded-[24px] p-7 md:p-8";

                return item.href ? (
                  <Link
                    key={`${item.brand}-${item.name}`}
                    href={item.href}
                    className={`${cardClass} transition-colors hover:border-supplied-amber/40`}
                  >
                    {inner}
                  </Link>
                ) : (
                  <div key={`${item.brand}-${item.name}`} className={cardClass}>
                    {inner}
                  </div>
                );
              })}
            </div>
          </Reveal>
        </Container>
      ) : null}

      {stories.length > 0 ? (
        <Container className="mt-8">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {stories.map((story) => (
                <Link
                  key={story.brand}
                  href={story.href || "/client-stories"}
                  className="group relative overflow-hidden rounded-[24px] aspect-[4/3] bg-supplied-ink"
                >
                  {story.image?.src ? (
                    <Image
                      src={story.image.src}
                      alt={story.image.alt || story.brand}
                      fill
                      sizes="(min-width: 1024px) 400px, 100vw"
                      className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-supplied-ink via-supplied-ink/40 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="text-[12px] font-semibold uppercase tracking-[1.6px] text-white/70 mb-1">
                      {story.brand}
                    </p>
                    <p className="text-[16px] font-bold text-white leading-[1.35]">
                      {story.result}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Reveal>
        </Container>
      ) : null}
    </section>
  );
}

function RiskReversal({
  content,
}: {
  content: PackagingReviewPageContent["riskReversal"];
}) {
  return (
    <section className="py-[88px] md:py-[110px] bg-supplied-bg" id="risk">
      <Container>
        <Reveal className="max-w-[780px] mx-auto text-center">
          <AccentHeading
            as="h2"
            text={content.heading}
            className="text-[clamp(28px,3.4vw,44px)] font-extrabold leading-[1.12] tracking-[-0.025em] text-supplied-ink mb-8"
            accentClassName="text-supplied-amber"
          />
          {content.points.length > 0 ? (
            <ul className="mb-8 flex flex-col gap-2">
              {content.points.map((point) => (
                <li
                  key={point}
                  className="text-[clamp(28px,4vw,48px)] font-extrabold text-supplied-ink leading-[1.15] tracking-[-0.03em]"
                >
                  {point}
                </li>
              ))}
            </ul>
          ) : null}
          <p className="text-[16px] md:text-[17px] text-supplied-ink-60 leading-[1.7]">
            {content.body}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

type FormStatus = "idle" | "sending" | "success" | "error";

function RequestForm({
  content,
}: {
  content: PackagingReviewPageContent["requestForm"];
}) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      type: "packaging-review",
      name: String(formData.get("name") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      productType: String(formData.get("productType") || "").trim(),
      estimatedQuantity: String(formData.get("estimatedQuantity") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      _hp: String(formData.get("_hp") || ""),
    };

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Failed to submit. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
    }
  }

  return (
    <section
      id={FORM_ID}
      className="py-[100px] md:py-[120px] bg-supplied-ink scroll-mt-24"
    >
      <Container className="max-w-[760px]">
        <Reveal className="text-center mb-10">
          <Tag color="amber" className="mb-4">
            {content.eyebrow}
          </Tag>
          <AccentHeading
            as="h2"
            text={content.heading}
            className="text-[clamp(30px,3.6vw,44px)] font-extrabold leading-[1.1] tracking-[-0.025em] text-white mb-4"
            accentClassName="text-supplied-amber"
          />
          <p className="text-[16px] text-white/65 leading-[1.7] max-w-[560px] mx-auto">
            {content.sub}
          </p>
        </Reveal>

        <Reveal>
          {status === "success" ? (
            <div className="bg-white/[0.04] border border-supplied-amber/30 rounded-2xl p-10 text-center">
              <div className="w-14 h-14 rounded-full bg-supplied-amber/20 text-supplied-amber flex items-center justify-center mx-auto mb-5 text-2xl">
                ✓
              </div>
              <h3 className="text-white text-[22px] font-bold mb-2">
                {content.successHeading}
              </h3>
              <p className="text-white/70 text-[15px] leading-[1.7] max-w-[440px] mx-auto">
                {content.successBody}
              </p>
            </div>
          ) : (
            <form
              id="form-packaging-review"
              onSubmit={handleSubmit}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-7 md:p-10 flex flex-col gap-5"
              noValidate
              data-cta="packaging-review-form"
            >
              <input
                type="text"
                name="_hp"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Full name" name="name" required autoComplete="name" />
                <Field
                  label="Company"
                  name="company"
                  required
                  autoComplete="organization"
                />
                <Field
                  label="Work email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                />
                <Field
                  label="Phone (optional)"
                  name="phone"
                  type="tel"
                  autoComplete="tel"
                />
                <SelectField
                  label="Packaging type (optional)"
                  name="productType"
                  options={[...CONTACT_PRODUCT_TYPES]}
                />
                <SelectField
                  label="Approximate quantity (optional)"
                  name="estimatedQuantity"
                  options={[...CONTACT_QUANTITY_BANDS]}
                />
              </div>

              <div>
                <label className="text-[12px] font-semibold tracking-[0.08em] uppercase text-white/60 mb-2 block">
                  What packaging would you like us to look at?
                  <span className="text-supplied-amber ml-1">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  placeholder="What it is, roughly what you buy, and what's currently painful about it."
                  className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder-white/30 leading-[1.6] outline-none focus:border-supplied-amber/60 focus:bg-white/[0.08] transition-colors"
                />
              </div>

              {status === "error" && errorMessage ? (
                <div className="text-[14px] text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                  {errorMessage}
                </div>
              ) : null}

              <div className="flex flex-col items-start gap-3">
                <Button
                  variant="fill-amber"
                  size="lg"
                  icon
                  type="submit"
                  id="cta-packaging-review-submit"
                  data-cta="packaging-review-submit"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending…" : content.submitLabel}
                </Button>
                <p className="text-[12px] text-white/40 leading-[1.6]">
                  {content.privacyFootnote}
                </p>
              </div>
            </form>
          )}
        </Reveal>
      </Container>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-[12px] font-semibold tracking-[0.08em] uppercase text-white/60 mb-2 block">
        {label}
        {required ? <span className="text-supplied-amber ml-1">*</span> : null}
      </span>
      <input
        type={type}
        name={name}
        required={required}
        autoComplete={autoComplete}
        className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder-white/30 leading-[1.4] outline-none focus:border-supplied-amber/60 focus:bg-white/[0.08] transition-colors"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-[12px] font-semibold tracking-[0.08em] uppercase text-white/60 mb-2 block">
        {label}
      </span>
      <select
        name={name}
        defaultValue=""
        className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white leading-[1.4] outline-none focus:border-supplied-amber/60 focus:bg-white/[0.08] transition-colors appearance-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M1 1L6 6L11 1' stroke='%23C8773E' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/></svg>\")",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 14px center",
          paddingRight: "36px",
        }}
      >
        <option value="">Select…</option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-supplied-ink">
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function StickyCta({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById(HERO_ID);
    const form = document.getElementById(FORM_ID);
    if (!hero || !form) return;

    let heroVisible = true;
    let formVisible = false;

    const update = () => {
      setVisible(!heroVisible && !formVisible);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target.id === HERO_ID) heroVisible = entry.isIntersecting;
          if (entry.target.id === FORM_ID) formVisible = entry.isIntersecting;
        }
        update();
      },
      { threshold: 0.12 }
    );

    observer.observe(hero);
    observer.observe(form);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] md:hidden px-4 pb-[calc(12px+env(safe-area-inset-bottom))] pointer-events-none">
      <div className="pointer-events-auto mx-auto max-w-[1440px] rounded-full bg-supplied-ink/95 backdrop-blur-md border border-white/10 shadow-supplied-lg px-3 py-2.5 flex items-center justify-between gap-3">
        <p className="text-[12px] text-white/70 pl-3 leading-tight">
          No fee. No contract.
        </p>
        <Button
          variant="fill-amber"
          size="sm"
          href={`#${FORM_ID}`}
          id="cta-packaging-review-sticky"
          data-cta="packaging-review-sticky"
        >
          {label}
        </Button>
      </div>
    </div>
  );
}
