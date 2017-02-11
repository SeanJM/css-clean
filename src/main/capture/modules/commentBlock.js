module.exports = function commentBlock(buffer) {
  let capture = true;
  let i = 0;
  let s = buffer.string.substring(0, i);

  for (; capture && buffer.string[i]; i++) {
    s += buffer.string[i];
    if (s.substring(i, i + 2) === '*/') {
      buffer.string = buffer.string.substring(i);
      return {
        value : s.split('\n'),
      };
    }
  }
};