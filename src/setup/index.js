#!/usr/bin/env node

const program = require('commander');
const Promise = require('bluebird')
const inquirer = require('inquirer')
const { exec } = require('child_process');

const cacheData = require('../utils/cacheData')

program
  .option('-H, --host <host>', 'IPv4 Host Address (e.g. 127.0.0.1)')
  .option('-U, --user <user>', 'SSH User of the Host')
  .option('-Pk, --sshKey <ssh private key>', 'Path to local SSH private key to authorize user on host')
  .option('-N, --name <name>', 'Name of host machine')
  .option('-E --env <Environmental Vairable Path>', 'Environmental variables file path')
  .parse(process.argv);

let host,user,sshKey,name;

if (program.env) {
  console.log(`
    Looking for an .env file with the following varaibles:

      DOCKER_MACHINE_HOST_USER
      DOCKER_MACHINE_HOST_NAME
      DOCKER_MACHINE_HOST_ADDRESS
      DOCKER_MACHINE_HOST_SSH_KEY_PATH
  `)
  require('dotenv').config({ path: program.env })
  setup({
    ['DOCKER_MACHINE_HOST_ADDRESS']: process.env['DOCKER_MACHINE_HOST_ADDRESS'],
    ['DOCKER_MACHINE_HOST_USER']: process.env['DOCKER_MACHINE_HOST_USER'],
    ['DOCKER_MACHINE_HOST_NAME']: process.env['DOCKER_MACHINE_HOST_NAME'],
    ['DOCKER_MACHINE_HOST_SSH_KEY_PATH']: process.env['DOCKER_MACHINE_HOST_SSH_KEY_PATH'],
  })
} else if ( program.host && program.user && program.name && program.sshKey ) {
  setup({
    ['DOCKER_MACHINE_HOST_ADDRESS']: program.host,
    ['DOCKER_MACHINE_HOST_USER']: program.user,
    ['DOCKER_MACHINE_HOST_NAME']: program.name,
    ['DOCKER_MACHINE_HOST_SSH_KEY_PATH']: program.sshKey
  })
} else {
  inquirer.prompt([{
    type: 'input',
    name: 'DOCKER_MACHINE_HOST_ADDRESS',
    message: `Enter the IPv4 address of the virtual machine to setup docker machine for GitToken services: `,
    validate: (input) => {
      return new Promise((resolve, reject) => {
        if (!RegExp("(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)").test(input)) {
          reject('Invalid IPv4 Address')
        } else {
          resolve(true)
        }
      })
    },
    filter: (input) => {
      return new Promise((resolve, reject) => {
        resolve(input)
      })
    },
    default: `0.0.0.0`
  }, {
    type: 'input',
    name: 'DOCKER_MACHINE_HOST_USER',
    message: `Enter the SSH user to set for the docker machine: `,
    filter: (input) => {
      return new Promise((resolve, reject) => {
        resolve(input)
      })
    },
    default: `root`
  }, {
    type: 'input',
    name: 'DOCKER_MACHINE_HOST_SSH_KEY_PATH',
    message: `Enter the path to the private SSH key to set for the docker machine: `,
    filter: (input) => {
      return new Promise((resolve, reject) => {
        resolve(input)
      })
    },
    default: `/root/.ssh/id_rsa`
  }, {
    type: 'input',
    name: 'DOCKER_MACHINE_HOST_NAME',
    message: `Enter the name to set for the docker machine: `,
    filter: (input) => {
      return new Promise((resolve, reject) => {
        resolve(input)
      })
    },
    default: `GitToken`
  }]).then((answers) => {
    return Promise.join(
      answers,
      cacheData({ data: { dockerMachine: answers } })
    )
  }).then((data) => {
    setup(data[0])
  }).catch((error) => {
    console.error(error)
  })
}


// Utility Functions

/**
 * [setup description]
 * @param  {String} host   [description]
 * @param  {String} user   [description]
 * @param  {String} sshKey [description]
 * @param  {String} name   [description]
 * @return [type]          [description]
 */
function setup(answers) {

  const host = answers['DOCKER_MACHINE_HOST_ADDRESS']
  const user = answers['DOCKER_MACHINE_HOST_USER']
  const sshKey = answers['DOCKER_MACHINE_HOST_SSH_KEY_PATH']
  const name = answers['DOCKER_MACHINE_HOST_NAME']

  const cmd = `docker-machine create --driver generic --engine-storage-driver=overlay --generic-ip-address=${host} --generic-ssh-user=${user} --generic-ssh-key=${sshKey} ${name}`

  console.log(`
    Setting up Docker Machine, ${name}, for GitToken Services...

    NOTE: Docker requires ports 2376 and 22 are open to external network traffic
    and the docker daemon process is running on the remote host before creating a
    new machine.
  `)
  const docker = exec(cmd);

  docker.stdout.on('data', (data) => {
    console.log(data.toString('utf8'))
  })

  docker.stderr.on('data', (data) => {
    console.log(data.toString('utf8'))
  })

  docker.on('error', (error) => {
    console.log('Process Errored: ', error)
  })

  docker.on('close', (code) => {
    if (code == 0) {
      console.log('Successfully Setup GitToken Docker Host')

    } else {
      console.log('Process Exited Unsuccessfully with code: ', code)
    }
  })
}
