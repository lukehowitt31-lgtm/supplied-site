/**
 * First-touch attribution, stored in localStorage for 30 days.
 * All storage access is guarded: a blocked store must never break a form.
 */

export const ATTRIBUTION_STORAGE_KEY = "supplied.attribution";
export const ATTRIBUTION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

export interface Attribution {
  referrer: string;
  landingPage: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  /** ISO timestamp of the first page view that wrote this record. */
  capturedAt: string;
}

export const emptyAttribution: Attribution = {
  referrer: "",
  landingPage: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  capturedAt: "",
};

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

/** Origin only (`https://chatgpt.com`). Path, query, and fragment are dropped. */
export function referrerOrigin(value: string): string {
  const trimmed = value.trim();
  if (!trimmed) return "";
  try {
    const url = new URL(trimmed);
    if (url.protocol !== "http:" && url.protocol !== "https:") return "";
    return url.origin;
  } catch {
    return "";
  }
}

function parseStored(raw: string | null): Attribution | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<Attribution> | null;
    if (!parsed || typeof parsed !== "object") return null;
    return {
      referrer: referrerOrigin(asString(parsed.referrer)),
      landingPage: asString(parsed.landingPage),
      utmSource: asString(parsed.utmSource),
      utmMedium: asString(parsed.utmMedium),
      utmCampaign: asString(parsed.utmCampaign),
      capturedAt: asString(parsed.capturedAt),
    };
  } catch {
    return null;
  }
}

export function isAttributionFresh(
  capturedAt: string,
  now = Date.now()
): boolean {
  const time = Date.parse(capturedAt);
  if (!Number.isFinite(time)) return false;
  const age = now - time;
  return age >= 0 && age < ATTRIBUTION_MAX_AGE_MS;
}

export function readAttribution(): Attribution {
  try {
    const stored = parseStored(localStorage.getItem(ATTRIBUTION_STORAGE_KEY));
    if (!stored || !isAttributionFresh(stored.capturedAt)) return emptyAttribution;
    return stored;
  } catch {
    return emptyAttribution;
  }
}

let cachedRaw: string | null | undefined;
let cachedSnapshot: Attribution = emptyAttribution;

/** Stable snapshot for useSyncExternalStore. Captures first-touch if needed. */
export function getAttributionSnapshot(): Attribution {
  captureAttribution();
  let raw: string | null = null;
  try {
    raw = localStorage.getItem(ATTRIBUTION_STORAGE_KEY);
  } catch {
    return emptyAttribution;
  }
  if (cachedRaw !== undefined && raw === cachedRaw) return cachedSnapshot;
  cachedRaw = raw;
  cachedSnapshot = raw ? readAttribution() : emptyAttribution;
  return cachedSnapshot;
}

export function subscribeAttribution(onStoreChange: () => void): () => void {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
}

export function getServerAttributionSnapshot(): Attribution {
  return emptyAttribution;
}

/** Writes the current page only when nothing fresh is already stored. */
export function captureAttribution(): void {
  try {
    const existing = parseStored(localStorage.getItem(ATTRIBUTION_STORAGE_KEY));
    if (existing && isAttributionFresh(existing.capturedAt)) return;

    const params = new URLSearchParams(window.location.search);
    const next: Attribution = {
      referrer: referrerOrigin(document.referrer || ""),
      landingPage: window.location.pathname || "/",
      utmSource: (params.get("utm_source") || "").slice(0, 200),
      utmMedium: (params.get("utm_medium") || "").slice(0, 200),
      utmCampaign: (params.get("utm_campaign") || "").slice(0, 200),
      capturedAt: new Date().toISOString(),
    };
    localStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage blocked or unavailable. The form still submits.
  }
}
