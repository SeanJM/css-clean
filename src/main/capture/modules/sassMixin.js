const nested = require('./nested');
const between = require('../../tools/between');

function sassMixin(buffer, depth) {
  let c = nested(buffer, depth);
  let args = between('(', ')', c.arguments);
  let m = c.arguments.match(/(@mixin)[ ]+([^\(]+)/);

  buffer.string = buffer.string.substr(c.length);

  return {
    arguments : args.value
      ? args.value.split(',').map(a => a.trim())
      : false,
    content : c.content,
    name : m[1],
    value : m[2].trim()
  };
}

module.exports = sassMixin;
