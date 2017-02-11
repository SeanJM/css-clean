const path = require('path');

module.exports = {
  files : 'test/tests/*.js',
  task : function (callback) {
    require(path.resolve('test/'));
    callback();
  }
};