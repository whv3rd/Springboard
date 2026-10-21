// @ts-check
import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import stripReviewNotes from './integrations/strip-review-notes.mjs';

export default defineConfig({
  // Placeholder until the brand and domain are decided (see CLAUDE.md, open decisions).
  site: 'https://springboard.pages.dev',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [mdx(), stripReviewNotes()],
  env: {
    schema: {
      // Klaviyo, for the Score's email gate. Both are public by design: the client
      // subscriptions endpoint takes the public site key. Optional: without them the
      // Score skips Klaviyo and still shows the result. See .env.example.
      PUBLIC_KLAVIYO_SITE_KEY: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      PUBLIC_KLAVIYO_LIST_ID: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
    },
  },
});
