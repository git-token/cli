#!/usr/bin/env node
'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var program = require('commander');
var Promise = require('bluebird');
var inquirer = require('inquirer');

var _require = require('child_process'),
    exec = _require.exec;

var cacheData = require('../utils/cacheData');

program.option('-H, --host <host>', 'IPv4 Host Address (e.g. 127.0.0.1)').option('-U, --user <user>', 'SSH User of the Host').option('-Pk, --sshKey <ssh private key>', 'Path to local SSH private key to authorize user on host').option('-N, --name <name>', 'Name of host machine').option('-E --env <Environmental Vairable Path>', 'Environmental variables file path').parse(process.argv);

var host = void 0,
    user = void 0,
    sshKey = void 0,
    name = void 0;

if (program.env) {
  var _setup;

  console.log('\n    Looking for an .env file with the following varaibles:\n\n      DOCKER_MACHINE_HOST_USER\n      DOCKER_MACHINE_HOST_NAME\n      DOCKER_MACHINE_HOST_ADDRESS\n      DOCKER_MACHINE_HOST_SSH_KEY_PATH\n  ');
  require('dotenv').config({ path: program.env });
  setup((_setup = {}, (0, _defineProperty3.default)(_setup, 'DOCKER_MACHINE_HOST_ADDRESS', process.env['DOCKER_MACHINE_HOST_ADDRESS']), (0, _defineProperty3.default)(_setup, 'DOCKER_MACHINE_HOST_USER', process.env['DOCKER_MACHINE_HOST_USER']), (0, _defineProperty3.default)(_setup, 'DOCKER_MACHINE_HOST_NAME', process.env['DOCKER_MACHINE_HOST_NAME']), (0, _defineProperty3.default)(_setup, 'DOCKER_MACHINE_HOST_SSH_KEY_PATH', process.env['DOCKER_MACHINE_HOST_SSH_KEY_PATH']), _setup));
} else if (program.host && program.user && program.name && program.sshKey) {
  var _setup2;

  setup((_setup2 = {}, (0, _defineProperty3.default)(_setup2, 'DOCKER_MACHINE_HOST_ADDRESS', program.host), (0, _defineProperty3.default)(_setup2, 'DOCKER_MACHINE_HOST_USER', program.user), (0, _defineProperty3.default)(_setup2, 'DOCKER_MACHINE_HOST_NAME', program.name), (0, _defineProperty3.default)(_setup2, 'DOCKER_MACHINE_HOST_SSH_KEY_PATH', program.sshKey), _setup2));
} else {
  inquirer.prompt([{
    type: 'input',
    name: 'DOCKER_MACHINE_HOST_ADDRESS',
    message: 'Enter the IPv4 address of the virtual machine to setup docker machine for GitToken services: ',
    validate: function validate(input) {
      return new Promise(function (resolve, reject) {
        if (!RegExp("(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)").test(input)) {
          reject('Invalid IPv4 Address');
        } else {
          resolve(true);
        }
      });
    },
    filter: function filter(input) {
      return new Promise(function (resolve, reject) {
        resolve(input);
      });
    },
    default: '0.0.0.0'
  }, {
    type: 'input',
    name: 'DOCKER_MACHINE_HOST_USER',
    message: 'Enter the SSH user to set for the docker machine: ',
    filter: function filter(input) {
      return new Promise(function (resolve, reject) {
        resolve(input);
      });
    },
    default: 'root'
  }, {
    type: 'input',
    name: 'DOCKER_MACHINE_HOST_SSH_KEY_PATH',
    message: 'Enter the path to the private SSH key to set for the docker machine: ',
    filter: function filter(input) {
      return new Promise(function (resolve, reject) {
        resolve(input);
      });
    },
    default: '/root/.ssh/id_rsa'
  }, {
    type: 'input',
    name: 'DOCKER_MACHINE_HOST_NAME',
    message: 'Enter the name to set for the docker machine: ',
    filter: function filter(input) {
      return new Promise(function (resolve, reject) {
        resolve(input);
      });
    },
    default: 'GitToken'
  }]).then(function (answers) {
    return Promise.join(answers, cacheData({ data: { dockerMachine: answers } }));
  }).then(function (data) {
    setup(data[0]);
  }).catch(function (error) {
    console.error(error);
  });
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

  var host = answers['DOCKER_MACHINE_HOST_ADDRESS'];
  var user = answers['DOCKER_MACHINE_HOST_USER'];
  var sshKey = answers['DOCKER_MACHINE_HOST_SSH_KEY_PATH'];
  var name = answers['DOCKER_MACHINE_HOST_NAME'];

  var cmd = 'docker-machine create --driver generic --engine-storage-driver=overlay --generic-ip-address=' + host + ' --generic-ssh-user=' + user + ' --generic-ssh-key=' + sshKey + ' ' + name;

  console.log('\n    Setting up Docker Machine, ' + name + ', for GitToken Services...\n\n    NOTE: Docker requires ports 2376 and 22 are open to external network traffic\n    and the docker daemon process is running on the remote host before creating a\n    new machine.\n  ');
  var docker = exec(cmd);

  docker.stdout.on('data', function (data) {
    console.log(data.toString('utf8'));
  });

  docker.stderr.on('data', function (data) {
    console.log(data.toString('utf8'));
  });

  docker.on('error', function (error) {
    console.log('Process Errored: ', error);
  });

  docker.on('close', function (code) {
    if (code == 0) {
      console.log('Successfully Setup GitToken Docker Host');
    } else {
      console.log('Process Exited Unsuccessfully with code: ', code);
    }
  });
}