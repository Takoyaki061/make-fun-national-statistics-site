// Nusantara Statistics — hand-in program (Node 22, standard library only).
//
// The site is plain static files in app/ next to this file: an index.html
// that opens in desktop Chrome and on a phone, ES modules and CSS, no build
// step, nothing loaded over the network. This program hands it in: it copies
// app/ and screenshots/ from beside this file to /output and writes
// /output/dossier.json, the summary the judge reads (the screenshots, the
// first load's files and bytes, and the source), with the vendored make.fun
// library. vendor/makefun-frontend.ts is the kit's copy, unchanged: the
// scorer rebuilds the dossier with its own copy and compares byte for byte.
//
// Serve the site locally with `node serve.ts`, then open http://localhost:8080.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildDossier } from './vendor/makefun-frontend.ts';

const here = fileURLToPath(new URL('.', import.meta.url));
const out = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// Fail loudly instead of handing in an empty site: the first local grade
// ran silently, so a missing app/index.html would only have shown up as a
// failed dossier later. Check the entry files exist before copying.
const appDir = join(here, 'app');
if (!existsSync(join(appDir, 'index.html'))) {
  throw new Error(`app/index.html is missing in ${appDir}; nothing to hand in`);
}

mkdirSync(out, { recursive: true });
cpSync(appDir, join(out, 'app'), { recursive: true });
mkdirSync(join(out, 'screenshots'), { recursive: true });
if (existsSync(join(here, 'screenshots'))) {
  cpSync(join(here, 'screenshots'), join(out, 'screenshots'), { recursive: true });
}

// The scorer's caps (from the kit's gate): refuse an entry the scorer would
// refuse — more than 4 screenshots or one over 256 KiB; more than 993 files
// and directories in app/ or 16 MiB of app files — and cap the dossier text
// the judge reads.
const dossier = buildDossier(out, {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
});
writeFileSync(join(out, 'dossier.json'), dossier);
console.log(`handed in app/ + screenshots/ to ${out} (dossier.json ${dossier.length} bytes)`);
