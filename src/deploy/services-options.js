const Promise = require('bluebird')
const inquirer = require('inquirer')

const services = {
  type: 'checkbox',
  name: 'service',
  message: 'Please select which service(s) to deploy:',
  default: 'all',
  choices: [
    new inquirer.Separator(),
  {
    name: 'mysql',
    disabled: false,
    checked: false
  },{
    name: 'parity',
    disabled: false,
    checked: false
  },{
    name: 'signer',
    disabled: false,
    checked: true
  },{
    name: 'webhook',
    disabled: false,
    checked: true
  },
  new inquirer.Separator(),
  {
    name: 'dashboard',
    disabled: true,
    checked: false
  },{
    name: 'registry',
    disabled: true,
    checked: false
  },{
    name: 'analytics',
    disabled: true,
    checked: false
  },{
    name: 'auction',
    disabled: true,
    checked: false
  },{
    name: 'exchange',
    disabled: true,
    checked: false
  }],
  filter: (input) => {
    return new Promise((resolve, reject) => {
      resolve(input)
    })
  }
}

module.exports = [
  services
]
