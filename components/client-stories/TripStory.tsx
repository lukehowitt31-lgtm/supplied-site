"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { UnboxingOverlayCTA } from "@/components/client-stories/UnboxingOverlayCTA";
import { getSection, getSectionItems, splitParagraphs } from "@/components/client-stories/storyHelpers";
import type { ClientStoryDetail } from "@/types/clientStory";

const C = { amber: "#C8773E", ink: "#1A1A1A", ink60: "#666", ink40: "#8A8A8A", cream: "#FAF9F6", white: "#FFF" };

const SectionTag = ({ children }: { children: React.ReactNode }) => <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: C.amber, display: "block", marginBottom: 20 }}>{children}</span>;

const defaultHeroTags = ["Custom Rigid Tube", "Custom Inner Collar", "EU Production", "Supply Chain Success"];
const defaultHeroMetrics = [
  { v: "–6 wks", l: "Lead Time Reduction" },
  { v: "50%", l: "Faster Turnaround" },
  { v: "<6 wks", l: "New Lead Time" },
  { v: "Monthly", l: "Replenishment Orders" },
];
const defaultHeroSubheadline =
  "Reducing lead times, improving flexibility, and maintaining brand integrity — all while keeping costs competitive.";
const defaultChallenge = "TRIP, one of the UK's fastest-growing CBD brands, had built significant retail and D2C momentum. But their tube packaging supply chain — sourced from China — was creating friction at the rate they were scaling.";
const defaultSolutionContext = "Lead times of 12+ weeks were creating bottlenecks, making it difficult to respond quickly to market demand and inventory fluctuations.";
const defaultResultContext = "";
const defaultChallengeCards = [
  {
    n: "01",
    t: "Long Lead Times",
    d: "Sourcing from China took over 12 weeks, creating bottlenecks that made it difficult to respond quickly to market demand and inventory fluctuations.",
  },
  {
    n: "02",
    t: "Cost vs. Flexibility",
    d: "TRIP needed a more agile supply chain that would allow them to scale production based on fluctuating demand while maintaining competitive pricing.",
  },
  {
    n: "03",
    t: "Brand Integrity",
    d: "As a brand with a strong identity, TRIP required precise colour matching to ensure product consistency, making any supplier transition more complex.",
  },
];
const defaultSolutionCards = [
  {
    n: "01",
    t: "Faster Sourcing & Production",
    d: "We sourced the product from Europe, successfully cutting the total lead time from 12+ weeks to just 5–6 weeks.",
  },
  {
    n: "02",
    t: "Competitive Pricing with Scalability",
    d: "We structured a cost-effective solution that matched — and in many cases outperformed — the CN supplier's pricing, with a scalable model that improves with volume.",
  },
  {
    n: "03",
    t: "Two-Stage Sampling for Accuracy",
    d: "Blank samples confirmed size, material quality and structural integrity. Printed samples delivered within 3 weeks allowed TRIP to assess colour accuracy before full production.",
  },
  {
    n: "04",
    t: "Streamlined Order Process",
    d: "With the new supply chain in place, TRIP can now place orders with confidence, securing deliveries in under 6 weeks with full visibility.",
  },
];
const defaultResultStats = [
  { s: "50%", d: "Faster lead times — from 12+ weeks to just 5–6 weeks" },
  { s: "Better", d: "Cost efficiency than CN, with long-term savings through scalable volumes" },
  { s: "Monthly", d: "Replenishment orders — a supply chain that supports rapid growth" },
];
const defaultQuote =
  "Supplied made everything super easy by quickly finding more cost effective packaging options with faster lead times, handling all the details, and getting the samples perfect on the first try. Our Supply team seamlessly switched from old to new supply without impacting customer orders.";
const defaultQuoteAuthor = "Emily Gault";
const defaultQuoteRole = "Innovation & Implementation Manager, TRIP";
const defaultTakeawayLead =
  "Fast-growing brands can't afford supply chains that hold them back. By transitioning TRIP's tube production from China to Europe, we halved their lead times, improved cost efficiency, and gave them the agility to scale on their terms.";
const defaultTakeawayBody =
  "Better supply chains aren't just about speed. They're about ";
