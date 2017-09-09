#!/usr/bin/env node

const program = require('commander');
const GitTokenSigner = require('gittoken-signer').default;
const { exec } = require('child_process');

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

      GITTOKEN_HOST_USER
      GITTOKEN_HOST_NAME
      GITTOKEN_HOST_ADDRESS
      GITTOKEN_HOST_SSH_KEY_PATH
  `)
  require('dotenv').config({ path: program.env })

  user   = process.env['GITTOKEN_HOST_USER']
  name   = process.env['GITTOKEN_HOST_NAME']
  host   = process.env['GITTOKEN_HOST_ADDRESS']
  sshKey = process.env['GITTOKEN_HOST_SSH_KEY_PATH']
} else {

  host   = program.host
  user   = program.user
  name   = program.name
  sshKey = program.sshKey
}

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
