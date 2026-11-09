// @ts-check
import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import stripReviewNotes from './integrations/strip-review-notes.mjs';
import { rehypeBrandTerms } from './src/lib/brand-terms.ts';

export default defineConfig({
  // Placeholder until the brand and domain are decided (see CLAUDE.md, open decisions).
  site: 'https://springspot.pages.dev',
  output: 'static',
  trailingSlash: 'ignore',
  // Bold, colour-coded branded terms (Springspot Score, Stack, Path...) in all Markdown.
  markdown: { rehypePlugins: [rehypeBrandTerms] },
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
