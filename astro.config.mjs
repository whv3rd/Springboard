// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  // Placeholder until the brand and domain are decided (see CLAUDE.md, open decisions).
  site: 'https://springboard.pages.dev',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [mdx()],
});
