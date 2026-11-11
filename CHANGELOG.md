# CHANGELOG

Format: Keep a Changelog. Datumi u UTC.

## [0.9.0] – 2026-11-11
### Dodano (FAZA 6 – 3/5: Tender Radar)
- `apps/tender-radar/`: 4 ogledne objave, profil-matching (CPV grupa +2, ostalo +1), isključenje po roku, digest
- 5 testova bodovanja (puno/djelomično/bez poklapanja, rok, sortiranje)

## [0.8.0] – 2026-11-11
### Dodano (FAZA 6 – 2/5: Nabava Academy)
- `apps/nabava-academy/`: 3 lekcije s izvorima, kviz-CLI, bodovanje bez duplog brojanja, napredak in-memory
- 5 testova (uključujući: lekcija ne odaje tačne odgovore)

## [0.7.0] – 2026-11-11
### Dodano (FAZA 6 započeta – DKOM Analyzer)
- `apps/dkom-analyzer/`: grupisanje odluka po ishodu, pravni okvir iz FTS-a, `analyzer.test.mjs` (4 testa)
- `knowledge/db.mjs`: hash-verzioniranje baze (atomski rebuild preko temp fajla – fix utrke paralelnih procesa)
- 2 nove ogledne odluke DKOM-a (ukupno 11 zapisa)
### Otvoreno
- Issue #9 (preostale 4 aplikacije Faze 6)

## [0.6.0] – 2026-11-11
### Dodano (FAZA 5 – Tender Check AI, prvi poslovni alat)
- `apps/tender-check/`: `check.mjs` (10 stavki, diskriminatorni signali, FTS reference), `cli.mjs`, 3 ogledna DON-a, `check.test.mjs` (4 eval testa)
- Popravljen bug: ekstrakcija vrijednosti uzima zadnju regex grupu
### Zatvoreno
- Issue #8 (Faza 5)

## [0.5.0] – 2026-11-11
### Dodano (FAZA 4 – Knowledge, MCP na FTS5)
- `knowledge/db.mjs`: SQLite + FTS5 (`node:sqlite`, nula novih zavisnosti), verzioniranje (`zamijenjenSa`, datumi važenja)
- `knowledge/search.test.mjs`: 6 citatnih testova (FTS, važeći/historijski, odbijanje bez izvora)
- 2 nova ogledna zapisa (važeći vs historijski pravilnik); MCP `check_regulation_status` koristi pravu logiku važenja
### Zatvoreno
- Issue #7 (Faza 4)

## [0.4.0] – 2026-11-11
### Dodano (FAZA 2 kompletna – 16/16 skillova)
- Preostalih 13 SKILL.md po predlošku (dkom/vus/eu analize, tender review, specifikacije, ESPD, ponuda, žalba, rokovi, ugovor, rizik, izvještaji, radar)
- Svi primjeri označeni ilustrativno; bez izmišljenih KLASA/CELEX brojeva
### Test
- `npm test`: 61/61 zeleno (16 skillova × discovery + sekcije)

## [0.3.0] – 2026-11-11
### Dodano (FAZA 3 – MCP prototip, 9/9 testova zeleno)
- `mcp/server.mjs`: 9 read-only alata, zod validacija, stub-auth, BJN licence-check, rate-limit, audit log (bez PII)
- `mcp/server.test.mjs`: pravi MCP Client ↔ server preko stdio (alati, validacija, auth, licenca, rate-limit)
- `knowledge/synthetic/records.json`: 7 oglednih zapisa, svi označeni SINTETIČKI
- `mcp/README.md`: pokretanje + OpenCode wiring (`opencode mcp add tpi`)
- Root `npm test` pokriva i mcp testove
### Zatvoreno
- Issue #4 (MCP prototip)

## [0.2.0] – 2026-11-11
### Dodano (FAZA 1 + prva 3 skilla FAZE 2)
- `package.json` (`npm test` → `node --test tests/`), `tests/skills.test.mjs` (discovery + 7 obaveznih sekcija), `tests/security.test.mjs` (sken tajni)
- `knowledge/record.schema.json` (KnowledgeRecord: tip, izvor, citati, važenje, pouzdanost)
- `mcp/tools.json` (ugovor 9 read-only alata)
- `docs/skill-template.md`; skillovi: `bjn-knowledge`, `public-procurement-expert`, `procurement-law-research`
- ADR-002/ADR-003 prihvaćeni (TypeScript, SQLite FTS5)
### Zatvoreno
- Issue #1 (test infra), #2 (ADR odluke), #3 (prva 3 skilla)

## [0.1.0] – 2026-11-11
### Dodano
- Bogati README (bedževi, mermaid dijagrami, tabele skillova/alata/aplikacija)
- LICENSE (MIT); LICENSE.NOTE riješen; dozvola za BJN sadržaj evidentirana
### Zatvoreno
- D-001 (dozvola BJN), D-002 (licenca MIT)

## [0.0.1] – 2026-11-11
### Dodano
- Inicijalna struktura FAZE 0: README, ROADMAP, PROJECT_STATUS, CHANGELOG, CONTRIBUTING, SECURITY, GOVERNANCE
- docs/: vision, architecture, research, legal-and-data-rights, security, product-modules
- docs/decisions/: ADR-001, ADR-002, ADR-003
- tests/smoke.test.mjs – provjera strukture bez zavisnosti
- .gitignore (secrets, node, python, env)
