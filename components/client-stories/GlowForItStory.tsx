"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { UnboxingOverlayCTA } from "@/components/client-stories/UnboxingOverlayCTA";
import { getSection, getSectionItems } from "@/components/client-stories/storyHelpers";
import type { ClientStoryDetail, ClientStorySection } from "@/types/clientStory";

const C = { amber: "#C8773E", ink: "#1A1A1A", ink60: "#666", ink40: "#8A8A8A", cream: "#FAF9F6", white: "#FFF" };

const SectionTag = ({ children }: { children: React.ReactNode }) => <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: C.amber, display: "block", marginBottom: 20 }}>{children}</span>;

function sectionHeadingParts(
  sec: ClientStorySection | undefined,
  defaultMain: string,
  defaultAccent: string
): [string, string] {
  if (sec?.headingAccent) {
    return [sec.heading?.trim() || defaultMain, sec.headingAccent];
  }
  if (sec?.heading?.includes("|")) {
    const parts = sec.heading.split("|").map((s) => s.trim());
    return [parts[0] || defaultMain, parts[1] || defaultAccent];
  }
  if (sec?.heading) {
    return [sec.heading, defaultAccent];
  }
  return [defaultMain, defaultAccent];
}

const defaultCollabEyebrow = "· Kyra-Mae Collaboration";

const defaultHeroHeadline = "Delivering Premium Packaging|Under Pressure.";
const defaultHeroSubheadline =
  "A high-profile influencer collaboration for a fast-growing beauty brand — from brief to order in just 20 days.";
const defaultHeroTags = ["Custom Mailer Box", "Custom Insert", "UK Production", "Influencer Collaboration"];
const defaultHeroImage = "/images/client-stories/glowforit-hero.png";
const defaultHeroMetrics = [
  { v: "20", l: "Days Brief to Order" },
  { v: "1 day", l: "First Design Version" },
  { v: "On time", l: "Delivery Hit" },
  { v: "Kyra-Mae", l: "Influencer Collab" },
];

const defaultContextPara1 =
  "Glow For It approached us with a high-profile project — a premium packaging experience for a collaboration with Kyra-Mae, a prominent influencer. The project faced several challenges from the outset.";
const defaultContextPara2 =
  "The packaging needed to be bespoke, beautiful, and ready for a pre-campaign photoshoot — all within an extremely compressed timeline.";

const defaultChallengeHeadingMain = "Premium expectations.";
const defaultChallengeHeadingAccent = "No room for delay.";
const defaultChallengeItems = [
  { value: "01", title: "Bespoke Design", body: "Creating a unique design that aligned with premium branding while effectively accommodating the product components." },
  { value: "02", title: "Time Constraints", body: "Managing an extremely tight production timeline without compromising on quality or brand standards." },
  { value: "03", title: "Pre-Campaign Needs", body: "Providing printed samples for a photoshoot with Kyra-Mae to promote the campaign in advance of launch." },
];

const defaultSolutionHeadingMain = "Speed, precision, and";
const defaultSolutionHeadingAccent = "the personal touch.";
const defaultSolutionItems = [
  { value: "01", title: "Rapid Initial Design", body: "Within 1 day of receiving the content samples, we developed the first version of the box design, including blank sample pictures for immediate feedback." },
  { value: "02", title: "Iterative Design Process", body: "Over the next 2 weeks, we worked closely with the client to refine the design based on feedback and new brief inputs. Simultaneously, we confirmed quotes to keep the project within budget." },
  { value: "03", title: "Digitally Printed Samples", body: "We identified a quick-turnaround digital printing solution for samples. These were used in a photoshoot with Kyra-Mae, building excitement for the launch." },
  { value: "04", title: "The Personal Touch", body: "We personally delivered the printed samples to the client's office to hit crucial marketing deadlines. During the visit, we reviewed final artwork and expedited any last-minute adjustments." },
];

const defaultResultsItems = [
  { value: "Premium", body: "Bespoke packaging that elevated the campaign and influencer impressions" },
  { value: "On Time", body: "Despite the tight timeline, main order completed and delivered within target" },
  { value: "Launched", body: "Quick-turnaround printed samples enabled a successful promotional photoshoot" },
];

const defaultQuote =
  "We worked with Marcos, Alex, and Luke for our recent influencer box edit project and they were truly AMAZING! They went absolutely above and beyond to meet our tight deadlines and even hand-delivered samples to our office to help improve timelines. The quality of the box itself was beautiful, and it really exceeded our expectations.";
