"use client";

import { Reveal } from "@/components/ui/Reveal";

const C = { amber: "#C8773E", ink: "#1A1A1A", ink60: "#666", ink40: "#8A8A8A", cream: "#FAF9F6", white: "#FFF" };

const SectionTag = ({ children }: { children: React.ReactNode }) => <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: C.amber, display: "block", marginBottom: 20 }}>{children}</span>;

export default function TripStory() {
  return (
    <div style={{ color: C.ink, background: C.cream, overflowX: "hidden" }}>
      {/* HERO */}
      <section style={{ background: C.ink, color: C.white, position: "relative", overflow: "hidden", padding: "140px 0 110px", minHeight: "88vh", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/client-stories/trip-hero.png')", backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,26,26,.93) 0%, rgba(26,26,26,.85) 40%, rgba(26,26,26,.6) 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", right: -60, top: "50%", transform: "translateY(-50%)", fontFamily: "'Fraunces',serif", fontSize: "min(28vw,420px)", fontWeight: 300, color: "rgba(200,119,62,.035)", lineHeight: 1, pointerEvents: "none", userSelect: "none", zIndex: 2 }}>TRIP</div>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 3, width: "100%" }}>
          <div className="af" style={{ animationDelay: ".1s", opacity: 0 }}><SectionTag>Client Story</SectionTag></div>
          <h1 className="af" style={{ animationDelay: ".25s", opacity: 0, fontFamily: "'Fraunces',serif", fontSize: "clamp(44px,6vw,80px)", fontWeight: 400, lineHeight: 1.05, marginBottom: 16, maxWidth: 820 }}>
            Accelerating Supply Chains for a <em style={{ color: C.amber }}>Fast-Growing Brand.</em>
          </h1>
          <p className="af" style={{ animationDelay: ".35s", opacity: 0, fontSize: 17, color: "rgba(255,255,255,.55)", marginBottom: 40, maxWidth: 600, lineHeight: 1.7 }}>
            Reducing lead times, improving flexibility, and maintaining brand integrity — all while keeping costs competitive.
          </p>
          <div className="af" style={{ animationDelay: ".45s", opacity: 0, display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 56 }}>
            {["Custom Rigid Tube", "Custom Inner Collar", "EU Production", "Supply Chain Success"].map(p => <span key={p} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 500, border: "1px solid rgba(200,119,62,.25)", color: C.amber, background: "rgba(200,119,62,.05)" }}>{p}</span>)}
          </div>
          <div className="af" style={{ animationDelay: ".55s", opacity: 0, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(255,255,255,.05)", borderRadius: 16, overflow: "hidden", maxWidth: 820 }}>
            {[{ v: "–6 wks", l: "Lead Time Reduction" }, { v: "50%", l: "Faster Turnaround" }, { v: "<6 wks", l: "New Lead Time" }, { v: "Monthly", l: "Replenishment Orders" }].map((m, i) => (
              <div key={i} style={{ padding: "30px 20px", background: "rgba(255,255,255,.015)", textAlign: "center" }}>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 38, fontWeight: 500, color: C.amber, marginBottom: 4 }}>{m.v}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", fontWeight: 500 }}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTEXT */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 40px" }}>
        <Reveal><div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80 }}>
          <div><SectionTag>The Context</SectionTag><h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 34, fontWeight: 400, lineHeight: 1.25 }}>A supply chain built for <em style={{ color: C.amber }}>yesterday&apos;s demand.</em></h2></div>
          <div style={{ fontSize: 16, lineHeight: 1.85, color: C.ink60 }}>
            <p style={{ marginBottom: 20 }}>TRIP, one of the UK&apos;s fastest-growing CBD brands, had built significant retail and D2C momentum. But their tube packaging supply chain — sourced from China — was creating friction at the rate they were scaling.</p>
            <p style={{ fontWeight: 500, color: C.ink }}>Lead times of 12+ weeks were creating bottlenecks, making it difficult to respond quickly to market demand and inventory fluctuations.</p>
          </div>
        </div></Reveal>
      </section>

      {/* CHALLENGE */}
      <section style={{ background: C.ink, color: C.white, padding: "80px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
          <Reveal><SectionTag>The Challenge</SectionTag><h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 32, fontWeight: 400, marginBottom: 48, maxWidth: 550 }}>Three interconnected pressures <em style={{ color: C.amber }}>holding growth back.</em></h2></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }}>
            {[
              { n: "01", t: "Long Lead Times", d: "Sourcing from China took over 12 weeks, creating bottlenecks that made it difficult to respond quickly to market demand and inventory fluctuations." },
              { n: "02", t: "Cost vs. Flexibility", d: "TRIP needed a more agile supply chain that would allow them to scale production based on fluctuating demand while maintaining competitive pricing." },
              { n: "03", t: "Brand Integrity", d: "As a brand with a strong identity, TRIP required precise colour matching to ensure product consistency, making any supplier transition more complex." }
            ].map((c, i) => (
              <Reveal key={c.n} delay={i * 120}><div style={{ borderTop: `2px solid ${C.amber}`, paddingTop: 24 }}>
                <span style={{ fontFamily: "'Fraunces',serif", fontSize: 48, fontWeight: 300, color: "rgba(200,119,62,.18)" }}>{c.n}</span>
                <h3 style={{ fontSize: 17, fontWeight: 600, margin: "8px 0 10px" }}>{c.t}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,.55)" }}>{c.d}</p>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 40px" }}>
        <Reveal><SectionTag>Our Solution</SectionTag><h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 34, fontWeight: 400, marginBottom: 48, maxWidth: 600 }}>A structured transition to <em style={{ color: C.amber }}>European production.</em></h2></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}>
          {[
            { n: "01", t: "Faster Sourcing & Production", d: "We sourced the product from Europe, successfully cutting the total lead time from 12+ weeks to just 5–6 weeks." },
            { n: "02", t: "Competitive Pricing with Scalability", d: "We structured a cost-effective solution that matched — and in many cases outperformed — the CN supplier's pricing, with a scalable model that improves with volume." },
            { n: "03", t: "Two-Stage Sampling for Accuracy", d: "Blank samples confirmed size, material quality and structural integrity. Printed samples delivered within 3 weeks allowed TRIP to assess colour accuracy before full production." },
            { n: "04", t: "Streamlined Order Process", d: "With the new supply chain in place, TRIP can now place orders with confidence, securing deliveries in under 6 weeks with full visibility." }
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 80}><div style={{ padding: 28, background: C.white, borderRadius: 14, border: "1px solid rgba(26,26,26,.04)" }}>
              <span style={{ fontFamily: "'Fraunces',serif", fontSize: 13, fontWeight: 500, color: C.amber }}>{s.n}</span>
              <h3 style={{ fontSize: 17, fontWeight: 600, margin: "10px 0 10px" }}>{s.t}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: C.ink60 }}>{s.d}</p>
            </div></Reveal>
          ))}
        </div>
      </section>

      {/* RESULTS */}
      <section style={{ background: C.ink, color: C.white, padding: "80px 0" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
          <Reveal><SectionTag>The Results</SectionTag></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 40 }}>
            {[
              { s: "50%", d: "Faster lead times — from 12+ weeks to just 5–6 weeks" },
              { s: "Better", d: "Cost efficiency than CN, with long-term savings through scalable volumes" },
              { s: "Monthly", d: "Replenishment orders — a supply chain that supports rapid growth" }
            ].map((r, i) => (
              <Reveal key={i} delay={i * 100}><div style={{ padding: "36px 28px", background: "rgba(255,255,255,.03)", borderRadius: 14, border: "1px solid rgba(255,255,255,.04)", textAlign: "center" }}>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 44, fontWeight: 400, color: C.amber, marginBottom: 8 }}>{r.s}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1.5 }}>{r.d}</div>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section style={{ padding: "88px 0", background: C.white }}>
        <Reveal><div style={{ maxWidth: 880, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Fraunces',serif", fontSize: 72, color: C.amber, lineHeight: .8, marginBottom: 16 }}>&ldquo;</div>
          <p style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(18px,2.4vw,26px)", fontWeight: 300, fontStyle: "italic", color: C.ink, lineHeight: 1.65, marginBottom: 32 }}>Supplied made everything super easy by quickly finding more cost effective packaging options with faster lead times, handling all the details, and getting the samples perfect on the first try. Our Supply team seamlessly switched from old to new supply without impacting customer orders.</p>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>Emily Gault</span><span style={{ fontSize: 13, color: C.ink40, marginLeft: 10 }}>Innovation & Implementation Manager, TRIP</span>
        </div></Reveal>
      </section>

      {/* TAKEAWAY */}
      <section style={{ maxWidth: 780, margin: "0 auto", padding: "80px 40px" }}>
        <Reveal>
          <SectionTag>The Takeaway</SectionTag>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: C.ink60, marginBottom: 20 }}>Fast-growing brands can&apos;t afford supply chains that hold them back. By transitioning TRIP&apos;s tube production from China to Europe, we halved their lead times, improved cost efficiency, and gave them the agility to scale on their terms.</p>
          <p style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 400, fontStyle: "italic", color: C.ink, lineHeight: 1.5 }}>Better supply chains aren&apos;t just about speed. They&apos;re about <span style={{ color: C.amber }}>control, confidence, and growth without friction.</span></p>
        </Reveal>
      </section>

      {/* CTA */}
      <section style={{ background: C.ink, padding: "80px 0" }}>
        <Reveal><div style={{ maxWidth: 680, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Fraunces',serif", fontSize: 30, fontWeight: 400, color: C.white, marginBottom: 12 }}>Supply chain holding you back from <em style={{ color: C.amber }}>scaling faster?</em></h2>
          <p style={{ fontSize: 14, color: C.ink40, marginBottom: 32 }}>Let&apos;s fix that.</p>
          <a href="/contact-us" style={{ display: "inline-block", padding: "15px 36px", background: C.amber, color: C.white, borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Start a Project →</a>
        </div></Reveal>
      </section>
    </div>
  );
}
