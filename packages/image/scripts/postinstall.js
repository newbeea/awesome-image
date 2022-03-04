
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const vue = require('vue')
const pkg = require('../package.json')

const version = vue.version
const isVue2 = +version.split('.')[0] === 2

if (isVue2) {
  pkg.main = './dist/vue2/index.umd.js'
  pkg.module = './dist/vue2/index.umd.js'
}
else {
  pkg.main = './dist/vue3/index.umd.js'
  pkg.module = './dist/vue3/index.es.js'
}

fs.writeFileSync(
  path.resolve(__dirname, '../package.json'),
  JSON.stringify(pkg, null, 2),
  {
    encoding: 'utf-8',
  },
)
