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

export const PILLARS = ['diary', 'teardown', 'playbook', 'shift'] as const;
export type Pillar = (typeof PILLARS)[number];
