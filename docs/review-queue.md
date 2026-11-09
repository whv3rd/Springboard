# Will's review queue

Things that need Will at a computer. Claude adds to this list as work lands; Will ticks items off. Phone-friendly items are marked 📱.

Last updated: 2026-10-21.

## The Springspot Stack post and home section

- [ ] Product names and prices are now off the public site. Confirm "roughly $100 a month to start" is the figure you want to stand behind (internal breakdown in `docs/concept.md`; only Claude Pro was checked live). 📱
- [ ] Add a real enterprise number from your experience (Commerce Cloud or AEM contract) if you can share one. 📱
- [ ] Keep the Mark Cuban framing for the 33 million figure, or cite the SBA directly? 📱
- [ ] Naming: "Springspot Stack" for the stack and "Springspot-ready" for the seal. Keep, or riff? 📱

## Springspot Startup

- [ ] Price: a fixed price, "from $X", or quoted after a call (the page says quoted for now).
- [ ] Scope and timeline: are the four steps on `/startup` right? How long does a Startup take? 📱
- [ ] How Startup and Advisory fit together: Advisory is described as the ongoing help after the Startup. 📱

## Gating

- [ ] **Set the Klaviyo keys so the email gates actually collect.** In whv3rd/willvinton.com → Settings → Secrets and variables → Actions → Variables, add `PUBLIC_KLAVIYO_SITE_KEY` (Klaviyo public API key / site ID) and `PUBLIC_KLAVIYO_LIST_ID` (the list to subscribe to), then re-run Deploy site. As of 2026-11-09 the live build has neither, so Score and breakdown emails go nowhere.
- [ ] In Klaviyo, build a flow for source "Springspot Stack breakdown" (profile property `requested = stack_breakdown`) if you want to email the breakdown or follow up. Score signups keep the source "Springboard Score".
- [ ] Confirm the per-job cost ranges in `src/lib/stack.ts` (only the AI plan's price was checked live). Name example tools in the gated breakdown, or keep it product-free? 📱
- [ ] More to gate later? Candidates: track requirements and checklists, some Playbook posts.

## Security without a DevOps team

- [ ] Open with a real incident you've been through (no company names): what happened and which habit would have stopped it. 📱
- [ ] Confirm 90 days as the recommended key-rotation cadence, or give yours. 📱
- [ ] Anything to add to the four habits (e.g. two-factor on every admin account, backups)? Kept to your four for now. 📱

## Merge the open PRs

The PRs are stacked. Merge in this order, changing each PR's base to `main` before merging it (or ask Claude to retarget them first, so it's just merge clicks).

- [ ] #1 Scaffold
- [ ] #2 Design foundation
- [ ] #5 Pages and routes
- [ ] #3 Project plan and blog roadmap (any time)
- [ ] #4 Launch posts (after the review below)

## Launch posts (#4)

Read all eight. Then, in your own words (voice notes are fine, Claude will tidy grammar and keep your voice):

- [ ] Manifesto: "Most ecommerce businesses I've worked with run on a stack of dependencies." True as written? Add a real example if you have one.
- [ ] Who I am: "Today I direct ecommerce and consult across multiple brands, including a portfolio of my own." Is this how you want to describe your role? (No employer name, no mention of a full-time job.)
- [ ] Who I am: "Across platforms and company sizes, one pattern keeps repeating" and "For most of my career, the answer was to hire more specialists." Confirm, or tell the real version.
- [ ] Who I am: keep the $1.5B line? 📱
- [ ] Building at my own brands: OK to stay unnamed for now, or name the build log brand? 📱
- [ ] "Start with a theme, build the system, then just talk": your dictated Figma post, tidied. Check it still sounds like you, and add a real navigation example or screenshot if you have one
- [ ] "Just talk" draft: answer the five questions in the post by voice (📱 works), then Claude writes it up
- [ ] Queued drafts: answer the questions at the top of each by voice (📱 works), one post at a time. Claude writes each one up in your words:
  - [ ] Springspot for development (Shopify, WordPress, Magento, GitHub/Bitbucket)
  - [ ] Vibe coding vs. agentic development
  - [ ] Teams series 1: your backlog is the bottleneck (Jira/Linear)
  - [ ] Teams series 2: Claude as your scrum master
  - [ ] Teams series 3: agentic scrum teams
- [ ] Anything in any post that doesn't sound like you

## Site copy (#5)

Search the code for `DRAFT COPY` and `PLACEHOLDER`. The important ones:

- [ ] Home headline: "Run the store with one operator, not five vendors." The "five" has no source. Keep, change or rewrite. 📱
- [ ] `/about`: background and proof, case studies, public build log
- [ ] `/springspot`: "What changes" cards and the audience one-liners
- [ ] `/pricing`: Path and Path Team prices (open decision)

## Accounts and setup

- [ ] Create private repo `whv3rd/springboard-research` and add it to the Claude GitHub App
- [ ] Open a Klaviyo free account; send Claude the public site key and the list ID for sign-ups
- [ ] Connect Cloudflare Pages to the repo after #1 merges (steps in `README.md`)
- [ ] Decide whether this repo should be private (see below)

## Decide: should this repo be private?

`whv3rd/springboard` is public. The planning docs in it (`docs/SPRINGBOARD_HANDOFF.md`, `docs/concept.md`, `CLAUDE.md`) mention your employer by name and include internal plans. If that shouldn't be public, make the repo private in GitHub settings. Cloudflare Pages and Claude both work with private repos. Alternatively, Claude can remove the employer name from those docs.
