#!/usr/bin/env node
const cssClean = require('./index.js');
const args = process.argv.slice(2);
const fs = require('fs');
const clean = cssClean({
  css : fs.readFileSync(args[0], 'utf8')
});

if (args.length == 1) {
  fs.writeFileSync(args[0], clean);
} else if (args.length === 2) {
  fs.writeFileSync(args[1], clean);
}
