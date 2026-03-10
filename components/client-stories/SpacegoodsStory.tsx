"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { UnboxingOverlayCTA } from "@/components/client-stories/UnboxingOverlayCTA";

const C = { amber: "#C8773E", ink: "#1A1A1A", ink60: "#666", ink40: "#8A8A8A", cream: "#FAF9F6", white: "#FFF" };

const SectionTag = ({ children }: { children: React.ReactNode }) => <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: C.amber, display: "block", marginBottom: 20 }}>{children}</span>;

export default function SpacegoodsStory() {
  return (
    <div style={{ color: C.ink, background: C.cream, overflowX: "hidden" }}>
      {/* HERO */}
      <section className="relative overflow-hidden flex items-center min-h-[88vh] pt-28 md:pt-[140px] pb-16 md:pb-[110px]" style={{ background: C.ink, color: C.white }}>
        <div className="absolute inset-0" style={{ backgroundImage: "url('/images/client-stories/spacegoods-hero.webp')", backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(26,26,26,.93) 0%, rgba(26,26,26,.84) 40%, rgba(26,26,26,.62) 100%)", zIndex: 1 }} />
        <div className="absolute right-[-80px] top-1/2 -translate-y-1/2 pointer-events-none select-none hidden md:block" style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "min(22vw,360px)", fontWeight: 300, color: "rgba(200,119,62,.035)", lineHeight: 1, zIndex: 2 }}>space.</div>
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 relative z-[3] w-full">
          <div className="af" style={{ animationDelay: ".1s", opacity: 0 }}><SectionTag>Client Story</SectionTag></div>
          <div className="af" style={{ animationDelay: ".15s", opacity: 0, marginBottom: 28 }}>
            <img src="/images/logos/spacegoods.svg" alt="Spacegoods" className="h-8 md:h-10 brightness-0 invert opacity-90" />
          </div>
          <h1 className="af font-extrabold text-white" style={{ animationDelay: ".25s", opacity: 0, fontSize: "clamp(44px,5.5vw,76px)", lineHeight: 1.08, marginBottom: 32, maxWidth: 850 }}>
            Come for the project. <em className="font-fraunces italic font-medium" style={{ display: "block" }}>Stay for the partnership.</em>
          </h1>
          <div className="af flex flex-wrap gap-2 mb-10 md:mb-14" style={{ animationDelay: ".4s", opacity: 0 }}>
            {["D2C & Retail","Monthly Supply Cadence","Crash-Lock Engineering","Tesco Launch","Brand-Led Packaging"].map(p => <span key={p} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 500, border: "1px solid rgba(200,119,62,.25)", color: C.amber, background: "rgba(200,119,62,.05)" }}>{p}</span>)}
          </div>
          <div className="af grid grid-cols-2 md:grid-cols-4" style={{ animationDelay: ".55s", opacity: 0, gap: 1, background: "rgba(255,255,255,.05)", borderRadius: 16, overflow: "hidden", maxWidth: 820 }}>
            {[{v:"10+",l:"SKUs Managed"},{v:"+122%",l:"Search Growth"},{v:"~30%",l:"Cost Optimisation"},{v:"Tesco",l:"Retail Launch"}].map((m,i) => (
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
          <div><SectionTag>The Context</SectionTag><h2 className="font-extrabold" style={{ fontSize: "clamp(26px,3.5vw,34px)", lineHeight: 1.25 }}>It started with <em className="font-fraunces italic font-medium">a better mailer box.</em></h2></div>
          <div style={{ fontSize: 16, lineHeight: 1.85, color: C.ink60 }}>
            <p style={{ marginBottom: 20 }}>When we first began working with Spacegoods, the brand was entering a new phase. Seed investment secured. Team expanding. Momentum building.</p>
            <p style={{ marginBottom: 20 }}>The first conversation wasn&apos;t about becoming a long-term packaging partner. It was about upgrading their mailer boxes. Functional, but inefficient. The brand was bold and visually distinctive — the packaging didn&apos;t yet reflect that.</p>
            <p style={{ fontWeight: 500, color: C.ink }}>The first project was simple: introduce branded mailer boxes. What followed was something bigger.</p>
          </div>
        </div></Reveal>
      </section>

      {/* IMAGE BREAK */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-10 pb-16 md:pb-[100px]">
        <Reveal>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9]">
            <div className="absolute inset-0" style={{ backgroundImage: "url('/images/client-stories/spacegoods-hero.webp')", backgroundSize: "cover", backgroundPosition: "center" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(26,26,26,.6) 0%, transparent 50%)" }} />
          </div>
        </Reveal>
      </section>

      {/* JOURNEY */}
      <section className="py-16 md:py-20" style={{ background: C.ink, color: C.white }}>
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <Reveal><SectionTag>The Journey</SectionTag></Reveal>
          {[
            { ph: "Phase 01", t: "Elevating the Mailer", body: "We developed Spacegoods' first branded mailer boxes — upgrading the unboxing experience while maintaining cost discipline. We optimised down to three core formats and introduced a crash-lock structure for the larger format, significantly improving packing speed at the 3PL.", hl: "The box became part of the brand experience — not just the packaging around it." },
            { ph: "Phase 02", t: "Growth Accelerates", body: "During active supply, Spacegoods experienced +122% increase in search interest, +75.7% organic session growth, and +45% share of voice. We established a consistent monthly delivery rhythm — flexing when needed as volume swelled.", hl: "Packaging didn't slow growth. It supported it." },
            { ph: "Phase 03", t: "From Project to Partnership", body: "The relationship naturally evolved. We began managing D2C mailers, starter kit packaging, retail product cartons, and auxiliary projects. Today we manage 10+ SKUs for Spacegoods.", hl: "Not because we pitched a partnership. But because value was proven early." },
            { ph: "Phase 04", t: "Structuring for Retail", body: "When Spacegoods secured Tesco distribution, we engineered retail-ready cartons retaining their signature semi-opaque, pearlescent finish through specialist laminates and layered print techniques. Visually striking. Retail compliant. Cost controlled.", hl: "And critically — ready in time for launch." }
          ].map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-10 pb-11 mb-11 md:pb-[44px] md:mb-[44px]" style={{ borderBottom: i < 3 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".1em", color: C.amber }}>{p.ph}</span>
                  <h3 style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 24, fontWeight: 400, marginTop: 8 }}>{p.t}</h3>
                </div>
                <div>
                  <p style={{ fontSize: 15, lineHeight: 1.8, color: "rgba(255,255,255,.6)", marginBottom: 16 }}>{p.body}</p>
                  <p style={{ fontSize: 15, fontWeight: 500, color: C.white, fontStyle: "italic" }}>{p.hl}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GROWTH METRICS */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-10 py-16 md:py-20">
        <Reveal>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] mb-8 md:mb-12">
            <div className="absolute inset-0" style={{ backgroundImage: "url('/images/client-stories/spacegoods-hero.webp')", backgroundSize: "cover", backgroundPosition: "center 65%" }} />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to left, rgba(26,26,26,.6) 0%, transparent 50%)" }} />
          </div>
        </Reveal>
        <Reveal><SectionTag>Market Impact During Supply</SectionTag></Reveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[{v:"+122%",l:"Search interest growth"},{v:"+75.7%",l:"Organic session growth"},{v:"+45%",l:"Share of voice increase"},{v:"+450%",l:"Rainbow Dust review breakout"}].map((m,i) => (
            <Reveal key={i} delay={i*80}><div className="py-8 px-6" style={{ background: C.white, borderRadius: 14, border: "1px solid rgba(26,26,26,.04)", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "clamp(32px,4vw,40px)", fontWeight: 400, color: C.amber }}>{m.v}</div>
              <div style={{ fontSize: 12, color: C.ink40, marginTop: 6 }}>{m.l}</div>
            </div></Reveal>
          ))}
        </div>
      </section>

      {/* OPERATIONAL IMPACT */}
      <section className="py-16 md:py-20" style={{ background: C.white }}>
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <Reveal><SectionTag>Operational Impact</SectionTag></Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {["Reduction in unnecessary box variation","Structured monthly delivery cadence","Improved 3PL packing efficiency via crash-lock formats","Cost optimisation across retail cartons (est. up to 30%)","Strategic supply chain monitoring as volume scales","Packaging evolves with the business — never static"].map((x,i) => (
              <Reveal key={i} delay={i*40}><div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 22px", background: C.cream, borderRadius: 10 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.amber, flexShrink: 0 }} /><span style={{ fontSize: 14, color: C.ink60 }}>{x}</span>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-10 pb-16 md:pb-20">
        <Reveal>
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9]">
            <div className="absolute inset-0" style={{ backgroundImage: "url('/images/client-stories/spacegoods-hero.webp')", backgroundSize: "cover", backgroundPosition: "center" }} />
          </div>
        </Reveal>
      </section>

      {/* BRAND IMPACT */}
      <section className="py-16 md:py-20">
        <Reveal><div className="max-w-[800px] mx-auto px-5 md:px-10 text-center">
          <SectionTag>Brand Impact</SectionTag>
          <p style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "clamp(18px,2.4vw,24px)", fontWeight: 400, lineHeight: 1.6, fontStyle: "italic" }}>The packaging became part of the conversation. Not just a container. <span style={{ color: C.amber }}>But an extension of the brand.</span></p>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-8">
            {["Increased UGC featuring packaging","Positive customer inbound","Daily DMs from other brands"].map((b,i) => <span key={i} style={{ fontSize: 13, color: C.ink40 }}>{b}</span>)}
          </div>
        </div></Reveal>
      </section>

      {/* TAKEAWAY */}
      <section className="py-16 md:py-20" style={{ background: C.ink }}>
        <Reveal><div className="max-w-[780px] mx-auto px-5 md:px-10">
          <SectionTag>The Takeaway</SectionTag>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: "rgba(255,255,255,.6)", marginBottom: 20 }}>This wasn&apos;t about a single box redesign. It was about building the foundations of a structured packaging system — one capable of supporting D2C scale and retail expansion simultaneously.</p>
          <p style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "clamp(18px,2.4vw,24px)", fontWeight: 400, fontStyle: "italic", color: C.white, lineHeight: 1.5 }}>When given time and trust, we don&apos;t just deliver packaging. We build infrastructure. And when growth accelerates, that infrastructure becomes <span style={{ color: C.amber }}>invaluable.</span></p>
        </div></Reveal>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20" style={{ background: C.cream }}>
        <Reveal><div className="max-w-[680px] mx-auto px-5 md:px-10 text-center">
          <h2 className="font-extrabold" style={{ fontSize: "clamp(24px,3vw,30px)", marginBottom: 12 }}>Ready to turn a project into <em className="font-fraunces italic font-medium">a partnership?</em></h2>
          <p style={{ fontSize: 14, color: C.ink40, marginBottom: 32 }}>Let&apos;s start with what you need today.</p>
          <Link href="/contact-us" style={{ display: "inline-block", padding: "15px 36px", background: C.amber, color: C.white, borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Start a Project →</Link>
        </div></Reveal>
      </section>
      <UnboxingOverlayCTA
        content={{
          videoSrc: "/videos/SpacegoodsTiktok.mp4",
          contextLabel: "TikTok · Spacegoods",
          summaryLines: [
            "Packaging that became part of the brand conversation.",
            "Increased UGC and customer sharing.",
            "Daily DMs from other brands asking about it.",
          ],
          quote:
            "The box became part of the brand experience — not just the packaging around it.",
          quoteAttribution: "— Spacegoods Team",
        }}
      />
    </div>
  );
}
