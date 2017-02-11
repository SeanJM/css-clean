function padRight(a, n, c) {
  a = typeof a === 'string'
    ? a
    : a.toString();

  return a.length > n
    ? a
    : a + new Array(n - a.length).join(c);
}

module.exports = padRight;
