# Springboard — Blog Roadmap

The blog does job one of the site: **earn trust**. Every post should leave an operator with something they could use on Monday, and point toward the Score or a Path track.

Status: draft for Will's review. Dates, cadence and titles are proposals.

## The core theme

Set up the foundation right, give AI the rules, then just talk. It applies to every checkpoint (design, platform, marketing, processes), and it is the underlying theme of Springboard. Most posts should come back to it.

## Principles

- **Practitioner, not pundit.** Lead with what was done, what it took and what happened. Opinion posts (The shift) still need a concrete example.
- **Real numbers or no numbers.** Never invent metrics, clients or quotes. If a number can't be shown publicly, say so and describe the shape of the result.
- **Paywall rule applies.** A free post may explain one workflow end to end (a Playbook). The full system build, templates and configs belong in the Path.
- **Every post has one next step.** Usually "Take the Score" or the matching track overview.
- **Sourced.** Claims about tools, vendors or other companies link to a primary source.

## Pillars

| Pillar           | Purpose                                                 | Typical shape                                     | Links to          |
| ---------------- | ------------------------------------------------------- | ------------------------------------------------- | ----------------- |
| Operator diaries | Show the work as it happens at Will's own brands        | What I tried this week, what broke, what it cost  | Public build log  |
| Teardowns        | Score a real store against the five checkpoints         | Public-info audit, score per checkpoint, gaps     | The Score         |
| Playbooks        | One complete, free workflow                             | Problem → setup → prompt/config → result → limits | Matching track    |
| The shift        | Point of view on where ecommerce operations are heading | Thesis, evidence, what operators should do        | Springboard pages |

## Cadence

- **Launch:** eight foundational posts, backdated August–October 2026 (PR #4), covering what Springboard is, the checkpoints, the Score, the tiers, and Will's background.
- **Ongoing:** 2–3 posts a week, drafted by the content agent from the research digests and the backlog below, rotating pillars. Each draft arrives as a PR; merging it publishes it.
- **Will's part:** review each draft, add the practitioner detail only he has (screenshots, real numbers, what actually happened), and merge. Operator diaries and Teardowns of real brands always need Will's input before publishing.
- If review time gets tight, reduce volume before reducing quality. Thin, generic AI posts hurt trust and search rankings more than a slower cadence does.

## Launch set (from the handoff)

| #   | Post                                                     | Pillar    | Next step           | Needs from Will                       |
| --- | -------------------------------------------------------- | --------- | ------------------- | ------------------------------------- |
| 1   | The Springboard manifesto                                | The shift | What is Springboard | Point of view, final edit             |
| 2   | Introducing the Springboard Score                        | The shift | Take the Score      | Final questions (open decision)       |
| 3   | Playbook: audit your page templates before Figma         | Playbook  | Track 1             | A real audit example                  |
| 4   | Playbook: your first on-system page with Claude + Figma  | Playbook  | Track 2             | Screenshots                           |
| 5   | Playbook: query your Shopify catalog through an MCP      | Playbook  | Track 3             | Screenshots, safe example data        |
| 6   | Playbook: build a Klaviyo segment from a prompt          | Playbook  | Track 4             | Screenshots, safe example data        |
| 7   | Playbook: map one weekly process and run it through MCPs | Playbook  | Track 5             | One real process                      |
| 8   | Operator diary #1: where Brecks Brothers started         | Diary     | Take the Score      | Starting score, what's public         |
| 9   | Operator diary #2: the first workflow that stuck         | Diary     | Matching track      | What changed, time saved if shareable |

Blocked on open decisions: which brand is the public build log, and what can be shown from Mishimoto and Brecks Brothers (posts 8–9).

## First quarter after launch (proposal)

| Week | Pillar    | Working title                                                   |
| ---- | --------- | --------------------------------------------------------------- |
| 1    | Teardown  | Scoring a well-known DTC brand from the outside                 |
| 2    | Playbook  | Product description rewrites that stay on-brand                 |
| 3    | Diary     | Month one of running the build log brand on MCPs                |
| 4    | The shift | Why the next ecommerce hire might be an operator, not an agency |
| 5    | Teardown  | Scoring a mid-sized Shopify brand                               |
| 6    | Playbook  | Weekly merchandising report from the platform MCP               |
| 7    | Diary     | What broke, and the guardrails we added                         |
| 8    | The shift | Vendor dependence: what it really costs a mid-sized brand       |
| 9    | Teardown  | Scoring a Magento or Salesforce Commerce brand                  |
| 10   | Playbook  | Campaign brief to Klaviyo draft in one session                  |
| 11   | Diary     | Score check-in: where the build log brand stands now            |
| 12   | The shift | Roundup: what changed in AI commerce this quarter               |

The research agent's backlog (`ideas` in its digests) should replace or sharpen these titles over time.

## Queued drafts (Will's ideas)

Draft files in `src/content/blog/` with Will's notes and open questions. Each gets written once Will answers by voice.

| Post                                                     | Theme                                                       |
| -------------------------------------------------------- | ----------------------------------------------------------- |
| You don't have to be a designer, developer or writer     | Just talk: AI covers the skills you don't have              |
| The Springboard concept applies to development, too      | Platform MCPs plus a connected repo for non-developers      |
| Vibe coding vs. agentic development                      | Attention, explicit permission, full history                |
| Teams 1: your backlog is the bottleneck                  | Jira or Linear in the stack, business requests, audit trail |
| Teams 2: Claude as your scrum master and project manager | Running Agile, SAFe, Scrum or Kanban with AI                |
| Teams 3: agentic scrum teams for ecommerce               | Which teams to build, how to structure them, how to decide  |

The teams series may grow into a Path module or a course (see `docs/project-plan.md`, offers).

## Idea backlog by checkpoint

Seeds for Playbooks and Teardowns. The research pipeline adds to this.

- **Design system:** template inventory, token naming that survives Figma ↔ code, component audits.
- **AI ↔ design:** on-system landing pages, ad and email asset variants, design QA with Claude.
- **Platform MCP:** catalog cleanup, bulk attribute fixes, merchandising reports, collection building.
- **Marketing MCP:** segment building, flow audits, campaign drafting, post-send analysis.
- **Processes:** process mapping format, weekly operator rituals, handoff docs any operator can follow.

## Will's voice in every post

Will talks, Claude tidies. The fastest way to get real practitioner content without Will writing from scratch:

1. Claude queues up the spots in a draft where only Will can speak (what happened, what it cost, what he'd do differently).
2. Will answers by voice or quick typing, stream of thought, even from his phone.
3. Claude fixes grammar and structure but keeps Will's wording, opinions and rhythm. No rewriting his voice into generic AI prose.
4. Will gives the final read before the post's PR is merged.

## Research pipeline

A research agent watches AI-in-ecommerce use cases on a schedule and files findings for Will to review. Each run produces:

1. New or updated **use cases** (who did what, with which tools, what result, sources).
2. A short **digest** of what changed since the last run.
3. **Post ideas**, each tagged with a pillar and checkpoint.

Will reviews the digest, picks ideas, and adds the practitioner angle. The agent never publishes to the site. Setup details live with the research repo (see the research charter).

## Post checklist

- [ ] One clear takeaway in the first two paragraphs
- [ ] Real example, screenshot or number (or an explicit note why not)
- [ ] Sources linked for external claims
- [ ] Respects the paywall rule
- [ ] One next step at the end
- [ ] `pillar`, `description` and `date` frontmatter set, and `draft: false` only when approved
