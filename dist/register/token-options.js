'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref4) {
  var organization = _ref4.organization,
      profile = _ref4.profile;

  return [GITTOKEN_NAME,
  // GITTOKEN_ORGANIZATION({ organization }),
  GITTOKEN_SYMBOL, GITTOKEN_DECIMALS, GITTOKEN_ADMIN_ADDRESS,
  // GITTOKEN_ADMIN_USER({ profile }),
  GITTOKEN_ADMIN_EMAIL({ profile: profile })];
};

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _filter = require('../utils/filter');

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GITTOKEN_NAME = {
  type: 'input',
  name: 'GITTOKEN_NAME',
  message: 'Please enter desired token name: ',
  filter: _filter2.default
};

var GITTOKEN_ORGANIZATION = function GITTOKEN_ORGANIZATION(_ref) {
  var organization = _ref.organization;

  return {
    type: 'input',
    name: 'GITTOKEN_ORGANIZATION',
    message: 'Please enter desired token organization: ',
    validate: function validate(input) {
      return new _bluebird2.default(function (resolve, reject) {
        input == organization ? resolve(true) : reject('Input must match selected organization.');
      });
    },
    filter: _filter2.default,
    default: organization
  };
};

var GITTOKEN_SYMBOL = {
  type: 'input',
  name: 'GITTOKEN_SYMBOL',
  message: 'Please enter desired token symbol: ',
  filter: _filter2.default
};

var GITTOKEN_DECIMALS = {
  type: 'input',
  name: 'GITTOKEN_DECIMALS',
  message: 'Please enter desired token decimals: ',
  filter: _filter2.default
};

var GITTOKEN_ADMIN_ADDRESS = {
  type: 'input',
  name: 'GITTOKEN_ADMIN_ADDRESS',
  message: 'Please enter admin Ethereum address: ',
  filter: _filter2.default
};

var GITTOKEN_ADMIN_USER = function GITTOKEN_ADMIN_USER(_ref2) {
  var profile = _ref2.profile;

  return {
    type: 'input',
    name: 'GITTOKEN_ADMIN_USER',
    message: 'Please enter admin GitHub username: ',
    validate: function validate(input) {
      return new _bluebird2.default(function (resolve, reject) {
        input == profile.login ? resolve(true) : reject('Username must match authorized profile username.');
      });
    },
    filter: _filter2.default,
    default: profile.login
  };
};

var GITTOKEN_ADMIN_EMAIL = function GITTOKEN_ADMIN_EMAIL(_ref3) {
  var profile = _ref3.profile;

  return {
    type: 'input',
    name: 'GITTOKEN_ADMIN_EMAIL',
    message: 'Please enter admin email: ',
    validate: function validate(input) {
      return new _bluebird2.default(function (resolve, reject) {
        input == profile.email ? resolve(true) : reject('Email must match authorized profile email.');
      });
    },
    filter: _filter2.default,
    default: profile.email
  };
};