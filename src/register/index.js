#!/usr/bin/env node

import Promise, { join } from 'bluebird'
import inquirer from 'inquirer'
import { exec } from 'child_process'
import GitHubApi from 'github-api'

import { register } from './options'
import cacheData from '../utils/cacheData'
import filter from '../utils/filter'


let github, user, org;

inquirer.prompt([
  ...register
]).then((answers) => {

  github = new GitHubApi({
    username: answers['GITHUB_USER'],
    token: answers['GITHUB_TOKEN'],
    password: answers['GITHUB_PASSWORD']
  })

  user = github.getUser()

  return user.listOrgs()
}).then((orgs) => {

  return inquirer.prompt([{
    type: 'list',
    name: 'organization',
    message: 'Please select which organization to register:',
    choices: orgs.data.map((org) => { return org.login }),
    filter,
  }])
}).then(({ organization }) => {
  return isAdmin({ organization })
}).then((admin) => {
  console.log('admin', admin)
}).catch((error) => {
  console.log(error)
})

function getMembers({ organization }) {
  return new Promise((resolve, reject) => {
    org = github.getOrganization(organization)
    org.listMembers().then(({ data }) => {
      resolve(data)
    }).catch((error) => {
      reject(error)
    })
  })
}

function isAdmin({ organization }) {
  return new Promise((resolve, reject) => {
    let profile
    Promise.resolve(user.getProfile()).then(({ data }) => {
      profile = data
      return getMembers({ organization })
    }).map((member) => {
      if (member.login == profile.login) {
        resolve(true)
      } else {
        return null
      }
    }).then(() => {
      resolve(false)
    }).catch((error) => {
      reject(error)
    })
  })
}
