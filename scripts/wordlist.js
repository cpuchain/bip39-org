#!/usr/bin/env node
/**
 * Update BIP39 wordlist from bip git repository
 */
const fs = require('fs');
const path = require('path');
const process = require('process');

const BIP_ROOT = path.join(process.cwd(), './bips/bip-0039');
const WORDLIST_ROOT = path.join(process.cwd(), './src/js/wordlist/');

if (!fs.existsSync(BIP_ROOT)) {
  throw new Error('Could not found the BIP directory, make sure that you have cloned the git submodules as well');
}

const writeWordsFile = (lang) => {
  const wordFile = fs.readFileSync(path.join(BIP_ROOT, `${lang}.txt`), { encoding: 'utf8' });
  const words = wordFile.split(/\r?\n|\r|\n/g).filter(r => r);

  const context = `const wordlist_${lang} = ${JSON.stringify(words)};\n\n`
    + '// Export for node modules and testing purposes\n'
    + 'if (typeof module !== \'undefined\' && module.exports) {\n'
    + `  module.exports = wordlist_${lang};\n`
    + '}';

  fs.writeFileSync(path.join(WORDLIST_ROOT, `${lang}.js`), context);
};

const writeIndexFile = (languages) => {
  const requireIndex = languages.map(l => `const wordlist_${l} = require('./${l}');\n`).join('');
  const exportsIndex = languages.map(l => `  ${l}: wordlist_${l},\n`).join('');

  const context = requireIndex
    + '\n'
    + 'module.exports = {\n'
    + exportsIndex
    + '};';

  fs.writeFileSync(path.join(WORDLIST_ROOT, 'index.js'), context);
};

const syncWords = () => {
  console.log('Syncing BIP39 wordlist from BIP repository\n');

  const languages = fs.readdirSync(BIP_ROOT)
    .filter(f => f.includes('.txt'))
    .map(f => f.split('.')[0]);

  console.log(`Languages to sync:\n${JSON.stringify(languages, null, 2)}\n`);

  languages.forEach(lang => writeWordsFile(lang));
  writeIndexFile(languages);

  console.log('Sync complete');
};

syncWords();
