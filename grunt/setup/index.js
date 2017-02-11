const exec = require('child_process').exec;
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('grunt.json'));

const deps = {
  css : [
    "grunt-autoprefixer",
    "grunt-concat-sourcemap",
    "grunt-contrib-cssmin",
    "grunt-contrib-sass",
  ],
  util : [
    "colors",
    "grunt-contrib-watch",
    "grunt-contrib-copy",
  ],
  img : [
    "grunt-contrib-imagemin",
    "imagemin-gifsicle",
    "imagemin-optipng",
    "imagemin-pngquant",
  ],
  svg : [
    "grunt-svgstore",
  ],
  js : [
    "grunt-contrib-uglify",
    "grunt-contrib-concat",
  ]
};

module.exports = function (callback) {
  require('../getFileTypes')(function (types) {
    let wait = [];

    new Promise(function (resolve) {
      try {
        fs.lstatSync(config.src);
        resolve();
      } catch (e) {
        wait.push(new Promise(function (resolve) {
          exec('npm i -S ' + deps.util.join(' '), resolve);
        }));

        if (types.sass.length) {
          wait.push(new Promise(function (resolve) {
            exec('npm i -S ' + deps.css.join(' '), resolve);
          }));
        }

        if (types.js.length) {
          wait.push(new Promise(function (resolve) {
            exec('npm i -S ' + deps.js.join(' '), resolve);
          }));
        }

        if (types.img.length) {
          wait.push(new Promise(function (resolve) {
            exec('npm i -S ' + deps.img.join(' '), resolve);
          }));
        }

        if (types.svg.length) {
          wait.push(new Promise(function (resolve) {
            exec('npm i -S ' + deps.svg.join(' '), resolve);
          }));
        }

        fs.mkdirSync(config.src);
      }

      return Promise.all(wait);
    })
      .then(callback);
  });
};

