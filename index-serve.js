#!/usr/bin/env node

const program = require('commander');

program
  .command('signer', 'GitToken Signer Provider')
	.parse(process.argv);

