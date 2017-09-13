#!/usr/bin/env node
'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _child_process = require('child_process');

var _options = require('./options');

var _options2 = _interopRequireDefault(_options);

var _writeDockerCompose = require('../utils/writeDockerCompose');

var _writeDockerCompose2 = _interopRequireDefault(_writeDockerCompose);

var _cacheData = require('../utils/cacheData');

var _cacheData2 = _interopRequireDefault(_cacheData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var services = void 0;

_inquirer2.default.prompt(_options2.default['services']).then(function (answers) {
  services = answers.services;
  return nextService(services, services.reduce(function (acc, s) {
    typeof acc == 'string' ? acc = (0, _assign2.default)((0, _defineProperty3.default)({}, acc, {}), (0, _defineProperty3.default)({}, s, {})) : acc = (0, _assign2.default)(acc, (0, _defineProperty3.default)({}, s, {}));
    return acc;
  }));
}).then(function (variables) {
  return _bluebird2.default.join((0, _cacheData2.default)({ data: variables }), (0, _writeDockerCompose2.default)({ variables: variables }));
}).then(function (saved) {
  //   return deployDockerServices({ services })
  // }).then(() => {

}).catch(function (error) {
  console.log(error);
});

function nextService(services, envs) {
  return new _bluebird2.default(function (resolve, reject) {
    if (services.length == 0 || !_options2.default[services[0]]) {
      resolve(null);
    }

    var s = services.shift();
    var variables = {};

    if (s) {
      console.log('\n        Inquiring about service: ' + s + '\n      ');
    }

    _inquirer2.default.prompt(_options2.default[s](envs)).then(function (answer) {
      variables = (0, _assign2.default)(envs, (0, _defineProperty3.default)({}, s, answer));
      return nextService(services, variables);
    }).then(function () {
      resolve(variables);
    }).catch(function (error) {
      reject(error);
    });
  });
}