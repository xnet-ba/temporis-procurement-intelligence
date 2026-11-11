# DKOM Analyzer (v0.6.0)

Napredna analiza odluka i obrazaca iz prakse DKOM-a + poređenje s propisima.
Radi nad TPI znanjem (FTS5). Ogledni podaci – obrasci nisu statistički reprezentativni.

## Upotreba

```bash
node apps/dkom-analyzer/cli.mjs "tehničke specifikacije"
```

## Šta radi

- Pretraga odluka po pojmu, grupisanje po ishodu (usvojena / odbijena / poništenje).
- Uz svaku odluku: KLASA-izvor, datum, ishod.
- Prilaže mogući pravni okvir (propisi iz znanja) – uvijek uz napomenu provjere u važećem tekstu.
