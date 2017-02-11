module.exports = function commentBlock(buffer) {
  let i = 0;
  let s = buffer.string;

  while (s.substring(i - 2, i) !== '*/' && s[i]) {
    i += 1;
  }

  buffer.string = s.substring(i);

  return {
    value : s.substring(2, i - 2).trim().split('\n'),
  };
};