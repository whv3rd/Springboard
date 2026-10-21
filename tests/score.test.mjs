// Scoring tests. Run with `npm test` (Node's built-in test runner, no dependencies).
// Plain JS so they need no @types/node; Node 22 strips the types from the .ts modules
// they import.

import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  CHECKPOINTS,
  LEVELS,
  checkpointRating,
  levelFor,
  resultFromRatings,
  scoreAnswers,
  totalScore,
  weakestCheckpoint,
} from '../src/lib/score.ts';
import { NEXT_STEPS, QUESTIONS } from '../src/lib/score-questions.ts';

const answersFor = (value) => QUESTIONS.map((qs) => qs.map(() => value));

test('all-zero answers score 0, Grounded', () => {
  const result = scoreAnswers(answersFor(0));
  assert.equal(result.total, 0);
  assert.equal(result.level.name, 'Grounded');
  assert.deepEqual(result.ratings, [0, 0, 0, 0, 0]);
});

test('all-four answers score 100, Springboard', () => {
  const result = scoreAnswers(answersFor(4));
  assert.equal(result.total, 100);
  assert.equal(result.level.name, 'Springboard');
});

test('total is the sum of ratings × 5', () => {
  assert.equal(totalScore([1, 2, 3, 4, 0]), 50);
  assert.equal(totalScore([4, 4, 4, 4, 3]), 95);
});

test('level boundaries', () => {
  const cases = [
    [0, 'Grounded'],
    [25, 'Grounded'],
    [26, 'Loading'],
    [30, 'Loading'],
    [50, 'Loading'],
    [51, 'Coiled'],
    [55, 'Coiled'],
    [75, 'Coiled'],
    [76, 'Launch-ready'],
    [80, 'Launch-ready'],
    [95, 'Launch-ready'],
    [96, 'Springboard'],
    [100, 'Springboard'],
  ];
  for (const [score, name] of cases) assert.equal(levelFor(score).name, name, `score ${score}`);
  assert.throws(() => levelFor(-5), RangeError);
  assert.throws(() => levelFor(105), RangeError);
});

test('every level is reachable with a multiple-of-5 total', () => {
  const reachable = new Set();
  for (let sum = 0; sum <= 20; sum++) reachable.add(levelFor(sum * 5).name);
  assert.deepEqual(
    [...reachable],
    LEVELS.map((l) => l.name),
  );
});

test('rating bands at each level edge', () => {
  // 25 → 30 and 50 → 55 etc. are one rating point apart.
  assert.equal(resultFromRatings([1, 1, 1, 1, 1]).level.name, 'Grounded'); // 25
  assert.equal(resultFromRatings([2, 1, 1, 1, 1]).level.name, 'Loading'); // 30
  assert.equal(resultFromRatings([2, 2, 2, 2, 2]).level.name, 'Loading'); // 50
  assert.equal(resultFromRatings([3, 2, 2, 2, 2]).level.name, 'Coiled'); // 55
  assert.equal(resultFromRatings([3, 3, 3, 3, 3]).level.name, 'Coiled'); // 75
  assert.equal(resultFromRatings([4, 3, 3, 3, 3]).level.name, 'Launch-ready'); // 80
  assert.equal(resultFromRatings([4, 4, 4, 4, 3]).level.name, 'Launch-ready'); // 95
  assert.equal(resultFromRatings([4, 4, 4, 4, 4]).level.name, 'Springboard'); // 100
});

test('checkpoint rating is the mean, rounded half up', () => {
  assert.equal(checkpointRating([2, 3]), 3); // 2.5 → 3
  assert.equal(checkpointRating([0, 1]), 1); // 0.5 → 1
  assert.equal(checkpointRating([3, 4]), 4); // 3.5 → 4
  assert.equal(checkpointRating([1, 1, 2]), 1); // 1.33 → 1
  assert.equal(checkpointRating([1, 2, 2]), 2); // 1.67 → 2
  assert.equal(checkpointRating([0, 4, 4]), 3); // 2.67 → 3
  assert.equal(checkpointRating([4]), 4);
});

test('invalid answers and ratings throw', () => {
  assert.throws(() => checkpointRating([]), RangeError);
  assert.throws(() => checkpointRating([5]), RangeError);
  assert.throws(() => checkpointRating([-1]), RangeError);
  assert.throws(() => checkpointRating([1.5]), RangeError);
  assert.throws(() => totalScore([1, 2, 3, 4]), RangeError);
});

test('weakest checkpoint is the lowest rating', () => {
  assert.equal(weakestCheckpoint([3, 4, 1, 2, 4]).track, 'platform-mcp');
  assert.equal(weakestCheckpoint([4, 4, 4, 4, 0]).track, 'processes');
});

test('weakest checkpoint ties go to the earliest checkpoint', () => {
  assert.equal(weakestCheckpoint([2, 1, 3, 1, 1]).track, 'ai-design');
  assert.equal(weakestCheckpoint([0, 0, 0, 0, 0]).track, 'design-system');
  assert.equal(weakestCheckpoint([4, 4, 4, 4, 4]).track, 'design-system');
  assert.equal(weakestCheckpoint([3, 4, 2, 4, 2]).track, 'platform-mcp');
});

test('mixed answers end to end', () => {
  // Ratings: round(1)=1, round(2.5)=3, round(1.5)=2, round(4)=4, round(2)=2 → 12 × 5 = 60.
  const result = scoreAnswers([
    [0, 1, 2],
    [2, 3],
    [1, 2],
    [4, 4],
    [1, 2, 3],
  ]);
  assert.deepEqual(result.ratings, [1, 3, 2, 4, 2]);
  assert.equal(result.total, 60);
  assert.equal(result.level.name, 'Coiled');
  assert.equal(result.weakest.track, 'design-system');
});

test('question data: 2–3 questions per checkpoint, five answers each, unique ids', () => {
  assert.equal(QUESTIONS.length, CHECKPOINTS.length);
  const ids = new Set();
  for (const questions of QUESTIONS) {
    assert.ok(questions.length >= 2 && questions.length <= 3);
    for (const q of questions) {
      assert.equal(q.answers.length, 5, q.id);
      assert.ok(!ids.has(q.id), `duplicate id ${q.id}`);
      ids.add(q.id);
    }
  }
});

test('every checkpoint has a next step', () => {
  for (const cp of CHECKPOINTS) assert.ok(NEXT_STEPS[cp.track], cp.track);
});
