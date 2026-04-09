"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { UnboxingOverlayCTA } from "@/components/client-stories/UnboxingOverlayCTA";
import { getSection, getSectionItems, splitParagraphs } from "@/components/client-stories/storyHelpers";
import type { ClientStoryDetail } from "@/types/clientStory";

const C = { amber: "#C8773E", ink: "#1A1A1A", ink60: "#666", ink40: "#8A8A8A", cream: "#FAF9F6", white: "#FFF" };

const SectionTag = ({ children }: { children: React.ReactNode }) => <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: C.amber, display: "block", marginBottom: 20 }}>{children}</span>;

const defaultHeroEyebrow = "Packaging For A Just Cause";
const defaultHeroTags = ["Custom Sized Tub", "Inside Print", "CN Production", "Mental Health Awareness"];
const defaultHeroMetrics = [
  { v: "Iconic", l: "Packaging Moment" },
  { v: "3–4", l: "Sample Rounds" },
  { v: "Kept", l: "Not Thrown Away" },
  { v: "10%", l: "Profits to Charity" },
];
const defaultHeroImage = "/images/client-stories/unclemattshats-hero.webp";
const defaultHeroSubheadline =
  "How we helped turn a heartfelt mission into the most iconic hat packaging on earth. 🍦 🧢";

const defaultContextParagraphs = [
  "Uncle Matt's Hats isn't just a cap brand. It's a tribute to Matt — a brother, an uncle, and someone who, like so many, faced silent struggles with mental health. Every hat sold helps spark much-needed conversations and reminds people that it's okay to speak up, and okay not to have it all figured out.",
  "The brand's heart and honesty hit us straight away — so we made it our mission to deliver packaging that matched that same authenticity.",
  "They wanted their hats to ship in ice cream tubs. Because just like a brain freeze, life can hit you with those unexpected moments where everything feels overwhelming. The packaging had to tell that story.",
];

const defaultChallengeItems = [
  { value: "01", title: "Hard to Find the Right Fit", body: "Boxes? Easy. Ice cream tubs? No problem. But nothing existed that actually fit a hat and felt on-brand." },
  { value: "02", title: "Close, But No Cigar", body: "Off-the-shelf options got close but never quite aligned with the premium branding or component requirements." },
  { value: "03", title: "Then Uncle Matt's Found Us", body: "From day one, we knew this wasn't a quick job. But the mission mattered, so we committed. No compromises, no shortcuts." },
];

const defaultSolutionItems = [
  { value: "01", title: "Nailed the Tricky Tub Design", body: "Ice cream tubs aren't made for hats, especially when it comes to printing. We worked through multiple iterations to get the structure and artwork right, giving it that authentic, premium feel." },
  { value: "02", title: "Iterated Until Perfect", body: 'We didn\'t stop at "good enough". It took 3–4 rounds of samples, tweaks, and fine-tuning to lock in the fit, finish, and brand presence — and we were with Steve every step of the way.' },
  { value: "03", title: "Built to Last (and Be Loved)", body: "This wasn't throwaway packaging. It had to be something people wanted to keep. We chose materials and finishes that made the tub feel as meaningful as what's inside." },
];

const defaultResultsItems = [
  { value: "Iconic", body: "The tub has become a total statement piece — instantly recognisable, totally unique, and just as talked about as the hat itself." },
  { value: "Kept", body: "Customers aren't throwing these away. They're reusing them, displaying them, storing things in them. Packaging with a second life." },
  { value: "Amplified", body: "This packaging didn't just protect the product — it helped tell the story. It's played a key role in raising awareness and driving conversations." },
  { value: "Frozen", body: "Some customers were so convinced it was real ice cream, they put it in the freezer before realising it was actually a hat! 🍦" },
];

const defaultCommitmentHeading =
  "From the very first conversation, we knew this was something special. Uncle Matt's Hats stands for openness, empathy, and connection — and we're proud to be a small part of that bigger message.";
const defaultCommitmentBody =
  "This wasn't just about delivering packaging. It was about backing a movement we deeply believe in. We encourage everyone to go get a hat and give Steve support for an amazing cause.";

const defaultQuote =
  "The packaging was so fundamental to our product proposition and before we started talking to other suppliers, I really thought it may not be able to be done! The whole process became instantly easier once we started working with the Supplied team!";
