// Contract Watch test – upozorenja na oglednim ugovorima.
import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { checkUgovor, portfolio } from './watch.mjs';

const REF = '2026-11-11';

describe('contract-watch', () => {
  it('rizičan ugovor: istekla garancija + prošla obaveza + aneks → kritično', () => {
    const u = { id: 't', naziv: 't', rokZavrsetka: '2026-12-01',
      garancije: [{ vrsta: 'g', iznos: 1, vaziDo: '2026-11-01' }],
      aneksi: [{ broj: 'A1' }],
      obaveze: [{ opis: 'isporuka', rok: '2026-11-01', status: 'u-toku' }] };
    const r = checkUgovor(u, REF);
    assert.equal(r.status, 'kritično');
    assert.ok(r.upozorenja.some((x) => /garancija istekla/i.test(x.nalaz)));
    assert.ok(r.upozorenja.some((x) => /neizvršena obaveza/i.test(x.nalaz)));
    assert.ok(r.upozorenja.some((x) => /aneks/i.test(x.nalaz)));
  });

  it('garancija ističe za <30 dana → pažnja', () => {
    const r = checkUgovor({ id: 't', naziv: 't', rokZavrsetka: '2027-06-30',
      garancije: [{ vrsta: 'g', iznos: 1, vaziDo: '2026-11-25' }], obaveze: [] }, REF);
    assert.equal(r.status, 'pažnja');
  });

  it('uredan ugovor: bez upozorenja → uredno', () => {
    const r = checkUgovor({ id: 't', naziv: 't', rokZavrsetka: '2027-06-30',
      garancije: [{ vrsta: 'g', iznos: 1, vaziDo: '2027-09-30' }],
      obaveze: [{ opis: 'x', rok: '2027-03-31', status: 'izvrseno' }] }, REF);
    assert.equal(r.status, 'uredno');
  });

  it('portfolio nad oglednim podacima: 2 ugovora, zbirna slika', () => {
    const p = portfolio(REF);
    assert.equal(p.ukupno, 2);
    assert.equal(p.kriticno + p.paznja + p.ugovori.filter((u) => u.status === 'uredno').length, 2);
  });
});
