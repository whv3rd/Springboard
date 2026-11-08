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
  for (const base of ['/springboard', '/springboard/']) {
    assert.equal(isCurrent('/blog', '/springboard/blog/five-checkpoints/', base), true);
    assert.equal(isCurrent('/score', '/springboard/score/', base), true);
    assert.equal(isCurrent('/springboard', '/springboard/springboard/', base), true);
    // The Springboard home page is not the "Springboard" explainer page.
    assert.equal(isCurrent('/springboard', '/springboard/', base), false);
    assert.equal(isCurrent('/springboard', '/springboard', base), false);
    assert.equal(isCurrent('/blog', '/springboard/', base), false);
  }
});

test('leaves paths outside the base alone', () => {
  assert.equal(isCurrent('/blog', '/blog/', '/springboard'), true);
  assert.equal(isCurrent('/blog', '/springboardx/blog/', '/springboard'), false);
});
