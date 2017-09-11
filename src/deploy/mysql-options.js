const Promise = require('bluebird')
const defaultFilter = require('../utils/filter')

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

module.exports = (options) => {
  return [
    mysqlHost({ option: options['mysqlHost'] }),
    mysqlUser({ option: options['mysqlUser'] }),
    mysqlRootPassword({ option: options['mysqlRootPassword'] }),
    mysqlDatabase({ option: options['mysqlDatabase'] })
  ]
}
