// Klaviyo client-side subscription for the site's email gates (the Score, the Springspot
// Stack breakdown).
//
// Endpoint: Create Client Subscription, POST https://a.klaviyo.com/client/subscriptions
// Docs: https://developers.klaviyo.com/en/reference/create_client_subscription
// Spec: https://raw.githubusercontent.com/klaviyo/openapi/main/openapi/stable/apis/create_client_subscription.json
//
// It takes the PUBLIC site key (company_id), never a private key, and the profile it
// creates can carry custom `properties`, so one request subscribes the email to the list
// and writes the Score properties used to segment the nurture flow.
//
// No DOM or Astro imports here, so `npm test` can load it with Node's type stripping.

export const KLAVIYO_ENDPOINT = 'https://a.klaviyo.com/client/subscriptions';
/**
 * API revision the request body is written against. Klaviyo retires revisions after about
 * two years; 2026-01-15 is the GA revision named in Will's Klaviyo handoff (2026-11-09).
 */
export const KLAVIYO_REVISION = '2026-01-15';
/** Stored on the consent record, so Will can see where the subscriber came from. */
// One distinct source per form, so Will can segment and report by form in Klaviyo.
export const KLAVIYO_SOURCE = 'springspot - score';
/** Source for the Springspot Stack breakdown gate. */
export const KLAVIYO_STACK_SOURCE = 'springspot - stack breakdown';

/** Custom profile properties: what Klaviyo segments and flows key on. */
export type ProfileProperties = Record<string, string | number>;

export interface ScoreProfileProperties extends ProfileProperties {
  springspot_score: number;
  springspot_level: string;
  /** Track slug of the weakest checkpoint, e.g. `design-system`, or `none` on a perfect score. */
  weakest_checkpoint: string;
}

export interface KlaviyoConfig {
  siteKey?: string;
  listId?: string;
}

/** Both keys present and non-empty. Without them the Score skips Klaviyo entirely. */
export function hasKlaviyoConfig(
  config: KlaviyoConfig,
): config is { siteKey: string; listId: string } {
  return Boolean(config.siteKey?.trim() && config.listId?.trim());
}

export interface KlaviyoRequest {
  url: string;
  headers: Record<string, string>;
  body: unknown;
}

/** The documented request shape. Pure, so the tests can check it without a network. */
export function buildSubscriptionRequest(
  config: { siteKey: string; listId: string },
  email: string,
  properties: ProfileProperties,
  source: string = KLAVIYO_SOURCE,
): KlaviyoRequest {
  const url = `${KLAVIYO_ENDPOINT}?company_id=${encodeURIComponent(config.siteKey.trim())}`;
  return {
    url,
    headers: {
      accept: 'application/vnd.api+json',
      'content-type': 'application/vnd.api+json',
      revision: KLAVIYO_REVISION,
    },
    body: {
      data: {
        type: 'subscription',
        attributes: {
          custom_source: source,
          profile: {
            data: {
              type: 'profile',
              attributes: {
                email: email.trim().toLowerCase(),
                properties,
                subscriptions: { email: { marketing: { consent: 'SUBSCRIBED' } } },
              },
            },
          },
        },
        relationships: {
          list: { data: { type: 'list', id: config.listId.trim() } },
        },
      },
    },
  };
}

/** Give up after this long so a slow network never holds back the result. */
const TIMEOUT_MS = 8000;

/**
 * Send the subscription. Resolves `true` on success (Klaviyo answers 202 Accepted) and
 * `false` on any failure; it never throws, because the result must show regardless.
 */
export async function subscribe(
  config: { siteKey: string; listId: string },
  email: string,
  properties: ProfileProperties,
  source: string = KLAVIYO_SOURCE,
): Promise<boolean> {
  const request = buildSubscriptionRequest(config, email, properties, source);
  try {
    const response = await fetch(request.url, {
      method: 'POST',
      headers: request.headers,
      body: JSON.stringify(request.body),
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) {
      console.error(`Klaviyo subscription failed: HTTP ${response.status}`, await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error('Klaviyo subscription failed', error);
    return false;
  }
}
