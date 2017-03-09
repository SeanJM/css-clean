const fs = require('fs');
const path = require('path');
const cleanCss = require('../../index.js');

module.exports = {
  name : 'bug report',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/styles/bug-report.dirty.scss'), 'utf8');

    const clean = cleanCss({
      css : str
    });

    return clean;
  },
  isEqual : function () {
    return fs.readFileSync(path.resolve('test/styles/bug-report.clean.scss'), 'utf8');
  }
};