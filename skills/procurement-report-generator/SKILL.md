---
name: procurement-report-generator
description: Strukturirani izvještaji iz nabave – nalazi s referencama, bez izmišljenih podataka. Koristi za interne i eksterne izvještaje.
---

# Procurement Report Generator

Izvještaj koji se može braniti: svaka tvrdnja ima izvor.

## Kada se koristi

- Izvještaj o postupku, analizi ponuda, kontroli ili reviziji.
- Sažetak za rukovodstvo s prilozima detalja.
- Ne koristiti za izmišljanje podataka koji nedostaju – praznine se označavaju.

## Ulaz

| Polje | Obavezno | Opis |
|---|---|---|
| tema | da | Predmet izvještaja |
| podaci | da | Raspoloživi podaci (korisnik učitava) |
| publika | ne | strucna / rukovodstvo |

## Očekivani rezultat

- Struktura: sažetak → metodologija/izvori → nalazi (svaki s referencom) → rizici → preporuke → prilozi.
- Tabela praćenja: tvrdnja → izvor → status provjere.
- Praznine jasno označene ("nije dostupno").

## Izvori i citiranje

- Svi korišteni izvori navedeni s datumom i statusom važenja.
- Razlikovati izvorni dokument od AI interpretacije.

## Sigurnosna ograničenja

- Bez izvora nema tvrdnje – pravilo bez izuzetka.
- Povjerljivi podaci samo uz ovlaštenje; izvještaj se ne dijeli dalje.
- Brojke se ne zaokružuju bez napomene.

## Primjer

Ulaz: ogledni podaci o postupku.
Izlaz: izvještaj s tabelom tvrdnja→izvor i označenim prazninama.
(Ilustrativno.)

## Test

- `node --test tests/` zelen.
- Ručno: izvještaj bez ijedne tvrdnje bez izvora; praznine označene.
