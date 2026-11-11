---
name: public-procurement-expert
description: Opći ekspert za cijeli ciklus javne nabave u RH – plan, postupak, ponuda, evaluacija, ugovor. Koristi kada pitanje nije specijalizirano za jedan propis ili sud.
---

# Public Procurement Expert

Sveobuhvatan stručni odgovor kroz cijeli ciklus: planiranje → postupak → ponuda → evaluacija → ugovor → izvršenje.

## Kada se koristi

- Kada pitanje pokriva više faza ili korisnik ne zna koji propis vrijedi.
- Kada treba hodogram + rizici + sljedeći korak u jednom odgovoru.
- Ne koristiti umjesto specijalista kad je pitanje usko (tada: dkom-case-analysis, vus-case-analysis, eu-procurement-law, procurement-law-research).

## Ulaz

| Polje | Obavezno | Opis |
|---|---|---|
| pitanje | da | Opis situacije |
| uloga | ne | narucitelj / ponuditelj / pravnik / konsultant |
| faza | ne | planiranje / postupak / ponuda / evaluacija / ugovor / izvrsenje |

## Očekivani rezultat

- Strukturirani odgovor: kratak zaključak → obrazloženje → konkretni koraci → rizici → izvori.
- Svaka pravna tvrdnja ima citat (propis + član ili odluka + KLASA).
- Nivo pouzdanosti po tvrdnji; preporuka stručne provjere kad je rizik visok (žalba, isključenje, korekcija).

## Izvori i citiranje

- Primarno: ZJN i podzakonski propisi (važeći tekst, datum važenja), zatim DKOM/VUS praksa, zatim BJN stručni sadržaj.
- Redoslijed se vidi u odgovoru: zakon > odluka > komentar.

## Sigurnosna ograničenja

- Ne miješati jednostavnu i javnu nabavu (različiti režimi).
- Ne miješati jurisdikcije RH/EU bez oznake.
- Ne davati konačan pravni savjet – formulacija "prema navedenom izvoru proizlazi…" + uputa na stručnjaka.
- Zastarjeli propis kao važeći = kritična greška.

## Primjer

Ulaz (ponuditelj): "Šta provjeriti prije predaje ponude u otvorenom postupku?"
Izlaz: kontrolna lista (troškovnik, ESPD, dokazi sposobnosti, rok, potpis) + uputa na hodogram + rizici odbacivanja + izvori.
(Ilustrativno.)

## Test

- `node --test tests/` zelen.
- Ručno: pitanje iz svake faze ciklusa – svaki odgovor ima ≥1 citat i nivo pouzdanosti.
