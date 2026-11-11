// Tender Radar test – bodovanje poklapanja.
import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { matchNotice, findMatches } from './radar.mjs';

const IT = { naziv: 'IT', cpv: ['30190000', '30210000'], lokacije: ['Zagreb'], minVrijednost: 10000, maxVrijednost: 150000, vrste: ['otvoreni postupak'] };
const REF = '2026-11-11';

describe('tender-radar', () => {
  it('puno poklapanje: uredski materijal (2+1+1+1=5) → odgovara', () => {
    const m = matchNotice(IT, { id: 'x', predmet: 't', cpv: ['30192000'], lokacija: 'Zagreb', vrijednost: 40000, rok: '2026-12-20', vrsta: 'otvoreni postupak' }, REF);
    assert.equal(m.bodovi, 5);
    assert.equal(m.ocjena, 'odgovara');
  });

  it('CPV grupa: 30213000 dijeli grupu 302 s profilom', () => {
    const m = matchNotice(IT, { id: 'x', cpv: ['30213000'], lokacija: 'Rijeka', vrijednost: 5000, rok: '2026-12-20', vrsta: 'pregovarački' }, REF);
    assert.ok(m.bodovi >= 2 && m.razlozi.includes('CPV grupa odgovara'));
  });

  it('prošao rok → isključena bez bodovanja', () => {
    const m = matchNotice(IT, { id: 'x', cpv: ['30190000'], lokacija: 'Zagreb', vrijednost: 40000, rok: '2026-10-01', vrsta: 'otvoreni postupak' }, REF);
    assert.equal(m.iskljucena, true);
  });

  it('IT profil: 3 aktivna poklapanja, sortirana po bodovima pa roku', () => {
    const r = findMatches(IT, REF);
    assert.equal(r.length, 3);
    assert.ok(r[0].bodovi >= r[1].bodovi && r[1].bodovi >= r[2].bodovi);
    assert.ok(!r.some((m) => m.id === 'OGLED-OBJ-004'), 'građevina i istekli rok otpadaju');
  });

  it('prazan profil kriterija → nema poklapanja, bez greške', () => {
    const r = findMatches({ naziv: 'prazan', cpv: ['99900000'], lokacije: ['Dubrovnik'], minVrijednost: 1e9, maxVrijednost: 2e9, vrste: ['natječaj'] }, REF);
    assert.deepEqual(r, []);
  });
});
