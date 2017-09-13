#!/usr/bin/env node

import Promise from 'bluebird'
import inquirer from 'inquirer'
import { exec } from 'child_process'
import options from './options'

import writeDockerCompose from '../utils/writeDockerCompose'
import cacheData from '../utils/cacheData'

let services

inquirer.prompt(options['services']).then((answers) => {
  services = answers.services
  return nextService(services, services.reduce((acc, s) => {
    typeof acc == 'string' ?
      acc = Object.assign({[acc]: {} }, { [s]: {} }) :
      acc = Object.assign(acc, { [s]: {} })
    return acc
  }))
}).then((variables) => {
  return Promise.join(
    cacheData({ data: variables }),
    writeDockerCompose({ variables })
  )
}).then((saved) => {
//   return deployDockerServices({ services })
// }).then(() => {

}).catch((error) => {
  console.log(error)
})


function nextService(services, envs) {
  return new Promise((resolve, reject) => {
    if (services.length == 0 || !options[services[0]]) {
      resolve(null)
    }

    const s = services.shift()
    let variables = {}

    if (s) {
      console.log(`
        Inquiring about service: ${s}
      `)
    }

    inquirer.prompt(options[s](envs)).then((answer) => {
      variables = Object.assign(envs, { [s]: answer })
      return nextService(services, variables)
    }).then(() => {
      resolve(variables)
    }).catch((error) => {
      reject(error)
    })
  })
}
