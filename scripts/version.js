#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const process = require('process');
const { version } = require('../package.json');

const VERSION_JS = path.join(process.cwd(), './src/js/version.js');
const VERSION_STRING = `document.getElementById('version').innerText = 'Version v${version}';`;

fs.writeFileSync(VERSION_JS, VERSION_STRING);
