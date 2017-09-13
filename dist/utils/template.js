'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _objectDestructuringEmpty2 = require('babel-runtime/helpers/objectDestructuringEmpty');

var _objectDestructuringEmpty3 = _interopRequireDefault(_objectDestructuringEmpty2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

exports.default = function (_ref7) {
  var variables = _ref7.variables;

  return new _bluebird2.default(function (resolve, reject) {
    mapVariablesToServices({ variables: variables }).then(function (template) {
      resolve(template);
    }).catch(function (error) {
      reject(error);
    });
  });
};

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _mapEnvs = require('./mapEnvs');

var _mapEnvs2 = _interopRequireDefault(_mapEnvs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var volumes = ["signer-volume", "ipc-volume", "log-volume", "parity-volume"];

var signer = function signer(_ref) {
  var variables = _ref.variables;

  return {
    "environment": [].concat((0, _toConsumableArray3.default)((0, _mapEnvs2.default)(variables)), ["SIGNER_IPC_PATH=/tmp/signer.sock", "SIGNER_KEYSTORE_DIR_PATH=/keystore/"]),
    "build": {
      "context": "./node_modules/gittoken-signer/."
    },
    "ipc": "host",
    "volumes": ["signer-volume:/keystore/", "ipc-volume:/tmp/"]
  };
};

var webhook = function webhook(_ref2) {
  var variables = _ref2.variables;

  return {
    "ports": ['3000:3000'],
    "environment": [].concat((0, _toConsumableArray3.default)((0, _mapEnvs2.default)(variables)), ["WEBHOOK_LOGGER_PATH=/db/", "SIGNER_IPC_PATH=/tmp/signer.sock"]),
    "build": {
      "context": "./node_modules/gittoken-webhook-manager/."
    },
    "ipc": "signer",
    "volumes": ["log-volume:/db", "ipc-volume:/tmp/"]
  };
};

var registry = function registry(_ref3) {
  var variables = _ref3.variables;

  return {
    "ports": ['3001:3001'],
    "environment": (0, _mapEnvs2.default)(variables),
    "build": {
      "context": "./node_modules/gittoken-registry/."
    },
    "ipc": "signer",
    "volumes": ["ipc-volume:/tmp/"]
  };
};

var mysql = function mysql(_ref4) {
  var variables = _ref4.variables;

  return {
    "ports": ['3306:3306'],
    "environment": (0, _mapEnvs2.default)(variables),
    "image": "mysql"
  };
};

var parity = function parity(_ref5) {
  (0, _objectDestructuringEmpty3.default)(_ref5);

  return {
    "ports": ["8080:8080", "8180:8180", "8545:8545", "30303:30303"],
    "image": "parity/parity:v1.6.8",
    "volumes": ["parity-volume:/mnt/parity"],
    "command": "--reseal-min-period 0 --gasprice 0 --rpccorsdomain='*' --geth --config /mnt/parity/config.toml"
  };
};

var services = {
  signer: signer,
  webhook: webhook,
  registry: registry,
  mysql: mysql,
  parity: parity
};

function mapVariablesToServices(_ref6) {
  var variables = _ref6.variables;

  return new _bluebird2.default(function (resolve, reject) {
    var template = {
      version: "3.0",
      volumes: volumes,
      services: {}
    };

    _bluebird2.default.resolve((0, _keys2.default)(variables)).map(function (service) {
      template['services'] = (0, _extends4.default)({}, template['services'], (0, _defineProperty3.default)({}, service, services[service]({
        variables: variables[service]
      })));
    }).then(function () {
      resolve(template);
    }).catch(function (error) {
      reject(error);
    });
  });
}