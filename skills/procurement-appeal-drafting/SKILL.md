---
name: procurement-appeal-drafting
description: Pomoć pri nacrtu žalbe DKOM-u ili prigovora u jednostavnoj nabavi – struktura, navodi, dokazi. Koristi kao predložak, ne kao gotov pravni akt.
---

# Procurement Appeal Drafting

Strukturirani nacrt pravnog lijeka s kontrolom potpunosti.

## Kada se koristi

- Žalba DKOM-u u javnoj nabavi; prigovor naručitelju u jednostavnoj nabavi.
- Odgovor na žalbu (naručitelj).
- Ne koristiti kao konačan akt bez pravnika – uvijek oznaka "nacrt za stručnu provjeru".

## Ulaz

| Polje | Obavezno | Opis |
|---|---|---|
| postupak | da | Vrsta postupka i faza |
| navodi | da | Sporne tačke (korisnik opisuje) |
| dokazi | ne | Raspoloživi dokazi |

## Očekivani rezultat

- Struktura: ovlaštenik → rok → navodi (svaki: činjenično + pravno) → dokazni prijedlozi → zahtjev.
- Kontrola: rok provjeren u propisu, svaki navod vezan za dokaz, jasan zahtjev.
- Upozorenje na nedostatke (npr. navod bez dokaza).

## Izvori i citiranje

- Važeći ZJN (pravna zaštita: rokovi, sadržaj žalbe) + datum važenja.
- DKOM praksa o urednosti žalbi.
- Hodogram pravne zaštite (BJN).

## Sigurnosna ograničenja

- Nikad "gotova žalba" – uvijek nacrt + obavezna provjera pravnika.
- Ne izmišljati rokove – svaki rok s članom propisa.
- Ne obećavati ishod.

## Primjer

Ulaz: ogledni navod o diskriminatornoj specifikaciji.
Izlaz: struktura navoda → pravni temelj → dokaz → zahtjev.
(Ilustrativno.)

## Test

- `node --test tests/` zelen.
- Ručno: nacrt sadrži rok s članom i oznaku "za stručnu provjeru".
