import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { getSanityClient, isSanityConfigured } from "@/lib/sanity/client";
import { sanityReadToken } from "@/lib/sanity/env";

const hasValidReadToken =
  Boolean(sanityReadToken) && !sanityReadToken.startsWith("YOUR_");

export async function GET(request: Request) {
  if (!isSanityConfigured()) {
    return new Response(
      "Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Add your Sanity project env vars in Vercel and .env.local.",
      { status: 500 }
    );
  }

  if (!hasValidReadToken) {
    return new Response(
      "Missing SANITY_API_READ_TOKEN. Add a valid read token to enable visual preview mode.",
      { status: 500 }
    );
  }

  const previewClient = getSanityClient(true).withConfig({
    token: sanityReadToken,
  });

  const { GET: enableDraftMode } = defineEnableDraftMode({
    client: previewClient,
  });

  return enableDraftMode(request);
}
