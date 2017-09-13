'use strict';

var _registerOptions = require('./register-options');

var _registerOptions2 = _interopRequireDefault(_registerOptions);

var _tokenOptions = require('./token-options');

var _tokenOptions2 = _interopRequireDefault(_tokenOptions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  register: _registerOptions2.default,
  token: _tokenOptions2.default
};