---
name: vus-case-analysis
description: Analiza presuda Visokog upravnog suda RH u sporovima iz javne nabave. Koristi kada je DKOM odluka osporena pred sudom ili treba sudski stav.
---

# VUS Case Analysis

Praćenje sudske kontrole odluka DKOM-a pred Visokim upravnim sudom.

## Kada se koristi

- Kada treba stav VUS-a o spornom pravnom pitanju iz nabave.
- Kada je žalba na DKOM odbijena i razmatra se upravni spor.
- Ne koristiti za prvostepanjsku analizu – tada dkom-case-analysis.

## Ulaz

| Polje | Obavezno | Opis |
|---|---|---|
| presuda | da | Tekst ili identifikacija presude |
| pitanje | ne | Sporno pravno pitanje |

## Očekivani rezultat

- Odnos: tužbeni razlog → ocjena DKOM odluke → stav suda → pravne posljedice.
- Oznaka je li presuda pravomoćna i na šta se može pozvati.
- Citat: broj presude, datum, relevantni propis.

## Izvori i citiranje

- Presude VUS-a (BJN pravna zaštita).
- Osporena odluka DKOM-a + važeći propis.
- Hijerarhija: presuda suda > odluka DKOM-a > stručni komentar.

## Sigurnosna ograničenja

- Ne izmišljati brojeve presuda.
- Razlikovati ukidanje (vraćanje na ponovni postupak) od odbijanja tužbe.
- Ne tvrditi pravomoćnost bez provjere.

## Primjer

Ulaz: ogledna presuda o ocjeni ponude.
Izlaz: tužbeni razlog → stav suda → posljedica za naručitelja.
(Ilustrativno.)

## Test

- `node --test tests/` zelen.
- Ručno: analiza sadrži ishod spora i oznaku pravomoćnosti ili "nepoznato".
