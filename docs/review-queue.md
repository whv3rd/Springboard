# Will's review queue

Things that need Will at a computer. Claude adds to this list as work lands; Will ticks items off. Phone-friendly items are marked 📱.

Last updated: 2026-10-21.

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
- [ ] Anything in any post that doesn't sound like you

## Site copy (#5)

Search the code for `DRAFT COPY` and `PLACEHOLDER`. The important ones:

- [ ] Home headline: "Run the store with one operator, not five vendors." The "five" has no source. Keep, change or rewrite. 📱
- [ ] `/about`: background and proof, case studies, public build log
- [ ] `/springboard`: "What changes" cards and the audience one-liners
- [ ] `/pricing`: Path and Path Team prices (open decision)

## Accounts and setup

- [ ] Create private repo `whv3rd/springboard-research` and add it to the Claude GitHub App
- [ ] Open a Klaviyo free account; send Claude the public site key and the list ID for sign-ups
- [ ] Connect Cloudflare Pages to the repo after #1 merges (steps in `README.md`)
- [ ] Decide whether this repo should be private (see below)

## Decide: should this repo be private?

`whv3rd/springboard` is public. The planning docs in it (`docs/SPRINGBOARD_HANDOFF.md`, `docs/concept.md`, `CLAUDE.md`) mention your employer by name and include internal plans. If that shouldn't be public, make the repo private in GitHub settings. Cloudflare Pages and Claude both work with private repos. Alternatively, Claude can remove the employer name from those docs.
