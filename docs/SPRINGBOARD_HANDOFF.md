# Springboard — Project Handoff

This file carries everything decided so far in planning. Claude Code: read this whole file first, then follow the kickoff steps at the bottom.

---

## 1. The concept

**Springboard** is a threshold a business reaches, not a product it buys. It is the point where a small or mid-sized ecommerce business has its design, platform and marketing systems connected to AI through MCPs, so one operator or a small team can run what used to take dev teams, merchandisers and creatives.

- Brand: lives under **Springs** (Springs Consulting / Springs Digital — name not final).
- Owner: Will Vinton. About 18 years in ecommerce; deep on Shopify, Magento and Salesforce; consulting work behind more than $1.5B in realized ecommerce revenue. Leads Digital Experience & Technology at Mishimoto and runs the Brecks Brothers brand portfolio, where he is building to Springboard now.
- Audience: solo owner-operators, directors of ecommerce at mid-sized brands, and freelance operators.
- Promise: less vendor dependence, faster execution, same platforms they already use.
- Voice: practitioner, not pundit. Real workflows, real screenshots, real numbers.

### Tiers of operation
| Tier | Who runs it | Who it serves |
| --- | --- | --- |
| Small | A single operator | A solo owner-entrepreneur |
| Medium | Director of ecommerce plus a couple of operators | A mid-sized business |

### The five checkpoints (the Springboard foundation)
1. **Design system** — design system, component library and every page template in Figma.
2. **AI ↔ design** — Claude connected to Figma, producing on-system pages and assets.
3. **Platform MCP** — store platform and full catalog connected to Claude (proven on Shopify so far).
4. **Marketing MCP** — Klaviyo connected for campaigns, flows and segments.
5. **Processes** — core workflows mapped, run through MCPs, repeatable by any operator.

---

## 2. What the site is

An education-first hub (blog + docs + paid library) that does three jobs in order:
1. **Earn trust** — blog proving expertise in ecommerce + AI.
2. **Define the destination** — what Springboard is, and the Springboard Score.
3. **Sell the route** — the Path docs (paid), plus advisory.

Paywall rule: anything that explains **what** or **why** is free. Anything you could follow step by step to **build** it is paid.

### Sitemap
- **Home**
- **Blog** — Operator diaries, Teardowns, Free playbooks, The shift
- **Springboard** — What it is, The five checkpoints, Who it's for, Solo and team tiers
- **The Score** — Free self-assessment, Total score and level, Gap report (paid)
- **The Path** (paid core) — Start here (free), Track 1–5 (one per checkpoint)
- **Pricing** — Free, Path, Path Team, Springs Advisory
- **About & Advisory** — Background and proof, Case studies, Public build log, Book a call

### The Springboard Score
0–100. Each checkpoint rated 0–4, total × 5.

| Rating | Meaning |
| --- | --- |
| 0 | Not started |
| 1 | Partial, ad hoc |
| 2 | In place, not connected to AI |
| 3 | Connected, used sometimes |
| 4 | Connected and part of how work gets done |

| Score | Level | Meaning |
| --- | --- | --- |
| 0–25 | Grounded | Vendor-dependent; start with the design system |
| 26–50 | Loading | Foundations exist but aren't connected |
| 51–75 | Coiled | Key systems connected; processes still manual |
| 76–95 | Launch-ready | Mostly automated; a few gaps to close |
| 96–100 | Springboard | One operator or a small team can run it all |

Free result: total, level, one next step. Paid: full gap report per checkpoint with links into matching Path modules.

### The Path (docs library)
One track per checkpoint. Every track uses the same six parts:
1. Overview (free)
2. Requirements (free)
3. Build guide (paid)
4. Templates and assets — Figma files, prompts, MCP configs, process maps (paid)
5. Workflows — day-to-day recipes (paid)
6. Checklist — what earns a 4 (free)

Tracks: 1 Design system in Figma · 2 Connect Claude to Figma · 3 Platform MCP (Shopify first) · 4 Marketing MCP (Klaviyo) · 5 Process mapping and automation. A short **Start here** guide sits above all tracks.

### Pricing tiers
| Tier | For | Unlocks | Price |
| --- | --- | --- | --- |
| Free | Anyone | Blog, Springboard pages, Score total + level, track overviews, requirements, checklists, newsletter | $0 |
| Path | Solo operators | All build guides, templates, prompts, MCP configs, workflows, full gap report | TBD |
| Path Team | Small teams | Path for multiple seats, team Score tracking, quarterly live Q&A | TBD |
| Springs Advisory | Done-with-you | Readiness audit, hands-on build, optional ongoing operation | Quoted |

