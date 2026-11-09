// The Springspot Stack: the jobs it covers. The public site shows the job and a one-line
// detail; the per-job breakdown (starting cost, what to look for, when to move up) sits
// behind the email gate. No product names anywhere public: tools are chosen per business
// in the Springspot Startup (see docs/concept.md for the internal reference).

export interface StackJob {
  job: string;
  detail: string;
  /** Gated: typical starting cost on a starter plan. */
  cost: string;
  /** Gated: what to look for when choosing, or keeping, a tool for this job. */
  lookFor: string;
  /** Gated: when it's worth moving up a plan. */
  moveUp: string;
}

// WILL: confirm the cost ranges. They come from the starter plans you listed, and only
// the AI plan's price was checked live (2026-11-09).
export const STACK_JOBS: StackJob[] = [
  {
    job: 'AI operator and developer',
    detail: 'Does the specialist work: pages, catalog, campaigns',
    cost: 'about $20 a month',
    lookFor:
      'One AI assistant seat that can connect to your store, design and email tools through MCP, so it works inside them rather than beside them.',
    moveUp: 'When you run it most of the day and hit usage limits.',
  },
  {
    job: 'Design system',
    detail: 'Every page and asset on-brand, without a designer on call',
    cost: 'about $15–20 a month',
    lookFor:
      'One design seat with a shared component library and an AI connection, so pages and assets are built from the system, not from scratch.',
    moveUp: 'When more than one person designs, or you need team libraries.',
  },
  {
    job: 'Store and catalog',
    detail: 'Storefront, checkout and products on a platform you own',
    cost: 'about $30–40 a month',
    lookFor:
      'A hosted platform with an open API or MCP access, your data exportable at any time, and the apps your categories need.',
    moveUp: 'When staff accounts, reporting or lower card rates start to matter at your volume.',
  },
  {
    job: 'Email and SMS automation',
    detail: 'Flows and campaigns that run on their own',
    cost: 'free to start',
    lookFor:
      'Native integration with your store, segmentation on order data, prebuilt flows (welcome, abandoned cart, post-purchase) and an API.',
    moveUp:
      'When your list outgrows the free tier; paid plans start around $20 a month, and SMS is billed per message.',
  },
  {
    job: 'Reviews and social proof',
    detail: 'Collected and shown automatically',
    cost: 'free to start',
    lookFor:
      'Automatic review requests after delivery, reviews on product pages and in email, and structured data so reviews show in search.',
    moveUp:
      'When you want photo and video reviews or more display options, usually around $15 a month.',
  },
];

export const STACK_TOTAL = 'roughly $100 a month, often less';
