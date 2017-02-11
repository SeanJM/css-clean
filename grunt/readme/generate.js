const path = require('path');
const fs = require('fs');
const m = require('match-file-utility');

const pkg = JSON.parse(fs.readFileSync('package.json'));

const linkLicense = require('./linkLicense');
const smartCase = require(path.resolve('grunt/lib/smartCase'));
const printTests = require('./printTests');
const config = JSON.parse(fs.readFileSync('grunt.json'));

const source = path.join(config.src, 'readme');

function formatContent(filename) {
  const str = fs.readFileSync(filename, 'utf8');
  return {
    title : str.match(/^#([^\n]+)\n/)[1],
    content : str.split('\n').slice(1).join('\n')
  };
}

function generate(testResults, callback) {
  let content = [];
  let text = [];
  var hasTests = testResults && testResults.tests.length > 0;
  var total = testResults && testResults.tests.length;
  var passed = testResults && testResults.tests.filter(a => a.passed);
  var failed = testResults && testResults.tests.filter(a => !a.passed);

  content = m(source, /\.md$/)
    .map(function (a) {
      return formatContent(a);
    });


  text.push('# ' + smartCase(pkg.name) + ' ' + pkg.version);
  text.push('#### License: ' + linkLicense(pkg.license || 'MIT'));
  text.push('');

  if (hasTests) {
    if (passed.length === total) {
      text.push('#### ✅ [All ' + total + ' tests pass](#tests)');
    } else {
      text.push('#### 🚫 [' + passed.length + ' of ' + total + ' tests passed (' + Math.round((passed.length / total) * 100) + '%)](#tests)');
    }
  } else {
    text.push('#### 🐛 No unit tests');
  }

  content.forEach(function (a) {
    text.push('## ' + a.title);
    text.push('');
    text.push(a.content);
  });

  text.push('');

  if (hasTests) {
    printTests(text, testResults);
  }

  fs.writeFileSync('README.md', text.join('\n'));
  callback();
}

module.exports = generate;
