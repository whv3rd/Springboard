# Springspot — Concept

Source: `docs/SPRINGBOARD_HANDOFF.md` §1.

## What Springspot is

Springspot is a **threshold a business reaches, not a product it buys**. It is the point where a small or mid-sized ecommerce business has its design, platform and marketing systems connected to AI through MCPs, so one operator or a small team can run what used to take dev teams, merchandisers and creatives.

- **Brand:** lives under **Springs** (Springs Consulting / Springs Digital — name not final).
- **Owner:** Will Vinton. About 18 years in ecommerce; deep on Shopify, Magento and Salesforce; consulting work behind more than $1.5B in realized ecommerce revenue. Leads Digital Experience & Technology at Mishimoto and runs the Brecks Brothers brand portfolio, where he is building to Springspot now.
- **Audience:** solo owner-operators, directors of ecommerce at mid-sized brands, and freelance operators.
- **Promise:** less vendor dependence, faster execution, same platforms they already use.
- **Voice:** practitioner, not pundit. Real workflows, real screenshots, real numbers.

## The Springspot Stack

**It's not our stack, it's theirs.** Springspot is a standard a business's own stack meets, not software it rents from us. The owner keeps every account and every connection.

The Springspot Stack is the minimum Springspot runs on, and a core selling point.

**Public copy names no products and no prices.** It says the stack covers design, development, the store, email and SMS, and reviews for roughly $100 a month to start; that owners can bring their own tools; and that missing pieces are layered in based on business requirements, not anyone's favourites, in the Springspot Startup. The breakdown below is internal reference only:

| Job                           | Tool                    | To start           |
| ----------------------------- | ----------------------- | ------------------ |
| AI operator and developer     | Claude Pro              | $20/month          |
| Design system and page design | Figma Professional seat | ~$20/month         |
| Store, checkout and catalog   | Shopify Basic           | ~$39/month         |
| Email and SMS automation      | Klaviyo                 | free tier to start |
| Product reviews               | Judge.me                | free plan to start |
| **Total**                     |                         | **~$100/month**    |

Claude Pro checked 2026-11-09; the rest need confirming (see `review-queue.md`).

- **Why it sells:** a one-person store gets design, development, marketing automation and reviews for tens of dollars a month per tool, instead of enterprise platforms like Salesforce Commerce Cloud or Adobe Experience Manager that are typically licensed in the six figures a year.
- **Start minimum, automate, then scale:** start on the cheapest plan of each tool, connect it to Claude, automate the routine work, and move up a plan only when revenue or volume asks for it. No replatforming.
- **Cheap stacks make cheap iterations:** the bigger win is how cheap it is to change course. Iteration often happens before launch, while the operator is still learning; we reserve the right to get smarter along the way.
- **Audience:** the roughly 33 million US small businesses (SBA), most with no employees; Springspot serves the ones that sell online.
- **The seal:** reaching the top Score level makes a stack **Springspot-ready** (see `site-blueprint.md`).
- Post: `src/content/blog/the-springspot-stack.md`.

## The Springspot Startup

The entry package Will sells: where working together begins. Page: `/startup`.

1. **Assess the business** — starting from the Springspot Score and the business's requirements.
2. **Plan the Springspot Stack** — keep the tools that do the job; layer in missing pieces chosen for the business's requirements.
3. **Set it up and connect it to AI** — design system, store and catalog, email and SMS, reviews.
4. **Hand over the processes** — core workflows written down and repeatable, leading into the Springspot Path.

Price, scope and timeline are open (see `review-queue.md`). Springspot Advisory is the ongoing, done-with-you help after the Startup.

## Branded terms

Named Springspot things are brands: **Springspot Score**, **Springspot Stack**, **Springspot Startup**, **Springspot Path**, **Springspot Standard**, **Springspot Advisory** and **Springspot-ready** (plus the short forms "the Score" and "the Path"). Every mention in body copy is bold and colour-coded by family: score (brick: Score, Springspot-ready), stack (teal: Stack, Standard), path (amber: Startup, Path, Advisory). It is automatic for Markdown and frontmatter text (`src/lib/brand-terms.ts`); hand-written Astro copy uses `<BrandText>`. Nav labels, buttons, eyebrows and titles stay plain.

## Tiers of operation

| Tier   | Who runs it                                      | Who it serves             |
| ------ | ------------------------------------------------ | ------------------------- |
| Small  | A single operator                                | A solo owner-entrepreneur |
| Medium | Director of ecommerce plus a couple of operators | A mid-sized business      |

## The five checkpoints (the Springspot foundation)

1. **Design system** — design system, component library and every page template in Figma.
2. **AI ↔ design** — Claude connected to Figma, producing on-system pages and assets.
3. **Platform MCP** — store platform and full catalog connected to Claude (proven on Shopify so far).
4. **Marketing MCP** — Klaviyo connected for campaigns, flows and segments.
5. **Processes** — core workflows mapped, run through MCPs, repeatable by any operator.
