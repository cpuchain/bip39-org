#!/bin/bash

PACKAGE_NAME=($(jq -r '.name' package.json))
PACKAGE_VERSION=($(jq -r '.version' package.json))
PACKAGE_FILES="$(jq -r '(.files | join(" "))' package.json) package.json"

CLI_NAME="bip39-cli"

ZIP_NAME="dist/${PACKAGE_NAME}-${PACKAGE_VERSION}-src.zip"
PUBLIC_KEY="bip39org.asc"

rm $ZIP_NAME
zip -r $ZIP_NAME $PACKAGE_FILES
cp ${PUBLIC_KEY} dist
cd dist
rm SHA256SUMS SHA256SUMS.asc
chmod +x ${PACKAGE_NAME}-linux
chmod +x ${PACKAGE_NAME}-macos
mv ${PACKAGE_NAME}-linux ${CLI_NAME} && tar -czvf ${CLI_NAME}-${PACKAGE_VERSION}-linux64.tar.gz ${CLI_NAME} && rm ${CLI_NAME}
mv ${PACKAGE_NAME}-macos ${CLI_NAME} && tar -czvf ${CLI_NAME}-${PACKAGE_VERSION}-darwin64.tar.gz ${CLI_NAME} && rm ${CLI_NAME}
mv ${PACKAGE_NAME}-win.exe ${CLI_NAME}.exe && zip ${CLI_NAME}-${PACKAGE_VERSION}-win64.zip ${CLI_NAME}.exe && rm ${CLI_NAME}.exe
cp index.html bip39-org.html
sha256sum * > SHA256SUMS

if [[ ! -v GITHUB_ACTIONS ]]; then
  gpg --clear-sign SHA256SUMS
  cd -;
  zip -r ${PACKAGE_NAME}-${PACKAGE_VERSION}-dist.zip dist
else
  cd -;
fi

# Create release note
./scripts/release-note.js ${PUBLIC_KEY}
cat RELEASE_NOTE.md