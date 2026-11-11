# ADR-003: Pohrana znanja – početi sa SQLite FTS5

- Status: predloženo (odluka u Fazi 1)
- Kontekst: citatno pretraživanje propisa/odluka mora raditi bez infrastrukture.
- Odluka (preporuka): SQLite + FTS5 + shema s verzioniranjem; pgvector tek kad FTS postane usko grlo.
- Razlog: nula servisa, deterministički testovi, lak backup/diff.