const defaultTakeawayAccent = "control, confidence, and growth without friction.";
const defaultCtaHeading = "Supply chain holding you back from ";
const defaultCtaHeadingAccent = "scaling faster?";
const defaultCtaBody = "Let's fix that.";
const defaultUnboxingSummaryLines = [
  "50% faster lead times with EU production.",
  "Precise colour matching maintained.",
  "Monthly replenishment orders, seamlessly fulfilled.",
];
const defaultUnboxingQuoteShort =
  "Supplied made everything super easy by quickly finding more cost effective packaging options with faster lead times.";
const defaultHeroImage = "/images/client-stories/trip-hero.png";

export default function TripStory({ story }: { story?: ClientStoryDetail }) {
  const contextSec = getSection(story, "context");
  const challengeSec = getSection(story, "challenge");
  const solutionSec = getSection(story, "solution");
  const resultsSec = getSection(story, "results");
  const takeawaySec = getSection(story, "takeaway");
  const ctaSec = getSection(story, "cta");

  const heroImage = story?.heroImage || defaultHeroImage;
  const bodyImage1 = story?.bodyImage1 || heroImage;
  const bodyImage2 = story?.bodyImage2 || heroImage;
  const heroTags = story?.heroTags?.length ? story.heroTags : defaultHeroTags;

  const storyMetrics = Array.isArray(story?.metrics)
    ? story.metrics.map((m) => ({ v: m.value, l: m.label })).filter((m) => m.v && m.l)
    : [];
  const heroMetrics = defaultHeroMetrics.map((m, i) => storyMetrics[i] ?? m);

  const cmsContextParas = splitParagraphs(getSection(story, "context")?.body);
  const contextParas = [
    cmsContextParas[0] || defaultChallenge,
    cmsContextParas[1] || defaultSolutionContext,
    cmsContextParas[2] || defaultResultContext,
  ];

  const challengeItems = getSectionItems(story, "challenge");
  const challengeCards = challengeItems
    ? challengeItems.map((item, i) => ({
        n: item.value || String(i + 1).padStart(2, "0"),
        t: item.title || "",
        d: item.body || "",
      }))
    : defaultChallengeCards;

  const solutionItems = getSectionItems(story, "solution");
  const solutionCards = solutionItems
    ? solutionItems.map((item, i) => ({
        n: item.value || String(i + 1).padStart(2, "0"),
        t: item.title || "",
        d: item.body || "",
      }))
    : defaultSolutionCards;

  const resultsItems = getSectionItems(story, "results");
  const resultStats = resultsItems
    ? resultsItems.map((item) => ({
        s: item.value || "",
        d: item.title || item.body || "",
      }))
    : defaultResultStats;

  const quoteText = story?.quote || defaultQuote;
  const quoteAttribution = story?.quoteAuthor
    ? `— ${story.quoteAuthor}${story.quoteRole ? `, ${story.quoteRole}` : ""}`
    : `— ${defaultQuoteAuthor}, ${defaultQuoteRole}`;

  const ctaHref = story?.ctaHref || "/contact-us";
  const ctaLabel = story?.ctaLabel || "Start a Project";

  const overlayQuote = story?.quote || defaultUnboxingQuoteShort;
  const overlayAttribution = story?.quoteAuthor
    ? `— ${story.quoteAuthor}${story.quoteRole ? `, ${story.quoteRole}` : ""}`
    : `— ${defaultQuoteAuthor}, ${defaultQuoteRole}`;

  return (
    <div style={{ color: C.ink, background: C.cream, overflowX: "hidden" }}>
      {/* HERO */}
      <section className="relative overflow-hidden flex items-center min-h-[88vh] pt-28 md:pt-[140px] pb-16 md:pb-[110px]" style={{ background: C.ink, color: C.white }}>
        <div className="absolute inset-0" style={{ backgroundImage: `url('${heroImage}')`, backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,26,26,.93) 0%, rgba(26,26,26,.85) 40%, rgba(26,26,26,.6) 100%)", zIndex: 1 }} />
        <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 pointer-events-none select-none hidden md:block" style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "min(28vw,420px)", fontWeight: 300, color: "rgba(200,119,62,.035)", lineHeight: 1, zIndex: 2 }}>TRIP</div>
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 relative z-[3] w-full">
          <div className="af" style={{ animationDelay: ".1s", opacity: 0 }}><SectionTag>Client Story</SectionTag></div>
          <div className="af" style={{ animationDelay: ".15s", opacity: 0, marginBottom: 28 }}>
            <img src="/images/logos/trip.svg" alt="TRIP" className="h-8 md:h-10 brightness-0 invert opacity-90" />
          </div>
          <h1 className="af font-extrabold text-white" style={{ animationDelay: ".25s", opacity: 0, fontSize: "clamp(32px,6vw,80px)", lineHeight: 1.05, marginBottom: 16, maxWidth: 820 }}>
            {story?.heroHeadline ? (
              story.heroHeadline.split("|").map((part, i, arr) =>
                i === 0 ? (
                  <span key={i}>
                    {part}
                    {arr.length > 1 ? " " : ""}
                  </span>
                ) : (
                  <em key={i} className="font-fraunces italic font-medium">
                    {part}
                  </em>
                )
              )
            ) : (
              <>
                Accelerating Supply Chains for a <em className="font-fraunces italic font-medium">Fast-Growing Brand.</em>
              </>
            )}
          </h1>
          <p className="af" style={{ animationDelay: ".35s", opacity: 0, fontSize: 17, color: "rgba(255,255,255,.55)", marginBottom: 40, maxWidth: 600, lineHeight: 1.7 }}>
            {story?.heroSubheadline || defaultHeroSubheadline}
          </p>
          <div className="af" style={{ animationDelay: ".45s", opacity: 0, display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 56 }}>
            {heroTags.map((p) => <span key={p} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 500, border: "1px solid rgba(200,119,62,.25)", color: C.amber, background: "rgba(200,119,62,.05)" }}>{p}</span>)}
          </div>
          <div className="af grid grid-cols-2 md:grid-cols-4" style={{ animationDelay: ".55s", opacity: 0, gap: 1, background: "rgba(255,255,255,.05)", borderRadius: 16, overflow: "hidden", maxWidth: 820 }}>
            {heroMetrics.map((m, i) => (
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
          <div><SectionTag>{contextSec?.tag || "The Context"}</SectionTag><h2 className="font-extrabold" style={{ fontSize: "clamp(26px,3.5vw,34px)", lineHeight: 1.25 }}>{contextSec?.heading || "A supply chain built for"} <em className="font-fraunces italic font-medium">{contextSec?.headingAccent || "yesterday's demand."}</em></h2></div>
          <div style={{ fontSize: 16, lineHeight: 1.85, color: C.ink60 }}>
            <p style={{ marginBottom: 20 }}>{contextParas[0]}</p>
            <p style={{ fontWeight: 500, color: C.ink }}>{contextParas[1]}</p>
            {contextParas[2] ? <p style={{ marginTop: 20 }}>{contextParas[2]}</p> : null}
          </div>
        </div></Reveal>
      </section>

      {/* IMAGE BREAK */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-10 pb-16 md:pb-[100px]">
        <Reveal>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9]">
            <div className="absolute inset-0" style={{ backgroundImage: `url('${bodyImage1}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(26,26,26,.6) 0%, transparent 50%)" }} />
          </div>
        </Reveal>
      </section>

      {/* CHALLENGE */}
      <section className="py-16 md:py-20" style={{ background: C.ink, color: C.white }}>
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <Reveal><SectionTag>{challengeSec?.tag || "The Challenge"}</SectionTag><h2 className="font-extrabold text-white" style={{ fontSize: "clamp(24px,3vw,32px)", marginBottom: 48, maxWidth: 550 }}>{challengeSec?.heading || "Three interconnected pressures"} <em className="font-fraunces italic font-medium">{challengeSec?.headingAccent || "holding growth back."}</em></h2></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {challengeCards.map((c, i) => (
              <Reveal key={c.n} delay={i * 120}><div style={{ borderTop: `2px solid ${C.amber}`, paddingTop: 24 }}>
                <span style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 48, fontWeight: 300, color: "rgba(200,119,62,.18)" }}>{c.n}</span>
                <h3 style={{ fontSize: 17, fontWeight: 600, margin: "8px 0 10px" }}>{c.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,.55)" }}>{c.d}</p>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-10 py-16 md:py-[100px]">
        <Reveal><SectionTag>{solutionSec?.tag || "Our Solution"}</SectionTag><h2 className="font-extrabold" style={{ fontSize: "clamp(26px,3.5vw,34px)", marginBottom: 48, maxWidth: 600 }}>{solutionSec?.heading || "A structured transition to"} <em className="font-fraunces italic font-medium">{solutionSec?.headingAccent || "European production."}</em></h2></Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {solutionCards.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}><div style={{ padding: 28, background: C.white, borderRadius: 14, border: "1px solid rgba(26,26,26,.04)" }}>
              <span style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 13, fontWeight: 500, color: C.amber }}>{s.n}</span>
              <h3 style={{ fontSize: 17, fontWeight: 600, margin: "10px 0 10px" }}>{s.t}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: C.ink60 }}>{s.d}</p>
            </div></Reveal>
          ))}
        </div>
      </section>

      {/* RESULTS */}
      <section className="py-16 md:py-20" style={{ background: C.ink, color: C.white }}>
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <Reveal>
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] mb-8 md:mb-12">
              <div className="absolute inset-0" style={{ backgroundImage: `url('${bodyImage2}')`, backgroundSize: "cover", backgroundPosition: "center 65%" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to left, rgba(26,26,26,.6) 0%, transparent 50%)" }} />
            </div>
          </Reveal>
          <Reveal><SectionTag>{resultsSec?.tag || "The Results"}</SectionTag></Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 md:mb-10">
            {resultStats.map((r, i) => (
              <Reveal key={i} delay={i * 100}><div className="p-6 md:p-8 text-center" style={{ background: "rgba(255,255,255,.03)", borderRadius: 14, border: "1px solid rgba(255,255,255,.04)" }}>
                <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "clamp(32px,4vw,44px)", fontWeight: 400, color: C.amber, marginBottom: 8 }}>{r.s}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1.5 }}>{r.d}</div>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-16 md:py-[88px]" style={{ background: C.white }}>
        <Reveal><div className="max-w-[880px] mx-auto px-5 md:px-10 text-center">
          <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 72, color: C.amber, lineHeight: .8, marginBottom: 16 }}>&ldquo;</div>
          <p style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "clamp(18px,2.4vw,26px)", fontWeight: 300, fontStyle: "italic", color: C.ink, lineHeight: 1.65, marginBottom: 32 }}>{quoteText}</p>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{story?.quoteAuthor || defaultQuoteAuthor}</span><span style={{ fontSize: 13, color: C.ink40, marginLeft: 10 }}>{story?.quoteRole || defaultQuoteRole}</span>
        </div></Reveal>
      </section>

      {/* TAKEAWAY */}
      <section className="py-16 md:py-20" style={{ background: C.white }}>
        <Reveal><div className="max-w-[780px] mx-auto px-5 md:px-10">
          <SectionTag>{takeawaySec?.tag || "The Takeaway"}</SectionTag>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: C.ink60, marginBottom: 20 }}>{takeawaySec?.heading || defaultTakeawayLead}</p>
          <p style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 22, fontWeight: 400, fontStyle: "italic", color: C.ink, lineHeight: 1.5 }}>{takeawaySec?.body || defaultTakeawayBody}<span style={{ color: C.amber }}>{takeawaySec?.headingAccent || defaultTakeawayAccent}</span></p>
        </div></Reveal>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20" style={{ background: C.ink }}>
        <Reveal><div className="max-w-[680px] mx-auto px-5 md:px-10 text-center">
          <h2 className="font-extrabold text-white" style={{ fontSize: "clamp(24px,3vw,30px)", marginBottom: 12 }}>{ctaSec?.heading || defaultCtaHeading}<em className="font-fraunces italic font-medium">{ctaSec?.headingAccent || defaultCtaHeadingAccent}</em></h2>
          <p style={{ fontSize: 14, color: C.ink40, marginBottom: 32 }}>{ctaSec?.body || defaultCtaBody}</p>
          <Link href={ctaHref} style={{ display: "inline-block", padding: "15px 36px", background: C.amber, color: C.white, borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>{ctaLabel} →</Link>
        </div></Reveal>
      </section>
      <UnboxingOverlayCTA
        content={{
          videoSrc: "/videos/TripTubeTiktok.mp4",
          contextLabel: "TikTok · TRIP",
          summaryLines: defaultUnboxingSummaryLines,
          quote: overlayQuote,
          quoteAttribution: overlayAttribution,
        }}
      />
    </div>
  );
}
