const path = require('path');
const fs = require('fs');
const m = require('match-file-utility');
const config = JSON.parse(fs.readFileSync('grunt.json'));

config.externals = config.externals || [];

let src = {
  vendor : config.externals.concat(m(path.join(config.src, 'shared'), /\.js$/)),
  common : m(path.join(config.src, 'common'), /\.js$/),
  constants : m(path.join(config.src, 'constants'), /\.js$/),
  predicates : m(path.join(config.src, 'predicates'), /\.js$/),
  custom : m(path.join(config.src, 'custom'), /\.js$/),
  components : m(path.join(config.src, 'components'), /\.js$/),
  containers : m(path.join(config.src, 'containers'), /\.js$/),
  collections : m(path.join(config.src, 'collections'), /\.js$/),
  main : m(path.join(config.src, 'main'), /\.js$/),
  init : m(path.join(config.src, 'init'), /\.js$/),
  export : m(path.join(config.src, 'export'), /\.js$/)
};

let dest = {};

if (config.bundle) {
  dest = {
    bundle : path.join(config.dest, config.bundle)
  };
} else {
  for (var k in src) {
    if (src[k].length) {
      dest[k] = path.join(config.dest, k + '.js');
    }
  }
}

module.exports = {
  src : src,
  dest : dest,

  list : [].concat(
    src.vendor,
    src.common,
    src.constants,
    src.predicates,
    src.custom,
    src.components,
    src.containers,
    src.collections,
    src.main,
    src.init,
    src.export
  )
};
