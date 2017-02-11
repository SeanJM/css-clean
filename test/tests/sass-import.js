const fs = require('fs');
const path = require('path');
const cleanCss = require('../../index.js');

module.exports = {
  name : 'SASS Import (basic)',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/styles/sass-import.dirty.scss'), 'utf8');

    const clean = cleanCss({
      css : str
    });

    return clean;
  },
  isEqual : function () {
    return fs.readFileSync(path.resolve('test/styles/sass-import.clean.scss'), 'utf8');
  }
};