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
    hero{
      headline,
      subheadline
    },
    shortVersion{
      tag,
      heading,
      body
    },
    stats[]{
      "value": val,
      "label": lbl
    },
    team{
      tag,
      heading
    },
    howWeWork{
      tag,
      values[]{
        num,
        title,
        body
      }
    },
    whatWeCover{
      tag,
      heading,
      capabilities,
      image{
        asset->{_id, url},
        crop,
        hotspot
      }
    },
    pullQuote{
      text,
      author,
      role
    },
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
      },
      secondaryCta{
        label,
        href
      }
    }
  }
`;

export const productsIndexPageQuery = groq`
  *[_type == "productsIndexPage"][0]{
    hero{
      tag,
      headline,
      subheadline
    },
    cta{
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
    title,
    slug,
    excerpt,
    image,
    publishedDate,
    featured,
    seo,
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

export const partnershipsPageQuery = groq`
  *[_type == "partnershipsPage"][0]{
    hero{
      tag,
      headline,
      subheadline,
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
      }
    },
    howItWorks{
      tag,
      heading,
      steps[]{
        step,
        title,
        desc
      }
    },
    benefits{
      tag,
      heading,
      cards[]{
        title,
        text
      }
    },
    partnersSection{
      tag,
      heading,
      subheading,
      partners[]{
        id,
        name,
        logo,
        category,
        website,
        image,
        description,
        highlights
      }
    },
    ctaSection{
      heading,
      body,
      checklist,
      formHeading
    },
    faqsSection{
      tag,
      heading,
      faqs[]{
        question,
        answer
      }
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
    bodyImage1,
    bodyImage2,
    bodyImage3,
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

export const contactPageQuery = groq`
  *[_type == "contactPage"][0]{
    hero{
      tag,
      headline,
      subheadline
    },
    form{
      subjects
    },
    sidebar{
      heading,
      email,
      phone,
      phoneDisplay,
      officeLocation,
      responseTime,
      responseTimeDetail,
      quickLinks[]{
        label,
        href
      }
    }
  }
`;
