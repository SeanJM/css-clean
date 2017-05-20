const fs = require('fs');
const path = require('path');
const cleanCss = require('../../index.js');

module.exports = {
  name : 'Section title',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/styles/section-title.dirty.scss'), 'utf8');

    const clean = cleanCss({
      css : str
    });

    return clean;
  },
  isEqual : function () {
    return fs.readFileSync(path.resolve('test/styles/section-title.clean.scss'), 'utf8');
  }
};