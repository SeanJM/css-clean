function isSpecialComment(element) {
  /*!
    Theme Name: casino
    Version: 1.0
    Author: HannesDev
   */
  return /(\s+|)!/.test(element.value[0]);
}

function isSectionTitle(element) {
  /*------------------------------------*\
    #SECTION-TITLE
  \*------------------------------------*/
  return (
    /^[\-]+(\s+|)\*\\$/.test(element.value[0])
    && /^(\s+|)\\\*(\s+|)[\-]+$/.test(element.value.slice(-1)[0])
  );
}

function isEmptyLine(wordList) {
  return (
    wordList
    && wordList.length === 1
    && wordList[0].length === 0
  );
}

function splitByLineBreak(settings, element) {
  let lines = [];
  let lineIndex = 0;
  let tabLength = settings.tabSize + element.depth + 2;

  let raw = element.value
    .map(a => a
      .replace(/^(\s+|)\*/g, '')
      .replace(/^(\s+)([^\s])/, '$2')
      .replace(/([^\s])(\s+)$/, '$1')
    )
    .reduce(function (a, b) {
      var o = [a];

      if (Array.isArray(a)) {
        o = a;
      } else if (!a.length) {
        o = [];
      }

      if ('- ' === b.substr(0, 2)) {
        o.push('');
      }

      o.push(b);
      return o;
    });

  // Single line
  if (typeof raw === 'string') {
    raw = [raw];
  }

  raw = raw
    .join(' ')
    .trim()
    .split(' ');

  raw.forEach(function (word, i) {
    let nextWord = raw[i + 1];

    if (!lines[lineIndex]) {
      lines[lineIndex] = [];
    } else if (
      tabLength + lines[lineIndex].join(' ').length + word.length
      > settings.lineBreak
    ) {
      lineIndex++;
      lines[lineIndex] = [];
    } else if (!word.length && !isEmptyLine(lines[lineIndex])) {
      // is a list
      if (nextWord !== '-') {
        lineIndex++;
        lines[lineIndex] = [];
      }
      lineIndex++;
      lines[lineIndex] = [];
    }
    lines[lineIndex].push(word);
  });

  element.value = lines.map(a => a.join(' ').replace(/\s+/g, ' '));
}

function formatSectionTitle(settings, element) {
  const tab = settings.getTab(element.depth);
  let value = element.value.map(function (line, i) {
    let $tab = '';

    if (i > 0) {
      $tab = tab + settings.getTab(1);
    }

    line = line.trim();

    return i < element.value.length - 1
      ? $tab + line + '\n'
      : tab + line;
  });
  return '/*' + value.join('') + '*/';
}

function formatSpecialComment(settings, element) {
  const tab = settings.getTab(element.depth);

  if (element.value.length === 1) {
    return '/*' + element.value.join('\n') + ' */';
  }

  return '/*' + element.value.map(function (line, i) {
    let $tab = '';
    if (i > 0) {
      $tab = tab + settings.getTab(1);
    }
    return $tab + line.trim();
  }).join('\n') + '\n' + tab + ' */';
}

function formatDefault(settings, element) {
  const tab = new Array(settings.tabSize * element.depth).join(settings.tabChar);

  splitByLineBreak(settings, element);

  return element.value.length > 1
    ? '/**\n' +

    element.value.map(function (line) {
      let $tab = new Array(settings.tabSize * element.depth).join(settings.tabChar);
      line = ' * ' + line.trim();
      return $tab + line;
    }).join('\n') +

    '\n' + tab + ' */'
  : '/* ' + element.value.join('') + ' */';
}

function commentBlock(settings, element) {
  /*
  Titling support
  http://cssguidelin.es/#titling
  */

  if (isSectionTitle(element)) {
    return formatSectionTitle(settings, element);
  } else if (isSpecialComment(element)) {
    return formatSpecialComment(settings, element);
  }

  return formatDefault(settings, element);
}

module.exports = commentBlock;
