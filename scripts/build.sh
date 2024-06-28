#!/bin/bash

# The script generates the package in the given directory.

set -e

# cd to the root dir
root="$(pwd)/$(dirname "$0")/.."
cd "$root" || exit 1

# XXX: $PACKAGE_OUTPUT_PATH must be an absolute path!
dir=${PACKAGE_OUTPUT_PATH:-"$root/lib"}
export PACKAGE_OUTPUT_PATH="$dir"

# Clean up output dir
rm -rf "$dir"
mkdir -p "$dir"

# Add license headers
./scripts/license.sh

# Transpile ESM versions of files
env BABEL_ENV=esm npx babel src \
  --config-file ./babel.config.js \
  --source-root src \
  --out-dir "$dir" \
  --ignore "**/test.ts","**/*.d.ts" \
  --extensions .mjs,.ts \
  --out-file-extension .mjs \
  --quiet

# Transpile CommonJS versions of files
env BABEL_ENV=cjs npx babel src \
  --config-file ./babel.config.js \
  --source-root src \
  --out-dir "$dir" \
  --ignore "**/test.ts","**/*.d.ts" \
  --extensions .mjs,.ts \
  --out-file-extension .js \
  --quiet

# Generate TypeScript
npx tsc --project tsconfig.lib.json --outDir "$dir"

if [ -n "$TEST_FLATTEN" ]; then
  exit 0
fi


# Copy basic files
for pattern in package.json \
  README.md
do
  cp -r "$pattern" "$dir"
done

# Set project name and version constants
PACKAGE_NAME=$(cat package.json | grep name | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')
PACKAGE_VERSION=$(cat package.json | grep version | head -1 | awk -F: '{ print $2 }' | sed 's/[",]//g' | tr -d '[[:space:]]')

if [[ "$OSTYPE" == "darwin"* ]]; then
  # Mac OSX
  sed -i '' "s/{{PACKAGE_NAME}}/$PACKAGE_NAME/g" lib/core/config.js
  sed -i '' "s/{{PACKAGE_NAME}}/$PACKAGE_NAME/g" lib/core/config.mjs
  sed -i '' "s/{{PACKAGE_VERSION}}/$PACKAGE_VERSION/g" lib/core/config.js
  sed -i '' "s/{{PACKAGE_VERSION}}/$PACKAGE_VERSION/g" lib/core/config.mjs
else
  # GNU/Linux
  sed -i "s/{{PACKAGE_NAME}}/$PACKAGE_NAME/g" lib/core/config.js
  sed -i "s/{{PACKAGE_NAME}}/$PACKAGE_NAME/g" lib/core/config.mjs
  sed -i "s/{{PACKAGE_VERSION}}/$PACKAGE_VERSION/g" lib/core/config.js
  sed -i "s/{{PACKAGE_VERSION}}/$PACKAGE_VERSION/g" lib/core/config.mjs
fi

# Make it prettier
if [ -z "$PACKAGE_SKIP_BEAUTIFY" ]; then
  # Prettier won't format in node_modules, but when running the smoke tests, we
  # need to format the files in node_modules.
  cd $dir
  npx prettier . --write --ignore-path "" > /dev/null 2>&1 || exit 1
  cd -
fi


