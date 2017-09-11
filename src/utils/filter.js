const Promise = require('bluebird')

module.exports = (input) => {
  return new Promise((resolve, reject) => {
    resolve(input)
  })
}
