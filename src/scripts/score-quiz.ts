// The Score quiz on /score: stepper, email gate, Klaviyo, result.
// Markup is rendered at build time in src/pages/score.astro; scoring is in src/lib/score.ts.

import { PUBLIC_KLAVIYO_LIST_ID, PUBLIC_KLAVIYO_SITE_KEY } from 'astro:env/client';
import { hasKlaviyoConfig, subscribe } from '@/lib/klaviyo';
import {
  CHECKPOINTS,
  isAllClear,
  resultFromRatings,
  scoreAnswers,
  weakestCheckpointProperty,
} from '@/lib/score';
import type { ScoreResult } from '@/lib/score';

const STORAGE_KEY = 'springboard:score';
// Loose on purpose: the browser's type=email check accepts `a@b`, this also wants a dot.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const klaviyo = { siteKey: PUBLIC_KLAVIYO_SITE_KEY, listId: PUBLIC_KLAVIYO_LIST_ID };
let warnedNoKlaviyo = false;

function $<T extends Element>(root: ParentNode, selector: string): T {
  const el = root.querySelector<T>(selector);
  if (!el) throw new Error(`Score quiz: missing ${selector}`);
  return el;
}

function init(): void {
  const quiz = document.querySelector<HTMLElement>('[data-quiz]');
  if (!quiz) return;

  const form = $<HTMLFormElement>(quiz, '[data-form]');
  const steps = [...form.querySelectorAll<HTMLElement>('[data-step]')];
  const progress = $<HTMLElement>(quiz, '[data-progress]');
  const progressBar = $<HTMLElement>(quiz, '[data-progress-bar]');
  const stepError = $<HTMLElement>(quiz, '[data-step-error]');
  const backButton = $<HTMLButtonElement>(quiz, '[data-back]');
  const nextButton = $<HTMLButtonElement>(quiz, '[data-next]');
  const emailInput = $<HTMLInputElement>(quiz, '[data-email]');
  const emailError = $<HTMLElement>(quiz, '[data-email-error]');
  const result = $<HTMLElement>(quiz, '[data-result]');

  const checkpointSteps = CHECKPOINTS.length;
  const emailStep = steps.length - 1;
  let current = 0;
  let submitting = false;

  function showStep(index: number, moveFocus = true): void {
    current = index;
    steps.forEach((step, i) => (step.hidden = i !== index));
    stepError.textContent = '';
    backButton.hidden = index === 0;
    nextButton.textContent = index === emailStep ? 'See my result' : 'Next';

    const done = Math.min(index, checkpointSteps);
    progressBar.style.setProperty('--progress', `${(done / checkpointSteps) * 100}%`);
    progress.textContent =
      index < checkpointSteps
        ? `Step ${index + 1} of ${checkpointSteps}: ${CHECKPOINTS[index].name}`
        : 'Last step: your email';

    if (moveFocus) $<HTMLElement>(steps[index], '.quiz__title').focus();
  }

  /** The checked value of every question in a step, or null for unanswered ones. */
  function stepAnswers(step: HTMLElement): (number | null)[] {
    return [...step.querySelectorAll<HTMLFieldSetElement>('[data-question]')].map((fieldset) => {
      const checked = fieldset.querySelector<HTMLInputElement>('input:checked');
      return checked ? Number(checked.value) : null;
    });
  }

  function validateStep(step: HTMLElement): boolean {
    const fieldsets = [...step.querySelectorAll<HTMLFieldSetElement>('[data-question]')];
    const missing = fieldsets.filter((f) => !f.querySelector('input:checked'));
    fieldsets.forEach((f) => f.classList.toggle('is-missing', missing.includes(f)));
    if (missing.length === 0) return true;

    stepError.textContent =
      missing.length === 1
        ? 'Answer the question marked below to continue.'
        : `Answer the ${missing.length} questions marked below to continue.`;
    missing[0].querySelector<HTMLInputElement>('input')?.focus();
    return false;
  }

  function validateEmail(): boolean {
    const value = emailInput.value.trim();
    let message = '';
    if (!value) message = 'Enter your email address to see your result.';
    else if (!emailInput.checkValidity() || !EMAIL_PATTERN.test(value)) {
      message = 'Enter a valid email address, like name@example.com.';
    }
    emailInput.setAttribute('aria-invalid', String(Boolean(message)));
    emailError.textContent = message;
    emailError.hidden = !message;
    if (message) emailInput.focus();
    return !message;
  }

  function collectResult(): ScoreResult {
    const answers = steps.slice(0, checkpointSteps).map((step) => stepAnswers(step) as number[]);
    return scoreAnswers(answers);
  }

  async function sendToKlaviyo(email: string, score: ScoreResult): Promise<void> {
    if (!hasKlaviyoConfig(klaviyo)) {
      if (!warnedNoKlaviyo) {
        console.warn(
          'Springboard Score: PUBLIC_KLAVIYO_SITE_KEY / PUBLIC_KLAVIYO_LIST_ID not set; not sending to Klaviyo.',
        );
        warnedNoKlaviyo = true;
      }
      return;
    }
    await subscribe(klaviyo, email, {
      springboard_score: score.total,
      springboard_level: score.level.name,
      weakest_checkpoint: weakestCheckpointProperty(score),
    });
  }

  function showResult(score: ScoreResult, moveFocus = true): void {
    const allClear = isAllClear(score);
    $<HTMLElement>(result, '[data-total]').textContent = String(score.total);
    $<HTMLElement>(result, '[data-level-name]').textContent = score.level.name;
    $<HTMLElement>(result, '[data-level-meaning]').textContent = `${score.level.meaning}.`;
    $<HTMLElement>(result, '[data-weakest-name]').textContent = score.weakest.name;
    $<HTMLElement>(result, '[data-weakest-line]').hidden = allClear;
    const shown = allClear ? 'all-clear' : score.weakest.track;
    result.querySelectorAll<HTMLElement>('[data-next-step]').forEach((el) => {
      el.hidden = el.dataset.nextStep !== shown;
    });

    form.hidden = true;
    result.hidden = false;
    if (moveFocus) $<HTMLElement>(result, '#result-title').focus();
  }

  function remember(score: ScoreResult): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ratings: score.ratings }));
    } catch {
      // Storage blocked or full: the result just isn't remembered.
    }
  }

  function recall(): ScoreResult | null {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null');
      return stored ? resultFromRatings(stored.ratings) : null;
    } catch {
      // Missing, malformed or from an older version: start fresh.
      return null;
    }
  }

  function forget(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing to clean up.
    }
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (current < emailStep) {
      if (validateStep(steps[current])) showStep(current + 1);
      return;
    }

    if (submitting || !validateEmail()) return;
    submitting = true;
    nextButton.disabled = true;
    nextButton.setAttribute('aria-busy', 'true');
    nextButton.textContent = 'Working out your score…';

    const score = collectResult();
    try {
      await sendToKlaviyo(emailInput.value.trim(), score);
    } finally {
      // The result shows whatever happened with Klaviyo.
      remember(score);
      showResult(score);
      submitting = false;
      nextButton.disabled = false;
      nextButton.removeAttribute('aria-busy');
    }
  });

  backButton.addEventListener('click', () => {
    if (current > 0) showStep(current - 1);
  });

  // Clear a question's "needs an answer" mark as soon as it's answered.
  form.addEventListener('change', (event) => {
    const fieldset = (event.target as HTMLElement).closest('[data-question]');
    fieldset?.classList.remove('is-missing');
    if (!steps[current].querySelector('.is-missing')) stepError.textContent = '';
  });

  $<HTMLButtonElement>(result, '[data-retake]').addEventListener('click', () => {
    forget();
    form.reset();
    form.querySelectorAll('.is-missing').forEach((el) => el.classList.remove('is-missing'));
    emailInput.removeAttribute('aria-invalid');
    emailError.hidden = true;
    result.hidden = true;
    form.hidden = false;
    showStep(0);
  });

  quiz.hidden = false;
  const last = recall();
  if (last) showResult(last, false);
  else showStep(0, false);
}

init();
