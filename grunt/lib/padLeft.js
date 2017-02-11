function padLeft(a, n, c) {
  a = typeof a === 'string'
    ? a
    : a.toString();

  return a.length > n
    ? a
    : new Array(n - a.length).join(c) + a;
}

module.exports = padLeft;
