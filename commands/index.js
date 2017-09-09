#!/usr/bin/env node

const program = require('commander');

program
  .version('0.0.23')
  .command('setup', 'Setup GitToken Docker Host')
	.command('configure', 'Configure GitToken Docker Services')
  .command('deploy', 'Deploy GitToken Docker Services')
	.parse(process.argv);
