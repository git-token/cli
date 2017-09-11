const Promise = require('bluebird')
const defaultFilter = require('../utils/filter')

const signerIpcPath = ({ option }) => {
  return {
    type: 'input',
    name: 'signerIpcPath',
    message: 'Please enter an ipc socket path for the signer:',
    default: option ? option : '/tmp/signer.sock',
    filter: defaultFilter
  }
}

const dirPath = ({ option }) => {
  return {
    type: 'input',
    name: 'dirPath',
    message: 'Please enter a directory path for the keystore:',
    default: option ? option : '/keystore/',
    filter: defaultFilter
  }
}

const mysqlHost = ({ option }) => {
  return {
    type: 'input',
    name: 'mysqlHost',
    message: 'Please enter mysql IPv4 host address: ',
    default: option ? option : '127.0.0.1:3306',
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
    default: option ? option : null,
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

const web3Provider = ({ option }) => {
  return {
    type: 'input',
    name: 'web3Provider',
    message: 'Please enter web3 http provider: ',
    default: option ? option : 'http://127.0.0.1:8545',
    filter: defaultFilter
  }
}

const recover = ({ option }) => {
  return {
    type: 'confirm',
    name: 'recover',
    message: 'Recover existing keystore?',
    default: option ? option : false,
    filter: defaultFilter
  }
}

module.exports = (options) => {
  return [
    signerIpcPath({ option: options['signerIpcPath'] }),
    dirPath({ option: options['dirPath'] }),
    mysqlHost({ option: options['mysqlHost'] }),
    mysqlUser({ option: options['mysqlUser'] }),
    mysqlRootPassword({ option: options['mysqlRootPassword'] }),
    mysqlDatabase({ option: options['mysqlDatabase'] }),
    web3Provider({ option: options['web3Provider'] }),
    recover({ option: options['recover'] })
  ]
}
