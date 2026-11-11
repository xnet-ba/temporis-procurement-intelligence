# TPI ROADMAP

## FAZA 0 – Discovery i projektna postavka (ZAVRŠENA 2026-11-11)
- [x] Provjera okruženja, Git, GitHub CLI, pristup xnet-ba
- [x] Istraživanje temporis.hr, biltenjavnenabave.hr, Biltenko članak
- [x] Istraživanje MCP + Agent Skills standarda
- [x] Prijedlog arhitekture (`docs/architecture.md`)
- [x] GitHub struktura + plan prvih 30 dana (ovaj fajl)
- [ ] Kreiranje javnog repozitorija + inicijalni push
- [ ] Potvrde: Temporis/BJN saglasnost za korištenje znanja
- Kriterij kraja: repo je objavljen, PROJECT_STATUS ažuran, otvorena pitanja D-001..D-004 adresirana.

## FAZA 1 – TPI Foundation (ZAVRŠENA 2026-11-11)
- [x] Struktura + standardi + testna infrastruktura + sigurnosna pravila.
- [x] ADR-002 (TypeScript) i ADR-003 (SQLite FTS5) prihvaćeni.
- Kriterij: `npm test` zelen ✅

## FAZA 2 – TPI Agent Skills (ZAVRŠENA 2026-11-11 – 16/16)
- [x] Svih 16 skillova (SKILL.md + discovery i sekcijski testovi).
- Kriterij: svih 16 prolazi discovery + struktura bez izmišljenih referenci. ✅

## FAZA 3 – TPI MCP Prototip (ZAVRŠEN 2026-11-11)
- [x] Read-only alati (9) nad oglednim izvorima, stub-auth, BJN licence-check, rate-limit, audit log.
- [x] Integracijski test: pravi MCP Client ↔ server (stdio), 9/9 zeleno.
- [ ] Ručna provjera s OpenCode MCP klijentom (1 naredba, vidi mcp/README.md).
- Kriterij: radi preko MCP protokola, bez ijednog poziva prema BJN. ✅

## FAZA 4 – TPI Knowledge (ZAVRŠENA 2026-11-11)
- [x] SQLite + FTS5 store (`knowledge/db.mjs`, shema po `record.schema.json`), MCP prebačen na FTS.
- [x] Citatni testovi: važeći/historijski, prazan rezultat = odbijanje, svaki zapis ima izvor+važenje+pouzdanost.
- Kriterij: test razlikuje važeći/historijski propis, odbija odgovor bez izvora. ✅

## FAZA 5 – Tender Check AI
- Analiza tenderske dokumentacije (lokalni dokumenti koje korisnik učita).
- Kriterij: evaluacija tačnosti na oglednim dokumentima.

## FAZA 6 – Napredni proizvodi
- Workspace, Radar, DKOM Analyzer, Contract Watch, Academy.
- Kriterij po aplikaciji: zaseban mini-spec + demo + test.

## Prvih 30 dana (prijedlog)
- Dana 1–7: Faza 0 završena, repo live, issue tracker (#1–#10).
- Dana 8–14: Faza 1 – test infra + ADR-004 (baza/protokol izbor).
- Dana 15–30: Faza 2 – prva 3 skilla + eval harness.
- Ne prelazi se u sljedeću fazu dok kriterij nije provjeren.
