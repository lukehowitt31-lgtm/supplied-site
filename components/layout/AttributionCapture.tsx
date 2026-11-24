"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import {
  captureAttribution,
  getAttributionSnapshot,
  getServerAttributionSnapshot,
  subscribeAttribution,
} from "@/lib/attribution";

let renderedAtSnapshot = "";

function getFormRenderedAt(): string {
  if (!renderedAtSnapshot) renderedAtSnapshot = String(Date.now());
  return renderedAtSnapshot;
}

function subscribeFormRenderedAt(): () => void {
  return () => {};
}

function isPublicPath(pathname: string | null): boolean {
  if (!pathname) return false;
  if (pathname.startsWith("/backstage")) return false;
  if (pathname.startsWith("/admin")) return false;
  return true;
}

/** Records first-touch attribution once per browser, for up to 30 days. */
export function AttributionCapture() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isPublicPath(pathname)) return;
    captureAttribution();
  }, [pathname]);

  return null;
}

/**
 * Hidden inputs for the enquiry form. Values come from localStorage via
 * useSyncExternalStore so a later render cannot clear them. Capture runs on
 * read, so a form that is the landing page still records that visit.
 */
export function EnquiryHiddenFields() {
  const attribution = useSyncExternalStore(
    subscribeAttribution,
    getAttributionSnapshot,
    getServerAttributionSnapshot
  );
  const formRenderedAt = useSyncExternalStore(
    subscribeFormRenderedAt,
    getFormRenderedAt,
    () => ""
  );

  return (
    <div hidden>
      <input type="hidden" name="referrer" value={attribution.referrer} readOnly />
      <input type="hidden" name="landingPage" value={attribution.landingPage} readOnly />
      <input type="hidden" name="utmSource" value={attribution.utmSource} readOnly />
      <input type="hidden" name="utmMedium" value={attribution.utmMedium} readOnly />
      <input type="hidden" name="utmCampaign" value={attribution.utmCampaign} readOnly />
      <input
        type="hidden"
        name="attributionCapturedAt"
        value={attribution.capturedAt}
        readOnly
      />
      <input type="hidden" name="formRenderedAt" value={formRenderedAt} readOnly />
    </div>
  );
}
