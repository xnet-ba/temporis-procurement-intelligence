# Tender Check AI (v0.5.0)

Deterministička kontrola dokumentacije o nabavi prije objave ili ponude.
Bez LLM-a: heuristička ekstrakcija + provjere + reference iz TPI znanja (FTS5).

## Upotreba

```bash
node apps/tender-check/cli.mjs apps/tender-check/fixtures/tender-ok.md
```

## Šta provjerava

- Prisutnost 10 obaveznih elemenata (predmet, vrsta, vrijednost, kriterij, rok, način predaje, ESPD, sposobnost, troškovnik, kontakt).
- Diskriminatorne formulacije (`samo original`, `bez jednakovrijednog`, marka bez klauzule).
- Unakrsna provjera: hodogram + propisi iz TPI znanja kao izvori izvještaja.

## Ograničenja

- Heuristika, ne pravno mišljenje – svaki nalaz se provjerava u važećem propisu.
- Radi na tekstu koji korisnik učita; tuđi podaci se ne pohranjuju (audit samo broji pozive).
