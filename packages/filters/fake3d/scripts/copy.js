const path = require('path')
const fs = require('fs')
function copy(src, dest) {
  const content = fs.readFileSync(src, 'utf-8')
  // unlink for pnpm, #92
  try {
    fs.unlinkSync(dest)
  }
  catch (error) { }
  fs.writeFileSync(dest, content, 'utf-8')
}

copy(path.join(__dirname, '../dist/vue2/style.css'), path.join(__dirname, '../dist/style.css'))
