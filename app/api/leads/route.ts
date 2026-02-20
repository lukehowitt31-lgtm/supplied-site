import { supabaseAdmin } from '@/lib/supabaseAdmin';

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

export async function POST(request: Request) {
  try {
    if (!SLACK_WEBHOOK_URL) {
      console.error("SLACK_WEBHOOK_URL not set in environment variables");
      return Response.json(
        { error: "Lead capture not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, email, company, products, chatSession, sessionKey } = body;

    // Basic validation
    if (!name || !email) {
      return Response.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Persist to Supabase (blocking, as this is critical data)
    try {
      const { error: dbError } = await supabaseAdmin
        .from('hub_leads')
        .insert([
          {
            name,
            email,
            company,
            products: products || [],
            chat_session: chatSession,
            page_path: '/knowledge-hub',
            utm: {}, // Can be enhanced later if UTMs are passed
            session_key: sessionKey || null
          }
        ]);

      if (dbError) {
        console.error('Supabase lead insert error:', dbError);
        // We continue to Slack even if DB fails, or vice versa?
        // Usually better to fail gracefully but log it.
      }
    } catch (dbErr) {
      console.error('Supabase lead persistence failed:', dbErr);
    }

    // Format the chat session summary
    const questionCount = chatSession
      ? chatSession.filter((m: any) => m.role === "user").length
      : 0;

    const questionsAsked = chatSession
      ? chatSession
          .filter((m: any) => m.role === "user")
          .map((m: any) => `• ${m.text}`)
          .join("\n")
      : "No questions asked";

    // Build Slack message with rich blocks
    const slackMessage = {
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: "📦 New Knowledge Hub Lead",
            emoji: true,
          },
        },
        {
          type: "section",
          fields: [
            {
              type: "mrkdwn",
              text: `*Name:*\n${name}`,
            },
            {
              type: "mrkdwn",
              text: `*Email:*\n${email}`,
            },
            {
              type: "mrkdwn",
              text: `*Company:*\n${company || "Not provided"}`,
            },
            {
              type: "mrkdwn",
              text: `*Questions asked:*\n${questionCount}`,
            },
          ],
        },
        ...(products && products.length > 0
          ? [
              {
                type: "section",
                text: {
                  type: "mrkdwn",
                  text: `*Products interested in:*\n${products.join(", ")}`,
                },
              },
            ]
          : []),
        {
          type: "divider",
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Questions they asked:*\n${questionsAsked}`,
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `Via Knowledge Hub • ${new Date().toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" })}`,
            },
          ],
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "📧 Email them",
                emoji: true,
              },
              url: `mailto:${email}?subject=Your%20packaging%20questions%20%E2%80%93%20Supplied&body=Hi%20${encodeURIComponent(name.split(" ")[0])}%2C%0A%0AThanks%20for%20using%20our%20Knowledge%20Hub.%20I%20saw%20you%20had%20some%20questions%20about%20packaging%20%E2%80%94%20happy%20to%20help%20further.%0A%0A`,
              style: "primary",
            },
          ],
        },
      ],
    };

    // Send to Slack
    const slackResponse = await fetch(SLACK_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(slackMessage),
    });

    if (!slackResponse.ok) {
      const errorText = await slackResponse.text();
      console.error("Slack webhook error:", slackResponse.status, errorText);
      // Even if Slack fails, we return success if DB worked (or at least we don't crash the client)
      // But for debugging, let's return error if Slack fails
      return Response.json(
        { error: "Failed to send notification" },
        { status: 502 }
      );
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Lead capture error:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
