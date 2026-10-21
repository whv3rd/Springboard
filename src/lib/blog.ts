import { getCollection } from 'astro:content';

const DATE_FORMAT = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  // Frontmatter dates are date-only; UTC keeps them from shifting a day.
  timeZone: 'UTC',
});

export function formatDate(date: Date): string {
  return DATE_FORMAT.format(date);
}

/** Published posts, newest first. Drafts never get a route. */
export async function getPublishedPosts() {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
