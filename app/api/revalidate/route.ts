import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { sanityRevalidateSecret } from "@/lib/sanity/env";

interface SanitySlugField {
  current?: string;
}

interface SanityWebhookBody {
  _id?: string;
  _type?: string;
  slug?: SanitySlugField;
}

function readSlug(slugField: SanitySlugField | undefined): string | undefined {
  const slug = slugField?.current;
  if (typeof slug !== "string") {
    return undefined;
  }

  const trimmedSlug = slug.trim();
  return trimmedSlug.length > 0 ? trimmedSlug : undefined;
}

function revalidateForType(documentType: string, slug?: string): void {
  revalidateTag("sanity", "max");

  switch (documentType) {
    case "homePage": {
      revalidateTag("home", "max");
      revalidatePath("/");
      return;
    }
    case "aboutPage": {
      revalidateTag("about", "max");
      revalidatePath("/about-us");
      return;
    }
    case "teamMember": {
      revalidateTag("team", "max");
      revalidateTag("about", "max");
      revalidatePath("/about-us");
      return;
    }
    case "product":
    case "productCategory": {
      revalidateTag("products", "max");
      revalidateTag("product-categories", "max");
      revalidatePath("/products");
      if (slug && documentType === "product") {
        revalidatePath(`/products/${slug}`);
      }
      return;
    }
    case "blogPost":
    case "blogCategory": {
      revalidateTag("blog", "max");
      revalidatePath("/blog");
      if (slug && documentType === "blogPost") {
        revalidatePath(`/blog/${slug}`);
      }
      return;
    }
    case "clientStory":
    case "clientStoriesHub": {
      revalidateTag("client-stories", "max");
      revalidatePath("/client-stories");
      if (slug && documentType === "clientStory") {
        revalidatePath(`/client-stories/${slug}`);
      }
      return;
    }
    default: {
      return;
    }
  }
}

export async function POST(request: NextRequest) {
  if (!sanityRevalidateSecret || sanityRevalidateSecret.startsWith("YOUR_")) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "Missing SANITY_REVALIDATE_SECRET. Add it to .env.local and Vercel project env vars.",
      },
      { status: 500 }
    );
  }

  const { body, isValidSignature } = await parseBody<SanityWebhookBody>(
    request,
    sanityRevalidateSecret,
    true
  );

  if (!isValidSignature || !body?._type) {
    return NextResponse.json(
      { ok: false, message: "Invalid webhook signature or payload." },
      { status: 401 }
    );
  }

  const slug = readSlug(body.slug);
  revalidateForType(body._type, slug);

  return NextResponse.json({
    ok: true,
    revalidated: true,
    type: body._type,
    slug: slug ?? null,
  });
}
