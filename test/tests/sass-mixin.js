const fs = require('fs');
const path = require('path');
const cleanCss = require('../../index.js');

module.exports = {
  name : 'SASS @mixin',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/styles/sass-mixin.dirty.scss'), 'utf8');

    const clean = cleanCss({
      css : str
    });

    return clean;
  },
  isEqual : function () {
    return fs.readFileSync(path.resolve('test/styles/sass-mixin.clean.scss'), 'utf8');
  }
};