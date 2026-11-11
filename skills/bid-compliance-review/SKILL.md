---
name: bid-compliance-review
description: Završna kontrola ponude prije predaje – potpunost, potpisi, rokovi, dokazi. Koristi kao zadnju liniju odbrane od odbacivanja.
---

# Bid Compliance Review

Zadnja provjera ponude prije klika "predaj" u EOJN-u.

## Kada se koristi

- Neposredno prije predaje ponude ili zahtjeva za sudjelovanje.
- Nakon izmjene DON-a – ponovna provjera usklađenosti.
- Ne koristiti za sastavljanje ponude od nule.

## Ulaz

| Polje | Obavezno | Opis |
|---|---|---|
| ponuda | da | Sadržaj ponude (korisnik učitava) |
| don | da | Relevantni zahtjevi iz DON-a |

## Očekivani rezultat

- Checklista: troškovnik, ESPD, dokazi sposobnosti, jamstvo (ako se traži), potpis/ovjera, rok i način predaje.
- Crvene zastavice: nedostaje / ističe / nedosljedno – svaka s lokacijom u ponudi.
- Konačna ocjena: spremno / spremno uz napomene / nije spremno.

## Izvori i citiranje

- DON (konkretan postupak) + važeći ZJN (razlozi odbacivanja).
- DKOM praksa o najčešćim razlozima odbacivanja ponuda.

## Sigurnosna ograničenja

- Ne mijenjati cijene niti uvjete ponude – samo kontrola.
- Poslovne tajne iz ponude se ne pohranjuju niti dijele.
- "Spremno" ne garantuje odabir – to se izričito navodi.

## Primjer

Ulaz: ogledna ponuda bez dokaza sposobnosti.
Izlaz: crvena zastavica → zahtjev DON-a → preporuka.
(Ilustrativno.)

## Test

- `node --test tests/` zelen.
- Ručno: ogledna nepotpuna ponuda dobija ocjenu "nije spremno" s razlogom.
