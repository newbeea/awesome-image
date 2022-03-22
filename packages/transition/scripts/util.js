const fs = require('fs')
function copy(src, dest) {
  const content = fs.readFileSync(src, 'utf-8')
  try {
    fs.unlinkSync(dest)
  }
  catch (error) { }
  fs.writeFileSync(dest, content, 'utf-8')
}
exports.copy = copy
