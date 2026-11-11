# Predložak TPI skilla

Svaki skill je direktorij `skills/<ime>/SKILL.md`. Kopiraj ovaj predložak i popuni ga.
Pravila imenovanja: `name == direktorij`, mala slova + cifre, jedna crtica kao separator (1–64 znaka).

```markdown
---
name: moj-skill
description: Jedna rečenica – kada agent treba učitati ovaj skill (1–1024 znaka).
---

# Moj skill

Jedna rečenica o namjeni.

## Kada se koristi

- Kada ...
- Ne koristiti kada ...

## Ulaz

| Polje | Obavezno | Opis |
|---|---|---|
| pitanje | da | ... |

## Očekivani rezultat

- Strukturirani odgovor s citatima.
- Nivo pouzdanosti: visok / srednji / nizak.

## Izvori i citiranje

- Tip izvora, naziv, član/stav/tačka, datum i status važenja, jurisdikcija.
- Bez izvora nema zaključka.

## Sigurnosna ograničenja

- Šta skill nikad ne radi (npr. ne izmišlja odluke, ne miješa jurisdikcije).

## Primjer

Ulaz → očekivani izlaz (ilustrativno, s oznakom ako je primjer izmišljen).

## Test

Kako se provjerava: `node --test tests/` + ručna provjera na 1–2 primjera.
```
```
