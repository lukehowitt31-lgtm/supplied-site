"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { UnboxingOverlayCTA } from "@/components/client-stories/UnboxingOverlayCTA";
import { getSection, getSectionItems, splitParagraphs } from "@/components/client-stories/storyHelpers";
import type { ClientStoryDetail } from "@/types/clientStory";

const C = { amber: "#C8773E", ink: "#1A1A1A", ink60: "#666", ink40: "#8A8A8A", cream: "#FAF9F6", white: "#FFF" };

const SectionTag = ({ children }: { children: React.ReactNode }) => <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: C.amber, display: "block", marginBottom: 20 }}>{children}</span>;

interface HealfStoryProps {
  story?: ClientStoryDetail;
}

const fallbackHero = {
  image: "/images/client-stories/healf-hero.png",
  headingLead: "The Packaging Infrastructure Behind",
  headingAccent: "434% Growth.",
};

const fallbackHeroTags = [
  "End-to-End Partner",
  "Forecast-Led Supply",
  "EU Production",
  "10–15 SKUs",
  "434% Growth Year",
];

const fallbackHeroMetrics = [
  { v: "434%", l: "Growth Year" },
  { v: "10–15", l: "SKUs Managed" },
  { v: "6–10", l: "Deliveries/Year" },
  { v: "30%+", l: "Cost Saving" },
];

const fallbackContextParagraphs = [
  "When we began working with Healf nearly two years ago, the brand was accelerating rapidly. A lean team. Exceptional marketing execution. Clear premium positioning.",
  "But packaging had not yet been structured for scale. Lead times ranged from two weeks for plain UK shippers to up to three months for cost-first overseas supply. Forecasting was reactive. Supplier sourcing was fragmented.",
  "At modest growth, that's inefficient. At 434% annual growth, it becomes a risk.",
];

const fallbackQuote = {
  text: "From ideation to execution, the attention to detail and care shown by Supplied is second to none. They delivered a high-quality product with an incredibly fast turnaround, and were an absolute pleasure to work with throughout.",
  author: "Oscar",
  role: "Head of Brand, Healf",
};

const fallbackCta = {
  href: "/contact-us",
  label: "Start a Project",
};

function splitHeroHeading(title: string) {
  const trimmed = title.trim();
  if (!trimmed) {
    return {
      lead: fallbackHero.headingLead,
      accent: fallbackHero.headingAccent,
    };
  }

  const sentenceParts = trimmed
    .split(". ")
    .map((part) => part.trim())
    .filter(Boolean);

  if (sentenceParts.length > 1) {
    const leadParts = sentenceParts.slice(0, -1);
    const accent = sentenceParts[sentenceParts.length - 1];
    return {
      lead: `${leadParts.join(". ")}.`,
      accent: accent.endsWith(".") ? accent : `${accent}.`,
    };
  }

  const words = trimmed.split(/\s+/);
  if (words.length > 2) {
    return {
      lead: words.slice(0, -2).join(" "),
      accent: words.slice(-2).join(" "),
    };
  }

  return {
    lead: trimmed,
    accent: "",
  };
}

