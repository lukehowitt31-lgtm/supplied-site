"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";

const C = { amber: "#C8773E", ink: "#1A1A1A", ink60: "#666", ink40: "#8A8A8A", cream: "#FAF9F6", white: "#FFF" };

interface Story {
  slug: string;
  brand: string;
  headline: string;
  tag: string;
  metric: string;
  metricLabel: string;
  image: string;
  position: string;
  desc: string;
}

const stories: Story[] = [
  { slug: "healf", brand: "Healf", headline: "The Packaging Infrastructure Behind 434% Growth.", tag: "End-to-End Partner", metric: "434%", metricLabel: "Growth Year", image: "/images/client-stories/healf-hero.png", position: "center 35%", desc: "Structured a forecast-led packaging system supporting 10–15 SKUs across 6–10 annual shipments — replacing fragmented sourcing with predictable, scalable supply." },
  { slug: "spacegoods", brand: "Spacegoods", headline: "Come for the project. Stay for the partnership.", tag: "D2C & Retail", metric: "+122%", metricLabel: "Search Growth", image: "/images/client-stories/spacegoods-hero.webp", position: "center", desc: "What started as a mailer box upgrade became a full packaging partnership — 10+ SKUs, monthly supply cadence, and a Tesco retail launch." },
  { slug: "glaize-x-aston-martin", brand: "Glaize × Aston Martin", headline: "Crossing the finish line in just 3.5 weeks.", tag: "Limited Edition", metric: "3.5 wks", metricLabel: "End-to-End", image: "/images/client-stories/glaize-hero.jpg", position: "center 40%", desc: "200 premium litho mailers with physical Aston Martin Green colour matching — engineered as a controlled sprint for the British Grand Prix." },
  { slug: "trip", brand: "TRIP", headline: "Accelerating supply chains for a fast-growing brand.", tag: "Supply Chain", metric: "50%", metricLabel: "Faster Lead Times", image: "/images/client-stories/trip-hero.png", position: "center", desc: "Transitioned tube production from China to Europe, cutting lead times from 12+ weeks to 5–6 weeks while improving cost efficiency." },
  { slug: "glow-for-it", brand: "Glow For It", headline: "Delivering premium packaging under pressure.", tag: "Influencer Collab", metric: "20 days", metricLabel: "Brief to Order", image: "/images/client-stories/glowforit-hero.png", position: "center 25%", desc: "A bespoke influencer mailer box for a Kyra-Mae collaboration — first design in 24 hours, printed samples hand-delivered, launched on time." },
  { slug: "uncle-matts-hats", brand: "Uncle Matt's Hats", headline: "More than just a hat. More than just packaging.", tag: "For A Just Cause", metric: "Iconic", metricLabel: "Packaging Moment", image: "/images/client-stories/unclemattshats-hero.webp", position: "center", desc: "A custom ice cream tub that didn't exist until we built it — 3–4 sample rounds to create packaging that customers keep, display, and share." },
];

