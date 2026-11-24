/**
 * Agency-pitch phrases. Edit this list only.
 * Matching is case-insensitive and uses word boundaries, so "SEO" does not
 * match inside another word.
 */
export const AGENCY_PITCH_PATTERNS = [
  "SEO",
  "backlinks",
  "rank your website",
  "web design",
  "website redesign",
  "lead generation",
  "outsourcing",
  "partnership proposal",
  "guest post",
  "digital marketing services",
] as const;

const MIN_SUBMIT_MS = 3_000;

export type FormTimingVerdict = "ok" | "reject" | "flag";

function phrasePattern(phrase: string): RegExp {
  const escaped = phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\b`, "i");
}

const AGENCY_PITCH_EXPRESSIONS = AGENCY_PITCH_PATTERNS.map(phrasePattern);

export function messageLooksLikeAgencyPitch(message: string): boolean {
  if (!message.trim()) return false;
  return AGENCY_PITCH_EXPRESSIONS.some((pattern) => pattern.test(message));
}

/**
 * Reject only when the timestamp is present, numeric, and under 3 seconds.
 * Missing or invalid timestamps are flagged, never rejected, so a page loaded
 * before this field existed still saves.
 */
export function assessFormTiming(
  raw: unknown,
  now = Date.now()
): FormTimingVerdict {
  if (typeof raw !== "string" && typeof raw !== "number") return "flag";
  const text = String(raw).trim();
  if (!text || !/^\d+$/.test(text)) return "flag";

  const renderedAt = Number(text);
  if (!Number.isSafeInteger(renderedAt) || renderedAt <= 0) return "flag";

  const age = now - renderedAt;
  if (age < 0) return "flag";
  if (age < MIN_SUBMIT_MS) return "reject";
  return "ok";
}
