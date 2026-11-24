import { NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { persistEnquiry } from "@/lib/enquiries/store";
import { isQuantityAllowedForProduct } from "@/lib/enquiries/moq";
import {
  assessFormTiming,
  messageLooksLikeAgencyPitch,
} from "@/lib/enquiries/spam";
import {
  heardAboutNeedsDetail,
  isHeardAboutOption,
} from "@/lib/enquiries/types";

interface ContactBody {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  productType?: string;
  estimatedQuantity?: string;
  referralSource?: string;
  heardAbout?: string;
  heardAboutDetail?: string;
  referrer?: string;
  landingPage?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  attributionCapturedAt?: string;
  formRenderedAt?: string | number;
  type?: string;
  jobTitle?: string;
  companyRevenue?: string;
  packagingSkus?: string;
  packagingSuppliers?: string;
  focusArea?: string;
  _hp?: string;
}

function logSilentRejection(reason: "honeypot" | "timing"): void {
  console.warn(
    JSON.stringify({
      event: "enquiry_silent_rejection",
      reason,
      at: new Date().toISOString(),
    })
  );
}

function clip(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function cleanCapturedAt(value: unknown): string {
  if (typeof value !== "string") return "";
  const time = Date.parse(value.trim());
  if (!Number.isFinite(time)) return "";
  return new Date(time).toISOString();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function emailRow(label: string, value: string): string {
  if (!value) return "";
  return `<tr><td style="padding: 4px 16px 4px 0; color: #8A8A8A; vertical-align: top;">${escapeHtml(label)}</td><td style="padding: 4px 0;">${escapeHtml(value)}</td></tr>`;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limiter = rateLimit(ip, { maxRequests: 5, windowMs: 60_000 });
    if (!limiter.ok) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(limiter.retryAfter) } }
      );
    }

    const body = (await request.json()) as ContactBody;
    const {
      name,
      company,
      email,
      phone,
      subject,
      message,
      productType,
      estimatedQuantity,
      heardAbout,
      heardAboutDetail,
      referrer: referrerRaw,
      landingPage: landingPageRaw,
      utmSource: utmSourceRaw,
      utmMedium: utmMediumRaw,
      utmCampaign: utmCampaignRaw,
      attributionCapturedAt: attributionCapturedAtRaw,
      formRenderedAt,
      type,
      jobTitle,
      companyRevenue,
      packagingSkus,
      packagingSuppliers,
      focusArea,
    } = body;

    if (body._hp) {
      logSilentRejection("honeypot");
      return NextResponse.json({ success: true });
    }

    const timing = assessFormTiming(formRenderedAt);
    if (timing === "reject") {
      logSilentRejection("timing");
      return NextResponse.json({ success: true });
    }

    const isCostAudit = type === "cost-audit";
    const isPackagingReview = type === "packaging-review";
    const effectiveMessage = message
      ?? (isCostAudit
        ? [
            focusArea ? `Focus area: ${focusArea}` : null,
            companyRevenue ? `Company revenue: ${companyRevenue}` : null,
            packagingSkus ? `Packaging SKUs: ${packagingSkus}` : null,
            packagingSuppliers
              ? `Current packaging suppliers: ${packagingSuppliers}`
              : null,
          ]
            .filter(Boolean)
            .join("\n")
        : undefined);

    if (isCostAudit) {
      if (!name || !email || !company || !companyRevenue) {
        return NextResponse.json(
          { error: "Name, email, company and revenue band are required." },
          { status: 400 }
        );
      }
    } else if (isPackagingReview) {
      if (!name || !email || !company || !effectiveMessage) {
        return NextResponse.json(
          { error: "Name, email, company and a packaging requirement are required." },
          { status: 400 }
        );
      }
    } else if (!name || !email || !effectiveMessage) {
      return NextResponse.json(
        { error: "Name, email and message are required" },
        { status: 400 }
      );
    } else if (
      productType &&
      estimatedQuantity &&
      !isQuantityAllowedForProduct(productType, estimatedQuantity)
    ) {
      return NextResponse.json(
        { error: "That quantity is below the minimum for this product." },
        { status: 400 }
      );
    }

    const submittedName = name;
    const submittedEmail = email;

    const displaySubject = isCostAudit
      ? "Packaging Cost Audit request"
      : isPackagingReview
        ? "Packaging Review request"
        : subject;

    const enquirySource = isCostAudit
      ? "cost-audit"
      : isPackagingReview
        ? "packaging-review"
        : "contact";

    const heardAboutValue = clip(heardAbout, 120);
    if (!isHeardAboutOption(heardAboutValue)) {
      return NextResponse.json(
        { error: "Please tell us how you heard about us." },
        { status: 400 }
      );
    }

    const heardAboutDetailValue = heardAboutNeedsDetail(heardAboutValue)
      ? clip(heardAboutDetail, 500)
      : "";
    const referrer = clip(referrerRaw, 1000);
    const landingPage = clip(landingPageRaw, 300);
    const utmSource = clip(utmSourceRaw, 200);
    const utmMedium = clip(utmMediumRaw, 200);
    const utmCampaign = clip(utmCampaignRaw, 200);
    const attributionCapturedAt = cleanCapturedAt(attributionCapturedAtRaw);

    let spamSuspected = timing === "flag";
    const pitchText = [effectiveMessage, heardAboutDetailValue]
      .filter(Boolean)
      .join("\n");
    if (messageLooksLikeAgencyPitch(pitchText)) spamSuspected = true;

    try {
      const extra: Record<string, string> = {};
      if (jobTitle) extra.jobTitle = jobTitle;
      if (companyRevenue) extra.companyRevenue = companyRevenue;
      if (packagingSkus) extra.packagingSkus = packagingSkus;
      if (packagingSuppliers) extra.packagingSuppliers = packagingSuppliers;
      if (focusArea) extra.focusArea = focusArea;
      extra.referralSource = heardAboutValue;

      await persistEnquiry({
        source: enquirySource,
        name: submittedName,
        company,
        email: submittedEmail,
        phone,
        subject: displaySubject,
        message: effectiveMessage,
        productType,
        estimatedQuantity,
        extra,
        heardAbout: heardAboutValue,
        heardAboutDetail: heardAboutDetailValue,
        referrer,
        landingPage,
        utmSource,
        utmMedium,
        utmCampaign,
        attributionCapturedAt,
        spamSuspected,
      });
    } catch (storeErr) {
      console.error("Enquiry persist failed:", storeErr);
    }

    const projectRows = !isCostAudit
      ? `
        ${productType ? `<tr><td style="padding: 4px 16px 4px 0; color: #8A8A8A; vertical-align: top;">Product</td><td style="padding: 4px 0;">${escapeHtml(productType)}</td></tr>` : ""}
        ${estimatedQuantity ? `<tr><td style="padding: 4px 16px 4px 0; color: #8A8A8A; vertical-align: top;">Estimated quantity</td><td style="padding: 4px 0;">${escapeHtml(estimatedQuantity)}</td></tr>` : ""}
      `
      : "";

    const attributionRows = [
      emailRow("Heard about us", heardAboutValue),
      emailRow("More detail", heardAboutDetailValue),
      emailRow("Referrer", referrer),
      emailRow("Landing page", landingPage),
      emailRow("UTM source", utmSource),
      emailRow("UTM medium", utmMedium),
      emailRow("UTM campaign", utmCampaign),
      emailRow("First visit captured", attributionCapturedAt),
      emailRow("Possible spam", spamSuspected ? "Yes" : "No"),
    ].join("");

    const pageLabel = isCostAudit
      ? " — /packaging-cost-audit"
      : isPackagingReview
        ? " — /packaging-review"
        : "";
    const emailHeading = isCostAudit
      ? "New packaging cost audit request"
      : isPackagingReview
        ? "New packaging review request"
        : "New contact form submission";
    const emailSubjectBase = isCostAudit
      ? `[Cost Audit] ${name} — ${company ?? ""}`.trim()
      : isPackagingReview
        ? `[Packaging Review] ${name} — ${company ?? ""}`.trim()
        : displaySubject
          ? `[Website] ${displaySubject} — ${name}`
          : `[Website] Enquiry from ${name}`;
    const emailSubject = spamSuspected
      ? `[Possible spam] ${emailSubjectBase}`
      : emailSubjectBase;

    const costAuditRows = isCostAudit
      ? `
        ${jobTitle ? `<tr><td style="padding: 4px 16px 4px 0; color: #8A8A8A; vertical-align: top;">Job title</td><td style="padding: 4px 0;">${jobTitle}</td></tr>` : ""}
        ${companyRevenue ? `<tr><td style="padding: 4px 16px 4px 0; color: #8A8A8A; vertical-align: top;">Company revenue</td><td style="padding: 4px 0;">${companyRevenue}</td></tr>` : ""}
        ${packagingSkus ? `<tr><td style="padding: 4px 16px 4px 0; color: #8A8A8A; vertical-align: top;">Packaging SKUs</td><td style="padding: 4px 0;">${packagingSkus}</td></tr>` : ""}
        ${packagingSuppliers ? `<tr><td style="padding: 4px 16px 4px 0; color: #8A8A8A; vertical-align: top;">Current suppliers</td><td style="padding: 4px 0;">${packagingSuppliers}</td></tr>` : ""}
      `
      : "";

    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Supplied Website <hello@inbound.suppliedpackaging.com>",
        to: [
          "luke@suppliedpackaging.com",
          "alex@suppliedpackaging.com",
          "gareth@suppliedpackaging.com",
          "marcos@suppliedpackaging.com",
          "lil@suppliedpackaging.com",
        ],
        reply_to: email,
        subject: emailSubject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #1A1A1A; margin-bottom: 4px;">${emailHeading}</h2>
            <p style="color: #8A8A8A; font-size: 14px; margin-top: 0;">From the suppliedpackaging.com website${pageLabel}</p>
            <hr style="border: none; border-top: 1px solid #EBEBEB; margin: 20px 0;" />
            <table style="font-size: 14px; color: #1A1A1A; line-height: 1.6;">
              <tr><td style="padding: 4px 16px 4px 0; color: #8A8A8A; vertical-align: top;">Name</td><td style="padding: 4px 0;"><strong>${name}</strong></td></tr>
              ${company ? `<tr><td style="padding: 4px 16px 4px 0; color: #8A8A8A; vertical-align: top;">Company</td><td style="padding: 4px 0;">${company}</td></tr>` : ""}
              <tr><td style="padding: 4px 16px 4px 0; color: #8A8A8A; vertical-align: top;">Email</td><td style="padding: 4px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding: 4px 16px 4px 0; color: #8A8A8A; vertical-align: top;">Phone</td><td style="padding: 4px 0;">${phone}</td></tr>` : ""}
              ${displaySubject ? `<tr><td style="padding: 4px 16px 4px 0; color: #8A8A8A; vertical-align: top;">Topic</td><td style="padding: 4px 0;">${displaySubject}</td></tr>` : ""}
              ${projectRows}
              ${costAuditRows}
              ${attributionRows}
            </table>
            ${effectiveMessage ? `<hr style="border: none; border-top: 1px solid #EBEBEB; margin: 20px 0;" /><p style="font-size: 14px; color: #1A1A1A; line-height: 1.7; white-space: pre-wrap;">${effectiveMessage}</p>` : ""}
            <hr style="border: none; border-top: 1px solid #EBEBEB; margin: 20px 0;" />
            <p style="font-size: 12px; color: #8A8A8A;">
              Reply directly to this email to respond to ${name} at ${email}
            </p>
          </div>
        `,
      }),
    });

    if (!emailRes.ok) {
      const err = await emailRes.json();
      console.error("Resend error:", err);
      throw new Error("Email send failed");
    }

    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        const headerText = `${spamSuspected ? "[Possible spam] " : ""}${
          isCostAudit
            ? "📊 New Packaging Cost Audit Request"
            : isPackagingReview
              ? "📦 New Packaging Review Request"
              : "📬 New Contact Form Submission"
        }`;

        const slackFields: { type: string; text: string }[] = [
          { type: "mrkdwn", text: `*Name:*\n${name}` },
          { type: "mrkdwn", text: `*Company:*\n${company || "—"}` },
          { type: "mrkdwn", text: `*Email:*\n${email}` },
          {
            type: "mrkdwn",
            text: `*Topic:*\n${isCostAudit ? "Cost Audit" : isPackagingReview ? "Packaging Review" : displaySubject || "General"}`,
          },
        ];

        if (isCostAudit) {
          if (jobTitle) slackFields.push({ type: "mrkdwn", text: `*Job title:*\n${jobTitle}` });
          if (companyRevenue) slackFields.push({ type: "mrkdwn", text: `*Revenue:*\n${companyRevenue}` });
          if (packagingSkus) slackFields.push({ type: "mrkdwn", text: `*SKUs:*\n${packagingSkus}` });
          if (packagingSuppliers) slackFields.push({ type: "mrkdwn", text: `*Suppliers:*\n${packagingSuppliers}` });
        } else {
          if (productType) slackFields.push({ type: "mrkdwn", text: `*Product:*\n${productType}` });
          if (estimatedQuantity) slackFields.push({ type: "mrkdwn", text: `*Quantity:*\n${estimatedQuantity}` });
        }

        slackFields.push({ type: "mrkdwn", text: `*Heard about us:*\n${heardAboutValue}` });
        if (heardAboutDetailValue) {
          slackFields.push({ type: "mrkdwn", text: `*More detail:*\n${heardAboutDetailValue}` });
        }
        if (referrer) slackFields.push({ type: "mrkdwn", text: `*Referrer:*\n${referrer}` });
        if (landingPage) slackFields.push({ type: "mrkdwn", text: `*Landing page:*\n${landingPage}` });
        if (utmSource || utmMedium || utmCampaign) {
          slackFields.push({
            type: "mrkdwn",
            text: `*Campaign:*\n${[utmSource, utmMedium, utmCampaign].filter(Boolean).join(" / ")}`,
          });
        }
        slackFields.push({
          type: "mrkdwn",
          text: `*Possible spam:*\n${spamSuspected ? "Yes" : "No"}`,
        });

        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            blocks: [
              { type: "header", text: { type: "plain_text", text: headerText } },
              { type: "section", fields: slackFields },
              ...(effectiveMessage
                ? [
                    {
                      type: "section",
                      text: {
                        type: "mrkdwn",
                        text: `*${isCostAudit ? "Focus area" : isPackagingReview ? "Requirement" : "Message"}:*\n>${effectiveMessage.replace(/\n/g, "\n>")}`,
                      },
                    },
                  ]
                : []),
              {
                type: "actions",
                elements: [
                  {
                    type: "button",
                    text: { type: "plain_text", text: "📧 Reply via Email" },
                    url: `mailto:${email}?subject=Re: ${encodeURIComponent(displaySubject || "Your enquiry to Supplied")}`,
                  },
                ],
              },
              {
                type: "context",
                elements: [
                  {
                    type: "mrkdwn",
                    text: `${isCostAudit ? "Via /packaging-cost-audit" : isPackagingReview ? "Via /packaging-review" : "Via Contact Form"} • ${new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}`,
                  },
                ],
              },
            ],
          }),
        });
      } catch (slackErr) {
        console.error("Slack notification failed:", slackErr);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
