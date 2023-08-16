#!/usr/bin/env node
const { Command, InvalidArgumentError } = require('commander');
const zxcvbn = require('zxcvbn');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const process = require('process');
const readline = require('readline');
const bip39Org = require('./index');
const { version, bin } = require('../package.json');
const program = new Command();

/**
 * Returns boolean value for the cli prompt confirmation value
 */
const promptConfirmation = async (msg) => {
  const query = `${msg} [Y/n]`;
  const prompt = readline.createInterface({ input: process.stdin, output: process.stdout });
  const confirmation = await new Promise((resolve) => prompt.question(query, resolve));

  return ['True', 'true', 'Yes', 'yes', 'Y', 'y', 'T', 't'].includes(confirmation);
};

/**
 * Parse integer value from commander.js
 * @see {@link https://github.com/tj/commander.js/blob/master/examples/options-custom-processing.js
 */
const myParseInt = (value) => {
  // parseInt takes a string and a radix
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    const errMsg = `\n\nInvalid option: ${parsedValue} is not a number.`;
    throw new InvalidArgumentError(errMsg);
  }
  return parsedValue;
};

const checkString = (value, dummyPrevious, param, stringLength = 0) => {
  if (!value || typeof value !== 'string' || value.length <= stringLength) {
    const errMsg = (value.length <= stringLength && param)
      ? `\n\nInvalid ${param} length: ${value} does not have a required ${stringLength} ${param.toLowerCase()} length`
      : param
        ? `\n\nInvalid ${param} : ${value} is not a valid ${param.toLowerCase()} value`
        : `\n\nInvalid argument: ${value} is not a valid string`;
    throw new InvalidArgumentError(errMsg);
  }
  return value;
};

const checkArray = (value, dummyPrevious, arrayValue) => {
  if (!arrayValue.includes(value)) {
    const errMsg = `\n\nInvalid option: ${value} is not one of the supported options ${arrayValue.join(', ')}`;
    throw new InvalidArgumentError(errMsg);
  }
  return value;
};

const checkFile = (file, dummyPrevious, checkRoot = false) => {
  if (!file || typeof file !== 'string' || file.length === 0) {
    const errMsg = `\n\nInvalid argument: ${file} is not a valid string`;
    throw new InvalidArgumentError(errMsg);
  }
  // Absolute file path
  const filePath = path.join(process.cwd(), file);
  // File directory
  const fileRoot = path.dirname(filePath);
  // If checkRoot (Used for writing to filePath), use the file directory to check against
  const check = checkRoot ? fileRoot : filePath;
  if (!fs.existsSync(check)) {
    const errMsg = checkRoot
      ? `\n\nInvalid file directory: Could not find the directory ${fileRoot} to write ${file}`
      : `\n\nInvalid file: Could not find the given file ${file} from ${filePath}`;
    throw new InvalidArgumentError(errMsg);
  }
  return file;
};

const readFile = (file) => {
  const fileString = fs.readFileSync(path.join(process.cwd(), file), { encoding: 'utf8' });

  // Format line break and remove an empty line
  return fileString.split(/\r?\n|\r|\n/g).filter(f => f).join('/n');
};

const writeFile = (file, string) => fs.writeFileSync(path.join(process.cwd(), file), string);

const hexParser = (typedHex) => typedHex.data.slice(2);

