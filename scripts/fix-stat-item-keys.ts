/**
 * Migrate any statItem arrays in drafts.homePage whose items use the wrong
 * field names (value/label instead of the schema's val/lbl). Preserves _key
 * and content; only renames the keys so Sanity Studio recognises them.
 *
 * Safe to re-run; no-op once items are clean.
 *
 *   node --import tsx ./scripts/fix-stat-item-keys.ts --dry-run
 *   node --import tsx ./scripts/fix-stat-item-keys.ts
 */

import { createRequire } from "node:module";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient, type SanityClient } from "next-sanity";

const require = createRequire(import.meta.url);
require.cache[require.resolve("server-only")] = {
  id: "server-only",
  filename: "",
  loaded: true,
  exports: {},
} as NodeModule;

interface RawStatItem {
  _key?: string;
  _type?: string;
  val?: string | null;
  lbl?: string | null;
  value?: string | null;
  label?: string | null;
  [k: string]: unknown;
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

function needsMigration(item: RawStatItem): boolean {
  const hasOld = item.value !== undefined || item.label !== undefined;
  const valEmpty = item.val == null || item.val === "";
  const lblEmpty = item.lbl == null || item.lbl === "";
  return hasOld && (valEmpty || lblEmpty);
}

function fixItem(item: RawStatItem): RawStatItem {
  const next: RawStatItem = { ...item };
  if ((next.val == null || next.val === "") && next.value != null) {
    next.val = String(next.value);
  }
  if ((next.lbl == null || next.lbl === "") && next.label != null) {
    next.lbl = String(next.label);
  }
  delete next.value;
  delete next.label;
  if (!next._type) next._type = "statItem";
  return next;
}

async function migrateArrayAtPath(
  client: SanityClient,
  opts: {
    docId: string;
    label: string;
    arrayPath: "hero.stats" | "servicesTeaser.stats";
    items: RawStatItem[];
    dryRun: boolean;
  }
): Promise<{ changed: number; clean: number }> {
  const { docId, label, arrayPath, items, dryRun } = opts;

  let changed = 0;
  let clean = 0;
  const next = items.map((item) => {
    if (!needsMigration(item)) {
      clean += 1;
      return item;
    }
    changed += 1;
    const fixed = fixItem(item);
    console.log(
      `    item _key=${item._key ?? "(none)"}: ` +
        `value="${item.value ?? ""}" label="${item.label ?? ""}"  →  ` +
        `val="${fixed.val ?? ""}" lbl="${fixed.lbl ?? ""}"`
    );
    return fixed;
  });

  console.log(
    `  ${docId} ${label}: ${changed} item(s) need migration, ${clean} already clean`
  );

  if (changed === 0) return { changed, clean };

  if (dryRun) {
    console.log(`    [dry-run] would replace ${arrayPath} with the migrated array`);
    return { changed, clean };
  }

  await client.patch(docId).set({ [arrayPath]: next }).commit();
  console.log(`    ✓ patched ${arrayPath}`);
  return { changed, clean };
}

async function main(): Promise<void> {
  loadEnvFile(path.join(process.cwd(), ".env.local"));
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

  console.log(
    [
      `Target: ${projectId} / ${dataset}`,
      `Dry run: ${dryRun ? "enabled" : "disabled"}`,
    ].join("\n")
  );

  let totalChanged = 0;
  let totalClean = 0;

  for (const docId of ["drafts.homePage", "homePage"]) {
    const doc = (await client.getDocument(docId)) as
      | (Record<string, unknown> & {
          hero?: { stats?: RawStatItem[] };
          servicesTeaser?: { stats?: RawStatItem[] };
        })
      | null;

    console.log(`\n─── ${docId} ───────────────────────`);
    if (!doc) {
      console.log("  (does not exist — skipping)");
      continue;
    }

    const heroStats = doc.hero?.stats ?? [];
    if (heroStats.length > 0) {
      const r = await migrateArrayAtPath(client, {
        docId,
        label: "hero.stats",
        arrayPath: "hero.stats",
        items: heroStats,
        dryRun,
      });
      totalChanged += r.changed;
      totalClean += r.clean;
    } else {
      console.log("  hero.stats: empty");
    }

    const svcStats = doc.servicesTeaser?.stats ?? [];
    if (svcStats.length > 0) {
      const r = await migrateArrayAtPath(client, {
        docId,
        label: "servicesTeaser.stats",
        arrayPath: "servicesTeaser.stats",
        items: svcStats,
        dryRun,
      });
      totalChanged += r.changed;
      totalClean += r.clean;
    } else {
      console.log("  servicesTeaser.stats: empty");
    }
  }

  console.log(
    [
      "",
      "─── Summary ───────────────────────",
      `  items migrated: ${totalChanged}`,
      `  items already clean: ${totalClean}`,
      dryRun ? "  (dry run — no writes)" : "  (writes applied)",
    ].join("\n")
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
