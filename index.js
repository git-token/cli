#!/usr/bin/env node

const program = require('commander');

program
  .version('0.0.3')
	.command('signer', 'GitToken Signer CLI')
	.parse(process.argv);
