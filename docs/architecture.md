# Arhitektura TPI (FAZA 0 – prijedlog)

## Slojevi
- **CORE**: config, identitet/ovlaštenja, moduli, konektori, audit log, verzije. Bez poslovne logike.
- **KNOWLEDGE**: tipizirani zapisi (zakon/pravilnik/odluka/presuda/članak/procedura/termin) + metapodaci (izvor, datum, važenje, jurisdikcija, status provjere).
- **MCP**: read-only alati v1: search_regulations, search_dkom_decisions, search_vus_decisions, search_eu_case_law, search_expert_articles, search_bjn_knowledge (samo uz licencu), get_procedure_workflow, analyze_procurement_question, check_regulation_status. Auth + licence-check + rate-limit + audit + citati.
- **SKILLS**: 16 skillova, OpenCode SKILL.md format (name=dir, opis 1–1024 znaka).
- **APPS**: 6 aplikacija, svaka čita samo CORE/KNOWLEDGE/MCP interfejse.
- **INTEGRATIONS**: opencode/claude/mcp-clients adapteri.

## Tehnološke preporuke (za odluku u Fazi 1, vidi ADR-002/ADR-003)
- MCP: TypeScript + `@modelcontextprotocol/server` v2 (spec 2026-07-28), transport stdio lokalno / Streamable HTTP udaljeno; alternativa Python SDK.
- Pohrana znanja: početi SQLite FTS5 (nula ovisnosti, verzioniranje trivijalno); vektorsko pretraživanje tek kad FTS postane usko grlo (pgvector).
- RAG/eval: citatni testovi obavezni (izmišljena referenca = pad testa).

## Šta se NE radi
Bez direktnog pristupa BJN/EOJN/DKOM bazama dok nema ugovora. Prototip radi na sintetičkim lokalnim podacima.
