'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _filter = require('../utils/filter');

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GITHUB_USER = {
  type: 'input',
  name: 'GITHUB_USER',
  message: 'Please Enter GitHub Username',
  filter: _filter2.default
};

var GITHUB_TOKEN = {
  type: 'password',
  name: 'GITHUB_TOKEN',
  message: 'Please Enter GitHub Authorization Token (or enter to use password)',
  filter: _filter2.default,
  default: null
};

var GITHUB_PASSWORD = {
  type: 'password',
  name: 'GITHUB_PASSWORD',
  message: 'Please Enter GitHub Password (leave blank if used oauth token)',
  filter: _filter2.default,
  default: null
};

var GITHUB_ORG = {
  type: 'input',
  name: 'GITHUB_ORG',
  message: 'Please Enter GitHub Organization',
  filter: _filter2.default
};

module.exports = [GITHUB_USER, GITHUB_TOKEN, GITHUB_PASSWORD];