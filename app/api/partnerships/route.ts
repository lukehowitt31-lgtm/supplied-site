import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, company, email, website, type } = await request.json();

    // Validate required fields
    if (!name || !email || !company) {
      return NextResponse.json(
        { error: "Name, email and company are required" },
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
        from: "Supplied Website <hello@inbound.supplied.agency>",
        to: [
          "luke@supplied.agency",
          "alex@supplied.agency",
          "gareth@supplied.agency",
          "marcos@supplied.agency"
        ],
        reply_to: email,
        subject: `[Partnership] Application from ${company}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2 style="color: #1A1A1A; margin-bottom: 4px;">New Partnership Application</h2>
            <p style="color: #8A8A8A; font-size: 14px; margin-top: 0;">From the supplied.agency website</p>
            <hr style="border: none; border-top: 1px solid #EBEBEB; margin: 20px 0;" />
            <table style="font-size: 14px; color: #1A1A1A; line-height: 1.6;">
              <tr><td style="padding: 4px 16px 4px 0; color: #8A8A8A; vertical-align: top;">Name</td><td style="padding: 4px 0;"><strong>${name}</strong></td></tr>
              <tr><td style="padding: 4px 16px 4px 0; color: #8A8A8A; vertical-align: top;">Company</td><td style="padding: 4px 0;">${company}</td></tr>
              <tr><td style="padding: 4px 16px 4px 0; color: #8A8A8A; vertical-align: top;">Email</td><td style="padding: 4px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              ${website ? `<tr><td style="padding: 4px 16px 4px 0; color: #8A8A8A; vertical-align: top;">Website</td><td style="padding: 4px 0;"><a href="${website}">${website}</a></td></tr>` : ""}
              ${type ? `<tr><td style="padding: 4px 16px 4px 0; color: #8A8A8A; vertical-align: top;">Type</td><td style="padding: 4px 0;">${type}</td></tr>` : ""}
            </table>
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
                text: { type: "plain_text", text: "🤝 New Partnership Application" },
              },
              {
                type: "section",
                fields: [
                  { type: "mrkdwn", text: `*Name:*\n${name}` },
                  { type: "mrkdwn", text: `*Company:*\n${company}` },
                  { type: "mrkdwn", text: `*Email:*\n${email}` },
                  { type: "mrkdwn", text: `*Type:*\n${type || "Not specified"}` },
                ],
              },
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `*Website:*\n${website || "N/A"}`,
                },
              },
              {
                type: "actions",
                elements: [
                  {
                    type: "button",
                    text: { type: "plain_text", text: "📧 Reply via Email" },
                    url: `mailto:${email}?subject=Re: Partnership with Supplied`,
                  },
                ],
              },
              {
                type: "context",
                elements: [
                  {
                    type: "mrkdwn",
                    text: `Via Partnership Form • ${new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}`,
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
    console.error("Partnership form error:", err);
    return NextResponse.json(
      { error: "Failed to send application" },
      { status: 500 }
    );
  }
}
