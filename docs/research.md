# Istraživanje (FAZA 0, provjereno 2026-11-11)

## A. Potvrđeno
- Temporis savjetovanje d.o.o., Zagreb (Miramarska c. 24): edukacije, savjetovanje javnog/privatnog sektora, 510+ edukacija, 15.300+ polaznika, 540+ stručnih članaka. Izvor: temporis.hr (homepage).
- BJN: Mreža znanja (FAQ, mišljenja institucija, članci, propisi, hodogrami) + pravna zaštita (DKOM/VUS/Sud EU, 500+ filtera) + Biltenko AI asistent. Brojke: 5.200+ odgovora, 700+ članaka, 100+ digitaliziranih propisa. Najnoviji broj 39: pročišćeni ZJN (NN 120/16, 114/22, 48/26). Izvor: biltenjavnenabave.hr.
- Biltenko: prvi specijalizirani AI asistent za JN u RH/EU, na BJN bazi, pokriva cijeli ciklus. Predstavljen 2025. BJN pokrenut 2016. Vrijednost JN u HR > 12,6 mlrd EUR bez PDV-a. Izvor: Poslovni.hr, 01.10.2025.
- MCP: otvoreni protokol, TS SDK v2 (`@modelcontextprotocol/server`), spec 2026-07-28. Izvor: modelcontextprotocol/typescript-sdk, modelcontextprotocol.io.
- OpenCode Skills: `SKILL.md` s frontmatterom (name/description obavezni), name==dir, lowercase-hyphen 1–64, opis 1–1024. Izvor: opencode.ai/docs/skills.

## B. Tehničke mogućnosti (izvedivo bez tuđih podataka)
- Read-only MCP prototip na sintetičkim podacima; RAG s FTS5; PDF/Office parsiranje; eval harness za halucinacije.

## C. Pretpostavke za provjeru
- Postoji li BJN API ili izvozni format? Nije potvrđeno – tretirati kao NE dok se ne dokaže.
- Tehnologija iza Biltenka? Nije javno dokumentovana.
- EOJN scraping/API? Nije potvrđeno – ne pretpostavljati.

## D. Pitanja za Temporis/BJN (odobrenje)
- D-001: dozvola/obim korištenja BJN sadržaja u TPI (šta, kako, licenciranje, atribucija).
- D-002: model licence repozitorija.
- D-003/D-004: tehnološki izbori (jezik MCP-a, pohrana znanja).
