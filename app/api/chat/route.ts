import { rateLimit, getClientIp } from "@/lib/rateLimit";
import { getKnowledgeBase } from "@/lib/content/knowledgeBase";
import { generateEmbedding } from "@/lib/knowledge/embedding";
import { topKSimilar } from "@/lib/knowledge/similarity";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const BASE_SYSTEM_PROMPT = `You are the Supplied packaging expert assistant embedded on suppliedpackaging.com/knowledge-hub. You help brands, clients, and visitors with questions about packaging — products, materials, sustainability, EU PPWR compliance, pricing, processes, and industry-specific advice.

Write in first person as Supplied (e.g. "We offer..." not "Supplied offers..."). Be concise, direct, and helpful — like a senior packaging consultant chatting to a brand founder. Keep answers to 2–4 paragraphs max.

Never make up exact pricing, MOQs, or lead times. Always describe pricing as approximate and offer to provide an exact quote. If a question is about getting a quote or starting a project, first check whether their volumes meet our minimums. If they are clearly below MOQ, be honest that we are unlikely to be the right partner and do not push them to /contact-us. If they are at or above MOQ, or it is unclear, they can go to /contact-us or hello@suppliedpackaging.com.`;

const FALLBACK_SYSTEM_PROMPT = `${BASE_SYSTEM_PROMPT}

Key facts about Supplied:
- End-to-end packaging partner for consumer brands (DTC, ecommerce, retail, hybrid)
- 30+ vetted global suppliers across 12 countries
- Products: mailer boxes, rigid boxes, shipping boxes, paper mailers, printed cans, tissue paper, paper tape, labels, cards, bags, pouches, inserts, advent calendars
- Industries: beauty & cosmetics, health & wellness, food & drink, fashion & apparel
- Key clients include TRIP, Healf, Glow For It, Wild, SURI, Polestar, Sneak Energy
- 98% on-time delivery, 23% average cost saving, 200+ projects managed
- PPWR compliant, FSC certified, 100% recyclable range
- Based in London with Polish entity in Warsaw
- MOQs: we are a production-volume partner, not a fit for sample runs or one-off low-volume orders. Mailer boxes 1,000–3,000 depending on size (larger formats from 1,000, smaller sizes from 3,000, because larger boxes use more material per unit). Rigid boxes from 500. Advent calendars from 250. Shipping boxes, paper mailers, cartonboard boxes, tubes, inserts, labels, and pouches typically from 1,000. Tissue paper from 5,000 sheets. Paper tape from 72 rolls. Printed cans have flexible volumes and no strict MOQ.
- Services: structural design, artwork & pre-press, manufacturing & sourcing, QA & compliance, logistics & freight, packaging strategy

Product details:
- Mailer boxes: E or B flute corrugated, tuck-front/crash-lock/magnetic, from 1,000–3,000 depending on size (larger formats from 1,000, smaller sizes from 3,000), full inside+outside print
- Rigid boxes: magnetic closure/lift-off lid/drawer/hinged, FSC greyboard, soft-touch/foil/emboss/spot UV, MOQ 500, 4-6 week lead
- Shipping boxes: 0201 style, from 1,000
- Paper mailers: sustainable poly mailer alternative, peel-seal, tear strip returns, fully recyclable, from 1,000
- Printed cans: digital CMYK on aluminium, no plate charges, flexible volumes / no strict MOQ, ideal for beverages
- Tissue paper: custom printed, MOQ 5,000 sheets, 4-6 week lead
- Paper tape: branded paper tape, MOQ 72 rolls
- Advent calendars: fully bespoke structures, from 250, start 4-5 months before launch
- Labels & stickers: self-adhesive, die-cut/roll/sheet, typically from 1,000
- Inserts: corrugated/foam/pulp mould, engineered to exact product dimensions, typically from 1,000

Pricing guidance (always say "approximate" and offer to provide exact quote):
- Mailer boxes: unit cost depends on size and volume; typical production runs start at 1,000 for larger formats and 3,000 for smaller sizes
- Rigid boxes: ~£3-5/unit at 500 qty
- Digital printing: no plate charges, used at production volumes rather than sample runs
- Flexo printing: stereo charges £300-450, quantities start from 2,000+, diecut tools £600-800
- Free unprinted samples, small charge for printed pre-production samples (credited against first order)
- Average 23% cost saving when consolidating through Supplied

EU PPWR knowledge:
- Mandatory recyclability thresholds, recycled content minimums, standardised labelling
- Restrictions on excessive void space
- Phased in from 2025, key milestones through 2030
- UK has separate EPR scheme with similar aims
- All Supplied packaging is designed PPWR-compliant from the outset
- PFAS-free, FSC certified options across full range`;

interface KnowledgeMatch {
  question: string;
  answer: string;
  category: string;
  similarity: number;
}

async function searchKnowledge(query: string): Promise<KnowledgeMatch[]> {
  if (!OPENAI_API_KEY) return [];

  const trimmed = query.trim();
  if (trimmed.length === 0) return [];

  let queryEmbedding: number[];
  try {
    queryEmbedding = await generateEmbedding(trimmed, OPENAI_API_KEY);
  } catch (error) {
    console.error("Failed to embed user query:", error);
    return [];
  }

  const items = await getKnowledgeBase();
  if (items.length === 0) return [];

  return topKSimilar(queryEmbedding, items, { k: 5, threshold: 0.45 }).map(
    ({ question, answer, category, similarity }) => ({
      question,
      answer,
      category,
      similarity,
    })
  );
}

function buildSystemPrompt(matches: KnowledgeMatch[]): string {
  if (matches.length === 0) return FALLBACK_SYSTEM_PROMPT;

  const context = matches
    .map((m) => `Q: ${m.question}\nA: ${m.answer}`)
    .join("\n\n");

  return `${BASE_SYSTEM_PROMPT}

Answer questions using the verified knowledge base context below. If the context doesn't contain enough information to answer fully, say so honestly and suggest the person gets in touch for a tailored answer at /contact-us or hello@suppliedpackaging.com.

VERIFIED KNOWLEDGE BASE CONTEXT:
${context}`;
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    const limiter = rateLimit(ip, { maxRequests: 20, windowMs: 60_000 });
    if (!limiter.ok) {
      return Response.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429, headers: { "Retry-After": String(limiter.retryAfter) } }
      );
    }

    if (!ANTHROPIC_API_KEY) {
      console.error("ANTHROPIC_API_KEY not set in environment variables");
      return Response.json(
        { error: "Chat service not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return Response.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    if (messages.length > 40) {
      return Response.json(
        { error: "Conversation too long. Please start a new session." },
        { status: 400 }
      );
    }

    const formattedMessages = messages
      .map((m: Record<string, unknown>) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: (
          (m.text as string) ||
          (m.content as string) ||
          ""
        ).trim(),
      }))
      .filter((m) => m.content.length > 0);

    if (formattedMessages.length === 0) {
      return Response.json(
        { error: "No valid messages to send" },
        { status: 400 }
      );
    }

    const latestUserMessage = formattedMessages
      .filter((m) => m.role === "user")
      .at(-1)?.content;

    const matches = latestUserMessage
      ? await searchKnowledge(latestUserMessage)
      : [];

    const systemPrompt = buildSystemPrompt(matches);

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 1024,
        system: systemPrompt,
        messages: formattedMessages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Anthropic API error:", response.status, errorText);
      return Response.json(
        { error: "Upstream API error", details: errorText },
        { status: 502 }
      );
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Chat proxy error:", error);
    return Response.json(
      { error: "Internal server error", details: String(error) },
      { status: 500 }
    );
  }
}
