'use strict';

var GitTokenTerminal = require('gittoken-terminal').default;

var terminal = new GitTokenTerminal({
  title: 'GitToken Terminal',
  socketUri: 'wss://socket.gittoken.io'
});