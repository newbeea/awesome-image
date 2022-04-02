const fs = require('fs')
function copy(src, dest) {
  try {
    fs.unlinkSync(dest)
  }
  catch (error) { }
  try {
    const content = fs.readFileSync(src, 'utf-8')
    fs.writeFileSync(dest, content, 'utf-8')
  }
  catch (error) { }
}
exports.copy = copy
