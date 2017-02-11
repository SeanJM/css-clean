const flatman = require('./grunt/flatman');
const tasks = require('./grunt/tasks');
const initConfig = require('./grunt/initConfig');
const readme = require('./grunt/readme');
const clean = require('./grunt/clean');

require('./grunt/setup');

module.exports = function(grunt) {
  // Project configuration.
  initConfig.pkg = grunt.file.readJSON('package.json');
  grunt.initConfig(initConfig);

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('flatman', function () {
    flatman.task(this.async());
  });

  grunt.registerTask('readme', function () {
    readme.task(this.async());
  });

  grunt.registerTask('clean', function () {
    clean.task(this.async());
  });

  grunt.registerTask('default', tasks);
};
