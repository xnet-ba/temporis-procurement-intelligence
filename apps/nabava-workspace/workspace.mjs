// Nabava Workspace – projekti cijelog ciklusa nabave: dokumenti, rokovi, evaluacija, ugovori.
// Perzistencija: lokalna JSON datoteka (kao Contract Watch). Ogledni podaci – nisu stvarni.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const DATA = process.env.TPI_WORKSPACE || path.join(here, 'data', 'workspace.json');

const TIPOVI = ['dokument', 'rok', 'evaluacija', 'ugovor', 'aneks', 'isporuka', 'garancija', 'napomena'];

export function load(file = DATA) {
  try { return JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch { return { projekti: [] }; }
}

export function save(ws, file = DATA) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(ws, null, 2));
}

export function noviProjekt(naziv, vrsta = 'javna nabava', file) {
  const ws = load(file);
  const id = `P-${String(ws.projekti.length + 1).padStart(3, '0')}`;
  ws.projekti.push({ id, naziv, vrsta, stavke: [] });
  save(ws, file);
  return id;
}

export function dodaj(projektId, { tip, naslov, rok = null }, file) {
  if (!TIPOVI.includes(tip)) return { greska: `nepoznat tip (dozvoljeno: ${TIPOVI.join(', ')})` };
  if (!naslov) return { greska: 'naslov je obavezan' };
  const ws = load(file);
  const p = ws.projekti.find((x) => x.id === projektId);
  if (!p) return { greska: 'nepoznat projekat' };
  p.stavke.push({ tip, naslov, rok, status: 'otvoreno' });
  save(ws, file);
  return { ok: true, stavki: p.stavke.length };
}

export function zakljuci(projektId, index, file) {
  const ws = load(file);
  const p = ws.projekti.find((x) => x.id === projektId);
  if (!p || !p.stavke[index]) return { greska: 'nepoznat projekat ili stavka' };
  p.stavke[index].status = 'zakljuceno';
  save(ws, file);
  return { ok: true };
}

export function status(projektId, refDatum = new Date().toISOString().slice(0, 10), file) {
  const ws = load(file);
  const p = ws.projekti.find((x) => x.id === projektId);
  if (!p) return { greska: 'nepoznat projekat' };
  const otvorene = p.stavke.filter((s) => s.status === 'otvoreno');
  const kasne = otvorene.filter((s) => s.rok && s.rok < refDatum);
  return { id: p.id, naziv: p.naziv, ukupno: p.stavke.length,
    otvoreno: otvorene.length, kasni: kasne.map((s) => `${s.tip}: ${s.naslov} (rok ${s.rok})`) };
}

export function pregled(refDatum, file) {
  const ws = load(file);
  return ws.projekti.map((p) => status(p.id, refDatum, file));
}
