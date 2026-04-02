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
      `*[_type == "blogPost"] | order(publishedDate desc) { title, "slug": slug.current, "hasImage": defined(image.asset), "hasCategory": defined(category), "hasDate": defined(publishedDate), "hasExcerpt": defined(excerpt) }`
    );
    results.allPosts = posts;

    const productCount = await client.fetch<number>(`count(*[_type == "product"])`);
    results.productCount = productCount;

    const homePageCount = await client.fetch<number>(`count(*[_type == "homePage"])`);
    results.homePageCount = homePageCount;

    const allTypes = await client.fetch(
      `array::unique(*[]._type)`
    );
    results.documentTypes = allTypes;

    results.status = "OK";
  } catch (err) {
    results.status = "ERROR";
    results.error = String(err);
  }

  return NextResponse.json(results);
}
