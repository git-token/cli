#!/usr/bin/env node

const program = require('commander');

program
  .version('0.0.15')
	.command('serve', 'GitToken Service Providers')
	.parse(process.argv);
