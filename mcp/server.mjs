// TPI MCP server – read-only prototip na SINTETIČKIM podacima (knowledge/db.mjs, FTS5).
// Nema pristupa BJN/EOJN/DKOM niti bilo kojoj vanjskoj bazi.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { McpServer } from '@modelcontextprotocol/server';
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import * as z from 'zod';
import { searchRecords, getRecord, recordStatus } from '../knowledge/db.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));

const CFG = {
  token: process.env.TPI_MCP_TOKEN || null, // stub-auth: ako je postavljen, svaki poziv ga mora sadržavati
  bjnLicence: (process.env.TPI_BJN_LICENSE ?? '1') === '1',
  rateLimit: Number(process.env.TPI_RATE_LIMIT ?? 60),
  auditLog: process.env.TPI_AUDIT_LOG || path.join(here, 'audit.log'),
};
const UPOZORENJE = 'SINTETIČKI OGLEDNI PODACI – nisu pravni izvor, služe samo testiranju.';
const hits = { count: 0, windowStart: Date.now() };

function audit(tool, ok) {
  const line = JSON.stringify({ ts: new Date().toISOString(), tool, ok }) + '\n';
  try { fs.appendFileSync(CFG.auditLog, line); } catch { /* prototip: audit ne smije srušiti poziv */ }
}

function guard() {
  const now = Date.now();
  if (now - hits.windowStart > 60_000) { hits.count = 0; hits.windowStart = now; }
  if (++hits.count > CFG.rateLimit) throw new Error(`rate limit prekoračen (${CFG.rateLimit}/min)`);
}

function checkAuth(token) {
  if (CFG.token && token !== CFG.token) throw new Error('neautorizirano: nevažeći token (stub-auth)');
}

function out(payload) {
  return { content: [{ type: 'text', text: JSON.stringify({ upozorenje: UPOZORENJE, ...payload }, null, 2) }] };
}

function search(pojam, types = null, jurisdikcija = null) {
  return searchRecords(pojam, { types, jurisdikcija, limit: 10 });
}

const Token = { token: z.string().optional().describe('stub-auth token (obavezan ako je TPI_MCP_TOKEN postavljen)') };

serveStdio(() => {
  const server = new McpServer({ name: 'tpi-mcp', version: '0.3.0' });

  const wrap = (name, schema, fn) => server.registerTool(name, { description: schema._desc, inputSchema: schema._schema },
    async (args) => {
      try {
        guard();
        checkAuth(args.token);
        const payload = fn(args);
        audit(name, true);
        return out(payload);
      } catch (e) {
        audit(name, false);
        return { content: [{ type: 'text', text: `Greška (${name}): ${e.message}` }], isError: true };
      }
    });

  const reg = (q, extra = {}) => search(q, ['zakon', 'pravilnik'], extra.jurisdikcija);
  wrap('search_regulations',
    { _desc: 'Pretraga propisa; vraća član, datum i status važenja.', _schema: z.object({ pojam: z.string().min(1), jurisdikcija: z.enum(['RH', 'EU']).optional(), ...Token }) },
    (a) => ({ zapisi: reg(a.pojam, a), nivoPouzdanosti: 'nizak' }));

  wrap('search_dkom_decisions',
    { _desc: 'Pretraga OGLEDNIH odluka DKOM-a.', _schema: z.object({ pojam: z.string().min(1), ...Token }) },
    (a) => ({ zapisi: search(a.pojam, ['odluka-dkom']), nivoPouzdanosti: 'nizak' }));

  wrap('search_vus_decisions',
    { _desc: 'Pretraga OGLEDNIH presuda VUS-a.', _schema: z.object({ pojam: z.string().min(1), ...Token }) },
    (a) => ({ zapisi: search(a.pojam, ['presuda-vus']), nivoPouzdanosti: 'nizak' }));

  wrap('search_eu_case_law',
    { _desc: 'Pretraga OGLEDNE prakse Suda EU.', _schema: z.object({ pojam: z.string().min(1), ...Token }) },
    (a) => ({ zapisi: search(a.pojam, ['presuda-sud-eu']), nivoPouzdanosti: 'nizak' }));

  wrap('search_expert_articles',
    { _desc: 'Pretraga OGLEDNIH stručnih članaka.', _schema: z.object({ pojam: z.string().min(1), ...Token }) },
    (a) => ({ zapisi: search(a.pojam, ['strucni-clanak', 'misljenje-institucije']), nivoPouzdanosti: 'nizak' }));

  wrap('search_bjn_knowledge',
    { _desc: 'Mreža znanja BJN-a (prototip na oglednim podacima, zahtijeva licencu).', _schema: z.object({ pojam: z.string().min(1), kategorija: z.enum(['faq', 'misljenje', 'clanak', 'propis', 'hodogram']).optional(), ...Token }) },
    (a) => {
      if (!CFG.bjnLicence) return { status: 'nedostupno – potrebna BJN licenca', zapisi: [], nivoPouzdanosti: 'nepoznat' };
      const map = { faq: ['faq'], misljenje: ['misljenje-institucije'], clanak: ['strucni-clanak'], propis: ['zakon', 'pravilnik'], hodogram: ['hodogram'] };
      return { zapisi: search(a.pojam, a.kategorija ? map[a.kategorija] : null), nivoPouzdanosti: 'nizak' };
    });

  wrap('get_procedure_workflow',
    { _desc: 'Hodogram postupka korak-po-korak (ogledni podaci).', _schema: z.object({ vrstaPostupka: z.string().min(1), ...Token }) },
    (a) => {
      const found = search(a.vrstaPostupka, ['hodogram']);
      if (!found.length) return { status: 'hodogram nije pronađen', dostupni: searchRecords('hodogram', { types: ['hodogram'] }).map((r) => r.id) };
      return { hodogram: found[0], nivoPouzdanosti: 'nizak' };
    });

  wrap('analyze_procurement_question',
    { _desc: 'Strukturirani odgovor s citatima i nivoom pouzdanosti (prototip).', _schema: z.object({ pitanje: z.string().min(1), ...Token }) },
    (a) => {
      const relevantni = search(a.pitanje.split(/\s+/).sort((x, y) => y.length - x.length)[0] || '', null).slice(0, 3);
      return {
        zakljucak: 'prototip – konačan odgovor tek nakon provjere važećih izvora',
        koraci: ['provjeriti važeći propis', 'provjeriti hodogram', 'procijeniti rizik'],
        rizici: ['ogledni podaci nisu pravni temelj'],
        izvori: relevantni.map((r) => ({ id: r.id, naziv: r.izvor.naziv, statusVazenja: r.statusVazenja })),
        nivoPouzdanosti: 'nizak',
      };
    });

  wrap('check_regulation_status',
    { _desc: 'Status propisa: važeći / historijski / nepoznat (ogledni podaci).', _schema: z.object({ oznakaPropisa: z.string().min(1), datum: z.string().optional(), ...Token }) },
    (a) => {
      const found = search(a.oznakaPropisa, ['zakon', 'pravilnik']);
      if (!found.length) return { status: 'nepoznat', napomena: 'propis nije pronađen u oglednoj bazi' };
      return { id: found[0].id, ...recordStatus(found[0].id, a.datum) };
    });

  return server;
});
