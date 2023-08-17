# Bip39-org Tool

A tool to create a secure BIP39 Mnemonic phrases from the combination of ID and Password

## Online Version

https://bip39.org

https://bip39org.eth.link (Or, https://bip39org.eth.limo)

## Standalone offline version

### For browser version

Download `index.html` from [the latest release](https://github.com/bip39org/bip39-org/releases/latest).

### For command-line interface (CLI)

Download the cli tool from [the latest release](https://github.com/bip39org/bip39-org/releases/latest).

Or, you could try from the Node.js npx tool

```bash
  $ npx bip39-org --help
```

```bash
  $ npm i -g bip39-org
  $ bip39-cli --help
```

## Compiling the source code

You could compile both the standalone html file and the cli tool with the following command

Requirements:

- Node.js LTS version

```bash
  $ git clone https://github.com/bip39org/bip39-org
  $ cd bip39-org
  $ npm install
  $ npm run build
```

## Donations

- BTC:

```
1ApLvtViUypng5uunszD6HTVpsoBwK14ZQ
```

- LTC:

```
LPMTqYFSpAnKE9vkdk3ypKNKEgenF1L2ZN
```

- DOGE:

```
D7pFTmu95xnQg78XCrYCA4ViDX5GWfvGNJ
```

- ETH (bip39org.eth):

```
0xf43A5813bAf02858B6E7bff81bEB308FcfE2Aca9
```

- XMR:

```
473ZSSmehSRLvYPwforvjJN964Edy1uefhucvzT3VGB8KNGkm5H8vufYQFpWTPG94DAjSzsKftSnZB79hjcCXpQwE4G29TC
```

# License

This Bip39-org tool is released under the terms of the MIT license. See LICENSE for
more information or see https://opensource.org/licenses/MIT.

# Credits

The BIP39 implementation of this module is inspired and forked from the following projects:

- [bitcoinjs/bip39](https://github.com/bitcoinjs/bip39)
- [paulmillr/scure-bip39](https://github.com/paulmillr/scure-bip39)
- [iancoleman/bip39](https://github.com/iancoleman/bip39)
- [hujiulong/web-bip39](https://github.com/hujiulong/web-bip39)

The Email Password entropy generation is inspired by [Coinb.in](https://github.com/OutCast3k/coinbin/) project.
