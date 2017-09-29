#!/usr/bin/env node
'use strict';

var program = require('commander');

program.version(require('../package.json').version)
// .command('setup', 'Setup GitToken Docker Host')
.command('register', 'Register GitHub organization with https://registry.gittoken.io').alias('rebase').command('terminal', 'GitToken Terminal')
// .command('deploy', 'Deploy GitToken Docker Services')
.parse(process.argv);