const fs       = require('fs');
const path     = require('path');
const cleanCss = require('../../index.js');

const filename = {
  clean : path.resolve('test/styles/grid-template-areas.clean.scss'),
  dirty : path.resolve('test/styles/grid-template-areas.dirty.scss')
};

module.exports = {
  name : 'grid-template-area',
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
