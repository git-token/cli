#!/usr/bin/env node

const Promise = require('bluebird')
const inquirer = require('inquirer')
const { exec } = require('child_process');
const options = require('./options')

let variables = {}

inquirer.prompt(options['services']).then((answer) => {
  return nextService(answer.service, {})
}).then((answer) => {
  console.log('answer', answer)
}).catch((error) => {
  console.log(error)
})


function nextService(serviceList, envs) {
  return new Promise((resolve, reject) => {
    const s = serviceList.shift()
    if (serviceList.length == 0 || !options[s]) {
      resolve(null)
    }
    inquirer.prompt(options[s](envs)).then((answer) => {
      variables = Object.assign(variables, answer)
      resolve(nextService(serviceList, variables))
    }).catch((error) => {
      reject(error)
    })
  })
}
