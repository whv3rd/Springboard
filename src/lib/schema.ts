// schema.org JSON-LD for search engines and AI answer engines.
// Pure functions (no astro: imports) so they can be unit-tested with `npm test`.

export type JsonLd = Record<string, unknown>;

export interface FaqItem {
  question: string;
  answer: string;
}

export interface AuthorInfo {
  /** Absolute URL of the author page. */
  url: string;
  name: string;
  role: string;
  bio: string;
  /** Absolute URL of the author photo. */
  image?: string;
  sameAs?: string[];
}

export interface PostInfo {
  /** Absolute URL of the post. */
  url: string;
  title: string;
  description: string;
  date: Date;
  updated?: Date;
  section?: string;
  author: AuthorInfo;
  /** Absolute URL of the site home, used for the publisher. */
  siteUrl: string;
}

export interface Crumb {
  name: string;
  /** Absolute URL. */
  url: string;
}

/**
 * Absolute URL for a root-relative path, respecting the site's base path.
 * absoluteUrl('/blog', 'https://willvinton.com', '/springspot') → https://willvinton.com/springspot/blog
 */
export function absoluteUrl(path: string, site: URL | string, base = '/'): string {
  const prefix = base.replace(/\/+$/, '');
  const rest = path.startsWith('/') ? path : `/${path}`;
  return new URL(`${prefix}${rest}`, site).href;
}

/** Stable @id for the author, so every page refers to the same Person. */
export function personId(author: Pick<AuthorInfo, 'url'>): string {
  return `${author.url}#person`;
}

export function personSchema(author: AuthorInfo): JsonLd {
  return {
    '@type': 'Person',
    '@id': personId(author),
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    url: author.url,
    ...(author.image && { image: author.image }),
    ...(author.sameAs?.length && { sameAs: author.sameAs }),
  };
}

export function blogPostingSchema(post: PostInfo): JsonLd {
  return {
    '@type': 'BlogPosting',
    '@id': `${post.url}#article`,
    headline: post.title,
    description: post.description,
    url: post.url,
    mainEntityOfPage: post.url,
    datePublished: post.date.toISOString(),
    dateModified: (post.updated ?? post.date).toISOString(),
    inLanguage: 'en-US',
    ...(post.section && { articleSection: post.section }),
    author: {
      '@id': personId(post.author),
      '@type': 'Person',
      name: post.author.name,
      url: post.author.url,
    },
    publisher: { '@type': 'Organization', name: 'Springspot AI', url: post.siteUrl },
    ...(post.author.image && { image: post.author.image }),
  };
}

export function faqSchema(faq: FaqItem[], pageUrl: string): JsonLd {
  return {
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function breadcrumbSchema(crumbs: Crumb[]): JsonLd {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

export function profilePageSchema(author: AuthorInfo): JsonLd {
  return {
    '@type': 'ProfilePage',
    '@id': `${author.url}#page`,
    url: author.url,
    mainEntity: personSchema(author),
  };
}

/** Wraps nodes in one @graph document. */
export function graph(nodes: JsonLd[]): JsonLd {
  return { '@context': 'https://schema.org', '@graph': nodes };
}

/** JSON for a <script type="application/ld+json">, safe against a closing </script>. */
export function serializeJsonLd(data: JsonLd): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
