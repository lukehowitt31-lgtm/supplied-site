"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { UnboxingOverlayCTA } from "@/components/client-stories/UnboxingOverlayCTA";
import { getSection, getSectionItems } from "@/components/client-stories/storyHelpers";
import type { ClientStoryDetail } from "@/types/clientStory";

const C = { amber: "#C8773E", ink: "#1A1A1A", ink60: "#666", ink40: "#8A8A8A", cream: "#FAF9F6", white: "#FFF", amGreen: "#006847" };

const SectionTag = ({ children }: { children: React.ReactNode }) => <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: C.amber, display: "block", marginBottom: 20 }}>{children}</span>;

interface GlaizeStoryProps {
  story?: ClientStoryDetail;
}

const defaultHeroTags = ["Limited Edition", "Litho Production", "3.5 Week Turnaround", "Physical Colour Match", "British Grand Prix"];
const defaultHeroMetrics = [
  { v: "200", l: "Limited Edition Units" },
  { v: "3.5", l: "Weeks End-to-End" },
  { v: "Zero", l: "Delays" },
  { v: "Exact", l: "Colour Match" },
];
const defaultContextParagraphs = [
  "When Glaize secured a last-minute collaboration opportunity with Aston Martin ahead of the British Grand Prix, the clock started immediately.",
  "This wasn't a routine packaging project. It was a limited-edition mailer box tied to one of the most high-profile weekends in the racing calendar. The timeline was immovable. The brand expectations were exacting. The margin for error was zero.",
  "Aston Martin Green isn't just a colour — it's heritage. It required precise physical colour matching, not a simple Pantone reference.",
];
const defaultChallengeColumns: string[][] = [
  ["No finalised artwork or colour approvals at project start", "A fixed Grand Prix deadline that could not move"],
  ["Production of just 200 units at premium quality", "EU litho production required (not standard UK supply)"],
  ["Physical colour matching to Aston Martin Green", "Structural spec transfer from UK to EU production"],
];
const defaultChallengeCallout =
  "Under normal conditions, artwork and colour approvals alone can take 1–2 weeks. Here, the entire project had to move from brief to delivery in 3.5 weeks.";
const defaultApproachSteps = [
  { n: "01", t: "Immediate Brief Alignment", d: "Scope, constraints and budget locked within 24 hours to avoid drift." },
  { n: "02", t: "Structural Spec Transfer", d: "Replicated the profile of Glaize's existing D2C mailer, ensuring consistency despite switching production geography." },
  { n: "03", t: "Accelerated Colour Matching", d: "Aston Martin Green was physically colour matched and approved through an expedited loop — precision without compromise." },
  { n: "04", t: "Parallel Workflow", d: "Artwork refinement, print preparation and production scheduling ran simultaneously rather than sequentially to protect time." },
  { n: "05", t: "Secured Production Slot", d: "EU litho production capacity was secured early, keeping the timeline protected all the way to the line." },
];
const defaultResultMetrics = [
  { v: "200", l: "Premium litho mailer boxes produced" },
  { v: "3.5 wks", l: "End-to-end delivery" },
  { v: "Zero", l: "Delays — on time for Grand Prix" },
];
const defaultResultChecklist = ["On budget", "Aston Martin Green matched precisely", "No late adjustments, no quality drift"];
const defaultResultClosingLead = "It crossed the finish line ";
const defaultResultClosingAccent = "exactly on schedule.";
const defaultQuote =
  "We work with many suppliers, but very few are as helpful, supportive and flexible as Supplied. They always find a solution for anything you throw at them and the communication is always 10/10. Marcos, Alex and the team are amazing to work with and I highly recommend their services.";
const defaultOverlayQuote = "They always find a solution for anything you throw at them.";

