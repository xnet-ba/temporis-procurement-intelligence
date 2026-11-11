// Nabava Workspace test – CRUD nad privremenom datotekom.
import { describe, it, beforeEach } from 'node:test';
import { strict as assert } from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { noviProjekt, dodaj, zakljuci, status, pregled } from './workspace.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const TMP = path.join(here, 'data', 'workspace-test.json');
const REF = '2026-11-11';

describe('nabava-workspace', () => {
  beforeEach(() => { try { fs.unlinkSync(TMP); } catch { /* nema */ } });

  it('novi projekat + stavke + status bez kašnjenja', () => {
    const id = noviProjekt('Test', 'jednostavna nabava', TMP);
    assert.equal(id, 'P-001');
    assert.deepEqual(dodaj(id, { tip: 'rok', naslov: 'Predaja', rok: '2026-12-20' }, TMP), { ok: true, stavki: 1 });
    const s = status(id, REF, TMP);
    assert.equal(s.otvoreno, 1);
    assert.deepEqual(s.kasni, []);
  });

  it('prošli rok otvorene stavke → kasni', () => {
    const id = noviProjekt('Test', undefined, TMP);
    dodaj(id, { tip: 'isporuka', naslov: 'Isporuka', rok: '2026-10-01' }, TMP);
    const s = status(id, REF, TMP);
    assert.equal(s.kasni.length, 1);
  });

  it('zaključena stavka ne kasni', () => {
    const id = noviProjekt('Test', undefined, TMP);
    dodaj(id, { tip: 'isporuka', naslov: 'Isporuka', rok: '2026-10-01' }, TMP);
    assert.deepEqual(zakljuci(id, 0, TMP), { ok: true });
    assert.deepEqual(status(id, REF, TMP).kasni, []);
  });

  it('nepoznat tip / projekat / stavka → greška', () => {
    const id = noviProjekt('Test', undefined, TMP);
    assert.ok(dodaj(id, { tip: 'ne-postoji', naslov: 'x' }, TMP).greska);
    assert.ok(dodaj('P-999', { tip: 'rok', naslov: 'x' }, TMP).greska);
    assert.ok(zakljuci(id, 5, TMP).greska);
    assert.ok(status('P-999', REF, TMP).greska);
  });

  it('pregled vraća status svih projekata', () => {
    noviProjekt('A', undefined, TMP);
    noviProjekt('B', undefined, TMP);
    assert.equal(pregled(REF, TMP).length, 2);
  });
});
