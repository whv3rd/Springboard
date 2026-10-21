import { getCollection, type CollectionEntry } from 'astro:content';

import type { Part, Track } from './path';

export type PathEntry = CollectionEntry<'path'>;

/** Path entries for one track, keyed by part. Missing parts haven't been written yet. */
export async function getTrackEntries(track: Track): Promise<Partial<Record<Part, PathEntry>>> {
  const entries = await getCollection('path', ({ data }) => data.track === track);
  return Object.fromEntries(entries.map((entry) => [entry.data.part, entry]));
}
