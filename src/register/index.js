#!/usr/bin/env node

import Promise, { join } from 'bluebird'
import inquirer from 'inquirer'
import { exec } from 'child_process'
import GitHubApi from 'github-api'
import GitTokenRegistryClient from 'gittoken-registry/dist/client/index'
import figlet from 'figlet'
import { register, token } from './options'
import cacheData from '../utils/cacheData'
import filter from '../utils/filter'

const registry = new GitTokenRegistryClient({
  registryUri: 'https://registry.gittoken.io'
})

let github, user, org, profile, variables;


inquirer.prompt([
  ...register
]).then((answers) => {
  variables = { ...answers }
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
    message: 'Please select which GitHub organization to register:',
    choices: orgs.data.map((org) => { return org.login }),
    filter,
  }])
}).then(({ organization }) => {
  variables = {
    ...variables,
    'GITTOKEN_ORGANIZATION': organization
  }

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
  variables = {
    ...variables,
    ...answers
  }

  return registry.registerToken({
    github_token: variables['GITHUB_TOKEN'],
    admin_username: variables['GITHUB_USER'],
    admin_address: variables['GITTOKEN_ADMIN_ADDRESS'],
    admin_email: variables['GITTOKEN_ADMIN_EMAIL'],
    organization: variables['GITTOKEN_ORGANIZATION'],
    name: variables['GITTOKEN_NAME'],
    symbol: variables['GITTOKEN_SYMBOL'],
    decimals: variables['GITTOKEN_DECIMALS']
  })
}).then((result) => {

  figlet('GitToken', 'Standard', (error, result) => {
    console.log(`

      Congratulations! ${variables['GITTOKEN_NAME']} is registered with GitToken!

      To start using GitToken for ${variables['GITTOKEN_ORGANIZATION']}, you must setup a
      GitHub webhook service here:

      https://github.com/organizations/${variables['GITTOKEN_ORGANIZATION']}/settings/hooks

      And set the url path to:

      https://webhook.gittoken.io/${variables['GITTOKEN_ORGANIZATION']}



      Thanks for using GitToken! Happy Coding!

    `)
  })

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
