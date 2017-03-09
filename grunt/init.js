const path = require('path');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync(path.resolve('grunt.json')));
const exec = require('child_process').exec;

module.exports = function (grunt) {
  if (!config) {
    console.log('Grunt: Building default configuration');
    fs.writeFileSync('grunt.json', JSON.stringify({
      src : "src/",
      dest : "dist/",
      tasks : {
        js : false,
        css : false,
        readme : true,
        images : false
      },
      isBundle: false,
      sourceMap: false,
      isProduction: false
    }, null, '  '));
  }
};