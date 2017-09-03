#!/usr/bin/env node

const program = require('commander');

program
  .command('signer', 'GitToken Signer Provider')
	.command('webhook', 'GitToken Web Hook Provider')
	.parse(process.argv);

