---
name: procurement-law-research
description: Istraživanje propisa javne nabave – važeći tekst, izmjene, historijske verzije, podzakonski akti. Koristi kada treba pouzdan pravni temelj s datumom važenja.
---

# Procurement Law Research

Pronalazi važeći propis, njegove izmjene i status na zadani datum.

## Kada se koristi

- Kada treba član/stav/tačka važećeg propisa.
- Kada treba historijat izmjena ili provjera "je li ovo još na snazi".
- Ne koristiti za tumačenje prakse – tada dkom-case-analysis / vus-case-analysis.

## Ulaz

| Polje | Obavezno | Opis |
|---|---|---|
| pojam | da | Pravno pitanje ili oznaka propisa |
| datum | ne | Datum za koji se traži status (default: danas) |
| jurisdikcija | ne | RH / EU (default: RH) |

## Očekivani rezultat

- Oznaka propisa (npr. broj NN / CELEX), član/stav/tačka, tekst ili sažetak.
- Status: važeći / historijski / nepoznat + datum važenja od–do.
- Izmjene koje utiču na tumačenje + link/izvor objave.

## Izvori i citiranje

- RH: Narodne novine (broj, godina), pročišćeni tekstovi (npr. ZJN prema BJN br. 39).
- EU: EUR-Lex (CELEX broj), direktive/uredbe relevantne za nabavu.
- Poznate polazne tačke (provjeriti važenje prije svake upotrebe): ZJN NN 120/16 sa izmjenama 114/22, 48/26.

## Sigurnosna ograničenja

- Nikad ne citirati član po sjećanju bez provjere u važećem tekstu.
- Ako se važenje ne može utvrditi: status "nepoznat" + upozorenje.
- Ne miješati prijedloge/nacrte (e-Savjetovanje) s važećim propisima.

## Primjer

Ulaz: pojam "plan nabave", datum 2026-11-11.
Izlaz: relevantne odredbe važećeg ZJN-a + status važenja + izmjene + izvor.
(Ilustrativno – konkretne brojeve članaka uvijek provjeriti.)

## Test

- `node --test tests/` zelen.
- Ručno: upit za propis + upit za historijat – oba vraćaju status važenja ili oznaku "nepoznat".
