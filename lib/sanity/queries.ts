import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]
`;

export const homePageQuery = groq`
  *[_type == "homePage"][0]{
    hero{
      headline,
      subheadline,
      tagline,
      primaryCta{
        label,
        href
      },
      secondaryCta{
        label,
        href
      },
      stats[]{
        "value": val,
        "label": lbl
      },
      prooflineTitle,
      prooflineSubtitle,
      hotspots[]{
        id,
        x,
        y,
        title,
        detail,
        href
      }
    },
    trustedBrands{
      heading,
      brands
    },
    problemBottleneck{
      heading,
      intro,
      items,
      cards[]{
        title,
        desc
      }
    },
    solution{
      heading,
      body,
      steps,
      stepDescriptions
    },
    servicesTeaser{
      heading,
      body,
      heroTitle,
      heroBody,
      heroChips,
      cards[]{
        title,
        desc,
        chips
      },
      stats[]{
        "value": val,
        "label": lbl
      }
    },
    clientStoriesTeaser{
      heading,
      body,
      cta{
        label,
        href
      },
      cards[]{
        name,
        slug,
        industry,
        products,
        quote,
        person,
        stat1Value,
        stat1Label,
        stat2Value,
        stat2Label,
        challenge,
        result,
        image,
        logo
      }
    },
    productsTeaser{
      heading,
      body,
      cta{
        label,
        href
      }
    },
    sustainability{
      heading,
      body,
      checklist
    },
    process{
      heading,
      steps,
      stepDescriptions
    },
    finalCta{
      heading,
      body,
      primaryCta{
        label,
        href
      }
    }
  }
`;

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0]{
    heroHeadline,
    heroSubheadline,
    stats[]{
      "value": val,
      "label": lbl
    },
    values[]{
      num,
      title,
      body
    },
    capabilities,
    offices[]{
      label,
      name,
      address,
      desc
    },
    finalCta{
      heading,
      body,
      primaryCta{
        label,
        href
      }
    }
  }
`;

export const productsQuery = groq`
  *[_type == "product"] | order(sortOrder asc) {
    ...,
    "category": category->{
      _id,
      title,
      slug
    }
  }
`;

export const productBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    ...,
    showcaseHeading,
    featuresHeading,
    features[]{
      _key,
      title,
      body,
      image
    },
    "category": category->{
      _id,
      title,
      slug
    }
  }
`;

export const productCategoriesQuery = groq`
  *[_type == "productCategory"] | order(sortOrder asc) {
    "id": coalesce(id, slug.current),
    "label": title
  }
`;

export const blogPostsQuery = groq`
  *[_type == "blogPost"] | order(publishedDate desc) {
    ...,
    "category": category->{
      _id,
      title,
      slug
    }
  }
`;

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    ...,
    "category": category->{
      _id,
      title,
      slug
    }
  }
`;

export const knowledgeHubPageQuery = groq`
  *[_type == "knowledgeHubPage"][0]{
    heroHeadline,
    heroSubheadline,
    faqCategories[]{
      id,
      label,
      icon,
      color,
      bg,
      faqs[]{
        q,
        a
      }
    }
  }
`;

export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(sortOrder asc)
`;

export const clientStoriesQuery = groq`
  *[_type == "clientStory"] | order(sortOrder asc) {
    title,
    "slug": slug.current,
    clientName,
    industry,
    challenge,
    solution,
    result,
    quote,
    quoteAuthor,
    quoteRole,
    ctaLabel,
    ctaHref,
    heroImage,
    metrics[]{
      "value": val,
      "label": lbl
    }
  }
`;

export const clientStoryBySlugQuery = groq`
  *[_type == "clientStory" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    clientName,
    industry,
    heroImage,
    heroHeadline,
    heroSubheadline,
    heroTags,
    challenge,
    solution,
    result,
    quote,
    quoteAuthor,
    quoteRole,
    ctaLabel,
    ctaHref,
    metrics[]{
      "value": val,
      "label": lbl
    },
    sections[]{
      sectionId,
      tag,
      heading,
      headingAccent,
      body,
      items[]{
        title,
        body,
        value
      }
    }
  }
`;

export const clientStoriesHubQuery = groq`
  *[_type == "clientStoriesHub"][0]{
    heading,
    subheading,
    cta{
      label,
      href
    },
    "featuredStories": featuredStories[]->{
      title,
      "slug": slug.current,
      clientName,
      industry,
      challenge,
      solution,
      result,
      quote,
      quoteAuthor,
      quoteRole,
      ctaLabel,
      ctaHref,
      heroImage,
      metrics[]{
        "value": val,
        "label": lbl
      }
    }
  }
`;
