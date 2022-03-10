const path = require('path')
const copy = require('./util').copy
copy(path.join(__dirname, '../dist/vue3/index.es.js'), path.join(__dirname, '../dist/index.es.js'))
copy(path.join(__dirname, '../dist/vue3/index.umd.js'), path.join(__dirname, '../dist/index.umd.js'))
copy(path.join(__dirname, '../dist/vue3/style.css'), path.join(__dirname, '../dist/style.css'))
