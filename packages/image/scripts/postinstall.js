
/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')
const vue = require('vue')
const pkg = require('../package.json')
const copy = require('./util.js').copy
const version = vue.version
const isVue2 = +version.split('.')[0] === 2

if (isVue2) {
  copy(path.join(__dirname, '../dist/vue2/index.umd.js'), path.join(__dirname, '../dist/index.umd.js'))
  copy(path.join(__dirname, '../dist/vue2/index.es.js'), path.join(__dirname, '../dist/index.es.js'))
  copy(path.join(__dirname, '../dist/vue2/index.js'), path.join(__dirname, '../dist/index.js'))
}
else {
  copy(path.join(__dirname, '../dist/vue3/index.umd.js'), path.join(__dirname, '../dist/index.umd.js'))
  copy(path.join(__dirname, '../dist/vue3/index.es.js'), path.join(__dirname, '../dist/index.es.js'))
  copy(path.join(__dirname, '../dist/vue2/index.js'), path.join(__dirname, '../dist/index.js'))
}
