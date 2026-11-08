// Klaviyo request shape, checked against the Create Client Subscription docs
// (see the links at the top of src/lib/klaviyo.ts). No network.

import { test } from 'node:test';
import assert from 'node:assert/strict';

import { buildSubscriptionRequest, hasKlaviyoConfig } from '../src/lib/klaviyo.ts';

test('config needs both keys, non-empty', () => {
  assert.equal(hasKlaviyoConfig({}), false);
  assert.equal(hasKlaviyoConfig({ siteKey: 'ABC123' }), false);
  assert.equal(hasKlaviyoConfig({ siteKey: '', listId: 'L1' }), false);
  assert.equal(hasKlaviyoConfig({ siteKey: ' ', listId: 'L1' }), false);
  assert.equal(hasKlaviyoConfig({ siteKey: 'ABC123', listId: 'L1' }), true);
});

test('subscription request matches the documented shape', () => {
  const properties = {
    springboard_score: 60,
    springboard_level: 'Coiled',
    weakest_checkpoint: 'design-system',
  };
  const req = buildSubscriptionRequest(
    { siteKey: 'ABC123', listId: 'LIST1' },
    'op@example.com',
    properties,
  );
  assert.equal(req.url, 'https://a.klaviyo.com/client/subscriptions?company_id=ABC123');
  assert.equal(req.headers['content-type'], 'application/vnd.api+json');
  assert.match(req.headers.revision, /^\d{4}-\d{2}-\d{2}$/);
  assert.deepEqual(req.body, {
    data: {
      type: 'subscription',
      attributes: {
        custom_source: 'Springboard Score',
        profile: {
          data: {
            type: 'profile',
            attributes: {
              email: 'op@example.com',
              properties,
              subscriptions: { email: { marketing: { consent: 'SUBSCRIBED' } } },
            },
          },
        },
      },
      relationships: { list: { data: { type: 'list', id: 'LIST1' } } },
    },
  });
});
