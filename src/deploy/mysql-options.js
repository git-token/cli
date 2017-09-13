import Promise from 'bluebird'
import defaultFilter from '../utils/filter'

export function mysqlHost ({ option }) {
  return {
    type: 'input',
    name: 'MYSQL_HOST',
    message: 'Please enter mysql IPv4 host address: ',
    default: option ? option : '127.0.0.1:3306',
    filter: defaultFilter
  }
}

export function mysqlUser ({ option }) {
  return {
    type: 'input',
    name: 'MYSQL_USER',
    message: 'Please enter mysql user name: ',
    default: option ? option : 'root',
    filter: defaultFilter
  }
}

export function mysqlRootPassword ({ option }) {
  return {
    type: 'password',
    name: 'MYSQL_ROOT_PASSWORD',
    message: 'Please enter mysql user password: ',
    default: option ? option : null,
    filter: defaultFilter
  }
}

export function mysqlDatabase ({ option }) {
  return {
    type: 'input',
    name: 'MYSQL_DATABASE',
    message: 'Please enter mysql database name: ',
    default: option ? option : 'git_token',
    filter: defaultFilter
  }
}

export default function (options) {
  const { mysql } = options
  return [
    exports.mysqlHost({ option: mysql['MYSQL_HOST'] }),
    exports.mysqlUser({ option: mysql['MYSQL_USER'] }),
    exports.mysqlRootPassword({ option: mysql['MYSQL_ROOT_PASSWORD'] }),
    exports.mysqlDatabase({ option: mysql['MYSQL_DATABASE'] })
  ]
}
