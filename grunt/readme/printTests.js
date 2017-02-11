const path = require('path');
const padLeft = require(path.resolve('grunt/lib/padLeft'));
const padRight = require(path.resolve('grunt/lib/padRight'));

module.exports = function (text, testResults) {
  var passed = testResults && testResults.tests.filter(a => a.passed);
  var failed = testResults && testResults.tests.filter(a => !a.passed);

  text.push('***', '', '## Tests');

  text.push('', '```');

  passed.forEach(function (a) {
    text.push(
      padLeft(a.index, 5, ' ') + '. ' + padRight(a.name, 68, '.') + ' ✅'
    );
  });

  failed.forEach(function (a) {
    text.push(
      '\n' + padLeft(a.index, 5, ' ') + '. ' + padRight(a.name + ' ', 68, '.') + ' 🚫'
    );
  });

  text.push('```', '');
};
