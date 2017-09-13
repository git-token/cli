'use strict';

var Promise = require('bluebird');

module.exports = function (input) {
  return new Promise(function (resolve, reject) {
    resolve(input);
  });
};