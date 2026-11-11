# PROJECT_STATUS

- Datum posljednje provjere: 2026-11-11
- Trenutna faza: FAZA 3 završena – sljedeće: 13 preostalih skillova ili Faza 5 (Tender Check AI)
- Posljednji commit: dbe7dbf (faza0 struktura) + push na main

## Završeno
- Okruženje provjereno: git 2.43, gh 2.45 (auth xnet-ba), node v22.23.4, python 3.12, opencode v2.2.7
- Repo `xnet-ba/temporis-procurement-intelligence` ne postoji → slobodno za kreiranje, bez rizika prepisivanja
- Istraženi temporis.hr, biltenjavnenabave.hr, Poslovni.hr članak o Biltenku (01.10.2025)
- Istraženi standardi: MCP TS SDK v2 (spec 2026-07-28), OpenCode SKILL.md format
- Lokalna struktura kreirana (core/knowledge/mcp/skills×16/apps×6/integrations/tests/examples/docs)

## Aktivno
- Kreiranje javnog repozitorija + inicijalni push

## Blokade / otvorena pitanja
- D-001: RIJEŠENO 2026-11-11 – dozvola za BJN sadržaj dobijena (izjava nosioca), uz atribuciju
- D-002: RIJEŠENO 2026-11-11 – licenca MIT (LICENSE)
- D-003: Tehnološki izbor MCP jezika (TS vs Python) → ADR-002 daje preporuku, odluka u Fazi 1
- D-004: Izbor pohrane znanja (SQLite FTS vs Postgres/pgvector) → odluka u Fazi 1 nakon ADR-003

## Sljedeći korak
1. `gh repo create` + push + verifikacija
2. Otvoriti GitHub Issues #1–#8 (tracker faza)
3. Početak FAZE 1 nakon odobrenja licence i D-001 stava
