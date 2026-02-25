"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const C = { amber: "#C8773E", ink: "#1A1A1A", ink60: "#666", ink40: "#8A8A8A", cream: "#FAF9F6", white: "#FFF" };

const SectionTag = ({ children }: { children: React.ReactNode }) => <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: C.amber, display: "block", marginBottom: 20 }}>{children}</span>;

export default function SpacegoodsStory() {
  return (
    <div style={{ color: C.ink, background: C.cream, overflowX: "hidden" }}>
      {/* HERO */}
      <section style={{ background: C.ink, color: C.white, position: "relative", overflow: "hidden", padding: "140px 0 110px", minHeight: "88vh", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/client-stories/spacegoods-hero.webp')", backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,26,26,.93) 0%, rgba(26,26,26,.84) 40%, rgba(26,26,26,.62) 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", right: -80, top: "50%", transform: "translateY(-50%)", fontFamily: "'Fraunces',serif", fontSize: "min(22vw,360px)", fontWeight: 300, color: "rgba(200,119,62,.035)", lineHeight: 1, pointerEvents: "none", userSelect: "none", zIndex: 2 }}>space.</div>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 3, width: "100%" }}>
          <div className="af" style={{ animationDelay: ".1s", opacity: 0 }}><SectionTag>Client Story</SectionTag></div>
          <h1 className="af font-extrabold text-white" style={{ animationDelay: ".25s", opacity: 0, fontSize: "clamp(44px,5.5vw,76px)", lineHeight: 1.08, marginBottom: 32, maxWidth: 850 }}>
            Come for the project. <em className="font-fraunces italic font-medium not-italic" style={{ display: "block" }}>Stay for the partnership.</em>
          </h1>
          <div className="af" style={{ animationDelay: ".4s", opacity: 0, display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 56 }}>
            {["D2C & Retail","Monthly Supply Cadence","Crash-Lock Engineering","Tesco Launch","Brand-Led Packaging"].map(p => <span key={p} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 500, border: "1px solid rgba(200,119,62,.25)", color: C.amber, background: "rgba(200,119,62,.05)" }}>{p}</span>)}
          </div>
          <div className="af" style={{ animationDelay: ".55s", opacity: 0, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(255,255,255,.05)", borderRadius: 16, overflow: "hidden", maxWidth: 820 }}>
            {[{v:"10+",l:"SKUs Managed"},{v:"+122%",l:"Search Growth"},{v:"~30%",l:"Cost Optimisation"},{v:"Tesco",l:"Retail Launch"}].map((m,i) => (
              <div key={i} style={{ padding: "30px 20px", background: "rgba(255,255,255,.015)", textAlign: "center" }}>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 36, fontWeight: 500, color: C.amber, marginBottom: 4 }}>{m.v}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", fontWeight: 500 }}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTEXT */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "100px 40px" }}>
        <Reveal><div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80 }}>
          <div><SectionTag>The Context</SectionTag><h2 className="font-extrabold" style={{ fontSize: 34, lineHeight: 1.25 }}>It started with <em className="font-fraunces italic font-medium not-italic">a better mailer box.</em></h2></div>
          <div style={{ fontSize: 16, lineHeight: 1.85, color: C.ink60 }}>
            <p style={{ marginBottom: 20 }}>When we first began working with Spacegoods, the brand was entering a new phase. Seed investment secured. Team expanding. Momentum building.</p>
            <p style={{ marginBottom: 20 }}>The first conversation wasn&apos;t about becoming a long-term packaging partner. It was about upgrading their mailer boxes. Functional, but inefficient. The brand was bold and visually distinctive — the packaging didn&apos;t yet reflect that.</p>
            <p style={{ fontWeight: 500, color: C.ink }}>The first project was simple: introduce branded mailer boxes. What followed was something bigger.</p>
          </div>
        </div></Reveal>
      </section>

      {/* IMAGE STRIP */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px 100px" }}>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 16, borderRadius: 20, overflow: "hidden" }}>
            {[
              { src: "/images/client-stories/spacegoods-placeholder-1.jpg", alt: "Rainbow Dust pouch packaging" },
              { src: "/images/client-stories/spacegoods-placeholder-2.jpg", alt: "Mailer box detail" },
              { src: "/images/client-stories/spacegoods-placeholder-3.jpg", alt: "Retail shelf-ready packaging" },
            ].map((img, i) => (
              <div key={i} style={{ position: "relative", aspectRatio: "4/3", background: C.ink, borderRadius: 4, overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: `url('${img.src}')`, backgroundSize: "cover", backgroundPosition: "center" }} />
                {/* Placeholder overlay — remove when real images added */}
                <div style={{ position: "absolute", inset: 0, background: "rgba(26,26,26,.85)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid rgba(200,119,62,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 18, color: C.amber }}>+</span>
                  </div>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,.35)", fontWeight: 500 }}>{img.alt}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 12 }}>
            <span style={{ fontSize: 11, color: C.ink40, fontStyle: "italic" }}>Product photography: D2C mailers, retail packaging, branded fulfilment</span>
          </div>
        </Reveal>
      </section>

      {/* JOURNEY */}
      <section style={{ background: C.ink, color: C.white, padding: "80px 0" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px" }}>
          <Reveal><SectionTag>The Journey</SectionTag></Reveal>
          {[
            { ph: "Phase 01", t: "Elevating the Mailer", body: "We developed Spacegoods' first branded mailer boxes — upgrading the unboxing experience while maintaining cost discipline. We optimised down to three core formats and introduced a crash-lock structure for the larger format, significantly improving packing speed at the 3PL.", hl: "The box became part of the brand experience — not just the packaging around it." },
            { ph: "Phase 02", t: "Growth Accelerates", body: "During active supply, Spacegoods experienced +122% increase in search interest, +75.7% organic session growth, and +45% share of voice. We established a consistent monthly delivery rhythm — flexing when needed as volume swelled.", hl: "Packaging didn't slow growth. It supported it." },
            { ph: "Phase 03", t: "From Project to Partnership", body: "The relationship naturally evolved. We began managing D2C mailers, starter kit packaging, retail product cartons, and auxiliary projects. Today we manage 10+ SKUs for Spacegoods.", hl: "Not because we pitched a partnership. But because value was proven early." },
            { ph: "Phase 04", t: "Structuring for Retail", body: "When Spacegoods secured Tesco distribution, we engineered retail-ready cartons retaining their signature semi-opaque, pearlescent finish through specialist laminates and layered print techniques. Visually striking. Retail compliant. Cost controlled.", hl: "And critically — ready in time for launch." }
          ].map((p, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 40, paddingBottom: 44, marginBottom: 44, borderBottom: i < 3 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
                <div>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".1em", color: C.amber }}>{p.ph}</span>
                  <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 24, fontWeight: 400, marginTop: 8 }}>{p.t}</h3>
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
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "80px 40px" }}>
        <Reveal><SectionTag>Market Impact During Supply</SectionTag></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {[{v:"+122%",l:"Search interest growth"},{v:"+75.7%",l:"Organic session growth"},{v:"+45%",l:"Share of voice increase"},{v:"+450%",l:"Rainbow Dust review breakout"}].map((m,i) => (
            <Reveal key={i} delay={i*80}><div style={{ padding: "32px 24px", background: C.white, borderRadius: 14, border: "1px solid rgba(26,26,26,.04)", textAlign: "center" }}>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 40, fontWeight: 400, color: C.amber }}>{m.v}</div>
              <div style={{ fontSize: 12, color: C.ink40, marginTop: 6 }}>{m.l}</div>
            </div></Reveal>
          ))}
        </div>
      </section>

      {/* OPERATIONAL IMPACT */}
      <section style={{ background: C.white, padding: "80px 0" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px" }}>
          <Reveal><SectionTag>Operational Impact</SectionTag></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {["Reduction in unnecessary box variation","Structured monthly delivery cadence","Improved 3PL packing efficiency via crash-lock formats","Cost optimisation across retail cartons (est. up to 30%)","Strategic supply chain monitoring as volume scales","Packaging evolves with the business — never static"].map((x,i) => (
              <Reveal key={i} delay={i*40}><div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 22px", background: C.cream, borderRadius: 10 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.amber, flexShrink: 0 }} /><span style={{ fontSize: 14, color: C.ink60 }}>{x}</span>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px 80px" }}>
        <Reveal>
          <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "21/9" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/client-stories/spacegoods-placeholder-4.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
            {/* Placeholder overlay — remove when real image added */}
            <div style={{ position: "absolute", inset: 0, background: "rgba(26,26,26,.85)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid rgba(200,119,62,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 18, color: C.amber }}>+</span>
              </div>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,.35)", fontWeight: 500, textAlign: "center", maxWidth: 300 }}>Wide editorial — product lifestyle, retail display, or warehouse fulfilment</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* BRAND IMPACT */}
      <section style={{ padding: "80px 0" }}>
        <Reveal><div style={{ maxWidth: 800, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <SectionTag>Brand Impact</SectionTag>
          <p style={{ fontFamily: "'Fraunces',serif", fontSize: 24, fontWeight: 400, lineHeight: 1.6, fontStyle: "italic" }}>The packaging became part of the conversation. Not just a container. <span style={{ color: C.amber }}>But an extension of the brand.</span></p>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, marginTop: 32, flexWrap: "wrap" }}>
            {["Increased UGC featuring packaging","Positive customer inbound","Daily DMs from other brands"].map((b,i) => <span key={i} style={{ fontSize: 13, color: C.ink40 }}>{b}</span>)}
          </div>
        </div></Reveal>
      </section>

      {/* UNBOXING VIDEO */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px 80px" }}>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
            <div>
              <SectionTag>See It In Action</SectionTag>
              <h2 className="font-extrabold" style={{ fontSize: 30, lineHeight: 1.25, marginBottom: 16 }}>The unboxing <em className="font-fraunces italic font-medium not-italic">experience.</em></h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: C.ink60 }}>Great packaging isn&apos;t just about what it looks like on a shelf — it&apos;s about the moment someone opens it. Here&apos;s the Spacegoods experience in action.</p>
            </div>
            <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", background: C.ink }}>
              {/* Replace placeholder with TikTok embed when ready */}
              <div style={{ aspectRatio: "9/16", maxHeight: 580, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, background: "rgba(26,26,26,.9)", borderRadius: 16 }}>
                <div style={{ width: 56, height: 56, borderRadius: "50%", border: "2px solid rgba(200,119,62,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 3 }}>
                    <path d="M8 5v14l11-7L8 5z" fill={C.amber} />
                  </svg>
                </div>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,.4)", fontWeight: 500 }}>TikTok Unboxing Video</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,.25)" }}>Replace with TikTok embed or video URL</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* TAKEAWAY */}
      <section style={{ background: C.ink, padding: "80px 0" }}>
        <Reveal><div style={{ maxWidth: 780, margin: "0 auto", padding: "0 40px" }}>
          <SectionTag>The Takeaway</SectionTag>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: "rgba(255,255,255,.6)", marginBottom: 20 }}>This wasn&apos;t about a single box redesign. It was about building the foundations of a structured packaging system — one capable of supporting D2C scale and retail expansion simultaneously.</p>
          <p style={{ fontFamily: "'Fraunces',serif", fontSize: 24, fontWeight: 400, fontStyle: "italic", color: C.white, lineHeight: 1.5 }}>When given time and trust, we don&apos;t just deliver packaging. We build infrastructure. And when growth accelerates, that infrastructure becomes <span style={{ color: C.amber }}>invaluable.</span></p>
        </div></Reveal>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 0", background: C.cream }}>
        <Reveal><div style={{ maxWidth: 680, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <h2 className="font-extrabold" style={{ fontSize: 30, marginBottom: 12 }}>Ready to turn a project into <em className="font-fraunces italic font-medium not-italic">a partnership?</em></h2>
          <p style={{ fontSize: 14, color: C.ink40, marginBottom: 32 }}>Let&apos;s start with what you need today.</p>
          <Link href="/contact-us" style={{ display: "inline-block", padding: "15px 36px", background: C.amber, color: C.white, borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Start a Project →</Link>
        </div></Reveal>
      </section>
    </div>
  );
}
