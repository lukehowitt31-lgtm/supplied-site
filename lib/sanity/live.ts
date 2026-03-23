import { defineLive } from "next-sanity/live";
import { createClient } from "next-sanity";
import {
  sanityProjectId,
  sanityDataset,
  sanityApiVersion,
  sanityReadToken,
} from "./env";

const client = createClient({
  projectId: sanityProjectId,
  dataset: sanityDataset,
  apiVersion: sanityApiVersion,
  useCdn: true,
  stega: { studioUrl: "/studio" },
});

export const { sanityFetch: liveSanityFetch, SanityLive } = defineLive({
  client,
  serverToken: sanityReadToken || undefined,
  browserToken: sanityReadToken || undefined,
});
