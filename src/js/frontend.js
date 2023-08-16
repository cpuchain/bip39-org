/*global kjua, bootstrap, bip39Org*/
/**
 * @file frontend.js
 * @authors:
 *   Bip39 Org <info@bip39.org>
 * @date 2023
 * @license MIT LICENSE
 * Each function may contain the original source referred by
 * and may have a different open-source license from different authors.
 *
 * Frontend Javascript code to handle DOM Objects
 */

const defaultState = {
  backup: false,
  darkmode: false
};

let state = {
  backup: false,
  darkmode: false
};

/**
 * Copy text value from the DOM input element
 * Use it with `onclick="copy(this)"`
 * @see {@link https://www.w3schools.com/howto/howto_js_copy_clipboard.asp}
 */
// eslint-disable-next-line no-unused-vars
const copy = (thisObject) => {
  // Find the first input element from the input-group
  const inputElement = Array.from(thisObject.parentNode.children).filter(p => (p.nodeName === 'INPUT' || p.nodeName === 'TEXTAREA'))[0];

  // Select the text field
  inputElement.focus();
  inputElement.select();
  inputElement.setSelectionRange(0, 99999); // For mobile devices

  // Copy value of the input element
  navigator.clipboard.writeText(inputElement.value);

  const name = inputElement.name + ' ' ?? '';

  alert(`Copied ${name}value to clipboard`);
};

/**
 * Paste text from the clipboard
 * Use it with `onclick="paste(this)"`
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/readText}
 */
// eslint-disable-next-line no-unused-vars
const paste = async (thisObject) => {
  // Find the first input element from the input-group
  const inputElement = Array.from(thisObject.parentNode.children).filter(p => (p.nodeName === 'INPUT' || p.nodeName === 'TEXTAREA'))[0];

  // Grant permission first
  // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Interact_with_the_clipboard#using_the_clipboard_api
  const permission = await navigator.permissions.query({name: 'clipboard-write'});

  if (!['granted', 'prompt'].includes(permission.state)) {
    throw new Error('Clipboard permission not granted');
  }

  const clipboard = await navigator.clipboard.readText();

  inputElement.value = clipboard;
};

/**
 * Switch password type input to text (Or vice versa)
 */
// eslint-disable-next-line no-unused-vars
const show = (thisObject) => {
  // Find the first input element from the input-group
  const inputElement = Array.from(thisObject.parentNode.children).filter(p => (p.nodeName === 'INPUT' || p.nodeName === 'TEXTAREA'))[0];

  inputElement.type = (inputElement.type === 'password') ? 'text': 'password';
};

/**
 * Switch Nav Pages
 */
let currentPage = 'main';
const nav = (page) => {
  if (currentPage) {
    document.getElementById(`nav-${currentPage}`).classList.remove('active');
    document.getElementById(`nav-mobile-${currentPage}`).classList.remove('active');
    document.getElementById(currentPage).classList.add('hide');
  }
  document.getElementById(`nav-${page}`).classList.add('active');
  document.getElementById(`nav-mobile-${page}`).classList.add('active');
  document.getElementById(page).classList.remove('hide');
  currentPage = page;
};

const urlNav = () => {
  const pageParams = window.location.href.split('#')[1];

  if (pageParams) {
    // Parse pageParams from URL excluding the query string
    nav(pageParams.split('?')[0]);
  }
};
urlNav();

/**
 * Dark mode switch for Bootstrap
 * https://stackoverflow.com/questions/63082529/how-to-properly-introduce-a-light-dark-mode-in-bootstrap
 */
const applyDarkmode = () => {
  const currentMode = document.documentElement.getAttribute('data-bs-theme');
  if (state.darkmode && (currentMode === 'auto' || currentMode === 'light')) {
    document.documentElement.setAttribute('data-bs-theme', 'dark');
  } else if (!state.darkmode && currentMode === 'dark') {
    document.documentElement.setAttribute('data-bs-theme', 'light');
  }
};

// eslint-disable-next-line no-unused-vars
const settings = () => new bootstrap.Modal('#settings', {}).toggle();

// eslint-disable-next-line no-unused-vars
const resetSettings = () => {
  state.backup = defaultState.backup;
  state.darkmode = defaultState.darkmode;

  document.getElementById('settings-backup').value = `${defaultState.backup}`;
  document.getElementById('settings-darkmode').value = `${defaultState.darkmode}`;

  applyDarkmode();
};

