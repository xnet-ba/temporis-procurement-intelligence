// TPI knowledge citatni testovi – FTS5 pretraga, važenje, odbijanje bez izvora.
import { describe, it, before } from 'node:test';
import { strict as assert } from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { openDb, searchRecords, getRecord, recordStatus } from './db.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));

describe('knowledge store', () => {
  before(() => {
    const f = path.join(here, 'knowledge-test.db');
    if (fs.existsSync(f)) fs.unlinkSync(f);
    process.env.TPI_DB = f;
  });

  it(' gradi bazu iz sintetičkih zapisa (11)', () => {
    openDb(process.env.TPI_DB);
    assert.equal(searchRecords('ogledni', { limit: 50 }).length, 11);
  });

  it('FTS5 nalazi relevantan zapis, a ne sve', () => {
    const r = searchRecords('hodogram');
    assert.ok(r.length >= 1 && r.every((x) => x.type === 'hodogram' || /hodogram/i.test(x.naslov + x.sadrzaj)));
  });

  it('razlikuje važeći i historijski propis', () => {
    assert.equal(recordStatus('syn-pravilnik-002', '2026-11-11').status, 'vazeci');
    const h = recordStatus('syn-pravilnik-001', '2026-11-11');
    assert.equal(h.status, 'historijski');
    assert.equal(h.zamijenjenSa, 'syn-pravilnik-002');
  });

  it('nepoznat pojam = prazan niz → pozivatelj MORA odbiti odgovor', () => {
    const r = searchRecords('kzzxyz-nepostojeci-pojam');
    assert.deepEqual(r, []);
  });

  it('svaki zapis nosi izvor, važenje i pouzdanost', () => {
    for (const r of searchRecords('ogledni', { limit: 50 })) {
      assert.ok(r.izvor?.naziv, `${r.id}: bez izvora`);
      assert.ok(['vazeci', 'historijski', 'nepoznat'].includes(r.statusVazenja), `${r.id}: bez važenja`);
      assert.ok(r.nivoPouzdanosti, `${r.id}: bez pouzdanosti`);
      assert.ok(r.sinteticki, `${r.id}: bez oznake sintetike`);
    }
  });

  it('getRecord vraća null za nepostojeći id', () => {
    assert.equal(getRecord('ne-postoji'), null);
  });
});
