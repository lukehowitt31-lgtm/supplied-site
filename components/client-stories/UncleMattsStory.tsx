"use client";

import { Reveal } from "@/components/ui/Reveal";

const C = { amber: "#C8773E", ink: "#1A1A1A", ink60: "#666", ink40: "#8A8A8A", cream: "#FAF9F6", white: "#FFF" };

const SectionTag = ({ children }: { children: React.ReactNode }) => <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: C.amber, display: "block", marginBottom: 20 }}>{children}</span>;

export default function UncleMattsStory() {
  return (
    <div style={{ color: C.ink, background: C.cream, overflowX: "hidden" }}>
      {/* HERO */}
      <section style={{ background: C.ink, color: C.white, position: "relative", overflow: "hidden", padding: "140px 0 110px", minHeight: "88vh", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url('/images/client-stories/unclemattshats-hero.webp')", backgroundSize: "cover", backgroundPosition: "center", zIndex: 0 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,26,26,.93) 0%, rgba(26,26,26,.85) 40%, rgba(26,26,26,.6) 100%)", zIndex: 1 }} />
        <div style={{ position: "absolute", right: -20, bottom: -20, fontFamily: "'Fraunces',serif", fontSize: "min(16vw,240px)", fontWeight: 300, color: "rgba(200,119,62,.035)", lineHeight: 1, pointerEvents: "none", userSelect: "none", zIndex: 2 }}>🍦🧢</div>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 3, width: "100%" }}>
          <div className="af" style={{ animationDelay: ".1s", opacity: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <SectionTag>Client Story</SectionTag>
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".15em", textTransform: "uppercase", color: C.ink40 }}>· Packaging For A Just Cause</span>
            </div>
          </div>
          <h1 className="af font-extrabold text-white" style={{ animationDelay: ".25s", opacity: 0, fontSize: "clamp(44px,6vw,76px)", lineHeight: 1.05, marginBottom: 16, maxWidth: 850 }}>
            More Than Just a Hat. <em className="font-fraunces italic font-medium not-italic" style={{ display: "block" }}>More Than Just Packaging.</em>
          </h1>
          <p className="af" style={{ animationDelay: ".35s", opacity: 0, fontSize: 17, color: "rgba(255,255,255,.55)", marginBottom: 40, maxWidth: 640, lineHeight: 1.7 }}>
            How we helped turn a heartfelt mission into the most iconic hat packaging on earth. 🍦 🧢
          </p>
          <div className="af" style={{ animationDelay: ".45s", opacity: 0, display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 56 }}>
            {["Custom Sized Tub", "Inside Print", "CN Production", "Mental Health Awareness"].map(p => <span key={p} style={{ padding: "6px 16px", borderRadius: 20, fontSize: 12, fontWeight: 500, border: "1px solid rgba(200,119,62,.25)", color: C.amber, background: "rgba(200,119,62,.05)" }}>{p}</span>)}
          </div>
          <div className="af" style={{ animationDelay: ".55s", opacity: 0, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(255,255,255,.05)", borderRadius: 16, overflow: "hidden", maxWidth: 820 }}>
            {[{ v: "Iconic", l: "Packaging Moment" }, { v: "3–4", l: "Sample Rounds" }, { v: "Kept", l: "Not Thrown Away" }, { v: "10%", l: "Profits to Charity" }].map((m, i) => (
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
          <div><SectionTag>The Context</SectionTag><h2 className="font-extrabold" style={{ fontSize: 34, lineHeight: 1.25 }}>A tribute to Matt. <em className="font-fraunces italic font-medium not-italic">A mission that matters.</em></h2></div>
          <div style={{ fontSize: 16, lineHeight: 1.85, color: C.ink60 }}>
            <p style={{ marginBottom: 20 }}>Uncle Matt&apos;s Hats isn&apos;t just a cap brand. It&apos;s a tribute to Matt — a brother, an uncle, and someone who, like so many, faced silent struggles with mental health. Every hat sold helps spark much-needed conversations and reminds people that it&apos;s okay to speak up, and okay not to have it all figured out.</p>
            <p style={{ marginBottom: 20 }}>The brand&apos;s heart and honesty hit us straight away — so we made it our mission to deliver packaging that matched that same authenticity.</p>
            <p style={{ fontWeight: 500, color: C.ink }}>They wanted their hats to ship in ice cream tubs. Because just like a brain freeze, life can hit you with those unexpected moments where everything feels overwhelming. The packaging had to tell that story.</p>
          </div>
        </div></Reveal>
      </section>

      {/* CHALLENGE */}
      <section style={{ background: C.ink, color: C.white, padding: "80px 0" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px" }}>
          <Reveal><SectionTag>The Challenge</SectionTag><h2 className="font-extrabold text-white" style={{ fontSize: 32, marginBottom: 48, maxWidth: 600 }}>A concept that didn&apos;t exist. <em className="font-fraunces italic font-medium not-italic">Until we built it.</em></h2></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 32 }}>
            {[
              { n: "01", t: "Hard to Find the Right Fit", d: "Boxes? Easy. Ice cream tubs? No problem. But nothing existed that actually fit a hat and felt on-brand." },
              { n: "02", t: "Close, But No Cigar", d: "Off-the-shelf options got close but never quite aligned with the premium branding or component requirements." },
              { n: "03", t: "Then Uncle Matt's Found Us", d: "From day one, we knew this wasn't a quick job. But the mission mattered, so we committed. No compromises, no shortcuts." }
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
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "100px 40px" }}>
        <Reveal><SectionTag>Our Solution</SectionTag><h2 className="font-extrabold" style={{ fontSize: 34, marginBottom: 48, maxWidth: 600 }}>Iterated until it was <em className="font-fraunces italic font-medium not-italic">perfect.</em></h2></Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
          {[
            { n: "01", t: "Nailed the Tricky Tub Design", d: "Ice cream tubs aren't made for hats, especially when it comes to printing. We worked through multiple iterations to get the structure and artwork right, giving it that authentic, premium feel." },
            { n: "02", t: "Iterated Until Perfect", d: "We didn't stop at \"good enough\". It took 3–4 rounds of samples, tweaks, and fine-tuning to lock in the fit, finish, and brand presence — and we were with Steve every step of the way." },
            { n: "03", t: "Built to Last (and Be Loved)", d: "This wasn't throwaway packaging. It had to be something people wanted to keep. We chose materials and finishes that made the tub feel as meaningful as what's inside." }
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 80}><div style={{ padding: 28, background: C.white, borderRadius: 14, border: "1px solid rgba(26,26,26,.04)", height: "100%", display: "flex", flexDirection: "column" }}>
              <span style={{ fontFamily: "'Fraunces',serif", fontSize: 13, fontWeight: 500, color: C.amber }}>{s.n}</span>
              <h3 style={{ fontSize: 17, fontWeight: 600, margin: "10px 0 10px" }}>{s.t}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: C.ink60, flex: 1 }}>{s.d}</p>
            </div></Reveal>
          ))}
        </div>
      </section>

      {/* RESULTS */}
      <section style={{ background: C.ink, color: C.white, padding: "80px 0" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px" }}>
          <Reveal><SectionTag>The Results</SectionTag></Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 20, marginBottom: 32 }}>
            {[
              { s: "Iconic", d: "The tub has become a total statement piece — instantly recognisable, totally unique, and just as talked about as the hat itself." },
              { s: "Kept", d: "Customers aren't throwing these away. They're reusing them, displaying them, storing things in them. Packaging with a second life." },
              { s: "Amplified", d: "This packaging didn't just protect the product — it helped tell the story. It's played a key role in raising awareness and driving conversations." },
              { s: "Frozen", d: "Some customers were so convinced it was real ice cream, they put it in the freezer before realising it was actually a hat! 🍦" }
            ].map((r, i) => (
              <Reveal key={i} delay={i * 80}><div style={{ padding: "32px 28px", background: "rgba(255,255,255,.03)", borderRadius: 14, border: "1px solid rgba(255,255,255,.04)", display: "flex", alignItems: "flex-start", gap: 20 }}>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 36, fontWeight: 400, color: C.amber, flexShrink: 0, minWidth: 100, textAlign: "center" }}>{r.s}</div>
                <div style={{ fontSize: 14, color: "rgba(255,255,255,.55)", lineHeight: 1.6 }}>{r.d}</div>
              </div></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* COMMITMENT */}
      <section style={{ padding: "80px 0", background: C.cream }}>
        <Reveal><div style={{ maxWidth: 800, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <SectionTag>Our Commitment</SectionTag>
          <p style={{ fontFamily: "'Fraunces',serif", fontSize: 24, fontWeight: 400, lineHeight: 1.6, fontStyle: "italic", color: C.ink, marginBottom: 20 }}>
            From the very first conversation, we knew this was something special. Uncle Matt&apos;s Hats stands for openness, empathy, and connection — and we&apos;re proud to be a small part of that bigger message.
          </p>
          <p style={{ fontSize: 15, color: C.ink60, lineHeight: 1.7, marginBottom: 32 }}>
            This wasn&apos;t just about delivering packaging. It was about backing a movement we deeply believe in. We encourage everyone to go get a hat and give Steve support for an amazing cause.
          </p>
          <a href="https://unclemattshats.com/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", padding: "14px 32px", background: C.ink, color: C.white, borderRadius: 10, fontSize: 14, fontWeight: 600, textDecoration: "none" }}>Visit Uncle Matt&apos;s Hats →</a>
        </div></Reveal>
      </section>

      {/* QUOTE */}
      <section style={{ padding: "88px 0", background: C.white }}>
        <Reveal><div style={{ maxWidth: 880, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <div style={{ fontFamily: "'Fraunces',serif", fontSize: 72, color: C.amber, lineHeight: .8, marginBottom: 16 }}>&ldquo;</div>
          <p style={{ fontFamily: "'Fraunces',serif", fontSize: "clamp(18px,2.4vw,26px)", fontWeight: 300, fontStyle: "italic", color: C.ink, lineHeight: 1.65, marginBottom: 32 }}>The packaging was so fundamental to our product proposition and before we started talking to other suppliers, I really thought it may not be able to be done! The whole process became instantly easier once we started working with the Supplied team!</p>
          <span style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>Steve Willicott</span><span style={{ fontSize: 13, color: C.ink40, marginLeft: 10 }}>Founder, Uncle Matt&apos;s Hats</span>
        </div></Reveal>
      </section>

      {/* TAKEAWAY */}
      <section style={{ maxWidth: 780, margin: "0 auto", padding: "80px 40px" }}>
        <Reveal>
          <SectionTag>The Takeaway</SectionTag>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: C.ink60, marginBottom: 20 }}>Some packaging projects are about efficiency, cost, and lead times. This one was about doing justice to a cause that genuinely matters. The brief was unconventional. The solution didn&apos;t exist yet. But the mission was worth every iteration.</p>
          <p style={{ fontFamily: "'Fraunces',serif", fontSize: 22, fontWeight: 400, fontStyle: "italic", color: C.ink, lineHeight: 1.5 }}>Great packaging doesn&apos;t just protect what&apos;s inside. <span style={{ color: C.amber }}>It amplifies what it stands for.</span></p>
        </Reveal>
      </section>

      {/* CTA */}
      <section style={{ background: C.ink, padding: "80px 0" }}>
        <Reveal><div style={{ maxWidth: 680, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
          <h2 className="font-extrabold text-white" style={{ fontSize: 30, marginBottom: 12 }}>Got a packaging challenge that <em className="font-fraunces italic font-medium not-italic">hasn&apos;t been solved yet?</em></h2>
          <p style={{ fontSize: 14, color: C.ink40, marginBottom: 32 }}>We love the ones that haven&apos;t been done before.</p>
          <a href="/contact-us" style={{ display: "inline-block", padding: "15px 36px", background: C.amber, color: C.white, borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Start a Project →</a>
        </div></Reveal>
      </section>
    </div>
  );
}
