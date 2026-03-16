import "server-only";

import { draftMode } from "next/headers";
import type { QueryParams } from "@sanity/client";
import { sanityClient, sanityPreviewClient } from "./client";

interface SanityFetchOptions {
  query: string;
  params?: QueryParams;
  tags?: string[];
}

export async function sanityFetch<T>({
  query,
  params = {},
  tags = ["sanity"],
}: SanityFetchOptions): Promise<T> {
  let isDraftModeEnabled = false;

  try {
    const draft = await draftMode();
    isDraftModeEnabled = draft.isEnabled;
  } catch {
    isDraftModeEnabled = false;
  }

  const client = isDraftModeEnabled ? sanityPreviewClient : sanityClient;
  const perspective = isDraftModeEnabled ? "drafts" : "published";

  if (isDraftModeEnabled) {
    return client.fetch<T>(query, params, {
      perspective,
      stega: true,
      cache: "no-store",
    });
  }

  return client.fetch<T>(query, params, {
    perspective,
    stega: false,
    next: {
      tags,
      revalidate: 300,
    },
  });
}
