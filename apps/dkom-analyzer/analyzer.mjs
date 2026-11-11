// DKOM Analyzer – obrasci iz prakse + poređenje s propisima.
// Radi nad TPI znanjem (FTS5). Ogledni podaci – nije pravni izvor.
import { searchRecords } from '../../knowledge/db.mjs';

export function inferIshod(r) {
  const t = `${r.naslov} ${r.sadrzaj}`.toLowerCase();
  if (/poništava/.test(t)) return 'poništenje postupka';
  if (/usvaja/.test(t)) return 'žalba usvojena';
  if (/odbija/.test(t)) return 'žalba odbijena';
  return 'nepoznat';
}

export function analyzeDecisions({ pojam = '' } = {}) {
  const q = pojam.trim() || 'ogledna odluka dkom';
  const zapisi = searchRecords(q, { types: ['odluka-dkom'], limit: 20 }).map((r) => ({ ...r, ishod: inferIshod(r) }));
  const poIshodu = {};
  for (const z of zapisi) poIshodu[z.ishod] = (poIshodu[z.ishod] ?? 0) + 1;
  const okvir = searchRecords('postupak nabave', { types: ['zakon', 'pravilnik'], limit: 3 })
    .map((r) => ({ id: r.id, naslov: r.naslov, statusVazenja: r.statusVazenja }));
  return {
    pojam: q, ukupno: zapisi.length, poIshodu, zapisi, pravniOkvir: okvir,
    napomena: 'Ogledni podaci – obrasci nisu statistički reprezentativni. Svaku odluku provjeriti u objavi; propis u važećem tekstu.',
    nivoPouzdanosti: 'nizak',
  };
}

export function toMarkdown(a) {
  const L = [`# DKOM Analyzer – izvještaj`, ``, `**Pojam:** ${a.pojam} · **Odluka:** ${a.ukupno} (pouzdanost: ${a.nivoPouzdanosti})`, ``, `## Ishodi`];
  L.push(...(Object.entries(a.poIshodu).map(([k, v]) => `- ${k}: ${v}`)));
  L.push('', '## Odluke');
  L.push(...(a.zapisi.length ? a.zapisi.map((z) => `- **${z.id}** (${z.ishod}) – ${z.naslov} [${z.izvor.naziv}, ${z.datumObjave}]`) : ['- nema pronađenih odluka – zaključak se ne donosi']));
  L.push('', '## Mogući pravni okvir (provjeriti u važećem tekstu)');
  L.push(...(a.pravniOkvir.length ? a.pravniOkvir.map((p) => `- ${p.id} – ${p.naslov} (važenje: ${p.statusVazenja})`) : ['- nema']));
  L.push('', `_${a.napomena}_`);
  return L.join('\n');
}
