# ADR-001: Monorepo s odvojenim slojevima

- Status: prihvaćeno (Faza 0)
- Kontekst: 6 aplikacija + skills + MCP dijele znanje i auth.
- Odluka: jedan repo, slojevi core/knowledge/mcp/skills/apps/integrations, svaki s vlastitim testovima.
- Posljedice: jednostavan start; rizik monolitnog spajanja se rješava pravilom "apps čitaju samo javne interfejse".
