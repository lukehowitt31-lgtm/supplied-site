import { readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { createClient } from "next-sanity";

function loadEnv() {
  const content = readFileSync(path.join(process.cwd(), ".env.local"), "utf-8");
  const get = (k: string) =>
    content
      .split("\n")
      .find((l) => l.startsWith(k))
      ?.split("=")
      .slice(1)
      .join("=")
      .trim() || "";
  return {
    projectId: get("NEXT_PUBLIC_SANITY_PROJECT_ID"),
    dataset: get("NEXT_PUBLIC_SANITY_DATASET"),
    apiVersion: get("NEXT_PUBLIC_SANITY_API_VERSION"),
    token: get("SANITY_API_WRITE_TOKEN"),
  };
}

async function main() {
  const env = loadEnv();
  const client = createClient({
    projectId: env.projectId,
    dataset: env.dataset,
    apiVersion: env.apiVersion,
    token: env.token,
    useCdn: false,
    perspective: "raw",
  });

  const slugs = [
    "healf",
    "spacegoods",
    "glaize-x-aston-martin",
    "trip",
    "glow-for-it",
    "uncle-matts-hats",
  ];

  for (const slug of slugs) {
    const newId = `clientStory-${slug}`;
    const oldId = `clientStory.${slug}`;

    console.log(`\n--- ${slug} ---`);

    // Fetch the new (fully populated) document
    const newDoc = await client.getDocument(newId);
    if (!newDoc) {
      console.log(`  No new doc found (${newId}), skipping`);
      continue;
    }

    // Fetch the old document
    const oldDoc = await client.getDocument(oldId);
    if (!oldDoc) {
      console.log(`  No old doc found (${oldId}), skipping`);
      continue;
    }

    // Copy all content fields from new doc to old doc (setIfMissing)
    const fieldsToCopy: Record<string, unknown> = {};
    const fieldsToForce: Record<string, unknown> = {};

    const copyFields = [
      "heroHeadline", "heroSubheadline", "heroTags",
      "sections",
    ];
    const mergeFields = [
      "title", "clientName", "industry",
      "challenge", "solution", "result",
      "metrics", "quote", "quoteAuthor", "quoteRole",
      "ctaLabel", "ctaHref",
    ];

    // New fields that didn't exist before — force set them
    for (const key of copyFields) {
      const val = (newDoc as Record<string, unknown>)[key];
      if (val !== undefined && val !== null) {
        fieldsToForce[key] = val;
      }
    }

    // Existing fields — only fill if missing
    for (const key of mergeFields) {
      const val = (newDoc as Record<string, unknown>)[key];
      if (val !== undefined && val !== null) {
        fieldsToCopy[key] = val;
      }
    }

    // Patch old published doc
    if (Object.keys(fieldsToForce).length > 0 || Object.keys(fieldsToCopy).length > 0) {
      const patch = client.patch(oldId);
      if (Object.keys(fieldsToForce).length > 0) patch.set(fieldsToForce);
      if (Object.keys(fieldsToCopy).length > 0) patch.setIfMissing(fieldsToCopy);
      await patch.commit({ autoGenerateArrayKeys: true });
      console.log(`  ✓ Patched published: ${oldId}`);
    }

    // Ensure draft of old doc exists and patch it too
    const draftOldId = `drafts.${oldId}`;
    const existingDraft = await client.getDocument(draftOldId);
    if (!existingDraft) {
      const freshOld = await client.getDocument(oldId);
      if (freshOld) {
        const { _rev, _updatedAt, _createdAt, ...rest } = freshOld as Record<string, unknown>;
        await client.createIfNotExists({
          ...rest,
          _id: draftOldId,
        } as Parameters<typeof client.createIfNotExists>[0]);
        console.log(`  ✓ Created draft from published: ${draftOldId}`);
      }
    } else {
      const patch = client.patch(draftOldId);
      if (Object.keys(fieldsToForce).length > 0) patch.set(fieldsToForce);
      if (Object.keys(fieldsToCopy).length > 0) patch.setIfMissing(fieldsToCopy);
      await patch.commit({ autoGenerateArrayKeys: true });
      console.log(`  ✓ Patched draft: ${draftOldId}`);
    }

    // Delete the new duplicate docs
    for (const deleteId of [newId, `drafts.${newId}`]) {
      try {
        await client.delete(deleteId);
        console.log(`  ✓ Deleted duplicate: ${deleteId}`);
      } catch {
        console.log(`  - No doc to delete: ${deleteId}`);
      }
    }
  }

  // Delete orphan draft
  try {
    await client.delete("drafts.c3383407-96b4-4bd5-9d47-2d4e82cd8005");
    console.log("\n✓ Deleted orphan draft: drafts.c3383407-96b4-4bd5-9d47-2d4e82cd8005");
  } catch {
    console.log("\n- Orphan draft already gone");
  }

  // Verify final state
  console.log("\n--- Final state ---");
  const remaining = await client.fetch(
    `*[_type == "clientStory"]{ _id, title, "slug": slug.current, heroHeadline } | order(_id asc)`
  );
  for (const d of remaining) {
    console.log(`  ${d._id} | ${d.title} | slug=${d.slug} | headline=${!!d.heroHeadline}`);
  }

  console.log("\n✅ Cleanup complete.");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
