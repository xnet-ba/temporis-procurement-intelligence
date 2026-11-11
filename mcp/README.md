# TPI MCP server (prototip v0.3.0)

Read-only MCP server na **sintetičkim oglednim podacima** (`knowledge/synthetic/`).
Nema pristupa BJN, EOJN, DKOM niti bilo kojoj vanjskoj bazi.

## Pokretanje

```bash
cd mcp && npm install && npm start
```

## Korištenje s OpenCode MCP klijentom (ručna provjera)

```bash
opencode mcp add tpi -- node /apsolutna/putanja/do/mcp/server.mjs
```

Opcija okruženja: `TPI_MCP_TOKEN`, `TPI_BJN_LICENSE=0|1`, `TPI_RATE_LIMIT`, `TPI_AUDIT_LOG`.

## Zaštita (prototip)

- **stub-auth**: ako je `TPI_MCP_TOKEN` postavljen, svaki alat traži isti `token` – puna OAuth integracija tek u produkciji.
- **licence-check**: `search_bjn_knowledge` vraća `nedostupno` kad je `TPI_BJN_LICENSE=0`.
- **rate-limit**: `TPI_RATE_LIMIT` poziva/min po procesu (default 60).
- **audit**: svaki poziv (alat + ok/neok, bez argumenata i tokena) u `audit.log`.
- **validacija**: zod sheme – nevažeći ulaz vraća `isError`.
- Svaki odgovor nosi `upozorenje: SINTETIČKI OGLEDNI PODACI`.
