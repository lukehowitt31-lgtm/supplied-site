import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.suppliedpackaging.com";

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
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
