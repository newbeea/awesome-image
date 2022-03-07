const path = require('path')
const copy = require('./util').copy
copy(path.join(__dirname, '../dist/vue2/style.css'), path.join(__dirname, '../dist/style.css'))
