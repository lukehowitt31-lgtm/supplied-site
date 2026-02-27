"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { TeamCard } from "@/components/ui/TeamCard";
import { getTeamMembers } from "@/lib/content/team";

const AMBER = "#C8773E";

const stats = [
  { value: "50+", label: "Brands Partnered" },
  { value: "6", label: "Production Countries" },
  { value: "140+", label: "Verified Suppliers" },
  { value: "98%", label: "On-Time Delivery" },
  { value: "23%", label: "Avg. Client Saving" },
];

const values = [
  {
    num: "01",
    title: "Ownership, Not Order-Taking",
    body: "We don't wait to be briefed. We manage packaging portfolios proactively — forecasting demand, flagging risks, and pushing improvements before they're asked for.",
  },
  {
    num: "02",
    title: "Infrastructure Over Transactions",
    body: "Every project is designed to create long-term value. We build systems — supplier networks, cost models, production calendars — not one-off solutions.",
  },
  {
    num: "03",
    title: "Transparency As Standard",
    body: "Full cost breakdowns. Real lead times. Honest trade-offs. We operate as an extension of your team, not a black box between you and your suppliers.",
  },
];

const capabilities = [
  "Packaging design & engineering",
  "Global supplier sourcing",
  "Cost modelling & optimisation",
  "EU compliance (PPWR)",
  "Forecast-led production",
  "Sustainability transitions",
  "Brand alignment",
  "Retail-ready structuring",
];

const offices = [
  {
    label: "Supplied HQ",
    name: "Supplied",
    address: "Unit 19, Winnington Business Park, Wolstencroft, Northwich, Cheshire CW8 4DL",
    desc: "HQ. Client relationships, strategy, and new business.",
  },
  {
    label: "Warsaw",
    name: "Warsaw Office",
    address: "Warsaw, Poland",
    desc: "EU operations, supplier management, and production coordination.",
  },
];

