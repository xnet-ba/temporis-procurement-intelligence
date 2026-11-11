// TPI smoke test – nula zavisnosti. Pokretanje: node tests/smoke.test.mjs
import { strict as assert } from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';

const root = new URL('..', import.meta.url).pathname;
const mustExist = [
  'README.md', 'ROADMAP.md', 'PROJECT_STATUS.md', 'CHANGELOG.md',
  'CONTRIBUTING.md', 'SECURITY.md', 'GOVERNANCE.md', 'LICENSE.NOTE.md', '.gitignore',
  'docs/vision.md', 'docs/architecture.md', 'docs/research.md',
  'docs/legal-and-data-rights.md', 'docs/security.md', 'docs/product-modules.md',
  'docs/decisions/ADR-001-monorepo.md',
  'core', 'knowledge', 'mcp', 'apps', 'integrations', 'examples',
];
for (const p of mustExist) {
  assert.ok(fs.existsSync(path.join(root, p)), `nedostaje: ${p}`);
}
const skills = fs.readdirSync(path.join(root, 'skills'));
assert.equal(skills.length, 16, `očekivano 16 skill direktorija, nađeno ${skills.length}`);
console.log(`TPI smoke: OK (${mustExist.length} staza + 16 skillova)`);
