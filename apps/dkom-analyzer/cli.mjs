#!/usr/bin/env node
// DKOM Analyzer CLI: node cli.mjs [pojam] — izvještaj na stdout.
import { analyzeDecisions, toMarkdown } from './analyzer.mjs';

console.log(toMarkdown(analyzeDecisions({ pojam: process.argv[2] || '' })));
