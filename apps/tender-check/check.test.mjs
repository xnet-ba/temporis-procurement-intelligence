// Tender Check eval – točnost na oglednim dokumentima.
import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { analyzeTender } from './check.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const load = (f) => fs.readFileSync(path.join(here, 'fixtures', f), 'utf8');

describe('tender-check eval', () => {
  it('uredan DON: sve stavke prisutne, bez kritičnih nalaza', () => {
    const r = analyzeTender(load('tender-ok.md'));
    assert.ok(r.stavke.every((s) => s.status === 'prisutno'), JSON.stringify(r.stavke.filter((s) => s.status !== 'prisutno')));
    assert.equal(r.upozorenja.length, 0);
    assert.equal(r.status, 'bez kritičnih nalaza');
  });

  it('DON bez roka: stavka nedostaje + visoko upozorenje', () => {
    const r = analyzeTender(load('tender-bez-roka.md'));
    assert.equal(r.stavke.find((s) => s.id === 'rok').status, 'nedostaje');
    assert.ok(r.upozorenja.some((u) => u.nivo === 'visok' && /rok/i.test(u.nalaz)));
    assert.equal(r.status, 'ima kritičnih nalaza');
  });

  it('diskriminatorni DON: flag na spornu formulaciju', () => {
    const r = analyzeTender(load('tender-diskriminatorni.md'));
    assert.ok(r.upozorenja.some((u) => /diskriminator/i.test(u.nalaz)), JSON.stringify(r.upozorenja));
  });

  it('izvještaj uvijek nosi izvore ili oznaku da ih nema + ogradu', () => {
    for (const f of ['tender-ok.md', 'tender-bez-roka.md', 'tender-diskriminatorni.md']) {
      const r = analyzeTender(load(f));
      assert.ok(Array.isArray(r.izvori));
      assert.ok(/nije pravno mišljenje/i.test(r.napomena));
    }
  });
});
