const fs = require('fs');
const flatman = require('./flatman');
const readme = require('./readme');
const test = require('./test');
const scripts = require('./scripts');
const css = require('./css');
const images = require('./images');

const config = JSON.parse(fs.readFileSync('grunt.json'));

module.exports = {
  copy : {
    images : images.task.copy
  },

  sass : css.task.sass,

  cssmin : css.task.cssmin,

  concat : scripts.task.concat,

  uglify : scripts.task.uglify,

  autoprefixer : css.task.autoprefixer,

  imagemin : images.task.imagemin,

  svgstore : images.task.svgstore,

  watch : config.isProduction
    ? {}
    : Object.assign({
    // Flatman
    flatman : {
      files : flatman.files,
      tasks : ['flatman']
    },

    readme : {
      files : readme.files,
      tasks : ['readme']
    },

    test : {
      files : test.files,
      tasks : ['test']
    },

    // Config and Environment
    configFiles : {
      files : ['Gruntfile.js'],
      options : {
        reload : true
      },
      tasks: ['default']
    }
  },
    scripts.task.watch,
    css.task.watch,
    images.task.watch
  )
};
