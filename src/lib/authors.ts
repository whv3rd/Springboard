import { getEntry, type CollectionEntry, type ReferenceDataEntry } from 'astro:content';

import { absoluteUrl, type AuthorInfo } from './schema';

/** Root-relative URL of an author's page. */
export function authorPath(id: string): string {
  return `/authors/${id}`;
}

/** Loads the author a post references. Fails the build if the author file is missing. */
export async function getPostAuthor(
  ref: ReferenceDataEntry<'authors'>,
): Promise<CollectionEntry<'authors'>> {
  const author = await getEntry(ref);
  if (!author) throw new Error(`Unknown author "${ref.id}". Add src/content/authors/${ref.id}.md.`);
  return author;
}

/** The plain author details the JSON-LD helpers need, with absolute URLs. */
export function authorInfo(
  author: CollectionEntry<'authors'>,
  site: URL | undefined,
  base: string,
): AuthorInfo {
  if (!site) throw new Error('Set `site` in astro.config.mjs (or pass --site) for absolute URLs.');
  const { name, role, bio, image, links } = author.data;
  return {
    url: absoluteUrl(authorPath(author.id), site, base),
    name,
    role,
    bio,
    image: image ? absoluteUrl(image, site, base) : undefined,
    sameAs: links.map((link) => link.url),
  };
}
