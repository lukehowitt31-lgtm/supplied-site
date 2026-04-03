import { track } from "@vercel/analytics";
import { sendGAEvent } from "@next/third-parties/google";

type EventProps = Record<string, string | number | boolean | undefined>;

/**
 * Fire an analytics event to both Vercel Analytics and GA4 in one call.
 * GA4 gracefully no-ops when the measurement ID isn't configured.
 */
export function trackEvent(name: string, props?: EventProps) {
  track(name, props);
  sendGAEvent("event", name, props ?? {});
}
