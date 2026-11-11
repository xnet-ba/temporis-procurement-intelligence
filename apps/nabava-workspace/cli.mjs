#!/usr/bin/env node
// Workspace CLI: novi <naziv> [vrsta] | dodaj <id> <tip> <naslov> [rok] | zakljuci <id> <index> | status <id> [refDatum] | pregled [refDatum]
import { noviProjekt, dodaj, zakljuci, status, pregled } from './workspace.mjs';

const [cmd, a, b, c, d] = process.argv.slice(2);
if (cmd === 'novi') console.log(noviProjekt(a, b));
else if (cmd === 'dodaj') console.log(JSON.stringify(dodaj(a, { tip: b, naslov: c, rok: d || null })));
else if (cmd === 'zakljuci') console.log(JSON.stringify(zakljuci(a, Number(b))));
else if (cmd === 'status') console.log(JSON.stringify(status(a, b), null, 2));
else if (cmd === 'pregled') console.log(JSON.stringify(pregled(a), null, 2));
else { console.error('upotreba: novi|dodaj|zakljuci|status|pregled ...'); process.exit(1); }
