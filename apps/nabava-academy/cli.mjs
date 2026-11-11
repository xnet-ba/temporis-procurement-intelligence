#!/usr/bin/env node
// Academy CLI: lista | lekcija <id> | kviz <korisnik> <id> <odg1,odg2,...> | napredak <korisnik>
import { listLessons, getLesson, ocjeni, getNapredak } from './academy.mjs';

const [cmd, a, b, c] = process.argv.slice(2);
if (cmd === 'lista') {
  for (const l of listLessons()) console.log(`- ${l.id}: ${l.naslov} (${l.pitanja} pitanja)`);
} else if (cmd === 'lekcija') {
  const l = getLesson(a);
  if (!l) { console.error('nepoznata lekcija'); process.exit(1); }
  console.log(`# ${l.naslov}\n\n${l.tekst}\n\nIzvori: ${l.izvori.join(', ')}`);
  l.pitanja.forEach((p, i) => console.log(`\n${i + 1}. ${p.pitanje}\n   ${p.odgovori.map((o, j) => `${j}) ${o}`).join('  ')}`));
} else if (cmd === 'kviz') {
  console.log(JSON.stringify(ocjeni(a, b, (c || '').split(',').filter((x) => x !== '').map(Number))));
} else if (cmd === 'napredak') {
  console.log(JSON.stringify(getNapredak(a)));
} else {
  console.error('upotreba: lista | lekcija <id> | kviz <korisnik> <id> <odg...> | napredak <korisnik>');
  process.exit(1);
}
