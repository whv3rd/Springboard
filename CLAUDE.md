# Springboard

Education-first site (blog + docs + paid library) for **Springboard**: the threshold where a small/mid-sized ecommerce business has design, platform and marketing systems connected to AI through MCPs, so one operator or a small team can run it. Brand sits under **Springs** (name not final). Owner: Will Vinton.

Detail lives in `docs/`:
- `docs/concept.md` — the concept, audience, voice, the five checkpoints
- `docs/site-blueprint.md` — sitemap, Score rubric, Path structure, pricing, conversion flow
- `docs/SPRINGBOARD_HANDOFF.md` — original planning record (source of truth; don't edit)

## Stack

- **Astro + TypeScript**, static output. Content is Markdown/MDX in Astro content collections.
- **Cloudflare Pages** — auto-deploy from `main`, preview deploys on PRs.
- **Styling:** plain CSS with custom properties as design tokens (`src/styles/tokens.css`), mirroring the future Figma design system. No CSS framework.
- **Email:** Klaviyo free tier via the client subscribe endpoint; public site key in env.
- **Paid content:** not live in Phase 1. Gated parts render a teaser + paywall CTA to `/pricing`. Phase 2 gating via Shopify Basic customer accounts (fallback: Ghost).

## Conventions

- **Paywall rule:** explains *what* or *why* → free. Step-by-step *how to build* → paid. Mark with `access: free | paid` frontmatter.
- **Path content:** 5 tracks × the same 6 parts (overview, requirements, build-guide, templates, workflows, checklist). Overview, requirements, checklist are free; the rest paid.
- **Score:** 5 checkpoints × 0–4, total × 5 → 0–100. Levels: Grounded, Loading, Coiled, Launch-ready, Springboard (see blueprint).
- **Voice:** practitioner, not pundit. Real workflows, real numbers. No hype.
- **Dependencies:** minimal. Ask before adding anything beyond Astro and dev tooling, and before any paid service.
- **Workflow:** small commits on a branch, one PR per milestone (M0–M5, see handoff §4).
- The site should itself meet the Springboard standard — fast, on-system, accessible (Lighthouse 95+).

## Open decisions

- Brand and domain (Springs Consulting / Springs Digital / other)
- Final Score questions and weighting
- Path and Path Team pricing
- Phase 2 gating (Shopify customer accounts vs Ghost)
- What can be shown publicly from Mishimoto and Brecks Brothers
- Which portfolio brand becomes the public build log
