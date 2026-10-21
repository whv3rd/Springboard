// @ts-check
import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

// Editorial review notes in content, written as `<!-- WILL: question -->`.
const REVIEW_NOTE = /<!--\s*WILL:[\s\S]*?-->\n?/g;

/**
 * Removes review notes from the built HTML and XML. Markdown keeps HTML comments in
 * its output, so without this they would ship (hidden, but readable in the source).
 * @returns {import('astro').AstroIntegration}
 */
function stripReviewNotes() {
  return {
    name: 'strip-review-notes',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const files = await readdir(root, { recursive: true });
        let stripped = 0;
        for (const file of files) {
          if (!/\.(html|xml)$/.test(file)) continue;
          const path = join(root, file);
          const html = await readFile(path, 'utf8');
          const clean = html.replace(REVIEW_NOTE, '');
          if (clean !== html) {
            await writeFile(path, clean);
            stripped++;
          }
        }
        logger.info(`Removed review notes from ${stripped} file(s)`);
      },
    },
  };
}

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
