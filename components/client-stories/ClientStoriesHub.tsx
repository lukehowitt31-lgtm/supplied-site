"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { AccentHeading } from "@/components/ui/AccentHeading";
import type {
  ClientStoriesHubContent,
  ClientStorySummary,
} from "@/types/clientStory";

const C = { amber: "#C8773E", ink: "#1A1A1A", ink60: "#666", ink40: "#8A8A8A", cream: "#FAF9F6", white: "#FFF" };

function StoryRow({
  story,
  index,
  reversed,
}: {
  story: ClientStorySummary;
  index: number;
  reversed: boolean;
}) {
  const [h, setH] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <Reveal>
      <div
        className={`grid grid-cols-1 gap-0 ${reversed ? "lg:grid-cols-[1fr_1.1fr]" : "lg:grid-cols-[1.1fr_1fr]"}`}
        style={{
          background: C.ink, borderRadius: 20, overflow: "hidden", marginBottom: 24,
          transition: "box-shadow .4s ease",
          boxShadow: h ? "0 24px 64px rgba(26,26,26,.25)" : "0 2px 16px rgba(26,26,26,.06)",
        }}
        onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      >
        <Link
          href={`/client-stories/${story.slug}`}
          className={`min-h-[250px] lg:min-h-[400px] ${reversed ? "lg:order-1" : "lg:order-2"}`}
          style={{
            display: "block", position: "relative", overflow: "hidden", textDecoration: "none",
          }}
        >
          <div style={{
            position: "absolute", inset: 0, backgroundImage: `url('${story.image}')`,
            backgroundSize: "cover", backgroundPosition: story.position,
            transition: "transform .8s cubic-bezier(.25,.46,.45,.94)", transform: h ? "scale(1.06)" : "scale(1)",
          }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(26,26,26,.15) 0%, rgba(26,26,26,.35) 100%)" }} />
          <div
            className="hidden lg:block"
            style={{
              position: "absolute", bottom: -20, [reversed ? "right" : "left"]: -10,
              fontFamily: "var(--font-fraunces), serif", fontSize: 200, fontWeight: 300, color: "rgba(200,119,62,.08)",
              lineHeight: 1, pointerEvents: "none", userSelect: "none",
            }}
          >{num}</div>
          <div style={{ position: "absolute", top: 20, left: 20 }}>
            <span style={{ padding: "5px 12px", borderRadius: 20, fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase", background: "rgba(200,119,62,.15)", color: C.amber, border: "1px solid rgba(200,119,62,.2)", backdropFilter: "blur(8px)" }}>{story.tag}</span>
          </div>
        </Link>

        <div className={`p-7 md:p-11 flex flex-col justify-center ${reversed ? "lg:order-2" : "lg:order-1"}`}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
            <span style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 48, fontWeight: 300, color: "rgba(200,119,62,.2)", lineHeight: 1 }}>{num}</span>
            <img src={story.logo} alt={story.brand} className={`object-contain ${story.logo.endsWith('.png') ? 'h-8 md:h-10' : 'h-6 md:h-7 brightness-0 invert opacity-80'}`} />
          </div>
          <h3 className="font-extrabold" style={{ fontSize: "clamp(20px,2.5vw,28px)", lineHeight: 1.3, color: C.white, marginBottom: 16 }}>{story.headline} <em className="font-fraunces italic font-medium" style={{ color: C.amber }}>{story.headlineAccent}</em></h3>
          <p style={{ fontSize: 14, lineHeight: 1.75, color: "rgba(255,255,255,.5)", marginBottom: 24 }}>{story.desc}</p>
          <div className="flex gap-3 mb-6">
            <div className="bg-white/[0.03] rounded-[10px] p-4 md:p-5 border border-white/[0.04]">
              <div className="font-fraunces text-[34px] font-medium text-supplied-amber leading-none">{story.metric}</div>
              <div className="text-[11px] text-white/40 mt-1">{story.metricLabel}</div>
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

interface ClientStoriesHubProps {
  content: ClientStoriesHubContent;
}

export default function ClientStoriesHub({ content }: ClientStoriesHubProps) {
  return (
    <div style={{ color: C.ink, background: C.cream, overflowX: "hidden" }}>
      {/* HERO */}
      <section className="pt-28 md:pt-[140px] pb-8 md:pb-10" style={{ background: C.ink, color: C.white, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: .02, backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 80px, rgba(200,119,62,.1) 80px, rgba(200,119,62,.1) 81px)" }} />
        <div className="px-5 md:px-10 max-w-[1440px] mx-auto relative z-[1]">
          <div className="af" style={{ animationDelay: ".1s", opacity: 0 }}>
            <Tag>Client Stories</Tag>
          </div>
          <div className="af" style={{ animationDelay: ".2s", opacity: 0, maxWidth: 800, marginTop: 20 }}>
            <AccentHeading
              as="h1"
              text={content.heading}
              className="font-extrabold text-white text-[clamp(40px,5.5vw,72px)] leading-[1.08] mb-6"
              accentClassName="text-supplied-amber"
            />
          </div>
          <p className="af" style={{ animationDelay: ".35s", opacity: 0, fontSize: 17, color: "rgba(255,255,255,.5)", maxWidth: 580, lineHeight: 1.75, marginBottom: 48 }}>
            {content.subheading}
          </p>

          <div className="af grid grid-cols-2 gap-4 md:flex md:gap-10 pb-10" style={{ animationDelay: ".5s", opacity: 0, borderBottom: "1px solid rgba(255,255,255,.06)" }}>
            {[
              { v: "50+", l: "Brands Served" },
              { v: "23%", l: "Avg. Client Saving" },
              { v: "98%", l: "On-Time Delivery" },
              { v: "6", l: "Countries Produced In" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 24, fontWeight: 500, color: C.amber }}>{s.v}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section className="px-5 md:px-10 pt-10 md:pt-[60px] pb-8 md:pb-10 max-w-[1440px] mx-auto">
        {content.stories.map((story, i) => (
          <StoryRow key={story.slug} story={story} index={i} reversed={i % 2 === 1} />
        ))}
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20" style={{ background: C.ink }}>
        <Reveal>
          <div className="px-5 md:px-10 max-w-[680px] mx-auto text-center">
            <h2 className="font-extrabold text-white" style={{ fontSize: "clamp(24px,3vw,32px)", marginBottom: 12 }}>
              Ready to become the <em className="font-fraunces italic font-medium">next success story?</em>
            </h2>
            <p style={{ fontSize: 15, color: C.ink40, marginBottom: 32, lineHeight: 1.7 }}>
              Whether you&apos;re scaling fast, launching something new, or rethinking your packaging — let&apos;s talk.
            </p>
            <Link href={content.cta.href} style={{ display: "inline-block", padding: "15px 36px", background: C.amber, color: C.white, borderRadius: 10, fontSize: 15, fontWeight: 600, textDecoration: "none" }}>{content.cta.label} →</Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
