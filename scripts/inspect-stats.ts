/**
 * One-shot read-only inspector: prints every statItem array on the homePage
 * (draft + published) and reports which field IDs each item uses.
 *
 *   node --import tsx ./scripts/inspect-stats.ts
 */

import { createRequire } from "node:module";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "next-sanity";

const require = createRequire(import.meta.url);
require.cache[require.resolve("server-only")] = {
  id: "server-only",
  filename: "",
  loaded: true,
  exports: {},
} as NodeModule;

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

interface StatItem {
  _key?: string;
  _type?: string;
  val?: string;
  lbl?: string;
  value?: string;
  label?: string;
  [key: string]: unknown;
}

function describeItem(item: StatItem, idx: number): string {
  const keys = Object.keys(item).filter((k) => !k.startsWith("_"));
  const display =
    item.val ?? item.value ?? "(no value)";
  const lbl = item.lbl ?? item.label ?? "(no label)";
  return `    [${idx}] keys=[${keys.join(", ")}]  → "${display}" / "${lbl}"`;
}

async function main(): Promise<void> {
  loadEnvFile(path.join(process.cwd(), ".env.local"));
  const projectId = requiredEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
  const dataset = requiredEnv("NEXT_PUBLIC_SANITY_DATASET");
  const apiVersion = requiredEnv("NEXT_PUBLIC_SANITY_API_VERSION");
  const writeToken = requiredEnv("SANITY_API_WRITE_TOKEN");

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: writeToken,
  });

  for (const id of ["homePage", "drafts.homePage"]) {
    const doc = (await client.getDocument(id)) as
      | (Record<string, unknown> & {
          hero?: { stats?: StatItem[] };
          servicesTeaser?: { stats?: StatItem[] };
        })
      | null;

    console.log(`\n─── ${id} ───────────────────────`);
    if (!doc) {
      console.log("  (does not exist)");
      continue;
    }

    const heroStats = doc.hero?.stats ?? [];
    console.log(`  hero.stats: ${heroStats.length} item(s)`);
    heroStats.forEach((item, i) => console.log(describeItem(item, i)));

    const svcStats = doc.servicesTeaser?.stats ?? [];
    console.log(`  servicesTeaser.stats: ${svcStats.length} item(s)`);
    svcStats.forEach((item, i) => console.log(describeItem(item, i)));
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
