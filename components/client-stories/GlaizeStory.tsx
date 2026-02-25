"use client";

import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const C = { amber: "#C8773E", ink: "#1A1A1A", ink60: "#666", ink40: "#8A8A8A", cream: "#FAF9F6", white: "#FFF", amGreen: "#006847" };

const SectionTag = ({ children }: { children: React.ReactNode }) => <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: C.amber, display: "block", marginBottom: 20 }}>{children}</span>;

export default function GlaizeStory() {
  return (
    <div style={{ color: C.ink, background: C.cream, overflowX: "hidden" }}>
      {/* HERO */}
      <section style={{ background: C.ink, color: C.white, position: "relative", overflow: "hidden", padding: "140px 0 110px", minHeight: "88vh", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/client-stories/glaize-hero.jpg')", backgroundSize: "cover", backgroundPosition: "center 40%", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,26,26,.92) 0%, rgba(26,26,26,.82) 40%, rgba(26,26,26,.65) 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", right: -40, bottom: -40, fontFamily: "'Fraunces',serif", fontSize: "min(18vw,280px)", fontWeight: 300, color: "rgba(200,119,62,.04)", lineHeight: 1, pointerEvents: "none", userSelect: "none", zIndex: 2 }}>3.5<span style={{ fontSize: "0.5em" }}>wks</span></div>
        
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 3, width: "100%" }}>
          <div className="af" style={{ animationDelay: ".1s", opacity: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <SectionTag>Client Story</SectionTag>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: C.ink40 }}>·  Collaboration</span>
            </div>
          </div>
          <h1 className="af font-extrabold text-white" style={{ animationDelay: ".2s", opacity: 0, fontSize: "clamp(40px,5.5vw,72px)", lineHeight: 1.08, marginBottom: 16, maxWidth: 900 }}>
            Glaize × Aston Martin
          </h1>
          <p className="af" style={{ animationDelay: ".35s", opacity: 0, fontFamily: "'Fraunces',serif", fontSize: "clamp(18px,2.2vw,26px)", fontWeight: 300, fontStyle: "italic", color: "rgba(255,255,255,.6)", marginBottom: 40, maxWidth: 700 }}>
            Crossing the finish line with a limited-edition collaboration — delivered in just <span style={{ color: C.amber }}>3.5 weeks.</span>
          </p>
          <div className="af" style={{ animationDelay: ".45s", opacity: 0, display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 56 }}>
            {["Limited Edition","Litho Production","3.5 Week Turnaround","Physical Colour Match","British Grand Prix"].map(p => <span key={p} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 500, border: "1px solid rgba(200,119,62,.25)", color: C.amber, background: "rgba(200,119,62,.05)" }}>{p}</span>)}
          </div>
          <div className="af" style={{ animationDelay: ".58s", opacity: 0, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(255,255,255,.05)", borderRadius: 16, overflow: "hidden", maxWidth: 820 }}>
            {[{v:"200",l:"Limited Edition Units"},{v:"3.5",l:"Weeks End-to-End"},{v:"Zero",l:"Delays"},{v:"Exact",l:"Colour Match"}].map((m,i) => (
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
          <div><SectionTag>The Context</SectionTag><h2 className="font-extrabold" style={{ fontSize: 34, lineHeight: 1.25 }}>A last-minute collaboration. <em className="font-fraunces italic font-medium not-italic">An immovable deadline.</em></h2></div>
          <div style={{ fontSize: 16, lineHeight: 1.85, color: C.ink60 }}>
            <p style={{ marginBottom: 20 }}>When Glaize secured a last-minute collaboration opportunity with Aston Martin ahead of the British Grand Prix, the clock started immediately.</p>
            <p style={{ marginBottom: 20 }}>This wasn&apos;t a routine packaging project. It was a limited-edition mailer box tied to one of the most high-profile weekends in the racing calendar. The timeline was immovable. The brand expectations were exacting. The margin for error was zero.</p>
            <p style={{ fontWeight: 500, color: C.ink }}>Aston Martin Green isn&apos;t just a colour — it&apos;s heritage. It required precise physical colour matching, not a simple Pantone reference.</p>
          </div>
        </div></Reveal>
      </section>

      {/* IMAGE STRIP */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px 100px" }}>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 16, borderRadius: 20, overflow: "hidden" }}>
            {[
              { src: "/images/client-stories/glaize-placeholder-1.jpg", alt: "Aston Martin mailer box" },
              { src: "/images/client-stories/glaize-placeholder-2.jpg", alt: "Colour matching detail" },
              { src: "/images/client-stories/glaize-placeholder-3.jpg", alt: "Limited edition packaging" },
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
            <span style={{ fontSize: 11, color: C.ink40, fontStyle: "italic" }}>Product photography: litho print, colour matching, premium finish</span>
          </div>
        </Reveal>
      </section>

      {/* CHALLENGE */}
      <section style={{ background: C.ink, color: C.white, padding: "80px 0" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px" }}>
          <Reveal><SectionTag>The Challenge</SectionTag><h2 className="font-extrabold text-white" style={{ fontSize: 32, marginBottom: 48, maxWidth: 550 }}>Multiple pressures. <em className="font-fraunces italic font-medium not-italic">No margin for error.</em></h2></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {[
              ["No finalised artwork or colour approvals at project start", "A fixed Grand Prix deadline that could not move"],
              ["Production of just 200 units at premium quality", "EU litho production required (not standard UK supply)"],
              ["Physical colour matching to Aston Martin Green", "Structural spec transfer from UK to EU production"]
            ].map((col, ci) => (
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
          <Reveal delay={300}><div style={{ marginTop: 40, padding: "24px 32px", borderLeft: `3px solid ${C.amber}`, background: "rgba(200,119,62,.04)", borderRadius: "0 10px 10px 0" }}>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.7)", lineHeight: 1.6 }}>Under normal conditions, artwork and colour approvals alone can take 1–2 weeks. Here, the entire project had to move from brief to delivery in <strong style={{ color: C.white }}>3.5 weeks.</strong></p>
          </div></Reveal>
        </div>
      </section>

      {/* APPROACH */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "100px 40px" }}>
        <Reveal><SectionTag>Our Approach</SectionTag><h2 className="font-extrabold" style={{ fontSize: 34, marginBottom: 48, maxWidth: 600 }}>Engineered as a <em className="font-fraunces italic font-medium not-italic">controlled sprint</em> from day one.</h2></Reveal>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {[
            { n: "01", t: "Immediate Brief Alignment", d: "Scope, constraints and budget locked within 24 hours to avoid drift." },
            { n: "02", t: "Structural Spec Transfer", d: "Replicated the profile of Glaize's existing D2C mailer, ensuring consistency despite switching production geography." },
            { n: "03", t: "Accelerated Colour Matching", d: "Aston Martin Green was physically colour matched and approved through an expedited loop — precision without compromise." },
            { n: "04", t: "Parallel Workflow", d: "Artwork refinement, print preparation and production scheduling ran simultaneously rather than sequentially to protect time." },
            { n: "05", t: "Secured Production Slot", d: "EU litho production capacity was secured early, keeping the timeline protected all the way to the line." }
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 60}>
              <div style={{ display: "grid", gridTemplateColumns: "80px 240px 1fr", gap: 24, alignItems: "center", padding: "24px 0", borderBottom: "1px solid rgba(26,26,26,.06)" }}>
                <span style={{ fontFamily: "'Fraunces',serif", fontSize: 36, fontWeight: 300, color: C.amber, textAlign: "center" }}>{s.n}</span>
                <h3 style={{ fontSize: 16, fontWeight: 600 }}>{s.t}</h3>
                <p style={{ fontSize: 14, color: C.ink60, lineHeight: 1.6 }}>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}><div style={{ marginTop: 40, textAlign: "center" }}>
          <p style={{ fontFamily: "'Fraunces',serif", fontSize: 20, fontWeight: 400, fontStyle: "italic", color: C.ink }}>This wasn&apos;t about rushing. It was about <span style={{ color: C.amber }}>controlled pace and precision handling.</span></p>
        </div></Reveal>
      </section>

      {/* RESULT */}
      <section style={{ background: C.ink, color: C.white, padding: "80px 0" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px" }}>
          <Reveal><SectionTag>The Result</SectionTag></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, marginBottom: 40 }}>
            {[{v:"200",l:"Premium litho mailer boxes produced"},{v:"3.5 wks",l:"End-to-end delivery"},{v:"Zero",l:"Delays — on time for Grand Prix"}].map((r,i) => (
              <Reveal key={i} delay={i*100}><div style={{ padding: "36px 28px", background: "rgba(255,255,255,.03)", borderRadius: 14, border: "1px solid rgba(255,255,255,.04)", textAlign: "center" }}>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 44, fontWeight: 400, color: C.amber, marginBottom: 8 }}>{r.v}</div>
                <div style={{ fontSize: 13, color: "rgba(255,255,255,.5)" }}>{r.l}</div>
              </div></Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {["On budget","Aston Martin Green matched precisely","No late adjustments, no quality drift"].map((x,i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 20px", background: "rgba(200,119,62,.04)", borderRadius: 8, border: "1px solid rgba(200,119,62,.1)" }}>
                  <span style={{ color: C.amber, fontWeight: 600, fontSize: 14 }}>✓</span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,.7)" }}>{x}</span>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={300}><div style={{ marginTop: 40, textAlign: "center" }}>
            <p style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 400, fontStyle: "italic", color: C.white, lineHeight: 1.5 }}>It crossed the finish line <span style={{ color: C.amber }}>exactly on schedule.</span></p>
          </div></Reveal>
        </div>
      </section>

      {/* EDITORIAL IMAGE */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px 80px" }}>
        <Reveal>
          <div style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "21/9" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/client-stories/glaize-placeholder-4.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
            {/* Placeholder overlay — remove when real image added */}
            <div style={{ position: "absolute", inset: 0, background: "rgba(26,26,26,.85)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", border: "2px solid rgba(200,119,62,.3)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ fontSize: 18, color: C.amber }}>+</span>
              </div>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,.35)", fontWeight: 500, textAlign: "center", maxWidth: 300 }}>Wide editorial — the finished Glaize × Aston Martin mailer in context</span>
            </div>
          </div>
        </Reveal>
      </section>

      {/* QUOTE */}
      <section style={{ padding: "88px 0", background: C.white }}>
        <Reveal><div style={{ maxWidth: 880, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Fraunces',serif", fontSize: 72, color: C.amber, lineHeight: .8, marginBottom: 16 }}>&ldquo;</div>
          <p style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(18px,2.4vw,26px)", fontWeight: 300, fontStyle: "italic", color: C.ink, lineHeight: 1.65, marginBottom: 32 }}>We work with many suppliers, but very few are as helpful, supportive and flexible as Supplied. They always find a solution for anything you throw at them and the communication is always 10/10. Marcos, Alex and the team are amazing to work with and I highly recommend their services.</p>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>Glaize Team</span>
        </div></Reveal>
      </section>

      {/* UNBOXING VIDEO */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px 80px" }}>
        <Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
            <div>
              <SectionTag>See It In Action</SectionTag>
              <h2 className="font-extrabold" style={{ fontSize: 30, lineHeight: 1.25, marginBottom: 16 }}>The unboxing <em className="font-fraunces italic font-medium not-italic">experience.</em></h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: C.ink60 }}>Great packaging isn&apos;t just about what it looks like on a shelf — it&apos;s about the moment someone opens it. Here&apos;s the Glaize experience in action.</p>
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
      <section style={{ maxWidth: 780, margin: "0 auto", padding: "80px 40px" }}>
        <Reveal>
          <SectionTag>The Takeaway</SectionTag>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: C.ink60, marginBottom: 20 }}>When timelines are fixed and expectations are exacting, transactional suppliers struggle to keep pace. This project wasn&apos;t just about speed. It was about disciplined execution under pressure — aligning structure, colour and cost while protecting a non-negotiable deadline.</p>
          <p style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 400, fontStyle: "italic", color: C.ink, lineHeight: 1.5 }}>Exceptional packaging performance isn&apos;t accidental. <span style={{ color: C.amber }}>It&apos;s engineered.</span></p>
        </Reveal>
      </section>

      {/* CTA */}
      <section style={{ background: C.ink, padding: "80px 0" }}>
        <Reveal><div style={{ maxWidth: 680, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <h2 className="font-extrabold text-white" style={{ fontSize: 30, marginBottom: 12 }}>Need packaging that performs <em className="font-fraunces italic font-medium not-italic">under pressure?</em></h2>
          <p style={{ fontSize: 14, color: C.ink40, marginBottom: 32 }}>We engineer results, not excuses.</p>
          <Link href="/contact-us" style={{ display: "inline-block", padding: "15px 36px", background: C.amber, color: C.white, borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Start a Project →</Link>
        </div></Reveal>
      </section>
    </div>
  );
}