// eslint-disable-next-line no-unused-vars
const applySettings = () => {
  const isBackup = document.getElementById('settings-backup').value === 'true';
  const isDarkmode = document.getElementById('settings-darkmode').value === 'true';

  state.backup = isBackup;
  state.darkmode = isDarkmode;

  applyDarkmode();
};

/**
 * Clear form input
 */
// eslint-disable-next-line no-unused-vars
const clearInput = (thisObject) => {
  const inputs = document.getElementsByClassName(thisObject.parentNode.id);

  // Hide generated value
  Array.from(document.getElementsByClassName('generated')).forEach(input => {
    input.style.display = 'none';
  });

  // Clear input value
  Array.from(inputs).forEach(input => {
    if (input.id === 'main-nonce') {
      input.value = '0';
      return;
    }
    input.value = '';
  });
};

// eslint-disable-next-line no-unused-vars
const qrcode = (thisObject) => {
  // Find the first input element from the input-group
  const inputElement = Array.from(thisObject.parentNode.children).filter(p => (p.nodeName === 'INPUT' || p.nodeName === 'TEXTAREA'))[0];

  const qrBody = document.getElementById('qrcode-body');

  // Remove any canvas element if it has already
  if (qrBody.children.length !== 0) {
    Array.from(qrBody.children).forEach(c => c.remove());
  }

  const fill = state.darkmode ? '#fff' : undefined;
  const back = state.darkmode ? '#212529' : undefined;

  // Create QR element
  const qrElement = kjua({
    text: inputElement.value,
    render: 'canvas',
    size: 310,
    fill,
    back,
    ecLevel: 'H',
  });

  // Append to the body
  qrBody.append(qrElement);

  // Show the modal
  new bootstrap.Modal('#qrcode', {}).toggle();
};

const showError = (error) => {
  const errMsg = (error instanceof Error && error.message) ? 'Error: ' + error.message : 'Error: ' + error;
  const errorElement = document.getElementById('error');

  errorElement.innerText = errMsg;

  if (errorElement.classList.contains('hide')) {
    errorElement.classList.remove('hide');
  }
};

const clearError = () => {
  const errorElement = document.getElementById('error');
  errorElement.innerText = '';
  if (!errorElement.classList.contains('hide')) {
    errorElement.classList.add('hide');
  }
};

const checkInt = (value, param, isOptional = false) => {
  // parseInt takes a string and a radix
  const parsedValue = parseInt(value);
  if (isNaN(parsedValue)) {
    if (isOptional) {
      return undefined;
    }

    const errMsg = param
      ? `Invalid ${param} : ${value} is not a valid number`
      : `Invalid param: ${value} is not a valid number.`;
    throw new Error(errMsg);
  }
  return parsedValue;
};

const checkString = (value, param, isOptional = false, stringLength = 0) => {
  if (!value || typeof value !== 'string' || value.length <= stringLength) {
    if (isOptional) {
      return undefined;
    }

    const errMsg = (value.length <= stringLength && param)
      ? `Invalid ${param} length: ${value} does not have a required ${stringLength} ${param.toLowerCase()} length`
      : param
        ? `Invalid ${param} : ${value} is not a valid ${param.toLowerCase()} value`
        : `Invalid argument: ${value} is not a valid string`;
    throw new Error(errMsg);
  }
  return value;
};

const hexParser = (typedHex) => typedHex.data.slice(2);

const backupButton = (buttonId, backupString) => {
  const button = document.getElementById(buttonId);
  button.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(backupString));
};

