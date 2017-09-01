#!/usr/bin/env node

const program = require('commander');

program
	.option('-i, --init', 'Initialize New GitToken Signer')
  .option('-s, --socket <SocketPath>', 'Signer Socket Path')
  .action(function(option, args) {
  	if(args.init) {
			console.log('Init new GitToken Signer')
		} else if(args.socket) {
			console.log('socket path:', args.socket)
		}
	});

program.parse(process.argv);
