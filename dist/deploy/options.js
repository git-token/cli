'use strict';

var _servicesOptions = require('./services-options');

var _servicesOptions2 = _interopRequireDefault(_servicesOptions);

var _signerOptions = require('./signer-options');

var _signerOptions2 = _interopRequireDefault(_signerOptions);

var _webhookOptions = require('./webhook-options');

var _webhookOptions2 = _interopRequireDefault(_webhookOptions);

var _mysqlOptions = require('./mysql-options');

var _mysqlOptions2 = _interopRequireDefault(_mysqlOptions);

var _parityOptions = require('./parity-options');

var _parityOptions2 = _interopRequireDefault(_parityOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  services: _servicesOptions2.default,
  signer: _signerOptions2.default,
  webhook: _webhookOptions2.default,
  mysql: _mysqlOptions2.default,
  parity: _parityOptions2.default
};