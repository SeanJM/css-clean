const between = require('../../tools/between');

function nested(buffer, depth) {
  const capture = require('../capture'); // will only work when called at run time

  let start = 0;
  let b = '';
  let args;
  let s = buffer.string;

  while ((s[start] !== '{' || s.substring(start - 1, start + 1) === '#{') && s[start]) {
    start++;
  }


  args = s.substring(0, start).trim();
  b = between('{', '}', s.substr(start));
  buffer.string = s.substr(start + b.end + 1);

  return {
    content : capture({
      buffer : {
        string : b.value.trim()
      }
    }, [], depth),
    arguments : args,
  };
}

module.exports = nested;
