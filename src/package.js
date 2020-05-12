const pkg = require('../package.json')

// Only specific keys are needed, not the whole file.

module.exports = {
  bugs: {
    url: pkg.bugs.url
  },
  name: pkg.name,
  version: pkg.version
}
