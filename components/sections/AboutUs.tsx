import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { TeamCard } from "@/components/ui/TeamCard";
import type { AboutPageContent } from "@/lib/content/about";
import type { TeamMember } from "@/types/team";

const AMBER = "#C8773E";

interface AboutUsProps {
  aboutContent: AboutPageContent;
  teamMembers: TeamMember[];
}

function splitHeadline(headline: string): { lead: string; accent?: string } {
  const trimmed = headline.trim();
  if (!trimmed) {
    return { lead: "" };
  }

  const segments = trimmed
    .split(".")
    .map((segment) => segment.trim())
    .filter(Boolean);

  if (segments.length <= 1) {
    return { lead: trimmed };
  }

  return {
    lead: `${segments[0]}.`,
    accent: `${segments.slice(1).join(". ")}.`,
  };
}

export default function AboutUs({ aboutContent, teamMembers }: AboutUsProps) {
  const founders = teamMembers.filter((member) => member.title === "Co-Founder");
  const rest = teamMembers.filter((member) => member.title !== "Co-Founder");
  const heroHeadline = splitHeadline(aboutContent.heroHeadline);

  return (
    <div>
      {/* HERO */}
      <section className="bg-supplied-ink text-white relative overflow-hidden pt-[120px] pb-16 md:pt-[160px] md:pb-[100px]">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 80px, rgba(200,119,62,.12) 80px, rgba(200,119,62,.12) 81px)" }} />
        <div className="relative z-[1] max-w-[1440px] mx-auto px-5 md:px-10">
          <div className="af mb-5" style={{ animationDelay: ".1s", opacity: 0 }}><Tag>About Us</Tag></div>
          <h1 className="af text-[clamp(42px,5.2vw,64px)] font-extrabold text-white leading-[1.05] tracking-[-0.03em] mb-6" style={{ animationDelay: ".2s", opacity: 0, maxWidth: 750 }}>
            {heroHeadline.lead}
            {heroHeadline.accent ? (
              <>
                <br />
                <em className="font-fraunces italic font-medium" style={{ color: AMBER }}>
                  {heroHeadline.accent}
                </em>
              </>
            ) : null}
          </h1>
          <p className="af text-white/50 leading-[1.75]" style={{ animationDelay: ".35s", opacity: 0, fontSize: 18, maxWidth: 560 }}>
            {aboutContent.heroSubheadline}
          </p>
        </div>
      </section>

      {/* THE SHORT VERSION */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-10 py-16 md:py-[100px]">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-12 md:gap-20 items-start">
            <div>
              <Tag className="mb-4">{aboutContent.shortVersionTag}</Tag>
              <h2 className="font-extrabold text-supplied-ink leading-[1.25]" style={{ fontSize: 36 }}>
                {aboutContent.shortVersionHeading}{" "}
                <em className="font-fraunces italic font-medium" style={{ color: AMBER }}>{aboutContent.shortVersionHeadingAccent}</em>
              </h2>
            </div>
            <div className="text-base leading-[1.85] text-supplied-ink-60">
              {aboutContent.shortVersionBody.map((paragraph, i) => (
                <p
                  key={i}
                  className={`${i < aboutContent.shortVersionBody.length - 1 ? "mb-5" : "font-medium text-supplied-ink"}`}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* STATS */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-10 pb-16 md:pb-20">
        <Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-supplied-ink rounded-2xl overflow-hidden">
            {aboutContent.stats.map((s) => (
              <div key={s.label} className="bg-supplied-ink text-center py-6 px-4 md:py-8 md:px-4">
                <div className="font-fraunces font-medium text-supplied-amber mb-1 text-[26px] md:text-[32px]">{s.value}</div>
                <div className="text-[10px] md:text-[11px] text-white/40 font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* TEAM */}
      <section className="bg-supplied-ink text-white py-16 md:py-20 lg:pb-[100px]">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <Reveal>
            <div className="text-center mb-10 md:mb-14">
              <Tag className="mb-4">{aboutContent.teamTag}</Tag>
              <h2 className="font-extrabold text-white text-[28px] md:text-[36px]">
                {aboutContent.teamHeading}{" "}
                <em className="font-fraunces italic font-medium" style={{ color: AMBER }}>{aboutContent.teamHeadingAccent}</em>
              </h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {[...founders, ...rest].map((m) => (
              <Reveal key={m.slug}>
                <TeamCard {...m} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW WE WORK */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-10 py-16 md:py-[100px]">
        <Reveal><Tag className="mb-4">How We Work</Tag></Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aboutContent.values.map((v, i) => (
            <Reveal key={v.num} delay={i * 0.1}>
              <div className="p-7 bg-white rounded-2xl border border-supplied-ink/[0.04] h-full">
                <span className="font-fraunces font-light text-supplied-amber/15 block mb-2" style={{ fontSize: 40 }}>{v.num}</span>
                <h3 className="text-[17px] font-semibold mb-3">{v.title}</h3>
                <p className="text-sm leading-[1.75] text-supplied-ink-60">{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* WHAT WE COVER */}
      <section className="bg-white py-16 md:py-20">
        <div className="max-w-[1440px] mx-auto px-5 md:px-10">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <Tag className="mb-4">{aboutContent.whatWeCoverTag}</Tag>
                <h2 className="font-extrabold text-supplied-ink leading-[1.25] mb-6" style={{ fontSize: 32 }}>
                  {aboutContent.whatWeCoverHeading}{" "}
                  <em className="font-fraunces italic font-medium" style={{ color: AMBER }}>{aboutContent.whatWeCoverHeadingAccent}</em>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2.5">
                  {aboutContent.capabilities.map((x) => (
                    <div key={x} className="flex items-center gap-2.5 py-2">
                      <div className="w-[5px] h-[5px] rounded-full bg-supplied-amber shrink-0" />
                      <span className="text-sm text-supplied-ink-60">{x}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden bg-supplied-ink" style={{ aspectRatio: "4/3" }}>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 rounded-full border-2 border-supplied-amber/25 flex items-center justify-center">
                    <span className="text-xl text-supplied-amber">+</span>
                  </div>
                  <span className="text-[11px] text-white/35 font-medium">Global manufacturing network map or team photo</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PULL QUOTE */}
      <section className="bg-supplied-ink py-16 md:py-20">
        <Reveal>
          <div className="text-center max-w-[880px] mx-auto px-5 md:px-10">
            <div className="font-fraunces text-supplied-amber leading-[0.8] mb-4" style={{ fontSize: 72 }}>&ldquo;</div>
            <p className="font-fraunces font-light italic text-white leading-[1.65] mb-8" style={{ fontSize: "clamp(18px,2.2vw,24px)" }}>
              {aboutContent.pullQuote.text}
            </p>
            <span className="text-sm font-semibold text-white">{aboutContent.pullQuote.author}</span>
            <span className="text-[13px] text-supplied-ink-40 ml-2.5">{aboutContent.pullQuote.role}</span>
          </div>
        </Reveal>
      </section>

      {/* LOCATIONS */}
      <section className="max-w-[1440px] mx-auto px-5 md:px-10 py-16 md:py-20">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aboutContent.offices.map((loc) => (
              <div key={loc.label} className="p-8 bg-white rounded-2xl border border-supplied-ink/[0.04]">
                <div className="text-[11px] font-bold tracking-[0.12em] uppercase text-supplied-amber mb-2">{loc.label}</div>
                <h3 className="font-fraunces text-2xl font-normal mb-2">{loc.name}</h3>
                <p className="text-sm text-supplied-ink-60 leading-relaxed mb-2">{loc.address}</p>
                <p className="text-[13px] text-supplied-ink-40 italic">{loc.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="bg-supplied-ink py-16 md:py-20">
        <Reveal>
          <div className="text-center max-w-[680px] mx-auto px-5 md:px-10">
            <h2 className="font-extrabold text-white mb-3 text-[26px] md:text-[32px]">
              {aboutContent.finalCta.heading}
            </h2>
            <p className="text-[14px] md:text-[15px] text-supplied-ink-40 leading-[1.7] mb-8">
              {aboutContent.finalCta.body}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href={aboutContent.finalCta.primaryCta.href}
                className="inline-block px-9 py-4 bg-supplied-amber text-white rounded-[10px] text-[15px] font-semibold hover:opacity-90 transition-opacity"
              >
                {aboutContent.finalCta.primaryCta.label} &rarr;
              </Link>
              <Link
                href={aboutContent.finalCta.secondaryCta.href}
                className="inline-block px-9 py-4 bg-transparent text-white rounded-[10px] text-[15px] font-semibold border border-white/15 hover:border-white/30 transition-colors"
              >
                {aboutContent.finalCta.secondaryCta.label}
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
