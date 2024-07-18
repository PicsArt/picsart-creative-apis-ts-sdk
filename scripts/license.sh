#!/bin/bash

SED=$(command -v gsed || command -v sed)

if [[ "$OSTYPE" == "darwin"* ]]; then
  #  MAC OSX
  if ! command -v gsed &> /dev/null
  then
      echo "gsed command must be installed"
      exit 1
  fi
fi

function process {
  echo $1
  if grep -q Copyright  $1
  then
    $SED -n '0,/\/\*\*/{:a;N;/\*\//!ba;N;s/.*\n//};p' $1 >$1.new && mv $1.new $1
  fi
  cat copyright_text >$1.new
  cat $1 >> $1.new
  mv $1.new $1
}

cat ./scripts/copyright.txt | $SED -Ez '$ s/\n\n$//' > copyright_text
echo "" >> copyright_text

for i in `find ./src -name '*.ts'`
do
  process $i
done

for i in `find ./examples -name '*.ts'`
do
  process $i
done
rm copyright_text
