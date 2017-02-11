const path = require('path');
const m = require('match-file-utility');
const tinyTest = require('tiny-test');

const tests = m('test/tests/', /\.js$/).map(a => require(path.resolve(a)));

module.exports = tinyTest(function (test, load) {
  tests.forEach(function (props) {
    var t = test(props.name);

    if (props.isEqual) {
      t.this(props.this);
      t.isEqual(props.isEqual);
    } else if (props.isDeepEqual) {
      t.this(props.this);
      t.isDeepEqual(props.isDeepEqual);
    } else if (props.isFailure) {
      t.isFailure(props.isFailure);
    }
  });

  load();
});
