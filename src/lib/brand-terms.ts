// Branded Springspot terms: the named things a reader should recognise across the
// site. Every mention in body copy is set in bold and colour-coded by family:
//   score: how you measure (Springspot Score, Springspot-ready)
//   stack: what you run (Springspot Stack, Springspot Standard)
//   path:  how you get there (Springspot Startup, Springspot Path, Springspot Advisory)
// The short forms "the Score" and "the Path" count too ("Path Team", a pricing tier,
// does not). Markdown is styled by rehypeBrandTerms; Astro copy uses <BrandText>.

export type BrandFamily = 'score' | 'stack' | 'path';

const FAMILY: Record<string, BrandFamily> = {
  'Springspot Score': 'score',
  'Springspot-ready': 'score',
  Score: 'score',
  'Springspot Stack': 'stack',
  'Springspot Standard': 'stack',
  'Springspot Startup': 'path',
  'Springspot Path': 'path',
  'Springspot Advisory': 'path',
  Path: 'path',
};

const TERM =
  /\bSpringspot(?:-ready\b| (?:Score|Stack|Startup|Path|Standard|Advisory)\b)|(?<=\b[Tt]he )(?:Score|Path)\b(?! Team)/g;

export interface Segment {
  text: string;
  family?: BrandFamily;
}

/** Splits text into plain runs and branded terms, in order. */
export function brandSegments(text: string): Segment[] {
  const out: Segment[] = [];
  let last = 0;
  for (const m of text.matchAll(TERM)) {
    const i = m.index ?? 0;
    if (i > last) out.push({ text: text.slice(last, i) });
    out.push({ text: m[0], family: FAMILY[m[0]] });
    last = i + m[0].length;
  }
  if (last < text.length) out.push({ text: text.slice(last) });
  return out;
}

export const brandClass = (family: BrandFamily) => `brand-term brand-term--${family}`;

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Escaped HTML for plain text, with branded terms wrapped in <strong>. */
export function brandHtml(text: string): string {
  return brandSegments(text)
    .map((s) =>
      s.family
        ? `<strong class="${brandClass(s.family)}">${escapeHtml(s.text)}</strong>`
        : escapeHtml(s.text),
    )
    .join('');
}

// Minimal hast shapes, so the plugin needs no extra dependencies.
interface HastText {
  type: 'text';
  value: string;
}
interface HastElement {
  type: 'element';
  tagName: string;
  properties?: Record<string, unknown>;
  children: HastNode[];
}
type HastNode = HastText | HastElement | { type: string; children?: HastNode[] };

// Inside these, a branded style would fight the element's own (links, code, labels).
const SKIP = new Set(['a', 'code', 'pre', 'script', 'style', 'strong', 'b', 'button']);

function walk(node: { children?: HastNode[] }) {
  if (!node.children) return;
  const next: HastNode[] = [];
  for (const child of node.children) {
    if (child.type === 'text') {
      for (const s of brandSegments((child as HastText).value)) {
        next.push(
          s.family
            ? {
                type: 'element',
                tagName: 'strong',
                properties: { className: ['brand-term', `brand-term--${s.family}`] },
                children: [{ type: 'text', value: s.text }],
              }
            : { type: 'text', value: s.text },
        );
      }
    } else {
      if (child.type !== 'element' || !SKIP.has((child as HastElement).tagName))
        walk(child as { children?: HastNode[] });
      next.push(child);
    }
  }
  node.children = next;
}

/** Rehype plugin: styles branded terms in Markdown and MDX content. */
export function rehypeBrandTerms() {
  return (tree: { children?: HastNode[] }) => walk(tree);
}
