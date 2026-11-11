---
name: bjn-knowledge
description: Pristup stručnom znanju Biltena javne nabave – FAQ, mišljenja, članci, propisi, hodogrami i pravna zaštita. Koristi za svako pitanje iz prakse javne nabave u RH.
---

# BJN Knowledge

Pristup Mreži znanja i pravnoj zaštiti BJN-a (uz dozvolu, s atribucijom).

## Kada se koristi

- Kada pitanje traži stručni odgovor iz prakse javne nabave u RH.
- Kada treba hodogram postupka, FAQ ili mišljenje institucije.
- Ne koristiti za pravo EU izvan konteksta RH – tada `eu-procurement-law`.

## Ulaz

| Polje | Obavezno | Opis |
|---|---|---|
| pitanje | da | Konkretno pitanje iz prakse |
| kategorija | ne | faq / misljenje / clanak / propis / hodogram / pravna-zastita |

## Očekivani rezultat

- Odgovor s citatom BJN izvora (naziv, kategorija, datum).
- Nivo pouzdanosti: visok (propis/hodogram), srednji (mišljenje/članak), nizak (samo FAQ bez propisa).
- Ako izvor nije dostupan: izričita oznaka + preporuka stručne provjere.

## Izvori i citiranje

- BJN Mreža znanja: 5.200+ odgovora, 700+ članaka, 100+ digitaliziranih propisa.
- Pravna zaštita: odluke DKOM-a, presude VUS-a, presude Suda EU (500+ filtera).
- Svaki navod: tip izvora + naziv + datum + status važenja (za propise).

## Sigurnosna ograničenja

- Ne izmišljati KLASA brojeve odluka ni brojeve članaka – samo provjereni citati.
- Stručni komentar se nikad ne predstavlja kao zakon.
- Bez izvora nema zaključka.

## Primjer

Ulaz: "Koji je rok za žalbu u otvorenom postupku?"
Izlaz: uputa na hodogram pravne zaštite + važeći član ZJN-a s datumom važenja + nivo pouzdanosti visok.
(Ilustrativno – konkretan član se uvijek provjerava u važećem tekstu.)

## Test

- `node --test tests/` mora biti zelen.
- Ručno: 2 pitanja (1 FAQ, 1 pravna zaštita) – odgovor sadrži izvor i datum ili oznaku nedostupnosti.
