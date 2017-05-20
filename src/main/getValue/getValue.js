const mapValue = require('./modules/mapValue');

const noNewLine = [
  'sass variable assignment',
  'variable assignment'
];

function getValue(settings, cssObject) {
  return mapValue(settings, cssObject)
    .map(function (value, i) {
      let element = cssObject[i];
      return (
        noNewLine.indexOf(element.scope) > -1
        && !element.last
      ) ? value
        : value + '\n';
    })
    .join('\n');
}

module.exports = getValue;