function StoryRow({ story, index, reversed }: { story: Story; index: number; reversed: boolean }) {
  const [h, setH] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <Reveal>
      <div
        style={{
          display: "grid", gridTemplateColumns: reversed ? "1fr 1.1fr" : "1.1fr 1fr", gap: 0,
          background: C.ink, borderRadius: 20, overflow: "hidden", marginBottom: 24,
          transition: "box-shadow .4s ease",
          boxShadow: h ? "0 24px 64px rgba(26,26,26,.25)" : "0 2px 16px rgba(26,26,26,.06)",
        }}
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      >
        <Link
          href={`/client-stories/${story.slug}`}
          style={{
            display: "block", position: "relative", minHeight: 400, overflow: "hidden", textDecoration: "none",
            order: reversed ? 2 : 1,
          }}
        >
          <div style={{
            position: "absolute", inset: 0, backgroundImage: `url('${story.image}')`,
            backgroundSize: "cover", backgroundPosition: story.position,
            transition: "transform .8s cubic-bezier(.25,.46,.45,.94)", transform: h ? "scale(1.06)" : "scale(1)",
          }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,26,26,.15) 0%, rgba(26,26,26,.35) 100%)" }} />
          <div style={{
            position: "absolute", bottom: -20, [reversed ? "right" : "left"]: -10,
            fontFamily: "'Fraunces',serif", fontSize: 200, fontWeight: 300, color: "rgba(200,119,62,.08)",
            lineHeight: 1, pointerEvents: "none", userSelect: "none",
          }}>{num}</div>
          <div style={{ position: "absolute", top: 20, left: 20 }}>
            <span style={{ padding: "5px 12px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", background: "rgba(200,119,62,.15)", color: C.amber, border: "1px solid rgba(200,119,62,.2)", backdropFilter: "blur(8px)" }}>{story.tag}</span>
          </div>
        </Link>

        <div style={{ padding: "48px 44px", display: "flex", flexDirection: "column", justifyContent: "center", order: reversed ? 1 : 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <span style={{ fontFamily: "'Fraunces',serif", fontSize: 48, fontWeight: 300, color: "rgba(200,119,62,.2)", lineHeight: 1 }}>{num}</span>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: C.amber }}>{story.brand}</div>
          </div>
          <h3 style={{ fontFamily: "'Fraunces',serif", fontSize: 28, fontWeight: 400, lineHeight: 1.3, color: C.white, marginBottom: 16 }}>{story.headline}</h3>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,.5)", marginBottom: 24 }}>{story.desc}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 24 }}>
            <div style={{ padding: "16px 24px", background: "rgba(200,119,62,.06)", borderRadius: 12, border: "1px solid rgba(200,119,62,.12)", textAlign: "center" }}>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 28, fontWeight: 500, color: C.amber, lineHeight: 1 }}>{story.metric}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", marginTop: 4 }}>{story.metricLabel}</div>
            </div>
          </div>
          <Link
            href={`/client-stories/${story.slug}`}
            style={{
              display: "inline-flex", alignItems: "center", gap: h ? 12 : 8, padding: "14px 28px",
              background: C.amber, color: C.white, borderRadius: 10, fontSize: 14, fontWeight: 600,
              textDecoration: "none", transition: "gap .3s ease, transform .3s ease", alignSelf: "flex-start",
              transform: h ? "translateX(4px)" : "none",
            }}
          >
            Read Full Story <span>→</span>
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

export default function ClientStoriesHub() {
  return (
    <div style={{ color: C.ink, background: C.cream, overflowX: "hidden" }}>
      {/* HERO */}
      <section style={{ background: C.ink, color: C.white, padding: "140px 0 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: .02, backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 80px, rgba(200,119,62,.1) 80px, rgba(200,119,62,.1) 81px)" }} />
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>
          <div className="af" style={{ animationDelay: ".1s", opacity: 0 }}>
            <Tag>Client Stories</Tag>
          </div>
          <h1 className="af font-extrabold text-white" style={{ animationDelay: ".2s", opacity: 0, fontSize: "clamp(40px,5.5vw,72px)", lineHeight: 1.08, marginBottom: 24, maxWidth: 800, marginTop: 20 }}>
            The work speaks <em className="font-fraunces italic font-medium not-italic">for itself.</em>
          </h1>
          <p className="af" style={{ animationDelay: ".35s", opacity: 0, fontSize: 17, color: "rgba(255,255,255,.5)", maxWidth: 580, lineHeight: 1.75, marginBottom: 48 }}>
            From scaling supply chains to engineering limited-edition collaborations — here&apos;s how we help fast-growing brands turn packaging into a competitive advantage.
          </p>

          <div className="af" style={{ animationDelay: ".5s", opacity: 0, display: "flex", gap: 40, paddingBottom: 40, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
            {[
              { v: "50+", l: "Brands Served" },
              { v: "23%", l: "Avg. Client Saving" },
              { v: "98%", l: "On-Time Delivery" },
              { v: "6", l: "Countries Produced In" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 24, fontWeight: 500, color: C.amber }}>{s.v}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section style={{ maxWidth: 1440, margin: "0 auto", padding: "60px 40px 40px" }}>
        {stories.map((story, i) => (
          <StoryRow key={story.slug} story={story} index={i} reversed={i % 2 === 1} />
        ))}
      </section>

      {/* CTA */}
      <section style={{ background: C.ink, padding: "80px 0" }}>
        <Reveal>
          <div style={{ maxWidth: 680, margin: "0 auto", padding: "0 40px", textAlign: "center" }}>
            <h2 className="font-extrabold text-white" style={{ fontSize: 32, marginBottom: 12 }}>
              Ready to become the <em className="font-fraunces italic font-medium not-italic">next success story?</em>
            </h2>
            <p style={{ fontSize: 15, color: C.ink40, marginBottom: 32, lineHeight: 1.7 }}>
              Whether you&apos;re scaling fast, launching something new, or rethinking your packaging — let&apos;s talk.
            </p>
            <Link href="/contact-us" style={{ display: "inline-block", padding: "15px 36px", background: C.amber, color: C.white, borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>Start a Project →</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
