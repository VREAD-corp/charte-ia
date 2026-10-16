/** Site configuration read by Code.js (loaded first: file names are evaluated in alphabetical order). */
var APP = {
  name: 'Lu & Compris',
  site: 'charte-ia',
  host: 'charte-ia.jalonel.com',               // public site (brand Jalonel); outils.vread.fr/<site>/ redirects here
  tz: 'Europe/Paris',
  sheetTitle: 'Lu & Compris : pré-commandes et statistiques (READ FRANCE SAS)',
  consentVersion: 'pc-2026-10-13',
  adminHash: '730f8ff3e6ad37822d7a6ce8b2b95185958975fba5c07fa3065d9f24af57a7d8',
  events: ['view', 'cta_click', 'summary_print', 'summary_pdf', 'kit_view', 'preorder_submit', 'preorder_ok'],
  xp: { price: ['a', 'b'] },        // a: 89 € HT, b: 149 € HT
  variantXp: 'price',
  offers: { 'kit': { a: 89, b: 149 } },   // € HT, pre-order only
  countries: ['FR', 'BE', 'LU', 'CH', 'MC', 'EU', 'ZZ'],
  websiteRequired: false,
  sizes: ['1-49', '50-249', '250-1999', '2000+'],
  roles: ['rh', 'dpo', 'direction', 'juridique', 'it', 'autre'],
};
