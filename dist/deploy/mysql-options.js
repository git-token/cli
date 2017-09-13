'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mysqlHost = mysqlHost;
exports.mysqlUser = mysqlUser;
exports.mysqlRootPassword = mysqlRootPassword;
exports.mysqlDatabase = mysqlDatabase;

exports.default = function (options) {
  var mysql = options.mysql;

  return [exports.mysqlHost({ option: mysql['MYSQL_HOST'] }), exports.mysqlUser({ option: mysql['MYSQL_USER'] }), exports.mysqlRootPassword({ option: mysql['MYSQL_ROOT_PASSWORD'] }), exports.mysqlDatabase({ option: mysql['MYSQL_DATABASE'] })];
};

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _filter = require('../utils/filter');

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mysqlHost(_ref) {
  var option = _ref.option;

  return {
    type: 'input',
    name: 'MYSQL_HOST',
    message: 'Please enter mysql IPv4 host address: ',
    default: option ? option : '127.0.0.1:3306',
    filter: _filter2.default
  };
}

function mysqlUser(_ref2) {
  var option = _ref2.option;

  return {
    type: 'input',
    name: 'MYSQL_USER',
    message: 'Please enter mysql user name: ',
    default: option ? option : 'root',
    filter: _filter2.default
  };
}

function mysqlRootPassword(_ref3) {
  var option = _ref3.option;

  return {
    type: 'password',
    name: 'MYSQL_ROOT_PASSWORD',
    message: 'Please enter mysql user password: ',
    default: option ? option : null,
    filter: _filter2.default
  };
}

function mysqlDatabase(_ref4) {
  var option = _ref4.option;

  return {
    type: 'input',
    name: 'MYSQL_DATABASE',
    message: 'Please enter mysql database name: ',
    default: option ? option : 'git_token',
    filter: _filter2.default
  };
}