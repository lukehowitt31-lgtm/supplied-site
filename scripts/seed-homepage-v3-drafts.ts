import { createRequire } from "node:module";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "next-sanity";

// Allow importing modules that use `import "server-only"` outside Next.js.
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
  return mod as T;
}

async function writeDraft(
  client: ReturnType<typeof createClient>,
  options: {
    publishedId: string;
    type: string;
    fields: LooseRecord;
    overwrite: boolean;
    dryRun: boolean;
  }
): Promise<void> {
  const { publishedId, type, fields, overwrite, dryRun } = options;
  const draftId = `drafts.${publishedId}`;

  if (dryRun) {
    console.log(`[dry-run] would ${overwrite ? "overwrite" : "set-if-missing"} draft ${draftId}`);
    return;
  }

  await client.createIfNotExists({ _id: draftId, _type: type });

  const patch = client.patch(draftId);
  if (overwrite) {
    patch.set(fields);
  } else {
    patch.setIfMissing(fields);
  }
  await patch.commit({ autoGenerateArrayKeys: true });
  console.log(`  ok ${draftId} (${overwrite ? "overwritten" : "set-if-missing"})`);
}

async function main(): Promise<void> {
  const cwd = process.cwd();
  loadEnvFile(path.join(cwd, ".env.local"));

  const projectId = requiredEnv("NEXT_PUBLIC_SANITY_PROJECT_ID");
  const dataset = requiredEnv("NEXT_PUBLIC_SANITY_DATASET");
  const apiVersion = requiredEnv("NEXT_PUBLIC_SANITY_API_VERSION");
  const writeToken = requiredEnv("SANITY_API_WRITE_TOKEN");
  const overwrite = process.argv.includes("--overwrite");
  const dryRun = process.argv.includes("--dry-run");

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token: writeToken,
  });

  const homeModule = moduleExports<{
    fallbackHomePageContent: typeof import("../lib/content/home")["fallbackHomePageContent"];
  }>(await import("../lib/content/home"));
  const { fallbackHomePageContent } = homeModule;

  const costAuditModule = moduleExports<{
    fallbackCostAuditPageContent: typeof import("../lib/content/costAudit")["fallbackCostAuditPageContent"];
  }>(await import("../lib/content/costAudit"));
  const { fallbackCostAuditPageContent } = costAuditModule;

  console.log(
    [
      `Target: Sanity project ${projectId}`,
      `Dataset: ${dataset}`,
      `Mode: DRAFTS ONLY (writes to drafts.<id>, published docs untouched)`,
      overwrite ? "Overwrite: enabled (drafts will be fully replaced)" : "Overwrite: disabled (set-if-missing on drafts)",
      dryRun ? "Dry run: enabled" : "Dry run: disabled",
    ].join("\n")
  );

  // Homepage draft
  console.log("\nSeeding drafts.homePage ...");
  await writeDraft(client, {
    publishedId: "homePage",
    type: "homePage",
    overwrite,
    dryRun,
    fields: {
      internalTitle: "Home Page",
      hero: {
        headline: fallbackHomePageContent.hero.headline,
        subheadline: fallbackHomePageContent.hero.subheadline,
        tagline: fallbackHomePageContent.hero.tagline,
        primaryCta: fallbackHomePageContent.hero.primaryCta,
        secondaryCta: fallbackHomePageContent.hero.secondaryCta,
        stats: fallbackHomePageContent.hero.stats.map((item) => ({
          _type: "statItem",
          val: item.value,
          lbl: item.label,
        })),
        prooflineTitle: fallbackHomePageContent.hero.prooflineTitle,
        prooflineSubtitle: fallbackHomePageContent.hero.prooflineSubtitle,
        hotspots: fallbackHomePageContent.hero.hotspots,
      },
      trustedBrands: {
        heading: fallbackHomePageContent.trustedBrands.heading,
        brands: [],
      },
      problemBottleneck: {
        heading: fallbackHomePageContent.problemBottleneck.heading,
        intro: fallbackHomePageContent.problemBottleneck.intro,
        items: fallbackHomePageContent.problemBottleneck.items,
        cards: fallbackHomePageContent.problemBottleneck.cards,
      },
      solution: {
        heading: fallbackHomePageContent.solution.heading,
        body: fallbackHomePageContent.solution.body,
        pullLine: fallbackHomePageContent.solution.pullLine,
        ctaLabel: fallbackHomePageContent.solution.ctaLabel,
        ctaHref: fallbackHomePageContent.solution.ctaHref,
        steps: fallbackHomePageContent.solution.steps,
        stepDescriptions: fallbackHomePageContent.solution.stepDescriptions,
      },
      threePillars: fallbackHomePageContent.threePillars,
      servicesTeaser: fallbackHomePageContent.servicesTeaser,
      clientStoriesTeaser: fallbackHomePageContent.clientStoriesTeaser,
      productsTeaser: fallbackHomePageContent.productsTeaser,
      howWerePaid: fallbackHomePageContent.howWerePaid,
      costAuditHook: (() => {
        // Strip local-path `image` from seed payload; Sanity's imageWithAlt
        // expects an uploaded asset reference. Editors upload via Studio.
        const { image: _omitImage, ...rest } = fallbackHomePageContent.costAuditHook;
        return rest;
      })(),
      whoWeWorkWith: fallbackHomePageContent.whoWeWorkWith,
      sustainability: fallbackHomePageContent.sustainability,
      process: {
        heading: fallbackHomePageContent.process.heading,
        body: fallbackHomePageContent.process.body,
        steps: fallbackHomePageContent.process.steps,
        stepDescriptions: fallbackHomePageContent.process.stepDescriptions,
      },
      finalCta: fallbackHomePageContent.finalCta,
    },
  });

  // Cost Audit Page draft
  console.log("\nSeeding drafts.costAuditPage ...");
  await writeDraft(client, {
    publishedId: "costAuditPage",
    type: "costAuditPage",
    overwrite,
    dryRun,
    fields: {
      internalTitle: "Packaging Cost Audit Page",
      hero: fallbackCostAuditPageContent.hero,
      whatYouGet: fallbackCostAuditPageContent.whatYouGet,
      whatWeNeed: fallbackCostAuditPageContent.whatWeNeed,
      howItWorks: fallbackCostAuditPageContent.howItWorks,
      faq: fallbackCostAuditPageContent.faq,
      socialProof: fallbackCostAuditPageContent.socialProof,
      requestForm: fallbackCostAuditPageContent.requestForm,
      footerCta: fallbackCostAuditPageContent.footerCta,
      seo: fallbackCostAuditPageContent.seo,
    },
  });

  console.log(
    dryRun
      ? "\nDry run complete. No writes were made."
      : "\nDone. Published documents are unchanged. Open Sanity Studio, review the drafts, and publish when ready."
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
