#!/usr/bin/env node

const program = require('commander');

program
  .version('0.0.19')
	.command('serve', 'GitToken Service Providers')
	.parse(process.argv);
