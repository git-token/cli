#!/usr/bin/env node

const Promise = require('bluebird')
const inquirer = require('inquirer')
const { exec } = require('child_process');
const options = require('./options')

let variables = {}

inquirer.prompt(options['services']).then((answer) => {
  return nextService(answer.service, {})
}).then(() => {
  console.log('variables', variables)
}).catch((error) => {
  console.log(error)
})


function nextService(serviceList, envs) {
  return new Promise((resolve, reject) => {
    const s = serviceList.shift()
    if (serviceList.length == 0 || !options[s]) {
      resolve(null)
    }

    if (s) {
      console.log(`
        Inquiring about service: ${s}
      `)
    }

    const prompt = inquirer.createPromptModule()

    prompt(options[s](envs)).then((answer) => {
      variables = Object.assign(variables, answer)
      return nextService(serviceList, variables)
    }).then(() => {
      resolve(true)
    }).catch((error) => {
      reject(error)
    })
  })
}
