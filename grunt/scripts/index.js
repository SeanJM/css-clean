const fs = require('fs');
const m = require('match-file-utility');
const config = JSON.parse(fs.readFileSync('grunt.json'));
const files = require('./files');

let task = {
  concat : {},
  watch : {}
};

task.uglify = {
  options : {
    mangle : true,
    wrap : config.useClosure
      ? true
      : false
  },
  files : {
    src : files.list,
    dest : files.dest.bundle
  }
};

if (config.isBundle) {
  task.concat.scripts = {
    options : {
      sourceMap : config.sourceMap,
    },
    src : files.list,
    dest : files.dest.bundle
  };

  task.watch.scripts = {
    files : files.list,
    tasks : [ 'concat:scripts', 'test' ]
  };

  if (config.useClosure) {
    task.concat.scripts.options.banner = '(function () {\n';
    task.concat.scripts.options.footer = '\n}());';
  }

} else {
  for (var k in files.src) {
    if (files.src[k].length) {
      task.concat[k] = {
        options : {
          sourceMap : config.sourceMap,
        },
        src : files.src[k],
        dest : files.dest[k]
      };

      task.watch[k] = {
        files : files.src[k],
        tasks : [ 'concat:' + k ]
      };

      if (config.useClosure) {
        task.concat[k].options.banner = '(function () {\n';
        task.concat[k].options.footer = '\n}());';
      }
    }
  }
}

module.exports = {
  list : files.list,
  dest : files.dest,
  task : task
};
