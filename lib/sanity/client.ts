import "server-only";

import type { SanityClient } from "@sanity/client";
import { createClient } from "next-sanity";
import {
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
  sanityReadToken,
} from "./env";

const studioUrl = "/backstage";

const hasSanityProjectConfig =
  Boolean(sanityProjectId) && !sanityProjectId.startsWith("YOUR_");

function createConfiguredClient(preview: boolean): SanityClient | null {
  if (!hasSanityProjectConfig) {
    return null;
  }

  return createClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
    useCdn: false,
    token: sanityReadToken || undefined,
    stega: {
      studioUrl,
    },
  });
}

export const sanityClient = createConfiguredClient(false);
export const sanityPreviewClient = createConfiguredClient(true);

export function isSanityConfigured(): boolean {
  return hasSanityProjectConfig;
}

export function getSanityClient(preview = false) {
  const client = preview ? sanityPreviewClient : sanityClient;

  if (!client) {
    throw new Error(
      "Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID in environment variables."
    );
  }

  return client;
}
