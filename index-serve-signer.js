#!/usr/bin/env node

const program = require('commander');
const GitTokenSigner = require('gittoken-signer').default;



program
  .option('-i, --init', 'Initialize New GitToken Signer')
  .option('-s, --socket <Socket Path>', 'Signer Socket Path')
  .option('--web3 <Web3 Provider>', 'Ethereum Web3 Provider')
  .option('-d --dir <Directory Path>', 'Directory to Save Keystore')
  .option('-e --env <Environmental Vairable Path>', 'Environmental Path')
  .parse(process.argv);

let signerIpcPath, recover, dirPath, web3Provider;

!program.env ? null : require('dotenv').config({ path: program.env })

if (!program.env) {
  if (!program.web3) {
    console.log('Web3 Provider Missing! Exiting...')
    process.exit(1)
  } else if (!program.dir) {
    console.log('Directory Path Missing! Exiting...')
    process.exit(1)
  } else if (!program.socket) {
    console.log('Socket Path Missing! Exiting...')
    process.exit(1)
  } else {
    recover = program.init ? false : true;
    dirPath = program.dir;
    web3Provider = program.web3;
    signerIpcPath = program.socket;
  }
} else {
  console.log(`
    Looking for an .env file with the following varaibles:

      RECOVER_KEYSTORE
      KEYSTORE_DIR_PATH
      WEB3_PROVIDER
      SIGNER_IPC_PATH
  `)

  recover = process.env['RECOVER_KEYSTORE'] == 'true' ? true : false;
  recover = program.init == true ? false : true;
  dirPath = process.env['KEYSTORE_DIR_PATH'];
  web3Provider = process.env['WEB3_PROVIDER'];
  signerIpcPath = process.env['SIGNER_IPC_PATH'];
}

// Run the signer
const signer = new GitTokenSigner({
  signerIpcPath,
  recover,
  dirPath,
  web3Provider
})
