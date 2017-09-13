'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref) {
  var variables = _ref.variables;

  return new _bluebird2.default(function (resolve, reject) {

    // TODO Map variables to docker compose template
    console.log('variables', variables);

    (0, _template2.default)({ variables: variables }).then(function (tmp) {
      return _json2yaml2.default.stringify(tmp);
    }).then(function (file) {
      return fs.writeFileAsync(__dirname + '/../../docker/docker-compose.yml', file);
    }).then(function () {
      resolve(true);
    }).catch(function (error) {
      reject(error);
    });
  });
};

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _json2yaml = require('json2yaml');

var _json2yaml2 = _interopRequireDefault(_json2yaml);

var _template = require('./template');

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = (0, _bluebird.promisifyAll)(require('fs'));