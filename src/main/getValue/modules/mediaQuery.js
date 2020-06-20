function flattenFeature(opt, condition) {
  let padding = new Array(opt.padding + 1 - condition.property.length).join(' ');
  let left    = `(${condition.property}${padding} : ${condition.value})`;
  // and (min-device-width : 300px)
  return condition.operator
    ? `${condition.operator} ` + left
    : left;
}

function flattenMedia(opt, condition) {
  return `${condition.value}`;
}

function joinLines(element, opt) {
  let tab = new Array(((element.depth + 1) * opt.tabSize) + 1).join(opt.tabChar);
  return opt.rule
    .map(function (condition, i) {
      return condition.type === "media"
        ? tab + flattenMedia(opt, condition)
        : tab + flattenFeature(opt, condition);
    })
    .join('\n');
}

function mediaQuery(that, element, siblings) {
  const nested = require('./nested');

  let value;
  let nest   = nested(that, element, siblings);
  let tab    = new Array((element.depth * that.tabSize) + 1).join(that.tabChar);

  let padding = element.value
    .map(value => (value.map(b => b.property ? b.property.length : b.mediaType ? b.mediaType.property.length : 0).sort((a, b) => b - a)[0]))
    .sort((a, b) => b - a)[0];

  value = element.value.map(function (rule, i) {
    let value = joinLines(element, {
      rule    : rule,
      padding : padding,
      tabSize : that.tabSize,
      tabChar : that.tabChar
    });

    return value;
  }).join(',\n');

  return `${element.name} \n${value} {\n${nest}${tab}}`;
}

module.exports = mediaQuery;
