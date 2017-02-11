function linkLicense(lic) {
  let dict = {
    MIT : '[MIT](https://opensource.org/licenses/MIT)'
  };

  if (dict[lic]) {
    return dict[lic];
  }
  return lic;
}

module.exports = linkLicense;
