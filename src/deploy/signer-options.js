import Promise from 'bluebird'
import defaultFilter from '../utils/filter'
import mysqlOptions from './mysql-options'

export function signerIpcPath ({ option }) {
  return {
    type: 'input',
    name: 'SIGNER_IPC_PATH',
    message: 'Please enter an ipc socket path for the signer:',
    default: option ? option : '/tmp/signer.sock',
    filter: defaultFilter
  }
}

export function dirPath ({ option }) {
  return {
    type: 'input',
    name: 'SIGNER_KEYSTORE_DIR_PATH',
    message: 'Please enter a directory path for the keystore:',
    default: option ? option : '/keystore/',
    filter: defaultFilter
  }
}

export function web3Provider ({ option }) {
  return {
    type: 'input',
    name: 'WEB3_PROVIDER',
    message: 'Please enter web3 http provider: ',
    default: option ? option : 'http://127.0.0.1:8545',
    filter: defaultFilter
  }
}

export function recover ({ option }) {
  return {
    type: 'confirm',
    name: 'IS_RECOVERY',
    message: 'Recover existing keystore?',
    default: option ? option : false,
    filter: defaultFilter
  }
}

export default function(options) {
  const { signer } = options
  return [
    // signerIpcPath({ option: signer['SIGNER_IPC_PATH'] }),
    // dirPath({ option: signer['SIGNER_KEYSTORE_DIR_PATH'] }),
    web3Provider({ option: signer['WEB3_PROVIDER'] }),
    recover({ option: signer['IS_RECOVERY'] }),
  ].concat(mysqlOptions(options))
}
