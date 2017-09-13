"use strict";

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (envs) {
  return (0, _keys2.default)(envs).map(function (v) {
    return v + "=" + envs[v];
  });
};