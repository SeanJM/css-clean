function isPromise(obj) {
  return (
    typeof obj !== 'undefined'
    && typeof obj.then === 'function'
    && typeof obj.catch === 'function'
  );
}

module.exports = isPromise;
