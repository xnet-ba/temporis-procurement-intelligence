// Tender Radar – matching profila ponuditelja s objavama (lokalne ogledne objave).
// Live-feed (EOJN/TED) tek uz ugovor s izvorom – bez scrapeanja.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const notices = JSON.parse(fs.readFileSync(path.join(here, 'notices.json'), 'utf8'));

const cpvGrupa = (c) => c.slice(0, 3);

export function matchNotice(profil, objava, refDatum = new Date().toISOString().slice(0, 10)) {
  if (objava.rok < refDatum) return { id: objava.id, iskljucena: true, razlog: 'rok za predaju je prošao' };
  let bodovi = 0;
  const razlozi = [];
  if (objava.cpv.some((c) => profil.cpv.some((p) => cpvGrupa(p) === cpvGrupa(c)))) { bodovi += 2; razlozi.push('CPV grupa odgovara'); }
  if ((profil.lokacije ?? []).includes(objava.lokacija)) { bodovi += 1; razlozi.push('lokacija odgovara'); }
  if ((profil.vrste ?? []).includes(objava.vrsta)) { bodovi += 1; razlozi.push('vrsta postupka odgovara'); }
  if (objava.vrijednost >= (profil.minVrijednost ?? 0) && objava.vrijednost <= (profil.maxVrijednost ?? Infinity)) {
    bodovi += 1; razlozi.push('vrijednost u rangu');
  }
  const ocjena = bodovi >= 4 ? 'odgovara' : bodovi >= 2 ? 'uslovno' : 'ne odgovara';
  return { id: objava.id, predmet: objava.predmet, bodovi, ocjena, razlozi, rok: objava.rok, vrijednost: objava.vrijednost };
}

export function findMatches(profil, refDatum) {
  return notices
    .map((o) => matchNotice(profil, o, refDatum))
    .filter((m) => !m.iskljucena && m.ocjena !== 'ne odgovara')
    .sort((a, b) => b.bodovi - a.bodovi || (a.rok < b.rok ? -1 : 1));
}

export function toDigest(profil, poklapanja, refDatum) {
  const L = [`# Tender Radar – ${profil.naziv}`, ``, `Datum provjere: ${refDatum || 'danas'} · Objava u bazi: ${notices.length} (ogledne)`, ``];
  L.push(...(poklapanja.length ? poklapanja.map((m) => `- **${m.id}** (${m.ocjena}, ${m.bodovi}b) – ${m.predmet} · ${m.vrijednost} EUR · rok ${m.rok}\n  ${m.razlozi.join('; ')}`) : ['- nema poklapanja – proširiti kriterije ili provjeriti nove objave']));
  return L.join('\n');
}
