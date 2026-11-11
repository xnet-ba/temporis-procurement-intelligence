#!/usr/bin/env node
// Tender Check CLI: node cli.mjs <dokument.md> — izvještaj na stdout.
import fs from 'node:fs';
import { analyzeTender, toMarkdown } from './check.mjs';

const file = process.argv[2];
if (!file) { console.error('Upotreba: node cli.mjs <dokument.md>'); process.exit(1); }
console.log(toMarkdown(analyzeTender(fs.readFileSync(file, 'utf8'))));
