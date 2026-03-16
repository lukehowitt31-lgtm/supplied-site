import "server-only";

import { createClient } from "next-sanity";
import {
  assertSanityProjectConfig,
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
  sanityReadToken,
} from "./env";

assertSanityProjectConfig();

const studioUrl = "/studio";

export const sanityClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  useCdn: true,
  stega: {
    studioUrl,
  },
});

export const sanityPreviewClient = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  useCdn: false,
  token: sanityReadToken || undefined,
  stega: {
    studioUrl,
  },
});

export function getSanityClient(preview = false) {
  if (preview) {
    return sanityPreviewClient;
  }
  return sanityClient;
}
