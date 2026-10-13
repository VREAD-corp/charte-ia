// Renders docs/article-4/ (print stylesheet) to src/static/fiche-article-4.pdf with a local Chromium. Run: npm run pdf
import fs from 'node:fs';
import path from 'node:path';
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const { chromium } = await import(process.env.PW_CORE || path.join(ROOT, '../octave-checkout/node_modules/playwright-core/index.mjs'));
const exe = ['chromium-1248', 'chromium-1234', 'chromium-1228'].flatMap((d) => ['chrome-linux', 'chrome-linux64'].map((x) => path.join(process.env.HOME, '.cache/ms-playwright', d, x, 'chrome'))).find((p) => fs.existsSync(p));
const b = await chromium.launch({ executablePath: exe });
const p = await b.newPage();
await p.goto('file://' + path.join(ROOT, 'docs/article-4/index.html'), { waitUntil: 'load' });
await p.emulateMedia({ media: 'print' });
const out = path.join(ROOT, 'src/static/fiche-article-4.pdf');
await p.pdf({ path: out, format: 'A4', printBackground: false, preferCSSPageSize: true });
await b.close();
const pages = (fs.readFileSync(out, 'latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
console.log('PDF written:', out, pages, 'page(s)');
if (pages !== 1) { console.error('the summary must fit on one page'); process.exit(1); }
