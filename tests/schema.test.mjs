// JSON-LD helper tests. Run with `npm test`.

import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  absoluteUrl,
  blogPostingSchema,
  breadcrumbSchema,
  faqSchema,
  graph,
  personSchema,
  profilePageSchema,
  serializeJsonLd,
} from '../src/lib/schema.ts';

const author = {
  url: 'https://willvinton.com/springboard/authors/will-vinton',
  name: 'Will Vinton',
  role: 'Ecommerce operator',
  bio: 'Bio.',
  image: 'https://willvinton.com/springboard/authors/will-vinton.jpg',
  sameAs: ['https://www.linkedin.com/in/will-vinton'],
};

test('absoluteUrl respects the base path', () => {
  const site = 'https://willvinton.com';
  assert.equal(
    absoluteUrl('/blog', site, '/springboard'),
    'https://willvinton.com/springboard/blog',
  );
  assert.equal(
    absoluteUrl('/blog', site, '/springboard/'),
    'https://willvinton.com/springboard/blog',
  );
  assert.equal(
    absoluteUrl('blog', site, '/springboard'),
    'https://willvinton.com/springboard/blog',
  );
  assert.equal(absoluteUrl('/', site, '/springboard'), 'https://willvinton.com/springboard/');
  assert.equal(absoluteUrl('/blog', site), 'https://willvinton.com/blog');
  assert.equal(
    absoluteUrl('/blog', new URL('https://example.com'), '/'),
    'https://example.com/blog',
  );
});

test('person and profile page share one @id', () => {
  const person = personSchema(author);
  assert.equal(person['@type'], 'Person');
  assert.equal(person['@id'], `${author.url}#person`);
  assert.deepEqual(person.sameAs, author.sameAs);
  const profile = profilePageSchema(author);
  assert.equal(profile['@type'], 'ProfilePage');
  assert.equal(profile.mainEntity['@id'], person['@id']);
});

test('person omits empty optional fields', () => {
  const person = personSchema({ ...author, image: undefined, sameAs: [] });
  assert.equal('image' in person, false);
  assert.equal('sameAs' in person, false);
});

test('blog posting links to the author and falls back to the publish date', () => {
  const post = blogPostingSchema({
    url: 'https://willvinton.com/springboard/blog/x',
    title: 'T',
    description: 'D',
    date: new Date('2026-09-01T00:00:00Z'),
    section: 'The shift',
    author,
    siteUrl: 'https://willvinton.com/springboard/',
  });
  assert.equal(post['@type'], 'BlogPosting');
  assert.equal(post.datePublished, '2026-09-01T00:00:00.000Z');
  assert.equal(post.dateModified, post.datePublished);
  assert.equal(post.author['@id'], `${author.url}#person`);
  assert.equal(post.author.name, 'Will Vinton');
  assert.equal(post.articleSection, 'The shift');
});

test('faq maps each item to a Question with an accepted Answer', () => {
  const faq = faqSchema([{ question: 'Q?', answer: 'A.' }], 'https://x.test/p');
  assert.equal(faq['@type'], 'FAQPage');
  assert.deepEqual(faq.mainEntity, [
    { '@type': 'Question', name: 'Q?', acceptedAnswer: { '@type': 'Answer', text: 'A.' } },
  ]);
});

test('breadcrumbs are numbered from 1', () => {
  const crumbs = breadcrumbSchema([
    { name: 'Blog', url: 'https://x.test/blog' },
    { name: 'Post', url: 'https://x.test/blog/p' },
  ]);
  assert.deepEqual(
    crumbs.itemListElement.map((c) => [c.position, c.name]),
    [
      [1, 'Blog'],
      [2, 'Post'],
    ],
  );
});

test('serialized JSON-LD cannot close its script tag', () => {
  const json = serializeJsonLd(graph([{ '@type': 'Thing', name: '</script><b>' }]));
  assert.equal(json.includes('</script>'), false);
  assert.equal(JSON.parse(json)['@graph'][0].name, '</script><b>');
  assert.equal(JSON.parse(json)['@context'], 'https://schema.org');
});
