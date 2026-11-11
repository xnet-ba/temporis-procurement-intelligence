# Nabava Workspace (v0.10.0)

Radni prostor za cijeli ciklus nabave: projekti sa stavkama (dokument, rok, evaluacija, ugovor, aneks, isporuka, garancija, napomena).

## Upotreba

```bash
node apps/nabava-workspace/cli.mjs status P-001 2026-11-11
TPI_WORKSPACE=/putanja/workspace.json node apps/nabava-workspace/cli.mjs novi "Nova nabava"
```

## Pravila

- Perzistencija: lokalna JSON datoteka (`TPI_WORKSPACE` ili `data/workspace.json`).
- Stavka kasni samo ako je otvorena i rok je prošao u odnosu na zadani datum.
- Tipovi stavki su zatvorena lista – nepoznat tip se odbija.
