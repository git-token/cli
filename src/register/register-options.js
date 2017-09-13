import Promise from 'bluebird'
import defaultFilter from '../utils/filter'

const GITHUB_USER = {
  type: 'input',
  name: 'GITHUB_USER',
  message: 'Please enter GitHub username: ',
  filter: defaultFilter
}

const GITHUB_TOKEN = {
  type: 'password',
  name: 'GITHUB_TOKEN',
  message: 'Please enter GitHub authorization token (or enter to use password): ',
  filter: defaultFilter,
  default: null
}

const GITHUB_PASSWORD = {
  type: 'password',
  name: 'GITHUB_PASSWORD',
  message: 'Please enter GitHub password (leave blank if used oauth token): ',
  filter: defaultFilter,
  default: null
}

const GITHUB_ORG = {
  type: 'input',
  name: 'GITHUB_ORG',
  message: 'Please enter GitHub organization: ',
  filter: defaultFilter
}


module.exports = [
  GITHUB_USER,
  GITHUB_TOKEN,
  GITHUB_PASSWORD,
  // GITHUB_ORG
]
