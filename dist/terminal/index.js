'use strict';

var _gittokenTerminal = require('gittoken-terminal');

var _gittokenTerminal2 = _interopRequireDefault(_gittokenTerminal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var terminal = new _gittokenTerminal2.default({
  title: 'GitToken Terminal',
  socketUri: 'wss://socket.gittoken.io'
});