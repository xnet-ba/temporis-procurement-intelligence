// Nabava Academy test – lekcije, bodovanje, napredak.
import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { listLessons, getLesson, ocjeni, getNapredak } from './academy.mjs';

describe('nabava-academy', () => {
  it('3 lekcije, svaka s tekstom, pitanjima i izvorima', () => {
    const ls = listLessons();
    assert.equal(ls.length, 3);
    for (const id of ls.map((l) => l.id)) {
      const l = getLesson(id);
      assert.ok(l.tekst.length > 50 && l.pitanja.length >= 2 && l.izvori.length > 0);
    }
  });

  it('lekcija ne odaje tačne odgovore', () => {
    const l = getLesson('citanje-dkom');
    assert.ok(!JSON.stringify(l).includes('tacan'));
  });

  it('svi tačni → položio + bodovi; pogrešan → nije položio', () => {
    assert.deepEqual(ocjeni('u1', 'hodogram-otvoreni', [1, 1]), { tacno: 2, ukupno: 2, polozio: true });
    const r = ocjeni('u2', 'hodogram-otvoreni', [0, 1]);
    assert.equal(r.polozio, false);
    assert.equal(r.tacno, 1);
  });

  it('napredak prati završene lekcije i bodove, bez duplog brojanja', () => {
    ocjeni('u3', 'zakon-vs-komentar', [1, 1]);
    ocjeni('u3', 'zakon-vs-komentar', [1, 1]);
    const n = getNapredak('u3');
    assert.deepEqual(n.zavrsene, ['zakon-vs-komentar']);
    assert.equal(n.bodovi, 2);
  });

  it('nepoznata lekcija i pogrešan broj odgovora → greška', () => {
    assert.ok(ocjeni('u1', 'ne-postoji', []).greska);
    assert.ok(ocjeni('u1', 'hodogram-otvoreni', [1]).greska);
  });
});
