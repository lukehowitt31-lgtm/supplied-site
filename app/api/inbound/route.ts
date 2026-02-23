import { NextResponse } from "next/server";

// This webhook handles inbound emails sent to hello@inbound.supplied.agency
// It forwards the email content to the team.
//
// SETUP:
// 1. In Resend Dashboard > Webhooks: Add a new webhook
// 2. URL: https://supplied.agency/api/inbound
// 3. Events: "Email Received" (or similar, depending on Resend's current UI for Inbound)
// 4. Ensure you have set up the MX records for inbound.supplied.agency in Resend.

export async function POST(request: Request) {
  try {
    // Resend sends the email data as JSON
    const payload = await request.json();

    // The payload structure for inbound emails typically includes:
    // {
    //   "from": "Sender Name <sender@example.com>",
    //   "to": "hello@inbound.supplied.agency",
    //   "subject": "Hello world",
    //   "text": "Plain text content",
    //   "html": "HTML content",
    //   "attachments": [...]
    // }
    
    const { from, subject, text, html, attachments } = payload;

    // We want to forward this to the team
    const RECIPIENTS = [
      "luke@supplied.agency",
      "alex@supplied.agency",
      "gareth@supplied.agency",
      "marcos@supplied.agency"
    ];

    // Send the forwarding email
    const emailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Supplied Inbound <noreply@supplied.agency>",
        to: RECIPIENTS,
        reply_to: from, // Allow hitting "Reply" to go back to the original sender
        subject: `[Inbound] ${subject}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 8px;">
            <p style="color: #666; font-size: 13px; margin-bottom: 20px;">
              <strong>Forwarded from:</strong> ${from}<br/>
              <strong>Original Subject:</strong> ${subject}
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <div style="font-size: 15px; line-height: 1.6; color: #1a1a1a;">
              ${html || text.replace(/\n/g, '<br/>')}
            </div>
          </div>
        `,
        // Pass through attachments if needed (requires handling Resend's attachment format)
        // For simplicity, we're just forwarding the body text/html here.
      }),
    });

    if (!emailRes.ok) {
      const err = await emailRes.json();
      console.error("Resend forwarding error:", err);
      // We return 200 to Resend even if forwarding fails, otherwise Resend will retry the webhook
      // indefinitely. Ideally, we'd log this to an error tracking service.
      return NextResponse.json({ success: false, error: "Forwarding failed" }, { status: 200 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Inbound webhook error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
