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
 * Flag when the browser's elapsed time since navigation is missing or under
 * 3 seconds. Never a reason to reject the enquiry. There is no comparison
 * with the server clock: `performance.now()` is time since navigation start.
 */
export function formElapsedLooksTooFast(raw: unknown): boolean {
  let value = Number.NaN;
  if (typeof raw === "number") value = raw;
  else if (typeof raw === "string" && raw.trim() !== "") value = Number(raw.trim());
  if (!Number.isFinite(value)) return true;
  return value < MIN_SUBMIT_MS;
}
