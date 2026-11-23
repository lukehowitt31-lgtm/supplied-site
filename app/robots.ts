import type { MetadataRoute } from "next";
import { canonicalUrl } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  const disallowed = ["/admin/", "/backstage/", "/api/"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: disallowed },
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Amazonbot", allow: "/" },
      { userAgent: "Cohere-ai", allow: "/" },
    ],
    sitemap: canonicalUrl("/sitemap.xml"),
  };
}
