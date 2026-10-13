// Lu & Compris scenario for tests/e2e.mjs.
export async function scenario({ page, go, noHScroll, requests, posted, vp, LIVE, KEY, SITE, assert, shot }) {
  // 1. Free one-page summary: official wording, PDF available.
  await go('article-4/');
  await noHScroll('summary');
  const s = await page.textContent('main');
  assert.ok(s.includes('ne contraint pas les fournisseurs ou les déployeurs à garantir un niveau spécifique'), 'new art. 4 quoted');
  assert.ok(s.includes('2026/1744') && s.includes('27 juillet 2026'));
  const pdf = await page.request.get(new URL('fiche-article-4.pdf', page.url()).href);
  assert.equal(pdf.status(), 200);
  assert.ok((await pdf.body()).subarray(0, 5).toString() === '%PDF-');
  await shot('summary');

  // 2. Kit page: A/B price, honest wording, pre-order.
  await go('?prix=b');
  await noHScroll('home');
  assert.match(await page.textContent('#precommande h2'), /149 € HT/, 'variant b shows 149 € HT');
  await go('?prix=a');
  assert.match(await page.textContent('#precommande h2'), /89 € HT/, 'variant a shows 89 € HT');
  const body = await page.textContent('main');
  assert.ok(body.includes('Aucun paiement') && body.includes('pas encore en vente') && body.includes('ne délivre aucune certification'));
  await page.fill('#email', `e2e-${vp.width}@example.com`);
  await page.fill('#company', 'PME E2E');
  await page.fill('#siren', '988741773');
  await page.selectOption('#size', '50-249');
  await page.selectOption('#role', 'dpo');
  await page.check('input[name=consent]');
  await page.click('#preorder button[type=submit]');
  await page.waitForSelector('#preorder-msg.ok', { timeout: 30000 });
  if (!LIVE) {
    const p = posted.filter((x) => x.action === 'preorder').at(-1);
    assert.equal(p.offer, 'kit');
    assert.equal(p.variant, 'a');
    assert.equal(p.size, '50-249');
    assert.equal(p.role, 'dpo');
  } else if (KEY) {
    const r = await fetch(SITE.api, { method: 'POST', body: JSON.stringify({ action: 'summary', key: KEY, email: `e2e-${vp.width}@example.com` }) }).then((x) => x.json());
    assert.equal(r.hasEmail, true, 'pre-order row in the Sheet');
  }
  await shot('kit-sent');
}
