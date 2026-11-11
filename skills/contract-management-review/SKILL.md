---
name: contract-management-review
description: Pregled izvršenja ugovora – rokovi, izmjene, aneksi, garancije, obaveze. Koristi za kontrolu ugovora o javnoj nabavi.
---

# Contract Management Review

Kontrola da izvršenje prati ugovor i propis – bez nedozvoljenih izmjena.

## Kada se koristi

- Provjera nacrta aneksa ili izmjene ugovora.
- Praćenje garancija, rokova isporuke i ugovornih obaveza.
- Ne koristiti za sklapanje novog ugovora izvan nabave.

## Ulaz

| Polje | Obavezno | Opis |
|---|---|---|
| ugovor | da | Ključne odredbe (korisnik učitava) |
| izmjena | ne | Predložena izmjena/aneks |

## Očekivani rezultat

- Ocjena izmjene: dopuštena / rizična / nedopuštena – s pravnim temeljem.
- Kontrolna lista: garancije, rokovi, kazne, primopredaja, plaćanje.
- Preporuka: dokumentovati, tražiti mišljenje, prijaviti.

## Izvori i citiranje

- Važeći ZJN (izmjene ugovora tokom trajanja) + sam ugovor.
- DKOM/Sud EU praksa o bitnim izmjenama (novi postupak vs. aneks).

## Sigurnosna ograničenja

- Ne odobravati bitne izmjene bez ograde – uvijek pravna provjera.
- Poslovne tajne iz ugovora se ne pohranjuju niti dijele.

## Primjer

Ulaz: ogledni aneks o produženju roka.
Izlaz: ocjena + temelj + preporuka dokumentovanja.
(Ilustrativno.)

## Test

- `node --test tests/` zelen.
- Ručno: ogledna bitna izmjena dobija ocjenu "rizična/nedopuštena" s temeljem.