export default function GlaizeStory({ story }: GlaizeStoryProps) {
  const heroImage = story?.heroImage || "/images/client-stories/glaize-hero.jpg";
  const heroTags = story?.heroTags?.length ? story.heroTags : defaultHeroTags;

  const storyMetrics = Array.isArray(story?.metrics)
    ? story.metrics.map((m) => ({ v: m.value, l: m.label })).filter((m) => m.v && m.l)
    : [];
  const heroMetrics = defaultHeroMetrics.map((m, i) => storyMetrics[i] ?? m);

  const contextSec = getSection(story, "context");
  const challengeSec = getSection(story, "challenge");
  const sprintSec = getSection(story, "sprint");
  const resultsSec = getSection(story, "results");
  const takeawaySec = getSection(story, "takeaway");
  const ctaSec = getSection(story, "cta");

  const contextParas = [
    story?.challenge || defaultContextParagraphs[0],
    story?.solution || defaultContextParagraphs[1],
    story?.result || defaultContextParagraphs[2],
  ];

  const challengeItems = getSectionItems(story, "challenge");
  const challengeColumns =
    challengeItems && challengeItems.length >= 6
      ? [
          [challengeItems[0].title || "", challengeItems[1].title || ""],
          [challengeItems[2].title || "", challengeItems[3].title || ""],
          [challengeItems[4].title || "", challengeItems[5].title || ""],
        ]
      : defaultChallengeColumns;

  const challengeCallout = challengeSec?.body || defaultChallengeCallout;

  const sprintItems = getSectionItems(story, "sprint");
  const approachSteps =
    sprintItems && sprintItems.length >= 5
      ? sprintItems.map((item, i) => ({
          n: item.value || String(i + 1).padStart(2, "0"),
          t: item.title || "",
          d: item.body || "",
        }))
      : defaultApproachSteps;

  const resultsItems = getSectionItems(story, "results");
  const resultMetrics =
    resultsItems && resultsItems.length >= 3
      ? resultsItems.slice(0, 3).map((item) => ({
          v: item.value || "",
          l: item.title || item.body || "",
        }))
      : defaultResultMetrics;
  const resultChecklist =
    resultsItems && resultsItems.length >= 6
      ? resultsItems.slice(3, 6).map((item) => item.title || "")
      : defaultResultChecklist;

  const quoteText = story?.quote || defaultQuote;
  const quoteAttribution = story?.quoteAuthor
    ? `— ${story.quoteAuthor}${story.quoteRole ? `, ${story.quoteRole}` : ""}`
    : "— Glaize Team";

  const ctaHref = story?.ctaHref || "/contact-us";
  const ctaLabel = story?.ctaLabel || "Start a Project";

  const overlayQuote = story?.quote || defaultOverlayQuote;

  return (
    <div style={{ color: C.ink, background: C.cream, overflowX: "hidden" }}>
      {/* HERO */}
      <section className="relative overflow-hidden flex items-center min-h-[88vh] pt-28 md:pt-[140px] pb-16 md:pb-[110px]" style={{ background: C.ink, color: C.white }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${heroImage}')`, backgroundSize: "cover", backgroundPosition: "center 40%", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,26,26,.92) 0%, rgba(26,26,26,.82) 40%, rgba(26,26,26,.65) 100%)", zIndex: 1 }} />
        <div className="absolute right-[-40px] bottom-[-40px] pointer-events-none select-none hidden md:block" style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "min(18vw,280px)", fontWeight: 300, color: "rgba(200,119,62,.04)", lineHeight: 1, zIndex: 2 }}>3.5<span style={{ fontSize: "0.5em" }}>wks</span></div>

        <div className="max-w-[1440px] mx-auto px-5 md:px-10 relative z-[3] w-full">
          <div className="af" style={{ animationDelay: ".1s", opacity: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <SectionTag>Client Story</SectionTag>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: C.ink40 }}>·  Collaboration</span>
            </div>
          </div>
          <div className="af" style={{ animationDelay: ".15s", opacity: 0, marginBottom: 28 }}>
            <img src="/images/logos/glaize.svg" alt="Glaize" className="h-8 md:h-10 brightness-0 invert opacity-90" />
          </div>
          <h1 className="af font-extrabold text-white" style={{ animationDelay: ".2s", opacity: 0, fontSize: "clamp(40px,5.5vw,72px)", lineHeight: 1.08, marginBottom: 16, maxWidth: 900 }}>
            {story?.heroHeadline ? (
              story.heroHeadline.split("|").map((part, i) =>
                i === 0 ? (
                  <span key={i}>{part.trim()} </span>
                ) : (
                  <em key={i} className="font-fraunces italic font-medium" style={{ display: "block" }}>
                    {part.trim()}
                  </em>
                )
              )
            ) : (
              <>Glaize × Aston Martin</>
            )}
          </h1>
          <p className="af" style={{ animationDelay: ".35s", opacity: 0, fontFamily: "var(--font-fraunces), serif", fontSize: "clamp(18px,2.2vw,26px)", fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,.6)", marginBottom: 40, maxWidth: 700 }}>
            {story?.heroSubheadline ? (
              story.heroSubheadline
            ) : (
              <>
                Crossing the finish line with a limited-edition collaboration — delivered in just <span style={{ color: C.amber }}>3.5 weeks.</span>
              </>
            )}
          </p>
          <div className="af" style={{ animationDelay: ".45s", opacity: 0, display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 56 }}>
            {heroTags.map((p) => (
              <span key={p} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 500, border: "1px solid rgba(200,119,62,.25)", color: C.amber, background: "rgba(200,119,62,.05)" }}>
                {p}
              </span>
            ))}
          </div>
          <div className="af grid grid-cols-2 md:grid-cols-4" style={{ animationDelay: ".58s", opacity: 0, gap: 1, background: "rgba(255,255,255,.05)", borderRadius: 16, overflow: "hidden", maxWidth: 820 }}>
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
                {contextSec?.heading || "A last-minute collaboration."}{" "}
                <em className="font-fraunces italic font-medium">{contextSec?.headingAccent || "An immovable deadline."}</em>
              </h2>
            </div>
            <div style={{ fontSize: 16, lineHeight: 1.85, color: C.ink60 }}>
              <p style={{ marginBottom: 20 }}>{contextParas[0]}</p>
              <p style={{ marginBottom: 20 }}>{contextParas[1]}</p>
              <p style={{ fontWeight: 500, color: C.ink }}>{contextParas[2]}</p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* IMAGE BREAK */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-10 pb-16 md:pb-[100px]">
        <Reveal>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9]">
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${heroImage}')`, backgroundSize: "cover", backgroundPosition: "center 40%" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(26,26,26,.6) 0%, transparent 50%)" }} />
          </div>
        </Reveal>
      </section>

      {/* CHALLENGE */}
      <section className="py-16 md:py-20" style={{ background: C.ink, color: C.white }}>
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <Reveal>
            <SectionTag>{challengeSec?.tag || "The Challenge"}</SectionTag>
            <h2 className="font-extrabold text-white" style={{ fontSize: "clamp(24px,3vw,32px)", marginBottom: 48, maxWidth: 550 }}>
              {challengeSec?.heading || "Multiple pressures."}{" "}
              <em className="font-fraunces italic font-medium">{challengeSec?.headingAccent || "No margin for error."}</em>
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {challengeColumns.map((col, ci) => (
              <Reveal key={ci} delay={ci * 100}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {col.map((item, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "16px 20px", background: "rgba(255,255,255,.03)", borderRadius: 10, border: "1px solid rgba(255,255,255,.04)" }}>
                      <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.amber, flexShrink: 0, marginTop: 7 }} />
                      <span style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.55 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={300}>
            <div className="mt-8 md:mt-10 p-6 md:p-8" style={{ borderLeft: `3px solid ${C.amber}`, background: "rgba(200,119,62,.04)", borderRadius: "0 10px 10px 0" }}>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,.7)", lineHeight: 1.6 }}>
                {challengeCallout.includes("3.5 weeks.") ? (
                  <>
                    {challengeCallout.split("3.5 weeks.")[0]}
                    <strong style={{ color: C.white }}>3.5 weeks.</strong>
                    {challengeCallout.split("3.5 weeks.")[1]}
                  </>
                ) : (
                  challengeCallout
                )}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* APPROACH */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-10 py-16 md:py-[100px]">
        <Reveal>
          <SectionTag>{sprintSec?.tag || "Our Approach"}</SectionTag>
          <h2 className="font-extrabold" style={{ fontSize: "clamp(26px,3.5vw,34px)", marginBottom: 48, maxWidth: 600 }}>
            {sprintSec?.heading || "Engineered as a "}
            <em className="font-fraunces italic font-medium">{sprintSec?.headingAccent || "controlled sprint"}</em>
            {" from day one."}
          </h2>
        </Reveal>

        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {approachSteps.map((s, i) => (
            <Reveal key={`${s.n}-${i}`} delay={i * 60}>
              <div className="grid grid-cols-1 md:grid-cols-[80px_240px_1fr] gap-4 md:gap-6 items-center py-6 md:py-6" style={{ borderBottom: "1px solid rgba(26,26,26,.06)" }}>
                <span style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 36, fontWeight: 300, color: C.amber, textAlign: "center" }}>{s.n}</span>
                <h3 style={{ fontSize: 16, fontWeight: 600 }}>{s.t}</h3>
                <p style={{ fontSize: 14, color: C.ink60, lineHeight: 1.6 }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-8 md:mt-10 text-center">
            <p style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "clamp(16px,2vw,20px)", fontWeight: 400, fontStyle: "italic", color: C.ink }}>
              {sprintSec?.body ? (
                sprintSec.body
              ) : (
                <>
                  This wasn&apos;t about rushing. It was about <span style={{ color: C.amber }}>controlled pace and precision handling.</span>
                </>
              )}
            </p>
          </div>
        </Reveal>
      </section>

      {/* RESULT */}
      <section className="py-16 md:py-20" style={{ background: C.ink, color: C.white }}>
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <Reveal>
            <div className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] mb-8 md:mb-12">
              <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${heroImage}')`, backgroundSize: "cover", backgroundPosition: "center 65%" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, rgba(26,26,26,.6) 0%, transparent 50%)" }} />
            </div>
          </Reveal>
          <Reveal>
            <SectionTag>{resultsSec?.tag || "The Result"}</SectionTag>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
            {resultMetrics.map((r, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="p-6 md:p-8 text-center" style={{ background: "rgba(255,255,255,.03)", borderRadius: 14, border: "1px solid rgba(255,255,255,.04)" }}>
                  <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "clamp(32px,4vw,44px)", fontWeight: 400, color: C.amber, marginBottom: 8 }}>{r.v}</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,.5)" }}>{r.l}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {resultChecklist.map((x, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 20px", background: "rgba(200,119,62,.04)", borderRadius: 8, border: "1px solid rgba(200,119,62,.1)" }}>
                  <span style={{ color: C.amber, fontWeight: 600, fontSize: 14 }}>✓</span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,.7)" }}>{x}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-8 md:mt-10 text-center">
              <p style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "clamp(18px,2.2vw,22px)", fontWeight: 400, fontStyle: "italic", color: C.white, lineHeight: 1.5 }}>
                {resultsSec?.heading || defaultResultClosingLead}
                <span style={{ color: C.amber }}>{resultsSec?.headingAccent || defaultResultClosingAccent}</span>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* QUOTE */}
      <section className="py-16 md:py-[88px]" style={{ background: C.white }}>
        <Reveal>
          <div className="max-w-[880px] mx-auto px-5 md:px-10 text-center">
            <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 72, color: C.amber, lineHeight: 0.8, marginBottom: 16 }}>&ldquo;</div>
            <p style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "clamp(18px,2.4vw,26px)", fontWeight: 300, fontStyle: "italic", color: C.ink, lineHeight: 1.65, marginBottom: 32 }}>{quoteText}</p>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>
              {story?.quoteAuthor || "Glaize Team"}
              {story?.quoteRole ? <span style={{ fontWeight: 500, color: C.ink60 }}>, {story.quoteRole}</span> : null}
            </span>
          </div>
        </Reveal>
      </section>

      {/* TAKEAWAY */}
      <section className="py-16 md:py-20" style={{ background: C.white }}>
        <Reveal>
          <div className="max-w-[780px] mx-auto px-5 md:px-10">
            <SectionTag>{takeawaySec?.tag || "The Takeaway"}</SectionTag>
            <p style={{ fontSize: 17, lineHeight: 1.85, color: C.ink60, marginBottom: 20 }}>
              {takeawaySec?.heading ||
                "When timelines are fixed and expectations are exacting, transactional suppliers struggle to keep pace. This project wasn't just about speed. It was about disciplined execution under pressure — aligning structure, colour and cost while protecting a non-negotiable deadline."}
            </p>
            <p style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "clamp(18px,2.2vw,22px)", fontWeight: 400, fontStyle: "italic", color: C.ink, lineHeight: 1.5 }}>
              {takeawaySec?.body || "Exceptional packaging performance isn't accidental. "}
              <span style={{ color: C.amber }}>{takeawaySec?.headingAccent || "It's engineered."}</span>
            </p>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20" style={{ background: C.ink }}>
        <Reveal>
          <div className="max-w-[680px] mx-auto px-5 md:px-10 text-center">
            <h2 className="font-extrabold text-white" style={{ fontSize: "clamp(24px,3vw,30px)", marginBottom: 12 }}>
              {ctaSec?.heading || "Need packaging that performs "}
              <em className="font-fraunces italic font-medium">{ctaSec?.headingAccent || "under pressure?"}</em>
            </h2>
            <p style={{ fontSize: 14, color: C.ink40, marginBottom: 32 }}>{ctaSec?.body || "We engineer results, not excuses."}</p>
            <Link href={ctaHref} style={{ display: "inline-block", padding: "15px 36px", background: C.amber, color: C.white, borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              {ctaLabel} →
            </Link>
          </div>
        </Reveal>
      </section>
      <UnboxingOverlayCTA
        content={{
          videoSrc: "/videos/GlazieTiktok.mp4",
          contextLabel: "TikTok · Glaize × Aston Martin",
          summaryLines: [
            "Limited edition packaging worthy of the collaboration.",
            "Aston Martin Green matched precisely.",
            "Delivered in 3.5 weeks — zero delays.",
          ],
          quote: overlayQuote,
          quoteAttribution,
        }}
      />
    </div>
  );
}
