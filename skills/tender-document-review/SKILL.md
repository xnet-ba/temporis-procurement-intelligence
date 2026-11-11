---
name: tender-document-review
description: Pregled dokumentacije o nabavi – uslovi, kriteriji, rokovi, sposobnost, nejasnoće. Koristi prije objave ili prije pripreme ponude.
---

# Tender Document Review

Sistematski pregled dokumentacije o nabavi (DON) s kontrolnom listom i nalazom nejasnoća.

## Kada se koristi

- Naručitelj: kontrola DON-a prije objave.
- Ponuditelj: razumijevanje zahtjeva prije izrade ponude.
- Ne koristiti za gotovu ponudu – tada bid-compliance-review.

## Ulaz

| Polje | Obavezno | Opis |
|---|---|---|
| dokumentacija | da | Tekst DON-a (korisnik učitava) |
| uloga | ne | narucitelj / ponuditelj |

## Očekivani rezultat

- Kontrolna lista: predmet, procijenjena vrijednost, kriteriji, rokovi, sposobnost, razlozi isključenja, ESPD, troškovnik.
- Spisak nejasnoća i potencijalno spornih tačaka s referencom na propis.
- Preporuka: pitanje naručitelju / izmjena DON-a / pravna provjera.

## Izvori i citiranje

- Važeći ZJN (odredbe o DON-u, kriterijima, rokovima) + datum važenja.
- DKOM praksa o tipičnim pogreškama u dokumentaciji.
- Svaki nalaz vezan za konkretan dio DON-a.

## Sigurnosna ograničenja

- Ne nagađati sadržaj koji nije u učitanom dokumentu.
- Ne davati konačnu ocjenu zakonitosti – samo nalazi + preporuke.
- Tuđi poslovni podaci iz dokumentacije se ne pohranjuju niti dijele.

## Primjer

Ulaz: ogledni DON s nejasnim kriterijem.
Izlaz: stavka liste → nalaz → referenca → preporuka.
(Ilustrativno.)

## Test

- `node --test tests/` zelen.
- Ručno: pregled oglednog DON-a pronalazi ≥1 nejasnoću s referencom.
