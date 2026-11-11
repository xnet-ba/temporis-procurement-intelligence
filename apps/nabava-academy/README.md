# Nabava Academy (v0.7.0)

Edukacija iz javne nabave: lekcije s izvorima + kviz + bodovanje.

## Upotreba

```bash
node apps/nabava-academy/cli.mjs lista
node apps/nabava-academy/cli.mjs lekcija citanje-dkom
node apps/nabava-academy/cli.mjs kviz korisnik1 hodogram-otvoreni 1,1
node apps/nabava-academy/cli.mjs napredak korisnik1
```

## Pravila

- Lekcija nikad ne odaje tačne odgovore (`getLesson` ih skida).
- Položeno = svi tačni; bodovi se broje jednom po lekciji.
- Svaka lekcija navodi izvore iz TPI znanja.
- Napredak je in-memory (prototip) – perzistencija dolazi s odlukom o korisničkim podacima.
