// Shared vocabulary for the Path, the Score and the blog.
// See docs/site-blueprint.md for what each of these means.

export const ACCESS = ['free', 'paid'] as const;
export type Access = (typeof ACCESS)[number];

export const TRACKS = [
  'start-here',
  'design-system',
  'ai-design',
  'platform-mcp',
  'marketing-mcp',
  'processes',
] as const;
export type Track = (typeof TRACKS)[number];

export const PARTS = [
  'overview',
  'requirements',
  'build-guide',
  'templates',
  'workflows',
  'checklist',
] as const;
export type Part = (typeof PARTS)[number];

// Default access per part, from the paywall rule: what/why is free, how-to-build is paid.
export const PART_ACCESS: Record<Part, Access> = {
  overview: 'free',
  requirements: 'free',
  'build-guide': 'paid',
  templates: 'paid',
  workflows: 'paid',
  checklist: 'free',
};

export const PART_LABELS: Record<Part, string> = {
  overview: 'Overview',
  requirements: 'Requirements',
  'build-guide': 'Build guide',
  templates: 'Templates and assets',
  workflows: 'Workflows',
  checklist: 'Checklist',
};

export interface TrackInfo {
  title: string;
  description: string;
  /** The Springboard checkpoint this track builds. Start here has none. */
  checkpoint: number | null;
  /** The parts this track is made of, in reading order. */
  parts: readonly Part[];
}

// Track names from docs/site-blueprint.md; descriptions from the checkpoints in docs/concept.md.
export const TRACK_INFO: Record<Track, TrackInfo> = {
  'start-here': {
    title: 'Start here',
    description: 'How the Path is organized, and which track to start with.',
    checkpoint: null,
    // A short guide that sits above the tracks, not a six-part track.
    parts: ['overview'],
  },
  'design-system': {
    title: 'Design system in Figma',
    description: 'Design system, component library and every page template in Figma.',
    checkpoint: 1,
    parts: PARTS,
  },
  'ai-design': {
    title: 'Connect Claude to Figma',
    description: 'Claude connected to Figma, producing on-system pages and assets.',
    checkpoint: 2,
    parts: PARTS,
  },
  'platform-mcp': {
    title: 'Platform MCP (Shopify first)',
    description: 'Store platform and full catalog connected to Claude. Proven on Shopify so far.',
    checkpoint: 3,
    parts: PARTS,
  },
  'marketing-mcp': {
    title: 'Marketing MCP (Klaviyo)',
    description: 'Klaviyo connected to Claude for campaigns, flows and segments.',
    checkpoint: 4,
    parts: PARTS,
  },
  processes: {
    title: 'Process mapping and automation',
    description: 'Core workflows mapped, run through MCPs, repeatable by any operator.',
    checkpoint: 5,
    parts: PARTS,
  },
};

export function trackHref(track: Track): string {
  return `/path/${track}`;
}

export function partHref(track: Track, part: Part): string {
  return `/path/${track}/${part}`;
}

export const PILLARS = ['diary', 'teardown', 'playbook', 'shift'] as const;
export type Pillar = (typeof PILLARS)[number];

export const PILLAR_LABELS: Record<Pillar, string> = {
  diary: 'Operator diaries',
  teardown: 'Teardowns',
  playbook: 'Playbooks',
  shift: 'The shift',
};
