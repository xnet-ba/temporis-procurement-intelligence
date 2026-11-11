# TPI ROADMAP

## FAZA 0 – Discovery i projektna postavka (AKTIVNA)
- [x] Provjera okruženja, Git, GitHub CLI, pristup xnet-ba
- [x] Istraživanje temporis.hr, biltenjavnenabave.hr, Biltenko članak
- [x] Istraživanje MCP + Agent Skills standarda
- [x] Prijedlog arhitekture (`docs/architecture.md`)
- [x] GitHub struktura + plan prvih 30 dana (ovaj fajl)
- [ ] Kreiranje javnog repozitorija + inicijalni push
- [ ] Potvrde: Temporis/BJN saglasnost za korištenje znanja
- Kriterij kraja: repo je objavljen, PROJECT_STATUS ažuran, otvorena pitanja D-001..D-004 adresirana.

## FAZA 1 – TPI Foundation
- Struktura + standardi + testna infrastruktura + sigurnosna pravila.
- Kriterij: `node tests/*.test.mjs` zelen, CONTRIBUTING/SECURITY se poštuju.

## FAZA 2 – TPI Agent Skills
- Prvi paket: `bjn-knowledge`, `public-procurement-expert`, `procurement-law-research` (SKILL.md + primjeri + testovi).
- Kriterij: 3 skilla prolaze OpenCode discovery (ime=dir, opis 1–1024 znaka) + eval bez izmišljenih referenci.

## FAZA 3 – TPI MCP Prototip
- Read-only alati nad lokalnim testnim izvorima, auth stub, rate-limit, audit log.
- Kriterij: radi s OpenCode MCP klijentom, bez ijednog poziva prema BJN.

## FAZA 4 – TPI Knowledge
- Model podataka, metapodaci, verzioniranje, citiranje.
- Kriterij: test razlikuje važeći/historijski propis, odbija odgovor bez izvora.

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
