'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.signerIpcPath = signerIpcPath;
exports.dirPath = dirPath;
exports.web3Provider = web3Provider;
exports.recover = recover;

exports.default = function (options) {
  var signer = options.signer;

  return [
  // signerIpcPath({ option: signer['SIGNER_IPC_PATH'] }),
  // dirPath({ option: signer['SIGNER_KEYSTORE_DIR_PATH'] }),
  web3Provider({ option: signer['WEB3_PROVIDER'] }), recover({ option: signer['IS_RECOVERY'] })].concat((0, _mysqlOptions2.default)(options));
};

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _filter = require('../utils/filter');

var _filter2 = _interopRequireDefault(_filter);

var _mysqlOptions = require('./mysql-options');

var _mysqlOptions2 = _interopRequireDefault(_mysqlOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function signerIpcPath(_ref) {
  var option = _ref.option;

  return {
    type: 'input',
    name: 'SIGNER_IPC_PATH',
    message: 'Please enter an ipc socket path for the signer:',
    default: option ? option : '/tmp/signer.sock',
    filter: _filter2.default
  };
}

function dirPath(_ref2) {
  var option = _ref2.option;

  return {
    type: 'input',
    name: 'SIGNER_KEYSTORE_DIR_PATH',
    message: 'Please enter a directory path for the keystore:',
    default: option ? option : '/keystore/',
    filter: _filter2.default
  };
}

function web3Provider(_ref3) {
  var option = _ref3.option;

  return {
    type: 'input',
    name: 'WEB3_PROVIDER',
    message: 'Please enter web3 http provider: ',
    default: option ? option : 'http://127.0.0.1:8545',
    filter: _filter2.default
  };
}

function recover(_ref4) {
  var option = _ref4.option;

  return {
    type: 'confirm',
    name: 'IS_RECOVERY',
    message: 'Recover existing keystore?',
    default: option ? option : false,
    filter: _filter2.default
  };
}