#!/usr/bin/env node

import Promise from 'bluebird'
import defaultFilter from '../utils/filter'
import mysqlOptions from './mysql-options'
import signerOptions, { signerIpcPath } from './signer-options'


export function port ({ option }) {
  return {
    type: 'input',
    name: 'WEBHOOK_PORT',
    message: 'Please enter port for GitToken webhook manager:',
    default: option ? option : 3000,
    filter: defaultFilter
  }
}

export function recoveryShare ({ option }) {
  return {
    type: 'password',
    name: 'RECOVERY_SHARE',
    message: 'Please enter recovery share for GitToken signer:',
    default: option ? option : null,
    filter: defaultFilter
  }
}

export function logDBPath ({ option }) {
  return {
    type: 'input',
    name: 'WEBHOOK_LOGGER_PATH',
    message: 'Please enter path for GitToken webhook manager levelDB log:',
    default: option ? option : '/db/',
    filter: defaultFilter
  }
}

export default function (options) {
  const { webhook, signer } = options
  return [
    port({ option: webhook['WEBHOOK_PORT'] }),
    recoveryShare({ option: webhook['RECOVERY_SHARE'] }),
    // logDBPath({ option: webhook['WEBHOOK_LOGGER_PATH'] }),
    // signerIpcPath({ option: signer['SIGNER_IPC_PATH'] })
  ].concat(mysqlOptions(options))
}






// const program = require('commander');
// const GitTokenWebHookManager = require('gittoken-webhook-manager').default;
//
// program
//   .option('-p, --port [Port]', 'Port to run Web Hook Manager on')
//   .option('-rs, --recoveryShare <Recovery Share>', 'GitToken Signer Recovery Share')
//   .option('-d, --logDBPath <Directory Path>', 'Hyperlog LevelDB Database Directory')
//   .option('-s, --signerIpcPath <Signer IPC Path>', 'GitToken Signer IPC Path')
//   .option('-e, --env <Environmental Vairable Path>', 'Environmental Path')
//   .parse(process.argv);
//
// let
//   port,
//   logDBPath,
//   recoveryShare,
//   signerIpcPath
//
// !program.env ? null : require('dotenv').config({ path: program.env })
//
// if (!program.env) {
//   if (!program.port) {
//     console.error('Port Missing! Exiting...')
//     process.exit(1)
//   } else if (!program.recoveryShare) {
//     console.error('Recovery Share Missing! Exiting...')
//     process.exit(1)
//   } else if (!program.logDBPath) {
//     console.error('Hyperlog LevelDB Database Directory Path Missing! Exiting...')
//     process.exit(1)
//   } else if (!program.signerIpcPath) {
//     console.error('GitToken Signer Path Missing! Exiting...')
//     process.exit(1)
//   } else if (
//     !program.mysqlHost ||
//     !program.mysqlUser ||
//     !program.mysqlRootPassword ||
//     !program.mysqlDatabase
//   ) {
//     console.error('MySql Configuration Missing! Exiting...')
//   } else {
//     port = program.port
//     recoveryShare = program.recoveryShare
//     signerIpcPath = program.signerIpcPath
//     logDBPath = program.logDBPath
//     mysqlHost = program.mysqlHost
//     mysqlUser = program.mysqlUser
//     mysqlRootPassword = program.mysqlRootPassword
//     mysqlDatabase = program.mysqlDatabase
//   }
// } else {
//   console.log(`
//     Looking for an .env file with the following varaibles:
//
//       WEBHOOK_MANAGER_PORT
//       RECOVERY_SHARE
//       SIGNER_IPC_PATH
//       LOG_DB_PATH
//       MYSQL_HOST
//       MYSQL_USER
//       MYSQL_ROOT_PASSWORD
//       MYSQL_DATABASE
//   `)
//
  // port = process.env['WEBHOOK_MANAGER_PORT'];
  // recoveryShare = process.env['RECOVERY_SHARE'];
  // signerIpcPath = process.env['SIGNER_IPC_PATH'];
  // logDBPath = process.env['LOG_DB_PATH'];
  // mysqlHost = process.env['MYSQL_HOST'];
  // mysqlUser = process.env['MYSQL_USER'];
  // mysqlRootPassword = process.env['MYSQL_ROOT_PASSWORD'];
  // mysqlDatabase = process.env['MYSQL_DATABASE'];
// }
//
// // Run the program
// const webhook = new GitTokenWebHookManager({
//   port,
//   logDBPath,
//   recoveryShare,
//   signerIpcPath
// })