const showEntropyOutput = ({
  password,
  passphrase,
  entropy,
  finalEntropy,
  mnemonic,
  bip39Seed,
  entropy2,
  finalEntropy2,
  mnemonic2,
  bip39Seed2,
}) => {
  /**
   * Output password score to console
   */
  let passwordScore = '';

  if (password) {
    const passScoreCalc = zxcvbn(password);
    if (passScoreCalc?.crack_times_display?.offline_fast_hashing_1e10_per_second) {
      passwordScore += `Password Score (${passScoreCalc.score}): ${chalk.white.underline(passScoreCalc?.crack_times_display?.offline_fast_hashing_1e10_per_second)}`;
    }
  }

  if (passphrase) {
    const seedScoreCalc = zxcvbn(passphrase);
    if (seedScoreCalc?.crack_times_display?.offline_fast_hashing_1e10_per_second) {
      if (passwordScore.length !== 0) {
        passwordScore += ', ';
      }
      passwordScore += `BIP39 Passphrase Score (${seedScoreCalc.score}): ${chalk.white.underline(seedScoreCalc?.crack_times_display?.offline_fast_hashing_1e10_per_second)}`;
    }
  }
  if (passwordScore.length !== 0) {
    passwordScore += '\n';
    console.log(passwordScore);
  }

  /**
   * Output generated entropy and mnemonic to console
   */
  console.log(`Entropy: ${entropy}\n`);
  if (finalEntropy && entropy !== finalEntropy) {
    console.log(`Final Entropy: ${finalEntropy}\n`);
  }
  console.log(`Mnemonic (${mnemonic.split(' ').length} words): ${chalk.white.underline(mnemonic)}\n`);
  console.log(`BIP39 Seed: ${bip39Seed}\n`);

  if (entropy2) {
    console.log(`Entropy 2: ${entropy2}\n`);
    if (finalEntropy2 && entropy2 !== finalEntropy2) {
      console.log(`Final Entropy 2: ${finalEntropy2}\n`);
    }
    console.log(`Mnemonic 2 (${mnemonic2.split(' ').length} words): ${chalk.white.underline(mnemonic2)}\n`);
    console.log(`BIP39 Seed 2: ${bip39Seed2}\n`);
  }
};

const createEncryptedBackup = async (backupTitle, backupObject, backupPassword, backupFile) => {
  if (backupFile && fs.existsSync(path.join(process.cwd(), backupFile))) {
    const conf = await promptConfirmation('Override existing backup?');

    if (!conf) {
      backupFile = null;
    }
  }

  // Backup without encryption
  if (!backupPassword) {
    const backupString = JSON.stringify(backupObject, null, 2);

    if (!backupFile) {
      console.log('Output:\n');
      console.log(backupString);
      return;
    }

    writeFile(backupFile, backupString);
    return;
  }

  const encString = await bip39Org.crypto.encryptString(
    JSON.stringify(backupObject),
    backupPassword
  );

  const backupString = JSON.stringify({
    title: backupTitle,
    encrypted: encString
  }, null, 2);

  if (!backupFile) {
    console.log('Encrypted Output:\n');
    console.log(backupString);
    return;
  }

  writeFile(backupFile, backupString);
};

const loadBackup = async (backupFile, backupPassword) => {
  const rawString = JSON.parse(fs.readFileSync(
    path.join(process.cwd(), backupFile),
    { encoding: 'utf8' }
  ));

  const encString = backupPassword ? JSON.parse(await bip39Org.crypto.decryptString(
    rawString.encrypted,
    backupPassword
  )) : rawString;

  console.log(`Loaded Backup (${rawString.title}):\n`);
  console.log(JSON.stringify(encString, null, 2));
};

program
  .name(Object.keys(bin)[0])
  .description('Create Mnemonic Codes With Email and Password Combination')
  .version(version);

