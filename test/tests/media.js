const fs       = require('fs');
const path     = require('path');
const cleanCss = require('../../index.js');

const filename = {
  clean : path.resolve('test/styles/media.clean.scss'),
  dirty : path.resolve('test/styles/media.dirty.scss')
};

module.exports = {
  name : '@media',
  this : function () {
    const str = fs.readFileSync(filename.dirty, 'utf8');

    const clean = cleanCss({
      css : str
    });

    return clean;
  },
  isEqual : function () {
    return fs.readFileSync(filename.clean, 'utf8');
  }
};
