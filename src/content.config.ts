import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

import { ACCESS, PARTS, PILLARS, TRACKS } from './lib/path';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    pillar: z.enum(PILLARS),
    draft: z.boolean().default(false),
    // Defaults to Will. Set `author: <slug>` for anyone else in src/content/authors/.
    author: reference('authors').default({ collection: 'authors', id: 'will-vinton' }),
    // Shown as a "Key takeaways" box under the title. Lead with the answer.
    takeaways: z.array(z.string()).optional(),
    // Shown as an FAQ section after the post and marked up as FAQPage schema.
    faq: z.array(z.object({ question: z.string(), answer: z.string() })).optional(),
  }),
});

// One file per author: src/content/authors/<slug>.md. The body is the long bio.
const authors = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    // One or two sentences, used in the post byline card and in schema.
    bio: z.string(),
    // Path under public/, e.g. /authors/will-vinton.jpg.
    image: z.string().optional(),
    // Profiles that identify the same person (schema.org sameAs).
    links: z.array(z.object({ label: z.string(), url: z.url() })).default([]),
  }),
});

// One file per track part: src/content/path/<track>/<part>.md
const path = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/path' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    track: z.enum(TRACKS),
    part: z.enum(PARTS),
    order: z.number().int().min(0),
    access: z.enum(ACCESS),
    // Shown above the paywall on paid parts.
    teaser: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { blog, authors, path, pages };
