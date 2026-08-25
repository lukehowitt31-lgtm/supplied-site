import "server-only";

import { createHmac } from "crypto";
import type { EnquiryRecord } from "./types";
import { toPipelineEvent } from "./pipeline";

function isAllowedWebhookUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "https:") return true;
    return (
      parsed.protocol === "http:" &&
      (parsed.hostname === "localhost" || parsed.hostname === "127.0.0.1")
    );
  } catch {
    return false;
  }
}

function signBody(body: string): string | undefined {
  const secret =
    process.env.PIPELINE_WEBHOOK_SECRET?.trim() ||
    process.env.PIPELINE_API_TOKEN?.trim();
  if (!secret) return undefined;
  const digest = createHmac("sha256", secret).update(body).digest("hex");
  return `sha256=${digest}`;
}

export async function dispatchEnquiryCreated(
  record: EnquiryRecord
): Promise<void> {
  const url = process.env.PIPELINE_WEBHOOK_URL?.trim();
  if (!url) return;
  if (!isAllowedWebhookUrl(url)) {
    console.error("PIPELINE_WEBHOOK_URL is not a valid https URL");
    return;
  }

  const payload = toPipelineEvent(record);
  const body = JSON.stringify(payload);
  const signature = signBody(body);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Supplied-Event": payload.event,
        "X-Supplied-Id": record.id,
        ...(signature ? { "X-Supplied-Signature": signature } : {}),
      },
      body,
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(
        "Pipeline webhook failed:",
        res.status,
        text.slice(0, 400)
      );
    }
  } catch (error) {
    console.error("Pipeline webhook error:", error);
  }
}
