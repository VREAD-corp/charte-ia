// Site configuration read by build.mjs.
const ORG = { '@type': 'Organization', name: 'READ FRANCE SAS', url: 'https://outils.vread.fr/', email: 'octave@vread.fr' };

export default {
  repo: 'charte-ia',
  site: 'charte-ia',
  brand: 'Lu & Compris',
  logo: 'Lu <span>&amp;</span> Compris',
  accent: '#0f5f4a',
  api: 'https://script.google.com/macros/s/AKfycbzdCxHo_pIM-fpFEKWlRWsR9LsH-CtPIf2dSWvWbLzeFJpOpqO_67gHSis1seQi-Nsy/exec',
  consentVersion: 'pc-2026-10-13',
  variantXp: 'price',
  // A/B on the kit price: a = 89 € HT, b = 149 € HT. ?prix=a|b forces one. Every [data-price] element is swapped.
  xp: [{ id: 'price', variants: ['a', 'b'], mode: 'tab', param: 'prix', swap: { b: [['[data-price]', 'text', '149 € HT']] } }],
  nav: [['Le kit', '/'], ['Article 4 en une page', '/article-4/']],
  static: [['src/static/fiche-article-4.pdf', 'article-4/fiche-article-4.pdf']],
  // Never claim certification, compliance or a guaranteed literacy level (DGCCRF misleading practices).
  claims: [/certifi/i, /conforme|conformité/i, /attestation officielle/i, /label/i, /niveau suffisant/i, /garanti/i],
  footerNote: 'Lu & Compris ne délivre ni certification ni avis juridique. Faites relire vos documents par votre conseil.',
  schema(p, url) {
    if (p.page === 'summary') return { '@type': 'Article', headline: 'Article 4 du règlement européen sur l’IA : ce qui a changé le 27 juillet 2026', url, inLanguage: 'fr',
      datePublished: '2026-10-13', dateModified: '2026-10-13', author: ORG, publisher: ORG, description: p.description,
      citation: ['https://eur-lex.europa.eu/eli/reg/2026/1744/oj', 'https://eur-lex.europa.eu/legal-content/FR/TXT/?uri=CELEX:32024R1689', 'https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers'] };
    if (p.page === 'home') return { '@type': 'WebPage', name: p.title, url, inLanguage: 'fr', description: p.description, publisher: ORG };
    return null;
  },
};
