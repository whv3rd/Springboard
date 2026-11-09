// Branded-term tests. Run with `npm test`.

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { brandHtml, brandSegments, rehypeBrandTerms } from '../src/lib/brand-terms.ts';

test('finds each branded term with its family', () => {
  const families = brandSegments(
    'The Springspot Score, the Springspot Stack, the Springspot Startup, the Springspot Path, Springspot Advisory, the Springspot Standard and Springspot-ready.',
  )
    .filter((s) => s.family)
    .map((s) => `${s.text}:${s.family}`);
  assert.deepEqual(families, [
    'Springspot Score:score',
    'Springspot Stack:stack',
    'Springspot Startup:path',
    'Springspot Path:path',
    'Springspot Advisory:path',
    'Springspot Standard:stack',
    'Springspot-ready:score',
  ]);
});

test('brands the short forms "the Score" and "the Path", not "Path Team" or plain "Springspot"', () => {
  const branded = (t) =>
    brandSegments(t)
      .filter((s) => s.family)
      .map((s) => s.text);
  assert.deepEqual(branded('Take the Score, then read the Path.'), ['Score', 'Path']);
  assert.deepEqual(branded('The Path Team tier.'), []);
  assert.deepEqual(branded('Springspot is a threshold. A good score.'), []);
});

test('brandHtml escapes text and wraps terms', () => {
  assert.equal(
    brandHtml('Q&A <b> on the Springspot Score'),
    'Q&amp;A &lt;b&gt; on the <strong class="brand-term brand-term--score">Springspot Score</strong>',
  );
});

test('the rehype plugin wraps terms in text but not inside links or code', () => {
  const tree = {
    type: 'root',
    children: [
      {
        type: 'element',
        tagName: 'p',
        children: [{ type: 'text', value: 'See the Springspot Stack.' }],
      },
      {
        type: 'element',
        tagName: 'a',
        children: [{ type: 'text', value: 'the Springspot Stack' }],
      },
      { type: 'element', tagName: 'code', children: [{ type: 'text', value: 'Springspot Score' }] },
    ],
  };
  rehypeBrandTerms()(tree);
  const [p, a, code] = tree.children;
  assert.equal(p.children[1].tagName, 'strong');
  assert.deepEqual(p.children[1].properties.className, ['brand-term', 'brand-term--stack']);
  assert.equal(a.children.length, 1);
  assert.equal(code.children.length, 1);
});
