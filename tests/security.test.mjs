// TPI security test – bez tajni u repozitoriju. Pokretanje: npm test
// Namjerno ne skenira tests/ (ovaj fajl sadrži uzorke napada kao stringove).
import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const SKIP_DIRS = new Set(['.git', 'node_modules', 'tests']);
const SECRET_PATTERNS = [
  /ghp_[A-Za-z0-9]{8,}/,
  /sk-(proj|live)-[A-Za-z0-9_-]{8,}/,
  /-----BEGIN (RSA )?PRIVATE KEY-----/,
  /(api[_-]?key|client[_-]?secret)\s*[:=]\s*['"][^'"]{8,}['"]/i,
];

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (!SKIP_DIRS.has(e.name)) walk(path.join(dir, e.name), out);
    } else out.push(path.join(dir, e.name));
  }
  return out;
}

describe('security', () => {
  it('nema .env niti ključeva u stablu', () => {
    const files = walk(root);
    const bad = files.filter((f) => /(^|\/)\.env(\.|$)/.test(f) || /\.(pem|key)$/.test(f));
    assert.deepEqual(bad, []);
  });
  it('nema uzoraka tajni u sadržaju', () => {
    const hits = [];
    for (const f of walk(root)) {
      if (fs.statSync(f).size > 200_000) continue;
      let text = '';
      try { text = fs.readFileSync(f, 'utf8'); } catch { continue; }
      for (const re of SECRET_PATTERNS) if (re.test(text)) hits.push(`${f}: ${re}`);
    }
    assert.deepEqual(hits, []);
  });
  it('.gitignore pokriva tajne', () => {
    const gi = fs.readFileSync(path.join(root, '.gitignore'), 'utf8');
    assert.ok(gi.includes('.env'), '.gitignore mora pokrivati .env');
  });
});
