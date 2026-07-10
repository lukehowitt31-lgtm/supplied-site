/**
 * Fill empty / missing fields on draft Sanity docs with the in-repo fallback
 * copy, without touching anything an editor has already set.
 *
 * Strategy:
 *   • Operates ONLY on drafts (drafts.<id>). Published docs are never modified.
 *   • Uses per-field-path setIfMissing so each leaf is checked independently —
 *     if a field has any value (string, object, non-empty array), it is left
 *     untouched.
 *   • Pre-fetches the current draft state and prints a diff before writing,
 *     so a dry run shows exactly what would change.
 *
 * Usage:
 *   node --import tsx ./scripts/fill-missing-draft-fields.ts --dry-run
 *   node --import tsx ./scripts/fill-missing-draft-fields.ts            # applies
 *
 * Requires the same env vars as scripts/seed-homepage-v3-drafts.ts.
 */

import { createRequire } from "node:module";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient, type SanityClient } from "next-sanity";

// Allow importing modules that use `import "server-only"` outside Next.js.
const require = createRequire(import.meta.url);
require.cache[require.resolve("server-only")] = {
  id: "server-only",
  filename: "",
  loaded: true,
  exports: {},
} as NodeModule;

type LooseRecord = Record<string, unknown>;

interface FillTarget {
  publishedId: string;
  type: string;
  // dot-separated path → value to fill if missing
  fields: { path: string; value: unknown; description: string }[];
}

function loadEnvFile(filePath: string): void {
  if (!existsSync(filePath)) return;
  const content = readFileSync(filePath, "utf8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const idx = line.indexOf("=");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required env var: ${name}`);
    process.exit(1);
  }
  return value;
}

function getByPath(obj: unknown, dotPath: string): unknown {
  if (obj == null) return undefined;
  return dotPath.split(".").reduce<unknown>((acc, key) => {
    if (acc == null || typeof acc !== "object") return undefined;
    return (acc as LooseRecord)[key];
  }, obj);
}

function isEmpty(value: unknown): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim().length === 0;
  if (Array.isArray(value)) return value.length === 0;
  return false;
}

async function fillDraft(
  client: SanityClient,
  target: FillTarget,
  options: { dryRun: boolean }
): Promise<{ filled: number; skipped: number; created: boolean }> {
  const draftId = `drafts.${target.publishedId}`;
  const publishedId = target.publishedId;

  const [draft, published] = await Promise.all([
    client.getDocument(draftId),
    client.getDocument(publishedId),
  ]);

  console.log(`\n─── ${draftId} ───────────────────────`);
  console.log(
    `  draft:     ${draft ? "exists" : "missing"}` +
      `   published: ${published ? "exists" : "missing"}`
  );

  // Reference for "what's currently set" — prefer the draft, fall back to the
  // published doc so we don't redundantly fill fields that already live on the
  // published version (Sanity copies published → draft on first edit anyway).
  const reference = draft ?? published;

  const setOps: LooseRecord = {};
  let filled = 0;
  let skipped = 0;

  for (const field of target.fields) {
    const current = getByPath(reference, field.path);
    if (isEmpty(current)) {
      setOps[field.path] = field.value;
      console.log(`  + ${field.path.padEnd(38)} WILL FILL  — ${field.description}`);
      filled += 1;
    } else {
      const preview =
        typeof current === "string"
          ? `"${current.slice(0, 60)}${current.length > 60 ? "…" : ""}"`
          : Array.isArray(current)
            ? `[${current.length} item${current.length === 1 ? "" : "s"}]`
            : typeof current === "object"
              ? "{object}"
              : String(current);
      console.log(
        `  - ${field.path.padEnd(38)} keep       — already set ${preview}`
      );
      skipped += 1;
    }
  }

  if (filled === 0) {
    console.log(`  nothing to fill (all ${skipped} fields already populated)`);
    return { filled, skipped, created: false };
  }

  if (options.dryRun) {
    console.log(`  [dry-run] would fill ${filled} field(s) on ${draftId}`);
    return { filled, skipped, created: false };
  }

  // Make sure the draft exists. If it doesn't and a published doc does,
  // we leave the published copy alone — Sanity will treat the new draft as
  // an unpublished edit of it.
  let created = false;
  if (!draft) {
    // Seed the draft from the published doc if available, else create empty.
    // We deliberately do NOT copy the published doc's contents into the draft
    // here — Sanity's behaviour is that an empty draft + published doc means
    // the page still renders from published until the draft is published.
    // Per-field setIfMissing below will only populate the fields we listed.
    await client.createIfNotExists({
      _id: draftId,
      _type: target.type,
    });
    created = true;
  }

  await client.patch(draftId).setIfMissing(setOps).commit({
    autoGenerateArrayKeys: true,
  });
  console.log(
    `  ✓ filled ${filled} field(s)${created ? " (draft created)" : ""}`
  );

  return { filled, skipped, created };
}

