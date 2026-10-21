// The Springboard Score: five checkpoints rated 0–4, total × 5 → 0–100.
// Tables from docs/site-blueprint.md. The interactive quiz arrives in M3.

import type { Track } from './path';

export interface Checkpoint {
  number: number;
  name: string;
  description: string;
  /** The Path track that builds this checkpoint. */
  track: Track;
}

// From docs/concept.md, "The five checkpoints".
export const CHECKPOINTS: Checkpoint[] = [
  {
    number: 1,
    name: 'Design system',
    description: 'Design system, component library and every page template in Figma.',
    track: 'design-system',
  },
  {
    number: 2,
    name: 'AI ↔ design',
    description: 'Claude connected to Figma, producing on-system pages and assets.',
    track: 'ai-design',
  },
  {
    number: 3,
    name: 'Platform MCP',
    description: 'Store platform and full catalog connected to Claude (proven on Shopify so far).',
    track: 'platform-mcp',
  },
  {
    number: 4,
    name: 'Marketing MCP',
    description: 'Klaviyo connected for campaigns, flows and segments.',
    track: 'marketing-mcp',
  },
  {
    number: 5,
    name: 'Processes',
    description: 'Core workflows mapped, run through MCPs, repeatable by any operator.',
    track: 'processes',
  },
];

export interface Rating {
  value: number;
  meaning: string;
}

export const RATINGS: Rating[] = [
  { value: 0, meaning: 'Not started' },
  { value: 1, meaning: 'Partial, ad hoc' },
  { value: 2, meaning: 'In place, not connected to AI' },
  { value: 3, meaning: 'Connected, used sometimes' },
  { value: 4, meaning: 'Connected and part of how work gets done' },
];

export interface Level {
  name: string;
  min: number;
  max: number;
  meaning: string;
}

export const LEVELS: Level[] = [
  { name: 'Grounded', min: 0, max: 25, meaning: 'Vendor-dependent; start with the design system' },
  { name: 'Loading', min: 26, max: 50, meaning: "Foundations exist but aren't connected" },
  { name: 'Coiled', min: 51, max: 75, meaning: 'Key systems connected; processes still manual' },
  { name: 'Launch-ready', min: 76, max: 95, meaning: 'Mostly automated; a few gaps to close' },
  {
    name: 'Springboard',
    min: 96,
    max: 100,
    meaning: 'One operator or a small team can run it all',
  },
];
