// Contract Watch – praćenje izvršenja ugovora: rokovi, garancije, obaveze, aneksi.
// Podaci: lokalne JSON datoteke (data/). Ogledni ugovori – nisu stvarni.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const DATA = process.env.TPI_CONTRACTS || path.join(here, 'data', 'contracts.json');

export function loadUgovori(file = DATA) {
  return JSON.parse(fs.readFileSync(file, 'utf8')).ugovori;
}

function danaDo(rok, ref) {
  return Math.round((new Date(rok) - new Date(ref)) / 86400000);
}

export function checkUgovor(u, refDatum = new Date().toISOString().slice(0, 10)) {
  const upozorenja = [];
  for (const g of u.garancije ?? []) {
    const d = danaDo(g.vaziDo, refDatum);
    if (d < 0) upozorenja.push({ nivo: 'visok', nalaz: `Garancija istekla: ${g.vrsta} (važila do ${g.vaziDo}).` });
    else if (d <= 30) upozorenja.push({ nivo: 'srednji', nalaz: `Garancija ističe za ${d} dana: ${g.vrsta} (do ${g.vaziDo}).` });
  }
  const dz = danaDo(u.rokZavrsetka, refDatum);
  if (dz < 0) upozorenja.push({ nivo: 'visok', nalaz: `Rok završetka prošao: ${u.rokZavrsetka}.` });
  else if (dz <= 30) upozorenja.push({ nivo: 'srednji', nalaz: `Rok završetka za ${dz} dana: ${u.rokZavrsetka}.` });
  for (const o of u.obaveze ?? []) {
    if (o.status !== 'izvrseno' && danaDo(o.rok, refDatum) < 0) {
      upozorenja.push({ nivo: 'visok', nalaz: `Neizvršena obaveza s prošlim rokom: ${o.opis} (rok ${o.rok}).` });
    }
  }
  if ((u.aneksi ?? []).length > 0) {
    upozorenja.push({ nivo: 'nizak', nalaz: `Ugovor ima ${u.aneksi.length} aneks(a) – provjeriti jesu li izmjene dopuštene.` });
  }
  const kriticno = upozorenja.some((x) => x.nivo === 'visok');
  const paznja = upozorenja.some((x) => x.nivo === 'srednji');
  return { id: u.id, naziv: u.naziv, upozorenja, status: kriticno ? 'kritično' : paznja ? 'pažnja' : 'uredno' };
}

export function portfolio(refDatum, file) {
  const rez = loadUgovori(file).map((u) => checkUgovor(u, refDatum));
  return { datum: refDatum, ukupno: rez.length,
    kriticno: rez.filter((r) => r.status === 'kritično').length,
    paznja: rez.filter((r) => r.status === 'pažnja').length,
    ugovori: rez };
}

export function toDigest(p) {
  const L = [`# Contract Watch – ${p.datum}`, ``, `Ugovora: ${p.ukupno} · kritično: ${p.kriticno} · pažnja: ${p.paznja}`, ``];
  for (const u of p.ugovori) {
    L.push(`## ${u.id} – ${u.naziv} [${u.status}]`);
    L.push(...(u.upozorenja.length ? u.upozorenja.map((x) => `- **${x.nivo}**: ${x.nalaz}`) : ['- bez upozorenja']));
  }
  return L.join('\n');
}
