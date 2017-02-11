module.exports = function between(a, b, string) {
  let o = 0;
  let i = 0;
  let n = string.length;
  let start;

  while (string[i] !== a && string[i]) {
    i++;
  }

  start = i;

  for (; i < n; i++) {
    if (string[i] === a) {
      o += 1;
    } else if (string[i] === b) {
      o -= 1;
    }

    if (o === 0) {
      return {
        start : start,
        end : i,
        length : i - start,
        value : string.substring(start + 1, i)
      };
    }
  }

  return false;
};