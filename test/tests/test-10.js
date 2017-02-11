const fs = require('fs');
const path = require('path');
const cleanCss = require('../../index.js');

module.exports = {
  name : 'test 10',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/styles/test-10.dirty.scss'), 'utf8');

    const clean = cleanCss({
      css : str
    });

    return clean;
  },
  isEqual : function () {
    return fs.readFileSync(path.resolve('test/styles/test-10.clean.scss'), 'utf8');
  }
};