export default function HealfStory({ story }: HealfStoryProps) {
  const heroImage = story?.heroImage || fallbackHero.image;
  const bodyImage1 = story?.bodyImage1 || heroImage;
  const bodyImage2 = story?.bodyImage2 || heroImage;
  const bodyImage3 = story?.bodyImage3 || heroImage;
  const heroHeading = story?.heroHeadline
    ? splitHeroHeading(story.heroHeadline)
    : splitHeroHeading(`${fallbackHero.headingLead} ${fallbackHero.headingAccent}`);
  const heroTags = story?.heroTags?.length ? story.heroTags : fallbackHeroTags;

  const storyMetrics = Array.isArray(story?.metrics)
    ? story.metrics
        .map((metric) => ({
          v: metric.value.trim(),
          l: metric.label.trim(),
        }))
        .filter((metric) => metric.v && metric.l)
    : [];

  const heroMetrics = fallbackHeroMetrics.map(
    (metric, index) => storyMetrics[index] ?? metric
  );

  const cmsContextParas = splitParagraphs(getSection(story, "context")?.body);
  const contextParagraphs = [
    cmsContextParas[0] || fallbackContextParagraphs[0],
    cmsContextParas[1] || fallbackContextParagraphs[1],
    cmsContextParas[2] || fallbackContextParagraphs[2],
  ];

  const contextSec = getSection(story, "context");
  const challengeSec = getSection(story, "challenge");
  const ownershipSec = getSection(story, "ownership");
  const approachSec = getSection(story, "approach");
  const resultsSec = getSection(story, "results");
  const takeawaySec = getSection(story, "takeaway");
  const ctaSec = getSection(story, "cta");

  const quoteText = story?.quote || fallbackQuote.text;
  const quoteAuthor = story?.quoteAuthor || fallbackQuote.author;
  const quoteRole = story?.quoteRole || fallbackQuote.role;

  const ctaHref = story?.ctaHref || fallbackCta.href;
  const ctaLabel = story?.ctaLabel || fallbackCta.label;

  return (
    <div style={{ color: C.ink, background: C.cream, overflowX: "hidden" }}>
      {/* HERO */}
      <section className="relative overflow-hidden flex items-center min-h-[88vh] pt-28 md:pt-[140px] pb-16 md:pb-[110px]" style={{ background: C.ink, color: C.white }}>
        <div className="absolute inset-0" style={{ backgroundImage: `url('${heroImage}')`, backgroundSize: "cover", backgroundPosition: "center 35%", zIndex: 0 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,26,26,.93) 0%, rgba(26,26,26,.85) 40%, rgba(26,26,26,.6) 100%)", zIndex: 1 }} />
        <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 pointer-events-none select-none hidden md:block" style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "min(28vw,420px)", fontWeight: 300, color: "rgba(200,119,62,.035)", lineHeight: 1, zIndex: 2 }}>healf.</div>
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 relative z-[3] w-full">
          <div className="af" style={{ animationDelay: ".1s", opacity: 0 }}><SectionTag>Client Story</SectionTag></div>
          <div className="af" style={{ animationDelay: ".15s", opacity: 0, marginBottom: 28 }}>
            <img src="/images/logos/healf.svg" alt="Healf" className="h-8 md:h-10 brightness-0 invert opacity-90" />
          </div>
          <h1 className="af font-extrabold text-white" style={{ animationDelay: ".25s", opacity: 0, fontSize: "clamp(32px,6vw,80px)", lineHeight: 1.05, marginBottom: 32, maxWidth: 820 }}>
            {heroHeading.lead}{" "}
            {heroHeading.accent ? (
              <em className="font-fraunces italic font-medium">{heroHeading.accent}</em>
            ) : null}
          </h1>
          <div className="af flex flex-wrap gap-2 mb-10 md:mb-14" style={{ animationDelay: ".4s", opacity: 0 }}>
            {heroTags.map((p) => <span key={p} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 500, border: "1px solid rgba(200,119,62,.25)", color: C.amber, background: "rgba(200,119,62,.05)" }}>{p}</span>)}
          </div>
          <div className="af grid grid-cols-2 md:grid-cols-4" style={{ animationDelay: ".55s", opacity: 0, gap: 1, background: "rgba(255,255,255,.05)", borderRadius: 16, overflow: "hidden", maxWidth: 820 }}>
            {heroMetrics.map((m,i) => (
              <div key={i} className="py-6 px-4 md:py-[30px] md:px-5 text-center" style={{ background: "rgba(255,255,255,.015)" }}>
                <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "clamp(28px,4vw,38px)", fontWeight: 500, color: C.amber, marginBottom: 4 }}>{m.v}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", fontWeight: 500 }}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTEXT */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-10 py-16 md:py-[100px]">
        <Reveal><div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-8 lg:gap-20">
          <div><SectionTag>{contextSec?.tag || "The Context"}</SectionTag><h2 className="font-extrabold" style={{ fontSize: "clamp(26px,3.5vw,34px)", lineHeight: 1.25 }}>{contextSec?.heading || "A brand scaling fast."} <em className="font-fraunces italic font-medium">{contextSec?.headingAccent || "Packaging hadn\u0027t caught up."}</em></h2></div>
          <div style={{ fontSize: 16, lineHeight: 1.85, color: C.ink60 }}>
            <p style={{ marginBottom: 20 }}>{contextParagraphs[0]}</p>
            <p style={{ marginBottom: 20 }}>{contextParagraphs[1]}</p>
            <p style={{ fontWeight: 500, color: C.ink }}>{contextParagraphs[2]}</p>
          </div>
        </div></Reveal>
      </section>

      {/* IMAGE BREAK */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-10 pb-16 md:pb-[100px]">
        <Reveal>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9]">
            <div className="absolute inset-0" style={{ backgroundImage: `url('${bodyImage1}')`, backgroundSize: "cover", backgroundPosition: "center 35%" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(26,26,26,.6) 0%, transparent 50%)" }} />
          </div>
        </Reveal>
      </section>

      {/* CHALLENGE */}
      <section className="py-16 md:py-20" style={{ background: C.ink, color: C.white }}>
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <Reveal><SectionTag>{challengeSec?.tag || "The Challenge"}</SectionTag><h2 className="font-extrabold text-white" style={{ fontSize: "clamp(24px,3vw,32px)", marginBottom: 48, maxWidth: 550 }}>{challengeSec?.heading || "Three structural issues"} <em className="font-fraunces italic font-medium">{challengeSec?.headingAccent || "blocking scale."}</em></h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(getSectionItems(story, "challenge") || [{value:"01",title:"Reactive Sourcing",body:"Suppliers selected opportunistically, without long-term forecasting or supply chain visibility."},{value:"02",title:"Brand Misalignment",body:"Plain shipper boxes with branded tape did not reflect Healf's premium positioning."},{value:"03",title:"Lead Time Volatility",body:"Two-week local turnaround versus three-month overseas production created instability and stock risk."}]).map((c,i) => ({n: c.value || String(i+1).padStart(2,"0"), t: c.title || "", d: c.body || ""})).map((c,i) => (
              <Reveal key={c.n} delay={i*120}><div style={{ borderTop: `2px solid ${C.amber}`, paddingTop: 24 }}>
                <span style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 48, fontWeight: 300, color: "rgba(200,119,62,.18)" }}>{c.n}</span>
                <h3 style={{ fontSize: 17, fontWeight: 600, margin: "8px 0 10px" }}>{c.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,.55)" }}>{c.d}</p>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OWNERSHIP */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-10 py-16 md:py-[100px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <div>
            <Reveal><SectionTag>{ownershipSec?.tag || "What We Took Ownership Of"}</SectionTag><h2 className="font-extrabold" style={{ fontSize: "clamp(26px,3.5vw,34px)", marginBottom: 32, maxWidth: 600 }}>{ownershipSec?.heading || 'From "ordered when needed" to'} <em className="font-fraunces italic font-medium">{ownershipSec?.headingAccent || "engineered infrastructure."}</em></h2></Reveal>
            <div className="grid grid-cols-1 gap-3">
              {(getSectionItems(story, "ownership")?.map(i => i.title || "") || ["5 core D2C shipper SKUs","Annual premium Advent Calendar","Healf:Zone flagship device packaging","Branded tape","Merch and experiential packaging","Structured forecast planning","Delivery scheduling aligned to 3PL","10–15 SKUs across 6–10 shipments/year"]).map((x,i) => (
                <Reveal key={i} delay={i*40}><div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 22px", background: C.white, borderRadius: 10, border: "1px solid rgba(26,26,26,.04)" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.amber, flexShrink: 0 }} /><span style={{ fontSize: 14, color: C.ink60 }}>{x}</span>
                </div></Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={100}>
            <div className="relative rounded-2xl overflow-hidden h-full min-h-[400px]">
              <div className="absolute inset-0" style={{ backgroundImage: `url('${bodyImage2}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* APPROACH */}
      <section className="py-16 md:py-20" style={{ background: C.white }}>
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <Reveal><SectionTag>{approachSec?.tag || "Our Approach"}</SectionTag></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{n:"01",t:"Build Scalable Infrastructure",p:["Planned production cadence","Optimised MOQs aligned to growth","Consistent EU-based supply chain","Structured delivery schedules"],s:"Replaced fragmented sourcing with predictable supply."},{n:"02",t:"Elevate the Brand Experience",p:["Deep black board","Crisp white logo","Consistent premium finish"],s:"The box became a recognisable brand asset, not just a shipper."},{n:"03",t:"Support Growth Without Friction",p:["SKU count expanded strategically","Launch timelines accelerated","Operational stress reduced","Packaging remained stable"],s:"During a 434% growth year, packaging did not become a limiting factor."}].map((a,i) => (
              <Reveal key={a.n} delay={i*100}><div style={{ padding: 28, background: C.cream, borderRadius: 14, height: "100%", display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 13, fontWeight: 500, color: C.amber }}>{a.n}</span>
                <h3 style={{ fontSize: 17, fontWeight: 600, margin: "10px 0 16px" }}>{a.t}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 16, flex: 1 }}>
                  {a.p.map((p,j) => <div key={j} style={{ display: "flex", alignItems: "center", gap: 9 }}><div style={{ width: 4, height: 4, borderRadius: "50%", background: C.amber, flexShrink: 0 }} /><span style={{ fontSize: 13, color: C.ink60 }}>{p}</span></div>)}
                </div>
                <p style={{ fontSize: 13, fontWeight: 500, color: C.ink, lineHeight: 1.6, paddingTop: 14, borderTop: "1px solid rgba(26,26,26,.06)" }}>{a.s}</p>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-16 md:py-[88px] mt-12 md:mt-20" style={{ background: C.ink }}>
        <Reveal><div className="max-w-[880px] mx-auto px-5 md:px-10 text-center">
          <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 72, color: C.amber, lineHeight: .8, marginBottom: 16 }}>&ldquo;</div>
          <p style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "clamp(18px,2.4vw,26px)", fontWeight: 300, fontStyle: "italic", color: C.white, lineHeight: 1.65, marginBottom: 32 }}>{quoteText}</p>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.white }}>{quoteAuthor}</span><span style={{ fontSize: 13, color: C.ink40, marginLeft: 10 }}>{quoteRole}</span>
        </div></Reveal>
      </section>

      {/* RESULTS */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-10 py-16 md:py-[100px]">
        <Reveal>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] mb-8 md:mb-12">
            <div className="absolute inset-0" style={{ backgroundImage: `url('${bodyImage3}')`, backgroundSize: "cover", backgroundPosition: "center 65%" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to left, rgba(26,26,26,.6) 0%, transparent 50%)" }} />
          </div>
        </Reveal>
        <Reveal><SectionTag>{resultsSec?.tag || "The Results"}</SectionTag></Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 mb-8">
          {(getSectionItems(story, "results") || [{value:"434%",body:"Growth supported without packaging bottlenecks"},{value:"10–15",body:"Active SKUs managed under one partner"},{value:"6–10",body:"Structured deliveries annually"},{value:"30%+",body:"Cost saving vs equivalent sourced elsewhere"}]).map((r,i) => ({s: r.value || "", d: r.body || ""})).map((r,i) => (
            <Reveal key={i} delay={i*80}><div className="flex items-center gap-5 md:gap-6 p-6 md:p-8" style={{ background: C.white, borderRadius: 14, border: "1px solid rgba(26,26,26,.04)" }}>
              <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "clamp(32px,4vw,46px)", fontWeight: 400, color: C.amber, flexShrink: 0, minWidth: 80, textAlign: "center" }}>{r.s}</div>
              <div style={{ fontSize: 15, color: C.ink60, lineHeight: 1.55 }}>{r.d}</div>
            </div></Reveal>
          ))}
        </div>
        <Reveal delay={200}><div className="p-6 md:p-7 md:px-9" style={{ background: C.ink, borderRadius: 14 }}>
          <p style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "clamp(16px,2vw,20px)", fontWeight: 400, fontStyle: "italic", color: C.white, lineHeight: 1.55 }}>{resultsSec?.body || "Packaging is no longer a stress point internally. It is structured, predictable and aligned with brand ambition."}</p>
        </div></Reveal>
      </section>

      {/* TAKEAWAY */}
      <section className="py-16 md:py-20" style={{ background: C.white }}>
        <Reveal><div className="max-w-[780px] mx-auto px-5 md:px-10">
          <SectionTag>{takeawaySec?.tag || "The Takeaway"}</SectionTag>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: C.ink60, marginBottom: 20 }}>{takeawaySec?.heading || "High-growth brands do not struggle because of marketing. They struggle when operational complexity catches up. Packaging is often one of the first pressure points — fragmented sourcing, unstable lead times, poor cost visibility."}</p>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: C.ink, fontWeight: 500 }}>{takeawaySec?.body || "For Healf, we removed packaging as a growth risk. We built the infrastructure behind the scenes so scale could happen without friction."}</p>
        </div></Reveal>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20" style={{ background: C.ink }}>
        <Reveal><div className="max-w-[680px] mx-auto px-5 md:px-10 text-center">
          <h2 className="font-extrabold text-white" style={{ fontSize: "clamp(24px,3vw,30px)", marginBottom: 12 }}>{ctaSec?.heading || "Scaling quickly and packaging still"} <em className="font-fraunces italic font-medium">{ctaSec?.headingAccent || "feels reactive?"}</em></h2>
          <p style={{ fontSize: 14, color: C.ink40, marginBottom: 32 }}>{ctaSec?.body || "Let\u0027s structure it properly."}</p>
          <Link href={ctaHref} style={{ display: "inline-block", padding: "15px 36px", background: C.amber, color: C.white, borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>{ctaLabel} →</Link>
        </div></Reveal>
      </section>
      <UnboxingOverlayCTA
        content={{
          videoSrc: "/videos/HealfAdventTiktok.mp4",
          contextLabel: "TikTok · Healf Advent",
          summaryLines: [
            "Premium unboxing that customers share.",
            "Packaging designed to drive retention.",
            "Every detail considered, from open to reveal.",
          ],
          quote: "The attention to detail is second to none.",
          quoteAttribution: "— Oscar, Head of Brand",
        }}
      />
    </div>
  );
}
