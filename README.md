<!-- xnet-ba-matrix-header-v1 -->
<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=00FF41&height=140&section=header&text=temporis-procurement-intelligence&fontColor=000000&fontSize=24&fontAlignY=32&desc=Temporis%20Procurement%20Intelligence%20modularni%20AI%20ekosistem%20za%20&descAlignY=55" width="100%" alt="temporis-procurement-intelligence"/>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Fira+Code&size=16&duration=2800&pause=800&color=00FF41&center=true&vCenter=true&width=700&lines=xnet-ba+%3A%3A+open-source+AI+iz+BiH;citaj+README+pa+pokreni;PR+dobrodosli)](https://github.com/xnet-ba/temporis-procurement-intelligence)

[![Stars](https://img.shields.io/github/stars/xnet-ba/temporis-procurement-intelligence?style=flat-square&color=00FF41&labelColor=000000)](https://github.com/xnet-ba/temporis-procurement-intelligence/stargazers)
[![License](https://img.shields.io/github/license/xnet-ba/temporis-procurement-intelligence?style=flat-square&color=00FF41&labelColor=000000)](LICENSE)
[![Top lang](https://img.shields.io/github/languages/top/xnet-ba/temporis-procurement-intelligence?style=flat-square&color=00FF41&labelColor=000000)](https://github.com/xnet-ba/temporis-procurement-intelligence)
[![Last commit](https://img.shields.io/github/last-commit/xnet-ba/temporis-procurement-intelligence?style=flat-square&color=00FF41&labelColor=000000)](https://github.com/xnet-ba/temporis-procurement-intelligence/commits)
[![matrix](https://img.shields.io/badge/MATRIX-xnet--ba-00FF41?style=flat-square&labelColor=000000)](https://github.com/xnet-ba)

</div>

---
<div align="center">

# 🏛️ Temporis Procurement Intelligence (TPI)

**Modularni AI ekosistem za javnu nabavu u Republici Hrvatskoj**

*Vještine · MCP server · Aplikacije · Znanje s citatima*

[![Faza](https://img.shields.io/badge/sve%20faze%200--6-završeno-brightgreen?style=for-the-badge)](./ROADMAP.md)
[![Licenca](https://img.shields.io/badge/licenca-MIT%20free-green?style=for-the-badge](./LICENSE))
[![Skillovi](https://img.shields.io/badge/skillova-16-orange?style=for-the-badge)](#-tpi-agent-skills--16-modula)
[![Aplikacije](https://img.shields.io/badge/aplikacija-6-purple?style=for-the-badge)](#-tpi-apps--6-poslovnih-alata)
[![MCP](https://img.shields.io/badge/MCP-read--only-red?style=for-the-badge)](#-tpi-mcp--standardizirani-pristup-znanju)
[![Smoke test](https://img.shields.io/badge/smoke%20test-OK-brightgreen?style=for-the-badge)](./tests/smoke.test.mjs)

**Nosilac:** Temporis savjetovanje d.o.o. · **Stručna osnova:** Bilten javne nabave (BJN) — korištenje uz dozvolu ✅
> Status: SVE FAZE 0–6 ZAVRŠENE (v0.11.0, 94/94 testa). Sljedeće: stvarni podaci (BJN izvoz), eval na stvarnim dokumentima, produkcijski auth.

[🚀 Brzi start](#-brzi-start) · [📖 Dokumentacija](#-dokumentacija) · [🗺️ Roadmap](./ROADMAP.md) · [📊 Status](./PROJECT_STATUS.md) · [⚖️ Pravna osnova](./docs/legal-and-data-rights.md)

</div>

---

## 📌 Šta je TPI?

TPI **nije chatbot**. To je platforma od 6 slojeva u kojoj svaki AI odgovor nosi:

> **izvor · član/stav/tačku · datum i status važenja · jurisdikciju · nivo pouzdanosti**

Ako izvora nema — zaključka nema. AI analiza nikad nije pravno mišljenje niti zamjena za stručnu odgovornost.

<details>
<summary><b>👥 Kome je namijenjen? (klikni)</b></summary>

| Korisnik | Šta dobija |
|---|---|
| 🏢 **Naručitelji** | Ispravna dokumentacija, hodogrami postupaka, kontrola rokova, registar ugovora |
| 📦 **Ponuditelji** | Radar prilika, provjera ponude prije predaje, ESPD pomoć, pravna zaštita |
| ⚖️ **Pravnici** | DKOM/VUS/Sud EU praksa s filterima, poređenje s propisima, nacrti žalbi |
| 🎓 **Certificirani stručnjaci** | Edukacija, simulacije postupaka, testovi znanja |
| 💼 **Konsultanti** | Workspace za cijeli ciklus, izvještaji, analiza rizika |

</details>

---

## 🏗️ Arhitektura sustava

```mermaid
flowchart TB
    subgraph UI["🖥️ Korisnički sloj"]
        A1[ Tender Check AI ]
        A2[ Nabava Workspace ]
        A3[ Tender Radar ]
        A4[ DKOM Analyzer ]
        A5[ Contract Watch ]
        A6[ Nabava Academy ]
    end
    subgraph SK["🧠 TPI SKILLS — 16 agentskih vještina"]
        S1[bjn-knowledge]
        S2[public-procurement-expert]
        S3[dkom-case-analysis]
        S4[+ 13 ostalih...]
    end
    subgraph MCP["🔌 TPI MCP — read-only API za AI agente"]
        M1[search_regulations]
        M2[search_dkom_decisions]
        M3[search_vus_decisions]
        M4[search_eu_case_law]
        M5[+ 5 alata...]
    end
    subgraph KN["📚 TPI KNOWLEDGE — verzionirano znanje"]
        K1[(Zakoni i pravilnici)]
        K2[(DKOM odluke)]
        K3[(VUS presude)]
        K4[(Sud EU)]
        K5[(Stručni članci BJN)]
        K6[(Hodogrami postupaka)]
    end
    subgraph CORE["⚙️ TPI CORE"]
        C[config · identitet · licence<br>auth · rate-limit · audit log]
    end
    UI --> SK
    SK --> MCP
    MCP --> KN
    MCP -.-> C
    SK -.-> C
```

### Tok podataka kroz primjer: analiza tendera 📄➡️✅

```mermaid
sequenceDiagram
    participant K as Korisnik
    participant TC as Tender Check AI
    participant SK as Skill: tender-document-review
    participant MCP as MCP server
    participant ZN as Knowledge baza
    K->>TC: učitaj dokumentaciju o nabavi
    TC->>SK: izdvoji uslove, rokove, kriterije
    SK->>MCP: search_regulations + check_regulation_status
    MCP->>ZN: FTS pretraga propisa (važeća verzija!)
    ZN-->>MCP: član, stav, datum važenja, citat
    MCP-->>SK: strukturirani odgovor + izvori
    SK-->>TC: kontrolna lista + nejasnoće + rizici
    TC-->>K: 📋 izvještaj s referencama
```

---

## 🧠 TPI Agent Skills — 16 modula

> Format: OpenCode-kompatibilan `SKILL.md` · `name == direktorij` · opis 1–1024 znaka · svaki skill: pravila + ulazi + izvori + primjeri + testovi

| # | Skill | Namjena |
|---|---|---|
| 1 | `bjn-knowledge` | Pristup stručnom znanju BJN-a (uz licencu) |
| 2 | `public-procurement-expert` | Opći ekspert za cijeli ciklus nabave |
| 3 | `procurement-law-research` | Istraživanje propisa s citatima i važenjem |
| 4 | `dkom-case-analysis` | Analiza odluka DKOM-a i obrazaca iz prakse |
| 5 | `vus-case-analysis` | Analiza presuda Visokog upravnog suda |
| 6 | `eu-procurement-law` | Pravo EU + praksa Suda EU |
| 7 | `tender-document-review` | Pregled dokumentacije o nabavi |
| 8 | `technical-specification-audit` | Revizija tehničkih specifikacija (diskriminatorni uslovi) |
| 9 | `espd-compliance-check` | Provjera ESPD obrasca |
| 10 | `bid-compliance-review` | Kontrolna lista ponude prije predaje |
| 11 | `procurement-appeal-drafting` | Pomoć pri nacrtu žalbe / prigovora |
| 12 | `procurement-deadline-tracker` | Praćenje rokova postupka |
| 13 | `contract-management-review` | Pregled ugovora, aneksa, garancija |
| 14 | `procurement-risk-assessment` | Procjena rizika (korekcije, sukob interesa) |
| 15 | `procurement-report-generator` | Strukturirani izvještaji s referencama |
| 16 | `tender-opportunity-monitor` | Filtriranje prilika (CPV, vrijednost, lokacija, rok) |

---

## 🔌 TPI MCP — standardizirani pristup znanju

Prva verzija je **read-only** — nijedan alat ne mijenja podatke.

| Alat | Šta vraća |
|---|---|
| `search_regulations` | Propise s članom, datumom i statusom važenja |
| `search_dkom_decisions` | Odluke DKOM-a po ključnim riječima i filterima |
| `search_vus_decisions` | Presude VUS-a |
| `search_eu_case_law` | Presude Suda EU + stručne materijale |
| `search_expert_articles` | Stručne članke |
| `search_bjn_knowledge` | Mrežu znanja BJN-a ✅ *(uz dozvolu)* |
| `get_procedure_workflow` | Hodogram postupka korak-po-korak |
| `analyze_procurement_question` | Strukturirani odgovor s citatima i nivoom pouzdanosti |
| `check_regulation_status` | Je li propis važeći ili historijski |

**Zaštita svakog poziva:** autentifikacija · autorizacija · kontrola licence · rate-limit · audit log · validacija ulaza (zod) · verzioniranje.

---

## 📦 TPI Apps — 6 poslovnih alata

| Aplikacija | Faza ciklusa nabave | Status |
|---|---|---|
| 🔍 **Tender Check AI** | Pregled dokumentacije prije objave/ponude | ✅ gotov (v0.6.0) |
| 🗂️ **Nabava Workspace** | Projekti · dokumenti · evaluacija · ugovori · aneksi | ✅ gotov (v0.11.0) |
| 📡 **Tender Radar** | CPV · predmet · lokacija · vrijednost · rokovi · obavijesti | ✅ gotov (v0.9.0) |
| ⚖️ **DKOM Analyzer** | Obrasci iz prakse + poređenje s propisima i sudskom praksom | ✅ gotov (v0.7.0) |
| 📜 **Contract Watch** | Rokovi · izmjene · garancije · rizici · izvještaji | ✅ gotov (v0.10.0) |
| 🎓 **Nabava Academy** | Vodiči · lekcije · testovi · simulacije postupaka | ✅ gotov (v0.8.0) |

```mermaid
gantt
    title TPI Roadmap — faze 0 do 6
    dateFormat YYYY-MM-DD
    section Temelj
    F0 Discovery           :done, 2026-11-11, 1d
    F1 Foundation          :active, 2026-11-12, 14d
    section Jezgra
    F2 Agent Skills        :2026-11-26, 21d
    F3 MCP prototip        :2026-12-17, 21d
    F4 Knowledge           :2027-01-07, 21d
    section Proizvod
    F5 Tender Check AI     :2027-01-28, 28d
    F6 Napredni proizvodi  :2027-02-25, 60d
```

---

## 🛡️ Pravila stručne i pravne pouzdanosti

Svaki AI modul **mora**:

1. 🏷️ Razlikovati zakon, podzakonski akt, sudsku odluku i stručni komentar
2. 📎 Navesti konkretan izvor
3. 📖 Navesti član, stav i tačku kad su dostupni
4. 📅 Navesti datum i status važenja propisa
5. 🕰️ Razlikovati važeće i historijske verzije
6. 🚫 Ne predstavljati komentar kao zakon
7. 🚫 Ne izmišljati odluke, citate ili reference
8. ⚠️ Označiti kad izvor nije dostupan + iskazati nivo pouzdanosti
9. 👩‍⚖️ Preporučiti stručnu provjeru kad je potrebna

> Testovi padaju ako AI izmisli pravnu odredbu, sudsku odluku, koristi zastarjeli propis kao važeći ili miješa jurisdikcije.

---

## ⚖️ Licenca i prava na podatke

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

- **Kod i dokumentacija:** [MIT](./LICENSE) — slobodno korištenje uz atribuciju.
- **BJN stručni sadržaj:** koristi se **uz dozvolu** (evidentirano 2026-11-11) — uz obaveznu atribuciju izvora.
- **Javni izvori** (Narodne novine, EUR-Lex, objavljene odluke DKOM/VUS): koriste se prema njihovim uslovima, uvijek s citatom.
- Detalji: [`docs/legal-and-data-rights.md`](./docs/legal-and-data-rights.md)

---

## 🚀 Brzi start

```bash
git clone https://github.com/xnet-ba/temporis-procurement-intelligence
cd temporis-procurement-intelligence
node tests/smoke.test.mjs   # provjera strukture, nula zavisnosti
```

Očekivano: `TPI smoke: OK (22 staze + 16 skillova)` ✅

## 📖 Dokumentacija

| Dokument | Sadržaj |
|---|---|
| [vision.md](./docs/vision.md) | Vizija i korisnici |
| [architecture.md](./docs/architecture.md) | Slojevi, tehnologije, granice |
| [research.md](./docs/research.md) | Potvrđeno / moguće / pretpostavke / pitanja |
| [product-modules.md](./docs/product-modules.md) | Svih 9 modula ukratko |
| [legal-and-data-rights.md](./docs/legal-and-data-rights.md) | Dozvole i obim |
| [security.md](./docs/security.md) | Sigurnosna pravila |
| [decisions/](./docs/decisions/) | ADR-001 monorepo · ADR-002 MCP jezik · ADR-003 pohrana |

---

<div align="center">

**Temporis Procurement Intelligence** · Faza 0 · Novembar 2026

⭐ Ako pratiš projekat — vrati se na Fazu 1: prva 3 skilla + MCP prototip.

</div>

---

<div align="center">
<img src="https://raw.githubusercontent.com/xnet-ba/xnet-ba/main/assets/divider.svg" width="100%" alt=""/>
<sup>part of <a href="https://github.com/xnet-ba">xnet-ba matrix</a> — open-source AI iz BiH</sup>
</div>
