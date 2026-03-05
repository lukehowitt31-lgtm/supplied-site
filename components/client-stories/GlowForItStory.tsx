"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { TikTokPlayer } from "@/components/ui/TikTokPlayer";

const C = { amber: "#C8773E", ink: "#1A1A1A", ink60: "#666", ink40: "#8A8A8A", cream: "#FAF9F6", white: "#FFF" };

const SectionTag = ({ children }: { children: React.ReactNode }) => <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: C.amber, display: "block", marginBottom: 20 }}>{children}</span>;

export default function GlowForItStory() {
  return (
    <div style={{ color: C.ink, background: C.cream, overflowX: "hidden" }}>
      {/* HERO */}
      <section style={{ background: C.ink, color: C.white, position: "relative", overflow: "hidden", padding: "140px 0 110px", minHeight: "88vh", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/client-stories/glowforit-hero.png')", backgroundSize: "cover", backgroundPosition: "center 25%", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,26,26,.94) 0%, rgba(26,26,26,.86) 40%, rgba(26,26,26,.6) 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", right: -40, top: "50%", transform: "translateY(-50%)", fontFamily: "var(--font-fraunces), serif", fontSize: "min(20vw,320px)", fontWeight: 300, color: "rgba(200,119,62,.035)", lineHeight: 1, pointerEvents: "none", userSelect: "none", zIndex: 2 }}>glow.</div>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 3, width: "100%" }}>
          <div className="af" style={{ animationDelay: ".1s", opacity: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <SectionTag>Client Story</SectionTag>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: C.ink40 }}>· Kyra-Mae Collaboration</span>
            </div>
          </div>
          <h1 className="af font-extrabold text-white" style={{ animationDelay: ".25s", opacity: 0, fontSize: "clamp(44px,6vw,76px)", lineHeight: 1.05, marginBottom: 16, maxWidth: 850 }}>
            Delivering Premium Packaging <em className="font-fraunces italic font-medium">Under Pressure.</em>
          </h1>
          <p className="af" style={{ animationDelay: ".35s", opacity: 0, fontSize: 17, color: "rgba(255,255,255,.55)", marginBottom: 40, maxWidth: 640, lineHeight: 1.7 }}>
            A high-profile influencer collaboration for a fast-growing beauty brand — from brief to order in just 20 days.
          </p>
          <div className="af" style={{ animationDelay: ".45s", opacity: 0, display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 56 }}>
            {["Custom Mailer Box", "Custom Insert", "UK Production", "Influencer Collaboration"].map(p => <span key={p} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 500, border: "1px solid rgba(200,119,62,.25)", color: C.amber, background: "rgba(200,119,62,.05)" }}>{p}</span>)}
          </div>
          <div className="af" style={{ animationDelay: ".55s", opacity: 0, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(255,255,255,.05)", borderRadius: 16, overflow: "hidden", maxWidth: 820 }}>
            {[{ v: "20", l: "Days Brief to Order" }, { v: "1 day", l: "First Design Version" }, { v: "On time", l: "Delivery Hit" }, { v: "Kyra-Mae", l: "Influencer Collab" }].map((m, i) => (
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
        <Reveal><div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80 }}>
          <div><SectionTag>The Context</SectionTag><h2 className="font-extrabold" style={{ fontSize: 34, lineHeight: 1.25 }}>A high-profile collab. <em className="font-fraunces italic font-medium">A tight deadline.</em></h2></div>
          <div style={{ fontSize: 16, lineHeight: 1.85, color: C.ink60 }}>
            <p style={{ marginBottom: 20 }}>Glow For It approached us with a high-profile project — a premium packaging experience for a collaboration with Kyra-Mae, a prominent influencer. The project faced several challenges from the outset.</p>
            <p style={{ fontWeight: 500, color: C.ink }}>The packaging needed to be bespoke, beautiful, and ready for a pre-campaign photoshoot — all within an extremely compressed timeline.</p>
          </div>
        </div></Reveal>
      </section>

      {/* IMAGE BREAK */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px 100px" }}>
        <Reveal>
          <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "21/9" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/client-stories/glowforit-hero.png')", backgroundSize: "cover", backgroundPosition: "center 25%" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(26,26,26,.6) 0%, transparent 50%)" }} />
          </div>
        </Reveal>
      </section>

      {/* CHALLENGE */}
      <section style={{ background: C.ink, color: C.white, padding: "80px 0" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px" }}>
          <Reveal><SectionTag>The Challenge</SectionTag><h2 className="font-extrabold text-white" style={{ fontSize: 32, marginBottom: 48, maxWidth: 550 }}>Premium expectations. <em className="font-fraunces italic font-medium">No room for delay.</em></h2></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }}>
            {[
              { n: "01", t: "Bespoke Design", d: "Creating a unique design that aligned with premium branding while effectively accommodating the product components." },
              { n: "02", t: "Time Constraints", d: "Managing an extremely tight production timeline without compromising on quality or brand standards." },
              { n: "03", t: "Pre-Campaign Needs", d: "Providing printed samples for a photoshoot with Kyra-Mae to promote the campaign in advance of launch." }
            ].map((c, i) => (
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
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "100px 40px" }}>
        <Reveal><SectionTag>Our Solution</SectionTag><h2 className="font-extrabold" style={{ fontSize: 34, marginBottom: 48, maxWidth: 600 }}>Speed, precision, and <em className="font-fraunces italic font-medium">the personal touch.</em></h2></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 24 }}>
          {[
            { n: "01", t: "Rapid Initial Design", d: "Within 1 day of receiving the content samples, we developed the first version of the box design, including blank sample pictures for immediate feedback." },
            { n: "02", t: "Iterative Design Process", d: "Over the next 2 weeks, we worked closely with the client to refine the design based on feedback and new brief inputs. Simultaneously, we confirmed quotes to keep the project within budget." },
            { n: "03", t: "Digitally Printed Samples", d: "We identified a quick-turnaround digital printing solution for samples. These were used in a photoshoot with Kyra-Mae, building excitement for the launch." },
            { n: "04", t: "The Personal Touch", d: "We personally delivered the printed samples to the client's office to hit crucial marketing deadlines. During the visit, we reviewed final artwork and expedited any last-minute adjustments." }
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 80}><div style={{ padding: 28, background: C.white, borderRadius: 14, border: "1px solid rgba(26,26,26,.04)" }}>
              <span style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 13, fontWeight: 500, color: C.amber }}>{s.n}</span>
              <h3 style={{ fontSize: 17, fontWeight: 600, margin: "10px 0 10px" }}>{s.t}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: C.ink60 }}>{s.d}</p>
            </div></Reveal>
          ))}
        </div>
      </section>

      {/* RESULTS */}
      <section style={{ background: C.ink, color: C.white, padding: "80px 0" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px" }}>
          <Reveal>
            <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "21/9", marginBottom: 48 }}>
              <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/client-stories/glowforit-hero.png')", backgroundSize: "cover", backgroundPosition: "center 65%" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to left, rgba(26,26,26,.6) 0%, transparent 50%)" }} />
            </div>
          </Reveal>
          <Reveal><SectionTag>The Results</SectionTag></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 40 }}>
            {[
              { s: "Premium", d: "Bespoke packaging that elevated the campaign and influencer impressions" },
              { s: "On Time", d: "Despite the tight timeline, main order completed and delivered within target" },
              { s: "Launched", d: "Quick-turnaround printed samples enabled a successful promotional photoshoot" }
            ].map((r, i) => (
              <Reveal key={i} delay={i * 100}><div style={{ padding: "36px 28px", background: "rgba(255,255,255,.03)", borderRadius: 14, border: "1px solid rgba(255,255,255,.04)", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 40, fontWeight: 400, color: C.amber, marginBottom: 8 }}>{r.s}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1.5 }}>{r.d}</div>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* QUOTE */}
      <section style={{ padding: "88px 0", background: C.white }}>
        <Reveal><div style={{ maxWidth: 880, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 72, color: C.amber, lineHeight: .8, marginBottom: 16 }}>&ldquo;</div>
          <p style={{ fontFamily: "var(--font-fraunces), serif", fontSize: "clamp(18px,2.4vw,24px)", fontWeight: 300, fontStyle: "italic", color: C.ink, lineHeight: 1.65, marginBottom: 32 }}>We worked with Marcos, Alex, and Luke for our recent influencer box edit project and they were truly AMAZING! They went absolutely above and beyond to meet our tight deadlines and even hand-delivered samples to our office to help improve timelines. The quality of the box itself was beautiful, and it really exceeded our expectations.</p>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>Daisy Kelly</span><span style={{ fontSize: 13, color: C.ink40, marginLeft: 10 }}>CEO & Founder, Glow For It</span>
        </div></Reveal>
      </section>

      {/* UNBOXING VIDEO */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "100px 40px" }}>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <SectionTag>See It In Action</SectionTag>
              <h2 className="font-extrabold" style={{ fontSize: "clamp(28px,3.5vw,40px)", lineHeight: 1.15, marginBottom: 20 }}>The unboxing <em className="font-fraunces italic font-medium" style={{ color: C.amber }}>experience.</em></h2>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: C.ink60, marginBottom: 28 }}>Great packaging isn&apos;t just about what it looks like on a shelf — it&apos;s about the moment someone opens it. Here&apos;s the Glow For It × Kyra-Mae experience, straight from TikTok.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {["Bespoke design delivered in just 20 days", "Printed samples ready for influencer photoshoot", "Premium unboxing that elevated the campaign"].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: C.amber, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: C.ink60 }}>{item}</span>
                  </div>
                ))}
              </div>
              <div style={{ padding: "20px 24px", background: C.white, borderRadius: 12, borderLeft: `3px solid ${C.amber}` }}>
                <p style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 15, fontWeight: 400, fontStyle: "italic", color: C.ink, lineHeight: 1.6 }}>&ldquo;They went absolutely above and beyond to meet our tight deadlines.&rdquo;</p>
                <span style={{ fontSize: 12, color: C.ink40, marginTop: 4, display: "block" }}>— Daisy Kelly, CEO & Founder</span>
              </div>
            </div>
            <TikTokPlayer src="/videos/GlowForItTiktok.mp4" />
          </div>
        </Reveal>
      </section>

      {/* TAKEAWAY */}
      <section style={{ maxWidth: 780, margin: "0 auto", padding: "80px 40px" }}>
        <Reveal>
          <SectionTag>The Takeaway</SectionTag>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: C.ink60, marginBottom: 20 }}>Influencer collaborations move fast. The packaging has to keep up — without sacrificing quality, brand alignment, or the details that make it shareable.</p>
          <p style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 22, fontWeight: 400, fontStyle: "italic", color: C.ink, lineHeight: 1.5 }}>When deadlines are tight and stakes are high, the difference is a partner who <span style={{ color: C.amber }}>goes above and beyond.</span></p>
        </Reveal>
      </section>

      {/* CTA */}
      <section style={{ background: C.ink, padding: "80px 0" }}>
        <Reveal><div style={{ maxWidth: 680, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <h2 className="font-extrabold text-white" style={{ fontSize: 30, marginBottom: 12 }}>Got a launch deadline that <em className="font-fraunces italic font-medium">can&apos;t slip?</em></h2>
          <p style={{ fontSize: 14, color: C.ink40, marginBottom: 32 }}>We&apos;ll make sure the packaging is ready.</p>
          <Link href="/contact-us" style={{ display: "inline-block", padding: "15px 36px", background: C.amber, color: C.white, borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Start a Project →</Link>
        </div></Reveal>
      </section>
    </div>
  );
}
