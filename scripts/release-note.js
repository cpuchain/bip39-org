#!/usr/bin/env node
const fs = require('fs');
const process = require('process');
const { version, description, homepage } = require('../package.json');

const cliName = 'bip39-cli';

const pubKey = process.argv[2];

const githubUrl = homepage.replace('https://github.com/', '');

const digest = fs.existsSync('./dist/SHA256SUMS.asc')
  ? fs.readFileSync('./dist/SHA256SUMS.asc', { encoding: 'utf8' })
  : fs.readFileSync('./dist/SHA256SUMS', { encoding: 'utf8' });

const releaseNoteString = `
![GitHub Release)](https://img.shields.io/github/downloads/${githubUrl}/v${version}/total?color=blue&style=flat-square)

${description}

### Installing CLI tool

Simple one line install for linux

\`\`\`bash
wget -qO- https://github.com/${githubUrl}/releases/download/v${version}/${cliName}-${version}-linux64.tar.gz | tar xvz && \\
sudo mv ${cliName} /usr/local/bin
\`\`\`

Check with the following command

\`\`\`bash
${cliName} --help
\`\`\`

### SHA256SUMS

\`\`\`
${digest}
\`\`\`

### How to verify

First, import our PGP key used for release process if you haven't

\`\`\`bash
wget -qO- https://github.com/${githubUrl}/releases/download/v${version}/${pubKey} | gpg --import
\`\`\`

Then, download the release binaries with the signed file and verify those

\`\`\`bash
wget https://github.com/${githubUrl}/releases/download/v${version}/index.html && \\
wget https://github.com/${githubUrl}/releases/download/v${version}/${cliName}-${version}-darwin64.tar.gz && \\
wget https://github.com/${githubUrl}/releases/download/v${version}/${cliName}-${version}-linux64.tar.gz && \\
wget https://github.com/${githubUrl}/releases/download/v${version}/${cliName}-${version}-win64.zip && \\
wget https://github.com/${githubUrl}/releases/download/v${version}/SHA256SUMS.asc

# Verify the SHA256SUMS file first
gpg --verify SHA256SUMS.asc

# Verify binary files
sha256sum --ignore-missing --check SHA256SUMS.asc
\`\`\`
`;

fs.writeFileSync('RELEASE_NOTE.md', releaseNoteString);
