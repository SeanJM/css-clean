const fs = require('fs');
const path = require('path');
const cleanCss = require('../../index.js');

module.exports = {
  name : 'Background',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/styles/background.dirty.scss'), 'utf8');

    const clean = cleanCss({
      css : str
    });

    return clean;
  },
  isEqual : function () {
    return fs.readFileSync(path.resolve('test/styles/background.clean.scss'), 'utf8');
  }
};