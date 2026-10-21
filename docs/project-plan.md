# Springboard — Project Plan

The working plan across every workstream. The handoff (`docs/SPRINGBOARD_HANDOFF.md`) stays the original record; this file is what we update as decisions get made.

Last updated: 2026-10-21.

## Principles

- **Organic first, paid later.** Earn trust with content, the Score and LinkedIn before spending on ads.
- **Agents draft, Will approves.** Nothing goes out under Will's name without his review. Agents deliver work as PRs or drafts.
- **Near-free until revenue.** Free tiers where they exist. Ask before any paid service.
- **Build to the Springboard standard.** The site, the email program and the agents are themselves the live demo.

## Workstreams

| #   | Workstream          | Owner                   | Status                           | Next step                                                 |
| --- | ------------------- | ----------------------- | -------------------------------- | --------------------------------------------------------- |
| 1   | Site build (M0–M5)  | Claude (build agents)   | M0, M1 in review; M2 in progress | Merge PRs in order; M3 Score after M2                     |
| 2   | Blog content        | Content agent + Will    | 8 launch posts in review         | Agent drafts 2–3 posts a week once research is running    |
| 3   | Research agent      | Scheduled agent         | Designing                        | Private repo, charter, test run, then schedule            |
| 4   | Email list          | Will (account) + Claude | Not started                      | Will opens Klaviyo free account; Claude wires M3 sign-ups |
| 5   | LinkedIn            | LinkedIn agent + Will   | Queued                           | Profile and positioning review, then a weekly post plan   |
| 6   | Paid marketing      | Paid agent + Will       | Queued (after organic)           | Revisit once the site, Score and email flows are live     |
| 7   | Offers and commerce | Will + Claude           | Queued (Phase 2)                 | Decide first paid offer and pricing                       |

## 1. Site build

M0–M5 from the handoff §4. One PR per milestone. See `README.md` for setup and Cloudflare Pages deploys.

## 2. Blog content

See `docs/blog-roadmap.md`. Launch with eight backdated foundational posts, then 2–3 posts a week drafted by the content agent from research digests. Merging a post's PR publishes it.

## 3. Research agent

**Goal:** keep Will ahead of the market on AI in ecommerce, and feed the blog, LinkedIn and the Path with sourced material.

- **Where:** a private repo (`whv3rd/springboard-research`), since the site repo is public.
- **Schedule:** Monday and Thursday mornings, US Eastern. Adjust after a few digests.
- **Each run:** reads the charter, searches for new AI-in-ecommerce use cases tied to the five checkpoints, files use cases with sources, writes a digest of what changed, proposes post ideas tagged by pillar and checkpoint, and drafts one blog post as a PR on the site repo.
- **Notifications:** Claude app push notification and email when a run finishes. No SMS service needed for this.
- **Guardrails:** never publishes, never invents numbers or quotes, cites primary sources, and flags anything it can't verify.

## 4. Email list

- **Platform:** Klaviyo, already in the stack. The free tier is enough to start (about 250 active profiles and 500 email sends a month; confirm current limits on Klaviyo's pricing page).
- **Why Klaviyo:** Will already knows it, Track 4 of the Path teaches the Klaviyo MCP, and running the list on it makes the site a live demo.
- **Will:** creates the account (it needs his identity and billing details), shares the public site key and a list ID.
- **Claude:** wires the Score email gate and a newsletter sign-up (M3), with profile properties `springboard_score`, `springboard_level` and `weakest_checkpoint`.
- **Later:** a nurture flow by Score level, and a weekly or biweekly newsletter built from the blog and digests. SMS only once there's a reason to text people; it costs credits.

## 5. LinkedIn

**Goal:** build Will's presence where directors of ecommerce actually are, and drive people to the Score.

- **LinkedIn agent drafts, Will posts.** LinkedIn restricts automated posting to approved apps, so the agent prepares posts and Will publishes them (or schedules them in LinkedIn's own scheduler).
- **First steps:** review Will's profile and headline against the Springboard positioning; build a weekly plan (for example 3 short posts a week) drawn from blog posts, research digests and the build log.
- **Formats:** short takes on news, one-workflow tips, build log updates, Score teardowns, and links to new posts.

## 6. Paid marketing

After organic is working: site live, Score converting, email flows running.

- **Paid agent:** proposes campaigns, audiences and creative for LinkedIn, Google and Meta, and reports on results. Will approves every budget and campaign before anything is spent.
- **First test (when ready):** small LinkedIn or Google campaigns pointing at the Score, measured by Score completions and email sign-ups.

## 7. Offers and commerce

From free to high-touch, each step leads to the Springboard foundation. Prices are open.

| Offer              | What it is                                                                  | Phase        |
| ------------------ | --------------------------------------------------------------------------- | ------------ |
| Free               | Blog, Springboard pages, Score total and level, free Path parts, newsletter | Now          |
| Path               | Paid build guides, templates, prompts, MCP configs, workflows, gap report   | Phase 2      |
| Path Team          | Path for multiple seats, team Score tracking, quarterly live Q&A            | Phase 2      |
| Insider membership | Will's daily insights and research digests, early access, member community  | Phase 2      |
| Live sessions      | Recurring live streams and Q&A on building to Springboard                   | Phase 2      |
| Courses            | Structured, self-paced courses per checkpoint or for a whole team           | Phase 2+     |
| 1:1 calls          | Paid personal calls with Will                                               | Phase 2      |
| Springs Advisory   | Readiness audit, hands-on build, optional ongoing operation                 | Now (quoted) |
| Workshops          | Remote or on-site workshops introducing AI to a team, aimed at Springboard  | Now (quoted) |

**Commerce backend:** Shopify Basic, per the handoff, with customer accounts gating paid content (Ghost is the fallback). Running it on Shopify also makes it a live Track 3 demo.

## Launch gate

Nothing launches until Will says so. Before the public launch, Claude checks in with Will at least twice: once when the site is feature-complete, and once just before going live. The launch checklist:

- [ ] M3 Score quiz is live and sends results to Klaviyo
- [ ] Will has reviewed and approved every published post and page (see `docs/review-queue.md`)
- [ ] No employer names or private details in public content
- [ ] All `DRAFT COPY` and `PLACEHOLDER` markers resolved or accepted
- [ ] Domain decided and `site` URL updated
- [ ] M5 checks done: Lighthouse 95+, meta and OG tags, sitemap, RSS
- [ ] Will gives an explicit go

## Open decisions

- Brand and domain (Springs Consulting / Springs Digital / other)
- Final Score questions and weighting
- Pricing for Path, Path Team and the new offers
- Phase 2 gating (Shopify customer accounts vs Ghost)
- What can be shown publicly from Mishimoto and Brecks Brothers
- Which portfolio brand becomes the public build log
- Which paid offer launches first
