#!/usr/bin/env node
'use strict';

var program = require('commander');

program.version(require('../package.json').version).command('setup', 'Setup GitToken Docker Host').command('configure', 'Configure GitToken Docker Services').command('deploy', 'Deploy GitToken Docker Services').parse(process.argv);