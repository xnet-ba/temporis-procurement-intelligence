# Temporis Procurement Intelligence (TPI)

Modularni AI ekosistem za javnu nabavu u Republici Hrvatskoj.
Nosilac: **Temporis**. Stručna osnova: **Bilten javne nabave (BJN)**.

> Status: FAZA 0 – Discovery i projektna postavka. Nema produkcijskog koda, nema pristupa zaštićenom BJN sadržaju.

## Šta je TPI

- `skills/` – modularne AI agentske vještine (OpenCode-kompatibilan `SKILL.md` format)
- `mcp/` – standardizirani MCP server (read-only prototip, Tekuća faza: plan)
- `knowledge/` – model podataka, metapodaci, verzioniranje, citiranje (plan)
- `apps/` – poslovne aplikacije: tender-check, nabava-workspace, tender-radar, dkom-analyzer, contract-watch, nabava-academy (plan)
- `core/` – konfiguracija, identitet, konektori, audit log (plan)
- `integrations/` – opencode / claude / mcp-clients
- `docs/` – vizija, arhitektura, istraživanje, pravna osnova, odluke (ADR)

## Pravna granica (bitno)

- TPI **nema** licencu, API niti pravo na automatizirani pristup BJN sadržaju dok se to izričito ne ugovori.
- Bez scrapinga zaštićenog sadržaja. Prvi MCP prototip radi isključivo s lokalnim testnim izvorima.
- AI izlaz nije pravno mišljenje. Svaki modul mora citirati izvor, član/stav/tačku, datum i status važenja.

## Brzi start

```bash
git clone https://github.com/xnet-ba/temporis-procurement-intelligence
cd temporis-procurement-intelligence
node tests/smoke.test.mjs  # provjera strukture, bez zavisnosti
```

## Dokumenti

- `ROADMAP.md` – faze 0–6 i kriteriji završetka
- `PROJECT_STATUS.md` – trenutna faza, zadaci, blokade
- `docs/vision.md`, `docs/architecture.md`, `docs/research.md`
- `docs/legal-and-data-rights.md` – dozvole koje se moraju pribaviti
- `docs/decisions/` – Architecture Decision Records

## Licenca

Nije odabrana. Vidi `LICENSE.NOTE.md`. Prijedlog i odobrenje potrebni prije Faze 2.
