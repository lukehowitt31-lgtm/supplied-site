import { NextResponse } from "next/server";
import { createClient } from "next-sanity";

export async function GET() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-03-13";

  const results: Record<string, unknown> = {
    projectId: projectId ? `${projectId.slice(0, 4)}...` : "NOT SET",
    dataset,
    apiVersion,
  };

  try {
    const client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    });

    const count = await client.fetch<number>(`count(*[_type == "blogPost"])`);
    results.blogPostCount = count;

    const posts = await client.fetch(
      `*[_type == "blogPost"] | order(publishedDate desc) [0..2] { title, "hasImage": defined(image.asset) }`
    );
    results.samplePosts = posts;
    results.status = "OK";
  } catch (err) {
    results.status = "ERROR";
    results.error = String(err);
  }

  return NextResponse.json(results);
}
