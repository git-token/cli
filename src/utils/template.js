import Promise from 'bluebird'
import mapEnvs from './mapEnvs'

const volumes = [
  "signer-volume",
  "ipc-volume",
  "log-volume",
  "parity-volume"
]

const signer = ({ variables }) => {
  return {
    "environment": [
      ...mapEnvs(variables),
      "SIGNER_IPC_PATH=/tmp/signer.sock",
      "SIGNER_KEYSTORE_DIR_PATH=/keystore/"
    ],
    "build": {
      "context": "./node_modules/gittoken-signer/."
    },
    "ipc": "host",
    "volumes": [
      "signer-volume:/keystore/",
      "ipc-volume:/tmp/"
    ]
  }
}

const webhook = ({ variables }) => {
  return {
    "ports": [
      `3000:3000`
    ],
    "environment": [
      ...mapEnvs(variables),
      "WEBHOOK_LOGGER_PATH=/db/",
      "SIGNER_IPC_PATH=/tmp/signer.sock"
    ],
    "build": {
      "context": "./node_modules/gittoken-webhook-manager/."
    },
    "ipc": "signer",
    "volumes": [
      "log-volume:/db",
      "ipc-volume:/tmp/"
    ]
  }
}

const registry = ({ variables }) => {
  return {
    "ports": [
      `3001:3001`
    ],
    "environment": mapEnvs(variables),
    "build": {
      "context": "./node_modules/gittoken-registry/."
    },
    "ipc": "signer",
    "volumes": [
      "ipc-volume:/tmp/"
    ]
  }
}

const mysql = ({ variables }) => {
  return {
    "ports": [
      `3306:3306`
    ],
    "environment": mapEnvs(variables),
    "image": "mysql"
  }
}

const parity = ({}) => {
  return {
    "ports": [
      "8080:8080",
      "8180:8180",
      "8545:8545",
      "30303:30303"
    ],
    "image": "parity/parity:v1.6.8",
    "volumes": [
      "parity-volume:/mnt/parity"
    ],
    "command": "--reseal-min-period 0 --gasprice 0 --rpccorsdomain='*' --geth --config /mnt/parity/config.toml"
  }
}

const services = {
  signer,
  webhook,
  registry,
  mysql,
  parity
}

function mapVariablesToServices({ variables }) {
  return new Promise((resolve, reject) => {
    let template = {
      version: "3.0",
      volumes: volumes,
      services: {}
    }

    Promise.resolve(Object.keys(variables)).map((service) => {
      template['services'] = {
        ...template['services'],
        [service]: services[service]({
          variables: variables[service]
        })
      }
    }).then(() => {
      resolve(template)
    }).catch((error) => {
      reject(error)
    })
  })
}

export default function ({ variables }) {
  return new Promise((resolve, reject) => {
    mapVariablesToServices({ variables }).then((template) => {
      resolve(template)
    }).catch((error) => {
      reject(error)
    })
  })
}
