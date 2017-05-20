const fs = require('fs');
const path = require('path');
const cleanCss = require('../../index.js');

module.exports = {
  name : 'CSS variables',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/styles/css-vars.dirty.scss'), 'utf8');

    const clean = cleanCss({
      css : str
    });

    return clean;
  },
  isEqual : function () {
    return fs.readFileSync(path.resolve('test/styles/css-vars.clean.scss'), 'utf8');
  }
};