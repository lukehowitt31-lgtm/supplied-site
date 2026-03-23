import "server-only";

import type { QueryParams } from "@sanity/client";
import { liveSanityFetch } from "./live";

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
  const { data } = await liveSanityFetch({
    query,
    params,
    tags,
  });

  return data as T;
}
