function selector(that, element, siblings) {
  const nested = require('./nested');

  let tab = new Array((element.depth * that.tabSize) + 1).join(that.tabChar);
  let v = nested(that, element, siblings);

  let selector = [];

  let content = v.length
    ? ' {\n' + v + tab + '}'
    : ' {}';

  for (var i = 0, n = element.selector.length; i < n; i++) {
    if (element.selector[i].length) {
      selector.push(
        i > 0
          ? tab + element.selector[i]
          : element.selector[i]
      );
    }
  }

  selector = selector.join(',\n');

  return element.depth > 0
    ? siblings[0] === element
      ? selector + content
      : '\n' + tab + selector + content
    : selector + content;
}

module.exports = selector;
