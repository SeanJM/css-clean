const isPromise = require('./isPromise');

function maybePromise(promise_or_value, resolver) {
  var t = new Date().getTime();

  return new Promise(

    function (resolve, reject) {
      if (isPromise(promise_or_value)) {
        promise_or_value
          .then(function (value) {
  		      resolve(value);
          })
          .catch(function (value) {
            reject(value);
          });
      } else {
  	    resolve(promise_or_value);
      }
    }

  );
}

module.exports = maybePromise;
