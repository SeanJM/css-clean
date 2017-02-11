const fs = require('fs');

function exists(file) {
  try {
    fs.statSync(file);
    return true;
  } catch (e) {
    return false;
  }
}

module.exports = exists;
