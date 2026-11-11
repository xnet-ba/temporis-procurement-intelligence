---
name: technical-specification-audit
description: Revizija tehničkih specifikacija – diskriminatorni uslovi, upućivanje na marku, jednakovrijednost. Koristi za fer i zakonit opis predmeta nabave.
---

# Technical Specification Audit

Provjera da tehničke specifikacije opisuju predmet, a ne ponuditelja.

## Kada se koristi

- Kada treba provjeriti diskriminiraju li specifikacije (marka, patent, norma bez "ili jednakovrijedno").
- Kada ponuditelj sumnja da ne može dati jednakovrijedno rješenje.
- Ne koristiti za cijeli DON – tada tender-document-review.

## Ulaz

| Polje | Obavezno | Opis |
|---|---|---|
| specifikacije | da | Tekst tehničkih specifikacija |
| predmet | ne | Kratak opis predmeta nabave |

## Očekivani rezultat

- Spisak spornih stavki: doslovni navod → zašto je sporan → propisana osnova → prijedlog neutralne formulacije.
- Ocjena rizika žalbe po stavki (visok/srednji/nizak).

## Izvori i citiranje

- Važeći ZJN (odredbe o tehničkim specifikacijama, zabrana diskriminacije).
- Praksa DKOM-a o upućivanju na marku i jednakovrijednosti.
- Praksa Suda EU o jednakom tretmanu (preko eu-procurement-law kad treba).

## Sigurnosna ograničenja

- Ne prepisivati specifikacije konkurencije niti otkrivati poslovne tajne.
- Ne tvrditi da je stavka sigurno nezakonita – formulacija "ukazuje na rizik".
- Svaka tvrdnja vezana za konkretan navod iz teksta.

## Primjer

Ulaz: stavka "ili jednakovrijedno nedostaje uz normu".
Izlaz: navod → rizik → prijedlog formulacije.
(Ilustrativno.)

## Test

- `node --test tests/` zelen.
- Ručno: revizija oglednih specifikacija označava spornu stavku s navodom.
