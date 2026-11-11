// TPI Knowledge store – SQLite + FTS5, nula vanjskih zavisnosti (node:sqlite).
// Shema prati knowledge/record.schema.json. Baza se gradi iz sintetičkih zapisa.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DatabaseSync } from 'node:sqlite';

const here = path.dirname(fileURLToPath(import.meta.url));
const DB_FILE = process.env.TPI_DB || path.join(here, 'knowledge.db');

let _db = null;

export function openDb(file = DB_FILE) {
  const fresh = !fs.existsSync(file);
  const d = new DatabaseSync(file);
  if (fresh) {
    d.exec(`CREATE TABLE records (
      id TEXT PRIMARY KEY, type TEXT, naslov TEXT, izvor TEXT, citati TEXT,
      jurisdikcija TEXT, datumObjave TEXT, datumVazenjaOd TEXT, datumVazenjaDo TEXT,
      zamijenjenSa TEXT, statusVazenja TEXT, sadrzaj TEXT, nivoPouzdanosti TEXT, jezik TEXT
    )`);
    d.exec(`CREATE VIRTUAL TABLE fts USING fts5(id, naslov, sadrzaj, tokenize='unicode61')`);
    const records = JSON.parse(fs.readFileSync(path.join(here, 'synthetic', 'records.json'), 'utf8'));
    const ins = d.prepare(`INSERT INTO records VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`);
    const fts = d.prepare(`INSERT INTO fts (id, naslov, sadrzaj) VALUES (?,?,?)`);
    for (const r of records) {
      ins.run(r.id, r.type, r.naslov, JSON.stringify(r.izvor), JSON.stringify(r.citati ?? []),
        r.jurisdikcija, r.datumObjave ?? null, r.datumVazenjaOd ?? null, r.datumVazenjaDo ?? null,
        r.zamijenjenSa ?? null, r.statusVazenja, r.sadrzaj, r.nivoPouzdanosti, r.jezik ?? 'hr');
      fts.run(r.id, r.naslov, r.sadrzaj);
    }
  }
  return d;
}

function row(r) {
  if (!r) return null;
  return { ...r, izvor: JSON.parse(r.izvor), citati: JSON.parse(r.citati), sinteticki: true };
}

let dbFile = null;

export function db() {
  const file = process.env.TPI_DB || DB_FILE;
  if (!_db || dbFile !== file) { _db = openDb(file); dbFile = file; }
  return _db;
}

/** FTS5 pretraga; vraća zapise sa statusom važenja. Bez pogotka = prazan niz (pozivatelj odbija odgovor). */
export function searchRecords(pojam, { types = null, jurisdikcija = null, limit = 10 } = {}) {
  let sql = `SELECT r.* FROM fts JOIN records r ON r.id = fts.id WHERE fts MATCH ?`;
  const params = [pojam.split(/\s+/).filter(Boolean).map((w) => `"${w.replace(/"/g, '')}"`).join(' OR ') || '""'];
  if (types) { sql += ` AND r.type IN (${types.map(() => '?').join(',')})`; params.push(...types); }
  if (jurisdikcija) { sql += ` AND r.jurisdikcija = ?`; params.push(jurisdikcija); }
  sql += ` LIMIT ?`;
  params.push(limit);
  return db().prepare(sql).all(...params).map(row);
}

export function getRecord(id) {
  return row(db().prepare(`SELECT * FROM records WHERE id = ?`).get(id));
}

/** Status propisa na zadani datum: vazeci / historijski / nepoznat. */
export function recordStatus(id, datum = new Date().toISOString().slice(0, 10)) {
  const r = getRecord(id);
  if (!r || !['zakon', 'pravilnik'].includes(r.type)) return { status: 'nepoznat' };
  if (r.datumVazenjaDo && datum > r.datumVazenjaDo) return { ...pick(r), status: 'historijski' };
  if (r.datumVazenjaOd && datum < r.datumVazenjaOd) return { ...pick(r), status: 'nije-na-snazi' };
  return { ...pick(r), status: r.statusVazenja };
}

function pick(r) {
  return { id: r.id, datumVazenjaOd: r.datumVazenjaOd, datumVazenjaDo: r.datumVazenjaDo, zamijenjenSa: r.zamijenjenSa ?? null };
}