const defaultQuoteAuthor = "Steve Willicott";
const defaultQuoteRole = "Founder, Uncle Matt's Hats";

const defaultTakeawayHeading =
  "Some packaging projects are about efficiency, cost, and lead times. This one was about doing justice to a cause that genuinely matters. The brief was unconventional. The solution didn't exist yet. But the mission was worth every iteration.";
const defaultTakeawayBody = "Great packaging doesn't just protect what's inside.";
const defaultTakeawayAccent = "It amplifies what it stands for.";

const defaultCtaHeading = "Got a packaging challenge that";
const defaultCtaHeadingAccent = "hasn't been solved yet?";
const defaultCtaBody = "We love the ones that haven't been done before.";

const defaultOverlayQuote = "I really thought it may not be able to be done!";
const defaultOverlayAttribution = "— Steve Willicott, Founder";

export default function UncleMattsStory({ story }: { story?: ClientStoryDetail }) {
  const heroImage = story?.heroImage || defaultHeroImage;
  const bodyImage1 = story?.bodyImage1 || "/images/products/UncleMattsTransparentHeroShot.webp";
  const bodyImage2 = story?.bodyImage2 || "/images/products/Uncle-Matts-Brain-Freeze-Ice-Cream-Tub-on-black.webp";
  const heroTags = story?.heroTags?.length ? story.heroTags : defaultHeroTags;

  const storyMetrics = Array.isArray(story?.metrics)
    ? story.metrics.map((m) => ({ v: m.value, l: m.label })).filter((m) => m.v && m.l)
    : [];
  const heroMetrics = defaultHeroMetrics.map((m, i) => storyMetrics[i] ?? m);

  const contextSec = getSection(story, "context");
  const challengeSec = getSection(story, "challenge");
  const solutionSec = getSection(story, "solution");
  const resultsSec = getSection(story, "results");
  const commitmentSec = getSection(story, "commitment");
  const takeawaySec = getSection(story, "takeaway");
  const ctaSec = getSection(story, "cta");

  const cmsContextParas = splitParagraphs(getSection(story, "context")?.body);
  const contextParas = [
    cmsContextParas[0] || defaultContextParagraphs[0],
    cmsContextParas[1] || defaultContextParagraphs[1],
    cmsContextParas[2] || defaultContextParagraphs[2],
  ];

  const challengeItemsRaw = getSectionItems(story, "challenge");
  const challengeCards = challengeItemsRaw
    ? challengeItemsRaw.map((item, i) => ({
        n: item.value || String(i + 1).padStart(2, "0"),
        t: item.title || "",
        d: item.body || "",
      }))
    : defaultChallengeItems.map((c) => ({ n: c.value, t: c.title, d: c.body }));

  const solutionItemsRaw = getSectionItems(story, "solution");
  const solutionCards = solutionItemsRaw
    ? solutionItemsRaw.map((item, i) => ({
        n: item.value || String(i + 1).padStart(2, "0"),
        t: item.title || "",
        d: item.body || "",
      }))
    : defaultSolutionItems.map((c) => ({ n: c.value, t: c.title, d: c.body }));

  const resultsItemsRaw = getSectionItems(story, "results");
  const resultsCards = resultsItemsRaw
    ? resultsItemsRaw.map((item) => ({
        s: item.value || "",
        d: item.body || "",
      }))
    : defaultResultsItems.map((r) => ({ s: r.value, d: r.body }));

  const quoteText = story?.quote || defaultQuote;

  const overlayQuote = story?.quote || defaultOverlayQuote;
  const overlayAttribution = story?.quoteAuthor
    ? `— ${story.quoteAuthor}${story.quoteRole ? `, ${story.quoteRole}` : ""}`
    : defaultOverlayAttribution;

  const ctaHref = story?.ctaHref || "/contact-us";
  const ctaLabel = story?.ctaLabel || "Start a Project";

  return (
    <div style={{ color: C.ink, background: C.cream, overflowX: "hidden" }}>
      {/* HERO */}
      <section style={{ background: C.ink, color: C.white, position: "relative", overflow: "hidden", padding: "140px 0 110px", minHeight: "88vh", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${heroImage}')`, backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,26,26,.93) 0%, rgba(26,26,26,.85) 40%, rgba(26,26,26,.6) 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", right: -20, bottom: -20, fontFamily: "var(--font-fraunces), serif", fontSize: "min(16vw,240px)", fontWeight: 300, color: "rgba(200,119,62,.035)", lineHeight: 1, pointerEvents: "none", userSelect: "none", zIndex: 2 }}>🍦🧢</div>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 3, width: "100%" }}>
          <div className="af" style={{ animationDelay: ".1s", opacity: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <SectionTag>Client Story</SectionTag>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: C.ink40 }}>· {defaultHeroEyebrow}</span>
            </div>
          </div>
          <div className="af" style={{ animationDelay: ".15s", opacity: 0, marginBottom: 28 }}>
            <img src="/images/logos/uncle-matts.webp" alt="Uncle Matt's Hats" width={200} height={80} className="h-14 md:h-20 object-contain" />
          </div>
          <h1 className="af font-extrabold text-white" style={{ animationDelay: ".25s", opacity: 0, fontSize: "clamp(44px,6vw,76px)", lineHeight: 1.05, marginBottom: 16, maxWidth: 850 }}>
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
              <>
                More Than Just a Hat.{" "}
                <em className="font-fraunces italic font-medium" style={{ display: "block" }}>
                  More Than Just Packaging.
                </em>
              </>
            )}
          </h1>
          <p className="af" style={{ animationDelay: ".35s", opacity: 0, fontSize: 17, color: "rgba(255,255,255,.55)", marginBottom: 40, maxWidth: 640, lineHeight: 1.7 }}>
            {story?.heroSubheadline || defaultHeroSubheadline}
          </p>
          <div className="af" style={{ animationDelay: ".45s", opacity: 0, display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 56 }}>
            {heroTags.map((p) => (
              <span key={p} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 500, border: "1px solid rgba(200,119,62,.25)", color: C.amber, background: "rgba(200,119,62,.05)" }}>
                {p}
              </span>
            ))}
          </div>
          <div className="af" style={{ animationDelay: ".55s", opacity: 0, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(255,255,255,.05)", borderRadius: 16, overflow: "hidden", maxWidth: 820 }}>
            {heroMetrics.map((m, i) => (
              <div key={i} style={{ padding: "30px 20px", background: "rgba(255,255,255,.015)", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 36, fontWeight: 500, color: C.amber, marginBottom: 4 }}>{m.v}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", fontWeight: 500 }}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTEXT */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "100px 40px" }}>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80 }}>
            <div>
              <SectionTag>{contextSec?.tag || "The Context"}</SectionTag>
              <h2 className="font-extrabold" style={{ fontSize: 34, lineHeight: 1.25 }}>
                {contextSec?.heading || "A tribute to Matt."}{" "}
                <em className="font-fraunces italic font-medium">{contextSec?.headingAccent || "A mission that matters."}</em>
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
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px 100px" }}>
        <Reveal>
          <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "21/9" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${bodyImage1}')`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat" }} />
          </div>
        </Reveal>
      </section>

      {/* CHALLENGE */}
      <section style={{ background: C.ink, color: C.white, padding: "80px 0" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px" }}>
          <Reveal>
            <SectionTag>{challengeSec?.tag || "The Challenge"}</SectionTag>
            <h2 className="font-extrabold text-white" style={{ fontSize: 32, marginBottom: 48, maxWidth: 600 }}>
              {challengeSec?.heading || "A concept that didn't exist."}{" "}
              <em className="font-fraunces italic font-medium">{challengeSec?.headingAccent || "Until we built it."}</em>
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }}>
            {challengeCards.map((c, i) => (
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
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "100px 40px" }}>
        <Reveal>
          <SectionTag>{solutionSec?.tag || "Our Solution"}</SectionTag>
          <h2 className="font-extrabold" style={{ fontSize: 34, marginBottom: 48, maxWidth: 600 }}>
            {solutionSec?.heading || "Iterated until it was"}{" "}
            <em className="font-fraunces italic font-medium">{solutionSec?.headingAccent || "perfect."}</em>
          </h2>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {solutionCards.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <div style={{ padding: 28, background: C.white, borderRadius: 14, border: "1px solid rgba(26,26,26,.04)", height: "100%", display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 13, fontWeight: 500, color: C.amber }}>{s.n}</span>
                <h3 style={{ fontSize: 17, fontWeight: 600, margin: "10px 0 10px" }}>{s.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: C.ink60, flex: 1 }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* RESULTS */}
      <section style={{ background: C.ink, color: C.white, padding: "80px 0" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px" }}>
          <Reveal>
            <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "21/9", marginBottom: 48 }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${bodyImage2}')`, backgroundSize: "contain", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundColor: "#000" }} />
            </div>
          </Reveal>
          <Reveal>
            <SectionTag>{resultsSec?.tag || "The Results"}</SectionTag>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20, marginBottom: 32 }}>
            {resultsCards.map((r, i) => (
              <Reveal key={i} delay={i * 80}>
                <div style={{ padding: "32px 28px", background: "rgba(255,255,255,.03)", borderRadius: 14, border: "1px solid rgba(255,255,255,.04)", display: "flex", alignItems: "flex-start", gap: 20 }}>
                  <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 36, fontWeight: 400, color: C.amber, flexShrink: 0, minWidth: 100, textAlign: "center" }}>{r.s}</div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,.55)", lineHeight: 1.6 }}>{r.d}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMMITMENT */}
      <section style={{ padding: "80px 0", background: C.cream }}>
        <Reveal>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
            <SectionTag>{commitmentSec?.tag || "Our Commitment"}</SectionTag>
            <p style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 24, fontWeight: 400, lineHeight: 1.6, fontStyle: "italic", color: C.ink, marginBottom: 20 }}>{commitmentSec?.heading || defaultCommitmentHeading}</p>
            <p style={{ fontSize: 15, color: C.ink60, lineHeight: 1.7, marginBottom: 32 }}>{commitmentSec?.body || defaultCommitmentBody}</p>
            <a href="https://unclemattshats.com/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "14px 32px", background: C.ink, color: C.white, borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
              Visit Uncle Matt&apos;s Hats →
            </a>
          </div>
        </Reveal>
      </section>

      {/* QUOTE */}
      <section style={{ padding: "88px 0", background: C.white }}>
        <Reveal>
          <div style={{ maxWidth: 880, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
            <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 72, color: C.amber, lineHeight: 0.8, marginBottom: 16 }}>&ldquo;</div>
            <p style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "clamp(18px,2.4vw,26px)", fontWeight: 300, fontStyle: "italic", color: C.ink, lineHeight: 1.65, marginBottom: 32 }}>{quoteText}</p>
            <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{story?.quoteAuthor || defaultQuoteAuthor}</span>
            <span style={{ fontSize: 13, color: C.ink40, marginLeft: 10 }}>{story?.quoteRole || defaultQuoteRole}</span>
          </div>
        </Reveal>
      </section>

      {/* TAKEAWAY */}
      <section style={{ maxWidth: 780, margin: "0 auto", padding: "80px 40px" }}>
        <Reveal>
          <SectionTag>{takeawaySec?.tag || "The Takeaway"}</SectionTag>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: C.ink60, marginBottom: 20 }}>{takeawaySec?.heading || defaultTakeawayHeading}</p>
          <p style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 22, fontWeight: 400, fontStyle: "italic", color: C.ink, lineHeight: 1.5 }}>
            {takeawaySec?.body || defaultTakeawayBody} <span style={{ color: C.amber }}>{takeawaySec?.headingAccent || defaultTakeawayAccent}</span>
          </p>
        </Reveal>
      </section>

      {/* CTA */}
      <section style={{ background: C.ink, padding: "80px 0" }}>
        <Reveal>
          <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
            <h2 className="font-extrabold text-white" style={{ fontSize: 30, marginBottom: 12 }}>
              {ctaSec?.heading || defaultCtaHeading}{" "}
              <em className="font-fraunces italic font-medium">{ctaSec?.headingAccent || defaultCtaHeadingAccent}</em>
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
          videoSrc: "/videos/UncleMattsTiktok.mp4",
          contextLabel: "TikTok · Uncle Matt's Hats",
          summaryLines: [
            "Packaging so good customers put it in the freezer.",
            "Built to be kept, reused, and displayed.",
            "Every detail tells the story of Matt's mission.",
          ],
          quote: overlayQuote,
          quoteAttribution: overlayAttribution,
        }}
      />
    </div>
  );
}