program
  .command('id')
  .description('Generate a deterministic entropy with the combination of id and password and get BIP39 Mnemonic and Seed')
  .argument('<id>', 'ID or Email Address', (arg1, arg2) => checkString(arg1, arg2, 'ID', 5))
  .argument('<password>', 'Password String', (arg1, arg2) => checkString(arg1, arg2, 'Password', 8))
  .argument('[additional]', 'Additional Parameters used for generating entropy divided by commas', checkString)
  .option(
    '-l, --length <LENGTH>',
    'Length of BIP39 mnemonic words desired',
    myParseInt
  )
  .option(
    '-n, --nonce <NONCE>',
    'Nonce to differ entropy using the same params',
    myParseInt
  )
  .option(
    '-p, --passphrase <PASSPHRASE>',
    'Optional BIP39 Passphrase to differentiate BIP39 Seed',
    (arg1, arg2) => checkString(arg1, arg2, 'Passphrase', 8)
  )
  .option(
    '-b, --backup <BACKUP>',
    'Create a backup of params and entropy with PBKDF2 encryption',
    checkString,
    'backup.json'
  )
  .action(async (id, password, additional, options) => {
    if (additional) {
      // Replace the comma with blank to single comma and split
      additional = additional.replace(', ', ',').split(',').filter(a => a);
    }

    const passphrase = options.passphrase;

    const {
      entropy,
      finalEntropy,
      mnemonic,
      entropy2,
      finalEntropy2,
      mnemonic2
    } = await bip39Org.generateMnemonicWithId(
      id,
      password,
      additional,
      options.length,
      options.nonce
    ).then(r => ({
      entropy: hexParser(r.entropy),
      finalEntropy: hexParser(r.finalEntropy),
      mnemonic: r.mnemonic,
      entropy2: hexParser(r.entropy2),
      finalEntropy2: hexParser(r.finalEntropy2),
      mnemonic2: r.mnemonic2
    }));

    const [
      bip39Seed,
      bip39Seed2
    ] = await Promise.all([
      bip39Org.bip39.mnemonicToBIP39Seed(mnemonic, passphrase),
      bip39Org.bip39.mnemonicToBIP39Seed(mnemonic2, passphrase)
    ]).then(r => r.map(re => hexParser(re)));

    console.log('\nGenerated BIP39 Mnemonics and Seeds:\n');

    /**
     * Output input params to console
     */
    let inputParams = `ID: ${id}, Password: ${password}`;
    if (additional) {
      inputParams += `, Additional: "${additional.join(', ')}"`;
    }
    if (passphrase) {
      inputParams += `, BIP39 Passphrase: ${passphrase}`;
    }
    inputParams += '\n';
    console.log(inputParams);

    showEntropyOutput({
      password,
      passphrase,
      entropy,
      finalEntropy,
      mnemonic,
      bip39Seed,
      entropy2,
      finalEntropy2,
      mnemonic2,
      bip39Seed2,
    });

    await createEncryptedBackup(
      'mnemonic-id-cli',
      {
        id,
        password,
        additional,
        length: options.length,
        nonce: options.nonce,
        passphrase,
        entropy,
        finalEntropy,
        mnemonic,
        bip39Seed,
        entropy2,
        finalEntropy2,
        mnemonic2,
        bip39Seed2
      },
      password,
      options.backup
    );

    process.exit();
  });

program
  .command('generate')
  .description('Generate a random entropy and get BIP39 Mnemonic and Seed')
  .argument('[length]', 'Length of Mnemonic words to generate', myParseInt, 24)
  .argument('[password]', 'Password String to encrypt Backup File', (arg1, arg2) => checkString(arg1, arg2, 'Password', 8))
  .option(
    '-p, --passphrase <PASSPHRASE>',
    'Optional BIP39 Passphrase to differentiate BIP39 Seed',
    (arg1, arg2) => checkString(arg1, arg2, 'Passphrase', 8)
  )
  .option(
    '-b, --backup <BACKUP>',
    'Create a backup of params and entropy with PBKDF2 encryption',
    checkString,
    'backup.json'
  )
  .action(async (length, password, options) => {
    const passphrase = options.passphrase;

    const {
      entropy,
      mnemonic
    } = await bip39Org.bip39.generateMnemonic(length)
      .then(r => ({
        entropy: hexParser(r.entropy),
        mnemonic: r.mnemonic,
      }));

    const bip39Seed = await bip39Org.bip39.mnemonicToBIP39Seed(mnemonic, passphrase)
      .then(r => hexParser(r));

    console.log('\nGenerated BIP39 Mnemonics and Seeds:\n');

    /**
     * Output input params to console
     */
    let inputParams = '';
    if (password) {
      inputParams += `Password: ${password}`;
    }
    if (passphrase) {
      if (inputParams.length !== 0) {
        inputParams += ', ';
      }
      inputParams += `BIP39 Passphrase: ${passphrase}`;
    }
    if (inputParams.length !== 0) {
      inputParams += '\n';
      console.log(inputParams);
    }

    showEntropyOutput({
      password,
      passphrase,
      entropy,
      mnemonic,
      bip39Seed,
    });

    await createEncryptedBackup(
      'mnemonic-generate-cli',
      {
        password,
        passphrase,
        entropy,
        mnemonic,
        bip39Seed,
      },
      password,
      options.backup
    );

    process.exit();
  });

