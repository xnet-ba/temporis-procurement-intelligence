// TPI MCP integracijski test – pravi Client protiv pravog servera (stdio).
// Pokretanje: npm test (root) ili npm test (mcp/)
import { describe, it, before, after } from 'node:test';
import { strict as assert } from 'node:assert';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Client } from '@modelcontextprotocol/client';
import { StdioClientTransport } from '@modelcontextprotocol/client/stdio';

const here = path.dirname(fileURLToPath(import.meta.url));
const serverFile = path.join(here, 'server.mjs');

async function connect(env = {}) {
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [serverFile],
    env: { ...process.env, TPI_AUDIT_LOG: path.join(here, 'audit-test.log'), ...env },
  });
  const client = new Client({ name: 'tpi-test', version: '0.3.0' });
  await client.connect(transport);
  return client;
}

function text(res) {
  return res.content.map((c) => c.text ?? '').join('\n');
}

describe('tpi-mcp prototip', () => {
  let client;
  before(async () => { client = await connect(); });
  after(async () => { await client.close(); });

  it('nudi svih 9 alata', async () => {
    const { tools } = await client.listTools();
    assert.equal(tools.length, 9);
  });

  it('search_regulations vraća ogledni zapis s upozorenjem', async () => {
    const res = await client.callTool({ name: 'search_regulations', arguments: { pojam: 'otvoreni' } });
    const t = text(res);
    assert.ok(t.includes('SINTETIČKI'), 'svaki odgovor nosi oznaku sintetičkih podataka');
    assert.ok(t.includes('syn-zakon-001'));
  });

  it('check_regulation_status vraća status nepoznat za ogled', async () => {
    const res = await client.callTool({ name: 'check_regulation_status', arguments: { oznakaPropisa: 'syn-zakon-001' } });
    assert.ok(text(res).includes('nepoznat'));
  });

  it('get_procedure_workflow nalazi hodogram', async () => {
    const res = await client.callTool({ name: 'get_procedure_workflow', arguments: { vrstaPostupka: 'otvoreni' } });
    assert.ok(text(res).includes('syn-hodogram-otvoreni'));
  });

  it('analyze_procurement_question vraća strukturu s pouzdanošću', async () => {
    const res = await client.callTool({ name: 'analyze_procurement_question', arguments: { pitanje: 'rok za žalbu' } });
    const t = text(res);
    assert.ok(t.includes('nivoPouzdanosti') && t.includes('izvori'));
  });

  it('nevažeći ulaz se odbija (validacija)', async () => {
    const res = await client.callTool({ name: 'search_regulations', arguments: {} });
    assert.ok(res.isError, 'prazan pojam mora biti greška');
  });

  it('search_bjn_knowledge bez licence vraća nedostupno', async () => {
    const c2 = await connect({ TPI_BJN_LICENSE: '0' });
    const res = await c2.callTool({ name: 'search_bjn_knowledge', arguments: { pojam: 'žalba' } });
    assert.ok(text(res).includes('nedostupno'));
    await c2.close();
  });

  it('stub-auth odbija pogrešan token', async () => {
    const c3 = await connect({ TPI_MCP_TOKEN: 'tajna' });
    const res = await c3.callTool({ name: 'search_regulations', arguments: { pojam: 'otvoreni', token: 'pogrešan' } });
    assert.ok(res.isError, 'pogrešan token mora biti greška');
    const ok = await c3.callTool({ name: 'search_regulations', arguments: { pojam: 'otvoreni', token: 'tajna' } });
    assert.ok(!ok.isError, 'ispravan token prolazi');
    await c3.close();
  });

  it('rate-limit zaustavlja prekomjerne pozive', async () => {
    const c4 = await connect({ TPI_RATE_LIMIT: '2' });
    await c4.callTool({ name: 'search_regulations', arguments: { pojam: 'a' } });
    await c4.callTool({ name: 'search_regulations', arguments: { pojam: 'b' } });
    const res = await c4.callTool({ name: 'search_regulations', arguments: { pojam: 'c' } });
    assert.ok(res.isError, 'treći poziv uz limit 2 mora biti greška');
    await c4.close();
  });
});
