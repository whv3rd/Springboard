# Springboard

Education-first site (blog, docs and paid library) for Springboard — the point where one operator or a small team can run an ecommerce business on AI-connected design, platform and marketing systems. See `CLAUDE.md` and `docs/` for the concept and plan.

Built with [Astro](https://astro.build) + TypeScript as a static site, deployed on Cloudflare Pages.

## Local development

Requires Node 22.22+ (see `.nvmrc`).

```sh
npm install
npm run dev        # http://localhost:4321
```

| Command                | What it does                                        |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Start the dev server                                |
| `npm run build`        | Type-check (`astro check`) and build to `dist/`     |
| `npm run preview`      | Serve the built site locally                        |
| `npm run check`        | Type-check `.astro`/`.ts` files and content schemas |
| `npm run lint`         | ESLint                                              |
| `npm test`             | Score and Klaviyo tests (Node's built-in runner)    |
| `npm run format`       | Prettier (write)                                    |
| `npm run format:check` | Prettier (check only)                               |

## Content

All content is Markdown or MDX in `src/content/`, validated by the schemas in `src/content.config.ts`. A frontmatter mistake fails the build.

| Collection | Location                             | Key frontmatter                                                      |
| ---------- | ------------------------------------ | -------------------------------------------------------------------- |
| `blog`     | `src/content/blog/<slug>.md`         | `title`, `description`, `date`, `pillar`, `draft`                    |
| `path`     | `src/content/path/<track>/<part>.md` | `title`, `description`, `track`, `part`, `order`, `access`, `teaser` |
| `pages`    | `src/content/pages/<slug>.md`        | `title`, `description`                                               |

- `pillar`: `diary` | `teardown` | `playbook` | `shift`
- `track`: `start-here` | `design-system` | `ai-design` | `platform-mcp` | `marketing-mcp` | `processes`
- `part`: `overview` | `requirements` | `build-guide` | `templates` | `workflows` | `checklist`
- `access`: `free` | `paid` — paid parts render `teaser` plus a paywall linking to `/pricing`.

Paywall rule: anything that explains _what_ or _why_ is free; anything you could follow step by step to _build_ it is paid. Default access per part lives in `src/lib/path.ts`.

## Deploying to Cloudflare Pages

The site is fully static, so no adapter is needed. One-time setup in the Cloudflare dashboard:

1. **Workers & Pages → Create → Pages → Connect to Git**, and pick `whv3rd/springboard`.
2. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Production branch: `main`
3. Environment variables (Production and Preview): `NODE_VERSION` = `22`, plus `PUBLIC_KLAVIYO_SITE_KEY` and `PUBLIC_KLAVIYO_LIST_ID` for the Score's email gate (see `.env.example`). Without the Klaviyo keys the Score still works but sends nothing to Klaviyo. They are read at build time, so redeploy after changing them.
4. Save and deploy.

After that, every push to `main` deploys to production, and every PR gets a preview deployment with its own URL, posted on the PR.

The `site` URL in `astro.config.mjs` is a placeholder (`https://springboard.pages.dev`) until the domain is decided. Update it when a custom domain is attached in Pages → Custom domains.