const createEncryptedBackup = async (buttonId, backupTitle, backupObject, backupPassword) => {
  // Backup without encryption
  if (!backupPassword) {
    const backupString = JSON.stringify(
      {
        title: backupTitle,
        ...backupObject
      },
      null,
      2
    );

    backupButton(buttonId, backupString);
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

  backupButton(buttonId, backupString);
};

// eslint-disable-next-line no-unused-vars
const generateMain = async () => {
  try {
    clearError();
    if (!document.getElementById('main-email').value) {
      alert('Email input is required');
      throw new Error('Email input is required');
    }
    if (!document.getElementById('main-password').value) {
      alert('Password input is required');
      throw new Error('Password input is required');
    }
    const id = checkString(document.getElementById('main-email').value, 'ID', false, 5);
    const password = checkString(document.getElementById('main-password').value, 'Password', false, 8);
    let additional = checkString(document.getElementById('main-additional').value, 'Additional', true);
    let nonce = checkInt(document.getElementById('main-nonce').value, 'Nonce', true);
    const length = checkInt(document.getElementById('main-length').value, 'Length', true);
    const passphrase = checkString(document.getElementById('main-passphrase').value, 'Passphrase', true);

    // Format default value to undefined
    if (additional) {
      // Replace comma with blank to single comma and split
      additional = additional.replace(', ', ',').split(',').filter(a => a);
    }
    if (nonce === 0) {
      nonce = undefined;
    }

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
      length,
      nonce
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

    const additionalBackup = additional ? additional.join(',') : undefined;

    // Create backup object
    await createEncryptedBackup(
      'main-backup',
      'mnemonic-email-backup',
      {
        id,
        password,
        additional: additionalBackup,
        nonce,
        length,
        passphrase,
        entropy,
        finalEntropy,
        mnemonic,
        bip39Seed,
        entropy2,
        finalEntropy2,
        mnemonic2,
        bip39Seed2,
      },
      password
    );

    // Create generated input
    document.getElementById('main-entropy1').value = finalEntropy;
    document.getElementById('main-mnemonic1').value = mnemonic;
    document.getElementById('main-seed1').value = bip39Seed;
    document.getElementById('main-entropy2').value = finalEntropy2;
    document.getElementById('main-mnemonic2').value = mnemonic2;
    document.getElementById('main-seed2').value = bip39Seed2;

    // Show generated input
    Array.from(document.getElementsByClassName('generated')).forEach(e => {
      e.style.display = 'block';
    });

    // Save backup file automatically
    if (state.backup) {
      document.getElementById('main-backup').click();
    }
  } catch (e) {
    showError(e);
    throw e;
  }
};

/**
 * Open the file and read it as a string
 * https://stackoverflow.com/questions/16215771/how-to-open-select-file-dialog-via-js
 * https://stackoverflow.com/questions/34495796/javascript-promises-with-filereader
 */
const openFile = (type) => new Promise((resolve, reject) => {
  const input = document.createElement('input');
  input.type = 'file';
  input.onchange = (e) => {
    // getting a hold of the file reference
    const file = e.target.files[0];

    // setting up the reader
    const reader = new FileReader();
    if (type === 'dataURL') {
      reader.readAsDataURL(file);
    } else {
      reader.readAsText(file, 'UTF-8');
    }

    // here we tell the reader what to do when it's done reading...
    reader.onload = (readerEvent) => {
      const content = readerEvent.target.result; // this is the content!
      resolve(content);
    };

    reader.onerror = reject;
  };
  input.click();
});

const askPassword = (throwOnCancel = true) => {
  if (!throwOnCancel) {
    document.getElementById('password-title').innerText = 'Enter your Backup Password (Optional)';
  } else {
    document.getElementById('password-title').innerText = 'Enter your Backup Password';
  }
  document.getElementById('decryption-password').value = '';

  const passwordModal = new bootstrap.Modal('#password', {});
  passwordModal.toggle();

  const form = document.getElementById('password-form');
  const submitElement = document.getElementById('password-submit');
  const cancelElement = document.getElementById('password-cancel');

  return new Promise((resolve, reject) => {
    form.addEventListener('submit', () => {
      passwordModal.hide();
      resolve(document.getElementById('decryption-password').value);
    });
    submitElement.addEventListener('click', () => {
      resolve(document.getElementById('decryption-password').value);
    });
    cancelElement.addEventListener('click', () => {
      if (!throwOnCancel) {
        resolve();
        return;
      }
      reject(new Error('User canceled the password prompt'));
    });
  });
};

const openBackup = async (password) => {
  const rawJson = JSON.parse(await openFile());

  // Deal with unencrypted case
  if (!rawJson.encrypted) {
    return rawJson;
  }

  // Show password prompt if the password is not supplied
  if (!password) {
    try {
      password = await askPassword();
    } catch (e) {
      alert('Password is required to load encrypted backup');
      throw new Error('Password is required to load encrypted backup');
    }
  }

  const decrypted = JSON.parse(await bip39Org.crypto.decryptString(
    rawJson.encrypted,
    password
  ));

  return {
    title: rawJson.title,
    ...decrypted
  };
};

// eslint-disable-next-line no-unused-vars
const importMain = async () => {
  try {
    clearError();
    let password = checkString(document.getElementById('main-password').value, 'Password', true);

    const {
      title,
      id,
      password: passwordRecovered,
      additional,
      nonce,
      length,
      passphrase,
      finalEntropy,
      mnemonic,
      bip39Seed,
      finalEntropy2,
      mnemonic2,
      bip39Seed2,
    } = await openBackup(password);

    if (title !== 'mnemonic-email-backup') {
      const errMsg = `Wrong backup file ${title}, should be a mnemonic-email-backup json`;
      throw new Error(errMsg);
    }

    if (password !== passwordRecovered) {
      password = passwordRecovered;
      document.getElementById('main-password').value = passwordRecovered;
    }

    console.log('Loaded Backup Object:\n\n' + JSON.stringify({
      title,
      id,
      password,
      additional,
      nonce,
      length,
      passphrase,
      finalEntropy,
      mnemonic,
      bip39Seed,
      finalEntropy2,
      mnemonic2,
      bip39Seed2,
    }, null, 2));

    // Create generated input
    document.getElementById('main-email').value = id;

    if (additional) {
      document.getElementById('main-additional').value = additional;
    }
    if (nonce) {
      document.getElementById('main-nonce').value = nonce;
    }
    if (length) {
      document.getElementById('main-length').value = length;
    }
    if (passphrase) {
      document.getElementById('main-passphrase').value = passphrase;
    }

    document.getElementById('main-entropy1').value = finalEntropy;
    document.getElementById('main-mnemonic1').value = mnemonic;
    document.getElementById('main-seed1').value = bip39Seed;
    document.getElementById('main-entropy2').value = finalEntropy2;
    document.getElementById('main-mnemonic2').value = mnemonic2;
    document.getElementById('main-seed2').value = bip39Seed2;

    // Show generated input
    Array.from(document.getElementsByClassName('generated')).forEach(e => {
      e.style.display = 'block';
    });
  } catch (e) {
    showError(e);
    throw e;
  }
};

const saveMnemonic = async (entropy, mnemonic, passphrase, seed, doBackup = true) => {
  // Create backup object
  if (doBackup) {
    const password = await askPassword(false);

    await createEncryptedBackup(
      'mnemonic-backup',
      'mnemonic-backup',
      {
        password,
        entropy,
        mnemonic,
        passphrase,
        seed,
      },
      password
    );
  }

  // Create generated input
  document.getElementById('mnemonic-entropy').value = entropy;
  document.getElementById('mnemonic-mnemonic').value = mnemonic;
  if (passphrase) {
    document.getElementById('mnemonic-passphrase').value = passphrase;
  }
  document.getElementById('mnemonic-seed').value = seed;

  if (doBackup && state.backup) {
    // Save the backup file automatically
    document.getElementById('mnemonic-backup').click();
  }
};

// eslint-disable-next-line no-unused-vars
const random = async () => {
  try {
    clearError();
    let length = checkInt(document.getElementById('mnemonic-length').value, 'Length', true);
    const passphrase = checkString(document.getElementById('mnemonic-passphrase').value, 'Passphrase', true);

    const {
      entropy,
      mnemonic
    } = await bip39Org.bip39.generateMnemonic(length)
      .then(r => ({
        entropy: hexParser(r.entropy),
        mnemonic: r.mnemonic
      }));

    const seed = await bip39Org.bip39.mnemonicToBIP39Seed(mnemonic, passphrase)
      .then(r => hexParser(r));

    await saveMnemonic(
      entropy,
      mnemonic,
      passphrase,
      seed
    );
  } catch (e) {
    showError(e);
    throw e;
  }
};

// eslint-disable-next-line no-unused-vars
const entropy = async () => {
  try {
    clearError();
    const entropy = checkString(document.getElementById('mnemonic-entropy').value, 'Entropy');
    let length = checkInt(document.getElementById('mnemonic-length').value, 'Length', true);
    const passphrase = checkString(document.getElementById('mnemonic-passphrase').value, 'Passphrase', true);

    const formatEntropy = new bip39Org.numberUtils.TypedData(entropy, 'hex');
    const bytesEntropy = bip39Org.numberUtils.toBytes(formatEntropy);
    const entropyToLength = bytesEntropy.length * 8 / 32 * 3;

    // Format default value to undefined
    if (length === entropyToLength) {
      length = undefined;
    }

    const {
      finalEntropy,
      mnemonic
    } = await bip39Org.bip39.entropyToMnemonic(
      formatEntropy,
      length
    ).then(r => ({
      finalEntropy: hexParser(r.finalEntropy),
      mnemonic: r.mnemonic
    }));

    const seed = await bip39Org.bip39.mnemonicToBIP39Seed(mnemonic, passphrase)
      .then(r => hexParser(r));

    await saveMnemonic(
      finalEntropy,
      mnemonic,
      passphrase,
      seed
    );
  } catch (e) {
    showError(e);
    throw e;
  }
};

// eslint-disable-next-line no-unused-vars
const mnemonic = async () => {
  try {
    clearError();
    const mnemonic = checkString(document.getElementById('mnemonic-mnemonic').value, 'Mnemonic');
    const passphrase = checkString(document.getElementById('mnemonic-passphrase').value, 'Passphrase', true);

    const entropy = await bip39Org.bip39.mnemonicToEntropy(mnemonic)
      .then(r => hexParser(r));

    const seed = await bip39Org.bip39.mnemonicToBIP39Seed(mnemonic, passphrase)
      .then(r => hexParser(r));

    await saveMnemonic(
      entropy,
      mnemonic,
      passphrase,
      seed
    );
  } catch (e) {
    showError(e);
    throw e;
  }
};

// eslint-disable-next-line no-unused-vars
const importMnemonic = async () => {
  try {
    clearError();

    const {
      title,
      entropy,
      mnemonic,
      passphrase,
      seed,
    } = await openBackup();

    if (title !== 'mnemonic-backup') {
      const errMsg = `Wrong backup file ${title}, should be a mnemonic-backup json`;
      throw new Error(errMsg);
    }

    console.log('Loaded Backup Object:\n\n' + JSON.stringify({
      title,
      entropy,
      mnemonic,
      passphrase,
      seed,
    }, null, 2));

    await saveMnemonic(
      entropy,
      mnemonic,
      passphrase,
      seed,
      false
    );
  } catch (e) {
    showError(e);
    throw e;
  }
};

// eslint-disable-next-line no-unused-vars
const encrypt = async () => {
  try {
    clearError();
    if (!document.getElementById('encrypt-raw').value) {
      alert('Text input is required');
      throw new Error('Text input is required');
    }
    if (!document.getElementById('encrypt-password').value) {
      alert('Password input is required');
      throw new Error('Password input is required');
    }
    const raw = checkString(document.getElementById('encrypt-raw').value, 'Plain-text');
    const password = checkString(document.getElementById('encrypt-password').value, 'Password');

    const encString = await bip39Org.crypto.encryptString(
      raw,
      password
    );

    backupButton('encrypt-backup', encString);

    document.getElementById('encrypt-enc').value = encString;
  } catch (e) {
    showError(e);
    throw e;
  }
};

// eslint-disable-next-line no-unused-vars
const decrypt = async () => {
  try {
    clearError();
    if (!document.getElementById('encrypt-enc').value) {
      alert('Encrypted value is required');
      throw new Error('Encrypted value is required');
    }
    if (!document.getElementById('encrypt-password').value) {
      alert('Password input is required');
      throw new Error('Password input is required');
    }
    const enc = checkString(document.getElementById('encrypt-enc').value, 'Encrypted');
    const password = checkString(document.getElementById('encrypt-password').value, 'Password');

    const decString = await bip39Org.crypto.decryptString(
      enc,
      password
    );

    document.getElementById('encrypt-raw').value = decString;
  } catch (e) {
    showError(e);
    throw e;
  }
};

// eslint-disable-next-line no-unused-vars
const importEncrypted = async () => {
  try {
    clearError();
    let password = checkString(document.getElementById('encrypt-password').value, 'Password', true);

    const importedText = await openFile();
    // Show password prompt if the password is not supplied
    if (!password) {
      try {
        password = await askPassword();
      } catch (e) {
        alert('Password is required to load encrypted backup');
        throw new Error('Password is required to load encrypted backup');
      }
    }

    const decString = await bip39Org.crypto.decryptString(
      importedText,
      password
    );

    document.getElementById('encrypt-raw').value = decString;
    document.getElementById('encrypt-enc').value = importedText;
    document.getElementById('encrypt-password').value = password;
  } catch (e) {
    showError(e);
    throw e;
  }
};