program
  .command('mnemonic')
  .description('Convert BIP39 Mnemonic to Hex Entropy and BIP39 Seed')
  .argument('<mnemonic>', 'BIP39 Mnemonic words to convert', checkString)
  .option(
    '-p, --passphrase <PASSPHRASE>',
    'Optional BIP39 Passphrase to differentiate BIP39 Seed',
    (arg1, arg2) => checkString(arg1, arg2, 'Passphrase', 8)
  )
  .action(async (mnemonic, options) => {
    const passphrase = options.passphrase;

    const entropy = await bip39Org.bip39.mnemonicToEntropy(mnemonic)
      .then(r => hexParser(r));

    const bip39Seed = await bip39Org.bip39.mnemonicToBIP39Seed(mnemonic, passphrase)
      .then(r => hexParser(r));

    console.log('\nGenerated Entropy and Seeds:\n');

    /**
     * Output input params to console
     */
    let inputParams = '';
    if (passphrase) {
      inputParams += `BIP39 Passphrase: ${passphrase}`;
    }
    if (inputParams.length !== 0) {
      inputParams += '\n';
      console.log(inputParams);
    }

    showEntropyOutput({
      passphrase,
      entropy,
      mnemonic,
      bip39Seed,
    });

    process.exit();
  });

program
  .command('entropy')
  .description('Convert Entropy to BIP39 Mnemonic and BIP39 Seed')
  .argument('<entropy>', 'Entropy to convert', checkString)
  .argument('[length]', 'Length of Mnemonic words to get', myParseInt)
  .option(
    '-p, --passphrase <PASSPHRASE>',
    'Optional BIP39 Passphrase to differentiate BIP39 Seed',
    (arg1, arg2) => checkString(arg1, arg2, 'Passphrase', 8)
  )
  .action(async (entropy, length, options) => {
    const passphrase = options.passphrase;

    const {
      finalEntropy,
      mnemonic
    } = await bip39Org.bip39.entropyToMnemonic(entropy, length)
      .then(r => ({
        finalEntropy: hexParser(r.finalEntropy),
        mnemonic: r.mnemonic
      }));

    const bip39Seed = await bip39Org.bip39.mnemonicToBIP39Seed(mnemonic, passphrase)
      .then(r => hexParser(r));

    console.log('\nGenerated BIP39 Mnemonics and Seeds:\n');

    /**
     * Output input params to console
     */
    let inputParams = '';
    if (passphrase) {
      inputParams += `BIP39 Passphrase: ${passphrase}`;
    }
    if (inputParams.length !== 0) {
      inputParams += '\n';
      console.log(inputParams);
    }

    showEntropyOutput({
      passphrase,
      entropy,
      finalEntropy,
      mnemonic,
      bip39Seed,
    });

    process.exit();
  });

