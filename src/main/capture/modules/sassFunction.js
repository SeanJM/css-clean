const nested = require('./nested');
const between = require('../../tools/between');

function sassFunction(buffer, depth) {
  let c = nested(buffer, depth);
  let args = between('(', ')', c.arguments);
  let m = c.arguments.match(/(@function)\s+([^)]+?)\(/);

  buffer.string = buffer.string.substr(c.length);

  return {
    content : c.content,
    name : m[1],
    value : m[2].trim(),
    arguments : args.value
      ? args.value.split(',').map(a => a.trim())
      : ''
  };
}

module.exports = sassFunction;
