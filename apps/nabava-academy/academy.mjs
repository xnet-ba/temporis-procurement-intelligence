// Nabava Academy – edukacijski engine: lekcije + kviz + bodovanje.
// Deterministički, bez vanjskih zavisnosti. Napredak se drži u memoriji (prototip).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const data = JSON.parse(fs.readFileSync(path.join(here, 'lessons.json'), 'utf8'));
const napredak = new Map(); // korisnik -> { zavrsene: Set, bodovi }

export function listLessons() {
  return data.lekcije.map((l) => ({ id: l.id, naslov: l.naslov, pitanja: l.pitanja.length, izvori: l.izvori }));
}

export function getLesson(id) {
  const l = data.lekcije.find((x) => x.id === id);
  if (!l) return null;
  return { id: l.id, naslov: l.naslov, tekst: l.tekst, izvori: l.izvori,
    pitanja: l.pitanja.map((p) => ({ pitanje: p.pitanje, odgovori: p.odgovori })) }; // bez tačnih odgovora
}

/** ocjeni(korisnik, lekcijaId, [indeksi odgovora]) → {tacno, ukupno, polozio} */
export function ocjeni(korisnik, lekcijaId, odgovori) {
  const l = data.lekcije.find((x) => x.id === lekcijaId);
  if (!l) return { greska: 'nepoznata lekcija' };
  if (!Array.isArray(odgovori) || odgovori.length !== l.pitanja.length) {
    return { greska: `očekivano ${l.pitanja.length} odgovora` };
  }
  const tacno = l.pitanja.filter((p, i) => odgovori[i] === p.tacan).length;
  const polozio = tacno === l.pitanja.length;
  if (!napredak.has(korisnik)) napredak.set(korisnik, { zavrsene: new Set(), bodovi: 0 });
  const n = napredak.get(korisnik);
  if (polozio && !n.zavrsene.has(lekcijaId)) { n.zavrsene.add(lekcijaId); n.bodovi += tacno; }
  return { tacno, ukupno: l.pitanja.length, polozio };
}

export function getNapredak(korisnik) {
  const n = napredak.get(korisnik);
  if (!n) return { zavrsene: [], bodovi: 0, ukupnoLekcija: data.lekcije.length };
  return { zavrsene: [...n.zavrsene], bodovi: n.bodovi, ukupnoLekcija: data.lekcije.length };
}
