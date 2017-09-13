#!/usr/bin/env node
'use strict';

var program = require('commander');
var GitTokenSigner = require('gittoken-signer').default;

var _require = require('child_process'),
    exec = _require.exec;

program.option('-i, --init', 'Initialize New GitToken Signer').option('-s, --socket <Socket Path>', 'Signer Socket Path').option('--web3 <Web3 Provider>', 'Ethereum Web3 Provider').option('-d --dir <Directory Path>', 'Directory to Save Keystore').option('-e --env <Environmental Vairable Path>', 'Environmental Path').parse(process.argv);

var signerIpcPath = void 0,
    recover = void 0,
    dirPath = void 0,
    web3Provider = void 0;

!program.env ? null : require('dotenv').config({ path: program.env });

if (!program.env) {
  if (!program.web3) {
    console.log('Web3 Provider Missing! Exiting...');
    process.exit(1);
  } else if (!program.dir) {
    console.log('Directory Path Missing! Exiting...');
    process.exit(1);
  } else if (!program.socket) {
    console.log('Socket Path Missing! Exiting...');
    process.exit(1);
  } else {
    recover = program.init ? false : true;
    dirPath = program.dir;
    web3Provider = program.web3;
    signerIpcPath = program.socket;
  }
} else {
  console.log('\n    Looking for an .env file with the following varaibles:\n\n      RECOVER_KEYSTORE\n      KEYSTORE_DIR_PATH\n      WEB3_PROVIDER\n      SIGNER_IPC_PATH\n      MYSQL_HOST\n      MYSQL_USER\n      MYSQL_ROOT_PASSWORD\n      MYSQL_DATABASE\n  ');

  recover = process.env['RECOVER_KEYSTORE'] == 'true' ? true : false;
  recover = program.init == true ? false : true;
  dirPath = process.env['KEYSTORE_DIR_PATH'];
  web3Provider = process.env['WEB3_PROVIDER'];
  signerIpcPath = process.env['SIGNER_IPC_PATH'];
}

// Run the signer
var signer = new GitTokenSigner({
  signerIpcPath: signerIpcPath,
  recover: recover,
  dirPath: dirPath,
  web3Provider: web3Provider
});