const fs = require('fs');
const config = JSON.parse(fs.readFileSync('grunt.json'));

module.exports = function (callback) {
  const exec = require('child_process').exec;
  function getTypes() {
    const m = require('match-file-utility');

    callback({
      sass : m(config.src, /\.scss$/),
      js : m(config.src, /\.js$/),
      img : m(config.src, /\.(jp(e|)g|png)$/),
      svg : m(config.src, /\.(svg)$/)
    });
  }
  try {
    getTypes();
  } catch (e) {
    exec('npm i -S match-file-utility', getTypes);
  }
};
