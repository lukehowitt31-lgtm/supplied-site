/**
 * Slack mrkdwn escaping for visitor-supplied text.
 * https://api.slack.com/reference/surfaces/formatting#escaping
 */
export function escapeSlack(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export interface EnquirySlackInput {
  spamSuspected: boolean;
  isCostAudit: boolean;
  isPackagingReview: boolean;
  name: string;
  company: string;
  email: string;
  topic: string;
  jobTitle?: string;
  companyRevenue?: string;
  packagingSkus?: string;
  packagingSuppliers?: string;
  productType?: string;
  estimatedQuantity?: string;
  heardAbout?: string;
  heardAboutDetail?: string;
  referrer?: string;
  landingPage?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  message?: string;
  submittedAt?: Date;
}

type MrkdwnField = { type: "mrkdwn"; text: string };

const FIELD_TEXT_MAX = 2000;
const SECTION_TEXT_MAX = 3000;
const HEADER_TEXT_MAX = 150;

function cap(value: string, max: number): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max - 1)}…`;
}

function field(label: string, value: string): MrkdwnField {
  return {
    type: "mrkdwn",
    text: cap(`*${label}:*\n${escapeSlack(value)}`, FIELD_TEXT_MAX),
  };
}

function chunk<T>(items: T[], size: number): T[][] {
  const groups: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    groups.push(items.slice(index, index + size));
  }
  return groups;
}

function quoteMessage(value: string): string {
  return escapeSlack(value)
    .split("\n")
    .map((line) => `>${line}`)
    .join("\n");
}

/** Slack error codes only. Anything else is reported as unrecognised. */
export function slackErrorCode(body: string): string {
  const raw = body.trim();
  if (!raw || raw.length > 80) return "unrecognised";
  try {
    const parsed = JSON.parse(raw) as { error?: unknown };
    if (typeof parsed.error === "string" && isSlackCode(parsed.error)) {
      return parsed.error;
    }
    return "unrecognised";
  } catch {
    return isSlackCode(raw) ? raw : "unrecognised";
  }
}

function isSlackCode(value: string): boolean {
  return /^[a-z0-9_]+$/i.test(value);
}

export function buildEnquirySlackPayload(input: EnquirySlackInput): {
  blocks: Record<string, unknown>[];
} {
  const headerText = cap(
    `${input.spamSuspected ? "[Possible spam] " : ""}${
      input.isCostAudit
        ? "📊 New Packaging Cost Audit Request"
        : input.isPackagingReview
          ? "📦 New Packaging Review Request"
          : "📬 New Contact Form Submission"
    }`,
    HEADER_TEXT_MAX
  );

  const identity: MrkdwnField[] = [
    field("Name", input.name),
    field("Company", input.company || "—"),
    field("Email", input.email),
    field(
      "Topic",
      input.isCostAudit
        ? "Cost Audit"
        : input.isPackagingReview
          ? "Packaging Review"
          : input.topic || "General"
    ),
  ];

  if (input.isCostAudit) {
    if (input.jobTitle) identity.push(field("Job title", input.jobTitle));
    if (input.companyRevenue) identity.push(field("Revenue", input.companyRevenue));
    if (input.packagingSkus) identity.push(field("SKUs", input.packagingSkus));
    if (input.packagingSuppliers) {
      identity.push(field("Suppliers", input.packagingSuppliers));
    }
  } else {
    if (input.productType) identity.push(field("Product", input.productType));
    if (input.estimatedQuantity) {
      identity.push(field("Quantity", input.estimatedQuantity));
    }
  }

  identity.push(field("Possible spam", input.spamSuspected ? "Yes" : "No"));

  const attribution: MrkdwnField[] = [];
  if (input.heardAbout) attribution.push(field("Heard about us", input.heardAbout));
  if (input.heardAboutDetail) {
    attribution.push(field("More detail", input.heardAboutDetail));
  }
  if (input.referrer) attribution.push(field("Referrer", input.referrer));
  if (input.landingPage) attribution.push(field("Landing page", input.landingPage));
  const campaign = [input.utmSource, input.utmMedium, input.utmCampaign]
    .filter((part): part is string => Boolean(part))
    .join(" / ");
  if (campaign) attribution.push(field("Campaign", campaign));

  const when = (input.submittedAt ?? new Date()).toLocaleString("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const via = input.isCostAudit
    ? "Via /packaging-cost-audit"
    : input.isPackagingReview
      ? "Via /packaging-review"
      : "Via Contact Form";
  const messageLabel = input.isCostAudit
    ? "Focus area"
    : input.isPackagingReview
      ? "Requirement"
      : "Message";

  const blocks: Record<string, unknown>[] = [
    { type: "header", text: { type: "plain_text", text: headerText } },
    ...chunk(identity, 10).map((fields) => ({ type: "section", fields })),
    ...chunk(attribution, 10).map((fields) => ({ type: "section", fields })),
  ];

  if (input.message) {
    blocks.push({
      type: "section",
      text: {
        type: "mrkdwn",
        text: cap(`*${messageLabel}:*\n${quoteMessage(input.message)}`, SECTION_TEXT_MAX),
      },
    });
  }

  blocks.push(
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: { type: "plain_text", text: "📧 Reply via Email" },
          url: `mailto:${encodeURIComponent(input.email)}?subject=${encodeURIComponent(
            `Re: ${input.topic || "Your enquiry to Supplied"}`
          )}`,
        },
      ],
    },
    {
      type: "context",
      elements: [{ type: "mrkdwn", text: `${via} • ${when}` }],
    }
  );

  return { blocks };
}
