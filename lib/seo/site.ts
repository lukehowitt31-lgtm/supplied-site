/**
 * Single source of truth for the public site origin.
 * Canonicals, sitemap URLs, Open Graph URLs and JSON-LD URLs all go through here.
 */
export const SITE_URL = "https://www.suppliedpackaging.com";

/**
 * Taken from the Organization JSON-LD that already lived in app/layout.tsx.
 * Not inferred.
 */
export const LINKEDIN_URL = "https://www.linkedin.com/company/supplied-agency";

/** Taken from the same Organization block in app/layout.tsx. */
export const INSTAGRAM_URL = "https://www.instagram.com/suppliedpackaging/";

export const ORGANIZATION_NAME = "Supplied";
export const ORGANIZATION_LEGAL_NAME = "Supplied Agency Ltd";
export const ORGANIZATION_LOGO_PATH = "/images/brand/supplied-logo.svg";

/**
 * Use NEXT_PUBLIC_SITE_URL only when it is already on the www host.
 * Preview deployments and an apex value fall back to SITE_URL so every
 * canonical still points at production www.
 */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
  if (configured?.startsWith("https://www.")) {
    return configured;
  }
  return SITE_URL;
}

/** Absolute production URL for a site path. `"/"` is the bare origin. */
export function canonicalUrl(path: string): string {
  const trimmed = path.trim();
  if (trimmed.startsWith("https://") || trimmed.startsWith("http://")) {
    return trimmed;
  }

  const site = getSiteUrl();
  if (!trimmed || trimmed === "/") {
    return site;
  }

  const withSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  const pathname = withSlash.split(/[?#]/)[0] ?? withSlash;
  const withoutTrailing =
    pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return `${site}${withoutTrailing}`;
}

/** Make a root-relative or absolute asset URL absolute on the canonical host. */
export function absoluteUrl(value: string): string {
  const trimmed = value.trim();
  if (trimmed.startsWith("https://") || trimmed.startsWith("http://")) {
    return trimmed;
  }
  return canonicalUrl(trimmed);
}
