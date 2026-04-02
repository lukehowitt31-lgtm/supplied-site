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

    const readToken = process.env.SANITY_API_READ_TOKEN;
    if (readToken) {
      const authClient = createClient({
        projectId,
        dataset,
        apiVersion,
        useCdn: false,
        token: readToken,
      });

      const totalWithAuth = await authClient.fetch<number>(`count(*[!(_type match "sanity.*")])`);
      results.totalDocsWithAuth = totalWithAuth;

      const allTypesWithAuth = await authClient.fetch(
        `array::unique(*[!(_type match "sanity.*")]._type)`
      );
      results.docTypesWithAuth = allTypesWithAuth;

      const draftCount = await authClient.fetch<number>(
        `count(*[_id in path("drafts.**") && !(_type match "sanity.*")])`
      );
      results.draftCount = draftCount;

      const blogWithAuth = await authClient.fetch<number>(`count(*[_type == "blogPost"])`);
      results.blogPostCountWithAuth = blogWithAuth;

      const productsWithAuth = await authClient.fetch<number>(`count(*[_type == "product"])`);
      results.productCountWithAuth = productsWithAuth;
    } else {
      results.authNote = "No SANITY_API_READ_TOKEN set - cannot check drafts";
    }

    results.status = "OK";
  } catch (err) {
    results.status = "ERROR";
    results.error = String(err);
  }

  return NextResponse.json(results);
}
