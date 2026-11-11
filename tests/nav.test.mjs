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
  for (const base of ['/springspot', '/springspot/']) {
    assert.equal(isCurrent('/blog', '/springspot/blog/five-checkpoints/', base), true);
    assert.equal(isCurrent('/score', '/springspot/score/', base), true);
    assert.equal(isCurrent('/what-is-springspot', '/springspot/what-is-springspot/', base), true);
    // The Springspot home page is not the "Springspot" explainer page.
    assert.equal(isCurrent('/what-is-springspot', '/springspot/', base), false);
    assert.equal(isCurrent('/what-is-springspot', '/springspot', base), false);
    assert.equal(isCurrent('/blog', '/springspot/', base), false);
  }
});

test('leaves paths outside the base alone', () => {
  assert.equal(isCurrent('/blog', '/blog/', '/springspot'), true);
  assert.equal(isCurrent('/blog', '/springspotx/blog/', '/springspot'), false);
});
