---
name: eu-procurement-law
description: Pravo EU o javnoj nabavi – direktive, uredbe i praksa Suda EU. Koristi kada pitanje prelazi okvir RH ili treba EU pravni temelj.
---

# EU Procurement Law

EU okvir: direktive 2014/24/EU (javni sektor) i 2014/25/EU (komunalni sektor), relevantne uredbe i praksa Suda EU.

## Kada se koristi

- Kada treba EU pravni temelj (načela, pragovi, prekogranični elementi).
- Kada se tumači Sud EU (transparentnost, jednak tretman, zabrana diskriminacije).
- Ne koristiti za čisto nacionalna pitanja – tada procurement-law-research.

## Ulaz

| Polje | Obavezno | Opis |
|---|---|---|
| pitanje | da | Pravno pitanje s EU dimenzijom |
| akt | ne | Direktiva/uredba ili CELEX broj |

## Očekivani rezultat

- EU pravni temelj (akt + član) → stav Suda EU (ako postoji) → primjena u RH.
- Jasna oznaka direktnog učinka vs. nacionalne transpozicije.
- Citat: CELEX/EUR-Lex + datum važenja.

## Izvori i citiranje

- EUR-Lex (CELEX): direktive 2014/24/EU, 2014/25/EU; uredbe prema potrebi.
- Presude Suda EU (BJN pravna zaštita – EU sekcija).
- Nacionalna transpozicija (ZJN) – uvijek uz EU izvor.

## Sigurnosna ograničenja

- Ne izmišljati brojeve presuda Suda EU (C-…/…).
- Ne miješati prijedloge izmjena s važećim aktima.
- Transpozicija se provjerava u važećem ZJN-u, ne pretpostavlja.

## Primjer

Ulaz: načelo transparentnosti u tehničkim specifikacijama.
Izlaz: EU temelj → stav Suda EU → veza sa ZJN odredbom.
(Ilustrativno – brojeve uvijek provjeriti na EUR-Lexu.)

## Test

- `node --test tests/` zelen.
- Ručno: odgovor sadrži CELEX/EUR-Lex referencu ili oznaku "nepoznato".