program
  .command('encrypt')
  .description(
    'Encrypt the given string with a password using PBKDF2 and AES-256-CBC, SHA-512\n\n'
    + '( Compatible with the following OpenSSL command: '
    + 'openssl enc -e -aes-256-cbc -pbkdf2 -a -md <SHA> -iter <ITERATIONS> -in <FILE> -pass file:<PASSWORD> -out <OUTPUT> )\n\n'
  )
  .argument('[input]', 'Text to encrypt', checkString)
  .argument('[password]', 'Password to use for encryption', checkString)
  .option(
    '-f, --file <FILE>',
    'Encrypt the given file',
    checkFile
  )
  .option(
    '-p, --password <PASSWORD>',
    'Password file to use for encryption',
    checkFile
  )
  .option(
    '-o, --output <OUTPUT>',
    'Save the encrypted string to the given output',
    (arg1, arg2) => checkFile(arg1, arg2, true)
  )
  .option(
    '-a, --algorithm <SHA>',
    'One of the supported digest algorithms from WebCrypto',
    (arg1, arg2) => checkArray(arg1, arg2, ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']),
    'SHA-512'
  )
  .option(
    '-i, --iterations <ITERATIONS>',
    'Iteration for the given PBKDF2 operation (Default to 10000 for OpenSSL default)',
    myParseInt,
    10000
  )
  .action(async (input, password, options) => {
    const encInput = options.file ? readFile(options.file) : input;
    const encPass = options.password ? readFile(options.password) : password;
    checkString(encInput, undefined, 'Input');
    checkString(encPass, undefined, 'Password');

    const encString = await bip39Org.crypto.encryptString(
      encInput,
      encPass,
      undefined,
      options.algorithm,
      options.iterations
    );

    if (!options.output) {
      console.log('Encrypted Output:\n');
      console.log(encString);
      return;
    }

    writeFile(options.output, encString);
    console.log(`Wrote encrypted string to output: ${options.output}`);
    process.exit();
  });

program
  .command('decrypt')
  .description(
    'Decrypt given Base64 encoded string with password using PBKDF2 and AES-256-CBC, SHA-512\n\n'
    + '( Compatible with the following OpenSSL command: '
    + 'openssl enc -d -aes-256-cbc -pbkdf2 -a -md <SHA> -iter <ITERATIONS> -in <FILE> -pass file:<PASSWORD> -out <OUTPUT> )\n\n'
  )
  .argument('[input]', 'Text to decrypt', checkString)
  .argument('[password]', 'Password to use for decryption', checkString)
  .option(
    '-f, --file <FILE>',
    'Decrypt the given file',
    checkFile
  )
  .option(
    '-p, --password <PASSWORD>',
    'Password file to use for decryption',
    checkFile
  )
  .option(
    '-o, --output <OUTPUT>',
    'Save decrypted string to the given output',
    (arg1, arg2) => checkFile(arg1, arg2, true)
  )
  .option(
    '-a, --algorithm <SHA>',
    'One of the supported digest algorithms from WebCrypto',
    (arg1, arg2) => checkArray(arg1, arg2, ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']),
    'SHA-512'
  )
  .option(
    '-i, --iterations <ITERATIONS>',
    'Iteration for the given PBKDF2 operation (Default to 10000 for OpenSSL default)',
    myParseInt,
    10000
  )
  .action(async (input, password, options) => {
    const encInput = options.file ? readFile(options.file) : input;
    const encPass = options.password ? readFile(options.password) : password;
    checkString(encInput, undefined, 'Input');
    checkString(encPass, undefined, 'Password');

    const encString = await bip39Org.crypto.decryptString(
      encInput,
      encPass,
      options.algorithm,
      options.iterations
    );

    if (!options.output) {
      console.log('Decrypted Output:\n');
      console.log(encString);
      return;
    }

    writeFile(options.output, encString);
    console.log(`Wrote decrypted string to output: ${options.output}`);
    process.exit();
  });

program
  .command('sha')
  .description('Generate the SHA hash of the given text to a hex string')
  .argument('<string>', 'Text to generate a hash from', checkString)
  .option(
    '-c, --count <COUNT>',
    'Repeat the SHA operation if the count is more than 1',
    myParseInt,
    1
  )
  .option(
    '-algo, --algorithm <SHA>',-
    'One of the supported digest algorithms from WebCrypto',
    (arg1, arg2) => checkArray(arg1, arg2, ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']),
    'SHA-512'
  )
  .action(async (string, options) => {
    const encrypted = await bip39Org.crypto.repeatSha(string, options.count, true, options.algorithm);

    console.log(hexParser(encrypted));
    process.exit();
  });

program
  .command('backup')
  .description('Load Encrypted Backup from the backup file')
  .argument('[password]', 'Password string of the backup file', checkString)
  .argument('[backup]', 'Encrypted Backup File', checkFile, 'backup.json')
  .action(async (password, backup) => {
    await loadBackup(backup, password);
    process.exit();
  });

program.parse();
