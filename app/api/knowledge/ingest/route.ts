import { supabaseAdmin } from "@/lib/supabaseAdmin";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ADMIN_TOKEN = process.env.KNOWLEDGE_ADMIN_TOKEN;

function unauthorized() {
  return Response.json({ error: "Unauthorized" }, { status: 401 });
}

function validateToken(token: unknown): boolean {
  if (!ADMIN_TOKEN) return false;
  if (typeof token !== "string") return false;
  return token === ADMIN_TOKEN;
}

async function generateEmbedding(text: string): Promise<number[]> {
  if (!OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY not configured");
  }

  const response = await fetch("https://api.openai.com/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "text-embedding-3-small",
      input: text,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

// GET — list all Q&A entries (no embeddings returned)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!validateToken(token)) return unauthorized();
  if (!supabaseAdmin) {
    return Response.json(
      { error: "Supabase not configured" },
      { status: 500 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from("knowledge_hub")
    .select("id, question, answer, category, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ entries: data ?? [] });
}

interface QnAInput {
  question: unknown;
  answer: unknown;
  category?: unknown;
}

function validateQnA(item: QnAInput): { question: string; answer: string; category: string | null } | null {
  if (!item.question || typeof item.question !== "string") return null;
  if (!item.answer || typeof item.answer !== "string") return null;
  const q = (item.question as string).trim();
  const a = (item.answer as string).trim();
  if (!q || !a) return null;
  return {
    question: q,
    answer: a,
    category: typeof item.category === "string" ? item.category.trim() : null,
  };
}

// POST — add one or many Q&A entries
// Single: { question, answer, category, token }
// Batch:  { items: [{ question, answer, category }, ...], token }
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!validateToken(token)) return unauthorized();
    if (!supabaseAdmin) {
      return Response.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    // Batch mode
    if (Array.isArray(body.items)) {
      const items: QnAInput[] = body.items;
      if (items.length === 0) {
        return Response.json({ error: "items array is empty" }, { status: 400 });
      }
      if (items.length > 200) {
        return Response.json(
          { error: "Maximum 200 items per batch" },
          { status: 400 }
        );
      }

      const results: { index: number; success: boolean; id?: number; error?: string }[] = [];

      for (let i = 0; i < items.length; i++) {
        const validated = validateQnA(items[i]);
        if (!validated) {
          results.push({ index: i, success: false, error: "Invalid question or answer" });
          continue;
        }

        try {
          const textToEmbed = `${validated.question} ${validated.answer}`;
          const embedding = await generateEmbedding(textToEmbed);

          const { data, error } = await supabaseAdmin
            .from("knowledge_hub")
            .insert({
              question: validated.question,
              answer: validated.answer,
              category: validated.category,
              embedding,
            })
            .select("id")
            .single();

          if (error) {
            results.push({ index: i, success: false, error: error.message });
          } else {
            results.push({ index: i, success: true, id: data?.id });
          }
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          results.push({ index: i, success: false, error: msg });
        }

        // Rate limiting between embeddings
        if (i < items.length - 1) {
          await new Promise((r) => setTimeout(r, 80));
        }
      }

      const successCount = results.filter((r) => r.success).length;
      const errorCount = results.filter((r) => !r.success).length;

      return Response.json(
        { success: successCount, errors: errorCount, results },
        { status: 201 }
      );
    }

    // Single mode
    const validated = validateQnA(body);
    if (!validated) {
      return Response.json(
        { error: "question and answer are required" },
        { status: 400 }
      );
    }

    const textToEmbed = `${validated.question} ${validated.answer}`;
    const embedding = await generateEmbedding(textToEmbed);

    const { data, error } = await supabaseAdmin
      .from("knowledge_hub")
      .insert({
        question: validated.question,
        answer: validated.answer,
        category: validated.category,
        embedding,
      })
      .select("id, question, answer, category, created_at")
      .single();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ entry: data }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ error: message }, { status: 500 });
  }
}

// PATCH — update an existing Q&A entry (re-embeds automatically)
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, question, answer, category, token } = body;

    if (!validateToken(token)) return unauthorized();
    if (!supabaseAdmin) {
      return Response.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    if (!id || typeof id !== "number") {
      return Response.json(
        { error: "id (number) is required" },
        { status: 400 }
      );
    }

    const validated = validateQnA({ question, answer, category });
    if (!validated) {
      return Response.json(
        { error: "question and answer are required" },
        { status: 400 }
      );
    }

    const textToEmbed = `${validated.question} ${validated.answer}`;
    const embedding = await generateEmbedding(textToEmbed);

    const { data, error } = await supabaseAdmin
      .from("knowledge_hub")
      .update({
        question: validated.question,
        answer: validated.answer,
        category: validated.category,
        embedding,
      })
      .eq("id", id)
      .select("id, question, answer, category, created_at")
      .single();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ entry: data });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ error: message }, { status: 500 });
  }
}

// DELETE — remove a Q&A entry by id
export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const { id, token } = body;

    if (!validateToken(token)) return unauthorized();
    if (!supabaseAdmin) {
      return Response.json(
        { error: "Supabase not configured" },
        { status: 500 }
      );
    }

    if (!id || typeof id !== "number") {
      return Response.json(
        { error: "id (number) is required" },
        { status: 400 }
      );
    }

    const { error } = await supabaseAdmin
      .from("knowledge_hub")
      .delete()
      .eq("id", id);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return Response.json({ error: message }, { status: 500 });
  }
}
