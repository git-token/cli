#!/usr/bin/env node

const program = require('commander');
const GitTokenSigner = require('gittoken-signer').default;

program
	.option('-i, --init', 'Initialize New GitToken Signer')
  .option('-s, --socket <Socket Path>', 'Signer Socket Path')
  .option('--web3 <Web3 Provider>', 'Ethereum Web3 Provider')
	.option('-d --dir <Directory Path>', 'Directory to Save Keystore')
	.parse(process.argv);

if (!program.web3) {
	console.log('Web3 Provider Missing! Exiting...')
	process.exit(1)
}

if (!program.dir) {
  console.log('Directory Path Missing! Exiting...')
  process.exit(1)
}

if (!program.socket) {
  console.log('Socket Path Missing! Exiting...')
  process.exit(1)
}

const signer = new GitTokenSigner({
	signerIpcPath: program.socket,
	recover: program.init != true,
	dirPath: program.dir,
	web3Provider: program.web3
})
