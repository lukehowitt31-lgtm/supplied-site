import { NextResponse } from "next/server";
import { rateLimit, getClientIp } from "@/lib/rateLimit";

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

    const body = await request.json();
    const { name, company, email, phone, subject, message } = body;

    if (body._hp) {
      return NextResponse.json({ success: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required" },
        { status: 400 }
      );
    }

    // ═══════════════════════════════════════
    // 1. SEND EMAIL VIA RESEND
    // ═══════════════════════════════════════
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
          "marcos@suppliedpackaging.com"
        ],
        reply_to: email,
        subject: subject
          ? `[Website] ${subject} — ${name}`
          : `[Website] Enquiry from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #1A1A1A; margin-bottom: 4px;">New contact form submission</h2>
            <p style="color: #8A8A8A; font-size: 14px; margin-top: 0;">From the suppliedpackaging.com website</p>
            <hr style="border: none; border-top: 1px solid #EBEBEB; margin: 20px 0;" />
            <table style="font-size: 14px; color: #1A1A1A; line-height: 1.6;">
              <tr><td style="padding: 4px 16px 4px 0; color: #8A8A8A; vertical-align: top;">Name</td><td style="padding: 4px 0;"><strong>${name}</strong></td></tr>
              ${company ? `<tr><td style="padding: 4px 16px 4px 0; color: #8A8A8A; vertical-align: top;">Company</td><td style="padding: 4px 0;">${company}</td></tr>` : ""}
              <tr><td style="padding: 4px 16px 4px 0; color: #8A8A8A; vertical-align: top;">Email</td><td style="padding: 4px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding: 4px 16px 4px 0; color: #8A8A8A; vertical-align: top;">Phone</td><td style="padding: 4px 0;">${phone}</td></tr>` : ""}
              ${subject ? `<tr><td style="padding: 4px 16px 4px 0; color: #8A8A8A; vertical-align: top;">Topic</td><td style="padding: 4px 0;">${subject}</td></tr>` : ""}
            </table>
            <hr style="border: none; border-top: 1px solid #EBEBEB; margin: 20px 0;" />
            <p style="font-size: 14px; color: #1A1A1A; line-height: 1.7; white-space: pre-wrap;">${message}</p>
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

    // ═══════════════════════════════════════
    // 2. NOTIFY SLACK (optional)
    // ═══════════════════════════════════════
    if (process.env.SLACK_WEBHOOK_URL) {
      try {
        await fetch(process.env.SLACK_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            blocks: [
              {
                type: "header",
                text: { type: "plain_text", text: "📬 New Contact Form Submission" },
              },
              {
                type: "section",
                fields: [
                  { type: "mrkdwn", text: `*Name:*\n${name}` },
                  { type: "mrkdwn", text: `*Company:*\n${company || "—"}` },
                  { type: "mrkdwn", text: `*Email:*\n${email}` },
                  { type: "mrkdwn", text: `*Topic:*\n${subject || "General"}` },
                ],
              },
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `*Message:*\n>${message.replace(/\n/g, "\n>")}`,
                },
              },
              {
                type: "actions",
                elements: [
                  {
                    type: "button",
                    text: { type: "plain_text", text: "📧 Reply via Email" },
                    url: `mailto:${email}?subject=Re: ${encodeURIComponent(subject || "Your enquiry to Supplied")}`,
                  },
                ],
              },
              {
                type: "context",
                elements: [
                  {
                    type: "mrkdwn",
                    text: `Via Contact Form • ${new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}`,
                  },
                ],
              },
            ],
          }),
        });
      } catch (slackErr) {
        // Don't fail the request if Slack notification fails
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
