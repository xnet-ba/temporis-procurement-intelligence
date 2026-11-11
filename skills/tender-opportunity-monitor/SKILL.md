---
name: tender-opportunity-monitor
description: Praćenje prilika za ponuditelje – CPV, predmet, lokacija, vrijednost, rokovi. Koristi za ciljano pretraživanje objava.
---

# Tender Opportunity Monitor

Od šume objava do kratke liste relevantnih prilika.

## Kada se koristi

- Definisanje profila ponuditelja (CPV, kapacitet, geografija).
- Filtriranje objava s EOJN/TED-a po kriterijima.
- Ne koristiti za automatsko preuzimanje objava bez provjere uslova korištenja izvora.

## Ulaz

| Polje | Obavezno | Opis |
|---|---|---|
| profil | da | CPV kategorije, kapacitet, lokacija |
| kriteriji | ne | Vrijednost, rok, vrsta postupka |

## Očekivani rezultat

- Kriterij-lista za pretragu + predložak evidencije prilika.
- Ocjena usklađenosti prilike s profilom (odgovara / uslovno / ne odgovara).
- Podsjetnik na rokove i obaveznu dokumentaciju.

## Izvori i citiranje

- Objave EOJN RH / TED (svaka prilika s brojem objave i datumom).
- CPV rječnik za kategorije.

## Sigurnosna ograničenja

- Ne scrapeati objave mimo uslova korištenja portala.
- Ne garantirati dobitak – samo usklađenost profila.
- Ažurnost: datum provjere uz svaku listu.

## Primjer

Ulaz: ogledni profil (IT oprema, RH).
Izlaz: kriteriji pretrage + ogledna evidencija s ocjenama.
(Ilustrativno.)

## Test

- `node --test tests/` zelen.
- Ručno: lista sadrži broj objave, datum provjere i ocjenu za svaku priliku.
