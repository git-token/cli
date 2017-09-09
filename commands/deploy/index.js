#!/usr/bin/env node

const program = require('commander');

program
  .command('signer', 'Deploy GitToken Signer Provider')
	.command('webhook', 'Deploy GitToken Web Hook Provider')
	.parse(process.argv);
