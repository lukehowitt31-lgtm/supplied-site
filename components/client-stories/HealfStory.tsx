"use client";

import { Reveal } from "@/components/ui/Reveal";

const C = { amber: "#C8773E", ink: "#1A1A1A", ink60: "#666", ink40: "#8A8A8A", cream: "#FAF9F6", white: "#FFF" };

const SectionTag = ({ children }: { children: React.ReactNode }) => <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: C.amber, display: "block", marginBottom: 20 }}>{children}</span>;

export default function HealfStory() {
  return (
    <div style={{ color: C.ink, background: C.cream, overflowX: "hidden" }}>
      {/* HERO */}
      <section style={{ background: C.ink, color: C.white, position: "relative", overflow: "hidden", padding: "140px 0 110px", minHeight: "88vh", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/client-stories/healf-hero.png')", backgroundSize: "cover", backgroundPosition: "center 35%", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,26,26,.93) 0%, rgba(26,26,26,.85) 40%, rgba(26,26,26,.6) 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", right: -60, top: "50%", transform: "translateY(-50%)", fontFamily: "'Fraunces',serif", fontSize: "min(28vw,420px)", fontWeight: 300, color: "rgba(200,119,62,.035)", lineHeight: 1, pointerEvents: "none", userSelect: "none", zIndex: 2 }}>healf.</div>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 3, width: "100%" }}>
          <div className="af" style={{ animationDelay: ".1s", opacity: 0 }}><SectionTag>Client Story</SectionTag></div>
          <h1 className="af font-extrabold text-white" style={{ animationDelay: ".25s", opacity: 0, fontSize: "clamp(44px,6vw,80px)", lineHeight: 1.05, marginBottom: 32, maxWidth: 820 }}>
            The Packaging Infrastructure Behind <em className="font-fraunces italic font-medium not-italic">434% Growth.</em>
          </h1>
          <div className="af" style={{ animationDelay: ".4s", opacity: 0, display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 56 }}>
            {["End-to-End Partner","Forecast-Led Supply","EU Production","10–15 SKUs","434% Growth Year"].map(p => <span key={p} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 500, border: "1px solid rgba(200,119,62,.25)", color: C.amber, background: "rgba(200,119,62,.05)" }}>{p}</span>)}
          </div>
          <div className="af" style={{ animationDelay: ".55s", opacity: 0, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(255,255,255,.05)", borderRadius: 16, overflow: "hidden", maxWidth: 820 }}>
            {[{v:"434%",l:"Growth Year"},{v:"10–15",l:"SKUs Managed"},{v:"6–10",l:"Deliveries/Year"},{v:"30%+",l:"Cost Saving"}].map((m,i) => (
              <div key={i} style={{ padding: "30px 20px", background: "rgba(255,255,255,.015)", textAlign: "center" }}>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 38, fontWeight: 500, color: C.amber, marginBottom: 4 }}>{m.v}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", fontWeight: 500 }}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTEXT */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "100px 40px" }}>
        <Reveal><div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80 }}>
          <div><SectionTag>The Context</SectionTag><h2 className="font-extrabold" style={{ fontSize: 34, lineHeight: 1.25 }}>A brand scaling fast. <em className="font-fraunces italic font-medium not-italic">Packaging hadn&apos;t caught up.</em></h2></div>
          <div style={{ fontSize: 16, lineHeight: 1.85, color: C.ink60 }}>
            <p style={{ marginBottom: 20 }}>When we began working with Healf nearly two years ago, the brand was accelerating rapidly. A lean team. Exceptional marketing execution. Clear premium positioning.</p>
            <p style={{ marginBottom: 20 }}>But packaging had not yet been structured for scale. Lead times ranged from two weeks for plain UK shippers to up to three months for cost-first overseas supply. Forecasting was reactive. Supplier sourcing was fragmented.</p>
            <p style={{ fontWeight: 500, color: C.ink }}>At modest growth, that&apos;s inefficient. At 434% annual growth, it becomes a risk.</p>
          </div>
        </div></Reveal>
      </section>

      {/* CHALLENGE */}
      <section style={{ background: C.ink, color: C.white, padding: "80px 0" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px" }}>
          <Reveal><SectionTag>The Challenge</SectionTag><h2 className="font-extrabold text-white" style={{ fontSize: 32, marginBottom: 48, maxWidth: 550 }}>Three structural issues <em className="font-fraunces italic font-medium not-italic">blocking scale.</em></h2></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }}>
            {[{n:"01",t:"Reactive Sourcing",d:"Suppliers selected opportunistically, without long-term forecasting or supply chain visibility."},{n:"02",t:"Brand Misalignment",d:"Plain shipper boxes with branded tape did not reflect Healf's premium positioning."},{n:"03",t:"Lead Time Volatility",d:"Two-week local turnaround versus three-month overseas production created instability and stock risk."}].map((c,i) => (
              <Reveal key={c.n} delay={i*120}><div style={{ borderTop: `2px solid ${C.amber}`, paddingTop: 24 }}>
                <span style={{ fontFamily: "'Fraunces',serif", fontSize: 48, fontWeight: 300, color: "rgba(200,119,62,.18)" }}>{c.n}</span>
                <h3 style={{ fontSize: 17, fontWeight: 600, margin: "8px 0 10px" }}>{c.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,.55)" }}>{c.d}</p>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OWNERSHIP */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "100px 40px" }}>
        <Reveal><SectionTag>What We Took Ownership Of</SectionTag><h2 className="font-extrabold" style={{ fontSize: 34, marginBottom: 40, maxWidth: 600 }}>From &quot;ordered when needed&quot; to <em className="font-fraunces italic font-medium not-italic">engineered infrastructure.</em></h2></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {["5 core D2C shipper SKUs","Annual premium Advent Calendar","Healf:Zone flagship device packaging","Branded tape","Merch and experiential packaging","Structured forecast planning","Delivery scheduling aligned to 3PL","10–15 SKUs across 6–10 shipments/year"].map((x,i) => (
            <Reveal key={i} delay={i*40}><div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 22px", background: C.white, borderRadius: 10, border: "1px solid rgba(26,26,26,.04)" }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.amber, flexShrink: 0 }} /><span style={{ fontSize: 14, color: C.ink60 }}>{x}</span>
            </div></Reveal>
          ))}
        </div>
      </section>

      {/* APPROACH */}
      <section style={{ background: C.white, padding: "80px 0" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px" }}>
          <Reveal><SectionTag>Our Approach</SectionTag></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {[{n:"01",t:"Build Scalable Infrastructure",p:["Planned production cadence","Optimised MOQs aligned to growth","Consistent EU-based supply chain","Structured delivery schedules"],s:"Replaced fragmented sourcing with predictable supply."},{n:"02",t:"Elevate the Brand Experience",p:["Deep black board","Crisp white logo","Consistent premium finish"],s:"The box became a recognisable brand asset, not just a shipper."},{n:"03",t:"Support Growth Without Friction",p:["SKU count expanded strategically","Launch timelines accelerated","Operational stress reduced","Packaging remained stable"],s:"During a 434% growth year, packaging did not become a limiting factor."}].map((a,i) => (
              <Reveal key={a.n} delay={i*100}><div style={{ padding: 28, background: C.cream, borderRadius: 14, height: "100%", display: "flex", flexDirection: "column" }}>
                <span style={{ fontFamily: "'Fraunces',serif", fontSize: 13, fontWeight: 500, color: C.amber }}>{a.n}</span>
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
      <section style={{ background: C.ink, padding: "88px 0" }}>
        <Reveal><div style={{ maxWidth: 880, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Fraunces',serif", fontSize: 72, color: C.amber, lineHeight: .8, marginBottom: 16 }}>&ldquo;</div>
          <p style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(18px,2.4vw,26px)", fontWeight: 300, fontStyle: "italic", color: C.white, lineHeight: 1.65, marginBottom: 32 }}>From ideation to execution, the attention to detail and care shown by Supplied is second to none. They delivered a high-quality product with an incredibly fast turnaround, and were an absolute pleasure to work with throughout.</p>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.white }}>Oscar</span><span style={{ fontSize: 13, color: C.ink40, marginLeft: 10 }}>Head of Brand, Healf</span>
        </div></Reveal>
      </section>

      {/* RESULTS */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "100px 40px" }}>
        <Reveal><SectionTag>The Results</SectionTag></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20, marginBottom: 32 }}>
          {[{s:"434%",d:"Growth supported without packaging bottlenecks"},{s:"10–15",d:"Active SKUs managed under one partner"},{s:"6–10",d:"Structured deliveries annually"},{s:"30%+",d:"Cost saving vs equivalent sourced elsewhere"}].map((r,i) => (
            <Reveal key={i} delay={i*80}><div style={{ padding: "32px 28px", background: C.white, borderRadius: 14, border: "1px solid rgba(26,26,26,.04)", display: "flex", alignItems: "center", gap: 24 }}>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 46, fontWeight: 400, color: C.amber, flexShrink: 0, minWidth: 100, textAlign: "center" }}>{r.s}</div>
              <div style={{ fontSize: 15, color: C.ink60, lineHeight: 1.55 }}>{r.d}</div>
            </div></Reveal>
          ))}
        </div>
        <Reveal delay={200}><div style={{ padding: "28px 36px", background: C.ink, borderRadius: 14 }}>
          <p style={{ fontFamily: "'Fraunces',serif", fontSize: 20, fontWeight: 400, fontStyle: "italic", color: C.white, lineHeight: 1.55 }}>Packaging is no longer a stress point internally. It is structured, predictable and aligned with brand ambition.</p>
        </div></Reveal>
      </section>

      {/* TAKEAWAY */}
      <section style={{ background: C.white, padding: "80px 0" }}>
        <Reveal><div style={{ maxWidth: 780, margin: "0 auto", padding: "0 40px" }}>
          <SectionTag>The Takeaway</SectionTag>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: C.ink60, marginBottom: 20 }}>High-growth brands do not struggle because of marketing. They struggle when operational complexity catches up. Packaging is often one of the first pressure points — fragmented sourcing, unstable lead times, poor cost visibility.</p>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: C.ink, fontWeight: 500 }}>For Healf, we removed packaging as a growth risk. We built the infrastructure behind the scenes so scale could happen without friction.</p>
        </div></Reveal>
      </section>

      {/* CTA */}
      <section style={{ background: C.ink, padding: "80px 0" }}>
        <Reveal><div style={{ maxWidth: 680, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <h2 className="font-extrabold text-white" style={{ fontSize: 30, marginBottom: 12 }}>Scaling quickly and packaging still <em className="font-fraunces italic font-medium not-italic">feels reactive?</em></h2>
          <p style={{ fontSize: 14, color: C.ink40, marginBottom: 32 }}>Let&apos;s structure it properly.</p>
          <a href="/contact-us" style={{ display: "inline-block", padding: "15px 36px", background: C.amber, color: C.white, borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Start a Project →</a>
        </div></Reveal>
      </section>
    </div>
  );
}
