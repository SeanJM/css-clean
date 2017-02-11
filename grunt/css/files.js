const fs = require('fs');
const path = require('path');
const m = require('match-file-utility');
const config = JSON.parse(fs.readFileSync('grunt.json'));

const order = [
  'constants.scss',
  'functions.scss',
  'mixins.scss',
  'placeholders.scss',
  'resets.scss',
  'base.scss',
  'typeography.scss'
];

let task = {};
let list = [];

function byType(a, b) {
  let abase = path.basename(a);
  let bbase = path.basename(b);

  if (order.includes(abase) && order.includes(bbase)) {
    return order.indexOf(abase) - order.indexOf(bbase);
  }

  if (order.includes(abase)) {
    return -1;
  }

  if (order.includes(bbase)) {
    return 1;
  }

  return 0;
}

let src = {
  vendor : list.concat(m(path.join(config.src, 'styles', 'vendor'), /\.scss$/).sort(byType)),
  fonts : list.concat(m(path.join(config.src, 'fonts'), /\.scss$/).sort(byType)),
  constants : list.concat(m(path.join(config.src, 'styles', 'constants'), /\.scss$/).sort(byType)),
  functions : list.concat(m(path.join(config.src, 'styles', 'functions'), /\.scss$/).sort(byType)),
  mixins : list.concat(m(path.join(config.src, 'styles', 'mixins'), /\.scss$/).sort(byType)),
  animation : list.concat(m(path.join(config.src, 'styles', 'animation'), /\.scss$/).sort(byType)),
  placeholders : list.concat(m(path.join(config.src, 'styles', 'placeholders'), /\.scss$/).sort(byType)),
  components : list.concat(m(path.join(config.src, 'styles', 'components'), /\.scss$/).sort(byType)),
  containers : list.concat(m(path.join(config.src, 'styles', 'containers'), /\.scss$/).sort(byType)),
  collections : list.concat(m(path.join(config.src, 'styles', 'collections'), /\.scss$/).sort(byType)),
  custom : list.concat(m(path.join(config.src, 'styles', 'custom'), /\.scss$/).sort(byType)),
  main : list.concat(m(path.join(config.src, 'styles', 'main'), /\.scss$/).sort(byType)),
};

let dest = {};

if (config.bundle) {
  dest = path.join(config.dest, config.bundle + '.css');
} else {
  dest = path.join(config.dest, 'bundle.css');
}

module.exports = {
  src : src,
  dest : dest,
  import : path.join(config.src, 'import.scss'),
  list : [].concat(
    src.vendor,
    src.fonts,
    src.constants,
    src.functions,
    src.mixins,
    src.animation,
    src.placeholders,
    src.components,
    src.containers,
    src.collections,
    src.custom,
    src.main
  )
};
