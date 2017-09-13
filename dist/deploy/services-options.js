'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var services = {
  type: 'checkbox',
  name: 'services',
  message: 'Please select which service(s) to deploy:',
  default: 'all',
  choices: [new _inquirer2.default.Separator(), {
    name: 'mysql',
    disabled: false,
    checked: false
  }, {
    name: 'signer',
    disabled: false,
    checked: true
  }, {
    name: 'webhook',
    disabled: false,
    checked: true
  }, new _inquirer2.default.Separator(), {
    name: 'dashboard',
    disabled: true,
    checked: false
  }, {
    name: 'registry',
    disabled: true,
    checked: false
  }, {
    name: 'analytics',
    disabled: true,
    checked: false
  }, {
    name: 'auction',
    disabled: true,
    checked: false
  }, {
    name: 'exchange',
    disabled: true,
    checked: false
  }, {
    name: 'parity',
    disabled: true,
    checked: false
  }],
  filter: function filter(input) {
    return new _bluebird2.default(function (resolve, reject) {
      resolve(input);
    });
  }
};

module.exports = [services];