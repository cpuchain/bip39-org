#!/bin/bash

LATEST_RELEASE=($(curl https://api.github.com/repos/iancoleman/bip39/releases/latest | jq -r '.tag_name'))

wget https://github.com/iancoleman/bip39/releases/download/$LATEST_RELEASE/bip39-standalone.html -O bip39-standalone.html
wget https://github.com/iancoleman/bip39/releases/download/$LATEST_RELEASE/signature.txt.asc -O signature.txt.asc
wget https://iancoleman.io/pubkey.txt -O iancoleman.asc

gpg --import iancoleman.asc
gpg --verify signature.txt.asc

SIGNED_DIGEST=($(sed '5!d' signature.txt.asc))
HTML_DIGEST=($(sha256sum bip39-standalone.html))

if [ "$SIGNED_DIGEST" = "$HTML_DIGEST" ]; then
  echo "Digest is identical for bip39-standalone.html"
else
  echo "WARNING: Digest mismatch for bip39-standalone.html, wants $SIGNED_DIGEST haves $HTML_DIGEST"
  rm bip39-standalone.html signature.txt.asc iancoleman.asc
fi
