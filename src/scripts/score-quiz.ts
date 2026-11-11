// The Score quiz on /score: stepper, email gate, Klaviyo, result.
// Markup is rendered at build time in src/pages/score.astro; scoring is in src/lib/score.ts.

import { PUBLIC_KLAVIYO_LIST_ID, PUBLIC_KLAVIYO_SITE_KEY } from 'astro:env/client';
import { SCORE_FORM, track } from '@/lib/analytics';
import { hasKlaviyoConfig, subscribe } from '@/lib/klaviyo';
import {
  CHECKPOINTS,
  isAllClear,
  resultFromRatings,
  scoreAnswers,
  weakestCheckpointProperty,
} from '@/lib/score';
import type { ScoreResult } from '@/lib/score';

// Pre-rename key, kept so returning visitors keep their saved answers.
const STORAGE_KEY = 'springspot:score';
// Results saved before the rename live under the old key; recall() moves them over.
const OLD_STORAGE_KEY = 'springboard:score';
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
  const honeypot = quiz.querySelector<HTMLInputElement>('[data-honeypot]');

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
    if (message) {
      track('form_error', {
        ...SCORE_FORM,
        field_name: 'email',
        error_type: value ? 'invalid_format' : 'required',
      });
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

  /** What happened to the email: sent to Klaviyo, failed, skipped (bot), or no Klaviyo config. */
  async function sendToKlaviyo(
    email: string,
    score: ScoreResult,
  ): Promise<'sent' | 'failed' | 'bot' | 'unconfigured'> {
    // A filled honeypot means a bot: show the result, send nothing.
    if (honeypot?.value) return 'bot';
    if (!hasKlaviyoConfig(klaviyo)) {
      if (!warnedNoKlaviyo) {
        console.warn(
          'Springspot Score: PUBLIC_KLAVIYO_SITE_KEY / PUBLIC_KLAVIYO_LIST_ID not set; not sending to Klaviyo.',
        );
        warnedNoKlaviyo = true;
      }
      return 'unconfigured';
    }
    const ok = await subscribe(klaviyo, email, {
      springspot_score: score.total,
      springspot_level: score.level.name,
      weakest_checkpoint: weakestCheckpointProperty(score),
    });
    return ok ? 'sent' : 'failed';
  }

  /** Analytics for a finished quiz: the band and weakest checkpoint, never the email. */
  function trackCompletion(score: ScoreResult, outcome: Awaited<ReturnType<typeof sendToKlaviyo>>) {
    if (outcome === 'bot') return;
    if (outcome === 'failed') {
      track('form_error', { ...SCORE_FORM, field_name: 'form', error_type: 'submit_failed' });
    } else {
      track('form_submit', SCORE_FORM);
      if (outcome === 'sent')
        track('generate_lead', { lead_source: 'springspot_score', form_id: 'score' });
    }
    track('score_complete', {
      score_total: score.total,
      score_level: score.level.name,
      weakest_checkpoint: weakestCheckpointProperty(score),
    });
  }

  function showResult(score: ScoreResult, moveFocus = true): void {
    const allClear = isAllClear(score);
    $<HTMLElement>(result, '[data-total]').textContent = String(score.total);
    $<HTMLElement>(result, '[data-level-name]').textContent = score.level.name;
    $<HTMLElement>(result, '[data-level-meaning]').textContent = `${score.level.meaning}.`;
    result.querySelectorAll<HTMLElement>('[data-level-art]').forEach((el) => {
      el.hidden = el.dataset.levelArt !== score.level.name;
    });
    $<HTMLElement>(result, '[data-weakest-name]').textContent = score.weakest.name;
    $<HTMLElement>(result, '[data-weakest-line]').hidden = allClear;
    const shown = allClear ? 'all-clear' : score.weakest.track;
    result.querySelectorAll<HTMLElement>('[data-next-step]').forEach((el) => {
      el.hidden = el.dataset.nextStep !== shown;
    });

    // Clicks on the result's next steps carry the band (analytics.js reads these off the area).
    result.dataset.trackScoreLevel = score.level.name;
    result.dataset.trackScoreTotal = String(score.total);
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
      const old = localStorage.getItem(OLD_STORAGE_KEY);
      if (old !== null) {
        if (localStorage.getItem(STORAGE_KEY) === null) localStorage.setItem(STORAGE_KEY, old);
        localStorage.removeItem(OLD_STORAGE_KEY);
      }
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
      const stepInfo = { step_number: current + 1, step_name: CHECKPOINTS[current]?.name };
      if (validateStep(steps[current])) {
        track('score_step', stepInfo);
        showStep(current + 1);
      } else {
        track('form_error', {
          ...SCORE_FORM,
          ...stepInfo,
          field_name: 'checkpoint_answers',
          error_type: 'required',
        });
      }
      return;
    }

    if (submitting || !validateEmail()) return;
    submitting = true;
    nextButton.disabled = true;
    nextButton.setAttribute('aria-busy', 'true');
    nextButton.textContent = 'Working out your score…';

    const score = collectResult();
    track('score_step', { step_number: current + 1, step_name: 'email' });
    let outcome: Awaited<ReturnType<typeof sendToKlaviyo>> = 'failed';
    try {
      outcome = await sendToKlaviyo(emailInput.value.trim(), score);
    } finally {
      trackCompletion(score, outcome);
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
  let started = false;
  form.addEventListener('change', (event) => {
    if (!started && (event.target as HTMLElement).closest('[data-question]')) {
      started = true;
      track('score_start');
    }
    const fieldset = (event.target as HTMLElement).closest('[data-question]');
    fieldset?.classList.remove('is-missing');
    if (!steps[current].querySelector('.is-missing')) stepError.textContent = '';
  });

  $<HTMLButtonElement>(result, '[data-retake]').addEventListener('click', () => {
    started = false;
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
