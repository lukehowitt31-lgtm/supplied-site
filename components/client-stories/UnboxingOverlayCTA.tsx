"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { TikTokPlayer } from "@/components/ui/TikTokPlayer";

export interface UnboxingOverlayContent {
  videoSrc: string;
  contextLabel: string;
  summaryLines: string[];
  quote: string;
  quoteAttribution?: string;
  triggerKicker?: string;
  triggerLabel?: string;
  ctaHref?: string;
  ctaLabel?: string;
  revealDelayMs?: number;
  hideAfterScrollPct?: number;
}

interface UnboxingOverlayCTAProps {
  content: UnboxingOverlayContent;
}

/**
 * Structured to map cleanly from future Sanity fields.
 */
export function UnboxingOverlayCTA({ content }: UnboxingOverlayCTAProps) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  const {
    videoSrc,
    contextLabel,
    summaryLines,
    quote,
    quoteAttribution,
    triggerKicker = "See It In Action",
    triggerLabel = "Watch the unboxing",
    ctaHref = "/contact-us",
    ctaLabel = "Start a Project →",
    revealDelayMs = 1200,
    hideAfterScrollPct = 0.6,
  } = content;

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), revealDelayMs);
    return () => window.clearTimeout(timer);
  }, [revealDelayMs]);

  useEffect(() => {
    const handleScroll = () => {
      const denom = document.documentElement.scrollHeight - window.innerHeight;
      if (denom <= 0) {
        setVisible(true);
        return;
      }
      const pct = window.scrollY / denom;
      setVisible(pct < hideAfterScrollPct);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hideAfterScrollPct]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      <style jsx global>{`
        @keyframes ub-enter {
          from {
            opacity: 0;
            transform: scale(0.35);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes ub-orbit {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes ub-ping {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          100% {
            transform: scale(2.6);
            opacity: 0;
          }
        }
      `}</style>

      {visible && !open && (
        <button
          type="button"
          onClick={handleOpen}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setHovered(true)}
          onBlur={() => setHovered(false)}
          className="fixed top-28 md:top-[140px] right-16 md:right-24 z-[90] cursor-pointer [animation:ub-enter_.5s_cubic-bezier(0.22,1,0.36,1)_forwards]"
          aria-label="Open unboxing experience"
        >
          <span
            className={`relative block w-16 h-16 transition-transform duration-300 ${
              hovered ? "scale-110" : "scale-100"
            }`}
          >
            <span className="absolute inset-[-8px] rounded-full border border-dashed border-[#C8773E]/25 [animation:ub-orbit_8s_linear_infinite]">
              <span className="absolute -top-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#C8773E] shadow-[0_0_10px_rgba(200,119,62,0.65)]" />
            </span>
            {[0, 1, 2].map((i) => (
              <span
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                className="absolute inset-0 rounded-full border border-[#C8773E]/30 [animation:ub-ping_3s_ease-out_infinite]"
                style={{ animationDelay: `${i}s` }}
              />
            ))}
            <span
              className={`relative z-[2] w-16 h-16 rounded-full bg-[linear-gradient(135deg,#C8773E,#8B5A2B)] flex items-center justify-center transition-shadow duration-300 ${
                hovered
                  ? "shadow-[0_14px_44px_rgba(200,119,62,0.42)]"
                  : "shadow-[0_8px_32px_rgba(200,119,62,0.28)]"
              }`}
            >
              <svg width="20" height="22" viewBox="0 0 16 18" fill="none">
                <path d="M2 1.5L14 9L2 16.5V1.5Z" fill="white" />
              </svg>
            </span>
          </span>

          <span
            className={`hidden md:block absolute top-1/2 right-[76px] -translate-y-1/2 rounded-xl px-4 py-3 border border-[#C8773E]/20 bg-[#161410]/95 backdrop-blur-xl whitespace-nowrap transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              hovered
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-2.5 pointer-events-none"
            }`}
          >
            <span className="block text-[9px] font-semibold tracking-[0.12em] uppercase text-[#C8773E] mb-[2px]">
              {triggerKicker}
            </span>
            <span className="block text-[13px] text-white/80 font-medium">
              {triggerLabel}
            </span>
            <span className="block text-[10px] text-white/30 mt-[1px]">
              {contextLabel}
            </span>
            <span className="absolute top-1/2 -right-[5px] w-[10px] h-[10px] -translate-y-1/2 rotate-45 bg-[#161410]/95 border-r border-b border-[#C8773E]/20" />
          </span>
        </button>
      )}

      <div
        className={`fixed inset-0 z-[200] transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute inset-0 bg-black/60"
          aria-label="Close unboxing panel"
        />

        <aside
          className={`absolute top-0 right-0 bottom-0 w-[420px] max-w-full border-l border-[#C8773E]/15 bg-[rgba(16,15,12,0.98)] backdrop-blur-2xl px-5 md:px-[30px] pt-24 md:pt-[108px] pb-8 md:pb-10 overflow-y-auto transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="w-full flex items-center justify-between mb-6">
            <div className="text-white text-[20px] leading-none font-extrabold tracking-[-0.01em]">
              The unboxing{" "}
              <em className="font-fraunces font-medium italic text-[#C8773E]">
                experience.
              </em>
            </div>
            <button
              type="button"
              onClick={handleClose}
              className="w-9 h-9 rounded-[10px] border border-white/10 text-white/45 text-[20px] hover:text-white/75 hover:border-white/20 transition-colors flex items-center justify-center"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <div
            className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] delay-150 ${
              open ? "translate-x-0 scale-100 opacity-100" : "translate-x-10 scale-95 opacity-0"
            }`}
          >
            <TikTokPlayer src={videoSrc} />
          </div>

          <div className="mt-5 text-center">
            <div className="text-[9px] font-semibold tracking-[0.12em] uppercase text-[#C8773E] mb-1">
              {contextLabel}
            </div>
            <div className="text-[13px] text-white/45 leading-[1.55]">
              {summaryLines.map((line, index) => (
                <div key={`${line}-${index}`}>{line}</div>
              ))}
            </div>
            <div className="font-fraunces italic text-[14px] text-white/55 mt-3 leading-[1.5]">
              &ldquo;{quote}&rdquo;
            </div>
            {quoteAttribution && (
              <div className="text-[11px] text-white/30 mt-1">
                {quoteAttribution}
              </div>
            )}
          </div>

          <div className="mt-8 pt-4 text-center">
            <Link
              href={ctaHref}
              className="inline-block px-7 py-3 rounded-[10px] bg-[#C8773E] text-white text-[13px] font-semibold no-underline hover:bg-[#b86d38] transition-colors"
            >
              {ctaLabel}
            </Link>
          </div>
        </aside>
      </div>
    </>
  );
}
