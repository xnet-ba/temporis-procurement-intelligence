// DKOM Analyzer test – obrasci nad oglednim odlukama.
import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import { analyzeDecisions } from './analyzer.mjs';

describe('dkom-analyzer', () => {
  it('statistika nad 3 ogledne odluke (1 usvojena, 1 odbijena, 1 poništenje)', () => {
    const a = analyzeDecisions({});
    assert.equal(a.ukupno, 3);
    assert.equal(a.poIshodu['žalba usvojena'], 1);
    assert.equal(a.poIshodu['žalba odbijena'], 1);
    assert.equal(a.poIshodu['poništenje postupka'], 1);
  });

  it('filter pojam sužava skup', () => {
    const a = analyzeDecisions({ pojam: 'tehničke specifikacije' });
    assert.ok(a.zapisi.some((z) => z.id === 'syn-dkom-002'));
  });

  it('nepostojeći pojam = prazno + napomena, bez zaključka', () => {
    const a = analyzeDecisions({ pojam: 'kzzxyz-nepostojeci' });
    assert.equal(a.ukupno, 0);
    assert.ok(/provjeriti/i.test(a.napomena));
  });

  it('svaki zapis ima izvor i pravni okvir je priložen', () => {
    const a = analyzeDecisions({});
    assert.ok(a.zapisi.every((z) => z.izvor?.naziv && z.ishod));
    assert.ok(a.pravniOkvir.length > 0);
  });
});
