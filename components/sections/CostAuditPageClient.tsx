"use client";

import React, { useState, FormEvent } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { AccentHeading } from "@/components/ui/AccentHeading";
import { LogoStrip } from "@/components/sections/LogoStrip";
import {
  CostAuditIcon,
  type CostAuditIconName,
} from "@/components/ui/CostAuditIcon";
import type { CostAuditPageContent } from "@/lib/content/costAudit";

interface CostAuditPageClientProps {
  content: CostAuditPageContent;
}

export function CostAuditPageClient({ content }: CostAuditPageClientProps) {
  return (
    <div className="bg-supplied-bg">
      <Hero content={content.hero} />
      <WhatYouGet content={content.whatYouGet} />
      <WhatWeNeed content={content.whatWeNeed} />
      <HowItWorks content={content.howItWorks} />
      <Faq content={content.faq} />
      <SocialProof content={content.socialProof} />
      <RequestForm content={content.requestForm} />
      <FooterCta content={content.footerCta} />
    </div>
  );
}

function Hero({ content }: { content: CostAuditPageContent["hero"] }) {
  const hasImage = Boolean(content.image?.src);
  return (
    <section className="relative pt-[160px] pb-[100px] bg-supplied-ink text-white overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_10%,rgba(232,121,28,0.12),transparent_65%)] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
        }}
      />
      <Container className="relative z-10">
        <div
          className={`grid items-center gap-12 lg:gap-14 ${
            hasImage ? "grid-cols-1 lg:grid-cols-[1.1fr_1fr]" : "grid-cols-1"
          }`}
        >
          <Reveal className={hasImage ? "" : "max-w-[820px] mx-auto text-center"}>
            <div className={`mb-6 ${hasImage ? "" : "flex justify-center"}`}>
              <Tag color="amber" pulse>{content.eyebrow}</Tag>
            </div>
            <AccentHeading
              as="h1"
              text={content.headline}
              className="text-[clamp(42px,5.4vw,68px)] font-extrabold leading-[1.05] tracking-[-0.03em] mb-6"
              accentClassName="text-supplied-amber"
            />
            <p
              className={`text-[17px] leading-[1.7] text-white/65 mb-9 ${
                hasImage ? "max-w-[600px]" : "max-w-[680px] mx-auto"
              }`}
            >
              {content.subheadline}
            </p>
            <div className={`${hasImage ? "" : "flex justify-center"}`}>
              <Button variant="fill-amber" size="lg" href="#request" icon>
                {content.primaryCtaLabel}
              </Button>
            </div>
            {content.secondaryCtaText ? (
              <p
                className={`mt-5 text-[13px] text-white/50 leading-[1.6] ${
                  hasImage ? "max-w-[520px]" : "max-w-[560px] mx-auto"
                }`}
              >
                {content.secondaryCtaText}
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
                <div className="relative aspect-[4/4] w-full max-w-[520px] mx-auto">
                  <Image
                    src={content.image.src}
                    alt={content.image.alt}
                    fill
                    sizes="(min-width: 1024px) 520px, 100vw"
                    className="object-contain"
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

function WhatYouGet({
  content,
}: {
  content: CostAuditPageContent["whatYouGet"];
}) {
  const hasPreview = Boolean(content.previewImage?.src);

  return (
    <section className="py-[100px] bg-supplied-bg">
      <Container>
        <Reveal className="text-center max-w-[720px] mx-auto mb-14">
          <Tag color="amber" className="mb-4">{content.eyebrow}</Tag>
          <AccentHeading
            as="h2"
            text={content.heading}
            className="text-[clamp(30px,3.6vw,44px)] font-extrabold leading-[1.1] tracking-[-0.025em] mb-4 text-supplied-ink"
            accentClassName="text-supplied-amber"
          />
          <p className="text-[16px] text-supplied-ink-60 leading-[1.7]">
            {content.intro}
          </p>
        </Reveal>

        <Reveal>
          <div
            className={`grid gap-6 lg:gap-10 items-stretch ${
              hasPreview ? "grid-cols-1 lg:grid-cols-[1fr_1.15fr]" : "grid-cols-1"
            }`}
          >
            {hasPreview && content.previewImage ? (
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute inset-0 -m-6 rounded-[28px] pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(200,119,62,0.10), transparent 70%)",
                  }}
                />
                <div className="relative bg-white border border-supplied-ink-10 rounded-[24px] p-6 md:p-8 shadow-supplied-sm">
                  <div className="relative aspect-[3/4] w-full max-w-[440px] mx-auto">
                    <Image
                      src={content.previewImage.src}
                      alt={content.previewImage.alt}
                      fill
                      sizes="(min-width: 1024px) 440px, 80vw"
                      className="object-contain"
                    />
                  </div>
                  {content.previewCaption ? (
                    <p className="mt-5 text-[12.5px] text-supplied-ink-40 uppercase tracking-[1.4px] font-semibold text-center">
                      {content.previewCaption}
                    </p>
                  ) : null}
                </div>
              </div>
            ) : null}

            <div
              className={`grid grid-cols-1 ${
                hasPreview ? "" : "md:grid-cols-2"
              } gap-4`}
            >
              {content.items.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="group bg-white border border-supplied-ink-10 rounded-2xl p-7 md:p-8 transition-all duration-300 hover:border-supplied-amber/40 hover:shadow-supplied-md hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-supplied-amber/10 text-supplied-amber flex items-center justify-center transition-colors duration-300 group-hover:bg-supplied-amber/15">
                      {item.icon ? (
                        <CostAuditIcon
                          name={item.icon as CostAuditIconName}
                          size={22}
                        />
                      ) : (
                        <span className="font-bold text-[14px]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      )}
                    </div>
                    <div>
                      <h3 className="text-[17px] font-bold text-supplied-ink mb-2 leading-[1.3]">
                        {item.title}
                      </h3>
                      <p className="text-[14px] text-supplied-ink-60 leading-[1.7]">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function WhatWeNeed({
  content,
}: {
  content: CostAuditPageContent["whatWeNeed"];
}) {
  return (
    <section className="py-[100px] bg-white">
      <Container>
        <Reveal className="text-center max-w-[720px] mx-auto mb-10">
          <Tag color="ink" className="mb-4">{content.eyebrow}</Tag>
          <AccentHeading
            as="h2"
            text={content.heading}
            className="text-[clamp(30px,3.6vw,44px)] font-extrabold leading-[1.1] tracking-[-0.025em] mb-4 text-supplied-ink"
            accentClassName="text-supplied-amber"
          />
          <p className="text-[16px] text-supplied-ink-60 leading-[1.7]">
            {content.intro}
          </p>
        </Reveal>

        {content.itemsLabel ? (
          <Reveal className="max-w-[1080px] mx-auto mb-4">
            <p className="text-[11px] font-bold uppercase tracking-[1.6px] text-supplied-amber">
              {content.itemsLabel}
            </p>
          </Reveal>
        ) : null}

        <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {content.items.map((item, index) => (
            <div
              key={`${item.title}-${index}`}
              className="group bg-supplied-bg border border-supplied-ink-10 rounded-2xl p-7 md:p-8 transition-all duration-300 hover:border-supplied-amber/40 hover:shadow-supplied-sm hover:-translate-y-0.5"
            >
              <div className="mb-5">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white border border-supplied-ink-10 text-supplied-amber flex items-center justify-center transition-colors duration-300 group-hover:border-supplied-amber/40">
                  {item.icon ? (
                    <CostAuditIcon
                      name={item.icon as CostAuditIconName}
                      size={20}
                    />
                  ) : (
                    <span className="font-bold text-[12px]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  )}
                </div>
              </div>
              <h3 className="text-[17px] font-bold text-supplied-ink mb-2 leading-[1.3]">
                {item.title}
              </h3>
              <p className="text-[14px] text-supplied-ink-60 leading-[1.7]">
                {item.body}
              </p>
            </div>
          ))}
        </Reveal>

        {content.closingLine ? (
          <Reveal>
            <div className="mt-12 max-w-[780px] mx-auto">
              <div className="flex items-start gap-4 bg-supplied-amber-05 border border-supplied-amber/20 rounded-2xl px-6 md:px-8 py-5">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-supplied-amber/15 text-supplied-amber flex items-center justify-center mt-0.5">
                  <CostAuditIcon name="lock" size={18} />
                </div>
                <p className="text-[14px] md:text-[15px] text-supplied-ink-80 leading-[1.7]">
                  {content.closingLine}
                </p>
              </div>
            </div>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}

function HowItWorks({
  content,
}: {
  content: CostAuditPageContent["howItWorks"];
}) {
  return (
    <section className="py-[100px] bg-supplied-bg">
      <Container>
        <Reveal className="text-center max-w-[720px] mx-auto mb-14">
          <Tag color="amber" className="mb-4">{content.eyebrow}</Tag>
          <AccentHeading
            as="h2"
            text={content.heading}
            className="text-[clamp(30px,3.6vw,44px)] font-extrabold leading-[1.1] tracking-[-0.025em] mb-4 text-supplied-ink"
            accentClassName="text-supplied-amber"
          />
          <p className="text-[16px] text-supplied-ink-60 leading-[1.7]">
            {content.intro}
          </p>
        </Reveal>

        <Reveal>
          <div className="relative">
            <div
              aria-hidden
              className="hidden lg:block absolute left-0 right-0 top-[58px] h-[2px] bg-gradient-to-r from-transparent via-supplied-amber/25 to-transparent"
            />
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {content.steps.map((step, idx) => (
                <div
                  key={step.stepNumber}
                  className="group relative bg-white border border-supplied-ink-10 rounded-2xl p-7 md:p-8 transition-all duration-300 hover:border-supplied-amber/40 hover:shadow-supplied-md hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="relative flex-shrink-0 w-14 h-14 rounded-2xl bg-supplied-amber/10 text-supplied-amber flex items-center justify-center transition-colors duration-300 group-hover:bg-supplied-amber group-hover:text-white">
                      {step.icon ? (
                        <CostAuditIcon
                          name={step.icon as CostAuditIconName}
                          size={24}
                        />
                      ) : null}
                    </div>
                    <span
                      className="text-[26px] md:text-[30px] font-medium text-supplied-amber/70 leading-none"
                      style={{ fontFamily: "'Fraunces',serif" }}
                    >
                      {step.stepNumber}
                    </span>
                  </div>
                  <h3 className="text-[17px] font-bold text-supplied-ink mb-2 leading-[1.3]">
                    {step.title}
                  </h3>
                  <p className="text-[14px] text-supplied-ink-60 leading-[1.7]">
                    {step.body}
                  </p>
                  {idx < content.steps.length - 1 ? (
                    <div
                      aria-hidden
                      className="hidden lg:flex absolute top-[51px] -right-3 z-[1] w-6 h-6 rounded-full bg-supplied-bg border border-supplied-amber/30 text-supplied-amber items-center justify-center text-[11px]"
                    >
                      →
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Faq({ content }: { content: CostAuditPageContent["faq"] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-[100px] bg-white">
      <Container className="max-w-[860px]">
        <Reveal className="text-center mb-12">
          <Tag color="ink" className="mb-4">{content.eyebrow}</Tag>
          <AccentHeading
            as="h2"
            text={content.heading}
            className="text-[clamp(30px,3.6vw,44px)] font-extrabold leading-[1.1] tracking-[-0.025em] text-supplied-ink"
            accentClassName="text-supplied-amber"
          />
        </Reveal>

        <Reveal className="flex flex-col gap-2">
          {content.items.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={`${faq.question}-${index}`}
                className="border border-supplied-ink-10 rounded-xl bg-supplied-bg overflow-hidden transition-colors hover:border-supplied-ink-20"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between text-left px-6 py-5 gap-4"
                  aria-expanded={isOpen}
                >
                  <span className="text-[16px] font-semibold text-supplied-ink leading-[1.4]">
                    {faq.question}
                  </span>
                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-supplied-amber/12 text-supplied-amber flex items-center justify-center transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-supplied ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-[15px] text-supplied-ink-60 leading-[1.7]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}

function SocialProof({
  content,
}: {
  content: CostAuditPageContent["socialProof"];
}) {
  return (
    <section className="py-[80px] bg-supplied-bg">
      <Container>
        <Reveal className="text-center max-w-[720px] mx-auto mb-8">
          <AccentHeading
            as="h2"
            text={content.heading}
            className="text-[clamp(24px,2.6vw,32px)] font-extrabold leading-[1.2] tracking-[-0.02em] text-supplied-ink"
            accentClassName="text-supplied-amber"
          />
        </Reveal>
      </Container>
      <LogoStrip heading="" />

      {content.showPullQuote && content.pullQuoteText ? (
        <Container className="max-w-[760px] mt-12">
          <Reveal>
            <div className="bg-white border border-supplied-ink-10 rounded-2xl p-8 md:p-10 text-center">
              <p
                className="text-[22px] italic text-supplied-ink leading-[1.55] mb-5"
                style={{ fontFamily: "'Fraunces',serif" }}
              >
                &ldquo;{content.pullQuoteText}&rdquo;
              </p>
              <p className="text-[13px] text-supplied-ink-60">
                &mdash;{" "}
                <span className="font-semibold text-supplied-ink">
                  {content.pullQuoteName || "Client"}
                </span>
                {content.pullQuoteRole ? `, ${content.pullQuoteRole}` : ""}
                {content.pullQuoteBrand ? ` · ${content.pullQuoteBrand}` : ""}
              </p>
            </div>
          </Reveal>
        </Container>
      ) : null}
    </section>
  );
}

type FormStatus = "idle" | "sending" | "success" | "error";

function RequestForm({
  content,
}: {
  content: CostAuditPageContent["requestForm"];
}) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      type: "cost-audit",
      name: String(formData.get("name") || "").trim(),
      jobTitle: String(formData.get("jobTitle") || "").trim(),
      company: String(formData.get("company") || "").trim(),
      companyRevenue: String(formData.get("companyRevenue") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      packagingSkus: String(formData.get("packagingSkus") || "").trim(),
      packagingSuppliers: String(
        formData.get("packagingSuppliers") || ""
      ).trim(),
      focusArea: String(formData.get("focusArea") || "").trim(),
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
    <section id="request" className="py-[120px] bg-supplied-ink scroll-mt-24">
      <Container className="max-w-[760px]">
        <Reveal className="text-center mb-10">
          <Tag color="amber" className="mb-4">{content.eyebrow}</Tag>
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
                Thanks — we've got it.
              </h3>
              <p className="text-white/70 text-[15px] leading-[1.7] max-w-[440px] mx-auto">
                A member of our sourcing team will be in touch within one working day to confirm next steps and set a timeline.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-white/[0.03] border border-white/10 rounded-2xl p-7 md:p-10 flex flex-col gap-5"
              noValidate
            >
              <input type="text" name="_hp" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Full name" name="name" required />
                <Field label="Job title" name="jobTitle" required />
                <Field label="Company name" name="company" required />
                <SelectField
                  label={
                    content.fieldRequirements.revenueRequired
                      ? "Company revenue"
                      : "Company revenue (optional)"
                  }
                  name="companyRevenue"
                  required={content.fieldRequirements.revenueRequired}
                  options={[
                    "Under £5m",
                    "£5m–£20m",
                    "£20m–£50m",
                    "£50m–£100m",
                    "£100m+",
                  ]}
                />
                <Field label="Work email" name="email" type="email" required />
                <Field label="Phone number (optional)" name="phone" />
                <SelectField
                  label={
                    content.fieldRequirements.skusRequired
                      ? "Number of packaging SKUs"
                      : "Number of packaging SKUs (optional)"
                  }
                  name="packagingSkus"
                  required={content.fieldRequirements.skusRequired}
                  options={["1–5", "6–15", "16–50", "50+"]}
                />
                <SelectField
                  label={
                    content.fieldRequirements.suppliersRequired
                      ? "Current packaging suppliers"
                      : "Current packaging suppliers (optional)"
                  }
                  name="packagingSuppliers"
                  required={content.fieldRequirements.suppliersRequired}
                  options={["1", "2–4", "5–9", "10+"]}
                />
              </div>

              <div>
                <label className="text-[12px] font-semibold tracking-[0.08em] uppercase text-white/60 mb-2 block">
                  Anything specific you'd like us to focus on? (optional)
                </label>
                <textarea
                  name="focusArea"
                  rows={4}
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
                  {...{
                    disabled: status === "sending",
                  }}
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
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
        className="w-full bg-white/[0.05] border border-white/10 rounded-lg px-4 py-3 text-[15px] text-white placeholder-white/30 leading-[1.4] outline-none focus:border-supplied-amber/60 focus:bg-white/[0.08] transition-colors"
      />
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
  required = false,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[12px] font-semibold tracking-[0.08em] uppercase text-white/60 mb-2 block">
        {label}
        {required ? <span className="text-supplied-amber ml-1">*</span> : null}
      </span>
      <select
        name={name}
        required={required}
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
        <option value="" disabled>
          Select…
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-supplied-ink">
            {opt}
          </option>
        ))}
      </select>
    </label>
  );
}

function FooterCta({
  content,
}: {
  content: CostAuditPageContent["footerCta"];
}) {
  return (
    <section className="py-[100px] bg-supplied-bg">
      <Container className="max-w-[760px] text-center">
        <Reveal>
          <AccentHeading
            as="h2"
            text={content.heading}
            className="text-[clamp(28px,3.4vw,40px)] font-extrabold leading-[1.15] tracking-[-0.025em] text-supplied-ink mb-4"
            accentClassName="text-supplied-amber"
          />
          <p className="text-[16px] text-supplied-ink-60 leading-[1.7] mb-8">
            {content.sub}
          </p>
          <div className="flex justify-center">
            <Button
              variant="fill-ink"
              size="lg"
              href={content.cta.href}
              icon
            >
              {content.cta.label}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
