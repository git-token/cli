'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Promise = require('bluebird');
var jsonfile = Promise.promisifyAll(require('jsonfile'));

var file = __dirname + '/../../cache/data.json';

function writeData(_ref) {
  var oldData = _ref.oldData,
      newData = _ref.newData;

  return new Promise(function (resolve, reject) {
    var data = (0, _assign2.default)(oldData, newData);
    jsonfile.writeFileAsync(file, data).then(function () {
      resolve(true);
    }).catch(function (error) {
      reject(error);
    });
  });
}

function cacheData(_ref2) {
  var data = _ref2.data;

  return new Promise(function (resolve, reject) {
    jsonfile.readFileAsync(file).then(function (oldData) {
      resolve(writeData({ oldData: oldData, newData: data }));
    }).catch(function (error) {
      if (error.code == 'ENOENT') {
        resolve(writeData({ oldData: {}, newData: data }));
      } else {
        reject(error);
      }
    });
  });
}

module.exports = function (_ref3) {
  var data = _ref3.data;

  return new Promise(function (resolve, reject) {
    cacheData({ data: data }).then(function (cached) {
      resolve(cached);
    }).catch(function (error) {
      reject(error);
    });
  });
};