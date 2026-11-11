# Contract Watch (v0.9.0)

Praćenje izvršenja ugovora: garancije, rokovi završetka, obaveze, aneksi.

## Upotreba

```bash
node apps/contract-watch/cli.mjs 2026-11-11
```

Vlastiti podaci: `TPI_CONTRACTS=/putanja/ugovori.json node apps/contract-watch/cli.mjs`.
Ogledni podaci ostaju u `data/contracts.json` (sintetički, git-praćeni kao fixture).

## Pravila upozorenja

- Garancija istekla / ističe ≤30 dana → visok / srednji.
- Rok završetka prošao / ≤30 dana → visok / srednji.
- Neizvršena obaveza s prošlim rokom → visok.
- Svaki aneks → nisko upozorenje (provjera dopuštenosti izmjene – vidi contract-management-review skill).
