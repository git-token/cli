import Promise from 'bluebird'
import defaultFilter from '../utils/filter'

const GITTOKEN_NAME = {
  type: 'input',
  name: 'GITTOKEN_NAME',
  message: 'Please enter desired token name: ',
  filter: defaultFilter
}

const GITTOKEN_ORGANIZATION = ({ organization }) => {
  return {
    type: 'input',
    name: 'GITTOKEN_ORGANIZATION',
    message: 'Please enter desired token organization: ',
    validate: (input) => {
      return new Promise((resolve, reject) => {
        input == organization ?
          resolve(true) :
          reject(`

            Input must match selected organization.

            Try '${organization}' or press enter.
          `)
      })
    },
    filter: defaultFilter,
    default: organization,
  }
}

const GITTOKEN_SYMBOL = {
  type: 'input',
  name: 'GITTOKEN_SYMBOL',
  message: 'Please enter desired token symbol: ',
  filter: defaultFilter
}

const GITTOKEN_DECIMALS = {
  type: 'input',
  name: 'GITTOKEN_DECIMALS',
  message: 'Please enter desired token decimals: ',
  filter: defaultFilter
}

const GITTOKEN_ADMIN_ADDRESS = {
  type: 'input',
  name: 'GITTOKEN_ADMIN_ADDRESS',
  message: 'Please enter admin Ethereum address: ',
  filter: defaultFilter
}

const GITTOKEN_ADMIN_USER = ({ profile }) => {
  return {
    type: 'input',
    name: 'GITTOKEN_ADMIN_USER',
    message: 'Please enter admin GitHub username: ',
    validate: (input) => {
      return new Promise((resolve, reject) => {
        input == profile.login ?
          resolve(true) :
          reject(`

            Username must match authorized profile username.
          `)
      })
    },
    filter: defaultFilter,
    default: profile.login
  }
}

const GITTOKEN_ADMIN_EMAIL = ({ profile }) => {
  return {
    type: 'input',
    name: 'GITTOKEN_ADMIN_EMAIL',
    message: 'Please enter admin email: ',
    validate: (input) => {
      return new Promise((resolve, reject) => {
        input == profile.email ?
          resolve(true) :
          reject(`

            Email must match authorized profile email.
          `)
      })
    },
    filter: defaultFilter,
    default: profile.email
  }
}


export default function ({ organization, profile }) {
  return [
    GITTOKEN_NAME,
    GITTOKEN_ORGANIZATION({ organization }),
    GITTOKEN_SYMBOL,
    GITTOKEN_DECIMALS,
    GITTOKEN_ADMIN_ADDRESS,
    GITTOKEN_ADMIN_USER({ profile }),
    GITTOKEN_ADMIN_EMAIL({ profile })
  ]
}
