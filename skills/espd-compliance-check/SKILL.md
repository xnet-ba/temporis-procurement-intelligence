---
name: espd-compliance-check
description: Provjera ESPD obrasca – popunjenost, dosljednost s DON-om, oslanjanje i zajednica. Koristi prije predaje ponude kroz EOJN.
---

# ESPD Compliance Check

Kontrola Europske jedinstvene dokumentacije o nabavi prije predaje.

## Kada se koristi

- Ponuditelj, zajednica ponuditelja, podugovaratelji, oslanjanje na sposobnost drugog subjekta.
- Provjera dosljednosti ESPD-a s dokazima koji se traže u DON-u.
- Ne koristiti za cijelu ponudu – tada bid-compliance-review.

## Ulaz

| Polje | Obavezno | Opis |
|---|---|---|
| espd | da | Sadržaj/popunjen ESPD (korisnik učitava) |
| zahtjevi | ne | Izvod zahtjeva iz DON-a (sposobnost, isključenje) |

## Očekivani rezultat

- Kontrolna lista po dijelovima ESPD-a (I–VI): popunjeno / nepotpuno / nedosljedno.
- Upozorenja: oslanjanje bez dokaza, zajednica bez jasnih udjela, neslaganje s DON-om.
- Preporuka ispravke prije roka za predaju.

## Izvori i citiranje

- Važeći ZJN (odredbe o ESPD-u, oslanjanju, zajednici).
- Upute EOJN-a za predaju ESPD obrasca.
- DKOM praksa o odbacivanju zbog ESPD grešaka.

## Sigurnosna ograničenja

- Ne pohranjivati OIB, JMBG ni druge identifikatore iz ESPD-a.
- Ne tvrditi da je ESPD "ispravan" – samo "bez uočenih nedostataka u provjerenim stavkama".
- Rokove provjeriti u DON-u, ne pretpostavljati.

## Primjer

Ulaz: ogledni ESPD bez dijela o oslanjanju uz zahtjev DON-a.
Izlaz: stavka → nedostatak → preporuka.
(Ilustrativno.)

## Test

- `node --test tests/` zelen.
- Ručno: ogledni ESPD s nedostatkom daje upozorenje s referencom na dio obrasca.
