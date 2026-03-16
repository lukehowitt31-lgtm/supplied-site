import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import type { ClientStoryDetail } from "@/types/clientStory";

const AMBER = "#C8773E";

interface ClientStoryPageProps {
  story: ClientStoryDetail;
}

export function ClientStoryPage({ story }: ClientStoryPageProps) {
  return (
    <div className="bg-supplied-bg text-supplied-ink overflow-x-hidden">
      <section className="relative overflow-hidden flex items-center min-h-[80vh] pt-28 md:pt-[140px] pb-16 md:pb-[96px] bg-supplied-ink text-white">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('${story.heroImage}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(26,26,26,.92) 0%, rgba(26,26,26,.82) 40%, rgba(26,26,26,.62) 100%)",
            zIndex: 1,
          }}
        />
        <div className="max-w-[1440px] mx-auto px-5 md:px-10 relative z-[2] w-full">
          <div className="af" style={{ animationDelay: ".1s", opacity: 0 }}>
            <Tag>Client Story</Tag>
          </div>
          <h1
            className="af font-extrabold text-white mt-5"
            style={{
              animationDelay: ".2s",
              opacity: 0,
              fontSize: "clamp(36px,5vw,72px)",
              lineHeight: 1.08,
              marginBottom: 18,
              maxWidth: 900,
            }}
          >
            {story.title}
          </h1>
          <p
            className="af text-white/55"
            style={{
              animationDelay: ".35s",
              opacity: 0,
              fontSize: 17,
              maxWidth: 680,
              lineHeight: 1.75,
              marginBottom: 34,
            }}
          >
            {story.result || story.solution || story.challenge}
          </p>
          {story.metrics.length > 0 ? (
            <div
              className="af grid grid-cols-2 md:grid-cols-4"
              style={{
                animationDelay: ".5s",
                opacity: 0,
                gap: 1,
                background: "rgba(255,255,255,.05)",
                borderRadius: 16,
                overflow: "hidden",
                maxWidth: 820,
              }}
            >
              {story.metrics.map((metric) => (
                <div
                  key={`${metric.value}-${metric.label}`}
                  className="py-6 px-4 md:py-[30px] md:px-5 text-center"
                  style={{ background: "rgba(255,255,255,.015)" }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-fraunces), serif",
                      fontSize: "clamp(28px,4vw,38px)",
                      fontWeight: 500,
                      color: AMBER,
                      marginBottom: 4,
                    }}
                  >
                    {metric.value}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      color: "rgba(255,255,255,.4)",
                      fontWeight: 500,
                    }}
                  >
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-5 md:px-10 py-16 md:py-[96px]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Reveal>
            <div className="p-7 rounded-2xl bg-white border border-supplied-ink/[0.04] h-full">
              <span className="text-[11px] uppercase tracking-[0.12em] font-semibold text-supplied-amber block mb-3">
                Challenge
              </span>
              <p className="text-sm leading-[1.75] text-supplied-ink-60">
                {story.challenge}
              </p>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="p-7 rounded-2xl bg-white border border-supplied-ink/[0.04] h-full">
              <span className="text-[11px] uppercase tracking-[0.12em] font-semibold text-supplied-amber block mb-3">
                Solution
              </span>
              <p className="text-sm leading-[1.75] text-supplied-ink-60">
                {story.solution}
              </p>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className="p-7 rounded-2xl bg-white border border-supplied-ink/[0.04] h-full">
              <span className="text-[11px] uppercase tracking-[0.12em] font-semibold text-supplied-amber block mb-3">
                Result
              </span>
              <p className="text-sm leading-[1.75] text-supplied-ink-60">
                {story.result}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {story.quote ? (
        <section className="bg-supplied-ink py-16 md:py-20">
          <Reveal>
            <div className="text-center max-w-[860px] mx-auto px-5 md:px-10">
              <div
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontSize: 72,
                  color: AMBER,
                  lineHeight: 0.8,
                  marginBottom: 16,
                }}
              >
                &ldquo;
              </div>
              <p
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontSize: "clamp(18px,2.4vw,25px)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  color: "#fff",
                  lineHeight: 1.65,
                  marginBottom: 24,
                }}
              >
                {story.quote}
              </p>
              {story.quoteAuthor ? (
                <p className="text-sm text-white/85">
                  {story.quoteAuthor}
                  {story.quoteRole ? (
                    <span className="text-white/45">, {story.quoteRole}</span>
                  ) : null}
                </p>
              ) : null}
            </div>
          </Reveal>
        </section>
      ) : null}

      <section className="py-16 md:py-20 bg-supplied-ink">
        <Reveal>
          <div className="text-center max-w-[680px] mx-auto px-5 md:px-10">
            <h2 className="font-extrabold text-white mb-3 text-[26px] md:text-[32px]">
              Want results like this?
            </h2>
            <p className="text-[14px] md:text-[15px] text-white/45 leading-[1.7] mb-8">
              Let's build your next packaging success story.
            </p>
            <Link
              href={story.ctaHref}
              className="inline-block px-9 py-4 bg-supplied-amber text-white rounded-[10px] text-[15px] font-semibold hover:opacity-90 transition-opacity"
            >
              {story.ctaLabel} &rarr;
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

