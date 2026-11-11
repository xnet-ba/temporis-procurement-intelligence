#!/usr/bin/env node
// Watch CLI: node cli.mjs [refDatum YYYY-MM-DD]
import { portfolio, toDigest } from './watch.mjs';

const ref = process.argv[2] || new Date().toISOString().slice(0, 10);
console.log(toDigest(portfolio(ref)));
