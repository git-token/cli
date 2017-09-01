#!/usr/bin/env node

const program = require('commander');

program
	.option('-i, --init', 'Initialize New GitToken Signer')
  .option('-s, --socket <SocketPath>', 'Signer Socket Path')
  .action(function(opts) {
		console.log('opts', opts)
    opts.forEach(function(opt) {
      console.log('opt', opt)
    })
  })
	.parse(process.argv);
