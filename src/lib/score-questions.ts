// DRAFT COPY for Will: every question, answer and next step in this file.
// The final Score questions and weighting are an open decision (see CLAUDE.md).
//
// How to edit:
// - Questions are grouped by checkpoint, in checkpoint order (1–5). Keep 2–3 per checkpoint.
// - Every question has exactly five answers, listed in order of the 0–4 rating they
//   score (see RATINGS in ./score.ts). Write them as situations an operator recognises,
//   not as the rating labels.
// - Each checkpoint's rating is the mean of its answers, rounded (see checkpointRating).
//   Changing the number of questions changes the weighting inside that checkpoint only.
// - `npm test` checks the shape of this file.

import type { CheckpointTrack } from './score';

export interface Question {
  /** Stable id, used as the form field name. Change it only if the question changes meaning. */
  id: string;
  prompt: string;
  /** Exactly five answers. answers[n] scores n. */
  answers: readonly [string, string, string, string, string];
}

/** Questions per checkpoint, in checkpoint order (index 0 = checkpoint 1). */
export const QUESTIONS: readonly (readonly Question[])[] = [
  // 1. Design system
  [
    {
      id: 'ds-tokens',
      prompt: 'Where do your brand colours, type and spacing rules live?',
      answers: [
        'Nowhere written down. Whoever builds the page picks them.',
        'A brand guide PDF or a few loose Figma files, partly out of date.',
        'Variables and styles in one Figma file the team works from.',
        'Variables in Figma, and an AI tool has pulled them in for a page or two.',
        'Variables in Figma, and every new page or asset is built from them, by people or AI.',
      ],
    },
    {
      id: 'ds-components',
      prompt: 'You need a new section on the site, like a promo banner. What happens?',
      answers: [
        'We brief an agency or developer and wait.',
        'Someone copies an old section and tweaks it by hand.',
        'We put it together from our Figma component library, then a developer builds it.',
        'We start from our Figma components, and sometimes have AI draft it from them.',
        'AI puts it together from our component library by default. We review and ship.',
      ],
    },
    {
      id: 'ds-templates',
      prompt:
        'How many of your page templates (home, collection, product, landing, cart) are designed in Figma?',
      answers: [
        'None. The live theme is the only version.',
        'One or two, left over from the last redesign.',
        'All of them, kept in step with the live site.',
        'All of them, and AI reads them when we ask it to.',
        'All of them, and AI works from them every time a page changes.',
      ],
    },
  ],
  // 2. AI ↔ design
  [
    {
      id: 'aid-connected',
      prompt: 'Is an AI assistant (Claude or similar) connected to your Figma files?',
      answers: [
        "No, and we haven't looked into it.",
        "We've pasted screenshots into a chat, but nothing is connected.",
        "We have the AI account and a tidy Figma file, but they aren't connected.",
        'Yes, through an MCP server or plugin. We use it now and then.',
        "Yes, and it's part of the weekly routine for pages and assets.",
      ],
    },
    {
      id: 'aid-first-draft',
      prompt:
        'The last time you needed a landing page or a set of ad creatives, who made the first draft?',
      answers: [
        'An agency or freelancer, from a brief.',
        'We did, by hand, with an AI image or copy tool on the side.',
        'We did, in Figma, from our own components. No AI involved.',
        'AI drafted it in Figma from our components. We fixed a fair bit.',
        'AI drafted it on-system. We reviewed it and shipped it the same day.',
      ],
    },
  ],
  // 3. Platform MCP
  [
    {
      id: 'plat-access',
      prompt:
        'Can an AI assistant read and update your store (products, collections, orders) directly?',
      answers: [
        'No. Everything goes through the admin or a developer.',
        'We export CSVs and paste them into a chat now and then.',
        'Our store data is clean and structured, but no AI is connected to it.',
        'Yes, through an MCP server or API connection. We use it for some jobs.',
        "Yes, and it's how we do routine catalog and merchandising work.",
      ],
    },
    {
      id: 'plat-catalog',
      prompt:
        'How complete is your catalog data: titles, descriptions, attributes, images and custom fields?',
      answers: [
        'Patchy. Lots of gaps and duplicates.',
        'Fine on the best sellers, thin everywhere else.',
        'Complete and consistent, maintained by hand.',
        'Complete, and AI fills or fixes gaps when we ask it to.',
        'Complete, and AI keeps it that way as products are added.',
      ],
    },
  ],
  // 4. Marketing MCP
  [
    {
      id: 'mkt-campaigns',
      prompt:
        'How do campaigns get built in your email and SMS platform (Klaviyo, Mailchimp or similar)?',
      answers: [
        "We don't send regular campaigns yet.",
        "Ad hoc. Someone writes one when there's time.",
        'On a calendar, built by hand or by an agency.',
        'AI connected to the platform drafts some campaigns or segments.',
        'AI connected to the platform builds most campaigns and segments. We approve them.',
      ],
    },
    {
      id: 'mkt-flows',
      prompt: 'How are your automated flows (welcome, abandoned cart, post-purchase) looked after?',
      answers: [
        "We don't have any running.",
        'A welcome flow from setup that nobody has touched since.',
        'A full set, reviewed and tuned by hand.',
        'A full set, and AI with access to the account audits or edits them sometimes.',
        'A full set, and AI with access to the account reviews and updates them on a schedule.',
      ],
    },
  ],
  // 5. Processes
  [
    {
      id: 'proc-documented',
      prompt:
        'Are your core workflows (product launch, promo, restock, weekly reporting) written down?',
      answers: [
        "No. They live in people's heads.",
        'A few, scattered across docs and messages.',
        'Yes, as step-by-step docs the team follows.',
        'Yes, and some of the steps run through AI connected to our tools.',
        'Yes, and they run end to end through AI connected to our tools.',
      ],
    },
    {
      id: 'proc-cover',
      prompt: 'If your main operator was out for two weeks, what would happen?',
      answers: [
        'Most things would stop.',
        'The urgent work would get done, slowly.',
        'Someone else could follow the docs and keep things running.',
        'Someone else could run the main workflows, with AI doing part of the work.',
        'Anyone on the team could run every core workflow through AI and get the same result.',
      ],
    },
    {
      id: 'proc-reporting',
      prompt: 'How does your weekly trading report get made?',
      answers: [
        "We don't have one.",
        'Pulled together from exports when someone has a spare few hours.',
        'A fixed template, filled in by hand every week.',
        'Some weeks, AI pulls it together from our connected tools.',
        'Every week, AI produces it from our connected tools. We read it and act.',
      ],
    },
  ],
];

/** One next step per checkpoint, shown when it's the weakest. Keyed by track slug. */
export const NEXT_STEPS: Record<CheckpointTrack, string> = {
  'design-system':
    'Put your colours, type and spacing into Figma variables, then build the components your top three page templates use.',
  'ai-design':
    'Connect Claude to your Figma file and have it draft one landing page from your own components.',
  'platform-mcp':
    'Connect your store platform to Claude and hand it one catalog job you currently do by hand.',
  'marketing-mcp':
    "Connect your email platform to Claude and have it draft next week's campaign and one segment.",
  processes:
    'Write down one weekly workflow step by step, then run it through the tools you have connected.',
};
