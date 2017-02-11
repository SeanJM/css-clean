const path = require('path');
const fs = require('fs');
const m = require('match-file-utility');
const config = JSON.parse(fs.readFileSync('grunt.json'));

const files = require('./files');

let task = {
  autoprefixer : {
    options : {
      browsers : ['last 4 version'],
      map : false,
    },
    files : {
      src : files.dest,
      dest : files.dest
    }
  },
  cssmin : { files : {} },
  concat : {},
  watch : {},
  sass : {
    dist : { files : {} },
    options : { sourcemap : false }
  }
};

if (files.list.length) {
  fs.writeFile(files.import,
    files.list.map(
      function (fullpath) {
        let relative = fullpath.split(path.sep).slice(config.src.split(path.sep).length - 1);
        return `@import "${relative.join(path.sep)}";`;
      }
    )
    .join('\n')
  );
}

task.sass.dist.files[files.dest] = files.import;
task.cssmin.files[files.dest] = files.dest;

if (!config.isProduction) {
  task.sass.options.trace = true;
  task.sass.options.style = 'expanded';

  if (config.sourceMap) {
    task.sass.options.sourcemap = 'inline';
    task.autoprefixer.options.map = true;
  }

  task.watch.css = {
    files : [
      path.join(config.src, 'application/styles/**/*.scss'),
      path.join(config.src, 'application', 'components', '**', '*.scss'),
      path.join(config.src, 'application', 'containers', '**', '*.scss'),
      path.join(config.src, 'application', 'collections', '**', '*.scss')
    ],
    tasks : ['sass', 'autoprefixer']
  };
}

module.exports = {
  files : files,
  task : task
};
