#!/usr/bin/env node

import Promise, { join } from 'bluebird'
import inquirer from 'inquirer'
import { exec } from 'child_process'
import GitHubApi from 'github-api'

import { register, token } from './options'
import cacheData from '../utils/cacheData'
import filter from '../utils/filter'


let github, user, org, profile;

inquirer.prompt([
  ...register
]).then((answers) => {

  github = new GitHubApi({
    username: answers['GITHUB_USER'],
    token: answers['GITHUB_TOKEN']
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
  return join(
    organization,
    isAdmin({ organization })
  )
}).then((data) => {
  if (!data[1]) {
    console.log(`
      Invalid Authorization!

      Must be an admin of ${data[0]} to register.
    `)
    process.exit(1)
  } else {
    return inquirer.prompt([
      ...token({ organization: data[0], profile })
    ])
  }
}).then((answers) => {

}).catch((error) => {
  console.log(error)
})




// Helper Methods
// TODO Break out into utility methods or class

/**
 * [getMembers description]
 * @param  {[type]} organization [description]
 * @return [type]                [description]
 */
function getMembers({ organization }) {
  return new Promise((resolve, reject) => {
    org = github.getOrganization(organization)
    org.listMembers({ role: 'admin' }).then(({ data }) => {
      resolve(data)
    }).catch((error) => {
      reject(error)
    })
  })
}


/**
 * [isAdmin description]
 * @param  {[type]} organization [description]
 * @return Boolean               [description]
 */
function isAdmin({ organization }) {
  return new Promise((resolve, reject) => {
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
