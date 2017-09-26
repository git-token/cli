const GitTokenTerminal = require('gittoken-terminal').default

const terminal = new GitTokenTerminal({
  title: 'GitToken Terminal',
  socketUri: 'wss://socket.gittoken.io'
})
