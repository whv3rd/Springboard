// The Springboard Score: five checkpoints rated 0–4, total × 5 → 0–100.
// Tables from docs/site-blueprint.md. The quiz questions live in ./score-questions.ts.
//
// Everything here is pure (no DOM, no Astro imports) so `npm test` can load this
// file directly with Node's built-in TypeScript type stripping.

import type { Track } from './path';

/** Every Path track except Start here builds one checkpoint. */
export type CheckpointTrack = Exclude<Track, 'start-here'>;

export interface Checkpoint {
  number: number;
  name: string;
  description: string;
  /** The Path track that builds this checkpoint. */
  track: CheckpointTrack;
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

export const MIN_RATING = 0;
export const MAX_RATING = 4;
/** Each rating point is worth 5, so five checkpoints at 4 make 100. */
export const POINTS_PER_RATING = 5;

function assertRating(value: number): void {
  if (!Number.isInteger(value) || value < MIN_RATING || value > MAX_RATING) {
    throw new RangeError(
      `Rating must be an integer from ${MIN_RATING} to ${MAX_RATING}, got ${value}`,
    );
  }
}

/**
 * One checkpoint's rating from its question answers (each 0–4).
 *
 * Rounding: the mean is rounded to the nearest integer, with halves rounding UP
 * (Math.round). So answers of 2 and 3 (mean 2.5) rate 3, and 1, 1, 2 (mean 1.33)
 * rates 1. Only a checkpoint with an even number of questions can land on a half.
 */
export function checkpointRating(answers: readonly number[]): number {
  if (answers.length === 0) throw new RangeError('A checkpoint needs at least one answer');
  answers.forEach(assertRating);
  const mean = answers.reduce((sum, a) => sum + a, 0) / answers.length;
  return Math.round(mean);
}

function assertRatings(ratings: readonly number[]): void {
  if (ratings.length !== CHECKPOINTS.length) {
    throw new RangeError(`Expected ${CHECKPOINTS.length} ratings, got ${ratings.length}`);
  }
  ratings.forEach(assertRating);
}

/** Sum of the five checkpoint ratings × 5 → 0–100. Always a multiple of 5. */
export function totalScore(ratings: readonly number[]): number {
  assertRatings(ratings);
  return ratings.reduce((sum, r) => sum + r, 0) * POINTS_PER_RATING;
}

/**
 * The level for a score. Totals are multiples of 5, so in practice the bands are
 * 0–25, 30–50, 55–75, 80–95 and exactly 100. Every level is reachable.
 */
export function levelFor(score: number): Level {
  const level = LEVELS.find((l) => score >= l.min && score <= l.max);
  if (!level) throw new RangeError(`Score must be from 0 to 100, got ${score}`);
  return level;
}

/** The lowest-rated checkpoint. Ties go to the earliest checkpoint in order. */
export function weakestCheckpoint(ratings: readonly number[]): Checkpoint {
  assertRatings(ratings);
  let weakest = 0;
  ratings.forEach((r, i) => {
    if (r < ratings[weakest]) weakest = i;
  });
  return CHECKPOINTS[weakest];
}

export interface ScoreResult {
  /** One rating per checkpoint, in order. Never shown in the free result (that's the gap report). */
  ratings: number[];
  total: number;
  level: Level;
  weakest: Checkpoint;
}

/** Five checkpoint ratings → the full result. */
export function resultFromRatings(ratings: readonly number[]): ScoreResult {
  const total = totalScore(ratings);
  return {
    ratings: [...ratings],
    total,
    level: levelFor(total),
    weakest: weakestCheckpoint(ratings),
  };
}

/** True when every checkpoint is rated 4: there is no gap to point at. */
export function isAllClear(result: ScoreResult): boolean {
  return result.ratings.every((r) => r === MAX_RATING);
}

/** Value for Klaviyo's `weakest_checkpoint`: the track slug, or `none` on a perfect score. */
export function weakestCheckpointProperty(result: ScoreResult): string {
  return isAllClear(result) ? 'none' : result.weakest.track;
}

/** Answers grouped by checkpoint, in checkpoint order → the full result. */
export function scoreAnswers(answersByCheckpoint: readonly (readonly number[])[]): ScoreResult {
  return resultFromRatings(answersByCheckpoint.map(checkpointRating));
}
