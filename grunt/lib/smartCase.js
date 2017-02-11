function smartCase(string) {
  if (!/_/.test(string)) {
    string = string.trim().replace(/-|_/g, ' ').split(' ');
    let s = string.map(function (a) {
      return /^[A-Z]/.test(a) ? a : a[0].toUpperCase() + a.substr(1).toLowerCase();
    }).join(' ');

    return s[0].toUpperCase() + s.slice(1);
  } else {
    return string.substr(1);
  }
}

module.exports = smartCase;
