import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { sanityClient } from "@/lib/sanity/client";
import { sanityReadToken } from "@/lib/sanity/env";

const hasValidReadToken =
  Boolean(sanityReadToken) && !sanityReadToken.startsWith("YOUR_");

const previewClient = sanityClient.withConfig({
  token: hasValidReadToken ? sanityReadToken : undefined,
});

const { GET: enableDraftMode } = defineEnableDraftMode({
  client: previewClient,
});

export async function GET(request: Request) {
  if (!hasValidReadToken) {
    return new Response(
      "Missing SANITY_API_READ_TOKEN. Add a valid read token to enable visual preview mode.",
      { status: 500 }
    );
  }

  return enableDraftMode(request);
}
