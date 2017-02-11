const fs = require('fs');
const path = require('path');
const cleanCss = require('../../index.js');

module.exports = {
  name : 'basic test',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/styles/basic.dirty.scss'), 'utf8');

    const clean = cleanCss({
      css : str
    });

    return clean;
  },
  isEqual : function () {
    return fs.readFileSync(path.resolve('test/styles/basic.clean.scss'), 'utf8');
  }
};