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

type LooseRecord = Record<string, unknown>;

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

function moduleExports<T>(mod: unknown): T {
  if (mod && typeof mod === "object" && "default" in mod) {
    const cjsDefault = (mod as { default?: unknown }).default;
    if (cjsDefault && typeof cjsDefault === "object") {
      return cjsDefault as T;
    }
  }
  return mod as T;
}

function stripImages<
  T extends {
    hero: LooseRecord;
    outcome: LooseRecord;
    socialProof: { stories: LooseRecord[]; [key: string]: unknown };
  },
>(page: T) {
  const { image: _heroImg, ...heroRest } = page.hero;
  const { image: _outcomeImg, ...outcomeRest } = page.outcome;
  return {
    ...page,
    hero: heroRest,
    outcome: outcomeRest,
    socialProof: {
      ...page.socialProof,
      stories: page.socialProof.stories.map((story) => {
        const { image: _storyImg, ...rest } = story;
        return rest;
      }),
    },
  };
}

async function main(): Promise<void> {
  loadEnvFile(path.join(process.cwd(), ".env.local"));

  const overwrite = process.argv.includes("--overwrite");
  const client = createClient({
    projectId: requiredEnv("NEXT_PUBLIC_SANITY_PROJECT_ID"),
    dataset: requiredEnv("NEXT_PUBLIC_SANITY_DATASET"),
    apiVersion: requiredEnv("NEXT_PUBLIC_SANITY_API_VERSION"),
    useCdn: false,
    token: requiredEnv("SANITY_API_WRITE_TOKEN"),
  });

  const { fallbackPackagingReviewPageContent } = moduleExports<{
    fallbackPackagingReviewPageContent: {
      hero: LooseRecord;
      problem: LooseRecord;
      outcome: LooseRecord;
      howItWorks: LooseRecord;
      difference: LooseRecord;
      socialProof: { stories: LooseRecord[]; [key: string]: unknown };
      riskReversal: LooseRecord;
      requestForm: LooseRecord;
      seo: LooseRecord;
    };
  }>(await import("../lib/content/packagingReview"));

  const page = stripImages(fallbackPackagingReviewPageContent);
  const id = "packagingReviewPage";
  const fields: LooseRecord = {
    internalTitle: "Packaging Review Page",
    hero: page.hero,
    problem: page.problem,
    outcome: page.outcome,
    howItWorks: page.howItWorks,
    difference: page.difference,
    socialProof: page.socialProof,
    riskReversal: page.riskReversal,
    requestForm: page.requestForm,
    seo: page.seo,
  };

  await client.createIfNotExists({ _id: id, _type: "packagingReviewPage" });
  const patch = client.patch(id);
  if (overwrite) {
    patch.set(fields);
  } else {
    patch.setIfMissing(fields);
  }
  await patch.commit({ autoGenerateArrayKeys: true });
  console.log(
    `Wrote ${id} (${overwrite ? "overwritten" : "set-if-missing"}). Open Studio → Pages → Packaging Review Page.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
