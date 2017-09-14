#!/usr/bin/env node
'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _child_process = require('child_process');

var _githubApi = require('github-api');

var _githubApi2 = _interopRequireDefault(_githubApi);

var _index = require('gittoken-registry/dist/client/index');

var _index2 = _interopRequireDefault(_index);

var _options = require('./options');

var _cacheData = require('../utils/cacheData');

var _cacheData2 = _interopRequireDefault(_cacheData);

var _filter = require('../utils/filter');

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var registry = new _index2.default({
  registryUri: 'https://registry.gittoken.io'
});

var github = void 0,
    user = void 0,
    org = void 0,
    profile = void 0,
    variables = void 0;

_inquirer2.default.prompt([].concat((0, _toConsumableArray3.default)(_options.register))).then(function (answers) {
  variables = (0, _extends3.default)({}, answers);
  github = new _githubApi2.default({
    username: answers['GITHUB_USER'],
    token: answers['GITHUB_TOKEN']
  });

  user = github.getUser();

  return user.listOrgs();
}).then(function (orgs) {

  return _inquirer2.default.prompt([{
    type: 'list',
    name: 'organization',
    message: 'Please select which GitHub organization to register:',
    choices: orgs.data.map(function (org) {
      return org.login;
    }),
    filter: _filter2.default
  }]);
}).then(function (_ref) {
  var organization = _ref.organization;

  variables = (0, _extends3.default)({}, variables, {
    'GITTOKEN_ORGANIZATION': organization
  });

  return (0, _bluebird.join)(organization, isAdmin({ organization: organization }));
}).then(function (data) {
  if (!data[1]) {
    console.log('\n      Invalid Authorization!\n\n      Must be an admin of ' + data[0] + ' to register.\n    ');
    process.exit(1);
  } else {
    return _inquirer2.default.prompt([].concat((0, _toConsumableArray3.default)((0, _options.token)({ organization: data[0], profile: profile }))));
  }
}).then(function (answers) {
  variables = (0, _extends3.default)({}, variables, answers);

  return registry.registerToken({
    github_token: variables['GITHUB_TOKEN'],
    admin_username: variables['GITHUB_USER'],
    admin_address: variables['GITTOKEN_ADMIN_ADDRESS'],
    admin_email: variables['GITTOKEN_ADMIN_EMAIL'],
    organization: variables['GITTOKEN_ORGANIZATION'],
    name: variables['GITTOKEN_NAME'],
    symbol: variables['GITTOKEN_SYMBOL'],
    decimals: variables['GITTOKEN_DECIMALS']
  });
}).then(function (result) {

  figlet('GitToken', 'Standard', function (error, result) {
    console.log('\n\n      Congratulations! ' + variables['GITTOKEN_NAME'] + ' is registered with GitToken!\n\n      To start using GitToken for ' + variables['GITTOKEN_ORGANIZATION'] + ', you must setup a\n      GitHub webhook service here:\n\n      https://github.com/organizations/' + variables['GITTOKEN_ORGANIZATION'] + '/settings/hooks\n\n      And set the url path to:\n\n      https://webhook.gittoken.io/' + variables['GITTOKEN_ORGANIZATION'] + '\n\n\n\n      Thanks for using GitToken! Happy Coding!\n\n    ');
  });
}).catch(function (error) {
  console.log(error);
});

// Helper Methods
// TODO Break out into utility methods or class

/**
 * [getMembers description]
 * @param  {[type]} organization [description]
 * @return [type]                [description]
 */
function getMembers(_ref2) {
  var organization = _ref2.organization;

  return new _bluebird2.default(function (resolve, reject) {
    org = github.getOrganization(organization);
    org.listMembers({ role: 'admin' }).then(function (_ref3) {
      var data = _ref3.data;

      resolve(data);
    }).catch(function (error) {
      reject(error);
    });
  });
}

/**
 * [isAdmin description]
 * @param  {[type]} organization [description]
 * @return Boolean               [description]
 */
function isAdmin(_ref4) {
  var organization = _ref4.organization;

  return new _bluebird2.default(function (resolve, reject) {
    _bluebird2.default.resolve(user.getProfile()).then(function (_ref5) {
      var data = _ref5.data;

      profile = data;
      return getMembers({ organization: organization });
    }).map(function (member) {
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