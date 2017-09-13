#!/usr/bin/env node
'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _child_process = require('child_process');

var _githubApi = require('github-api');

var _githubApi2 = _interopRequireDefault(_githubApi);

var _options = require('./options');

var _cacheData = require('../utils/cacheData');

var _cacheData2 = _interopRequireDefault(_cacheData);

var _filter = require('../utils/filter');

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var github = void 0,
    user = void 0,
    org = void 0;

_inquirer2.default.prompt([].concat((0, _toConsumableArray3.default)(_options.register))).then(function (answers) {

  github = new _githubApi2.default({
    username: answers['GITHUB_USER'],
    token: answers['GITHUB_TOKEN'],
    password: answers['GITHUB_PASSWORD']
  });

  user = github.getUser();

  return user.listOrgs();
}).then(function (orgs) {

  return _inquirer2.default.prompt([{
    type: 'list',
    name: 'organization',
    message: 'Please select which organization to register:',
    choices: orgs.data.map(function (org) {
      return org.login;
    }),
    filter: _filter2.default
  }]);
}).then(function (_ref) {
  var organization = _ref.organization;

  return isAdmin({ organization: organization });
}).then(function (admin) {
  console.log('admin', admin);
}).catch(function (error) {
  console.log(error);
});

function getMembers(_ref2) {
  var organization = _ref2.organization;

  return new _bluebird2.default(function (resolve, reject) {
    org = github.getOrganization(organization);
    org.listMembers().then(function (_ref3) {
      var data = _ref3.data;

      resolve(data);
    }).catch(function (error) {
      reject(error);
    });
  });
}

function isAdmin(_ref4) {
  var organization = _ref4.organization;

  return new _bluebird2.default(function (resolve, reject) {
    var profile = void 0;
    _bluebird2.default.resolve(user.getProfile()).then(function (_ref5) {
      var data = _ref5.data;

      profile = data;
      return getMembers({ organization: organization });
    }).map(function (member) {
      console.log(user);
      if (member.login == profile.login) {
        resolve(true);
      } else {
        return null;
      }
    }).then(function () {
      resolve(false);
    }).catch(function (error) {
      reject(error);
    });
  });
}