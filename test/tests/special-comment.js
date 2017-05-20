const fs = require('fs');
const path = require('path');
const cleanCss = require('../../index.js');

module.exports = {
  name : 'Special comment',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/styles/special-comment.dirty.scss'), 'utf8');

    const clean = cleanCss({
      css : str
    });

    return clean;
  },
  isEqual : function () {
    return fs.readFileSync(path.resolve('test/styles/special-comment.clean.scss'), 'utf8');
  }
};