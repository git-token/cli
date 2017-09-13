module.exports = (envs) => {
  return Object.keys(envs).map((v) => {
    return `${v}=${envs[v]}`
  })
}
