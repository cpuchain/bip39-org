const bip39Org = require('./js/bip39-org');
const wordlist = require('./js/wordlist');

module.exports = {
  wordlist,
  ...bip39Org
};
