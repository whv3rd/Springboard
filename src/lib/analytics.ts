// Bridge to the shared tracking helper. window.wvTrack comes from /analytics.js, which
// willvinton.com serves and the deploy adds to every Springspot page (see TRACKING.md in
// whv3rd/willvinton.com). In `astro dev`, or if it's blocked, this does nothing.
// Parameters are snake_case and never carry what someone typed.

export type TrackParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    wvTrack?: (event: string, params?: TrackParams) => void;
  }
}

export function track(event: string, params: TrackParams = {}): void {
  try {
    window.wvTrack?.(event, params);
  } catch {
    // Analytics must never break the page.
  }
}

export const SCORE_FORM = { form_id: 'score', form_name: 'Springspot Score' } as const;
export const STACK_FORM = {
  form_id: 'stack_breakdown',
  form_name: 'Springspot Stack breakdown',
} as const;
