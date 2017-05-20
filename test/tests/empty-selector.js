const fs = require('fs');
const path = require('path');
const cleanCss = require('../../index.js');

module.exports = {
  name : 'Empty selector',
  this : function () {
    const str = fs.readFileSync(path.resolve('test/styles/empty-selector.dirty.scss'), 'utf8');

    const clean = cleanCss({
      css : str
    });

    console.log(clean);

    return clean;
  },
  isEqual : function () {
    return fs.readFileSync(path.resolve('test/styles/empty-selector.clean.scss'), 'utf8');
  }
};