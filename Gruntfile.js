const fs = require('fs');
const path = require('path');
const initConfig = require('./grunt/initConfig');
const config = JSON.parse(fs.readFileSync(path.resolve('grunt.json')));

module.exports = function (grunt) {
  let tasks = [
    'setup'
  ];

  require('./grunt/getFileTypes')(function (types) {
    initConfig.pkg = grunt.file.readJSON('package.json');
    grunt.initConfig(initConfig);

    tasks.push(
      'readme',
      'flatman'
    );

    if (types.img.length) {
      if (config.isProduction) {
        grunt.loadNpmTasks('grunt-contrib-imagemin');
        tasks.push('imagemin');
      } else {
        tasks.push('copy:images');
      }
    }

    if (types.svg.length) {
      grunt.loadNpmTasks('grunt-svgstore');
      tasks.push('svgstore');
    }

    if (types.sass.length) {
      tasks.push('sass');
      tasks.push('autoprefixer');
      grunt.loadNpmTasks('grunt-autoprefixer');
      grunt.loadNpmTasks('grunt-contrib-sass');
      if (config.isProduction) {
        grunt.loadNpmTasks('grunt-contrib-cssmin');
      }
    }

    if (config.ignore && !config.ignore.includes('javascript')) {
      if (types.js && config.isProduction) {
        grunt.loadNpmTasks('grunt-contrib-uglify');
        tasks.push('uglify');
      } else {
        grunt.loadNpmTasks('grunt-contrib-concat');
        tasks.push('concat');
      }
    }

    tasks.push('test');

    grunt.registerTask('setup', function () {
      require('./grunt/setup')(this.async());
    });

    grunt.registerTask('flatman', function () {
      require('./grunt/flatman').task(this.async());
    });

    grunt.registerTask('readme', function () {
      require('./grunt/readme').task(this.async());
    });

    grunt.registerTask('test', function () {
      require('./grunt/test').task(this.async());
    });

    if (!config.isProduction) {
      grunt.loadNpmTasks('grunt-contrib-copy');
      grunt.loadNpmTasks('grunt-contrib-watch');
      tasks.push('watch');
    }

    grunt.registerTask('default', tasks);
  });
};