async function main(): Promise<void> {
  const cwd = process.cwd();
  loadEnvFile(path.join(cwd, ".env.local"));

  const projectId = requiredEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
  const dataset = requiredEnv("NEXT_PUBLIC_SANITY_DATASET");
  const apiVersion = requiredEnv("NEXT_PUBLIC_SANITY_API_VERSION");
  const writeToken = requiredEnv("SANITY_API_WRITE_TOKEN");
  const dryRun = process.argv.includes("--dry-run");

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: writeToken,
  });

  const { fallbackHomePageContent } = await import("../lib/content/home");
  const { fallbackMerchPageContent } = await import("../lib/content/merch");

  console.log(
    [
      `Target: Sanity project ${projectId}`,
      `Dataset: ${dataset}`,
      `Mode: per-field setIfMissing on drafts only`,
      `Dry run: ${dryRun ? "enabled" : "disabled"}`,
    ].join("\n")
  );

  const targets: FillTarget[] = [
    {
      publishedId: "homePage",
      type: "homePage",
      fields: [
        // ── howWerePaid (rewritten — old paragraph1/2/3 fields removed)
        {
          path: "howWerePaid.tag",
          value: fallbackHomePageContent.howWerePaid.tag,
          description: "Eyebrow Tag",
        },
        {
          path: "howWerePaid.heading",
          value: fallbackHomePageContent.howWerePaid.heading,
          description: "Heading",
        },
        {
          path: "howWerePaid.intro",
          value: fallbackHomePageContent.howWerePaid.intro,
          description: "Intro Paragraph",
        },
        {
          path: "howWerePaid.yourWin",
          value: fallbackHomePageContent.howWerePaid.yourWin,
          description: "Your Win Card (object)",
        },
        {
          path: "howWerePaid.ourWin",
          value: fallbackHomePageContent.howWerePaid.ourWin,
          description: "Our Win Card (object)",
        },
        {
          path: "howWerePaid.mechanism",
          value: fallbackHomePageContent.howWerePaid.mechanism,
          description: "Mechanism (3 steps)",
        },
        {
          path: "howWerePaid.closingLine",
          value: fallbackHomePageContent.howWerePaid.closingLine,
          description: "Italic Closing Line",
        },
        // NOTE: costAuditHook.image is intentionally omitted. Sanity expects
        // an uploaded asset reference there, not a local file path. The image
        // needs to be uploaded manually in Studio.
      ],
    },
    {
      publishedId: "merchPage",
      type: "merchPage",
      fields: [
        {
          path: "categoriesIntro.eyebrow",
          value: fallbackMerchPageContent.categoriesIntro.eyebrow,
          description: 'Eyebrow ("What we source")',
        },
        {
          path: "categoriesIntro.heading",
          value: fallbackMerchPageContent.categoriesIntro.heading,
          description: 'Heading ("Everything Beyond the |Box")',
        },
        {
          path: "categoriesIntro.body",
          value: fallbackMerchPageContent.categoriesIntro.body,
          description: "Body paragraph",
        },
      ],
    },
  ];

  let totalFilled = 0;
  let totalSkipped = 0;
  for (const target of targets) {
    const result = await fillDraft(client, target, { dryRun });
    totalFilled += result.filled;
    totalSkipped += result.skipped;
  }

  console.log(
    [
      "",
      "─── Summary ───────────────────────",
      `  fields to fill: ${totalFilled}`,
      `  fields kept:    ${totalSkipped}`,
      dryRun
        ? "  (dry run — no writes performed)"
        : "  (drafts patched — publish in Studio when ready)",
    ].join("\n")
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
