import { defineCollection } from 'astro:content';
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

export const collections = { blog, path, pages };
