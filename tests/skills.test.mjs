// TPI skills test – OpenCode discovery pravila + obavezne sekcije.
// Pokretanje: npm test
import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const skillsDir = path.join(root, 'skills');
const NAME_RE = /^[a-z0-9]+(-[a-z0-9]+)*$/;
const REQUIRED_HEADINGS = [
  '## Kada se koristi',
  '## Ulaz',
  '## Očekivani rezultat',
  '## Izvori i citiranje',
  '## Sigurnosna ograničenja',
  '## Primjer',
  '## Test',
];

function parseFrontmatter(text) {
  const m = text.match(/^---\n([\s\S]*?)\n---/);
  assert.ok(m, 'SKILL.md mora počinjati YAML frontmatterom (---)');
  const fm = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) fm[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return fm;
}

const dirs = fs.readdirSync(skillsDir).filter((d) =>
  fs.statSync(path.join(skillsDir, d)).isDirectory()
);

describe('skills format', () => {
  for (const dir of dirs) {
    it(`${dir}: ime direktorija je validno`, () => {
      assert.ok(NAME_RE.test(dir), `nevalidno ime: ${dir}`);
    });
    const skillFile = path.join(skillsDir, dir, 'SKILL.md');
    if (!fs.existsSync(skillFile)) continue; // prazan stub – dozvoljen do Faze 2
    it(`${dir}: frontmatter name/description`, () => {
      const fm = parseFrontmatter(fs.readFileSync(skillFile, 'utf8'));
      assert.equal(fm.name, dir, 'name mora biti jednak imenu direktorija');
      assert.ok(fm.description && fm.description.length >= 1 && fm.description.length <= 1024,
        'description 1–1024 znaka');
    });
    it(`${dir}: obavezne sekcije`, () => {
      const body = fs.readFileSync(skillFile, 'utf8');
      for (const h of REQUIRED_HEADINGS) assert.ok(body.includes(h), `nedostaje: ${h}`);
    });
  }
});
