#!/usr/bin/env node
// Radar CLI: node cli.mjs <profil.json> [refDatum YYYY-MM-DD]
import fs from 'node:fs';
import { findMatches, toDigest } from './radar.mjs';

const profil = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const refDatum = process.argv[3];
console.log(toDigest(profil, findMatches(profil, refDatum), refDatum));