const defaultQuoteAuthor = "Daisy Kelly";
const defaultQuoteRole = "CEO & Founder, Glow For It";

const defaultTakeawayHeading =
  "Influencer collaborations move fast. The packaging has to keep up — without sacrificing quality, brand alignment, or the details that make it shareable.";
const defaultTakeawayBody = "When deadlines are tight and stakes are high, the difference is a partner who ";
const defaultTakeawayHeadingAccent = "goes above and beyond.";

const defaultCtaHeadingMain = "Got a launch deadline that";
const defaultCtaHeadingAccent = "can't slip?";
const defaultCtaBody = "We'll make sure the packaging is ready.";
const defaultCtaHref = "/contact-us";
const defaultCtaLabel = "Start a Project";

const defaultOverlayContextLabel = "TikTok · Glow For It × Kyra-Mae";
const defaultOverlaySummaryLines = [
  "Bespoke design delivered in just 20 days.",
  "Printed samples ready for influencer photoshoot.",
  "Premium unboxing that elevated the campaign.",
];
const defaultOverlayQuote = "They went absolutely above and beyond to meet our tight deadlines.";
const defaultOverlayAttribution = "— Daisy Kelly, CEO & Founder";

const defaultContextHeadingMain = "A high-profile collab.";
const defaultContextHeadingAccent = "A tight deadline.";

