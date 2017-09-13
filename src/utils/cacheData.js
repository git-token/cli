const Promise = require('bluebird')
const jsonfile = Promise.promisifyAll(require('jsonfile'))

const file = `${__dirname}/../../cache/data.json`

function writeData({ oldData, newData }) {
  return new Promise((resolve, reject) => {
    let data = Object.assign(oldData, newData)
    jsonfile.writeFileAsync(file, data).then(() => {
      resolve(true)
    }).catch((error) => {
      reject(error)
    })
  })
}

function cacheData({ data }) {
  return new Promise((resolve, reject) => {
    jsonfile.readFileAsync(file).then((oldData) => {
      resolve(writeData({ oldData, newData: data }))
    }).catch((error) => {
      if (error.code == 'ENOENT') {
        resolve(writeData({ oldData: {}, newData: data }))
      } else {
        reject(error)
      }
    })
  })
}


module.exports = ({ data }) => {
  return new Promise((resolve, reject) => {
    cacheData({ data }).then((cached) => {
      resolve(cached)
    }).catch((error) => {
      reject(error)
    })
  })
}
