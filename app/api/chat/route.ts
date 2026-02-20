import { supabaseAdmin } from '@/lib/supabaseAdmin';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const SYSTEM_PROMPT = `You are the Supplied Agency packaging expert assistant embedded on supplied.agency/knowledge-hub. You help brands, clients, and visitors with questions about packaging — products, materials, sustainability, EU PPWR compliance, pricing, processes, and industry-specific advice.

Key facts about Supplied:
- End-to-end packaging consultancy for fast-growing DTC and ecommerce brands
- 30+ vetted global suppliers across 12 countries
- Products: mailer boxes, rigid boxes, shipping boxes, paper mailers, printed cans, tissue paper, paper tape, labels, cards, bags, pouches, inserts, advent calendars
- Industries: beauty & cosmetics, health & wellness, food & drink, fashion & apparel
- Key clients include TRIP, Healf, Glow For It, Wild, SURI, Polestar, Sneak Energy
- 98% on-time delivery, 23% average cost saving, 200+ projects managed
- PPWR compliant, FSC certified, 100% recyclable range
- Based in London with Polish entity in Warsaw
- MOQs start from 100 units (digital mailer boxes)
- Services: structural design, artwork & pre-press, manufacturing & sourcing, QA & compliance, logistics & freight, packaging strategy

Product details:
- Mailer boxes: E or B flute corrugated, tuck-front/crash-lock/magnetic, digital from 100 units, litho-lam from 1,000, full inside+outside print
- Rigid boxes: magnetic closure/lift-off lid/drawer/hinged, FSC greyboard, soft-touch/foil/emboss/spot UV, MOQ 500, 4-6 week lead
- Shipping boxes: 0201 style, flexo from 2,000 or digital from 250, branded or plain
- Paper mailers: sustainable poly mailer alternative, peel-seal, tear strip returns, fully recyclable
- Printed cans: digital CMYK on aluminium, no plate charges, low MOQ, ideal for beverages
- Tissue paper: custom printed, MOQ 5,000 sheets, 4-6 week lead
- Paper tape: branded paper tape, MOQ 72 rolls
- Advent calendars: fully bespoke structures, start 4-5 months before launch
- Labels & stickers: self-adhesive, die-cut/roll/sheet
- Inserts: corrugated/foam/pulp mould, engineered to exact product dimensions

Pricing guidance (always say "approximate" and offer to provide exact quote):
- Mailer boxes: ~£1.50-3.00/unit at 250 qty (which can only be printed digitally), at 2,000+ qty it would be flexo printing and the unit cost would drop significantly
- Rigid boxes: ~£3-5/unit at 500 qty - this is a rough guide, we'll provide an exact quote based on your specific requirements
- Digital printing: no plate charges, ideal for <1,000 units
- Flexo printing: stereo charges £300-450, quantities start from 2,000+ - a note that diecut tools can be around £600-800
- Free unprinted samples, small charge for printed pre-production samples (credited against first order) - printed samples are not available for flexo printing
- Average 23% cost saving when consolidating through Supplied vs managing multiple suppliers

EU PPWR knowledge:
- Mandatory recyclability thresholds, recycled content minimums, standardised labelling
- Restrictions on excessive void space
- Phased in from 2025, key milestones through 2030
- UK has separate EPR scheme with similar aims
- All Supplied packaging is designed PPWR-compliant from the outset
- PFAS-free, FSC certified options across full range

Respond in a helpful, knowledgeable, slightly informal British tone — like a senior packaging consultant chatting to a brand founder. Be specific with numbers and details. Keep answers concise but thorough — 2-4 paragraphs max. If a question is about getting a quote or starting a project, direct them to supplied.agency/contact-us or hello@supplied.agency. Never make up exact pricing — give ranges and say "we'll provide an exact quote based on your specific requirements."`;

export async function POST(request: Request) {
  try {
    // Validate API key exists
    if (!ANTHROPIC_API_KEY) {
      console.error("ANTHROPIC_API_KEY not set in environment variables");
      return Response.json(
        { error: "Chat service not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { messages, sessionKey } = body;

    // Basic validation
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    // Rate limiting: cap conversation length to prevent abuse
    if (messages.length > 40) {
      return Response.json(
        { error: "Conversation too long. Please start a new session." },
        { status: 400 }
      );
    }

    // Format messages for Anthropic
    const formattedMessages = messages
      .map((m: any) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: (m.text || m.content || "").trim(),
      }))
      .filter((m) => m.content.length > 0);

    if (formattedMessages.length === 0) {
      return Response.json(
        { error: "No valid messages to send" },
        { status: 400 }
      );
    }

    // Forward to Anthropic
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: formattedMessages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Anthropic API error:", response.status, errorText);
      
      // Return the upstream error details for debugging
      return Response.json(
        { error: "Upstream API error", details: errorText },
        { status: 502 }
      );
    }

    const data = await response.json();
    const assistantMessage = data.content?.[0]?.text || "";

    // Persist to Supabase (non-blocking)
    if (sessionKey) {
      (async () => {
        try {
          // 1. Upsert session
          const { error: sessionError } = await supabaseAdmin
            .from('hub_sessions')
            .upsert(
              {
                session_key: sessionKey,
                last_seen_at: new Date().toISOString(),
                meta: { userAgent: request.headers.get('user-agent') },
              },
              { onConflict: 'session_key' }
            );

          if (sessionError) console.error('Supabase session error:', sessionError);

          // 2. Insert messages (User + Assistant)
          const lastUserMsg = messages[messages.length - 1];
          const { error: msgError } = await supabaseAdmin
            .from('hub_messages')
            .insert([
              {
                session_key: sessionKey,
                role: 'user',
                content: lastUserMsg.text || lastUserMsg.content,
              },
              {
                session_key: sessionKey,
                role: 'assistant',
                content: assistantMessage,
              },
            ]);

          if (msgError) console.error('Supabase message error:', msgError);
        } catch (err) {
          console.error('Supabase persistence failed:', err);
        }
      })();
    }

    return Response.json(data);
  } catch (error) {
    console.error("Chat proxy error:", error);
    return Response.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
