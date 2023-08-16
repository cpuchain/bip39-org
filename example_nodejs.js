const BIP39 = require('./src/index');

console.log(BIP39);

const { generateMnemonicWithId } = BIP39;

let startTest = async () => {
  console.log('----------------------------------------------------------\n');

  console.time('Testing Raw Latency (Without CPU caching):');
  await generateMnemonicWithId('test@gmail.com', '-0idi230-id1d0-1');
  console.timeEnd('Testing Raw Latency (Without CPU caching):')

  console.log('\n----------------------------------------------------------');

  globalThis.isDebug = true;

  await generateMnemonicWithId('test@gmail.com', '-0idi230-id1d0-1');
  await generateMnemonicWithId('test@gmail.com', '-0idi230-id1d0-1', ['this is recovery phrase']);
  await generateMnemonicWithId('test@gmail.com', '-0idi230-id1d0-1', ['this is recovery phrase', 'this is the second one']);
  await generateMnemonicWithId('test@gmail.com', '-0idi230-id1d0-1', undefined, 12);
  await generateMnemonicWithId('test@gmail.com', '-0idi230-id1d0-1', undefined, 15);
  await generateMnemonicWithId('test@gmail.com', '-0idi230-id1d0-1', undefined, 18);
  await generateMnemonicWithId('test@gmail.com', '-0idi230-id1d0-1', undefined, 21);
  await generateMnemonicWithId('test@gmail.com', '-0idi230-id1d0-1', undefined, 24);
  await generateMnemonicWithId('test@gmail.com', '-0idi230-id1d0-1', undefined, undefined, 1);
  await generateMnemonicWithId('test@gmail.com', '-0idi230-id1d0-1', undefined, undefined, 2);
  await generateMnemonicWithId('test@gmail.com', '-0idi230-id1d0-1', undefined, undefined, 5);
  await generateMnemonicWithId('test@gmail.com', '-0idi230-id1d0-1', undefined, undefined, 10);

  globalThis.isDebug = false;
}
startTest();
