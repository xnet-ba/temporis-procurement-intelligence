---
name: procurement-deadline-tracker
description: Evidencija i kontrola rokova – predaja, pitanja, žalbe, ugovori, garancije. Koristi za planiranje bez propuštenih rokova.
---

# Procurement Deadline Tracker

Sistematsko praćenje rokova kroz cijeli ciklus nabave.

## Kada se koristi

- Izrada kalendara rokova za postupak, ponudu ili ugovor.
- Provjera je li rok prekluzivan i šta propuštanje znači.
- Ne koristiti umjesto pravnog savjeta o spornom roku.

## Ulaz

| Polje | Obavezno | Opis |
|---|---|---|
| dogadjaji | da | Faze/događaji (objava, pitanja, predaja, odluka, žalba, ugovor) |
| datumi | ne | Poznati datumi objave/odluke |

## Očekivani rezultat

- Tabela: događaj → rok → pravni temelj (član) → posljedica propuštanja → podsjetnik.
- Oznaka kritičnih (prekluzivnih) rokova.
- Napomena gdje se rok računa prema propisu, a gdje prema DON-u.

## Izvori i citiranje

- Važeći ZJN (rokovi po fazama) + DON konkretnog postupka.
- Upute EOJN-a za elektroničku predaju.

## Sigurnosna ograničenja

- Rok se uvijek provjerava u izvoru – ne računati napamet za korisnika bez ograde.
- Praznici/vikendi: upozoriti da se pravila računanja provjere.
- Propušteni rok se ne "popravlja" – samo se konstatuje stanje.

## Primjer

Ulaz: ogledna objava otvorenog postupka.
Izlaz: tabela rokova (pitanja, predaja, žalba) s temeljima.
(Ilustrativno.)

## Test

- `node --test tests/` zelen.
- Ručno: tabela sadrži temelj i posljedicu za svaki rok.