export default function AboutUs() {
  const team = getTeamMembers();
  const founders = team.filter((m) => m.title === "Co-Founder");
  const rest = team.filter((m) => m.title !== "Co-Founder");

  return (
    <div>
      {/* HERO */}
      <section className="bg-supplied-ink text-white relative overflow-hidden" style={{ padding: "160px 0 100px" }}>
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 80px, rgba(200,119,62,.12) 80px, rgba(200,119,62,.12) 81px)" }} />
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px" }} className="relative z-[1]">
          <div className="af mb-5" style={{ animationDelay: ".1s", opacity: 0 }}><Tag>About Us</Tag></div>
          <h1 className="af text-[clamp(42px,5.2vw,64px)] font-extrabold text-white leading-[1.05] tracking-[-0.03em] mb-6" style={{ animationDelay: ".2s", opacity: 0, maxWidth: 750 }}>
            Four founders.<br />
            <em className="font-fraunces italic font-medium" style={{ color: AMBER }}>One obsession.</em>
          </h1>
          <p className="af text-white/50 leading-[1.75]" style={{ animationDelay: ".35s", opacity: 0, fontSize: 18, maxWidth: 560 }}>
            We started Supplied because we believed fast-growing brands deserved a packaging partner that thinks like an operator — not a supplier taking orders.
          </p>
        </div>
      </section>

      {/* THE SHORT VERSION */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "100px 40px" }}>
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-12 md:gap-20 items-start">
            <div>
              <Tag className="mb-4">The Short Version</Tag>
              <h2 className="font-extrabold text-supplied-ink leading-[1.25]" style={{ fontSize: 36 }}>
                We're a packaging consultancy for brands that{" "}
                <em className="font-fraunces italic font-medium" style={{ color: AMBER }}>don't stand still.</em>
              </h2>
            </div>
            <div className="text-base leading-[1.85] text-supplied-ink-60">
              <p className="mb-5">London and Warsaw. Five people. A manufacturing network that spans six countries. We work with ecommerce, DTC, health, wellness, and beauty brands — the kind that are growing fast enough that packaging becomes a real operational problem, not just a line item.</p>
              <p className="font-medium text-supplied-ink">We don't just source boxes. We build packaging infrastructure — forecasting, supply chain architecture, brand alignment, cost optimisation, and regulatory compliance — so our clients can scale without packaging becoming the bottleneck.</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* STATS */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px 80px" }}>
        <Reveal>
          <div className="grid grid-cols-5 gap-px bg-supplied-ink rounded-2xl overflow-hidden">
            {stats.map((s) => (
              <div key={s.label} className="bg-supplied-ink text-center" style={{ padding: "32px 16px" }}>
                <div className="font-fraunces font-medium text-supplied-amber mb-1" style={{ fontSize: 32 }}>{s.value}</div>
                <div className="text-[11px] text-white/40 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* TEAM */}
      <section className="bg-supplied-ink text-white" style={{ padding: "80px 0 100px" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px" }}>
          <Reveal>
            <div className="text-center mb-14">
              <Tag className="mb-4">The Team</Tag>
              <h2 className="font-extrabold text-white" style={{ fontSize: 36 }}>
                Small team.{" "}
                <em className="font-fraunces italic font-medium" style={{ color: AMBER }}>Big reach.</em>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-5 gap-5">
            {[...founders, ...rest].map((m) => (
              <Reveal key={m.slug}>
                <TeamCard {...m} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "100px 40px" }}>
        <Reveal><Tag className="mb-4">How We Work</Tag></Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <Reveal key={v.num} delay={i * 0.1}>
              <div className="p-7 bg-white rounded-2xl border border-supplied-ink/[0.04] h-full">
                <span className="font-fraunces font-light text-supplied-amber/15 block mb-2" style={{ fontSize: 40 }}>{v.num}</span>
                <h3 className="text-[17px] font-semibold mb-3">{v.title}</h3>
                <p className="text-sm leading-[1.75] text-supplied-ink-60">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHAT WE COVER */}
      <section className="bg-white" style={{ padding: "80px 0" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px" }}>
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <Tag className="mb-4">What We Cover</Tag>
                <h2 className="font-extrabold text-supplied-ink leading-[1.25] mb-6" style={{ fontSize: 32 }}>
                  End-to-end.{" "}
                  <em className="font-fraunces italic font-medium" style={{ color: AMBER }}>Not just the box.</em>
                </h2>
                <div className="grid grid-cols-2 gap-2.5">
                  {capabilities.map((x) => (
                    <div key={x} className="flex items-center gap-2.5 py-2.5">
                      <div className="w-[5px] h-[5px] rounded-full bg-supplied-amber shrink-0" />
                      <span className="text-sm text-supplied-ink-60">{x}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Placeholder for map / global reach visual */}
              <div className="relative rounded-2xl overflow-hidden bg-supplied-ink" style={{ aspectRatio: "4/3" }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 rounded-full border-2 border-supplied-amber/25 flex items-center justify-center">
                    <span className="text-xl text-supplied-amber">+</span>
                  </div>
                  <span className="text-[11px] text-white/35 font-medium">Global manufacturing network map or team photo</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="bg-supplied-ink" style={{ padding: "80px 0" }}>
        <Reveal>
          <div className="text-center" style={{ maxWidth: 880, margin: "0 auto", padding: "0 40px" }}>
            <div className="font-fraunces text-supplied-amber leading-[0.8] mb-4" style={{ fontSize: 72 }}>&ldquo;</div>
            <p className="font-fraunces font-light italic text-white leading-[1.65] mb-8" style={{ fontSize: "clamp(18px,2.2vw,24px)" }}>
              We built Supplied because the packaging industry treats growing brands like an afterthought. We think they deserve the infrastructure, attention, and strategic thinking that the biggest names get — without the overheads.
            </p>
            <span className="text-sm font-semibold text-white">The Founders</span>
            <span className="text-[13px] text-supplied-ink-40 ml-2.5">Supplied Agency</span>
          </div>
        </Reveal>
      </section>

      {/* LOCATIONS */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "80px 40px" }}>
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offices.map((loc) => (
              <div key={loc.label} className="p-8 bg-white rounded-2xl border border-supplied-ink/[0.04]">
                <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-supplied-amber mb-2">{loc.label}</div>
                <h3 className="font-fraunces text-2xl font-normal mb-2">{loc.name}</h3>
                <p className="text-sm text-supplied-ink-60 leading-relaxed mb-2">{loc.address}</p>
                <p className="text-[13px] text-supplied-ink-40 italic">{loc.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="bg-supplied-ink" style={{ padding: "80px 0" }}>
        <Reveal>
          <div className="text-center" style={{ maxWidth: 680, margin: "0 auto", padding: "0 40px" }}>
            <h2 className="font-extrabold text-white mb-3" style={{ fontSize: 32 }}>
              Like what you see?{" "}
              <em className="font-fraunces italic font-medium" style={{ color: AMBER }}>Let&apos;s talk packaging.</em>
            </h2>
            <p className="text-[15px] text-supplied-ink-40 leading-[1.7] mb-8">
              Whether you&apos;re scaling fast, launching something new, or just tired of chasing suppliers — we&apos;d love to hear from you.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/contact-us"
                className="inline-block px-9 py-4 bg-supplied-amber text-white rounded-[10px] text-[15px] font-semibold hover:opacity-90 transition-opacity"
              >
                Start a Project &rarr;
              </Link>
              <Link
                href="/client-stories"
                className="inline-block px-9 py-4 bg-transparent text-white rounded-[10px] text-[15px] font-semibold border border-white/15 hover:border-white/30 transition-colors"
              >
                See Our Work
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