### Content pillars
Operator diaries · Teardowns (score a real store) · Playbooks (free single-workflow guides) · The shift (opinion).
Launch set: Springboard manifesto post, the Score, one free playbook per track, two operator diaries.

### Conversion flow
Blog/playbook → take the Score (email required for results) → level + next step + Klaviyo nurture flow by level → paywall inside a track's build guide → join Path / Path Team or book Advisory.

---

## 3. Stack (decided)

Lightweight and near-free until there's revenue. Everything lives in GitHub and is built with Claude Code.

**Phase 1 — Launch (now)**
- **Astro** + TypeScript, static output. Content as Markdown/MDX in Astro content collections.
- **Hosting:** Cloudflare Pages (free), auto-deploy from GitHub `main`; preview deploys on PRs.
- **Styling:** CSS custom properties as design tokens (mirroring the future Figma design system); keep dependencies minimal.
- **Email/leads:** Klaviyo free tier. Score results write profile properties (score, level, weakest checkpoint) for segmentation.
- **Paid content:** not live yet. Paid sections are marked in frontmatter and render a teaser + paywall CTA.

**Phase 2 — Monetize (later)**
- **Shopify Basic** as the commerce backend (no Plus needed). Path and Path Team are products/subscriptions.
- Astro site checks a logged-in Shopify customer's access (Customer Account API / tags) to unlock paid docs.
- Fallback if gating is too heavy: Ghost Publisher (~$29/mo) for memberships.

The site itself should be built to the Springboard standard so it doubles as a live demo.

---

## 4. Phase 1 build plan

**M0 — Scaffold**
- Astro + TS project, ESLint/Prettier, `README.md`, `CLAUDE.md`.
- Content collections: `blog`, `path` (track + part, with `access: free | paid`), `pages`.
- Cloudflare Pages config notes in README.

**M1 — Design foundation**
- `src/styles/tokens.css`: color, type scale, spacing, radius — light and dark.
- Base layout, header/nav, footer, prose styles, button, card, callout, paywall block.
- If the Figma MCP is connected and a Springboard file exists, pull tokens/components from it; otherwise use clean placeholders and note them.

**M2 — Pages and routes**
- `/`, `/springboard`, `/score`, `/blog`, `/blog/[slug]`, `/path`, `/path/[track]`, `/path/[track]/[part]`, `/pricing`, `/about`.
- Paid parts render overview teaser + paywall component linking to `/pricing`.

**M3 — The Score**
- Client-side quiz: 2–3 questions per checkpoint mapped to the 0–4 rubric.
- Compute total ×5, level, weakest checkpoint, one next step.
- Email gate before results; submit to Klaviyo via client subscribe endpoint (public site key in env), with properties `springboard_score`, `springboard_level`, `weakest_checkpoint`.
- Results page links to the matching track overview.

**M4 — Seed content**
- Manifesto post draft, Start here guide, free overview + requirements + checklist for each of the five tracks, placeholder stubs for paid parts.

**M5 — Ship**
- Lighthouse pass (aim for 95+), basic SEO (meta, OG, sitemap, RSS for blog), deploy to Cloudflare Pages.

---

## 5. Open decisions
- [ ] Brand and domain: Springs Consulting, Springs Digital, other
- [ ] Final Score questions and weighting
- [ ] Pricing for Path and Path Team
- [ ] Docs gating approach in Phase 2 (Shopify customer accounts vs Ghost)
- [ ] What can be shown publicly from Mishimoto and Brecks Brothers
- [ ] Which portfolio brand becomes the public build log

---

## 6. Kickoff steps for Claude Code
1. Read this file fully.
2. Create `CLAUDE.md` at repo root summarizing the concept, stack, conventions and open decisions (keep it tight), and move the detail of sections 1–2 into `docs/concept.md` and `docs/site-blueprint.md`. Keep this handoff file in `docs/` as the source record.
3. Propose the M0–M5 plan back to Will as a task list, flag anything to confirm, then start M0.
4. Work in small commits on a branch, open a PR per milestone.
5. Ask before adding any paid service or dependency beyond Astro and dev tooling.
