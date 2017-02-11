const fs = require('fs');
const path = require('path');
const cleanCss = require('../../index.js');

module.exports = {
  name : 'SASS Selector Eval (basic)',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/styles/sass-selector-eval.dirty.scss'), 'utf8');

    const clean = cleanCss({
      css : str
    });

    return clean;
  },
  isEqual : function () {
    return fs.readFileSync(path.resolve('test/styles/sass-selector-eval.clean.scss'), 'utf8');
  }
};