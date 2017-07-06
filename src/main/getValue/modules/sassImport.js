function sassImport(that, element, parent) {
  var value;
  var space = '';

  var tab = (
    new Array((element.depth + 1) * that.tabSize)
      .join(that.tabChar)
  );

  var singleTab = new Array(that.tabSize).join(that.tabChar);

  var alignSpace = element.align && element.depth > 0
    ? new Array(element.align - element.name.length + 1).join(' ')
    : '';

  space = `${tab}`;

  element.value = (
    element.value.length > 1
    ? element.value.map(a => (
      `${space + singleTab}"${a}"`
    ))
    : element.value.map(a => (
      `"${a}"`
    ))
  );

  value = element.value.join(',\n');

  if (element.value.length > 1) {
    value = '\n' + value;
    return `${element.name}${value};`;
  }

  return `${element.name} ${value};`;
}

module.exports = sassImport;
