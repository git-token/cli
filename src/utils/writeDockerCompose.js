import Promise, { promisifyAll } from 'bluebird'
import yaml from 'json2yaml'
import template from './template'

const fs = promisifyAll(require('fs'))

export default function ({ variables }) {
  return new Promise((resolve, reject) => {

    // TODO Map variables to docker compose template
    console.log('variables', variables)

    template({ variables }).then((tmp) => {
        return yaml.stringify(tmp)
    }).then((file) => {
      return fs.writeFileAsync(`${__dirname}/../../docker/docker-compose.yml`, file)
    }).then(() => {
      resolve(true)
    }).catch((error) => {
      reject(error)
    })
  })
}
