// The Springspot Stack breakdown gate: email → Klaviyo → unlock in place.
// Markup: src/components/StackBreakdown.astro. Every gate on the page unlocks together,
// and the browser remembers it so a returning visitor isn't asked again.

import { PUBLIC_KLAVIYO_LIST_ID, PUBLIC_KLAVIYO_SITE_KEY } from 'astro:env/client';
import { hasKlaviyoConfig, KLAVIYO_STACK_SOURCE, subscribe } from '@/lib/klaviyo';

const STORAGE_KEY = 'springspot:stack-breakdown';
// Same loose check as the Score: the browser's type=email accepts `a@b`, this wants a dot.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const klaviyo = { siteKey: PUBLIC_KLAVIYO_SITE_KEY, listId: PUBLIC_KLAVIYO_LIST_ID };

const gates = [...document.querySelectorAll<HTMLElement>('[data-stack-gate]')];

function unlockAll(focusIn?: HTMLElement): void {
  for (const gate of gates) {
    gate.querySelector<HTMLElement>('[data-locked]')!.hidden = true;
    gate.querySelector<HTMLElement>('[data-unlocked]')!.hidden = false;
  }
  focusIn?.querySelector<HTMLElement>('[data-unlocked-title]')?.focus();
}

function remembered(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function remember(): void {
  try {
    localStorage.setItem(STORAGE_KEY, '1');
  } catch {
    // Storage blocked: it unlocks for this visit only.
  }
}

for (const gate of gates) {
  const form = gate.querySelector<HTMLFormElement>('[data-form]')!;
  const input = gate.querySelector<HTMLInputElement>('[data-email]')!;
  const error = gate.querySelector<HTMLElement>('[data-error]')!;
  const submit = gate.querySelector<HTMLButtonElement>('[data-submit]')!;
  const honeypot = gate.querySelector<HTMLInputElement>('[data-honeypot]');
  let sending = false;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (sending) return;
    const value = input.value.trim();
    const message = !value
      ? 'Enter your email address to unlock the breakdown.'
      : !input.checkValidity() || !EMAIL_PATTERN.test(value)
        ? 'Enter a valid email address, like name@example.com.'
        : '';
    input.setAttribute('aria-invalid', String(Boolean(message)));
    error.textContent = message;
    error.hidden = !message;
    if (message) {
      input.focus();
      return;
    }

    sending = true;
    submit.disabled = true;
    submit.setAttribute('aria-busy', 'true');
    try {
      if (honeypot?.value) {
        // A filled honeypot means a bot: unlock, send nothing.
      } else if (hasKlaviyoConfig(klaviyo)) {
        await subscribe(klaviyo, value, { requested: 'stack_breakdown' }, KLAVIYO_STACK_SOURCE);
      } else {
        console.warn(
          'Springspot Stack breakdown: PUBLIC_KLAVIYO_SITE_KEY / PUBLIC_KLAVIYO_LIST_ID not set; not sending to Klaviyo.',
        );
      }
    } finally {
      // Like the Score, it unlocks whatever happened with Klaviyo.
      remember();
      unlockAll(gate);
      sending = false;
      submit.disabled = false;
      submit.removeAttribute('aria-busy');
    }
  });
}

if (remembered()) unlockAll();
