const path = require('path');
const m = require('match-file-utility');

module.exports = {
  files : m('src/flatman/', /\.js$/),
  task : function (callback) {
    const pathToFlatman = path.resolve('src/flatman/index.js');
    try {
      require(pathToFlatman)();
    } catch (e) {
    }
    callback();
  }
};
