// Nav tests. Run with `npm test`.

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { isCurrent } from '../src/lib/nav.ts';

test('matches a section and its children at the domain root', () => {
  assert.equal(isCurrent('/blog', '/blog'), true);
  assert.equal(isCurrent('/blog', '/blog/'), true);
  assert.equal(isCurrent('/blog', '/blog/five-checkpoints/'), true);
  assert.equal(isCurrent('/blog', '/blogger/'), false);
  assert.equal(isCurrent('/blog', '/'), false);
});

test('strips the base path when served from a subdirectory', () => {
  for (const base of ['/springsboard', '/springsboard/']) {
    assert.equal(isCurrent('/blog', '/springsboard/blog/five-checkpoints/', base), true);
    assert.equal(isCurrent('/score', '/springsboard/score/', base), true);
    assert.equal(isCurrent('/springsboard', '/springsboard/springsboard/', base), true);
    // The Springsboard home page is not the "Springsboard" explainer page.
    assert.equal(isCurrent('/springsboard', '/springsboard/', base), false);
    assert.equal(isCurrent('/springsboard', '/springsboard', base), false);
    assert.equal(isCurrent('/blog', '/springsboard/', base), false);
  }
});

test('leaves paths outside the base alone', () => {
  assert.equal(isCurrent('/blog', '/blog/', '/springsboard'), true);
  assert.equal(isCurrent('/blog', '/springsboardx/blog/', '/springsboard'), false);
});
