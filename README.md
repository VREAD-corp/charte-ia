# Lu & Compris

Fake door for a « Charte et registre IA » template kit for French SMEs (charter template, reading quiz, dated register of the measures taken under art. 4 of Regulation (EU) 2024/1689 as replaced by Regulation (EU) 2026/1744), A/B price 89 vs 149 € HT, plus a free one-page summary of the new art. 4 (`/article-4/`, printable, PDF in `src/static/`, `npm run pdf`). Text verified on the Publications Office Cellar (CELEX 32026R1744) on 2026-10-13. No certification, compliance or guaranteed-level claim (`claims` in site.config.mjs, checked by tests/site.check.mjs).

Live: https://outils.vread.fr/charte-ia/ (GitHub Pages of `VREAD-corp/charte-ia`, branch `main`, folder `/docs`). Goal-v4 experiment of READ FRANCE SAS, built and run by Octave (its AI agent). Independent of the Vread app and vread.fr. Journal: `VREAD-corp/octave-asset-ventures` (`experiments/`, `ventures/`).

**Fake door.** The paid offer is not on sale: the form records a pre-order (no card, no payment, no commitment) in this site's own Apps Script + Sheet. Nothing here uses octave-checkout.

## Layout

| Path | What |
|---|---|
| `src/pages/*.html` | Pages (`<!--meta {json}-->` header: path, title, description, scripts) |
| `site.config.mjs` | Brand, Apps Script URL, A/B config (`OCTAVE_XP`), JSON-LD, forbidden claims |
| `build.mjs` | Static build, no dependency -> `docs/` (sitemap, robots, fingerprinted assets) |
| `src/assets/cro.js` | Shared behaviour counters and A/B variants, byte-identical to `octave-checkout/gas/web/cro.js` |
| `tools/mesure.template.js` | Cookieless audience counter (`v:2`, bots/webdriver/`octave_notrack=1` counted apart), generated into `assets/mesure.js` |
| `src/assets/preorder.js` | Pre-order form -> `action=preorder` |
| `gas/src/` | Apps Script web app: `App.js` (site config), `Code.js` (track, preorder, summary, purge_tests, cro, cro_init), `Cro.js` (byte-identical to octave-checkout) |

## Backend

Apps Script project `charte-ia-gas (READ FRANCE SAS)`, script id `1QoOMc6igqLDC6zDv45-4QA-Pi0TusIY4AckE_99ptptIwSi-Q9XAtVQf`, owner vincent.cance@gmail.com, only scope `spreadsheets`. Web app `https://script.google.com/macros/s/AKfycbzdCxHo_pIM-fpFEKWlRWsR9LsH-CtPIf2dSWvWbLzeFJpOpqO_67gHSis1seQi-Nsy/exec`. It creates its own Sheet on first use (tabs `Preorders`, `Stats`, `Exclus`, `Comportement`, `Experiences`). Redeploy: `bash gas/scripts/deploy.sh` (same deployment id). Admin key: `~/.config/octave/charte-ia.env` (never committed; the code holds its SHA-256).

Read the numbers: `. ~/.config/octave/charte-ia.env; curl -sL -d "{\"action\":\"summary\",\"key\":\"$KEY\"}" <exec url>` (counts only, no e-mails). Weekly CRO report: backend `charte-ia` in `vread-revenue-lab/tools/cro-sources.json`.

## Commands

```bash
npm test                 # build + static checks (lint-ia >= 85 on every page, links, JSON-LD, claims) + backend unit tests
node tests/e2e.mjs       # browser test at 390 px and 1440 px against docs/ (Apps Script mocked)
BASE_URL=https://outils.vread.fr/charte-ia/ node tests/e2e.mjs   # live: real form -> real Sheet (@example.com, purged)
```
