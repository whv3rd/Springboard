// Not type-checked: astro check has no Node types (no @types/node in the project).
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

// Editorial review notes in content, written as `<!-- WILL: question -->`.
const REVIEW_NOTE = /<!--\s*WILL:[\s\S]*?-->\n?/g;

/**
 * Removes review notes from the built HTML and XML. Markdown keeps HTML comments in
 * its output, so without this they would ship (hidden, but readable in the source).
 */
export default function stripReviewNotes() {
  return {
    name: 'strip-review-notes',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const files = await readdir(root, { recursive: true });
        let stripped = 0;
        for (const file of files) {
          if (!/\.(html|xml)$/.test(file)) continue;
          const path = join(root, file);
          const html = await readFile(path, 'utf8');
          const clean = html.replace(REVIEW_NOTE, '');
          if (clean !== html) {
            await writeFile(path, clean);
            stripped++;
          }
        }
        logger.info(`Removed review notes from ${stripped} file(s)`);
      },
    },
  };
}
