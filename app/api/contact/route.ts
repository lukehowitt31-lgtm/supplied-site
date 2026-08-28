import { NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { persistEnquiry } from "@/lib/enquiries/store";

interface ContactBody {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
  productType?: string;
  estimatedQuantity?: string;
  type?: string;
  jobTitle?: string;
  companyRevenue?: string;
  packagingSkus?: string;
  packagingSuppliers?: string;
  focusArea?: string;
  _hp?: string;
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
      type,
      jobTitle,
      companyRevenue,
      packagingSkus,
      packagingSuppliers,
      focusArea,
    } = body;

    if (body._hp) {
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

    try {
      const extra: Record<string, string> = {};
      if (jobTitle) extra.jobTitle = jobTitle;
      if (companyRevenue) extra.companyRevenue = companyRevenue;
      if (packagingSkus) extra.packagingSkus = packagingSkus;
      if (packagingSuppliers) extra.packagingSuppliers = packagingSuppliers;
      if (focusArea) extra.focusArea = focusArea;

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
        extra: Object.keys(extra).length > 0 ? extra : undefined,
      });
    } catch (storeErr) {
      console.error("Enquiry persist failed:", storeErr);
    }

    const projectRows = !isCostAudit
      ? `
        ${productType ? `<tr><td style="padding: 4px 16px 4px 0; color: #8A8A8A; vertical-align: top;">Product</td><td style="padding: 4px 0;">${productType}</td></tr>` : ""}
        ${estimatedQuantity ? `<tr><td style="padding: 4px 16px 4px 0; color: #8A8A8A; vertical-align: top;">Estimated quantity</td><td style="padding: 4px 0;">${estimatedQuantity}</td></tr>` : ""}
      `
      : "";

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
    const emailSubject = isCostAudit
      ? `[Cost Audit] ${name} — ${company ?? ""}`.trim()
      : isPackagingReview
        ? `[Packaging Review] ${name} — ${company ?? ""}`.trim()
        : displaySubject
          ? `[Website] ${displaySubject} — ${name}`
          : `[Website] Enquiry from ${name}`;

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
        const headerText = isCostAudit
          ? "📊 New Packaging Cost Audit Request"
          : isPackagingReview
            ? "📦 New Packaging Review Request"
            : "📬 New Contact Form Submission";

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