export default function GlowForItStory({ story }: { story?: ClientStoryDetail }) {
  const heroImage = story?.heroImage || defaultHeroImage;
  const bodyImage1 = story?.bodyImage1 || heroImage;
  const bodyImage2 = story?.bodyImage2 || heroImage;
  const heroTags = story?.heroTags?.length ? story.heroTags : defaultHeroTags;

  const storyMetrics = Array.isArray(story?.metrics)
    ? story.metrics.map((m) => ({ v: m.value, l: m.label })).filter((m) => m.v && m.l)
    : [];
  const heroMetrics = defaultHeroMetrics.map((m, i) => storyMetrics[i] ?? m);

  const contextSec = getSection(story, "context");
  const challengeSec = getSection(story, "challenge");
  const solutionSec = getSection(story, "solution");
  const resultsSec = getSection(story, "results");
  const takeawaySec = getSection(story, "takeaway");
  const ctaSec = getSection(story, "cta");

  const [contextHeadingMain, contextHeadingAccent] = sectionHeadingParts(
    contextSec,
    defaultContextHeadingMain,
    defaultContextHeadingAccent
  );
  const [challengeHeadingMain, challengeHeadingAccent] = sectionHeadingParts(
    challengeSec,
    defaultChallengeHeadingMain,
    defaultChallengeHeadingAccent
  );
  const [solutionHeadingMain, solutionHeadingAccent] = sectionHeadingParts(
    solutionSec,
    defaultSolutionHeadingMain,
    defaultSolutionHeadingAccent
  );
  const [ctaHeadingMain, ctaHeadingAccent] = sectionHeadingParts(ctaSec, defaultCtaHeadingMain, defaultCtaHeadingAccent);

  const contextPara1 = story?.challenge || defaultContextPara1;
  const contextPara2 = story?.solution || defaultContextPara2;

  const challengeItemsRaw = getSectionItems(story, "challenge");
  const challengeItems = challengeItemsRaw
    ? challengeItemsRaw.map((item, i) => ({
        n: item.value || `0${i + 1}`,
        t: item.title || "",
        d: item.body || "",
      }))
    : defaultChallengeItems.map((c) => ({ n: c.value, t: c.title, d: c.body }));

  const solutionItemsRaw = getSectionItems(story, "solution");
  const solutionItems = solutionItemsRaw
    ? solutionItemsRaw.map((item, i) => ({
        n: item.value || `0${i + 1}`,
        t: item.title || "",
        d: item.body || "",
      }))
    : defaultSolutionItems.map((s) => ({ n: s.value, t: s.title, d: s.body }));

  const resultsItemsRaw = getSectionItems(story, "results");
  const resultsItems = resultsItemsRaw
    ? resultsItemsRaw.map((item) => ({
        s: item.value || "",
        d: item.body || "",
      }))
    : defaultResultsItems.map((r) => ({ s: r.value, d: r.body }));

  const quoteText = story?.quote || defaultQuote;
  const quoteAuthor = story?.quoteAuthor || defaultQuoteAuthor;
  const quoteRole = story?.quoteRole || defaultQuoteRole;

  const overlayQuote = story?.quote || defaultOverlayQuote;
  const overlayAttribution = story?.quoteAuthor
    ? `— ${story.quoteAuthor}${story.quoteRole ? `, ${story.quoteRole}` : ""}`
    : defaultOverlayAttribution;

  const ctaHref = story?.ctaHref || defaultCtaHref;
  const ctaLabel = story?.ctaLabel || defaultCtaLabel;

  const heroHeadlineStr = story?.heroHeadline || defaultHeroHeadline;
  const heroSubheadline = story?.heroSubheadline || defaultHeroSubheadline;

  return (
    <div style={{ color: C.ink, background: C.cream, overflowX: "hidden" }}>
      {/* HERO */}
      <section className="relative overflow-hidden flex items-center min-h-[88vh] pt-28 md:pt-[140px] pb-16 md:pb-[110px]" style={{ background: C.ink, color: C.white }}>
        <div className="absolute inset-0" style={{ backgroundImage: `url('${heroImage}')`, backgroundSize: "cover", backgroundPosition: "center 25%", zIndex: 0 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,26,26,.94) 0%, rgba(26,26,26,.86) 40%, rgba(26,26,26,.6) 100%)", zIndex: 1 }} />
        <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 pointer-events-none select-none hidden md:block" style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "min(20vw,320px)", fontWeight: 300, color: "rgba(200,119,62,.035)", lineHeight: 1, zIndex: 2 }}>glow.</div>
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 relative z-[3] w-full">
          <div className="af" style={{ animationDelay: ".1s", opacity: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <SectionTag>Client Story</SectionTag>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: C.ink40 }}>{defaultCollabEyebrow}</span>
            </div>
          </div>
          <div className="af" style={{ animationDelay: ".15s", opacity: 0, marginBottom: 28 }}>
            <img src="/images/logos/glowforit.svg" alt="Glow For It" className="h-8 md:h-10 brightness-0 invert opacity-90" />
          </div>
          <h1 className="af font-extrabold text-white" style={{ animationDelay: ".25s", opacity: 0, fontSize: "clamp(44px,6vw,76px)", lineHeight: 1.05, marginBottom: 16, maxWidth: 850 }}>
            {heroHeadlineStr.split("|").map((part, i) =>
              i === 0 ? (
                <span key={i}>{part.trim()} </span>
              ) : (
                <em key={i} className="font-fraunces italic font-medium">
                  {part.trim()}
                </em>
              )
            )}
          </h1>
          <p className="af" style={{ animationDelay: ".35s", opacity: 0, fontSize: 17, color: "rgba(255,255,255,.55)", marginBottom: 40, maxWidth: 640, lineHeight: 1.7 }}>
            {heroSubheadline}
          </p>
          <div className="af" style={{ animationDelay: ".45s", opacity: 0, display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 56 }}>
            {heroTags.map((p) => (
              <span key={p} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 500, border: "1px solid rgba(200,119,62,.25)", color: C.amber, background: "rgba(200,119,62,.05)" }}>
                {p}
              </span>
            ))}
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
        <Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-8 lg:gap-20">
            <div>
              <SectionTag>{contextSec?.tag || "The Context"}</SectionTag>
              <h2 className="font-extrabold" style={{ fontSize: "clamp(26px,3.5vw,34px)", lineHeight: 1.25 }}>
                {contextHeadingMain} <em className="font-fraunces italic font-medium">{contextHeadingAccent}</em>
              </h2>
            </div>
            <div style={{ fontSize: 16, lineHeight: 1.85, color: C.ink60 }}>
              <p style={{ marginBottom: 20 }}>{contextPara1}</p>
              <p style={{ fontWeight: 500, color: C.ink }}>{contextPara2}</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* IMAGE BREAK */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-10 pb-16 md:pb-[100px]">
        <Reveal>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9]">
            <div className="absolute inset-0" style={{ backgroundImage: `url('${bodyImage1}')`, backgroundSize: "cover", backgroundPosition: "center 25%" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(26,26,26,.6) 0%, transparent 50%)" }} />
          </div>
        </Reveal>
      </section>

      {/* CHALLENGE */}
      <section className="py-16 md:py-20" style={{ background: C.ink, color: C.white }}>
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <Reveal>
            <SectionTag>{challengeSec?.tag || "The Challenge"}</SectionTag>
            <h2 className="font-extrabold text-white" style={{ fontSize: "clamp(24px,3vw,32px)", marginBottom: 48, maxWidth: 550 }}>
              {challengeHeadingMain} <em className="font-fraunces italic font-medium">{challengeHeadingAccent}</em>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {challengeItems.map((c, i) => (
              <Reveal key={c.n} delay={i * 120}>
                <div style={{ borderTop: `2px solid ${C.amber}`, paddingTop: 24 }}>
                  <span style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 48, fontWeight: 300, color: "rgba(200,119,62,.18)" }}>{c.n}</span>
                  <h3 style={{ fontSize: 17, fontWeight: 600, margin: "8px 0 10px" }}>{c.t}</h3>
                  <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,.55)" }}>{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-10 py-16 md:py-[100px]">
        <Reveal>
          <SectionTag>{solutionSec?.tag || "Our Solution"}</SectionTag>
          <h2 className="font-extrabold" style={{ fontSize: "clamp(26px,3.5vw,34px)", marginBottom: 48, maxWidth: 600 }}>
            {solutionHeadingMain} <em className="font-fraunces italic font-medium">{solutionHeadingAccent}</em>
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {solutionItems.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div style={{ padding: 28, background: C.white, borderRadius: 14, border: "1px solid rgba(26,26,26,.04)" }}>
                <span style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 13, fontWeight: 500, color: C.amber }}>{s.n}</span>
                <h3 style={{ fontSize: 17, fontWeight: 600, margin: "10px 0 10px" }}>{s.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: C.ink60 }}>{s.d}</p>
              </div>
            </Reveal>
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
          <Reveal>
            <SectionTag>{resultsSec?.tag || "The Results"}</SectionTag>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {resultsItems.map((r, i) => (
              <Reveal key={i} delay={i * 100}>
                <div style={{ padding: "36px 28px", background: "rgba(255,255,255,.03)", borderRadius: 14, border: "1px solid rgba(255,255,255,.04)", textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 40, fontWeight: 400, color: C.amber, marginBottom: 8 }}>{r.s}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1.5 }}>{r.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-16 md:py-[88px]" style={{ background: C.white }}>
        <Reveal>
          <div className="max-w-[880px] mx-auto px-5 md:px-10 text-center">
            <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 72, color: C.amber, lineHeight: 0.8, marginBottom: 16 }}>&ldquo;</div>
            <p style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "clamp(18px,2.4vw,24px)", fontWeight: 300, fontStyle: "italic", color: C.ink, lineHeight: 1.65, marginBottom: 32 }}>{quoteText}</p>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{quoteAuthor}</span>
            <span style={{ fontSize: 13, color: C.ink40, marginLeft: 10 }}>{quoteRole}</span>
          </div>
        </Reveal>
      </section>

      {/* TAKEAWAY */}
      <section className="py-16 md:py-20" style={{ background: C.white }}>
        <Reveal>
          <div className="max-w-[780px] mx-auto px-5 md:px-10">
            <SectionTag>{takeawaySec?.tag || "The Takeaway"}</SectionTag>
            <p style={{ fontSize: 17, lineHeight: 1.85, color: C.ink60, marginBottom: 20 }}>{takeawaySec?.heading || defaultTakeawayHeading}</p>
            <p style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 22, fontWeight: 400, fontStyle: "italic", color: C.ink, lineHeight: 1.5 }}>
              {takeawaySec?.body || defaultTakeawayBody}
              <span style={{ color: C.amber }}>{takeawaySec?.headingAccent || defaultTakeawayHeadingAccent}</span>
            </p>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20" style={{ background: C.ink }}>
        <Reveal>
          <div className="max-w-[680px] mx-auto px-5 md:px-10 text-center">
            <h2 className="font-extrabold text-white" style={{ fontSize: "clamp(24px,3vw,30px)", marginBottom: 12 }}>
              {ctaHeadingMain} <em className="font-fraunces italic font-medium">{ctaHeadingAccent}</em>
            </h2>
            <p style={{ fontSize: 14, color: C.ink40, marginBottom: 32 }}>{ctaSec?.body || defaultCtaBody}</p>
            <Link href={ctaHref} style={{ display: "inline-block", padding: "15px 36px", background: C.amber, color: C.white, borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              {ctaLabel} →
            </Link>
          </div>
        </Reveal>
      </section>
      <UnboxingOverlayCTA
        content={{
          videoSrc: "/videos/GlowForItTiktok.mp4",
          contextLabel: defaultOverlayContextLabel,
          summaryLines: defaultOverlaySummaryLines,
          quote: overlayQuote,
          quoteAttribution: overlayAttribution,
        }}
      />
    </div>
  );
}
