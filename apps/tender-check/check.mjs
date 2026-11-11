// Tender Check AI – deterministička analiza dokumentacije o nabavi.
// Bez LLM-a: heuristička ekstrakcija + provjere + reference iz TPI znanja (FTS5).
// Nije pravno mišljenje – samo nalazi s referencama.
import { searchRecords } from '../../knowledge/db.mjs';

const STAVKE = [
  { id: 'predmet', naziv: 'Predmet nabave', re: /predmet nabave\s*:\s*(.+)/i },
  { id: 'vrsta', naziv: 'Vrsta postupka', re: /vrsta postupka\s*:\s*(.+)/i },
  { id: 'vrijednost', naziv: 'Procijenjena vrijednost', re: /procijenjena vrijednost\s*:\s*(.+)/i },
  { id: 'kriterij', naziv: 'Kriterij odabira', re: /kriterij (odabira|ocjene)\s*:\s*(.+)/i },
  { id: 'rok', naziv: 'Rok za predaju', re: /rok za predaju[^\n]*?(\d{1,2}\.\d{1,2}\.\d{4})/i },
  { id: 'nacin', naziv: 'Način predaje', re: /na[čc]in predaje\s*:\s*(.+)/i },
  { id: 'espd', naziv: 'ESPD', re: /espd/i },
  { id: 'sposobnost', naziv: 'Dokazi sposobnosti', re: /dokazi sposobnosti\s*:\s*(.+)/i },
  { id: 'troskovnik', naziv: 'Troškovnik', re: /tro[šs]kovnik/i },
  { id: 'kontakt', naziv: 'Kontakt / pitanja', re: /kontakt\s*:\s*(.+)/i },
];

const DISKRIMINATORNO = [/samo original/i, /bez jednakovrijednog/i, /isklju[čc]ivo\s+[A-ZČĆŠŽĐ]/];

export function analyzeTender(text) {
  const stavke = STAVKE.map((s) => {
    const m = text.match(s.re);
    return { id: s.id, naziv: s.naziv, status: m ? 'prisutno' : 'nedostaje', vrijednost: (m?.[m.length - 1] ?? '').trim().slice(0, 120) || null };
  });
  const upozorenja = [];
  if (!stavke.find((s) => s.id === 'rok').vrijednost) {
    upozorenja.push({ nivo: 'visok', nalaz: 'Nedostaje rok za predaju ponuda.', preporuka: 'Dopuniti DON rokom (datum, sat, način računanja).' });
  }
  for (const re of DISKRIMINATORNO) {
    const m = text.match(re);
    if (m) upozorenja.push({ nivo: 'visok', nalaz: `Moguće diskriminatorna formulacija: "${m[0]}".`, preporuka: 'Provjeriti tehničke specifikacije – marka/patent samo uz "ili jednakovrijedno".' });
  }
  if (!/jednakovrijedn/i.test(text) && /marka|proizvođač/i.test(text)) {
    upozorenja.push({ nivo: 'srednji', nalaz: 'Spominje se marka/proizvođač bez "ili jednakovrijedno".', preporuka: 'Dodati klauzulu o jednakovrijednosti ili obrazložiti.' });
  }
  const hodogram = searchRecords('otvoreni postupak', { types: ['hodogram'], limit: 3 });
  const propisi = searchRecords('postupak nabave', { types: ['zakon', 'pravilnik'], limit: 3 });
  const izvori = [...hodogram, ...propisi].map((r) => ({ id: r.id, naslov: r.naslov, statusVazenja: r.statusVazenja }));
  const kriticno = upozorenja.filter((u) => u.nivo === 'visok').length + stavke.filter((s) => s.status === 'nedostaje').length;
  return {
    stavke, upozorenja, izvori,
    status: kriticno === 0 ? 'bez kritičnih nalaza' : 'ima kritičnih nalaza',
    nivoPouzdanosti: 'srednji',
    napomena: 'Heuristička kontrola, nije pravno mišljenje. Svaki nalaz provjeriti u važećem propisu i DON-u.',
  };
}

export function toMarkdown(rep) {
  const L = [`# Tender Check – izvještaj`, ``, `**Status:** ${rep.status} (pouzdanost: ${rep.nivoPouzdanosti})`, ``, `## Kontrolna lista`];
  for (const s of rep.stavke) L.push(`- [${s.status === 'prisutno' ? 'x' : ' '}] **${s.naziv}**: ${s.status}${s.vrijednost ? ` – ${s.vrijednost}` : ''}`);
  L.push(``, `## Upozorenja`);
  L.push(...(rep.upozorenja.length ? rep.upozorenja.map((u) => `- **${u.nivo}**: ${u.nalaz} → ${u.preporuka}`) : ['- nema']));
  L.push(``, `## Izvori iz TPI znanja`);
  L.push(...(rep.izvori.length ? rep.izvori.map((i) => `- ${i.id} – ${i.naslov} (važenje: ${i.statusVazenja})`) : ['- nema pronađenih izvora – zaključak se ne donosi']));
  L.push(``, `_${rep.napomena}_`);
  return L.join('\n');
}
