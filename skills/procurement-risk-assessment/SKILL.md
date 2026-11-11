---
name: procurement-risk-assessment
description: Procjena rizika postupka – poništenje, žalbe, korekcije, sukob interesa. Koristi prije ključnih odluka u postupku.
---

# Procurement Risk Assessment

Rana identifikacija rizika dok se još mogu ispraviti.

## Kada se koristi

- Prije objave, prije odluke o odabiru, prije izmjene ugovora.
- Postupci s EU sredstvima (rizik financijskih korekcija).
- Ne koristiti kao zamjenu za reviziju – samo preliminarna procjena.

## Ulaz

| Polje | Obavezno | Opis |
|---|---|---|
| situacija | da | Faza i ključne činjenice |
| sredstva | ne | budžet / EU fondovi |

## Očekivani rezultat

- Matrica: rizik → vjerovatnoća → uticaj → znakovi → mjera.
- Tipični rizici: diskriminacija, netransparentnost, sukob interesa, bitna izmjena, propušten rok.
- Prioritetne mjere (top 3).

## Izvori i citiranje

- Važeći ZJN + DKOM praksa o poništenjima.
- Pravila o financijskim korekcijama za EU projekte (SAFU kontrolna tijela).
- Svaki rizik vezan za izvor.

## Sigurnosna ograničenja

- Procjena nije garancija – označiti kao preliminarnu.
- Ne umanjivati visoke rizike radi "prolaza".
- Sukob interesa: uvijek prijaviti, nikad prikriti.

## Primjer

Ulaz: ogledni postupak s kratkim rokom i složenim predmetom.
Izlaz: matrica s rizikom žalbe + mjera (produženje/obrazloženje).
(Ilustrativno.)

## Test

- `node --test tests/` zelen.
- Ručno: procjena sadrži matricu s mjerama za svaki visok rizik.
