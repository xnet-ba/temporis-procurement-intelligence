# Tender Radar (v0.8.0)

Filtriranje prilika po profilu ponuditelja: CPV (grupni nivo), lokacija, vrijednost, vrsta, rok.

## Upotreba

```bash
node apps/tender-radar/cli.mjs apps/tender-radar/profiles/profil-it.json 2026-11-11
```

## Bodovanje

CPV grupa +2 · lokacija +1 · vrsta +1 · vrijednost u rangu +1.
≥4 odgovara · 2–3 uslovno · <2 ne odgovara · prošao rok = isključena.

## Ograničenja

- Radi nad lokalnim oglednim objavama. Live-feed (EOJN/TED) tek uz ugovor s izvorom – bez scrapeanja portala.
- Ocjena je usklađenost profila, ne garancija dobitka.
