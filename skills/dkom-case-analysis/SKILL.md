---
name: dkom-case-analysis
description: Analiza odluka DKOM-a – struktura rješenja, žalbeni navodi, dokazi i primjena na vlastiti postupak. Koristi kada treba razumjeti praksu pravne zaštite.
---

# DKOM Case Analysis

Čitanje i primjena odluka Državne komisije za kontrolu postupaka javne nabave.

## Kada se koristi

- Kada treba protumačiti rješenje DKOM-a i izvući pravilo za vlastiti postupak.
- Kada se priprema žalba ili odgovor na žalbu.
- Ne koristiti za presude sudova – tada vus-case-analysis / eu-procurement-law.

## Ulaz

| Polje | Obavezno | Opis |
|---|---|---|
| odluka | da | Tekst ili identifikacija odluke (KLASA/URBROJ) |
| pitanje | ne | Šta se iz odluke treba primijeniti |

## Očekivani rezultat

- Raščlamba: žalbeni navod → dokazi → pravni temelj → odluka → pouka za praksu.
- Jasna oznaka šta je prenosivo na drugi postupak, a šta je vezano za konkretan slučaj.
- Citat: KLASA, datum, relevantni član propisa.

## Izvori i citiranje

- Odluke DKOM-a (pretraga u BJN pravnoj zaštiti, 500+ filtera).
- Važeći ZJN + podzakonski propisi na dan donošenja odluke.
- BJN stručni članak "Kako čitati rješenja DKOM-a" (BJN aplikacija, 11/2026).

## Sigurnosna ograničenja

- Ne izmišljati KLASA brojeve – samo provjereni iz objave.
- Jedna odluka nije opće pravilo – označiti domet zaključka.
- Provjeriti je li propis iz odluke i dalje važeći.

## Primjer

Ulaz: ogledna odluka o pogrešci u pregledu ponuda.
Izlaz: navod → propust naručitelja → pravni temelj → ishod → kontrolna tačka za vlastiti postupak.
(Ilustrativno.)

## Test

- `node --test tests/` zelen.
- Ručno: raščlamba 1 odluke sadrži navod, temelj, ishod i oznaku prenosivosti.
