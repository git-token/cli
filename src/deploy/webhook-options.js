#!/usr/bin/env node

const Promise = require('bluebird')
const defaultFilter = require('../utils/filter')

const port = ({ option }) => {
  return {
    type: 'input',
    name: 'port',
    message: 'Please enter port for GitToken webhook manager:',
    default: option ? option : 3000,
    filter: defaultFilter
  }
}
const recoveryShare = ({ option }) => {
  return {
    type: 'password',
    name: 'recoveryShare',
    message: 'Please enter recovery share for GitToken signer:',
    default: option ? option : null,
    filter: defaultFilter
  }
}
const signerIpcPath = ({ option }) => {
  return {
    type: 'input',
    name: 'signerIpcPath',
    message: 'Please enter path for GitToken signer IPC socket:',
    default: option ? option : '/tmp/signer.sock',
    filter: defaultFilter
  }
}
const logDBPath = ({ option }) => {
  return {
    type: 'input',
    name: 'logDBPath',
    message: 'Please enter path for GitToken webhook manager levelDB log:',
    default: option ? option : '/db/',
    filter: defaultFilter
  }
}

const mysqlHost = ({ option }) => {
  return {
    type: 'input',
    name: 'mysqlHost',
    message: 'Please enter mysql IPv4 host address: ',
    default: option ? option : '127.0.0.1',
    filter: defaultFilter
  }
}

const mysqlUser = ({ option }) => {
  return {
    type: 'input',
    name: 'mysqlUser',
    message: 'Please enter mysql user name: ',
    default: option ? option : 'root',
    filter: defaultFilter
  }
}

const mysqlRootPassword = ({ option }) => {
  return {
    type: 'password',
    name: 'mysqlRootPassword',
    message: 'Please enter mysql user password: ',
    default: null,
    filter: defaultFilter
  }
}

const mysqlDatabase = ({ option }) => {
  return {
    type: 'input',
    name: 'mysqlDatabase',
    message: 'Please enter mysql database name: ',
    default: option ? option : 'git_token',
    filter: defaultFilter
  }
}


module.exports = (options) => {
  return [
    port({ option: options['port'] }),
    recoveryShare({ option: options['recoveryShare'] }),
    signerIpcPath({ option: options['signerIpcPath'] }),
    logDBPath({ option: options['logDBPath'] }),
    mysqlHost({ option: options['mysqlHost'] }),
    mysqlUser({ option: options['mysqlUser'] }),
    mysqlRootPassword({ option: options['mysqlRootPassword'] }),
    mysqlDatabase({ option: options['mysqlDatabase'] })
  ]
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
