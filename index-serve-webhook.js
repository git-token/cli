#!/usr/bin/env node

const program = require('commander');
const GitTokenWebHookManager = require('gittoken-webhook-manager').default;

program
  .option('-p, --port [Port]', 'Port to run Web Hook Manager on')
  .option('-rs, --recoveryShare <Recovery Share>', 'GitToken Signer Recovery Share')
  .option('-d, --logDBPath <Directory Path>', 'Hyperlog LevelDB Database Directory')
  .option('-s, --signerIpcPath <Signer IPC Path>', 'GitToken Signer IPC Path')
  .option('-e, --env <Environmental Vairable Path>', 'Environmental Path')
  .parse(process.argv);

let
  port,
  logDBPath,
  recoveryShare,
  signerIpcPath

!program.env ? null : require('dotenv').config({ path: program.env })

if (!program.env) {
  if (!program.port) {
    console.error('Port Missing! Exiting...')
    process.exit(1)
  } else if (!program.recoveryShare) {
    console.error('Recovery Share Missing! Exiting...')
    process.exit(1)
  } else if (!program.logDBPath) {
    console.error('Hyperlog LevelDB Database Directory Path Missing! Exiting...')
    process.exit(1)
  } else if (!program.signerIpcPath) {
    console.error('GitToken Signer Path Missing! Exiting...')
    process.exit(1)
  } else {
    port          = program.port
    logDBPath     = program.logDBPath
    signerIpcPath = program.signerIpcPath
    recoveryShare = program.recoveryShare
  }
} else {
  console.log(`
    Looking for an .env file with the following varaibles:

      WEBHOOK_MANAGER_PORT
      RECOVERY_SHARE
      SIGNER_IPC_PATH
      LOG_DB_PATH
  `)

  port = process.env['WEBHOOK_MANAGER_PORT'];
  logDBPath = process.env['LOG_DB_PATH'];
  recoveryShare = process.env['RECOVERY_SHARE'];
  signerIpcPath = process.env['SIGNER_IPC_PATH'];
}

// Run the signer
const webhook = new GitTokenWebHookManager({
  port,
  logDBPath,
  recoveryShare,
  signerIpcPath
})
